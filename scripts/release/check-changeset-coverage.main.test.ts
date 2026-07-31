import { afterEach, beforeEach, expect, test, vi } from "vite-plus/test";
import type { WorkspacePackage } from "./workspace-packages.ts";

interface SpawnResult {
  status: number;
  stdout: string;
  stderr: string;
}

const spawnSync = vi.fn<(...args: unknown[]) => SpawnResult>();
const readFileSync = vi.fn<(...args: unknown[]) => string>();
const mkdtempSync = vi.fn<() => string>(() => "/tmp/changeset-status-x");
const rmSync = vi.fn();
const loadWorkspacePackages = vi.fn();

vi.mock("node:child_process", () => ({ spawnSync }));
vi.mock("node:fs", () => ({ mkdtempSync, readFileSync, rmSync }));
vi.mock("./workspace-packages.ts", async (importActual) => {
  const actual = await importActual<typeof import("./workspace-packages.ts")>();
  return { ...actual, loadWorkspacePackages };
});

const MODULE_PATH = new URL("./check-changeset-coverage.ts", import.meta.url).pathname;

const OK: SpawnResult = { status: 0, stdout: "", stderr: "" };

function pkg(name: string, relPath: string): WorkspacePackage {
  return { name, path: relPath, version: "0.1.0", private: false, workspaceDeps: new Set() };
}

const PACKAGES = [pkg("@pantoken/css", "formats/css"), pkg("@pantoken/utils", "packages/utils")];

/** Key a mocked spawn route by command and first sub-command argument. */
function spawnRouteKey(cmd: string, args: readonly string[]): string {
  return `${cmd} ${args[0] ?? ""}`;
}

/** Install a route table for spawnSync mocks used by these black-box main tests. */
function wireSpawnRoutes(routes: Record<string, SpawnResult>): void {
  spawnSync.mockImplementation((...spawnArgs: unknown[]) => {
    const cmd = spawnArgs[0] as string;
    const args = spawnArgs[1] as string[];
    return routes[spawnRouteKey(cmd, args)] ?? OK;
  });
}

/**
 * Route spawnSync by command. `diff` yields the changed-file list; `status` (the changeset CLI)
 * writes the release plan to the temp output file (simulated via readFileSync).
 */
function wireGit(changedFiles: string[]) {
  wireSpawnRoutes({
    "git merge-base": { status: 0, stdout: "base-sha\n", stderr: "" },
    "git diff": { status: 0, stdout: `${changedFiles.join("\n")}\n`, stderr: "" },
    "git show": { status: 1, stdout: "", stderr: "" },
  });
}

let logSpy: ReturnType<typeof vi.spyOn>;
let errSpy: ReturnType<typeof vi.spyOn>;
let savedArgv: string[];
let savedEnv: NodeJS.ProcessEnv;
let savedExit: typeof process.exitCode;

beforeEach(() => {
  vi.resetModules();
  vi.clearAllMocks();
  mkdtempSync.mockReturnValue("/tmp/changeset-status-x");
  loadWorkspacePackages.mockResolvedValue({ packages: PACKAGES });
  logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
  errSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  savedArgv = process.argv;
  savedEnv = { ...process.env };
  savedExit = process.exitCode;
  process.exitCode = undefined;
  delete process.env.CHANGESET_BASE;
  process.argv = ["node", MODULE_PATH, "--base", "origin/main"];
});

afterEach(() => {
  process.argv = savedArgv;
  process.env = savedEnv;
  process.exitCode = savedExit;
  vi.restoreAllMocks();
});

test("passes silently when the diff touches no shippable package source", async () => {
  wireGit(["docs/guide/x.md", "formats/css/tests/x.test.ts"]);
  readFileSync.mockReturnValue("{}");

  await import("./check-changeset-coverage.ts");
  await vi.waitFor(() => expect(logSpy).toHaveBeenCalled());

  expect(String(logSpy.mock.calls[0]?.[0])).toContain("no publishable package needs a changeset");
  expect(process.exitCode).toBeUndefined();
});

test("passes when the changed package is covered by a pending bump", async () => {
  wireGit(["formats/css/src/index.ts"]);
  // The changeset status output marks @pantoken/css for a minor bump.
  readFileSync.mockReturnValue(
    JSON.stringify({ releases: [{ name: "@pantoken/css", type: "minor" }] }),
  );

  await import("./check-changeset-coverage.ts");
  await vi.waitFor(() => expect(logSpy).toHaveBeenCalled());

  expect(String(logSpy.mock.calls[0]?.[0])).toContain("covered by pending changesets");
  expect(process.exitCode).toBeUndefined();
});

test("fails when a changed package has no covering changeset", async () => {
  wireGit(["formats/css/src/index.ts", "packages/utils/src/index.ts"]);
  // Only css is bumped; utils is uncovered. A `type: none` release doesn't count as coverage.
  readFileSync.mockReturnValue(
    JSON.stringify({
      releases: [
        { name: "@pantoken/css", type: "patch" },
        { name: "@pantoken/utils", type: "none" },
      ],
    }),
  );

  await import("./check-changeset-coverage.ts");
  await vi.waitFor(() => expect(process.exitCode).toBe(1));

  const out = errSpy.mock.calls.map((c: unknown[]) => String(c[0])).join("\n");
  expect(out).toContain("no pending changeset bumps them");
  expect(out).toContain("- @pantoken/utils");
});

test("a package.json whose diff is dev-only doesn't require a changeset", async () => {
  wireGit(["formats/css/package.json"]);
  // Base manifest (git show) present but only scripts differ from the working copy → not release-relevant.
  wireSpawnRoutes({
    "git merge-base": { status: 0, stdout: "base-sha\n", stderr: "" },
    "git diff": { status: 0, stdout: "formats/css/package.json\n", stderr: "" },
    "git show": {
      status: 0,
      stdout: JSON.stringify({ name: "@pantoken/css", scripts: { a: "1" } }),
      stderr: "",
    },
  });
  readFileSync.mockImplementation((...args: unknown[]) => {
    const p = args[0] as string;
    return p.endsWith("package.json")
      ? JSON.stringify({ name: "@pantoken/css", scripts: { a: "2" } })
      : "{}";
  });

  await import("./check-changeset-coverage.ts");
  await vi.waitFor(() => expect(logSpy).toHaveBeenCalled());

  expect(String(logSpy.mock.calls[0]?.[0])).toContain("no publishable package needs a changeset");
});

test("a failing git diff rejects and exits non-zero", async () => {
  wireSpawnRoutes({
    "git merge-base": { status: 0, stdout: "base\n", stderr: "" },
    "git diff": { status: 1, stdout: "", stderr: "fatal: bad" },
  });

  await import("./check-changeset-coverage.ts");
  await vi.waitFor(() => expect(process.exitCode).toBe(1));

  expect(errSpy.mock.calls.some((c: unknown[]) => String(c[0]).includes("git diff failed"))).toBe(
    true,
  );
});
