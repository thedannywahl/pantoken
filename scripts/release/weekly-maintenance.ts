import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
  closeSync,
  constants,
  fstatSync,
  globSync,
  mkdirSync,
  mkdtempSync,
  openSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { parse } from "yaml";
import type { DeprecationLedger, Theme } from "../../packages/model/src/index.ts";
import { prepareLifecycle, type ThemeSnapshot } from "../../tools/upstream-diff/lifecycle.ts";
import { runAsMain } from "./cli.ts";
import { validateMaintenanceManifest } from "./maintenance-publication.ts";
import type { TargetSupport } from "./compatibility.ts";
import { npmTargets } from "./check-target-releases.ts";
import {
  collectComponentInventory,
  componentReviews,
  promotionScaffold,
  type ComponentReview,
} from "./component-reviews.ts";
import { selectReleaseCandidates, targetReleaseHistory } from "./release-candidates.ts";
import {
  applySupportPolicy,
  compareReleases,
  supportCandidates,
  retireAgedSupport,
  type VersionEvidence,
} from "./support-policy.ts";
import {
  breakingMaintenanceBump,
  editMaintenanceDependency,
  groupMaintenanceUpgrades,
  maintenanceId,
  parseMaintenanceUpgrades,
  renderMaintenanceChangeset,
  requireMaintenanceBump,
  safeMaintenancePath,
  type MaintenanceBumps,
  type MaintenanceFailure,
  type MaintenanceUpgrade,
} from "./maintenance-plan.ts";

/** Fixed Renovate proposal branch, distinct from the never-auto-merged failure branch. */
export const maintenanceBranch = "renovate/weekly-maintenance";
/** Raw Renovate metadata; it never substitutes for adapter check evidence. */
export const maintenanceProposalPath = ".renovate/weekly-upgrades.json";
/** The complete prepared branch handoff; publication must compare base and proposal SHAs. */
export interface MaintenanceResult {
  base: string;
  proposal: string;
  upgrades: MaintenanceUpgrade[];
  accepted: MaintenanceUpgrade[];
  failures: MaintenanceFailure[];
  files: Record<string, string | null>;
  evidence: Record<string, string[]>;
  componentReviews?: ComponentReview[];
}

interface PackageOutput {
  name: string;
  path: string;
  version: string;
  private: boolean;
  manifest: Record<string, unknown>;
  hash: string;
}

const root = resolve(import.meta.dirname, "../..");
const registryFile = "scripts/release/target-compatibility.json";
const ledgerFile = "formats/tokens/deprecations.json";
const knownIssuesFile = "formats/tokens/known-syntax-issues.json";
const themes: Theme[] = ["rebrand", "canvas", "canvasHighContrast"];

function readJson<T>(directory: string, file: string): T {
  return JSON.parse(readFileSync(join(directory, file), "utf8")) as T;
}

function cleanEnvironment(): NodeJS.ProcessEnv {
  return Object.fromEntries(
    Object.entries(process.env).filter(
      ([name]) =>
        !/(?:TOKEN|SECRET|PASSWORD|CREDENTIAL|AUTH|PRIVATE_KEY|(?:^|_)PAT(?:_|$))/iu.test(name) &&
        !/^(?:GITHUB_|GH_|ACTIONS_|AWS_|AZURE_|GOOGLE_|GIT_CONFIG|NPM_CONFIG_USERCONFIG)/u.test(
          name,
        ),
    ),
  );
}

function command(
  directory: string,
  executable: string,
  args: string[],
  timeout = 2_400_000,
): string {
  const result = spawnSync(executable, args, {
    cwd: directory,
    env: cleanEnvironment(),
    encoding: "utf8",
    timeout,
    maxBuffer: 64 * 1024 * 1024,
  });
  if (result.error || result.status !== 0) {
    throw new Error(
      `${executable} ${args.join(" ")} failed: ${result.error?.message ?? `${result.stderr.slice(-8_000)}\n${result.stdout.slice(-4_000)}\nexit ${result.status}`}`,
    );
  }
  return result.stdout;
}

function writeFiles(directory: string, files: Record<string, string | null>): void {
  for (const [file, content] of Object.entries(files)) {
    const destination = join(directory, safeMaintenancePath(file));
    if (content === null) rmSync(destination, { force: true });
    else {
      mkdirSync(dirname(destination), { recursive: true });
      writeFileSync(destination, content);
    }
  }
}

function snapshot(directory: string): ThemeSnapshot {
  return Object.fromEntries(
    themes.map((theme) => [theme, readJson(directory, `formats/tokens/generated/${theme}.json`)]),
  ) as ThemeSnapshot;
}

function versions(directory: string) {
  const meta = readJson<{
    designTokens: { ref: string };
    uiIcons: { resolved: string };
    lucide: { resolved: string };
  }>(directory, "formats/tokens/generated/meta.json");
  return {
    designTokens: meta.designTokens.ref,
    ui: meta.uiIcons.resolved,
    lucide: meta.lucide.resolved,
  };
}

function openMaintenancePath(location: string): number | null {
  try {
    return openSync(location, constants.O_RDONLY | constants.O_NOFOLLOW | constants.O_NONBLOCK);
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") return null;
    throw error;
  }
}

function packageOutputs(directory: string): PackageOutput[] {
  const workspace = parse(readFileSync(join(directory, "pnpm-workspace.yaml"), "utf8")) as {
    packages: string[];
    catalog: Record<string, string>;
  };
  if (workspace.packages.some((pattern) => pattern.startsWith("!")))
    throw new Error("Workspace exclusion patterns need explicit maintenance handling");
  const files = globSync(
    workspace.packages.map((pattern) => `${pattern}/package.json`),
    { cwd: directory, exclude: ["**/node_modules/**"] },
  );
  return [...new Set(files)].sort().map((file) => {
    const manifest = readJson<Record<string, unknown>>(directory, file);
    for (const field of ["dependencies", "optionalDependencies"]) {
      const dependencies = manifest[field] as Record<string, string> | undefined;
      if (dependencies)
        manifest[field] = Object.fromEntries(
          Object.entries(dependencies).map(([name, value]) => [
            name,
            value === "catalog:" ? workspace.catalog[name] : value,
          ]),
        );
    }
    const path = dirname(file);
    const digest = createHash("sha256");
    const visit = (relative: string): void => {
      const location = join(directory, relative);
      const fd = openMaintenancePath(location);
      if (fd === null) return;
      try {
        const stat = fstatSync(fd);
        if (stat.isDirectory()) {
          for (const child of readdirSync(location).sort()) visit(`${relative}/${child}`);
        } else {
          if (!stat.isFile()) throw new Error(`Unexpected output file type: ${relative}`);
          if (!relative.endsWith(".map")) digest.update(relative).update(readFileSync(fd));
        }
      } finally {
        closeSync(fd);
      }
    };
    visit(`${path}/dist`);
    return {
      name: String(manifest.name),
      path,
      version: String(manifest.version),
      private: manifest.private === true,
      manifest,
      hash: digest.digest("hex"),
    };
  });
}

function collectedFiles(directory: string, base: string): Record<string, string | null> {
  const names = command(directory, "git", ["diff", "--name-only", base])
    .trim()
    .split("\n")
    .filter(Boolean);
  names.push(
    ...command(directory, "git", ["ls-files", "--others", "--exclude-standard"])
      .trim()
      .split("\n")
      .filter(Boolean),
  );
  return Object.fromEntries(
    [...new Set(names)].sort().map((file) => {
      safeMaintenancePath(file);
      const location = join(directory, file);
      const fd = openMaintenancePath(location);
      if (fd === null) return [file, null];
      try {
        if (!fstatSync(fd).isFile()) throw new Error(`Unexpected changed file type: ${file}`);
        return [file, readFileSync(fd, "utf8")];
      } finally {
        closeSync(fd);
      }
    }),
  );
}

function applyUpgrades(
  directory: string,
  upgrades: readonly MaintenanceUpgrade[],
  proposal: string,
): void {
  const copied = new Set<string>();
  for (const upgrade of upgrades) {
    const file = safeMaintenancePath(upgrade.packageFile);
    if (
      upgrade.manager === "npm" ||
      file === "pnpm-workspace.yaml" ||
      file.endsWith("package.json")
    ) {
      const source = readFileSync(join(directory, file), "utf8");
      writeFiles(directory, { [file]: editMaintenanceDependency(source, upgrade) });
    } else if (!copied.has(file)) {
      if (
        upgrade.manager !== "github-actions" ||
        !/^\.github\/workflows\/[\w-]+\.ya?ml$/u.test(file)
      )
        throw new Error(`Unsupported proposal manager/file: ${upgrade.manager} ${file}`);
      writeFiles(directory, { [file]: command(root, "git", ["show", `${proposal}:${file}`]) });
      copied.add(file);
    }
  }
}

function adapterCheck(
  directory: string,
  support: Extract<TargetSupport, { status: "verified" }>,
  version: string,
): void {
  const match = /^vp run (@pantoken\/[a-z-]+)#check:compatibility$/u.exec(support.testCommand);
  if (!match) throw new Error(`Unsupported adapter command: ${support.testCommand}`);
  const owner = packageOutputs(directory).find((pkg) => pkg.name === match[1]);
  if (!owner) throw new Error(`Unknown adapter ${match[1]}`);
  const scripts = owner.manifest.scripts as Record<string, string>;
  const cwd = join(directory, owner.path);
  if (match[1] === "@pantoken/wordpress") {
    command(directory, "vp", ["run", "@pantoken/wordpress#generate"]);
    command(cwd, process.execPath, ["scripts/check-compatibility.ts", version]);
    command(cwd, process.execPath, ["scripts/check-host.ts", version]);
  } else {
    if (scripts["check:compatibility"] !== "node scripts/check-compatibility.ts")
      throw new Error(`Unsupported compatibility preflight for ${owner.name}`);
    command(cwd, process.execPath, ["scripts/check-compatibility.ts", version]);
  }
}

/** Partition independent candidate units; failed units never enter the accepted dependency set. */
export async function partitionMaintenance(
  upgrades: readonly MaintenanceUpgrade[],
  validate: (accepted: MaintenanceUpgrade[]) => Promise<void>,
): Promise<{ accepted: MaintenanceUpgrade[]; failures: MaintenanceFailure[] }> {
  const accepted: MaintenanceUpgrade[] = [];
  const failures: MaintenanceFailure[] = [];
  for (const group of groupMaintenanceUpgrades(upgrades)) {
    try {
      await validate([...accepted, ...group]);
      accepted.push(...group);
    } catch (error) {
      for (const upgrade of group)
        failures.push({
          id: maintenanceId(upgrade.depName, upgrade.newValue),
          package: upgrade.depName,
          version: upgrade.newValue,
          error: error instanceof Error ? error.message : String(error),
          upgrades: group,
        });
    }
  }
  return { accepted, failures };
}

/** Prepare a maintenance branch in owned disposable worktrees, without GitHub-write credentials. */
export async function prepareMaintenance(
  base: string,
  proposal: string,
): Promise<MaintenanceResult> {
  if (!/^[a-f0-9]{40}$/u.test(base) || !/^[a-f0-9]{40}$/u.test(proposal))
    throw new Error("Maintenance requires immutable base/proposal SHAs");
  const upgrades =
    base === proposal
      ? []
      : parseMaintenanceUpgrades(
          JSON.parse(command(root, "git", ["show", `${proposal}:${maintenanceProposalPath}`])),
        );
  if (base !== proposal) {
    const changed = command(root, "git", ["diff", "--name-only", `${base}...${proposal}`])
      .trim()
      .split("\n")
      .filter(Boolean);
    for (const file of changed) {
      if (
        file !== maintenanceProposalPath &&
        file !== ".renovate/verified-targets.json" &&
        file !== "pnpm-lock.yaml" &&
        file !== registryFile &&
        file !== ledgerFile &&
        file !== knownIssuesFile &&
        file !== "compatibility.json" &&
        file !== "docs/compatibility.md" &&
        file !== "tools/upstream-diff/baseline/manifest.json" &&
        !/^\.changeset\/weekly-[a-f0-9]{20}\.md$/u.test(file) &&
        !upgrades.some((upgrade) => upgrade.packageFile === file)
      )
        throw new Error(`Proposal has unrelated edits: ${file}`);
      if (file.endsWith("package.json"))
        validateMaintenanceManifest(
          command(root, "git", ["show", `${base}:${file}`]),
          command(root, "git", ["show", `${proposal}:${file}`]),
        );
    }
  }
  const temporary = mkdtempSync(join(tmpdir(), "pantoken-weekly-"));
  const worktrees: string[] = [];
  const createTree = (): string => {
    const directory = join(temporary, `candidate-${worktrees.length}`);
    command(root, "git", ["worktree", "add", "--detach", directory, base]);
    worktrees.push(directory);
    return directory;
  };
  try {
    const baseline = createTree();
    command(baseline, "vp", ["install", "--frozen-lockfile"]);
    command(baseline, "vp", ["run", "-r", "build"]);
    const oldSnapshot = snapshot(baseline);
    const oldVersions = versions(baseline);
    const oldLedger = readJson<DeprecationLedger>(baseline, ledgerFile);
    const oldOutputs = packageOutputs(baseline);
    const originalRegistry = readJson<Record<string, TargetSupport>>(baseline, registryFile);
    const histories = new Map<string, string[] | Error>();
    for (const [name, support] of Object.entries(originalRegistry)) {
      if (support.status !== "verified") continue;
      try {
        const history = await targetReleaseHistory(name);
        if (history) histories.set(name, selectReleaseCandidates(history));
      } catch (error) {
        histories.set(name, error instanceof Error ? error : new Error(String(error)));
      }
    }
    let prepared:
      | Omit<MaintenanceResult, "base" | "proposal" | "upgrades" | "accepted">
      | undefined;
    const validate = async (candidates: MaintenanceUpgrade[], final = false): Promise<void> => {
      const directory = createTree();
      try {
        console.log(`Preparing ${candidates.length} dependency updates in an isolated worktree`);
        applyUpgrades(directory, candidates, proposal);
        command(directory, "vp", ["install", "--no-frozen-lockfile"]);
        command(directory, "vp", ["run", "-r", "build"]);
        const knownBefore = readJson<unknown[]>(baseline, knownIssuesFile);
        const knownAfter = readJson<unknown[]>(directory, knownIssuesFile);
        if (
          knownAfter.some(
            (issue) => !knownBefore.some((old) => JSON.stringify(old) === JSON.stringify(issue)),
          )
        )
          throw new Error("New upstream syntax issues require explicit review");
        const lifecycle = prepareLifecycle(
          oldSnapshot,
          snapshot(directory),
          oldLedger,
          oldVersions,
          versions(directory),
        );
        writeFiles(directory, { [ledgerFile]: `${JSON.stringify(lifecycle.ledger, null, 2)}\n` });
        command(directory, "vp", ["run", "-r", "build"]);
        command(directory, "vp", ["run", "upgrade:bless"]);
        const registry = structuredClone(originalRegistry);
        const evidence: Record<string, string[]> = {};
        const failures: MaintenanceFailure[] = [];
        const bumps: MaintenanceBumps = {};
        const notes = candidates.map(
          (upgrade) => `Update ${upgrade.depName} to ${upgrade.newValue}.`,
        );
        if (!final) {
          for (const candidate of candidates) {
            const version = candidate.newValue.replace(/^[~^]/u, "");
            if (!/^\d+\.\d+\.\d+$/u.test(version)) continue;
            for (const [name, target] of Object.entries(npmTargets)) {
              const support = originalRegistry[name];
              if (target === candidate.depName && support?.status === "verified")
                adapterCheck(directory, support, version);
            }
          }
        }
        for (const [name, history] of final ? histories : []) {
          const support = originalRegistry[name];
          if (support.status !== "verified") continue;
          try {
            if (history instanceof Error) throw history;
            const outcomes: VersionEvidence[] = [];
            for (const version of supportCandidates(support, history)) {
              try {
                adapterCheck(directory, support, version);
                outcomes.push({ version, outcome: "pass" });
              } catch (error) {
                if (
                  !(error instanceof Error) ||
                  !/ERR_ASSERTION|AssertionError/u.test(error.message)
                )
                  throw error;
                outcomes.push({ version, outcome: "incompatible" });
              }
            }
            const updated = applySupportPolicy(support, history, outcomes);
            registry[name] = updated;
            evidence[name] = updated.testedVersions;
            if (JSON.stringify(updated) !== JSON.stringify(support)) {
              const pkg = oldOutputs.find((entry) => entry.name === name)!;
              const raised = compareReleases(updated.minimum, support.minimum) > 0;
              requireMaintenanceBump(bumps, name, raised ? breakingMaintenanceBump(pkg) : "minor");
              notes.push(
                `${name}: verified ${updated.testedVersions.join(", ")}; support starts at ${updated.minimum}.`,
              );
              const manifestFile = `${pkg.path}/package.json`;
              const manifest = readJson<Record<string, unknown>>(directory, manifestFile);
              const peers = manifest.peerDependencies as Record<string, string> | undefined;
              const target = npmTargets[name];
              if (peers && target && target in peers) {
                peers[target] = [
                  ...new Set(
                    updated.testedVersions.map((version) => Number(version.split(".")[0])),
                  ),
                ]
                  .map(
                    (major) =>
                      `>=${major === Number(updated.minimum.split(".")[0]) ? updated.minimum : `${major}.0.0`} <${major + 1}.0.0`,
                  )
                  .join(" || ");
                writeFiles(directory, { [manifestFile]: `${JSON.stringify(manifest, null, 2)}\n` });
              }
            }
          } catch (error) {
            const version = history instanceof Error ? "discovery" : history.at(-1)!;
            failures.push({
              id: maintenanceId(name, version),
              package: name,
              version,
              error: error instanceof Error ? error.message : String(error),
              upgrades: [],
            });
            const retained =
              history instanceof Error ? support : retireAgedSupport(support, history);
            for (const version of retained.testedVersions)
              adapterCheck(directory, support, version);
            registry[name] = retained;
            if (retained.minimum !== support.minimum) {
              const pkg = oldOutputs.find((entry) => entry.name === name)!;
              requireMaintenanceBump(bumps, name, breakingMaintenanceBump(pkg));
              notes.push(
                `${name}: retire aged-out majors; retained verified support starts at ${retained.minimum}.`,
              );
            }
          }
        }
        writeFiles(directory, { [registryFile]: `${JSON.stringify(registry, null, 2)}\n` });
        for (const [name, support] of Object.entries(registry)) {
          const previous = originalRegistry[name];
          if (
            support.status !== "verified" ||
            previous?.status !== "verified" ||
            support.minimum === previous.minimum
          )
            continue;
          const pkg = oldOutputs.find((entry) => entry.name === name)!;
          const file = `${pkg.path}/package.json`;
          const manifest = readJson<Record<string, unknown>>(directory, file);
          const peers = manifest.peerDependencies as Record<string, string> | undefined;
          const target = npmTargets[name];
          if (peers && target && target in peers) {
            const majors = [
              ...new Set(support.testedVersions.map((version) => Number(version.split(".")[0]))),
            ];
            peers[target] = majors
              .map((major) => {
                const floor = support.testedVersions.find(
                  (version) => Number(version.split(".")[0]) === major,
                )!;
                return `>=${floor} <${major + 1}.0.0`;
              })
              .join(" || ");
            writeFiles(directory, { [file]: `${JSON.stringify(manifest, null, 2)}\n` });
          }
        }
        command(directory, "vp", ["run", "sync:compatibility"]);
        const outputs = packageOutputs(directory);
        const affectedPaths: string[] = [];
        for (const output of outputs) {
          const previous = oldOutputs.find((pkg) => pkg.name === output.name);
          if (
            previous &&
            (previous.hash !== output.hash ||
              JSON.stringify(previous.manifest.dependencies) !==
                JSON.stringify(output.manifest.dependencies) ||
              JSON.stringify(previous.manifest.devDependencies) !==
                JSON.stringify(output.manifest.devDependencies))
          )
            affectedPaths.push(output.path);
          if (output.private) continue;
          const old = oldOutputs.find((pkg) => pkg.name === output.name);
          if (
            old &&
            (old.hash !== output.hash ||
              JSON.stringify(old.manifest.dependencies) !==
                JSON.stringify(output.manifest.dependencies) ||
              JSON.stringify(old.manifest.optionalDependencies) !==
                JSON.stringify(output.manifest.optionalDependencies))
          )
            requireMaintenanceBump(bumps, output.name, "patch");
          if (old && lifecycle.retired.length && old.hash !== output.hash)
            requireMaintenanceBump(bumps, output.name, breakingMaintenanceBump(output));
          else if (old && lifecycle.added.length && old.hash !== output.hash)
            requireMaintenanceBump(bumps, output.name, "minor");
        }
        if (JSON.stringify(lifecycle.ledger) !== JSON.stringify(oldLedger)) {
          requireMaintenanceBump(bumps, "@pantoken/tokens", "patch");
          if (lifecycle.added.length)
            notes.push(`Freeze deprecated upstream tokens: ${lifecycle.added.join(", ")}.`);
          if (lifecycle.retired.length)
            notes.push(`Retire expired compatibility shims: ${lifecycle.retired.join(", ")}.`);
        }
        const changeset = renderMaintenanceChangeset(bumps, notes);
        if (changeset)
          writeFiles(directory, {
            [`.changeset/weekly-${maintenanceId(base, JSON.stringify(candidates))}.md`]: changeset,
          });
        command(directory, "vp", ["install", "--no-frozen-lockfile"]);
        const changed = Object.keys(collectedFiles(directory, base)).filter((file) =>
          /\.(?:json|ya?ml|md)$/u.test(file),
        );
        if (changed.length) command(directory, "vp", ["fmt", ...changed]);
        if (final) {
          command(directory, "vp", ["run", "ready"]);
          command(directory, "vp", ["run", "check:publish"]);
        } else {
          command(directory, "vp", ["check"]);
          if (affectedPaths.length)
            command(directory, "vp", ["test", ...affectedPaths, "--passWithNoTests"]);
        }
        const currentVersions = versions(directory);
        const upstreamChanged = oldVersions.ui !== currentVersions.ui;
        const reviews =
          final && (upstreamChanged || oldVersions.designTokens !== currentVersions.designTokens)
            ? componentReviews(
                oldSnapshot,
                snapshot(directory),
                await collectComponentInventory(directory, currentVersions.ui, upstreamChanged),
              )
            : [];
        for (const review of reviews) {
          if (review.kind === "promote-component")
            review.scaffold = promotionScaffold(directory, review.component, currentVersions.ui);
        }
        prepared = {
          failures,
          files: collectedFiles(directory, base),
          evidence,
          componentReviews: reviews,
        };
      } finally {
        command(root, "git", ["worktree", "remove", "--force", directory]);
        worktrees.splice(worktrees.indexOf(directory), 1);
      }
    };
    const partition = await partitionMaintenance(upgrades, validate);
    await validate(partition.accepted, true);
    if (!prepared) throw new Error("Maintenance preparation did not produce evidence");
    return {
      base,
      proposal,
      upgrades,
      accepted: partition.accepted,
      ...prepared,
      failures: [...partition.failures, ...prepared.failures],
    };
  } finally {
    for (const directory of worktrees)
      command(root, "git", ["worktree", "remove", "--force", directory]);
    rmSync(temporary, { recursive: true, force: true });
  }
}

/** Dispatch the metadata and immutable preparation CLI without running on import. */
export async function runWeeklyMaintenance(
  input: readonly string[] = process.argv.slice(2),
): Promise<void> {
  const [action, ...args] = input;
  if (action === "capture") {
    const dataFile = process.env.RENOVATE_POST_UPGRADE_COMMAND_DATA_FILE;
    if (!dataFile) throw new Error("Renovate proposal metadata is required");
    const upgrades = parseMaintenanceUpgrades(JSON.parse(readFileSync(dataFile, "utf8")));
    mkdirSync(dirname(maintenanceProposalPath), { recursive: true });
    writeFileSync(maintenanceProposalPath, `${JSON.stringify(upgrades, null, 2)}\n`);
    return;
  }
  if (action === "prepare") {
    const [base, proposal, output] = args;
    if (!output)
      throw new Error("Usage: weekly-maintenance.ts prepare BASE_SHA PROPOSAL_SHA OUTPUT");
    writeFileSync(output, `${JSON.stringify(await prepareMaintenance(base, proposal), null, 2)}\n`);
    return;
  }
  throw new Error("Usage: weekly-maintenance.ts <capture|prepare>");
}

runAsMain(import.meta.url, runWeeklyMaintenance);
