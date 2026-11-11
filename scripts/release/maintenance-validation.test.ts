import { afterEach, expect, test, vi } from "vite-plus/test";
import { spawnSync } from "node:child_process";
import {
  closeSync,
  fstatSync,
  mkdirSync,
  mkdtempSync,
  openSync,
  readFileSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { parse as parseYaml } from "yaml";
import {
  collectMaintenanceCandidates,
  maintenanceValidationPlan,
  runMaintenanceValidation,
  validateMaintenanceCandidate,
  type MaintenanceCandidateResult,
} from "./maintenance-validation.ts";
import { prepareMaintenance } from "./weekly-maintenance.ts";

vi.mock("./weekly-maintenance.ts", () => ({ prepareMaintenance: vi.fn() }));
vi.mock("node:child_process", () => ({ spawnSync: vi.fn() }));
vi.mock("node:fs", async (original) => {
  const fs = await original<typeof import("node:fs")>();
  return { ...fs, openSync: vi.fn(fs.openSync), closeSync: vi.fn(fs.closeSync) };
});
const directories: string[] = [];
afterEach(() => {
  vi.resetAllMocks();
  vi.unstubAllEnvs();
  for (const directory of directories.splice(0))
    rmSync(directory, { recursive: true, force: true });
});
const base = "a".repeat(40);
const proposal = "b".repeat(40);
const upgrades = ["react", "react-dom", "unrelated"].map((depName) => ({
  depName,
  manager: "npm",
  packageFile: "package.json",
  currentValue: "1.0.0",
  newValue: "2.0.0",
}));
const plan = () => maintenanceValidationPlan(base, proposal, upgrades);
function records(): MaintenanceCandidateResult[] {
  const value = plan();
  return value.groups.map((group) => ({
    schema: 1,
    base,
    proposal,
    validator: value.validator,
    id: group.id,
    attempt: 1,
    status: "passed",
    durationMs: 10,
    upgrades: group.upgrades,
  }));
}

test("keeps coupled groups atomic, deterministic, and tied to immutable validator identity", () => {
  expect(plan()).toEqual(plan());
  expect(plan().groups.map((group) => group.upgrades.map((upgrade) => upgrade.depName))).toEqual([
    ["react", "react-dom"],
    ["unrelated"],
  ]);
  expect(maintenanceValidationPlan(base, base, []).groups).toHaveLength(1);
  expect(() => maintenanceValidationPlan("main", proposal, upgrades)).toThrow();
  expect(() => maintenanceValidationPlan(base, proposal, {})).toThrow();
  expect(() =>
    maintenanceValidationPlan(
      base,
      proposal,
      Array.from({ length: 257 }, (_, index) => ({ ...upgrades[0], depName: `dep-${index}` })),
    ),
  ).toThrow("matrix job limit");
});

test("collects passing candidates and preserves atomic rejection reasons", () => {
  const input = records();
  input[0].status = "rejected";
  input[0].error = "AssertionError: rendering failed";
  const result = collectMaintenanceCandidates(plan(), input);
  expect(result.accepted.map((upgrade) => upgrade.depName)).toEqual(["unrelated"]);
  expect(result.failures).toHaveLength(2);
  expect(result.failures[0].upgrades).toHaveLength(2);
});

test("reuses completed groups but requires the newest retry to be terminal", () => {
  const input = records();
  const retry = { ...input[0], attempt: 2, status: "infrastructure-failed" as const };
  expect(() => collectMaintenanceCandidates(plan(), [...input, retry])).toThrow(
    "infrastructure-failed",
  );
  expect(
    collectMaintenanceCandidates(plan(), [...input, { ...retry, status: "passed" }]).accepted,
  ).toHaveLength(3);
  expect(() => collectMaintenanceCandidates(plan(), [input[0]])).toThrow("Missing candidate");
  expect(() => collectMaintenanceCandidates(plan(), [...input, input[0]])).toThrow("Duplicate");
});

test("rejects stale, tampered, malformed, and unproposed evidence", () => {
  for (const patch of [
    { schema: 2 },
    { base: proposal },
    { proposal: base },
    { validator: "other" },
    { id: "unknown" },
    { attempt: 0 },
    { durationMs: -1 },
    { status: "unknown" },
    { upgrades: [] },
    { error: 123 },
    { error: "x".repeat(16_001) },
  ]) {
    const input = records();
    Object.assign(input[0], patch);
    expect(() => collectMaintenanceCandidates(plan(), input)).toThrow();
  }
  expect(() => collectMaintenanceCandidates(plan(), [null])).toThrow();
  const input = records();
  input[0].status = "rejected";
  expect(() => collectMaintenanceCandidates(plan(), input)).toThrow("explain");
});

test("writes candidate terminal results without invoking final gates", async () => {
  const directory = mkdtempSync(join(tmpdir(), "pantoken-candidate-"));
  directories.push(directory);
  const output = join(directory, "result.json");
  vi.mocked(prepareMaintenance).mockResolvedValue(
    {} as Awaited<ReturnType<typeof prepareMaintenance>>,
  );
  const group = plan().groups[0];
  const result = await validateMaintenanceCandidate(plan(), group.id, output, 1);
  expect(result.status).toBe("passed");
  expect(JSON.parse(readFileSync(output, "utf8"))).toEqual(result);
  expect(prepareMaintenance).toHaveBeenCalledWith(base, proposal, {
    mode: "candidate",
    candidates: group.upgrades,
  });
  await expect(validateMaintenanceCandidate(plan(), "unknown", output, 1)).rejects.toThrow();
  await expect(validateMaintenanceCandidate(plan(), group.id, output, 0)).rejects.toThrow();
});

test("records incompatibilities but fails jobs on infrastructure errors", async () => {
  const directory = mkdtempSync(join(tmpdir(), "pantoken-candidate-"));
  directories.push(directory);
  const output = join(directory, "result.json");
  const id = plan().groups[0].id;
  vi.mocked(prepareMaintenance).mockRejectedValue(new Error("AssertionError"));
  expect((await validateMaintenanceCandidate(plan(), id, output, 1)).status).toBe("rejected");
  const failure = new Error("ENOSPC");
  failure.name = "MaintenanceInfrastructureError";
  vi.mocked(prepareMaintenance).mockRejectedValue(failure);
  await expect(validateMaintenanceCandidate(plan(), id, output, 2)).rejects.toThrow("ENOSPC");
  expect(JSON.parse(readFileSync(output, "utf8"))).toMatchObject({
    attempt: 2,
    status: "infrastructure-failed",
  });
});

function cliFixture() {
  const directory = mkdtempSync(join(tmpdir(), "pantoken-validation-cli-"));
  directories.push(directory);
  vi.mocked(spawnSync).mockImplementation(((_executable: string, args: string[]) => ({
    status: 0,
    stdout: args[0] === "rev-parse" ? base : JSON.stringify(upgrades),
    stderr: "",
  })) as unknown as typeof spawnSync);
  vi.mocked(prepareMaintenance).mockResolvedValue({ failures: [] } as unknown as Awaited<
    ReturnType<typeof prepareMaintenance>
  >);
  return directory;
}

test("CLI plans immutable groups and preflights a clean baseline before candidate work", async () => {
  const directory = cliFixture();
  const output = join(directory, "github-output");
  vi.stubEnv("GITHUB_OUTPUT", output);
  await runMaintenanceValidation(["plan", base, proposal, directory]);
  expect(JSON.parse(readFileSync(join(directory, "plan.json"), "utf8"))).toEqual(plan());
  expect(readFileSync(output, "utf8")).toContain(plan().groups[0].id);
  await runMaintenanceValidation(["baseline", base, proposal, directory]);
  expect(prepareMaintenance).toHaveBeenCalledWith(base, proposal, {
    mode: "candidate",
    candidates: [],
  });
  expect(JSON.parse(readFileSync(join(directory, "baseline.json"), "utf8"))).toMatchObject({
    status: "passed",
  });
  vi.stubEnv("GITHUB_RUN_ATTEMPT", "2");
  await runMaintenanceValidation(["candidate", base, proposal, directory, plan().groups[0].id]);
  expect(JSON.parse(readFileSync(join(directory, "result.json"), "utf8"))).toMatchObject({
    attempt: 2,
    status: "passed",
  });
});

test("CLI integration revalidates the combined set and retains pre-screened failure evidence", async () => {
  const directory = cliFixture();
  const input = records();
  input[1].status = "rejected";
  input[1].error = "AssertionError: candidate";
  for (const result of input) {
    const target = join(directory, "candidates", result.id);
    mkdirSync(target, { recursive: true });
    writeFileSync(join(target, "result.json"), JSON.stringify(result));
  }
  await runMaintenanceValidation(["integrate", base, proposal, directory]);
  expect(prepareMaintenance).toHaveBeenCalledWith(base, proposal, {
    mode: "integration",
    candidates: plan().groups[0].upgrades,
  });
  expect(
    JSON.parse(readFileSync(join(directory, "maintenance-result.json"), "utf8")).failures,
  ).toHaveLength(1);
});

test("CLI rejects invalid commands, mutable refs, foreign checkout, and missing artifacts", async () => {
  const directory = cliFixture();
  await expect(runMaintenanceValidation(["unknown"])).rejects.toThrow("Usage");
  await expect(runMaintenanceValidation(["plan", "main", proposal, directory])).rejects.toThrow();
  vi.mocked(spawnSync).mockReturnValueOnce({ status: 0, stdout: proposal } as ReturnType<
    typeof spawnSync
  >);
  await expect(runMaintenanceValidation(["plan", base, proposal, directory])).rejects.toThrow(
    "checkout",
  );
  mkdirSync(join(directory, "candidates"));
  await expect(runMaintenanceValidation(["integrate", base, proposal, directory])).rejects.toThrow(
    "Missing",
  );
  const target = join(directory, "candidates", "symlink");
  mkdirSync(target);
  const file = join(directory, "record.json");
  writeFileSync(file, JSON.stringify(records()[0]));
  symlinkSync(file, join(target, "result.json"));
  await expect(runMaintenanceValidation(["integrate", base, proposal, directory])).rejects.toThrow(
    /ELOOP/u,
  );
});

test("integration reads the inspected descriptor even when its pathname is replaced", async () => {
  const directory = cliFixture();
  for (const result of records()) {
    const target = join(directory, "candidates", result.id);
    mkdirSync(target, { recursive: true });
    writeFileSync(join(target, "result.json"), JSON.stringify(result));
  }
  const fs = await vi.importActual<typeof import("node:fs")>("node:fs");
  let descriptor: number | undefined;
  vi.mocked(openSync).mockImplementation((path, flags, mode) => {
    const opened = fs.openSync(path, flags, mode);
    if (descriptor === undefined && String(path).endsWith("/result.json")) {
      descriptor = opened;
      rmSync(path);
      writeFileSync(path, "invalid replacement");
    }
    return opened;
  });
  await runMaintenanceValidation(["integrate", base, proposal, directory]);
  expect(prepareMaintenance).toHaveBeenCalledWith(base, proposal, {
    mode: "integration",
    candidates: records().flatMap((record) => record.upgrades),
  });
  expect(closeSync).toHaveBeenCalledWith(descriptor);
  expect(() => fstatSync(descriptor!)).toThrow(/EBADF/u);
});

test.each(["oversized", "invalid-json", "directory"])(
  "integration closes rejected %s artifact descriptors",
  async (kind) => {
    const directory = cliFixture();
    const target = join(directory, "candidates", "group");
    mkdirSync(target, { recursive: true });
    const path = join(target, "result.json");
    if (kind === "directory") mkdirSync(path);
    else
      writeFileSync(path, kind === "oversized" ? "x".repeat(2 * 1024 * 1024 + 1) : "invalid json");
    await expect(
      runMaintenanceValidation(["integrate", base, proposal, directory]),
    ).rejects.toThrow();
    const descriptor = vi.mocked(openSync).mock.results[0]?.value as number | undefined;
    if (descriptor !== undefined) {
      expect(closeSync).toHaveBeenCalledWith(descriptor);
      expect(() => fstatSync(descriptor)).toThrow(/EBADF/u);
    }
  },
);

test("CLI no-change plans avoid proposal reads and fail closed on git errors", async () => {
  const directory = cliFixture();
  await runMaintenanceValidation(["plan", base, base, directory]);
  expect(JSON.parse(readFileSync(join(directory, "plan.json"), "utf8")).groups[0].upgrades).toEqual(
    [],
  );
  expect(spawnSync).toHaveBeenCalledTimes(1);
  vi.mocked(spawnSync).mockReturnValueOnce({ status: 1, stderr: "unavailable" } as ReturnType<
    typeof spawnSync
  >);
  await expect(runMaintenanceValidation(["plan", base, proposal, directory])).rejects.toThrow(
    "immutable",
  );
});

test("workflow shards unprivileged groups and preserves diagnostics and exact retry handoffs", () => {
  const workflow = parseYaml(
    readFileSync(join(import.meta.dirname, "../../.github/workflows/renovate.yml"), "utf8"),
  ) as {
    jobs: {
      candidates: { uses: string; strategy: { "max-parallel": number; "fail-fast": boolean } };
      baseline: { needs: string[] };
      integrate: { needs: string[] };
      publish: {
        needs: string[];
        steps: Array<{
          name: string;
          with?: Record<string, unknown>;
          env?: Record<string, string>;
        }>;
      };
    };
  };
  expect(workflow.jobs.candidates.strategy).toMatchObject({
    "max-parallel": 4,
    "fail-fast": false,
  });
  expect(workflow.jobs.candidates.uses).toBe("./.github/workflows/maintenance-validation.yml");
  expect(workflow.jobs.baseline.needs).toContain("plan");
  expect(workflow.jobs.integrate.needs).toContain("candidates");
  expect(workflow.jobs.publish.needs).toEqual(["propose", "integrate"]);
  expect(
    workflow.jobs.publish.steps.find(
      (step) => step.name === "Download this run's validated handoff",
    )?.with?.name,
  ).toBe("${{ needs.integrate.outputs.artifact }}");
  const source = readFileSync(
    join(import.meta.dirname, "../../.github/workflows/maintenance-validation.yml"),
    "utf8",
  );
  expect(source).not.toContain("RELEASE_PAT");
  const stage = parseYaml(source) as {
    permissions: Record<string, string>;
    jobs: {
      validate: {
        "timeout-minutes": string;
        steps: Array<{
          name: string;
          if?: string;
          "timeout-minutes"?: string;
          with?: Record<string, unknown>;
        }>;
      };
    };
  };
  expect(stage.permissions).toEqual({ contents: "read" });
  const steps = stage.jobs.validate.steps;
  expect(
    steps.find((step) => step.name === "Download same-run candidate outcomes")?.with,
  ).toMatchObject({ pattern: "maintenance-candidate-*", "merge-multiple": false });
  expect(
    steps.find((step) => step.name === "Upload outcome and progress even after step failure")?.if,
  ).toBe("always()");
  expect(
    steps.find((step) => step.name === "Validate immutable maintenance stage")?.["timeout-minutes"],
  ).toBe("${{ inputs.stage == 'integrate' && 190 || 70 }}");
  expect(stage.jobs.validate["timeout-minutes"]).toBe(
    "${{ inputs.stage == 'integrate' && 210 || 90 }}",
  );
});

test("maintenance omits optional bundle uploads while ordinary CI keeps them enabled", async () => {
  vi.stubEnv("CI", "true");
  vi.stubEnv("PANTOKEN_MAINTENANCE_VALIDATION", "1");
  vi.resetModules();
  expect((await import("../../vite.config.base.ts")).default.pack.plugins).toHaveLength(0);
  vi.stubEnv("PANTOKEN_MAINTENANCE_VALIDATION", "");
  vi.resetModules();
  expect((await import("../../vite.config.base.ts")).default.pack.plugins).toHaveLength(1);
});
