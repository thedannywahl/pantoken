import { afterEach, beforeEach, expect, test, vi } from "vite-plus/test";
import type { WorkspacePackage } from "./workspace-packages.ts";

interface SpawnResult {
  status: number;
  stdout: string;
  stderr: string;
}

const spawnSync = vi.fn<(...args: unknown[]) => SpawnResult>();
const readFileSync = vi.fn<(...args: unknown[]) => string>();
const appendFileSync = vi.fn();
const mkdirSync = vi.fn();
const writeFileSync = vi.fn();
const mkdtempSync = vi.fn<() => string>(() => "/tmp/release-notes-x");
const rmSync = vi.fn();
const loadWorkspacePackages = vi.fn();

vi.mock("node:child_process", () => ({ spawnSync }));
vi.mock("node:fs", () => ({
  appendFileSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
}));
vi.mock("./workspace-packages.ts", async (importActual) => {
  const actual = await importActual<typeof import("./workspace-packages.ts")>();
  return { ...actual, loadWorkspacePackages };
});

const MODULE_PATH = new URL("./publish-npm.ts", import.meta.url).pathname;

function pkg(name: string, version = "0.2.0"): WorkspacePackage {
  return {
    name,
    path: `formats/${name.split("/")[1]}`,
    version,
    private: false,
    workspaceDeps: new Set(),
  };
}

/** spawnSync router keyed on the command + first subarg; overridable per test. */
function router(overrides: Partial<Record<string, SpawnResult>> = {}) {
  const ok = { status: 0, stdout: "", stderr: "" };
  return (...spawnArgs: unknown[]): SpawnResult => {
    const cmd = spawnArgs[0] as string;
    const args = spawnArgs[1] as string[];
    const key = `${cmd} ${args[0]}`;
    if (key in overrides) return overrides[key] as SpawnResult;
    if (cmd === "npm" && args[0] === "view") return { status: 1, stdout: "", stderr: "" }; // not on npm
    if (cmd === "git" && args[0] === "rev-parse")
      return { status: 0, stdout: "deadbeef\n", stderr: "" };
    if (cmd === "gh" && args[0] === "release" && args[1] === "view")
      return { status: 1, stdout: "", stderr: "" }; // release absent
    return ok;
  };
}

let _logSpy: ReturnType<typeof vi.spyOn>;
let errSpy: ReturnType<typeof vi.spyOn>;
let savedArgv: string[];
let savedExit: typeof process.exitCode;
let savedEnv: NodeJS.ProcessEnv;

beforeEach(() => {
  vi.resetModules();
  vi.clearAllMocks();
  mkdtempSync.mockReturnValue("/tmp/release-notes-x");
  readFileSync.mockReturnValue("## 0.2.0\n\n- note\n");
  loadWorkspacePackages.mockResolvedValue({
    rootDir: "/ws",
    packages: [pkg("@pantoken/css"), pkg("@pantoken/utils")],
    byName: new Map(),
  });
  _logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
  errSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  savedArgv = process.argv;
  savedExit = process.exitCode;
  savedEnv = { ...process.env };
  process.exitCode = undefined;
  delete process.env.GITHUB_SHA;
  process.env.GITHUB_REPOSITORY = "acme/repo";
});

afterEach(() => {
  process.argv = savedArgv;
  process.exitCode = savedExit;
  process.env = savedEnv;
  vi.restoreAllMocks();
});

test("--dry-run reports the plan and touches nothing (no publish/release spawned)", async () => {
  spawnSync.mockImplementation(router());
  process.argv = ["node", MODULE_PATH, "--dry-run"];

  await import("./publish-npm.ts");
  await vi.waitFor(() => expect(errSpy).toHaveBeenCalled());

  const out = errSpy.mock.calls.map((c: unknown[]) => String(c[0])).join("\n");
  expect(out).toContain("would publish");
  expect(out).toMatch(/plan: publish \d+/);
  // Dry run must never publish or create a release.
  const spawned = spawnSync.mock.calls.map((c) => `${String(c[0])} ${(c[1] as string[])[0]}`);
  expect(spawned).not.toContain("npm publish");
});

test("normal run publishes pending versions and creates their releases", async () => {
  spawnSync.mockImplementation(router());
  process.argv = ["node", MODULE_PATH];

  await import("./publish-npm.ts");
  await vi.waitFor(() =>
    expect(errSpy.mock.calls.some((c: unknown[]) => String(c[0]).includes("done:"))).toBe(true),
  );

  const spawned = spawnSync.mock.calls.map((c) =>
    `${String(c[0])} ${(c[1] as string[])[0]} ${(c[1] as string[])[1] ?? ""}`.trim(),
  );
  expect(spawned).toContain("npm publish --provenance");
  expect(spawned.some((s) => s.startsWith("gh release create"))).toBe(true);
  expect(writeFileSync).toHaveBeenCalled(); // release notes written to a temp file
  expect(process.exitCode).toBeUndefined();
});

test("a failed publish continues past the failure and exits non-zero", async () => {
  spawnSync.mockImplementation(
    router({ "npm publish": { status: 1, stdout: "", stderr: "boom" } }),
  );
  process.argv = ["node", MODULE_PATH];

  await import("./publish-npm.ts");
  await vi.waitFor(() => expect(process.exitCode).toBe(1));

  expect(errSpy.mock.calls.some((c: unknown[]) => String(c[0]).includes("failed to publish"))).toBe(
    true,
  );
});

test("--releases-only skips publishing and ensures releases for versions already on npm", async () => {
  // Everything already on npm → nothing to publish; releases ensured for the skipped set.
  spawnSync.mockImplementation(
    router({ "npm view": { status: 0, stdout: "0.2.0\n", stderr: "" } }),
  );
  process.argv = ["node", MODULE_PATH, "--releases-only"];

  await import("./publish-npm.ts");
  await vi.waitFor(() =>
    expect(errSpy.mock.calls.some((c: unknown[]) => String(c[0]).includes("done:"))).toBe(true),
  );

  const spawned = spawnSync.mock.calls.map((c) => `${String(c[0])} ${(c[1] as string[])[0]}`);
  expect(spawned).not.toContain("npm publish"); // releases-only never publishes
  expect(spawned.some((s) => s.startsWith("gh release"))).toBe(true);
});

test("existing releases are skipped and GITHUB_SHA is used as the tag target", async () => {
  process.env.GITHUB_SHA = "cafebabe";
  spawnSync.mockImplementation(
    router({
      "npm view": { status: 0, stdout: "0.2.0\n", stderr: "" }, // on npm → skipped set
      "gh release": { status: 0, stdout: "exists", stderr: "" }, // release already exists
    }),
  );
  process.argv = ["node", MODULE_PATH, "--releases-only"];

  await import("./publish-npm.ts");
  await vi.waitFor(() =>
    expect(errSpy.mock.calls.some((c: unknown[]) => String(c[0]).includes("done:"))).toBe(true),
  );

  // GITHUB_SHA short-circuits resolveSha → no `git rev-parse`.
  const spawned = spawnSync.mock.calls.map((c) => `${String(c[0])} ${(c[1] as string[])[0]}`);
  expect(spawned).not.toContain("git rev-parse");
  // Release already exists → gh release create is never called.
  const createdArgs = spawnSync.mock.calls.find(
    (c) => c[0] === "gh" && (c[1] as string[])[1] === "create",
  );
  expect(createdArgs).toBeUndefined();
});
