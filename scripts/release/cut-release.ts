import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { pathToFileURL } from "node:url";
import {
  buildReverseDependencyMap,
  computeReleaseSet,
  isPublishablePackage,
  loadWorkspacePackages,
  normalizePantokenPackageName,
  parseRequestedPackageSpec,
  type WorkspacePackage,
} from "./workspace-packages.ts";

type PreReleaseChannel = "alpha" | "beta" | "rc";

interface CliOptions {
  help: boolean;
  force: boolean;
  channel?: PreReleaseChannel;
  packageSpecs: string[];
}

interface ResolvedRequest {
  packageName: string;
  version: string;
  source: "explicit" | "default" | "channel";
}

interface DistTagMap {
  [tag: string]: string;
}

interface PackageManifestScripts {
  scripts?: Record<string, unknown>;
}

interface DependencyVersionChange {
  name: string;
  from: string;
  to: string;
}

const SEMVER_RE = /^(\d+)\.(\d+)\.(\d+)(?:-([0-9A-Za-z.-]+))?$/;
const CHANNELS = new Set<PreReleaseChannel>(["alpha", "beta", "rc"]);
const DEFAULT_CHANGELOG_LINE = "Updated internal workspace dependency versions.";

function ensureNoNestedVpRun(env: NodeJS.ProcessEnv = process.env) {
  if (!env.VP_CLI_BIN) {
    return;
  }

  throw new Error(
    "Refusing to run release inside a vp-managed process. Nested vp run/pack can fail with Invalid argument (os error 22). Run node scripts/release/cut-release.ts from a top-level shell.",
  );
}

function isDirectExecution(metaUrl: string): boolean {
  const entry = process.argv[1];
  if (!entry) {
    return false;
  }

  return pathToFileURL(path.resolve(entry)).href === metaUrl;
}

function printHelp() {
  process.stdout.write(`cut-release\n\n`);
  process.stdout.write(`Usage:\n`);
  process.stdout.write(
    `  node scripts/release/cut-release.ts -p <pkg[@version|@alpha|@beta|@rc]> [-p <pkg[@...] ...] [--alpha|--beta|--rc|--release-candidate] [--force]\n`,
  );
  process.stdout.write(
    `  node scripts/release/cut-release.ts <pkg[@version|@alpha|@beta|@rc]> [<pkg[@...] ...] [--alpha|--beta|--rc|--release-candidate] [--force]\n\n`,
  );
  process.stdout.write(`Options:\n`);
  process.stdout.write(`  -h, --help                Show help\n`);
  process.stdout.write(`  -f, --force               Pass --yes to bumpp\n`);
  process.stdout.write(`  -p, --package <spec>      Package spec (repeatable)\n`);
  process.stdout.write(`  --alpha | --beta | --rc | --release-candidate\n`);
  process.stdout.write(
    `                           Apply prerelease channel to stable/implicit bumps\n\n`,
  );
  process.stdout.write(`Rules:\n`);
  process.stdout.write(`  - Use either -p/--package specs or positional specs, not both.\n`);
  process.stdout.write(`  - @pantoken/ prefix is optional (foo == @pantoken/foo).\n`);
  process.stdout.write(
    `  - <pkg>@beta|alpha|rc increments matching npm dist-tag if available, otherwise patch + channel.1.\n`,
  );
  process.stdout.write(`  - --target is no longer supported.\n`);
}

function parseCliArgs(argv: string[]): CliOptions {
  const packageFlagSpecs: string[] = [];
  const positionalSpecs: string[] = [];
  let force = false;
  let help = false;
  let channel: PreReleaseChannel | undefined;

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];

    if (arg === "-h" || arg === "--help") {
      help = true;
      continue;
    }

    if (arg === "-f" || arg === "--force") {
      force = true;
      continue;
    }

    if (arg === "--target") {
      throw new Error(
        "--target is no longer supported. Use -p/--package or positional package specs.",
      );
    }

    if (arg === "--alpha" || arg === "--beta" || arg === "--rc" || arg === "--release-candidate") {
      const nextChannel: PreReleaseChannel =
        arg === "--alpha" ? "alpha" : arg === "--beta" ? "beta" : "rc";
      if (channel && channel !== nextChannel) {
        throw new Error("Only one prerelease channel flag may be provided.");
      }
      channel = nextChannel;
      continue;
    }

    if (arg === "-p" || arg === "--package") {
      const value = argv[i + 1];
      if (!value || value.startsWith("-")) {
        throw new Error(`${arg} requires a package spec value.`);
      }
      packageFlagSpecs.push(value);
      i += 1;
      continue;
    }

    if (arg.startsWith("--package=")) {
      const value = arg.slice("--package=".length);
      if (!value) {
        throw new Error("--package requires a package spec value.");
      }
      packageFlagSpecs.push(value);
      continue;
    }

    if (arg.startsWith("-")) {
      throw new Error(`Unknown option: ${arg}`);
    }

    positionalSpecs.push(arg);
  }

  if (packageFlagSpecs.length > 0 && positionalSpecs.length > 0) {
    throw new Error("Do not mix -p/--package with positional package specs.");
  }

  return {
    help,
    force,
    channel,
    packageSpecs: packageFlagSpecs.length > 0 ? packageFlagSpecs : positionalSpecs,
  };
}

function readJsonObject<T>(raw: string): T {
  return JSON.parse(raw) as T;
}

function parseSemver(version: string): RegExpExecArray {
  const match = SEMVER_RE.exec(version);
  if (!match) {
    throw new Error(`Expected a semver version, got: ${version}`);
  }
  return match;
}

function bumpPatch(version: string): string {
  const [, major, minor, patch] = parseSemver(version);
  return `${major}.${minor}.${Number.parseInt(patch, 10) + 1}`;
}

function withPreRelease(version: string, channel: PreReleaseChannel): string {
  const [, major, minor, patch] = parseSemver(version);
  return `${major}.${minor}.${patch}-${channel}.1`;
}

function bumpPreRelease(version: string, channel: PreReleaseChannel): string | null {
  const [, major, minor, patch, pre] = parseSemver(version);
  if (!pre) {
    return null;
  }

  const expectedPrefix = `${channel}.`;
  if (!pre.startsWith(expectedPrefix)) {
    return null;
  }

  const value = pre.slice(expectedPrefix.length);
  const asInt = Number.parseInt(value, 10);
  if (!Number.isFinite(asInt)) {
    return null;
  }

  return `${major}.${minor}.${patch}-${channel}.${asInt + 1}`;
}

async function loadDistTags(packageName: string): Promise<DistTagMap> {
  const result = run("npm", ["view", packageName, "dist-tags", "--json"], {
    capture: true,
    allowFailure: true,
  });
  if (result.status !== 0) {
    return {};
  }

  const body = result.stdout.trim();
  if (body.length === 0) {
    return {};
  }

  try {
    return readJsonObject<DistTagMap>(body);
  } catch {
    return {};
  }
}

async function resolveRequestedVersions(
  requestedSpecs: string[],
  byName: Map<string, WorkspacePackage>,
  channelFlag?: PreReleaseChannel,
  distTagLoader: (packageName: string) => Promise<DistTagMap> = loadDistTags,
): Promise<ResolvedRequest[]> {
  const seen = new Set<string>();
  const output: ResolvedRequest[] = [];

  for (const spec of requestedSpecs) {
    const parsed = parseRequestedPackageSpec(spec);
    const pkg = byName.get(parsed.packageName);

    if (!pkg) {
      throw new Error(`Unknown workspace package: ${parsed.packageName}`);
    }

    if (seen.has(parsed.packageName)) {
      throw new Error(`Duplicate package requested: ${parsed.packageName}`);
    }
    seen.add(parsed.packageName);

    const token = parsed.versionOrChannel;
    if (token && channelFlag && CHANNELS.has(token as PreReleaseChannel)) {
      throw new Error(
        `Do not combine package channel token (${parsed.raw}) with --${channelFlag}.`,
      );
    }

    const current = pkg.version;
    if (!token) {
      const base = bumpPatch(current);
      output.push({
        packageName: parsed.packageName,
        version: channelFlag ? withPreRelease(base, channelFlag) : base,
        source: "default",
      });
      continue;
    }

    const normalizedToken = token.toLowerCase();
    if (CHANNELS.has(normalizedToken as PreReleaseChannel)) {
      const channel = normalizedToken as PreReleaseChannel;
      const distTags = await distTagLoader(parsed.packageName);
      const currentTag = distTags[channel];
      const bumped = currentTag ? bumpPreRelease(currentTag, channel) : null;

      output.push({
        packageName: parsed.packageName,
        version: bumped ?? withPreRelease(bumpPatch(current), channel),
        source: "channel",
      });
      continue;
    }

    // Token is an explicit semver-like version.
    parseSemver(token);
    output.push({
      packageName: parsed.packageName,
      version: channelFlag ? withPreRelease(token, channelFlag) : token,
      source: "explicit",
    });
  }

  return output;
}

function mergeReleaseSet(
  targets: string[],
  byName: Map<string, WorkspacePackage>,
  reverseMap: Map<string, Set<string>>,
): string[] {
  const merged = new Set<string>();

  for (const target of targets) {
    const set = computeReleaseSet(target, byName, reverseMap);
    for (const name of set) {
      merged.add(name);
    }
  }

  return [...merged].sort((a, b) => a.localeCompare(b));
}

async function writePackageChangelog(
  rootDir: string,
  pkg: WorkspacePackage,
  version: string,
  line: string = DEFAULT_CHANGELOG_LINE,
) {
  const changelogPath = path.join(rootDir, pkg.path, "CHANGELOG.md");
  const section = [`## ${version}`, "", "### Changed", "", `- ${line}`, ""].join("\n");

  let current = "";
  try {
    current = await fs.readFile(changelogPath, "utf8");
  } catch {
    current = "# CHANGELOG\n\n";
  }

  const hasSection = new RegExp(
    `^##\\s+\\[?v?${version.replace(/[.*+?^${}()|[\\]\\]/g, "\\$&")}\\]?\\b`,
    "m",
  ).test(current);
  if (hasSection) {
    return;
  }

  const next = current.startsWith("# CHANGELOG")
    ? current.replace(/^# CHANGELOG\s*\n?/m, `# CHANGELOG\n\n${section}`)
    : `# CHANGELOG\n\n${section}${current}`;

  await fs.writeFile(changelogPath, next);
}

function collectWorkspaceDependencyVersionChanges(
  pkg: WorkspacePackage,
  previousByName: Map<string, WorkspacePackage>,
  nextByName: Map<string, WorkspacePackage>,
): DependencyVersionChange[] {
  const changes: DependencyVersionChange[] = [];

  for (const depName of [...pkg.workspaceDeps].sort((a, b) => a.localeCompare(b))) {
    const previous = previousByName.get(depName);
    const next = nextByName.get(depName);
    if (!previous || !next) {
      continue;
    }
    if (previous.version === next.version) {
      continue;
    }

    changes.push({
      name: depName,
      from: previous.version,
      to: next.version,
    });
  }

  return changes;
}

function buildDependencyChangelogLine(changes: DependencyVersionChange[]): string {
  if (changes.length === 0) {
    return DEFAULT_CHANGELOG_LINE;
  }

  const lines = [
    "Updated internal workspace dependencies:",
    ...changes.map((change) => `  - ${change.name}: ${change.from} -> ${change.to}`),
  ];
  return lines.join("\n");
}

function packageHasScript(rootDir: string, pkgPath: string, scriptName: string): boolean {
  try {
    const raw = readFileSync(path.join(rootDir, pkgPath, "package.json"), "utf8");
    const manifest = readJsonObject<PackageManifestScripts>(raw);
    return typeof manifest.scripts?.[scriptName] === "string";
  } catch {
    return false;
  }
}

function runFilteredTask(
  rootDir: string,
  taskName: string,
  extraArgs: string[],
  releaseNames: string[],
  byName: Map<string, WorkspacePackage>,
) {
  const supported = releaseNames.filter((name) => {
    const pkg = byName.get(name);
    if (!pkg) {
      return false;
    }
    return packageHasScript(rootDir, pkg.path, taskName);
  });

  if (supported.length === 0) {
    process.stdout.write(`Skipping task ${taskName}: no release packages define it.\n`);
    return;
  }

  run("vp", ["run", ...supported.flatMap((name) => ["-F", name]), taskName, ...extraArgs], {
    cwd: rootDir,
  });
}

interface RunOptions {
  capture?: boolean;
  allowFailure?: boolean;
  cwd?: string;
}

function run(command: string, args: string[], options: RunOptions = {}) {
  const result = spawnSync(command, args, {
    stdio: options.capture ? ["ignore", "pipe", "pipe"] : "inherit",
    encoding: "utf8",
    shell: false,
    cwd: options.cwd,
  });

  if (result.status !== 0 && !options.allowFailure) {
    const stderr = result.stderr?.trim();
    throw new Error(
      stderr && stderr.length > 0
        ? `${command} ${args.join(" ")} failed: ${stderr}`
        : `${command} ${args.join(" ")} failed with exit code ${result.status}`,
    );
  }

  return result;
}

function ensureCleanWorktree(rootDir: string) {
  const result = run("git", ["status", "--porcelain"], { capture: true, cwd: rootDir });
  const dirty = result.stdout.trim();
  if (dirty.length > 0) {
    throw new Error(
      "Refusing automated release cut with a dirty git worktree. Commit or stash pending changes first.",
    );
  }
}

async function main() {
  const cli = parseCliArgs(process.argv.slice(2));

  if (cli.help) {
    printHelp();
    return;
  }

  ensureNoNestedVpRun();

  if (cli.packageSpecs.length === 0) {
    throw new Error("Missing package spec. Example: vpr release -p components@1.2.3");
  }

  const initialWorkspace = await loadWorkspacePackages();
  const rootDir = initialWorkspace.rootDir;
  ensureCleanWorktree(rootDir);
  const requests = await resolveRequestedVersions(
    cli.packageSpecs,
    initialWorkspace.byName,
    cli.channel,
  );
  const requestedNames = requests.map((entry) => entry.packageName);

  const reverse = buildReverseDependencyMap(initialWorkspace.packages);
  const releaseNames = mergeReleaseSet(requestedNames, initialWorkspace.byName, reverse)
    .map((name) => initialWorkspace.byName.get(name))
    .filter((pkg): pkg is WorkspacePackage => Boolean(pkg))
    .map((pkg) => pkg.name)
    .sort((a, b) => a.localeCompare(b));

  const requestByName = new Map(requests.map((entry) => [entry.packageName, entry]));
  const nextVersionByName = new Map<string, string>();
  for (const name of releaseNames) {
    const pkg = initialWorkspace.byName.get(name);
    if (!pkg) {
      continue;
    }
    const requested = requestByName.get(name);
    nextVersionByName.set(name, requested ? requested.version : bumpPatch(pkg.version));
  }

  const releasePackageJsonFiles = releaseNames.map((name) => {
    const pkg = initialWorkspace.byName.get(name);
    if (!pkg) {
      throw new Error(`Release set references unknown package: ${name}`);
    }
    return `${pkg.path}/package.json`;
  });

  const publishableReleaseNames = releaseNames.filter((name) =>
    isPublishablePackage(initialWorkspace.byName.get(name)),
  );
  const publishableReleaseFilters = publishableReleaseNames.flatMap((name) => ["-F", name]);

  process.stdout.write(`Requested packages: ${requestedNames.join(", ")}\n`);
  process.stdout.write(`Release set (${releaseNames.length}):\n`);
  for (const name of releaseNames) {
    process.stdout.write(`- ${name} -> ${nextVersionByName.get(name) ?? "(unchanged)"}\n`);
  }

  // Scope release gates to the computed release set only.
  runFilteredTask(rootDir, "build", [], releaseNames, initialWorkspace.byName);
  runFilteredTask(rootDir, "check", ["--fix"], releaseNames, initialWorkspace.byName);
  runFilteredTask(rootDir, "test", [], releaseNames, initialWorkspace.byName);

  if (
    releaseNames.includes("@pantoken/components") ||
    releaseNames.includes("@pantoken/web-components")
  ) {
    run("vp", ["run", "lint:css"], { cwd: rootDir });
    run("vp", ["run", "lint:js"], { cwd: rootDir });
  }

  run("vp", ["run", "gate:repository"], { cwd: rootDir });

  if (publishableReleaseNames.length > 0) {
    run("vp", ["exec", ...publishableReleaseFilters, "publint"], { cwd: rootDir });
    run(
      "vp",
      [
        "exec",
        ...publishableReleaseFilters,
        "attw",
        "--pack",
        "--profile",
        "strict",
        "--no-emoji",
        "--ignore-rules",
        "no-resolution",
        "cjs-resolves-to-esm",
      ],
      { cwd: rootDir },
    );
  } else {
    process.stdout.write("Skipping publint/attw: release set has no publishable packages.\n");
  }

  // Use deterministic versions per package by invoking bumpp per manifest.
  for (const name of releaseNames) {
    const pkg = initialWorkspace.byName.get(name);
    const version = nextVersionByName.get(name);
    if (!pkg || !version) {
      continue;
    }

    const args = [
      "bumpp",
      `${pkg.path}/package.json`,
      "--print-commits",
      "--no-commit",
      "--no-tag",
      "--no-push",
      "--release",
      version,
    ];

    if (cli.force) {
      args.push("--yes");
    }

    run("vpx", args, { cwd: rootDir });
  }

  const refreshedWorkspace = await loadWorkspacePackages();
  const refreshedRequests = requestedNames.map((name) => {
    const pkg = refreshedWorkspace.byName.get(name);
    if (!pkg) {
      throw new Error(`Unable to read bumped version for ${name}`);
    }
    return { name, version: pkg.version };
  });

  const primary = refreshedRequests[0];
  if (!primary) {
    throw new Error("No requested packages resolved after bump.");
  }

  const changedChangelogFiles: string[] = [];
  for (const name of releaseNames) {
    const pkg = refreshedWorkspace.byName.get(name);
    const version = pkg?.version;
    if (!pkg || !version) {
      continue;
    }

    const depChanges = collectWorkspaceDependencyVersionChanges(
      pkg,
      initialWorkspace.byName,
      refreshedWorkspace.byName,
    );
    const changelogLine = buildDependencyChangelogLine(depChanges);
    await writePackageChangelog(rootDir, pkg, version, changelogLine);
    changedChangelogFiles.push(`${pkg.path}/CHANGELOG.md`);
  }

  const planTarget = normalizePantokenPackageName(primary.name);
  const planVersion = primary.version;

  const tags = refreshedRequests.map(
    (entry) => `${normalizePantokenPackageName(entry.name)}@v${entry.version}`,
  );

  run(
    "node",
    [
      "scripts/release/plan-package-release.ts",
      "--target",
      planTarget,
      "--version",
      planVersion,
      "--json",
      ".release-plan.json",
      "--publish-list",
      ".release-packages.txt",
      "--markdown",
      ".release-plan.md",
    ],
    { cwd: rootDir },
  );

  run(
    "node",
    [
      "scripts/release/build-root-changelog.ts",
      "--plan",
      ".release-plan.json",
      "--out",
      "CHANGELOG.md",
    ],
    { cwd: rootDir },
  );

  run(
    "git",
    [
      "add",
      ...releasePackageJsonFiles,
      ...changedChangelogFiles,
      "CHANGELOG.md",
      ".release-plan.json",
      ".release-packages.txt",
      ".release-plan.md",
    ],
    { cwd: rootDir },
  );

  run("git", ["commit", "-m", `release: ${tags.join(", ")}`], { cwd: rootDir });
  for (const tag of tags) {
    run("git", ["tag", tag], { cwd: rootDir });
  }
  run("git", ["push"], { cwd: rootDir });
  for (const tag of tags) {
    run("git", ["push", "origin", tag], { cwd: rootDir });
  }

  process.stdout.write(`Release cut complete: ${tags.join(", ")}\n`);
}

if (isDirectExecution(import.meta.url)) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  });
}

export {
  DEFAULT_CHANGELOG_LINE,
  buildDependencyChangelogLine,
  bumpPatch,
  collectWorkspaceDependencyVersionChanges,
  ensureNoNestedVpRun,
  parseCliArgs,
  resolveRequestedVersions,
  withPreRelease,
  writePackageChangelog,
};
