import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";
import { afterEach, beforeEach, expect, test, vi } from "vite-plus/test";

vi.mock("node:child_process", () => ({ spawnSync: vi.fn() }));
vi.mock("node:fs", () => ({ existsSync: vi.fn() }));

const root = path.resolve(import.meta.dirname, "../..");
const spawn = vi.mocked(spawnSync);
const exists = vi.mocked(existsSync);
const exit = vi.fn<typeof process.exit>();

function result(status: number | null, stdout = ""): ReturnType<typeof spawnSync> {
  return { status, stdout, stderr: "", signal: null, pid: 1, output: [null, stdout, ""] };
}

beforeEach(() => {
  vi.resetModules();
  spawn.mockReset();
  exists.mockReset().mockReturnValue(true);
  exit.mockReset().mockImplementation((() => undefined) as never);
  vi.spyOn(process, "exit").mockImplementation(exit);
  vi.spyOn(process.stdout, "write").mockImplementation(() => true);
  vi.spyOn(console, "log").mockImplementation(() => {});
  vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
});

function checks(dead = 0, score = 92.5, regression = 0, duplication = 0): void {
  spawn
    .mockReturnValueOnce(result(dead, "dead-code findings\n"))
    .mockReturnValueOnce(result(0, JSON.stringify({ health_score: { score, grade: "A" } })))
    .mockReturnValueOnce(result(regression, "regression findings\n"))
    .mockReturnValueOnce(result(duplication, "duplication findings\n"));
}

test("runs every quality check with fresh analysis and exits successfully", async () => {
  checks();

  await import("./fallow-health-gate.ts");

  expect(spawn.mock.calls.map((call) => call[1])).toEqual([
    ["--no-cache", "dead-code", "--fail-on-issues", "--format", "compact"],
    ["--no-cache", "health", "--format", "json"],
    [
      "--no-cache",
      "dead-code",
      "--fail-on-regression",
      "--regression-baseline",
      "fallow-baseline.json",
      "--quiet",
    ],
    ["--no-cache", "dupes", "--format", "compact"],
  ]);
  for (const call of spawn.mock.calls) {
    expect(call[0]).toBe(path.join(root, "node_modules/.bin/fallow"));
    expect(call[2]).toEqual({ encoding: "utf8", cwd: root });
  }
  expect(exit).toHaveBeenCalledWith(0);
});

test.each([
  ["dead-code", 1, 92.5, 0, 0],
  ["health", 0, 79, 0, 0],
  ["regression", 0, 92.5, 1, 0],
  ["duplication", 0, 92.5, 0, 1],
] as const)(
  "fails on %s without skipping subsequent checks",
  async (_check, dead, score, regression, duplication) => {
    checks(dead, score, regression, duplication);

    await import("./fallow-health-gate.ts");

    expect(spawn).toHaveBeenCalledTimes(4);
    expect(console.error).toHaveBeenCalled();
    expect(exit).toHaveBeenCalledWith(1);
  },
);

test("uses the PATH binary and skips only regression when no baseline exists", async () => {
  exists.mockReturnValue(false);
  spawn
    .mockReturnValueOnce(result(0))
    .mockReturnValueOnce(result(0, '{"health_score":{"score":80,"grade":"B"}}'))
    .mockReturnValueOnce(result(0));

  await import("./fallow-health-gate.ts");

  expect(spawn).toHaveBeenCalledTimes(3);
  for (const call of spawn.mock.calls) {
    expect(call[0]).toBe("fallow");
    expect(call[1]?.[0]).toBe("--no-cache");
  }
  expect(exit).toHaveBeenCalledWith(0);
});

test("propagates process startup errors", async () => {
  const error = new Error("could not start fallow");
  spawn.mockReturnValueOnce({ ...result(null), error });

  await expect(import("./fallow-health-gate.ts")).rejects.toThrow(error);

  expect(exit).not.toHaveBeenCalled();
});

test("treats a missing child exit status as failure", async () => {
  spawn
    .mockReturnValueOnce(result(null))
    .mockReturnValueOnce(result(0, '{"health_score":{"score":92.5,"grade":"A"}}'))
    .mockReturnValueOnce(result(0))
    .mockReturnValueOnce(result(0));

  await import("./fallow-health-gate.ts");

  expect(exit).toHaveBeenCalledWith(1);
});
