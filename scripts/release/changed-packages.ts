import { spawnSync } from "node:child_process";
import path from "node:path";
import process from "node:process";
import { pathToFileURL } from "node:url";
import {
  buildReverseDependencyMap,
  computeReleaseSet,
  isPublishablePackage,
  loadWorkspacePackages,
  type WorkspacePackage,
} from "./workspace-packages.ts";

// Files that can affect every package's build/pack output, so a change to any of them widens the
// scope to the whole publishable set rather than a subset.
const GLOBAL_FILES = new Set([
  "package.json",
  "pnpm-lock.yaml",
  "pnpm-workspace.yaml",
  "vite.config.ts",
  "tsconfig.json",
  "tsconfig.base.json",
  ".changeset/config.json",
]);

export type ChangeScope = "all" | "subset" | "none";

export interface ChangedPackagesResult {
  scope: ChangeScope;
  // Publishable package names to gate, empty unless scope === "subset".
  packages: string[];
}

function toPosix(value: string): string {
  return value.split(path.sep).join("/");
}

/**
 * Map a list of changed repo-relative files to the publishable packages a publish gate should cover.
 * A change to a global config file returns `scope: "all"` (caller runs the full gate); a change that
 * touches no publishable package (docs, tooling, CI) returns `scope: "none"` (caller skips the gate);
 * otherwise the directly-changed packages are expanded to include their workspace dependents (whose
 * packs/types can break when a dependency changes) and filtered to the publishable set.
 */
export function resolveChangedPackages(
  changedFiles: string[],
  packages: WorkspacePackage[],
): ChangedPackagesResult {
  const normalized = changedFiles.map((file) => toPosix(file.trim())).filter(Boolean);

  if (normalized.some((file) => GLOBAL_FILES.has(file))) {
    return { scope: "all", packages: [] };
  }

  // Longest-path-first so a nested package (e.g. plugins/pantoken/logos) wins over its root prefix.
  const byPathDepth = [...packages].sort((a, b) => b.path.length - a.path.length);
  const directlyChanged = new Set<string>();

  for (const file of normalized) {
    const owner = byPathDepth.find((pkg) => file === pkg.path || file.startsWith(`${pkg.path}/`));
    if (owner) {
      directlyChanged.add(owner.name);
    }
  }

  if (directlyChanged.size === 0) {
    return { scope: "none", packages: [] };
  }

  const byName = new Map(packages.map((pkg) => [pkg.name, pkg]));
  const reverse = buildReverseDependencyMap(packages);

  const expanded = new Set<string>();
  for (const name of directlyChanged) {
    for (const affected of computeReleaseSet(name, byName, reverse)) {
      expanded.add(affected);
    }
  }

  const publishable = [...expanded]
    .filter((name) => isPublishablePackage(byName.get(name)))
    .sort((a, b) => a.localeCompare(b));

  return publishable.length > 0
    ? { scope: "subset", packages: publishable }
    : { scope: "none", packages: [] };
}

function isDirectExecution(metaUrl: string): boolean {
  const entry = process.argv[1];
  if (!entry) {
    return false;
  }
  return pathToFileURL(path.resolve(entry)).href === metaUrl;
}

function readArg(flag: string): string | undefined {
  const index = process.argv.indexOf(flag);
  if (index >= 0 && index + 1 < process.argv.length) {
    return process.argv[index + 1];
  }
  return undefined;
}

function isUsableBase(ref: string | undefined): ref is string {
  return Boolean(ref) && !/^0+$/.test(ref as string);
}

function gitDiffFiles(base: string): string[] | null {
  const result = spawnSync("git", ["diff", "--name-only", `${base}...HEAD`], {
    encoding: "utf8",
    shell: false,
  });
  if (result.status !== 0) {
    return null;
  }
  return result.stdout.split("\n").filter(Boolean);
}

async function main() {
  const base = readArg("--base") ?? process.env.CHANGED_BASE;
  const { packages } = await loadWorkspacePackages();

  // No usable base (new branch, missing ref) → can't diff, so gate the whole set to stay safe.
  const changedFiles = isUsableBase(base) ? gitDiffFiles(base) : null;
  const result =
    changedFiles === null
      ? { scope: "all" as const, packages: [] }
      : resolveChangedPackages(changedFiles, packages);

  if (process.env.GITHUB_OUTPUT) {
    const { appendFileSync } = await import("node:fs");
    appendFileSync(
      process.env.GITHUB_OUTPUT,
      `scope=${result.scope}\npackages=${result.packages.join(",")}\ncount=${result.packages.length}\n`,
    );
  }

  process.stdout.write(`${JSON.stringify(result)}\n`);
}

if (isDirectExecution(import.meta.url)) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  });
}
