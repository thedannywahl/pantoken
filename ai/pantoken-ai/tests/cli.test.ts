import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, expect, test, vi } from "vite-plus/test";
import { createAiCommand, runAiCli } from "../src/cli.ts";
import { select, spinner, text } from "@clack/prompts";

vi.mock("@clack/prompts", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@clack/prompts")>();
  return {
    ...actual,
    select: vi.fn(),
    text: vi.fn(),
    spinner: vi.fn(() => ({ start: vi.fn(), stop: vi.fn() })),
  };
});

function mktemp(): string {
  return mkdtempSync(join(tmpdir(), "pantoken-ai-cli-"));
}

const bin = new URL("../bin/pantoken-ai.mjs", import.meta.url).pathname;

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

test("createAiCommand builds a command named after the given name", () => {
  const program = createAiCommand({ name: "pantoken-ai" });
  expect(program.name()).toBe("pantoken-ai");
});

test("--help prints usage to stdout, listing both subcommands", async () => {
  await runAiCli(["--help"], { name: "pantoken-ai" });
  const printed = stdoutSpy.mock.calls.map((call: unknown[]) => String(call[0])).join("");
  expect(printed).toContain("init");
  expect(printed).toContain("scaffold");
});

test("--version prints the given version to stdout", async () => {
  await runAiCli(["--version"], { name: "pantoken-ai", version: "1.2.3" });
  const printed = stdoutSpy.mock.calls.map((call: unknown[]) => String(call[0])).join("");
  expect(printed).toContain("1.2.3");
});

// ---------------------------------------------------------------------------
// init
// ---------------------------------------------------------------------------

test("init writes agent assets for a specific tool", async () => {
  const dir = mktemp();
  await runAiCli(["init", "--tool", "cursor", "--dir", dir]);
  expect(existsSync(join(dir, ".cursor/rules/pantoken.mdc"))).toBe(true);
  expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(".cursor/rules/pantoken.mdc"));
});

test("init defaults to installing every tool's assets", async () => {
  const dir = mktemp();
  await runAiCli(["init", "--dir", dir]);
  expect(existsSync(join(dir, "AGENTS.md"))).toBe(true);
  expect(existsSync(join(dir, "llms.txt"))).toBe(true);
  expect(existsSync(join(dir, ".github/copilot-instructions.md"))).toBe(true);
});

test("init rejects an unknown --tool value", async () => {
  await runAiCli(["init", "--tool", "bogus"]);
  const printed = stderrSpy.mock.calls.map((call: unknown[]) => String(call[0])).join("");
  expect(printed).toContain("bogus");
  expect(exitSpy).toHaveBeenCalledWith(1);
});

test("init reports a write failure and exits non-zero", async () => {
  const dir = mktemp();
  const notADirectory = join(dir, "im-a-file");
  writeFileSync(notADirectory, "not a directory");
  await runAiCli(["init", "--tool", "cursor", "--dir", notADirectory]);
  expect(errSpy).toHaveBeenCalledWith("Error installing agent assets:", expect.any(String));
  expect(exitSpy).toHaveBeenCalledWith(1);
});

// ---------------------------------------------------------------------------
// scaffold
// ---------------------------------------------------------------------------

test("scaffold rejects an unknown platform (real bug fix: argParser now reports it)", async () => {
  await runAiCli(["scaffold", "not-a-real-platform"]);
  const printed = stderrSpy.mock.calls.map((call: unknown[]) => String(call[0])).join("");
  expect(printed).toContain("not-a-real-platform");
  expect(exitSpy).toHaveBeenCalledWith(1);
});

test("scaffold requires a platform argument under --yes", async () => {
  await runAiCli(["scaffold", "--yes"]);
  expect(errSpy).toHaveBeenCalledWith(
    "Error:",
    expect.stringContaining("Missing required argument"),
  );
  expect(exitSpy).toHaveBeenCalledWith(1);
});

test("scaffold writes both the scaffold and the agent assets", async () => {
  const dir = mktemp();
  const target = join(dir, "my-app");
  await runAiCli(["scaffold", "react", "--dir", target, "--yes", "--tool", "cursor"]);
  expect(existsSync(join(target, "package.json"))).toBe(true);
  expect(existsSync(join(target, ".cursor/rules/pantoken.mdc"))).toBe(true);
  expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("Next steps"));
});

test("scaffold prompts for a platform and directory on a TTY", async () => {
  const dir = mktemp();
  const target = join(dir, "prompted-app");
  vi.mocked(select).mockResolvedValueOnce("vue");
  vi.mocked(text).mockResolvedValueOnce(target);
  const originalIsTTY = process.stdin.isTTY;
  Object.defineProperty(process.stdin, "isTTY", { value: true, configurable: true });
  try {
    await runAiCli(["scaffold"]);
  } finally {
    Object.defineProperty(process.stdin, "isTTY", { value: originalIsTTY, configurable: true });
  }
  expect(existsSync(join(target, "package.json"))).toBe(true);
  expect(spinner).toHaveBeenCalled();
});

test("scaffold reports a scaffolding failure and exits non-zero", async () => {
  const dir = mktemp();
  const notADirectory = join(dir, "im-a-file");
  writeFileSync(notADirectory, "not a directory");
  await runAiCli(["scaffold", "react", "--dir", notADirectory, "--yes"]);
  expect(errSpy).toHaveBeenCalledWith("Error:", expect.any(String));
  expect(exitSpy).toHaveBeenCalledWith(1);
});

// ---------------------------------------------------------------------------
// bin script black-box tests (real @clack/prompts, no mocks apply across processes)
// ---------------------------------------------------------------------------

test("bin --help lists init and scaffold", () => {
  const output = execFileSync("node", [bin, "--help"], { encoding: "utf8" });
  expect(output).toContain("init");
  expect(output).toContain("scaffold");
});

test("bin scaffold installs assets alongside the scaffold", () => {
  const dir = mktemp();
  const target = join(dir, "my-app");
  execFileSync("node", [bin, "scaffold", "react", "--dir", target, "--tool", "cursor"], {
    encoding: "utf8",
  });
  expect(existsSync(join(target, "package.json"))).toBe(true);
  expect(existsSync(join(target, ".cursor/rules/pantoken.mdc"))).toBe(true);
});
