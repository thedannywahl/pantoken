import { afterEach, beforeEach, expect, test, vi } from "vite-plus/test";
import type { WorkspacePackage } from "./workspace-packages.ts";

interface SpawnResult {
  status: number;
  stdout: string;
  stderr: string;
}

const spawnSync = vi.fn<(...args: unknown[]) => SpawnResult>();
const appendFileSync = vi.fn();
const loadWorkspacePackages = vi.fn();

vi.mock("node:child_process", () => ({ spawnSync }));
vi.mock("node:fs", () => ({ appendFileSync }));
vi.mock("./workspace-packages.ts", async (importActual) => {
  const actual = await importActual<typeof import("./workspace-packages.ts")>();
  return { ...actual, loadWorkspacePackages };
});

const MODULE_PATH = new URL("./changed-packages.ts", import.meta.url).pathname;

function pkg(name: string, relPath: string, isPrivate = false): WorkspacePackage {
  return { name, path: relPath, version: "0.1.0", private: isPrivate, workspaceDeps: new Set() };
}

const PACKAGES = [pkg("@pantoken/css", "formats/css"), pkg("@pantoken/core", "packages/core")];

let outSpy: ReturnType<typeof vi.spyOn>;
let savedArgv: string[];
let savedEnv: NodeJS.ProcessEnv;
let savedExit: typeof process.exitCode;

beforeEach(() => {
  vi.resetModules();
  vi.clearAllMocks();
  loadWorkspacePackages.mockResolvedValue({
    rootDir: "/ws",
    packages: PACKAGES,
    byName: new Map(),
  });
  outSpy = vi.spyOn(process.stdout, "write").mockImplementation(() => true);
  vi.spyOn(console, "error").mockImplementation(() => {});
  savedArgv = process.argv;
  savedEnv = { ...process.env };
  savedExit = process.exitCode;
  process.exitCode = undefined;
  delete process.env.CHANGED_BASE;
  delete process.env.GITHUB_OUTPUT;
});

afterEach(() => {
  process.argv = savedArgv;
  process.env = savedEnv;
  process.exitCode = savedExit;
  vi.restoreAllMocks();
});

/** The JSON payload the script prints to stdout. */
function printed() {
  const line = outSpy.mock.calls
    .map((c: unknown[]) => String(c[0]))
    .find((s: string) => s.trim().startsWith("{"));
  return line ? JSON.parse(line) : null;
}

test("a usable --base diffs and resolves the changed subset", async () => {
  spawnSync.mockReturnValue({ status: 0, stdout: "formats/css/src/index.ts\n", stderr: "" });
  process.argv = ["node", MODULE_PATH, "--base", "origin/main"];

  await import("./changed-packages.ts");
  await vi.waitFor(() => expect(outSpy).toHaveBeenCalled());

  expect(printed()).toEqual({ scope: "subset", packages: ["@pantoken/css"] });
  // The three-dot diff runs against the provided base.
  expect(spawnSync.mock.calls[0]?.[1]).toEqual(["diff", "--name-only", "origin/main...HEAD"]);
});

test("an all-zero base ref is not usable → gate the whole set", async () => {
  process.env.CHANGED_BASE = "0000000000000000000000000000000000000000";
  process.argv = ["node", MODULE_PATH];

  await import("./changed-packages.ts");
  await vi.waitFor(() => expect(outSpy).toHaveBeenCalled());

  expect(printed()).toEqual({ scope: "all", packages: [] });
  expect(spawnSync).not.toHaveBeenCalled(); // never diffs without a usable base
});

test("a failed git diff falls back to gating the whole set", async () => {
  spawnSync.mockReturnValue({ status: 128, stdout: "", stderr: "bad ref" });
  process.argv = ["node", MODULE_PATH, "--base", "origin/main"];

  await import("./changed-packages.ts");
  await vi.waitFor(() => expect(outSpy).toHaveBeenCalled());

  expect(printed()).toEqual({ scope: "all", packages: [] });
});

test("writes scope/packages/count to GITHUB_OUTPUT when set", async () => {
  spawnSync.mockReturnValue({ status: 0, stdout: "docs/guide/x.md\n", stderr: "" });
  process.env.GITHUB_OUTPUT = "/tmp/gh-output";
  process.argv = ["node", MODULE_PATH, "--base", "origin/main"];

  await import("./changed-packages.ts");
  await vi.waitFor(() => expect(appendFileSync).toHaveBeenCalled());

  const [file, body] = appendFileSync.mock.calls[0] as [string, string];
  expect(file).toBe("/tmp/gh-output");
  expect(body).toContain("scope=none");
  expect(body).toContain("count=0");
});
