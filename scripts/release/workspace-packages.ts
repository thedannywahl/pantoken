import fs from "node:fs/promises";
import path from "node:path";

type ManifestDeps = Record<string, unknown>;

interface PackageManifest {
  name?: unknown;
  version?: unknown;
  private?: unknown;
  dependencies?: ManifestDeps;
  optionalDependencies?: ManifestDeps;
  peerDependencies?: ManifestDeps;
}

/** One workspace package: its name, repo-relative path, version, privacy, and workspace dependencies. */
export interface WorkspacePackage {
  name: string;
  path: string;
  version: string;
  private: boolean;
  workspaceDeps: Set<string>;
}

/** All discovered workspace packages, with the repo root and a by-name index. */
export interface WorkspacePackages {
  rootDir: string;
  packages: WorkspacePackage[];
  byName: Map<string, WorkspacePackage>;
}

/** A parsed git release tag: the package name and its version. */
export interface ParsedPackageTag {
  packageName: string;
  version: string;
}

/** A parsed user-requested package spec: the raw input, the normalized name, and an optional version or channel. */
export interface ParsedRequestedPackageSpec {
  raw: string;
  packageName: string;
  versionOrChannel?: string;
}

const WORKSPACE_ROOT = path.resolve(new URL("../../", import.meta.url).pathname);

const PACKAGE_ROOTS = [
  "docs",
  "packages",
  "formats",
  "platforms",
  "renderers",
  "bundlers",
  "design",
  "ai",
  "plugins/pantoken",
  "plugins/postcss",
  "plugins/typedoc",
  "plugins/vite",
  "tools",
];

const WORKSPACE_PROTOCOL = "workspace:";

const toPosix = (value: string): string => value.split(path.sep).join("/");

async function listChildDirs(basePath: string): Promise<string[]> {
  let entries: import("node:fs").Dirent[] = [];

  try {
    entries = await fs.readdir(basePath, { withFileTypes: true });
  } catch {
    return [];
  }

  return entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);
}

function collectWorkspaceDeps(manifest: PackageManifest): Set<string> {
  const entries = [
    ...Object.entries(manifest.dependencies ?? {}),
    ...Object.entries(manifest.optionalDependencies ?? {}),
    ...Object.entries(manifest.peerDependencies ?? {}),
  ];

  const deps = new Set<string>();
  for (const [depName, depRange] of entries) {
    if (typeof depRange === "string" && depRange.startsWith(WORKSPACE_PROTOCOL)) {
      deps.add(depName);
    }
  }

  return deps;
}

async function readWorkspacePackage(relDir: string): Promise<WorkspacePackage | null> {
  const pkgPath = path.join(WORKSPACE_ROOT, relDir, "package.json");

  let raw;
  try {
    raw = await fs.readFile(pkgPath, "utf8");
  } catch {
    return null;
  }

  let manifest: PackageManifest;
  try {
    manifest = JSON.parse(raw) as PackageManifest;
  } catch {
    throw new Error(`Invalid JSON in ${relDir}/package.json`);
  }

  if (typeof manifest.name !== "string" || manifest.name.length === 0) {
    return null;
  }

  return {
    name: manifest.name,
    path: relDir,
    version: typeof manifest.version === "string" ? manifest.version : "0.0.0",
    private: Boolean(manifest.private),
    workspaceDeps: collectWorkspaceDeps(manifest),
  };
}

/** Scan the known package roots and load every workspace package, indexed by name. */
export async function loadWorkspacePackages(): Promise<WorkspacePackages> {
  const packages: WorkspacePackage[] = [];
  const seenPaths = new Set<string>();

  for (const root of PACKAGE_ROOTS) {
    const absRoot = path.join(WORKSPACE_ROOT, root);
    const children = await listChildDirs(absRoot);
    const candidates = [root, ...children.map((child) => toPosix(path.join(root, child)))];

    for (const relDir of candidates) {
      if (seenPaths.has(relDir)) {
        continue;
      }
      seenPaths.add(relDir);

      const workspacePackage = await readWorkspacePackage(relDir);
      if (!workspacePackage) {
        continue;
      }

      packages.push(workspacePackage);
    }
  }

  const byName = new Map(packages.map((pkg) => [pkg.name, pkg]));

  return {
    rootDir: WORKSPACE_ROOT,
    packages,
    byName,
  };
}

/** Get (or lazily create) the dependents `Set` for `name` in a reverse-dependency map. */
function dependentsOf(reverse: Map<string, Set<string>>, name: string): Set<string> {
  let dependents = reverse.get(name);
  if (!dependents) {
    dependents = new Set<string>();
    reverse.set(name, dependents);
  }
  return dependents;
}

/** Build a map from each package to the set of packages that depend on it (its dependents). */
export function buildReverseDependencyMap(packages: WorkspacePackage[]): Map<string, Set<string>> {
  const reverse = new Map<string, Set<string>>();

  for (const pkg of packages) {
    dependentsOf(reverse, pkg.name); // Every package gets an entry, even with no dependents.
    for (const dep of pkg.workspaceDeps) {
      dependentsOf(reverse, dep).add(pkg.name);
    }
  }

  return reverse;
}

/**
 * The full set of packages to release for a target: the target plus every transitive dependent, and
 * the `@pantoken/pantoken` meta package when the target is part of its surface. Sorted by name.
 */
export function computeReleaseSet(
  targetName: string,
  byName: Map<string, WorkspacePackage>,
  reverseMap: Map<string, Set<string>>,
): string[] {
  const visited = collectTransitiveDependents(targetName, reverseMap);

  const metaPackage = byName.get("@pantoken/pantoken");
  const targetPackage = byName.get(targetName);
  if (metaPackage && targetName !== "@pantoken/pantoken" && !targetPackage?.private) {
    const touchesMetaSurface = [...visited].some((name) => metaPackage.workspaceDeps.has(name));
    if (touchesMetaSurface) visited.add(metaPackage.name);
  }

  return [...visited].sort((a, b) => a.localeCompare(b));
}

/** BFS from `start` over `reverseMap`, returning every reachable node including `start`. */
function collectTransitiveDependents(
  start: string,
  reverseMap: Map<string, Set<string>>,
): Set<string> {
  const visited = new Set<string>();
  const queue: string[] = [start];
  while (queue.length > 0) {
    const current = queue.shift()!;
    if (visited.has(current)) continue;
    visited.add(current);
    for (const dependent of reverseMap.get(current) ?? []) {
      if (!visited.has(dependent)) queue.push(dependent);
    }
  }
  return visited;
}

/** Parse a `@pantoken/<name>@v<version>` git tag into its parts, or `null` if it doesn't match. */
export function parsePackageTag(tag: string): ParsedPackageTag | null {
  const match = /^(@pantoken\/[A-Za-z0-9._-]+)@v(.+)$/.exec(tag);
  if (!match) {
    return null;
  }

  return {
    packageName: match[1],
    version: match[2],
  };
}

/** Normalize a name to the `@pantoken/*` scope: fix the `@pantokens/` typo and add the scope to a bare name; leave other scopes alone. */
export function normalizePantokenPackageName(value: string): string {
  if (!value) {
    return value;
  }

  if (value.startsWith("@pantokens/")) {
    return value.replace("@pantokens/", "@pantoken/");
  }

  if (value.startsWith("@pantoken/")) {
    return value;
  }

  if (value.startsWith("@")) {
    return value;
  }

  return `@pantoken/${value}`;
}

/** Parse a user-supplied `name[@version|channel]` spec, normalizing the name. Throws if empty or malformed. */
export function parseRequestedPackageSpec(spec: string): ParsedRequestedPackageSpec {
  const raw = spec.trim();
  if (raw.length === 0) {
    throw new Error("Package spec cannot be empty.");
  }

  const at = raw.lastIndexOf("@");
  const hasScopedPrefix = raw.startsWith("@");

  // Scoped package names include one leading @ by definition.
  const hasVersionPart = at > 0 && (!hasScopedPrefix || at > raw.indexOf("/"));

  if (!hasVersionPart) {
    return {
      raw,
      packageName: normalizePantokenPackageName(raw),
    };
  }

  const rawName = raw.slice(0, at);
  const versionOrChannel = raw.slice(at + 1);
  if (versionOrChannel.length === 0) {
    throw new Error(`Invalid package spec: ${spec}`);
  }

  return {
    raw,
    packageName: normalizePantokenPackageName(rawName),
    versionOrChannel,
  };
}

/** Whether a package is publishable: present, not private, and under the `@pantoken/` scope. */
export function isPublishablePackage(pkg: WorkspacePackage | undefined | null): boolean {
  if (!pkg) {
    return false;
  }

  const candidate = pkg as WorkspacePackage;

  return !candidate.private && candidate.name.startsWith("@pantoken/");
}
