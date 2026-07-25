import fs from "node:fs/promises";
import path from "node:path";

import {
  BUGS_URL,
  ENGINES,
  expectedSideEffects,
  HOMEPAGE_URL,
  REPOSITORY_URL,
} from "./repository-metadata.ts";
import { isPublishablePackage, loadWorkspacePackages } from "./workspace-packages.ts";

interface PackageManifest {
  repository?: unknown;
  homepage?: unknown;
  bugs?: unknown;
  sideEffects?: unknown;
  engines?: unknown;
  publishConfig?: unknown;
  license?: unknown;
  type?: unknown;
  files?: unknown;
  description?: unknown;
  exports?: unknown;
}

type PackageRef = { name: string; path: string };

function repositoryUrlOf(repository: unknown): string | undefined {
  if (typeof repository === "string") return repository;
  if (!repository || typeof repository !== "object") return undefined;
  const url = (repository as { url?: unknown }).url;
  return typeof url === "string" ? url : undefined;
}

function repositoryDirectoryOf(repository: unknown): string | undefined {
  if (!repository || typeof repository !== "object") return undefined;
  const dir = (repository as { directory?: unknown }).directory;
  return typeof dir === "string" ? dir : undefined;
}

const eq = (a: unknown, b: unknown): boolean => JSON.stringify(a) === JSON.stringify(b);

/** One manifest assertion: `ok` passes silently, otherwise `msg` describes the violation. */
interface Check {
  ok: (m: PackageManifest, pkg: PackageRef) => boolean;
  msg: (m: PackageManifest, pkg: PackageRef) => string;
}

// Data-driven so each assertion stays a one-line predicate + message; evaluated top-to-bottom, and the
// messages are the check's public contract (sync-repository-metadata.ts mirrors these fields).
const CHECKS: Check[] = [
  // Linkage + provenance metadata.
  {
    ok: (m) => repositoryUrlOf(m.repository) === REPOSITORY_URL,
    msg: (m) =>
      `repository.url is ${JSON.stringify(repositoryUrlOf(m.repository) ?? "")}, expected ${JSON.stringify(REPOSITORY_URL)}`,
  },
  {
    ok: (m, pkg) => repositoryDirectoryOf(m.repository) === pkg.path,
    msg: (m, pkg) =>
      `repository.directory is ${JSON.stringify(repositoryDirectoryOf(m.repository) ?? "")}, expected ${JSON.stringify(pkg.path)}`,
  },
  {
    ok: (m) => m.homepage === HOMEPAGE_URL,
    msg: (m) =>
      `homepage is ${JSON.stringify(m.homepage ?? "")}, expected ${JSON.stringify(HOMEPAGE_URL)}`,
  },
  {
    ok: (m) => m.bugs === BUGS_URL,
    msg: (m) => `bugs is ${JSON.stringify(m.bugs ?? "")}, expected ${JSON.stringify(BUGS_URL)}`,
  },
  // Build-hint metadata.
  {
    ok: (m) => eq(m.sideEffects, expectedSideEffects(m)),
    msg: (m) =>
      `sideEffects is ${JSON.stringify(m.sideEffects ?? null)}, expected ${JSON.stringify(expectedSideEffects(m))}`,
  },
  {
    ok: (m) => eq(m.engines, ENGINES),
    msg: (m) =>
      `engines is ${JSON.stringify(m.engines ?? null)}, expected ${JSON.stringify(ENGINES)}`,
  },
  {
    ok: (m) => (m.publishConfig as { provenance?: unknown } | undefined)?.provenance === true,
    msg: () => "publishConfig.provenance is not true",
  },
  // Regression insurance on the already-consistent fields.
  {
    ok: (m) => m.license === "MIT",
    msg: (m) => `license is ${JSON.stringify(m.license ?? "")}, expected "MIT"`,
  },
  {
    ok: (m) => m.type === "module",
    msg: (m) => `type is ${JSON.stringify(m.type ?? "")}, expected "module"`,
  },
  {
    ok: (m) => Array.isArray(m.files) && m.files.length > 0,
    msg: () => "files is missing or empty",
  },
  {
    ok: (m) => typeof m.description === "string" && m.description.length > 0,
    msg: () => "description is missing or empty",
  },
];

function checkManifest(pkg: PackageRef, m: PackageManifest): string[] {
  return CHECKS.filter((check) => !check.ok(m, pkg)).map(
    (check) => `${pkg.name} (${pkg.path}/package.json): ${check.msg(m, pkg)}`,
  );
}

async function main() {
  const { packages } = await loadWorkspacePackages();
  const publishable = packages.filter((pkg) => isPublishablePackage(pkg));

  const violations: string[] = [];
  for (const pkg of publishable) {
    const manifestPath = path.resolve(pkg.path, "package.json");
    const m = JSON.parse(await fs.readFile(manifestPath, "utf8")) as PackageManifest;
    violations.push(...checkManifest(pkg, m));
  }

  if (violations.length > 0) {
    console.error("Repository metadata check failed for publishable packages:");
    for (const violation of violations) {
      console.error(`- ${violation}`);
    }
    process.exitCode = 1;
    return;
  }

  process.stdout.write(
    `Repository metadata check passed for ${publishable.length} publishable packages.\n`,
  );
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
