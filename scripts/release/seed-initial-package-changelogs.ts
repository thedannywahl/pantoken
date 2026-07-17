import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { isPublishablePackage, loadWorkspacePackages } from "./workspace-packages.ts";

function hasVersionSection(content: string, version: string): boolean {
  const heading = new RegExp(
    `^##\\s+\\[?v?${version.replace(/[.*+?^${}()|[\\]\\]/g, "\\\\$&")}\\]?\\b`,
    "m",
  );
  return heading.test(content);
}

function buildInitialChangelog(packageName: string): string {
  return [
    "# CHANGELOG",
    "",
    "## 0.1.0",
    "",
    "### Added",
    "",
    `- Initial release of ${packageName}.`,
    "",
  ].join("\n");
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const { packages, rootDir } = await loadWorkspacePackages();
  const publishable = packages
    .filter((pkg) => isPublishablePackage(pkg))
    .sort((a, b) => a.name.localeCompare(b.name));

  const seeded = [];
  const skipped = [];

  for (const pkg of publishable) {
    if (pkg.version !== "0.1.0") {
      skipped.push(`${pkg.name} (version ${pkg.version})`);
      continue;
    }

    const changelogPath = path.join(rootDir, pkg.path, "CHANGELOG.md");

    if (!(await fileExists(changelogPath))) {
      await fs.writeFile(changelogPath, buildInitialChangelog(pkg.name));
      seeded.push(pkg.name);
      continue;
    }

    const content = await fs.readFile(changelogPath, "utf8");
    if (hasVersionSection(content, "0.1.0")) {
      skipped.push(`${pkg.name} (already has 0.1.0 section)`);
      continue;
    }

    const section = ["## 0.1.0", "", "### Added", "", `- Initial release of ${pkg.name}.`, ""].join(
      "\n",
    );

    const nextContent = content.startsWith("# CHANGELOG")
      ? content.replace(/^# CHANGELOG\s*\n?/m, `# CHANGELOG\n\n${section}`)
      : `${buildInitialChangelog(pkg.name)}${content}`;

    await fs.writeFile(changelogPath, nextContent);
    seeded.push(pkg.name);
  }

  process.stdout.write(`Seeded ${seeded.length} package changelogs.\n`);
  if (seeded.length > 0) {
    process.stdout.write(`${seeded.join("\n")}\n`);
  }

  if (skipped.length > 0) {
    process.stdout.write(`Skipped ${skipped.length} packages.\n`);
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
