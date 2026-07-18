/**
 * Validate pantoken's generated output. Run after the workspace is built (`vp run -r build`), so
 * every package's `generate`/`embed` step has already written its `generated/` dir. This is the
 * pantoken analog of a `validateTokens` drift gate: it fails if any generator produced nothing, if
 * the `pantoken` CLI can't emit a supported target, if a generated stylesheet references an
 * `--instui-*` token the IR doesn't define, or if a published CSS export bypasses the finalized
 * `dist/` output from `@tsdown/css`.
 *
 * @module
 * @beta
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, readdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { tokens } from "@pantoken/tokens";
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { matchWildcardFiles } from "./match-wildcard.ts";

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

/** List files recursively under a directory; returns workspace-relative segments (not absolute paths). */
function listFiles(dir: string, base = dir): string[] {
  if (!existsSync(dir)) return [];
  const files: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const abs = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...listFiles(abs, base));
      continue;
    }
    files.push(abs.slice(base.length + 1).replaceAll("\\", "/"));
  }
  return files;
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
  "plugins/pantoken/stacking",
  "plugins/pantoken/transition",
  "plugins/pantoken/visual-debug",
];
for (const pkg of GENERATOR_PKGS) {
  const count = fileCount(join(root, pkg, "generated"));
  if (count === 0) fail(`${pkg}: generated/ is missing or empty (run its build)`);
  else ok(`${pkg}: generated/ has ${count} file(s)`);
}

// 2. Every published CSS export must point at a non-empty, finalized dist file.
const FINALIZED_CSS_PKGS = [
  "formats/components",
  "formats/css",
  "plugins/pantoken/logos",
  "plugins/pantoken/primitives",
  "plugins/pantoken/stacking",
  "plugins/pantoken/transition",
  "plugins/pantoken/visual-debug",
  "renderers/angular",
  "renderers/astro",
  "renderers/bootstrap",
  "renderers/css-in-js",
  "renderers/docusaurus",
  "renderers/foundation",
  "renderers/mui",
  "renderers/pendo",
  "renderers/react",
  "renderers/shadcn",
  "renderers/storybook",
  "renderers/svelte",
  "renderers/vitepress",
  "renderers/vue",
  "renderers/web-components",
] as const;
for (const pkg of FINALIZED_CSS_PKGS) {
  const manifest = JSON.parse(readFileSync(join(root, pkg, "package.json"), "utf8")) as {
    exports?: Record<string, string>;
  };
  const cssExports = Object.entries(manifest.exports ?? {}).filter(([key]) => key.endsWith(".css"));
  if (cssExports.length === 0) {
    fail(`${pkg}: no CSS exports found`);
    continue;
  }
  for (const [key, target] of cssExports) {
    if (!target.startsWith("./dist/") || !target.endsWith(".css")) {
      fail(`${pkg}: ${key} bypasses finalized dist CSS (${target})`);
      continue;
    }
    if (target.includes("*")) {
      const rel = target.slice("./dist/".length);
      const distDir = join(root, pkg, "dist");
      const matches = matchWildcardFiles(listFiles(distDir), rel);
      const nonEmpty = matches.filter((file) => readFileSync(join(distDir, file)).byteLength > 0);
      if (nonEmpty.length === 0) {
        fail(`${pkg}: ${key} finalized output is missing or empty (${target})`);
      } else {
        ok(`${pkg}: ${key} resolves to ${nonEmpty.length} finalized file(s) via ${target}`);
      }
      continue;
    }
    const file = join(root, pkg, target);
    if (!existsSync(file) || readFileSync(file).byteLength === 0) {
      fail(`${pkg}: ${key} finalized output is missing or empty (${target})`);
    } else {
      ok(`${pkg}: ${key} resolves to finalized ${target}`);
    }
  }
}

// The readable components sheet remains the cssdoc provider; only the published copy is minified.
const componentSource = readFileSync(
  join(root, "formats/components/generated/components.css"),
  "utf8",
);
const componentFinal = readFileSync(join(root, "formats/components/dist/components.css"), "utf8");
if (!componentSource.includes("/**")) fail("components: generated CSS lost cssdoc comments");
else ok("components: generated CSS retains cssdoc comments");
if (componentFinal.includes("/**")) fail("components: finalized CSS retained cssdoc comments");
else ok("components: finalized CSS strips cssdoc comments");

// 3. The `pantoken` CLI must emit at least one file for every supported target.
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

// 4. Reference integrity: neither generated nor finalized stylesheets may drift from the token IR.
const readGenerated = (pkg: string, file: string): string =>
  readFileSync(join(root, pkg, "generated", file), "utf8");
const readFinalized = (pkg: string, file: string): string =>
  readFileSync(join(root, pkg, "dist", file), "utf8");

// Self-contained sheets define what they reference — nothing should dangle.
const SELF_CONTAINED = [
  ["formats/css", "style.css"],
  ["renderers/pendo", "global.css"],
  // stacking/transition define their own `--instui-stacking-*`/`--instui-transition-*` tokens in the
  // sheet's `:root` and reference only those, so nothing should dangle. (visual-debug is excluded — its
  // outline colour is a `--pantoken-visual-debug-color` var with an inline fallback, defined nowhere.)
  ["plugins/pantoken/stacking", "stacking.css"],
  ["plugins/pantoken/transition", "transition.css"],
] as const;
for (const [pkg, file] of SELF_CONTAINED) {
  for (const [stage, css] of [
    ["generated", readGenerated(pkg, file)],
    ["finalized", readFinalized(pkg, file)],
  ] as const) {
    const dangling = danglingReferences(css);
    if (dangling.length) {
      fail(`${pkg}/${file} (${stage}): dangling var() refs ${dangling.join(", ")}`);
    } else ok(`${pkg}/${file} (${stage}): no dangling references`);
  }
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
  const stages = file.endsWith(".css")
    ? ([
        ["generated", readGenerated(pkg, file)],
        ["finalized", readFinalized(pkg, file)],
      ] as const)
    : ([["generated", readGenerated(pkg, file)]] as const);
  for (const [stage, css] of stages) {
    const unknown = unknownReferences(css, tokens);
    if (unknown.length) {
      fail(`${pkg}/${file} (${stage}): references unknown tokens ${unknown.join(", ")}`);
    } else ok(`${pkg}/${file} (${stage}): all token references resolve`);
  }
}

if (failures.length) {
  console.error(`\n✗ validate-generated: ${failures.length} failure(s)`);
  process.exit(1);
}
console.log("\n✓ validate-generated: all checks passed");
