import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import {
  appendFileSync,
  globSync,
  lstatSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { join, resolve } from "node:path";
import { runAsMain } from "./cli.ts";
import {
  groupMaintenanceUpgrades,
  maintenanceId,
  parseMaintenanceUpgrades,
  type MaintenanceFailure,
  type MaintenanceUpgrade,
} from "./maintenance-plan.ts";
import { prepareMaintenance } from "./weekly-maintenance.ts";

/** Immutable plan shared by matrix validation and final integration. */
export interface MaintenanceValidationPlan {
  schema: 1;
  base: string;
  proposal: string;
  validator: string;
  groups: Array<{ id: string; upgrades: MaintenanceUpgrade[] }>;
}

/** Bounded group evidence; candidate-produced source files are never consumed here. */
export interface MaintenanceCandidateResult {
  schema: 1;
  base: string;
  proposal: string;
  validator: string;
  id: string;
  attempt: number;
  status: "running" | "passed" | "rejected" | "infrastructure-failed";
  upgrades: MaintenanceUpgrade[];
  durationMs: number;
  error?: string;
}

/** Derive deterministic atomic groups and bind their evidence to trusted validator code. */
export function maintenanceValidationPlan(
  base: string,
  proposal: string,
  input: unknown,
): MaintenanceValidationPlan {
  assert.match(base, /^[a-f0-9]{40}$/u);
  assert.match(proposal, /^[a-f0-9]{40}$/u);
  const upgrades = parseMaintenanceUpgrades(input);
  const groups = groupMaintenanceUpgrades(upgrades);
  if (!groups.length) groups.push([]);
  assert.ok(groups.length <= 256, "Maintenance exceeds the matrix job limit");
  return {
    schema: 1,
    base,
    proposal,
    validator: `maintenance-v1:${base}`,
    groups: groups.map((group) => ({
      id: maintenanceId(base, JSON.stringify(group)),
      upgrades: group,
    })),
  };
}

/** Reject incomplete, duplicate, stale, or unproposed matrix evidence before integration. */
export function collectMaintenanceCandidates(
  plan: MaintenanceValidationPlan,
  input: unknown[],
): { accepted: MaintenanceUpgrade[]; failures: MaintenanceFailure[] } {
  const latest = new Map<string, MaintenanceCandidateResult>();
  const attempts = new Set<string>();
  for (const raw of input) {
    assert.ok(raw && typeof raw === "object", "Invalid candidate result");
    const result = raw as MaintenanceCandidateResult;
    assert.equal(result.schema, 1);
    assert.equal(result.base, plan.base, "Stale candidate base");
    assert.equal(result.proposal, plan.proposal, "Stale candidate proposal");
    assert.equal(result.validator, plan.validator, "Stale candidate validator");
    const group = plan.groups.find((candidate) => candidate.id === result.id);
    assert.ok(group, "Unproposed candidate group");
    assert.deepEqual(
      parseMaintenanceUpgrades(result.upgrades),
      group.upgrades,
      "Candidate group changed",
    );
    assert.ok(
      Number.isSafeInteger(result.attempt) && result.attempt > 0,
      "Invalid candidate attempt",
    );
    assert.ok(
      Number.isFinite(result.durationMs) && result.durationMs >= 0,
      "Invalid candidate duration",
    );
    assert.ok(["running", "passed", "rejected", "infrastructure-failed"].includes(result.status));
    assert.ok(
      result.error === undefined ||
        (typeof result.error === "string" && result.error.length <= 16_000),
      "Invalid candidate diagnostic",
    );
    const key = `${result.id}:${result.attempt}`;
    assert.ok(!attempts.has(key), "Duplicate candidate attempt");
    attempts.add(key);
    if (!latest.has(result.id) || latest.get(result.id)!.attempt < result.attempt)
      latest.set(result.id, result);
  }
  const accepted: MaintenanceUpgrade[] = [];
  const failures: MaintenanceFailure[] = [];
  for (const group of plan.groups) {
    const result = latest.get(group.id);
    assert.ok(result, `Missing candidate evidence: ${group.id}`);
    assert.ok(
      result.status === "passed" || result.status === "rejected",
      `Incomplete or infrastructure-failed candidate: ${group.id}`,
    );
    if (result.status === "passed") accepted.push(...group.upgrades);
    else {
      assert.ok(result.error, "Rejected candidate must explain its failure");
      for (const upgrade of group.upgrades)
        failures.push({
          id: maintenanceId(upgrade.depName, upgrade.newValue),
          package: upgrade.depName,
          version: upgrade.newValue,
          error: result.error,
          upgrades: group.upgrades,
        });
    }
  }
  return { accepted, failures };
}

/** Save running and terminal states so cancelled jobs leave diagnosable evidence. */
export async function validateMaintenanceCandidate(
  plan: MaintenanceValidationPlan,
  id: string,
  output: string,
  attempt: number,
): Promise<MaintenanceCandidateResult> {
  const group = plan.groups.find((candidate) => candidate.id === id);
  assert.ok(group, "Unknown maintenance group");
  assert.ok(Number.isSafeInteger(attempt) && attempt > 0, "Invalid candidate attempt");
  const started = Date.now();
  const result: MaintenanceCandidateResult = {
    schema: 1,
    base: plan.base,
    proposal: plan.proposal,
    validator: plan.validator,
    id,
    attempt,
    upgrades: group.upgrades,
    status: "running",
    durationMs: 0,
  };
  const save = () => writeFileSync(output, `${JSON.stringify(result, null, 2)}\n`);
  save();
  try {
    await prepareMaintenance(plan.base, plan.proposal, {
      mode: "candidate",
      candidates: group.upgrades,
    });
    result.status = "passed";
  } catch (error) {
    result.error = (error instanceof Error ? error.message : String(error)).slice(-16_000);
    result.status =
      error instanceof Error && error.name === "MaintenanceInfrastructureError"
        ? "infrastructure-failed"
        : "rejected";
    console.error(`Candidate ${id} ${result.status}: ${result.error}`);
    if (result.status === "infrastructure-failed") throw error;
  } finally {
    result.durationMs = Date.now() - started;
    save();
  }
  return result;
}

function git(args: string[]): string {
  const result = spawnSync("git", args, {
    cwd: resolve(import.meta.dirname, "../.."),
    encoding: "utf8",
    timeout: 30_000,
    maxBuffer: 8 * 1024 * 1024,
  });
  assert.ok(
    !result.error && result.status === 0,
    `Cannot read immutable maintenance input: ${result.error?.message ?? result.stderr}`,
  );
  return result.stdout.trim();
}

/** Run planning, baseline preflight, one matrix group, or final integrated preparation. */
export async function runMaintenanceValidation(
  input: readonly string[] = process.argv.slice(2),
): Promise<void> {
  const [action, base, proposal, directory, id] = input;
  assert.ok(
    ["plan", "baseline", "candidate", "integrate"].includes(action) && directory,
    "Usage: maintenance-validation.ts <plan|baseline|candidate|integrate> BASE PROPOSAL DIRECTORY [GROUP]",
  );
  assert.match(base, /^[a-f0-9]{40}$/u);
  assert.match(proposal, /^[a-f0-9]{40}$/u);
  assert.equal(git(["rev-parse", "HEAD"]), base, "Validator checkout must match immutable base");
  const plan = maintenanceValidationPlan(
    base,
    proposal,
    base === proposal
      ? []
      : JSON.parse(git(["show", `${proposal}:.renovate/weekly-upgrades.json`])),
  );
  mkdirSync(directory, { recursive: true });
  if (action === "plan") {
    writeFileSync(join(directory, "plan.json"), `${JSON.stringify(plan, null, 2)}\n`);
    const matrix = JSON.stringify({ include: plan.groups.map((group) => ({ id: group.id })) });
    if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, `matrix=${matrix}\n`);
    console.log(`Planned ${plan.groups.length} atomic validation groups`);
  } else if (action === "baseline") {
    await prepareMaintenance(base, proposal, { mode: "candidate", candidates: [] });
    writeFileSync(
      join(directory, "baseline.json"),
      `${JSON.stringify({ base, proposal, validator: plan.validator, status: "passed" })}\n`,
    );
  } else if (action === "candidate") {
    await validateMaintenanceCandidate(
      plan,
      id,
      join(directory, "result.json"),
      Number(process.env.GITHUB_RUN_ATTEMPT ?? "1"),
    );
  } else {
    const files = globSync("*/result.json", { cwd: join(directory, "candidates") });
    assert.ok(files.length > 0 && files.length <= 2048, "Missing or excessive candidate artifacts");
    const results = files.map((file) => {
      const path = join(directory, "candidates", file);
      const stat = lstatSync(path);
      assert.ok(stat.isFile() && stat.size <= 2 * 1024 * 1024, "Invalid candidate artifact file");
      return JSON.parse(readFileSync(path, "utf8")) as unknown;
    });
    const candidates = collectMaintenanceCandidates(plan, results);
    const result = await prepareMaintenance(base, proposal, {
      mode: "integration",
      candidates: candidates.accepted,
    });
    result.failures.push(...candidates.failures);
    writeFileSync(
      join(directory, "maintenance-result.json"),
      `${JSON.stringify(result, null, 2)}\n`,
    );
  }
}

runAsMain(import.meta.url, runMaintenanceValidation);
