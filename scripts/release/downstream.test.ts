import { afterEach, beforeEach, expect, test, vi } from "vite-plus/test";
import type { TargetSupport } from "./compatibility.ts";

interface PendingRelease {
  package: string;
  version: string;
}

interface FailureRecord extends PendingRelease {
  attempts: number;
  lastFailedAt: string;
  error: string;
}

const readFileSync = vi.fn<(file: string, encoding: string) => string>();
const writeFileSync = vi.fn<(file: string, data: string) => void>();
const spawnSync = vi.fn<() => { status: number | null; error?: Error }>();
const pendingTargetReleases = vi.fn<() => Promise<PendingRelease[]>>();
const targetSupport = vi.fn<(packageName: string) => TargetSupport>();

vi.mock("node:fs", () => ({ readFileSync, writeFileSync }));
vi.mock("node:child_process", () => ({ spawnSync }));
vi.mock("./check-target-releases.ts", () => ({ pendingTargetReleases }));
vi.mock("./target-versions.ts", () => ({ targetSupport }));

const support: TargetSupport = {
  target: "Example host",
  status: "verified",
  minimum: "1.0.0",
  testedThrough: "1.0.0",
  testedVersions: ["1.0.0"],
  testCommand: "vp run @pantoken/example#check:compatibility",
};

let savedArgv: string[];
let savedExitCode: typeof process.exitCode;
let failures: FailureRecord[];
let logSpy: ReturnType<typeof vi.spyOn>;
let errorSpy: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
  vi.resetModules();
  vi.clearAllMocks();
  savedArgv = [...process.argv];
  savedExitCode = process.exitCode;
  process.exitCode = undefined;
  failures = [];
  targetSupport.mockReturnValue(support);
  pendingTargetReleases.mockResolvedValue([]);
  spawnSync.mockReturnValue({ status: 0 });
  readFileSync.mockImplementation((file) => {
    if (file.endsWith("downstream-compatibility.json")) return JSON.stringify(failures);
    if (file.endsWith("target-compatibility.json")) {
      return JSON.stringify({
        "@pantoken/example": { testedThrough: "1.0.0", testedVersions: ["1.0.0"] },
      });
    }
    if (file.endsWith("compatibility.json")) {
      return JSON.stringify({
        consumers: [{ package: "@pantoken/example", path: "bundlers/example" }],
      });
    }
    if (file.endsWith("package.json")) {
      return JSON.stringify({
        scripts: { "check:compatibility": "node scripts/check-compatibility.ts" },
      });
    }
    throw new Error(`Unexpected read: ${file}`);
  });
  logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
  errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  process.argv.splice(0, process.argv.length, ...savedArgv);
  process.exitCode = savedExitCode;
  vi.restoreAllMocks();
});

const runCommand = async (...args: string[]): Promise<void> => {
  process.argv.splice(0, process.argv.length, "node", "scripts/release/downstream.ts", ...args);
  await import("./downstream.ts");
};

test("tests pending releases and records a failed compatibility attempt", async () => {
  pendingTargetReleases.mockResolvedValue([
    { package: "@pantoken/example", version: "1.1.0" },
    { package: "@pantoken/example", version: "1.2.0" },
  ]);
  spawnSync.mockReturnValueOnce({ status: 0 }).mockReturnValueOnce({ status: 1 });

  await runCommand("test");
  await vi.waitFor(() => expect(writeFileSync).toHaveBeenCalled());

  expect(spawnSync).toHaveBeenCalledTimes(2);
  expect(JSON.parse(String(writeFileSync.mock.calls[0]?.[1]))).toEqual([
    expect.objectContaining({ package: "@pantoken/example", version: "1.2.0", attempts: 1 }),
  ]);
  expect(process.exitCode).toBe(1);
});

test("blesses a newer version after a successful adapter check", async () => {
  await runCommand("bless", "--package", "@pantoken/example", "--version", "1.0.1");
  await vi.waitFor(() => expect(writeFileSync).toHaveBeenCalled());

  expect(JSON.parse(String(writeFileSync.mock.calls[0]?.[1]))["@pantoken/example"]).toMatchObject({
    testedThrough: "1.0.1",
    testedVersions: ["1.0.0", "1.0.1"],
  });
  expect(process.exitCode).toBeUndefined();
});

test("does not bless an already-tested release or a version below testedThrough", async () => {
  await runCommand("bless", "--package", "@pantoken/example", "--version", "1.0.0");
  await vi.waitFor(() => expect(logSpy).toHaveBeenCalled());
  expect(spawnSync).not.toHaveBeenCalled();

  vi.resetModules();
  process.exitCode = undefined;
  targetSupport.mockReturnValue({ ...support, testedThrough: "1.2.0", testedVersions: ["1.0.0"] });
  await runCommand("bless", "--package", "@pantoken/example", "--version", "1.1.0");
  await vi.waitFor(() => expect(process.exitCode).toBe(1));
  expect(errorSpy.mock.calls.map((call: unknown[]) => String(call[0])).join("\n")).toContain(
    "is not newer than testedThrough",
  );
});

test("rejects invalid commands and incomplete bless arguments", async () => {
  await runCommand("invalid");
  await vi.waitFor(() => expect(process.exitCode).toBe(1));
  expect(errorSpy.mock.calls.at(-1)?.[0]).toContain("Usage: downstream.ts <test|bless>");

  vi.resetModules();
  process.exitCode = undefined;
  await runCommand("bless", "--package", "@pantoken/example");
  await vi.waitFor(() => expect(process.exitCode).toBe(1));
  expect(errorSpy.mock.calls.at(-1)?.[0]).toContain("Usage: downstream.ts bless");
});
