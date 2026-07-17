import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { loadWorkspacePackages, parsePackageTag } from "./workspace-packages.ts";

interface ReleasePlan {
  tag?: string;
  targetPackage?: string;
  targetVersion?: string;
  publishPackages: string[];
  manifestVersions?: Record<string, string>;
}

function readArg(flag: string, fallback?: string): string | undefined {
  const index = process.argv.indexOf(flag);
  if (index >= 0 && index + 1 < process.argv.length) {
    return process.argv[index + 1];
  }
  return fallback;
}

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function extractVersionSection(changelog: string, version: string): string | null {
  const heading = new RegExp(`^##\\s+\\[?v?${escapeRegex(version)}\\]?\\b`, "m");
  const match = heading.exec(changelog);
  if (!match || typeof match.index !== "number") {
    return null;
  }

  const start = match.index;
  const nextMatch = /^##\s+/gm;
  nextMatch.lastIndex = start + match[0].length;
  const next = nextMatch.exec(changelog);
  const end = next ? next.index : changelog.length;

  return changelog.slice(start, end).trim();
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
  const planFile = readArg("--plan", ".release-plan.json") ?? ".release-plan.json";
  const outputFile = readArg("--out", "release-notes.md") ?? "release-notes.md";
  const parsedTag = parsePackageTag(
    readArg("--tag") ?? process.env.RELEASE_TAG ?? process.env.GITHUB_REF_NAME ?? "",
  );

  const rawPlan = await fs.readFile(path.resolve(planFile), "utf8");
  const plan = JSON.parse(rawPlan) as ReleasePlan;
  const { byName, rootDir } = await loadWorkspacePackages();

  const tag =
    plan.tag ?? (parsedTag ? `${parsedTag.packageName}@v${parsedTag.version}` : "unknown");
  const title = parsedTag
    ? `${parsedTag.packageName} v${parsedTag.version}`
    : `${plan.targetPackage} v${plan.targetVersion}`;

  const lines = [
    `# ${title}`,
    "",
    `- Tag: ${tag}`,
    `- Generated: ${new Date().toISOString()}`,
    `- Publish set size: ${plan.publishPackages.length}`,
    "",
    "## Published Packages",
    "",
  ];

  for (const packageName of plan.publishPackages ?? []) {
    const pkg = byName.get(packageName);
    const version = plan.manifestVersions?.[packageName] ?? pkg?.version ?? "unknown";
    lines.push(`### ${packageName}@${version}`);
    lines.push("");

    if (!pkg) {
      lines.push("Package metadata unavailable.");
      lines.push("");
      continue;
    }

    const changelogPath = path.join(rootDir, pkg.path, "CHANGELOG.md");
    if (!(await fileExists(changelogPath))) {
      lines.push("No package changelog entry found.");
      lines.push("");
      continue;
    }

    const changelog = await fs.readFile(changelogPath, "utf8");
    const section = extractVersionSection(changelog, version);
    if (!section) {
      lines.push("No changelog section for this version.");
      lines.push("");
      continue;
    }

    lines.push(section);
    lines.push("");
  }

  await fs.writeFile(path.resolve(outputFile), `${lines.join("\n")}\n`);
  process.stdout.write(`Wrote ${outputFile}\n`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
