import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, expect, test, vi } from "vite-plus/test";
import { runScaffoldCli, shouldPromptForDir } from "../src/cli.ts";

function mktemp(): string {
  return mkdtempSync(join(tmpdir(), "pantoken-scaffold-cli-"));
}

/** Thrown by the `process.exit` spy below, so an exiting code path surfaces as a rejected promise. */
class ProcessExitError extends Error {
  constructor(public code: number | string | null | undefined) {
    super(`process.exit(${code})`);
  }
}

test("shouldPromptForDir only prompts when --dir is omitted on a TTY", () => {
  expect(shouldPromptForDir(undefined, true)).toBe(true);
  expect(shouldPromptForDir(undefined, false)).toBe(false);
  expect(shouldPromptForDir(undefined, undefined)).toBe(false);
  expect(shouldPromptForDir("./my-app", true)).toBe(false);
});

const bin = new URL("../bin/pantoken-scaffold.mjs", import.meta.url).pathname;

test("--help does not scaffold anything", () => {
  const output = execFileSync("node", [bin, "--help"], { encoding: "utf8" });
  expect(output).toContain("pantoken-scaffold");
});

test("prints vp install as the preferred next step", () => {
  const dir = mktemp();
  const target = join(dir, "my-app");
  const output = execFileSync("node", [bin, "react", "--dir", target], { encoding: "utf8" });
  expect(output).toContain("vp install");
  expect(existsSync(join(target, "package.json"))).toBe(true);
});

test("still substitutes projectName with the shared CLI", () => {
  const dir = mktemp();
  const target = join(dir, "my-app");
  execFileSync("node", [bin, "react", "--dir", target], { encoding: "utf8" });
  expect(readFileSync(join(target, "package.json"), "utf8")).toContain('"name": "my-app"');
});

// The tests above only exercise the built bin as a black box (a child process, so it never
// contributes to this file's coverage). The tests below call `runScaffoldCli` directly.

let logSpy: ReturnType<typeof vi.spyOn>;
let errSpy: ReturnType<typeof vi.spyOn>;
let exitSpy: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
  logSpy = vi.spyOn(console, "log").mockImplementation(() => undefined);
  errSpy = vi.spyOn(console, "error").mockImplementation(() => undefined);
  exitSpy = vi.spyOn(process, "exit").mockImplementation((code?: number | string | null) => {
    throw new ProcessExitError(code);
  });
});

afterEach(() => {
  logSpy.mockRestore();
  errSpy.mockRestore();
  exitSpy.mockRestore();
});

test("--help prints usage and returns without exiting", async () => {
  await runScaffoldCli(["--help"], { usageCommand: "pantoken-scaffold" });
  expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("pantoken-scaffold"));
  expect(exitSpy).not.toHaveBeenCalled();
});

test("rejects an unrecognized flag", async () => {
  await expect(runScaffoldCli(["--bogus"], { usageCommand: "pantoken-scaffold" })).rejects.toThrow(
    ProcessExitError,
  );
  expect(errSpy).toHaveBeenCalledWith('Unknown option "--bogus".');
});

test("rejects a second positional argument", async () => {
  await expect(
    runScaffoldCli(["react", "extra"], { usageCommand: "pantoken-scaffold" }),
  ).rejects.toThrow(ProcessExitError);
  expect(errSpy).toHaveBeenCalledWith('Unknown option "extra".');
});

test("rejects an unknown platform", async () => {
  await expect(
    runScaffoldCli(["not-a-real-platform"], { usageCommand: "pantoken-scaffold" }),
  ).rejects.toThrow(ProcessExitError);
  expect(errSpy).toHaveBeenCalledWith('Unknown platform "not-a-real-platform".');
});

test("requires a platform argument", async () => {
  await expect(runScaffoldCli([], { usageCommand: "pantoken-scaffold" })).rejects.toThrow(
    ProcessExitError,
  );
  expect(errSpy).toHaveBeenCalledWith('Unknown platform "".');
});

test("scaffolds and prints vp install when --dir is given", async () => {
  const dir = mktemp();
  const target = join(dir, "my-app");
  await runScaffoldCli(["react", "--dir", target], { usageCommand: "pantoken-scaffold" });
  expect(existsSync(join(target, "package.json"))).toBe(true);
  expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("vp install"));
});

test("prompts for a directory when --dir is omitted on a TTY", async () => {
  const dir = mktemp();
  const target = join(dir, "prompted-app");
  const question = vi.fn().mockResolvedValue(target);
  const close = vi.fn();
  vi.doMock("node:readline/promises", () => ({ createInterface: () => ({ question, close }) }));
  vi.resetModules();
  const originalIsTTY = process.stdin.isTTY;
  Object.defineProperty(process.stdin, "isTTY", { value: true, configurable: true });
  try {
    const { runScaffoldCli: freshRunScaffoldCli } = await import("../src/cli.ts");
    await freshRunScaffoldCli(["react"], { usageCommand: "pantoken-scaffold" });
  } finally {
    Object.defineProperty(process.stdin, "isTTY", { value: originalIsTTY, configurable: true });
    vi.doUnmock("node:readline/promises");
    vi.resetModules();
  }
  expect(question).toHaveBeenCalledWith("Project directory (. for current folder): ");
  expect(close).toHaveBeenCalled();
  expect(existsSync(join(target, "package.json"))).toBe(true);
});

test("a blank prompt answer falls back to the current folder", async () => {
  const dir = mktemp();
  const question = vi.fn().mockResolvedValue("   ");
  const close = vi.fn();
  vi.doMock("node:readline/promises", () => ({ createInterface: () => ({ question, close }) }));
  vi.resetModules();
  const originalIsTTY = process.stdin.isTTY;
  Object.defineProperty(process.stdin, "isTTY", { value: true, configurable: true });
  const cwd = process.cwd();
  process.chdir(dir);
  try {
    const { runScaffoldCli: freshRunScaffoldCli } = await import("../src/cli.ts");
    await freshRunScaffoldCli(["react"], { usageCommand: "pantoken-scaffold" });
  } finally {
    process.chdir(cwd);
    Object.defineProperty(process.stdin, "isTTY", { value: originalIsTTY, configurable: true });
    vi.doUnmock("node:readline/promises");
    vi.resetModules();
  }
  expect(existsSync(join(dir, "package.json"))).toBe(true);
});

test("defaults to the current folder when --dir is omitted on a non-TTY", async () => {
  const dir = mktemp();
  const cwd = process.cwd();
  process.chdir(dir);
  try {
    await runScaffoldCli(["components"], { usageCommand: "pantoken-scaffold" });
  } finally {
    process.chdir(cwd);
  }
  expect(existsSync(join(dir, "package.json"))).toBe(true);
});

test("reports a non-Error scaffolding failure", async () => {
  vi.doMock("../src/index.ts", async (importActual) => {
    const actual = await importActual<typeof import("../src/index.ts")>();
    return { ...actual, scaffoldProject: () => Promise.reject("boom") };
  });
  vi.resetModules();
  try {
    const { runScaffoldCli: freshRunScaffoldCli } = await import("../src/cli.ts");
    await expect(
      freshRunScaffoldCli(["react", "--dir", mktemp()], { usageCommand: "pantoken-scaffold" }),
    ).rejects.toThrow(ProcessExitError);
  } finally {
    vi.doUnmock("../src/index.ts");
    vi.resetModules();
  }
  expect(errSpy).toHaveBeenCalledWith("Error scaffolding project:", "boom");
});

test("reports a scaffolding failure", async () => {
  const dir = mktemp();
  const notADirectory = join(dir, "im-a-file");
  writeFileSync(notADirectory, "not a directory");
  await expect(
    runScaffoldCli(["react", "--dir", notADirectory], { usageCommand: "pantoken-scaffold" }),
  ).rejects.toThrow(ProcessExitError);
  expect(errSpy).toHaveBeenCalledWith("Error scaffolding project:", expect.any(String));
});
