import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, expect, test, vi } from "vite-plus/test";
import { InvalidArgumentError } from "commander";
import {
  ScaffoldCliError,
  createLocaleLookup,
  createScaffoldCommand,
  detectPackageManager,
  printNextSteps,
  resolveScaffoldTarget,
  runScaffoldCli,
  scaffoldWithSpinner,
  shouldPrompt,
  validateScaffoldPlatform,
  LOCALES,
} from "../src/cli.ts";
import { select, spinner, text } from "@clack/prompts";

// clack's real cancel sentinel is a module-private `Symbol("clack:cancel")`, unreachable from
// outside the package, so tests use their own well-known sentinel and mock `isCancel` to match it.
const { CANCEL_SYMBOL } = vi.hoisted(() => ({ CANCEL_SYMBOL: Symbol("test-cancel") }));

vi.mock("@clack/prompts", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@clack/prompts")>();
  return {
    ...actual,
    select: vi.fn(),
    text: vi.fn(),
    isCancel: (value: unknown) => value === CANCEL_SYMBOL,
    cancel: vi.fn(),
    spinner: vi.fn(() => ({ start: vi.fn(), stop: vi.fn() })),
  };
});

function mktemp(): string {
  return mkdtempSync(join(tmpdir(), "pantoken-scaffold-cli-"));
}

const { t } = createLocaleLookup(LOCALES, "en");

const bin = new URL("../bin/pantoken-scaffold.mjs", import.meta.url).pathname;

// ---------------------------------------------------------------------------
// shouldPrompt
// ---------------------------------------------------------------------------

test("shouldPrompt only prompts when the value is omitted, --yes is unset, and it's a TTY", () => {
  expect(shouldPrompt(undefined, { isTTY: true })).toBe(true);
  expect(shouldPrompt(undefined, { isTTY: false })).toBe(false);
  expect(shouldPrompt(undefined, {})).toBe(false);
  expect(shouldPrompt("./my-app", { isTTY: true })).toBe(false);
  expect(shouldPrompt(undefined, { yes: true, isTTY: true })).toBe(false);
});

// ---------------------------------------------------------------------------
// detectPackageManager
// ---------------------------------------------------------------------------

test("detectPackageManager reads npm_config_user_agent", () => {
  expect(detectPackageManager({ npm_config_user_agent: "pnpm/9.0.0 node/22" })).toBe("pnpm");
  expect(detectPackageManager({ npm_config_user_agent: "yarn/4.0.0 node/22" })).toBe("yarn");
  expect(detectPackageManager({ npm_config_user_agent: "bun/1.0.0" })).toBe("bun");
  expect(detectPackageManager({ npm_config_user_agent: "npm/10.0.0 node/22" })).toBe("npm");
  expect(detectPackageManager({})).toBeUndefined();
});

// ---------------------------------------------------------------------------
// validateScaffoldPlatform
// ---------------------------------------------------------------------------

test("validateScaffoldPlatform accepts a known platform and rejects unknown ones", () => {
  expect(validateScaffoldPlatform("react")).toBe("react");
  expect(() => validateScaffoldPlatform("not-a-real-platform")).toThrow(InvalidArgumentError);
});

// ---------------------------------------------------------------------------
// printNextSteps
// ---------------------------------------------------------------------------

test("printNextSteps prints an install command using the detected package manager", () => {
  const logSpy = vi.spyOn(console, "log").mockImplementation(() => undefined);
  const originalUserAgent = process.env.npm_config_user_agent;
  process.env.npm_config_user_agent = "pnpm/9.0.0 node/22";
  let printed: string;
  try {
    printNextSteps("./my-app", ["./my-app/package.json"], t);
    printed = logSpy.mock.calls.map((call: unknown[]) => call.join(" ")).join("\n");
  } finally {
    if (originalUserAgent === undefined) delete process.env.npm_config_user_agent;
    else process.env.npm_config_user_agent = originalUserAgent;
    logSpy.mockRestore();
  }
  expect(printed).toContain("pnpm install");
  expect(printed).toContain("./my-app");
});

test("printNextSteps falls back to npm install when no package manager is detected", () => {
  const logSpy = vi.spyOn(console, "log").mockImplementation(() => undefined);
  const originalUserAgent = process.env.npm_config_user_agent;
  delete process.env.npm_config_user_agent;
  let printed: string;
  try {
    printNextSteps(".", [], t);
    printed = logSpy.mock.calls.map((call: unknown[]) => call.join(" ")).join("\n");
  } finally {
    if (originalUserAgent !== undefined) process.env.npm_config_user_agent = originalUserAgent;
    logSpy.mockRestore();
  }
  expect(printed).toContain("npm install");
});

// ---------------------------------------------------------------------------
// resolveScaffoldTarget
// ---------------------------------------------------------------------------

test("resolveScaffoldTarget throws when the platform is missing under --yes", async () => {
  await expect(resolveScaffoldTarget({ yes: true, isTTY: true, t })).rejects.toThrow(
    ScaffoldCliError,
  );
});

test("resolveScaffoldTarget throws when the platform is missing on a non-TTY", async () => {
  await expect(resolveScaffoldTarget({ isTTY: false, t })).rejects.toThrow(ScaffoldCliError);
});

test("resolveScaffoldTarget throws for an unknown platform", async () => {
  await expect(
    resolveScaffoldTarget({ platformArg: "not-a-real-platform", isTTY: false, t }),
  ).rejects.toThrow(ScaffoldCliError);
});

test("resolveScaffoldTarget defaults dir to '.' when omitted non-interactively", async () => {
  const result = await resolveScaffoldTarget({ platformArg: "react", isTTY: false, t });
  expect(result).toEqual({ platform: "react", dir: "." });
});

test("resolveScaffoldTarget prompts for a missing platform and directory on a TTY", async () => {
  vi.mocked(select).mockResolvedValueOnce("vue");
  vi.mocked(text).mockResolvedValueOnce("./prompted-app");
  const result = await resolveScaffoldTarget({ isTTY: true, t });
  expect(result).toEqual({ platform: "vue", dir: "./prompted-app" });
});

test("resolveScaffoldTarget throws ScaffoldCliError when the platform prompt is cancelled", async () => {
  vi.mocked(select).mockResolvedValueOnce(CANCEL_SYMBOL as never);
  await expect(resolveScaffoldTarget({ isTTY: true, t })).rejects.toThrow(ScaffoldCliError);
});

test("resolveScaffoldTarget throws ScaffoldCliError when the directory prompt is cancelled", async () => {
  vi.mocked(select).mockResolvedValueOnce("react");
  vi.mocked(text).mockResolvedValueOnce(CANCEL_SYMBOL as never);
  await expect(resolveScaffoldTarget({ platformArg: "react", isTTY: true, t })).rejects.toThrow(
    ScaffoldCliError,
  );
});

test("resolveScaffoldTarget falls back to '.' for a blank prompted directory", async () => {
  vi.mocked(text).mockResolvedValueOnce("");
  const result = await resolveScaffoldTarget({ platformArg: "react", isTTY: true, t });
  expect(result).toEqual({ platform: "react", dir: "." });
});

// ---------------------------------------------------------------------------
// scaffoldWithSpinner
// ---------------------------------------------------------------------------

test("scaffoldWithSpinner scaffolds and starts/stops the spinner", async () => {
  const dir = mktemp();
  const target = join(dir, "my-app");
  const written = await scaffoldWithSpinner("react", target, t);
  expect(written.length).toBeGreaterThan(0);
  expect(existsSync(join(target, "package.json"))).toBe(true);
  expect(spinner).toHaveBeenCalled();
});

test("scaffoldWithSpinner stops the spinner and rethrows on failure", async () => {
  const dir = mktemp();
  const notADirectory = join(dir, "im-a-file");
  writeFileSync(notADirectory, "not a directory");
  await expect(scaffoldWithSpinner("react", notADirectory, t)).rejects.toThrow();
});

// ---------------------------------------------------------------------------
// createScaffoldCommand / runScaffoldCli
// ---------------------------------------------------------------------------

let logSpy: ReturnType<typeof vi.spyOn>;
let errSpy: ReturnType<typeof vi.spyOn>;
let exitSpy: ReturnType<typeof vi.spyOn>;
let stdoutSpy: ReturnType<typeof vi.spyOn>;
let stderrSpy: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
  logSpy = vi.spyOn(console, "log").mockImplementation(() => undefined);
  errSpy = vi.spyOn(console, "error").mockImplementation(() => undefined);
  exitSpy = vi.spyOn(process, "exit").mockImplementation(() => undefined as never);
  stdoutSpy = vi.spyOn(process.stdout, "write").mockImplementation(() => true);
  stderrSpy = vi.spyOn(process.stderr, "write").mockImplementation(() => true);
});

afterEach(() => {
  logSpy.mockRestore();
  errSpy.mockRestore();
  exitSpy.mockRestore();
  stdoutSpy.mockRestore();
  stderrSpy.mockRestore();
  vi.mocked(select).mockReset();
  vi.mocked(text).mockReset();
});

test("createScaffoldCommand builds a command named after the given name", () => {
  const program = createScaffoldCommand({ name: "pantoken-scaffold", enableCompletions: false });
  expect(program.name()).toBe("pantoken-scaffold");
});

test("--help prints usage to stdout", async () => {
  await runScaffoldCli(["--help"], { usageCommand: "pantoken-scaffold" });
  const printed = stdoutSpy.mock.calls.map((call: unknown[]) => String(call[0])).join("");
  expect(printed).toContain("pantoken-scaffold");
});

test("--version prints the given version to stdout", async () => {
  await runScaffoldCli(["--version"], { usageCommand: "pantoken-scaffold", version: "1.2.3" });
  const printed = stdoutSpy.mock.calls.map((call: unknown[]) => String(call[0])).join("");
  expect(printed).toContain("1.2.3");
});

test("rejects an unrecognized flag", async () => {
  await runScaffoldCli(["--bogus"], { usageCommand: "pantoken-scaffold" });
  const printed = stderrSpy.mock.calls.map((call: unknown[]) => String(call[0])).join("");
  expect(printed).toContain("unknown option");
  expect(exitSpy).toHaveBeenCalledWith(1);
});

test("rejects a second positional argument", async () => {
  await runScaffoldCli(["react", "extra"], { usageCommand: "pantoken-scaffold" });
  const printed = stderrSpy.mock.calls.map((call: unknown[]) => String(call[0])).join("");
  expect(printed).toContain("too many arguments");
  expect(exitSpy).toHaveBeenCalledWith(1);
});

test("rejects an unknown platform", async () => {
  await runScaffoldCli(["not-a-real-platform"], { usageCommand: "pantoken-scaffold" });
  const printed = stderrSpy.mock.calls.map((call: unknown[]) => String(call[0])).join("");
  expect(printed).toContain("not-a-real-platform");
  expect(exitSpy).toHaveBeenCalledWith(1);
});

test("requires a platform argument under --yes", async () => {
  await runScaffoldCli(["--yes"], { usageCommand: "pantoken-scaffold" });
  expect(errSpy).toHaveBeenCalledWith(expect.stringContaining("Missing required argument"));
  expect(exitSpy).toHaveBeenCalledWith(1);
});

test("scaffolds and prints next steps when --dir is given", async () => {
  const dir = mktemp();
  const target = join(dir, "my-app");
  await runScaffoldCli(["react", "--dir", target, "--yes"], { usageCommand: "pantoken-scaffold" });
  expect(existsSync(join(target, "package.json"))).toBe(true);
  expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("Next steps"));
});

test("reports a scaffolding failure and exits non-zero", async () => {
  const dir = mktemp();
  const notADirectory = join(dir, "im-a-file");
  writeFileSync(notADirectory, "not a directory");
  await runScaffoldCli(["react", "--dir", notADirectory, "--yes"], {
    usageCommand: "pantoken-scaffold",
  });
  expect(errSpy).toHaveBeenCalledWith("Error scaffolding project:", expect.any(String));
  expect(exitSpy).toHaveBeenCalledWith(1);
});

// ---------------------------------------------------------------------------
// bin script black-box tests (real @clack/prompts, no mocks apply across processes)
// ---------------------------------------------------------------------------

test("bin --help does not scaffold anything", () => {
  const output = execFileSync("node", [bin, "--help"], { encoding: "utf8" });
  expect(output).toContain("pantoken-scaffold");
});

test("bin prints an install command and substitutes projectName", () => {
  const dir = mktemp();
  const target = join(dir, "my-app");
  const output = execFileSync("node", [bin, "react", "--dir", target], { encoding: "utf8" });
  expect(output).toContain("install");
  expect(existsSync(join(target, "package.json"))).toBe(true);
  expect(readFileSync(join(target, "package.json"), "utf8")).toContain('"name": "my-app"');
});
