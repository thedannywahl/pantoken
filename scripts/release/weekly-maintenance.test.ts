import { afterEach, expect, test, vi } from "vite-plus/test";
import { spawnSync } from "node:child_process";
import {
  cpSync,
  closeSync,
  existsSync,
  fstatSync,
  mkdirSync,
  mkdtempSync,
  openSync,
  readFileSync,
  readdirSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, relative } from "node:path";
import { parse as parseYaml } from "yaml";
import {
  partitionMaintenance,
  prepareMaintenance,
  runWeeklyMaintenance,
} from "./weekly-maintenance.ts";
import { captureMaintenance } from "./capture-maintenance.ts";
import type { MaintenanceUpgrade } from "./maintenance-plan.ts";
import { targetReleaseHistory } from "./release-candidates.ts";

vi.mock("node:child_process", () => ({ spawnSync: vi.fn() }));
vi.mock("node:fs", async (original) => {
  const fs = await original<typeof import("node:fs")>();
  return {
    ...fs,
    openSync: vi.fn(fs.openSync),
    readFileSync: vi.fn(fs.readFileSync),
    closeSync: vi.fn(fs.closeSync),
  };
});
vi.mock("./release-candidates.ts", async (original) => ({
  ...(await original<typeof import("./release-candidates.ts")>()),
  targetReleaseHistory: vi.fn(),
}));

const temporary: string[] = [];
afterEach(() => {
  vi.resetAllMocks();
  vi.unstubAllEnvs();
  for (const directory of temporary.splice(0)) rmSync(directory, { recursive: true, force: true });
});

const upgrade = (depName: string): MaintenanceUpgrade => ({
  depName,
  manager: "npm",
  packageFile: "pnpm-workspace.yaml",
  currentValue: "1.0.0",
  newValue: "2.0.0",
});

test("manual dispatch overrides only Renovate scheduling while scheduled runs retain the repository policy", () => {
  const workflow = parseYaml(
    readFileSync(join(import.meta.dirname, "../../.github/workflows/renovate.yml"), "utf8"),
  ) as {
    on: { workflow_dispatch: unknown; schedule: Array<{ cron: string }> };
    jobs: { propose: { steps: Array<{ name: string; env?: Record<string, string> }> } };
  };
  const config = JSON.parse(
    readFileSync(join(import.meta.dirname, "../../renovate.json"), "utf8"),
  ) as {
    schedule: string[];
    minimumReleaseAge: string;
    draftPR: boolean;
    automerge: boolean;
  };
  const override = workflow.jobs.propose.steps.find((step) => step.name === "Run Renovate")?.env
    ?.RENOVATE_FORCE;
  expect(override).toBe(
    "${{ github.event_name == 'workflow_dispatch' && '{\"schedule\":[\"at any time\"]}' || '{}' }}",
  );
  const values = [...override!.matchAll(/'([^']*)'/gu)].map((match) => match[1]);
  expect(JSON.parse(values[1])).toEqual({ schedule: ["at any time"] });
  expect(JSON.parse(values[2])).toEqual({});
  expect(workflow.on).toHaveProperty("workflow_dispatch");
  expect(workflow.on.schedule).toEqual([{ cron: "0 6 * * 1" }]);
  expect(config).toMatchObject({
    schedule: ["* * * * 1"],
    minimumReleaseAge: "5 days",
    draftPR: true,
    automerge: false,
  });
});

test("keeps passing updates and records one failure per excluded coupled candidate", async () => {
  const result = await partitionMaintenance(
    [upgrade("passing"), upgrade("react"), upgrade("react-dom")],
    async (candidates) => {
      if (candidates.some((candidate) => candidate.depName === "react"))
        throw new Error("SSR assertion failed");
    },
  );
  expect(result.accepted.map((candidate) => candidate.depName)).toEqual(["passing"]);
  expect(result.failures.map((failure) => failure.package)).toEqual(["react", "react-dom"]);
  expect(result.failures.every((failure) => failure.upgrades.length === 2)).toBe(true);
});

test("validates combined updates and excludes interaction failures", async () => {
  const calls: string[][] = [];
  const result = await partitionMaintenance([upgrade("a"), upgrade("b")], async (candidates) => {
    calls.push(candidates.map((candidate) => candidate.depName));
    if (candidates.length > 1) throw new Error("Combined build fails");
  });
  expect(calls).toEqual([["a"], ["a", "b"]]);
  expect(result.accepted).toEqual([upgrade("a")]);
  expect(result.failures[0].package).toBe("b");
});

test("empty and all-failed batches never invent passing evidence; retries have stable IDs", async () => {
  expect(await partitionMaintenance([], async () => {})).toEqual({ accepted: [], failures: [] });
  const validate = async () => {
    throw new Error("Network failure");
  };
  const first = await partitionMaintenance([upgrade("a")], validate);
  expect(first.accepted).toEqual([]);
  expect((await partitionMaintenance([upgrade("a")], validate)).failures).toEqual(first.failures);
});

function fixture(
  proposals: MaintenanceUpgrade[] = [],
  adapterFailures: Record<string, string> = {},
) {
  const directory = mkdtempSync(join(tmpdir(), "pantoken-weekly-test-"));
  temporary.push(directory);
  const files: Record<string, string> = {
    "pnpm-workspace.yaml": "packages:\n  - renderers/*\ncatalog:\n  react: ^19.0.0\n",
    "renderers/react/package.json": JSON.stringify({
      name: "@pantoken/react",
      version: "1.0.0",
      scripts: { "check:compatibility": "node scripts/check-compatibility.ts" },
      dependencies: { react: "^19.0.0" },
      peerDependencies: { react: "^18 || ^19" },
    }),
    "renderers/react/dist/index.mjs": "react",
    "formats/tokens/deprecations.json": JSON.stringify({ version: 1, entries: [] }),
    "formats/tokens/known-syntax-issues.json": "[]",
    "formats/tokens/generated/meta.json": JSON.stringify({
      designTokens: { ref: "v2.1.0" },
      uiIcons: { resolved: "11.7.10" },
      lucide: { resolved: "1.57.0" },
    }),
    "tools/upstream-diff/baseline/manifest.json": "{}",
    "scripts/release/target-compatibility.json": JSON.stringify({
      "@pantoken/react": {
        target: "React",
        status: "verified",
        minimum: "18.0.0",
        testedThrough: "19.0.0",
        testedVersions: ["18.0.0", "19.0.0"],
        testCommand: "vp run @pantoken/react#check:compatibility",
      },
    }),
    "compatibility.json": "{}",
    "docs/compatibility.md": "Compatibility\n",
    ...Object.fromEntries(
      ["rebrand", "canvas", "canvasHighContrast"].map((theme) => [
        `formats/tokens/generated/${theme}.json`,
        "[]",
      ]),
    ),
  };
  for (const [file, content] of Object.entries(files)) {
    mkdirSync(dirname(join(directory, file)), { recursive: true });
    writeFileSync(join(directory, file), content);
  }
  const trees: string[] = [];
  const commands: Array<{
    executable: string;
    args: string[];
    cwd: string;
    env: NodeJS.ProcessEnv;
  }> = [];
  vi.mocked(targetReleaseHistory).mockResolvedValue([
    { version: "19.0.0", publishedAt: "2026-01-01" },
    { version: "20.0.0", publishedAt: "2026-01-01" },
  ]);
  vi.mocked(spawnSync).mockImplementation(((
    executable: string,
    args: string[],
    options: { cwd: string; env: NodeJS.ProcessEnv },
  ) => {
    commands.push({ executable, args, ...options });
    if (args[0] === "scripts/check-compatibility.ts" && adapterFailures[args[1]]) {
      return {
        status: 1,
        stdout: "",
        stderr: adapterFailures[args[1]],
        pid: 0,
        output: [],
        signal: null,
      };
    }
    let stdout = "";
    if (executable === "git" && args[0] === "show") {
      const file = args[1].slice(args[1].indexOf(":") + 1);
      stdout = file === ".renovate/weekly-upgrades.json" ? JSON.stringify(proposals) : files[file];
    } else if (executable === "git" && args[0] === "worktree") {
      if (args[1] === "add") {
        cpSync(directory, args[3], { recursive: true });
        trees.push(args[3]);
      } else rmSync(args[3], { recursive: true, force: true });
    } else if (executable === "git" && args[0] === "diff") {
      if (!args.includes("--name-only")) throw new Error("Unexpected git diff");
      if (!trees.includes(options.cwd))
        stdout = [...new Set(proposals.map((proposal) => proposal.packageFile))].join("\n");
      else
        stdout = Object.entries(files)
          .filter(
            ([file, value]) =>
              !file.includes("/generated/") &&
              existsSync(join(options.cwd, file)) &&
              readFileSync(join(options.cwd, file), "utf8") !== value,
          )
          .map(([file]) => file)
          .join("\n");
    } else if (executable === "git" && args[0] === "ls-files") {
      const changesets = join(options.cwd, ".changeset");
      stdout = existsSync(changesets)
        ? readdirSync(changesets)
            .map((file) => relative(options.cwd, join(changesets, file)))
            .join("\n")
        : "";
    }
    return { status: 0, stdout: stdout ?? "", stderr: "", pid: 0, output: [], signal: null };
  }) as unknown as typeof spawnSync);
  return { directory, trees, commands };
}

test("hashes the opened file even when its pathname is replaced, and closes its descriptor", async () => {
  fixture();
  const fs = await vi.importActual<typeof import("node:fs")>("node:fs");
  let descriptor: number | undefined;
  vi.mocked(openSync).mockImplementation((path, flags, mode) => {
    const fd = fs.openSync(path, flags, mode);
    if (descriptor === undefined && String(path).endsWith("/dist/index.mjs")) {
      descriptor = fd;
      rmSync(path);
      writeFileSync(path, "replacement");
    }
    return fd;
  });
  const base = "a".repeat(40);
  await prepareMaintenance(base, base);
  const read = vi.mocked(readFileSync).mock.calls.findIndex(([file]) => file === descriptor);
  expect(read).toBeGreaterThanOrEqual(0);
  expect(vi.mocked(readFileSync).mock.results[read].value.toString()).toBe("react");
  expect(closeSync).toHaveBeenCalledWith(descriptor);
  expect(() => fstatSync(descriptor!)).toThrow(/EBADF/u);
});

test.each(["dist", "dist/index.mjs"])("rejects output symlinks at %s", async (path) => {
  const state = fixture();
  const destination = join(state.directory, "renderers/react", path);
  rmSync(destination, { recursive: true });
  symlinkSync(
    path === "dist" ? state.directory : join(state.directory, "package.json"),
    destination,
  );
  const base = "a".repeat(40);
  await expect(prepareMaintenance(base, base)).rejects.toThrow(/ELOOP/u);
  expect(state.trees.every((tree) => !existsSync(tree))).toBe(true);
});

test("allows absent dist output without hiding other filesystem errors", async () => {
  const state = fixture();
  rmSync(join(state.directory, "renderers/react/dist"), { recursive: true });
  const base = "a".repeat(40);
  await expect(prepareMaintenance(base, base)).resolves.toHaveProperty("base", base);
  vi.mocked(openSync).mockImplementation(() => {
    throw Object.assign(new Error("access denied"), { code: "EACCES" });
  });
  await expect(prepareMaintenance(base, base)).rejects.toThrow("access denied");
});

test("rejects changed-file symlinks instead of reading their target", async () => {
  fixture();
  const spawn = vi.mocked(spawnSync).getMockImplementation()!;
  vi.mocked(spawnSync).mockImplementation((...args) => {
    const result = spawn(...args);
    if (args[1]?.[0] === "ls-files") {
      const options = args[2] as { cwd: string };
      const path = join(options.cwd, "compatibility.json");
      rmSync(path);
      symlinkSync("pnpm-workspace.yaml", path);
      return { ...result, stdout: "compatibility.json" };
    }
    return result;
  });
  const base = "a".repeat(40);
  await expect(prepareMaintenance(base, base)).rejects.toThrow(/ELOOP/u);
});

test("collects from the opened descriptor and records deleted files as null", async () => {
  fixture();
  const fs = await vi.importActual<typeof import("node:fs")>("node:fs");
  let descriptor: number | undefined;
  let ready = false;
  vi.mocked(openSync).mockImplementation((path, flags, mode) => {
    const fd = fs.openSync(path, flags, mode);
    if (ready && descriptor === undefined && String(path).endsWith("/compatibility.json")) {
      descriptor = fd;
      rmSync(path);
      writeFileSync(path, "replacement");
    }
    return fd;
  });
  const spawn = vi.mocked(spawnSync).getMockImplementation()!;
  vi.mocked(spawnSync).mockImplementation((...args) => {
    const result = spawn(...args);
    if (args[1]?.[0] === "run" && args[1][1] === "ready") ready = true;
    return args[1]?.[0] === "ls-files"
      ? { ...result, stdout: "compatibility.json\n.changeset/deleted.md" }
      : result;
  });
  const base = "a".repeat(40);
  const result = await prepareMaintenance(base, base);
  expect(result.files["compatibility.json"]).toBe("{}");
  expect(result.files[".changeset/deleted.md"]).toBeNull();
  expect(closeSync).toHaveBeenCalledWith(descriptor);
  expect(() => fstatSync(descriptor!)).toThrow(/EBADF/u);
});

test("prepares downstream-only support, breaking Changesets, and removes every owned worktree", async () => {
  const state = fixture();
  vi.stubEnv("RELEASE_PAT", "must-not-reach-child");
  const base = "a".repeat(40);
  const result = await prepareMaintenance(base, base);
  expect(result.evidence["@pantoken/react"]).toEqual(["19.0.0", "20.0.0"]);
  expect(result.files["scripts/release/target-compatibility.json"]).toContain(
    '"minimum": "19.0.0"',
  );
  expect(
    Object.values(result.files).some((value) => value?.includes('"@pantoken/react": major')),
  ).toBe(true);
  expect(state.commands.every((command) => command.env.RELEASE_PAT === undefined)).toBe(true);
  expect(state.commands.some((command) => command.args.join(" ") === "run ready")).toBe(true);
  expect(state.trees.every((tree) => !existsSync(tree))).toBe(true);
});

test("applies explicit dependency proposals and revalidates the final combined tree", async () => {
  fixture([
    {
      ...upgrade("react"),
      packageFile: "renderers/react/package.json",
      currentValue: "^19.0.0",
      newValue: "^20.0.0",
    },
  ]);
  const result = await prepareMaintenance("a".repeat(40), "b".repeat(40));
  expect(result.accepted).toHaveLength(1);
  expect(JSON.parse(result.files["renderers/react/package.json"]!).dependencies.react).toBe(
    "^20.0.0",
  );
  expect(result.failures).toEqual([]);
});

test("rejects mutable refs before making worktrees or spawning candidate commands", async () => {
  await expect(prepareMaintenance("main", "renovate/proposal")).rejects.toThrow("immutable");
  expect(spawnSync).not.toHaveBeenCalled();
});

test("captures raw metadata without candidate dependencies and rejects malformed input", () => {
  const directory = mkdtempSync(join(tmpdir(), "pantoken-capture-test-"));
  temporary.push(directory);
  const input = join(directory, "input.json");
  const output = join(directory, "nested", "upgrades.json");
  writeFileSync(input, JSON.stringify([upgrade("react")]));
  captureMaintenance(input, output);
  expect(JSON.parse(readFileSync(output, "utf8"))).toEqual([upgrade("react")]);
  expect(() => captureMaintenance("", output)).toThrow("provide proposal metadata");
  writeFileSync(input, "{}");
  expect(() => captureMaintenance(input, output)).toThrow("array");
});

test("retires an assertion-failing previous major without trying backward compatibility fixes", async () => {
  fixture([], { "19.0.0": "AssertionError: old-major rendering failed" });
  const base = "a".repeat(40);
  const result = await prepareMaintenance(base, base);
  expect(result.evidence["@pantoken/react"]).toEqual(["20.0.0"]);
  expect(result.files["scripts/release/target-compatibility.json"]).toContain(
    '"minimum": "20.0.0"',
  );
});

test("excludes a failing new target but still retires aged-out majors", async () => {
  fixture([], { "20.0.0": "AssertionError: current-major integration failed" });
  const base = "a".repeat(40);
  const result = await prepareMaintenance(base, base);
  expect(result.evidence["@pantoken/react"]).toBeUndefined();
  expect(result.failures[0]).toMatchObject({ package: "@pantoken/react", version: "20.0.0" });
  expect(
    JSON.parse(result.files["scripts/release/target-compatibility.json"]!)["@pantoken/react"]
      .minimum,
  ).toBe("19.0.0");
  expect(
    JSON.parse(result.files["renderers/react/package.json"]!).peerDependencies.react,
  ).not.toContain("18");
});

test("records release-feed outages without changing recorded support", async () => {
  fixture();
  vi.mocked(targetReleaseHistory).mockRejectedValue(new Error("HTTP 503"));
  const base = "a".repeat(40);
  const result = await prepareMaintenance(base, base);
  expect(result.failures[0]).toMatchObject({ version: "discovery", error: "HTTP 503" });
  expect(result.evidence).toEqual({});
});

test("CLI validates preparation arguments and writes the immutable result handoff", async () => {
  fixture();
  await expect(runWeeklyMaintenance(["unknown"])).rejects.toThrow("Usage");
  await expect(runWeeklyMaintenance(["prepare"])).rejects.toThrow("Usage");
  const directory = mkdtempSync(join(tmpdir(), "pantoken-handoff-test-"));
  temporary.push(directory);
  const output = join(directory, "result.json");
  const base = "a".repeat(40);
  await runWeeklyMaintenance(["prepare", base, base, output]);
  expect(JSON.parse(readFileSync(output, "utf8"))).toMatchObject({ base, proposal: base });
});
