import fs from "node:fs/promises";
import path from "node:path";

import { isPublishablePackage, loadWorkspacePackages } from "./workspace-packages.ts";

interface PackageManifest {
  repository?: unknown;
}

const EXPECTED_REPOSITORY_URL = "git+https://github.com/thedannywahl/pantoken.git";

function extractRepositoryUrl(repository: unknown): string | undefined {
  if (typeof repository === "string") {
    return repository;
  }

  if (!repository || typeof repository !== "object") {
    return undefined;
  }

  const maybeUrl = (repository as { url?: unknown }).url;
  return typeof maybeUrl === "string" ? maybeUrl : undefined;
}

async function main() {
  const { packages } = await loadWorkspacePackages();
  const publishable = packages.filter((pkg) => isPublishablePackage(pkg));

  const violations: string[] = [];

  for (const pkg of publishable) {
    const manifestPath = path.resolve(pkg.path, "package.json");
    const raw = await fs.readFile(manifestPath, "utf8");
    const manifest = JSON.parse(raw) as PackageManifest;

    const repositoryUrl = extractRepositoryUrl(manifest.repository);

    if (repositoryUrl !== EXPECTED_REPOSITORY_URL) {
      violations.push(
        `${pkg.name} (${pkg.path}/package.json): repository.url is ${JSON.stringify(repositoryUrl ?? "")}, expected ${JSON.stringify(EXPECTED_REPOSITORY_URL)}`,
      );
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
