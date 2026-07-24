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

async function main() {
  const { packages } = await loadWorkspacePackages();
  const publishable = packages.filter((pkg) => isPublishablePackage(pkg));

  const violations: string[] = [];

  for (const pkg of publishable) {
    const manifestPath = path.resolve(pkg.path, "package.json");
    const raw = await fs.readFile(manifestPath, "utf8");
    const m = JSON.parse(raw) as PackageManifest;

    const fail = (msg: string): void => {
      violations.push(`${pkg.name} (${pkg.path}/package.json): ${msg}`);
    };

    // Linkage + provenance metadata.
    if (repositoryUrlOf(m.repository) !== REPOSITORY_URL) {
      fail(
        `repository.url is ${JSON.stringify(repositoryUrlOf(m.repository) ?? "")}, expected ${JSON.stringify(REPOSITORY_URL)}`,
      );
    }
    if (repositoryDirectoryOf(m.repository) !== pkg.path) {
      fail(
        `repository.directory is ${JSON.stringify(repositoryDirectoryOf(m.repository) ?? "")}, expected ${JSON.stringify(pkg.path)}`,
      );
    }
    if (m.homepage !== HOMEPAGE_URL) {
      fail(
        `homepage is ${JSON.stringify(m.homepage ?? "")}, expected ${JSON.stringify(HOMEPAGE_URL)}`,
      );
    }
    if (m.bugs !== BUGS_URL) {
      fail(`bugs is ${JSON.stringify(m.bugs ?? "")}, expected ${JSON.stringify(BUGS_URL)}`);
    }

    // Build-hint metadata.
    const wantSideEffects = expectedSideEffects(m);
    if (!eq(m.sideEffects, wantSideEffects)) {
      fail(
        `sideEffects is ${JSON.stringify(m.sideEffects ?? null)}, expected ${JSON.stringify(wantSideEffects)}`,
      );
    }
    if (!eq(m.engines, ENGINES)) {
      fail(`engines is ${JSON.stringify(m.engines ?? null)}, expected ${JSON.stringify(ENGINES)}`);
    }
    const provenance = (m.publishConfig as { provenance?: unknown } | undefined)?.provenance;
    if (provenance !== true) {
      fail("publishConfig.provenance is not true");
    }

    // Regression insurance on the already-consistent fields.
    if (m.license !== "MIT") fail(`license is ${JSON.stringify(m.license ?? "")}, expected "MIT"`);
    if (m.type !== "module") fail(`type is ${JSON.stringify(m.type ?? "")}, expected "module"`);
    if (!Array.isArray(m.files) || m.files.length === 0) fail("files is missing or empty");
    if (typeof m.description !== "string" || m.description.length === 0) {
      fail("description is missing or empty");
    }
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
