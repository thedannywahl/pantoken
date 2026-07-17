import { execFile } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { promisify } from "node:util";
import { loadWorkspacePackages, parsePackageTag } from "./workspace-packages.mjs";

const execFileAsync = promisify(execFile);

function readArg(flag, fallback) {
  const index = process.argv.indexOf(flag);
  if (index >= 0 && index + 1 < process.argv.length) {
    return process.argv[index + 1];
  }
  return fallback;
}

function hasFlag(flag) {
  return process.argv.includes(flag);
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function extractVersionSection(changelog, version) {
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

function stripTopVersionHeading(section, version) {
  const heading = new RegExp(`^##\\s+\\[?v?${escapeRegex(version)}\\]?\\b\\s*\\n?`, "i");
  return section.replace(heading, "").trim();
}

async function readTagRefs() {
  const { stdout } = await execFileAsync("git", [
    "for-each-ref",
    "--format=%(refname:short)|%(creatordate:iso8601)",
    "refs/tags/@pantoken/*@v*",
  ]);

  const rows = stdout
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => {
      const [tag, createdAt] = line.split("|");
      return { tag, createdAt };
    })
    .filter((item) => parsePackageTag(item.tag));

  return rows;
}

async function main() {
  const outputFile = readArg("--out", "CHANGELOG.md");
  const planFile = readArg("--plan");
  const includeInitialSeed = hasFlag("--seed-initial");
  const { byName, rootDir, packages } = await loadWorkspacePackages();
  const refs = await readTagRefs();

  const entries = refs
    .map((ref) => {
      const parsed = parsePackageTag(ref.tag);
      if (!parsed) {
        return null;
      }

      return {
        kind: "tag",
        tag: ref.tag,
        packageName: parsed.packageName,
        version: parsed.version,
        createdAt: ref.createdAt,
      };
    })
    .filter(Boolean);

  if (includeInitialSeed) {
    const existing = new Set(entries.map((entry) => `${entry.packageName}@${entry.version}`));
    const seedTimestamp = new Date().toISOString();

    for (const pkg of packages) {
      if (pkg.private || !pkg.name.startsWith("@pantoken/")) {
        continue;
      }

      if (pkg.version !== "0.1.0") {
        continue;
      }

      const key = `${pkg.name}@0.1.0`;
      if (existing.has(key)) {
        continue;
      }

      entries.push({
        kind: "seed",
        tag: `${pkg.name}@v0.1.0`,
        packageName: pkg.name,
        version: "0.1.0",
        createdAt: seedTimestamp,
      });
      existing.add(key);
    }
  }

  if (planFile) {
    const rawPlan = await fs.readFile(path.resolve(planFile), "utf8");
    const plan = JSON.parse(rawPlan);
    const existing = new Set(entries.map((entry) => `${entry.packageName}@${entry.version}`));
    const planTimestamp = new Date().toISOString();

    for (const packageName of plan.publishPackages ?? []) {
      const version = plan.manifestVersions?.[packageName];
      if (typeof version !== "string" || version.length === 0) {
        continue;
      }

      const key = `${packageName}@${version}`;
      if (existing.has(key)) {
        continue;
      }

      if (!byName.has(packageName)) {
        continue;
      }

      entries.push({
        kind: "plan",
        tag: `${packageName}@v${version}`,
        packageName,
        version,
        createdAt: planTimestamp,
      });
      existing.add(key);
    }
  }

  entries.sort((a, b) => {
    const timeDiff = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    if (timeDiff !== 0) {
      return timeDiff;
    }
    return a.tag.localeCompare(b.tag);
  });

  const lines = ["# CHANGELOG", ""];

  for (const entry of entries) {
    const pkg = byName.get(entry.packageName);
    if (!pkg) {
      continue;
    }

    lines.push(`## ${entry.packageName}@${entry.version}`);
    lines.push("");

    const absChangelogPath = path.join(rootDir, pkg.path, "CHANGELOG.md");

    let section = null;
    try {
      const changelog = await fs.readFile(absChangelogPath, "utf8");
      section = extractVersionSection(changelog, entry.version);
    } catch {
      section = null;
    }

    if (section) {
      lines.push(stripTopVersionHeading(section, entry.version));
      lines.push("");
      continue;
    }

    lines.push("### Added");
    lines.push("");
    lines.push(`- Initial release of ${entry.packageName}.`);
    lines.push("");
  }

  await fs.writeFile(path.resolve(outputFile), `${lines.join("\n")}\n`);
  process.stdout.write(`Wrote ${outputFile}\n`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
