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

export interface WorkspacePackage {
  name: string;
  path: string;
  version: string;
  private: boolean;
  workspaceDeps: Set<string>;
}

export interface WorkspacePackages {
  rootDir: string;
  packages: WorkspacePackage[];
  byName: Map<string, WorkspacePackage>;
}

export interface ParsedPackageTag {
  packageName: string;
  version: string;
}

export interface ParsedRequestedPackageSpec {
  raw: string;
  packageName: string;
  versionOrChannel?: string;
}

const WORKSPACE_ROOT = path.resolve(new URL("../../", import.meta.url).pathname);

const PACKAGE_ROOTS = [
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
  const buckets = [
    manifest.dependencies ?? {},
    manifest.optionalDependencies ?? {},
    manifest.peerDependencies ?? {},
  ];

  const deps = new Set<string>();

  for (const bucket of buckets) {
    for (const [depName, depRange] of Object.entries(bucket)) {
      if (typeof depRange === "string" && depRange.startsWith(WORKSPACE_PROTOCOL)) {
        deps.add(depName);
      }
    }
  }

  return deps;
}

export async function loadWorkspacePackages(): Promise<WorkspacePackages> {
  const packages: WorkspacePackage[] = [];

  for (const root of PACKAGE_ROOTS) {
    const absRoot = path.join(WORKSPACE_ROOT, root);
    const children = await listChildDirs(absRoot);

    for (const child of children) {
      const relDir = toPosix(path.join(root, child));
      const pkgPath = path.join(WORKSPACE_ROOT, relDir, "package.json");

      let raw;
      try {
        raw = await fs.readFile(pkgPath, "utf8");
      } catch {
        continue;
      }

      let manifest: PackageManifest;
      try {
        manifest = JSON.parse(raw) as PackageManifest;
      } catch {
        throw new Error(`Invalid JSON in ${relDir}/package.json`);
      }

      if (typeof manifest.name !== "string" || manifest.name.length === 0) {
        continue;
      }

      const workspaceDeps = collectWorkspaceDeps(manifest);

      packages.push({
        name: manifest.name,
        path: relDir,
        version: typeof manifest.version === "string" ? manifest.version : "0.0.0",
        private: Boolean(manifest.private),
        workspaceDeps,
      });
    }
  }

  const byName = new Map(packages.map((pkg) => [pkg.name, pkg]));

  return {
    rootDir: WORKSPACE_ROOT,
    packages,
    byName,
  };
}

export function buildReverseDependencyMap(packages: WorkspacePackage[]): Map<string, Set<string>> {
  const reverse = new Map<string, Set<string>>();

  for (const pkg of packages) {
    if (!reverse.has(pkg.name)) {
      reverse.set(pkg.name, new Set());
    }
  }

  for (const pkg of packages) {
    for (const dep of pkg.workspaceDeps) {
      if (!reverse.has(dep)) {
        reverse.set(dep, new Set());
      }
      const dependents = reverse.get(dep);
      if (dependents) {
        dependents.add(pkg.name);
      }
    }
  }

  return reverse;
}

export function computeReleaseSet(
  targetName: string,
  byName: Map<string, WorkspacePackage>,
  reverseMap: Map<string, Set<string>>,
): string[] {
  const visited = new Set<string>();
  const queue: string[] = [targetName];

  while (queue.length > 0) {
    const current = queue.shift();
    if (!current) {
      continue;
    }
    if (visited.has(current)) {
      continue;
    }

    visited.add(current);

    const dependents = reverseMap.get(current);
    if (!dependents) {
      continue;
    }

    for (const dependent of dependents) {
      if (!visited.has(dependent)) {
        queue.push(dependent);
      }
    }
  }

  const metaPackage = byName.get("@pantoken/pantoken");
  const targetPackage = byName.get(targetName);
  if (metaPackage && targetName !== "@pantoken/pantoken" && !targetPackage?.private) {
    const touchesMetaSurface = [...visited].some((name) => metaPackage.workspaceDeps.has(name));

    if (touchesMetaSurface) {
      visited.add(metaPackage.name);
    }
  }

  return [...visited].sort((a, b) => a.localeCompare(b));
}

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

export function isPublishablePackage(pkg: WorkspacePackage | undefined | null): boolean {
  if (!pkg) {
    return false;
  }

  const candidate = pkg as WorkspacePackage;

  return !candidate.private && candidate.name.startsWith("@pantoken/");
}
