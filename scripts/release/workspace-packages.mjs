import fs from "node:fs/promises";
import path from "node:path";

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

const toPosix = (value) => value.split(path.sep).join("/");

async function listChildDirs(basePath) {
  let entries = [];

  try {
    entries = await fs.readdir(basePath, { withFileTypes: true });
  } catch {
    return [];
  }

  return entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);
}

function collectWorkspaceDeps(manifest) {
  const buckets = [
    manifest.dependencies ?? {},
    manifest.optionalDependencies ?? {},
    manifest.peerDependencies ?? {},
  ];

  const deps = new Set();

  for (const bucket of buckets) {
    for (const [depName, depRange] of Object.entries(bucket)) {
      if (typeof depRange === "string" && depRange.startsWith(WORKSPACE_PROTOCOL)) {
        deps.add(depName);
      }
    }
  }

  return deps;
}

export async function loadWorkspacePackages() {
  const packages = [];

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

      let manifest;
      try {
        manifest = JSON.parse(raw);
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
        version: String(manifest.version ?? "0.0.0"),
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

export function buildReverseDependencyMap(packages) {
  const reverse = new Map();

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
      reverse.get(dep).add(pkg.name);
    }
  }

  return reverse;
}

export function computeReleaseSet(targetName, byName, reverseMap) {
  const visited = new Set();
  const queue = [targetName];

  while (queue.length > 0) {
    const current = queue.shift();
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
  if (metaPackage && targetName !== "@pantoken/pantoken") {
    const touchesMetaSurface = [...visited].some((name) => metaPackage.workspaceDeps.has(name));

    if (touchesMetaSurface) {
      visited.add(metaPackage.name);
    }
  }

  return [...visited].sort((a, b) => a.localeCompare(b));
}

export function parsePackageTag(tag) {
  const match = /^(@pantoken\/[A-Za-z0-9._-]+)@v(.+)$/.exec(tag);
  if (!match) {
    return null;
  }

  return {
    packageName: match[1],
    version: match[2],
  };
}

export function isPublishablePackage(pkg) {
  return pkg && !pkg.private && pkg.name.startsWith("@pantoken/");
}
