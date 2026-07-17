import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { pathToFileURL } from "node:url";
import {
  buildReverseDependencyMap,
  computeReleaseSet,
  isPublishablePackage,
  loadWorkspacePackages,
  type WorkspacePackage,
  parsePackageTag,
} from "./workspace-packages.ts";

interface ReleasePlanPayload {
  generatedAt: string;
  targetPackage: string;
  targetVersion: string;
  tag: string;
  publishPackages: string[];
  packagePaths: Record<string, string>;
  manifestVersions: Record<string, string>;
}

interface PlanInputs {
  target: string;
  version?: string;
  tag?: string;
}

function readArg(flag: string, fallback?: string): string | undefined {
  const index = process.argv.indexOf(flag);
  if (index >= 0 && index + 1 < process.argv.length) {
    return process.argv[index + 1];
  }
  return fallback;
}

function getTagInput(): string | undefined {
  return readArg("--tag") ?? process.env.RELEASE_TAG ?? process.env.GITHUB_REF_NAME;
}

function isDirectExecution(metaUrl: string): boolean {
  const entry = process.argv[1];
  if (!entry) {
    return false;
  }

  return pathToFileURL(path.resolve(entry)).href === metaUrl;
}

export function resolvePlanInputs(inputs: PlanInputs): {
  target: string;
  version?: string;
  tag?: string;
} {
  const tag = inputs.tag;
  let target = inputs.target;
  let version = inputs.version;

  if (tag && (!target || !version)) {
    const parsed = parsePackageTag(tag);
    if (!parsed) {
      throw new Error(`Invalid package tag "${tag}". Expected @pantoken/pkg@vX.Y.Z`);
    }

    target ||= parsed.packageName;
    version ||= parsed.version;
  }

  if (!target) {
    throw new Error("Missing --target (or --tag/RELEASE_TAG/GITHUB_REF_NAME)");
  }

  return { target, version, tag };
}

async function main() {
  const resolved = resolvePlanInputs({
    target: readArg("--target") ?? "",
    version: readArg("--version"),
    tag: getTagInput(),
  });
  const target = resolved.target;
  const version = resolved.version;
  const tag = resolved.tag;

  const { byName, packages } = await loadWorkspacePackages();
  const targetPkg = byName.get(target);

  if (!targetPkg) {
    throw new Error(`Unknown workspace package: ${target}`);
  }

  const reverse = buildReverseDependencyMap(packages);
  const releaseSet = computeReleaseSet(target, byName, reverse)
    .map((name) => byName.get(name))
    .filter((pkg): pkg is WorkspacePackage => isPublishablePackage(pkg));

  const releaseNames = releaseSet.map((pkg) => pkg.name);
  const manifestVersions = Object.fromEntries(releaseSet.map((pkg) => [pkg.name, pkg.version]));

  const payload: ReleasePlanPayload = {
    generatedAt: new Date().toISOString(),
    targetPackage: target,
    targetVersion: version ?? targetPkg.version,
    tag: tag ?? `${target}@v${version ?? targetPkg.version}`,
    publishPackages: releaseNames,
    packagePaths: Object.fromEntries(releaseSet.map((pkg) => [pkg.name, pkg.path])),
    manifestVersions,
  };

  const jsonFile = readArg("--json");
  if (jsonFile) {
    await fs.writeFile(path.resolve(jsonFile), `${JSON.stringify(payload, null, 2)}\n`);
  }

  const publishListFile = readArg("--publish-list");
  if (publishListFile) {
    await fs.writeFile(path.resolve(publishListFile), `${releaseNames.join("\n")}\n`);
  }

  const markdownFile = readArg("--markdown");
  if (markdownFile) {
    const lines = [
      "# Package Release Plan",
      "",
      `- Tag: ${payload.tag}`,
      `- Target package: ${payload.targetPackage}`,
      `- Target version: ${payload.targetVersion}`,
      "- Publish set:",
      ...releaseNames.map((name) => `  - ${name}`),
      "",
    ];

    await fs.writeFile(path.resolve(markdownFile), `${lines.join("\n")}\n`);
  }

  if (process.env.GITHUB_OUTPUT) {
    const output = [
      `target_package=${payload.targetPackage}`,
      `target_version=${payload.targetVersion}`,
      `publish_count=${releaseNames.length}`,
      `publish_packages=${releaseNames.join(",")}`,
    ];

    await fs.appendFile(process.env.GITHUB_OUTPUT, `${output.join("\n")}\n`);
  }

  process.stdout.write(`${JSON.stringify(payload, null, 2)}\n`);
}

if (isDirectExecution(import.meta.url)) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  });
}

export type { ReleasePlanPayload };
