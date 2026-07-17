import { spawnSync } from "node:child_process";
import process from "node:process";
import {
  buildReverseDependencyMap,
  computeReleaseSet,
  isPublishablePackage,
  loadWorkspacePackages,
} from "./workspace-packages.mjs";

function readArg(flag) {
  const index = process.argv.indexOf(flag);
  if (index >= 0 && index + 1 < process.argv.length) {
    return process.argv[index + 1];
  }
  return undefined;
}

function readPositionalTarget() {
  for (const arg of process.argv.slice(2)) {
    if (arg.startsWith("-")) {
      continue;
    }
    return arg;
  }
  return undefined;
}

function normalizeTarget(value) {
  if (!value) {
    return value;
  }
  if (value.startsWith("@pantokens/")) {
    return value.replace("@pantokens/", "@pantoken/");
  }
  return value;
}

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    stdio: options.capture ? ["ignore", "pipe", "pipe"] : "inherit",
    encoding: "utf8",
    shell: false,
  });

  if (result.status !== 0) {
    const stderr = result.stderr?.trim();
    throw new Error(
      stderr && stderr.length > 0
        ? `${command} ${args.join(" ")} failed: ${stderr}`
        : `${command} ${args.join(" ")} failed with exit code ${result.status}`,
    );
  }

  return result;
}

function ensureCleanWorktree() {
  const result = run("git", ["status", "--porcelain"], { capture: true });
  const dirty = result.stdout.trim();
  if (dirty.length > 0) {
    throw new Error(
      "Refusing automated release cut with a dirty git worktree. Commit or stash pending changes first.",
    );
  }
}

async function main() {
  const rawTarget = readArg("--target") ?? readPositionalTarget();
  const target = normalizeTarget(rawTarget);

  if (!target) {
    throw new Error("Missing target package. Example: vpr release @pantoken/components");
  }

  ensureCleanWorktree();

  const initialWorkspace = await loadWorkspacePackages();
  const targetPkg = initialWorkspace.byName.get(target);

  if (!targetPkg) {
    throw new Error(`Unknown workspace package: ${target}`);
  }

  if (!isPublishablePackage(targetPkg)) {
    throw new Error(`Target package is not publishable: ${target}`);
  }

  const reverse = buildReverseDependencyMap(initialWorkspace.packages);
  const releaseNames = computeReleaseSet(target, initialWorkspace.byName, reverse)
    .map((name) => initialWorkspace.byName.get(name))
    .filter((pkg) => isPublishablePackage(pkg))
    .map((pkg) => pkg.name)
    .sort((a, b) => a.localeCompare(b));

  const releasePackageJsonFiles = releaseNames.map((name) => {
    const pkg = initialWorkspace.byName.get(name);
    return `${pkg.path}/package.json`;
  });

  const releaseFilters = releaseNames.flatMap((name) => ["-F", name]);

  process.stdout.write(`Target package: ${target}\n`);
  process.stdout.write(`Release set (${releaseNames.length}):\n`);
  for (const name of releaseNames) {
    process.stdout.write(`- ${name}\n`);
  }

  // Scope release gates to the computed release set only.
  run("vp", ["run", "-r", ...releaseFilters, "build"]);
  run("vp", ["run", "-r", ...releaseFilters, "check", "--fix"]);
  run("vp", ["run", "-r", ...releaseFilters, "test"]);

  if (
    releaseNames.includes("@pantoken/components") ||
    releaseNames.includes("@pantoken/web-components")
  ) {
    run("vp", ["run", "lint:css"]);
    run("vp", ["run", "lint:js"]);
  }

  run("vp", ["exec", ...releaseFilters, "publint"]);
  run("vp", [
    "exec",
    ...releaseFilters,
    "attw",
    "--pack",
    "--profile",
    "strict",
    "--no-emoji",
    "--ignore-rules",
    "no-resolution",
    "cjs-resolves-to-esm",
  ]);

  // Interactive version selection and confirmation for all package manifests in the release set.
  run("vpx", [
    "bumpp",
    ...releasePackageJsonFiles,
    "--git-check",
    "--print-commits",
    "--no-commit",
    "--no-tag",
    "--no-push",
  ]);

  const refreshedWorkspace = await loadWorkspacePackages();
  const refreshedTarget = refreshedWorkspace.byName.get(target);
  const targetVersion = refreshedTarget?.version;

  if (!targetVersion) {
    throw new Error(`Unable to read bumped version for ${target}`);
  }

  const tag = `${target}@v${targetVersion}`;

  run("node", [
    "scripts/release/plan-package-release.mjs",
    "--target",
    target,
    "--version",
    targetVersion,
    "--json",
    ".release-plan.json",
    "--publish-list",
    ".release-packages.txt",
    "--markdown",
    ".release-plan.md",
  ]);

  run("node", [
    "scripts/release/build-root-changelog.mjs",
    "--plan",
    ".release-plan.json",
    "--out",
    "CHANGELOG.md",
  ]);

  run("git", [
    "add",
    ...releasePackageJsonFiles,
    "CHANGELOG.md",
    ".release-plan.json",
    ".release-packages.txt",
    ".release-plan.md",
  ]);

  run("git", ["commit", "-m", `release: ${tag}`]);
  run("git", ["tag", tag]);
  run("git", ["push"]);
  run("git", ["push", "origin", tag]);

  process.stdout.write(`Release cut complete: ${tag}\n`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
