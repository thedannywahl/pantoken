/**
 * Validate pantoken's generated output. Run after the workspace is built (`vp run -r build`), so
 * every package's `generate`/`embed` step has already written its `generated/` dir. This is the
 * pantoken analog of a `validateTokens` drift gate: it fails if any generator produced nothing, if
 * the `pantoken` CLI can't emit a supported target, or if a generated stylesheet references an
 * `--instui-*` token the IR doesn't define.
 *
 * @module
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, readdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { tokens } from "@pantoken/tokens";
import { danglingReferences, unknownReferences } from "@pantoken/utils";

const root = resolve(import.meta.dirname, "../..");
const failures: string[] = [];
function fail(msg: string): void {
  failures.push(msg);
  console.error(`✗ ${msg}`);
}
function ok(msg: string): void {
  console.log(`✓ ${msg}`);
}

/** Count files recursively under a directory; 0 if it doesn't exist. */
function fileCount(dir: string): number {
  if (!existsSync(dir)) return 0;
  let n = 0;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) n += fileCount(join(dir, entry.name));
    else n++;
  }
  return n;
}

// 1. Every generator package must have written a non-empty `generated/` dir.
const GENERATOR_PKGS = [
  "formats/css",
  "formats/scss",
  "formats/less",
  "formats/stylus",
  "formats/tokens",
  "formats/dtcg",
  "platforms/wordpress",
  "platforms/vanilla",
  "renderers/pendo",
  "renderers/bootstrap",
  "renderers/shadcn",
  "renderers/foundation",
  "renderers/docusaurus",
  "renderers/vitepress",
  "ai/pantoken-ai",
  "plugins/pantoken/primitives",
];
for (const pkg of GENERATOR_PKGS) {
  const count = fileCount(join(root, pkg, "generated"));
  if (count === 0) fail(`${pkg}: generated/ is missing or empty (run its build)`);
  else ok(`${pkg}: generated/ has ${count} file(s)`);
}

// 2. The `pantoken` CLI must emit at least one file for every supported target.
const CLI_TARGETS = [
  "swift",
  "android",
  "compose",
  "flutter",
  "wordpress",
  "vanilla",
  "drupal",
  "swatches",
  "rust",
  "icon-font",
  "pendo",
  "jekyll",
  "hugo",
];
const cliBin = join(root, "packages/cli/bin/pantoken.mjs");
const cliTmp = mkdtempSync(join(tmpdir(), "pantoken-validate-"));
for (const target of CLI_TARGETS) {
  const out = join(cliTmp, target);
  try {
    const argv = ["generate", target, "--out", out, "--icons", "arrow-left,check-mark"];
    execFileSync("node", [cliBin, ...argv], { stdio: "pipe" });
    const count = fileCount(out);
    if (count === 0) fail(`cli generate ${target}: wrote no files`);
    else ok(`cli generate ${target}: wrote ${count} file(s)`);
  } catch (error) {
    fail(`cli generate ${target}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

// 3. Reference integrity: no generated stylesheet may drift from the token IR.
const readGenerated = (pkg: string, file: string): string =>
  readFileSync(join(root, pkg, "generated", file), "utf8");

// Self-contained sheets define what they reference — nothing should dangle.
const SELF_CONTAINED = [
  ["formats/css", "style.css"],
  ["renderers/pendo", "global.css"],
] as const;
for (const [pkg, file] of SELF_CONTAINED) {
  const dangling = danglingReferences(readGenerated(pkg, file));
  if (dangling.length) fail(`${pkg}/${file}: dangling var() refs ${dangling.join(", ")}`);
  else ok(`${pkg}/${file}: no dangling references`);
}

// Bridges only reference tokens defined elsewhere — every target must be a real token.
const BRIDGES = [
  ["renderers/bootstrap", "theme.css"],
  ["renderers/shadcn", "theme.css"],
  ["renderers/foundation", "theme.css"],
  ["renderers/foundation", "_settings.scss"],
  ["renderers/docusaurus", "custom.css"],
  ["renderers/vitepress", "custom.css"],
  // The primitive utilities only ever reference real `--instui-primitive-*` tokens.
  ["plugins/pantoken/primitives", "primitives.css"],
] as const;
for (const [pkg, file] of BRIDGES) {
  const unknown = unknownReferences(readGenerated(pkg, file), tokens);
  if (unknown.length) fail(`${pkg}/${file}: references unknown tokens ${unknown.join(", ")}`);
  else ok(`${pkg}/${file}: all token references resolve`);
}

if (failures.length) {
  console.error(`\n✗ validate-generated: ${failures.length} failure(s)`);
  process.exit(1);
}
console.log("\n✓ validate-generated: all checks passed");
