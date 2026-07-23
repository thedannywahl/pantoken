/**
 * Fail when a PR changes a publishable package's shippable source but no pending changeset bumps that
 * package. This closes the gap the naive `changeset status` check left open: an unrelated (or empty)
 * changeset satisfied "a changeset exists" while the actually-changed packages got no version bump, so
 * the change merged and never published (see the CDN work — `style.lean.css` 404'd on the CDN because
 * `@pantoken/css` never released).
 *
 * A package is "covered" when the pending changesets will bump it (directly). Dependents are NOT
 * required here — changesets bumps them automatically (`updateInternalDependencies`). Changes confined
 * to non-shipped files (tests, config, markdown) don't require a changeset.
 *
 * Runs in CI (`require-changeset`) and the local `pre-push` hook. Base ref via `--base` or
 * `CHANGESET_BASE` (default `origin/main`).
 */
import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import process from "node:process";
import { pathToFileURL } from "node:url";
import {
  isPublishablePackage,
  loadWorkspacePackages,
  type WorkspacePackage,
} from "./workspace-packages.ts";

// Files inside a package that don't affect its published output, so a change confined to them needs no
// changeset. Everything else under a package dir (notably `src/**`) does.
const NON_SHIPPED = [
  /(^|\/)tests?\//,
  /\.(test|spec)\.[cm]?tsx?$/,
  /(^|\/)vite\.config\.[cm]?ts$/,
  /(^|\/)tsconfig[^/]*\.json$/,
  /(^|\/)cssdoc\.jsonc?$/,
  /\.md$/,
];

const toPosix = (value: string): string => value.split(path.sep).join("/");

/**
 * The publishable packages a diff directly changes through shipped files. Longest-path-first so a
 * nested package (e.g. `plugins/pantoken/logos`) wins over a root prefix. Pure — no IO.
 */
export function requiredPublishable(
  changedFiles: readonly string[],
  packages: readonly WorkspacePackage[],
): string[] {
  const byDepth = [...packages].sort((a, b) => b.path.length - a.path.length);
  const required = new Set<string>();

  for (const raw of changedFiles) {
    const file = toPosix(raw.trim());
    if (!file || NON_SHIPPED.some((re) => re.test(file))) continue;
    const owner = byDepth.find((pkg) => file === pkg.path || file.startsWith(`${pkg.path}/`));
    if (owner && isPublishablePackage(owner)) required.add(owner.name);
  }

  return [...required].sort((a, b) => a.localeCompare(b));
}

/** Required packages that no pending changeset will bump. Pure — no IO. */
export function uncoveredPackages(
  required: readonly string[],
  willBump: ReadonlySet<string>,
): string[] {
  return required.filter((name) => !willBump.has(name)).sort((a, b) => a.localeCompare(b));
}

function isDirectExecution(metaUrl: string): boolean {
  const entry = process.argv[1];
  return Boolean(entry) && pathToFileURL(path.resolve(entry)).href === metaUrl;
}

function readArg(flag: string): string | undefined {
  const index = process.argv.indexOf(flag);
  return index >= 0 && index + 1 < process.argv.length ? process.argv[index + 1] : undefined;
}

function gitDiffFiles(base: string): string[] {
  // Three-dot diff from the merge base, so unrelated changes already on the base don't count.
  const result = spawnSync("git", ["diff", "--name-only", `${base}...HEAD`], {
    encoding: "utf8",
    shell: false,
  });
  if (result.status !== 0) throw new Error(`git diff failed: ${result.stderr.trim()}`);
  return result.stdout.split("\n").filter(Boolean);
}

/** Package names the pending changesets will bump, via `changeset status --output`. */
function willBumpPackages(base: string): Set<string> {
  const dir = mkdtempSync(path.join(tmpdir(), "changeset-status-"));
  const outFile = path.join(dir, "status.json");
  try {
    // `changeset status` exits non-zero when there are no releases; we read the JSON regardless.
    spawnSync("vpx", ["changeset", "status", "--since", base, "--output", outFile], {
      encoding: "utf8",
      shell: false,
    });
    let parsed: { releases?: { name: string; type: string }[] };
    try {
      parsed = JSON.parse(readFileSync(outFile, "utf8")) as typeof parsed;
    } catch {
      parsed = { releases: [] };
    }
    return new Set((parsed.releases ?? []).filter((r) => r.type !== "none").map((r) => r.name));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

async function main(): Promise<void> {
  const base = readArg("--base") ?? process.env.CHANGESET_BASE ?? "origin/main";
  const { packages } = await loadWorkspacePackages();

  const required = requiredPublishable(gitDiffFiles(base), packages);
  if (required.length === 0) {
    console.log("✓ changeset coverage: no publishable package needs a changeset for this diff.");
    return;
  }

  const missing = uncoveredPackages(required, willBumpPackages(base));
  if (missing.length === 0) {
    console.log(`✓ changeset coverage: ${required.join(", ")} covered by pending changesets.`);
    return;
  }

  console.error(
    "✗ changeset coverage: these publishable packages changed but no pending changeset bumps them:",
  );
  for (const name of missing) console.error(`  - ${name}`);
  console.error("\nAdd one with `vp run changeset:add`, then commit the file under .changeset/.");
  console.error(
    "A change that genuinely needs no release should still add a changeset bumping the package\n" +
      "`patch` with a note — an empty/global changeset does NOT count as coverage.",
  );
  process.exitCode = 1;
}

if (isDirectExecution(import.meta.url)) {
  main().catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  });
}
