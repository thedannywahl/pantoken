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
const existsSync = vi.fn<(...args: unknown[]) => boolean>();
const mkdirSync = vi.fn();
const writeFileSync = vi.fn();
const mkdtempSync = vi.fn<() => string>(() => "/tmp/release-notes-x");
const rmSync = vi.fn();
const loadWorkspacePackages = vi.fn();

vi.mock("node:child_process", () => ({ spawnSync }));
vi.mock("node:fs", () => ({
  appendFileSync,
  existsSync,
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

const OK_RESULT: SpawnResult = { status: 0, stdout: "", stderr: "" };
const NOT_FOUND_RESULT: SpawnResult = { status: 1, stdout: "", stderr: "" };
const DEFAULT_PACK_STDOUT = JSON.stringify([{ filename: "pantoken-css-0.2.0.tgz" }]);
const DEFAULT_ROUTE_OVERRIDES: Record<string, SpawnResult> = {
  "npm view": NOT_FOUND_RESULT,
  "npm pack": { status: 0, stdout: DEFAULT_PACK_STDOUT, stderr: "" },
  "git rev-parse": { status: 0, stdout: "deadbeef\n", stderr: "" },
};
const GH_RELEASE_ROUTE_OVERRIDES: Record<string, SpawnResult> = {
  "gh release view": NOT_FOUND_RESULT,
};

function routeKey(cmd: string, firstArg: string): string {
  return `${cmd} ${firstArg}`;
}

function ghReleaseKey(cmd: string, args: string[]): string {
  return `${cmd} ${args[0] ?? ""} ${args[1] ?? ""}`;
}

function defaultRouteResult(cmd: string, args: string[]): SpawnResult {
  const ghReleaseResult = GH_RELEASE_ROUTE_OVERRIDES[ghReleaseKey(cmd, args)];
  if (ghReleaseResult) return ghReleaseResult;
  return DEFAULT_ROUTE_OVERRIDES[routeKey(cmd, args[0] ?? "")] ?? OK_RESULT;
}

/** spawnSync router keyed on the command + first subarg; overridable per test. */
function router(overrides: Partial<Record<string, SpawnResult>> = {}) {
  return (...spawnArgs: unknown[]): SpawnResult => {
    const cmd = spawnArgs[0] as string;
    const args = spawnArgs[1] as string[];
    const key = routeKey(cmd, args[0] ?? "");
    if (key in overrides) return overrides[key] as SpawnResult;
    return defaultRouteResult(cmd, args);
  };
}

function uploadFailureRouter(packJson: string): (...spawnArgs: unknown[]) => SpawnResult {
  const overrides: Record<string, SpawnResult> = {
    "npm view": NOT_FOUND_RESULT,
    "npm pack": { status: 0, stdout: packJson, stderr: "" },
    "npm publish": OK_RESULT,
    "git rev-parse": { status: 0, stdout: "deadbeef\n", stderr: "" },
  };
  const ghOverrides: Record<string, SpawnResult> = {
    "gh release view": NOT_FOUND_RESULT,
    "gh release create": OK_RESULT,
    "gh release upload": { status: 1, stdout: "", stderr: "upload error" },
  };
  return (...spawnArgs: unknown[]): SpawnResult => {
    const cmd = spawnArgs[0] as string;
    const args = spawnArgs[1] as string[];
    const ghOverride = ghOverrides[ghReleaseKey(cmd, args)];
    if (ghOverride) return ghOverride;
    const key = routeKey(cmd, args[0] ?? "");
    return overrides[key] ?? OK_RESULT;
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
  existsSync.mockReturnValue(true);
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

test("ensureRelease packs + uploads the tgz and records the tag when npm pack succeeds", async () => {
  const packJson = JSON.stringify([{ filename: "pantoken-css-0.2.0.tgz" }]);
  spawnSync.mockImplementation(router({ "npm pack": { status: 0, stdout: packJson, stderr: "" } }));
  process.argv = ["node", MODULE_PATH];

  await import("./publish-npm.ts");
  await vi.waitFor(() =>
    expect(errSpy.mock.calls.some((c: unknown[]) => String(c[0]).includes("done:"))).toBe(true),
  );

  const spawned = spawnSync.mock.calls.map((c) =>
    `${String(c[0])} ${(c[1] as string[])[0]}`.trim(),
  );
  // packAndUpload: calls mv to move the tgz, then gh release upload
  expect(spawned.some((s) => s.startsWith("mv"))).toBe(true);
  expect(spawned.some((s) => s === "gh release")).toBe(true);
  // recordRelease: appends the release tag to the tracking file
  expect(appendFileSync).toHaveBeenCalled();
});

test("ensureRelease accepts npm 12 object output from npm pack --json", async () => {
  const packJson = JSON.stringify({
    "@pantoken/css": { filename: "pantoken-css-0.2.0.tgz" },
  });
  spawnSync.mockImplementation(router({ "npm pack": { status: 0, stdout: packJson, stderr: "" } }));
  process.argv = ["node", MODULE_PATH];

  await import("./publish-npm.ts");
  await vi.waitFor(() =>
    expect(errSpy.mock.calls.some((c: unknown[]) => String(c[0]).includes("done:"))).toBe(true),
  );

  const spawned = spawnSync.mock.calls.map((c) =>
    `${String(c[0])} ${(c[1] as string[])[0]}`.trim(),
  );
  expect(spawned.some((s) => s.startsWith("mv"))).toBe(true);
  expect(appendFileSync).toHaveBeenCalled();
  expect(errSpy.mock.calls.some((c: unknown[]) => String(c[0]).includes("pack failed for"))).toBe(
    false,
  );
});

test("npmPackFilename returns null when npm pack exits non-zero", async () => {
  spawnSync.mockImplementation(
    router({ "npm pack": { status: 1, stdout: "", stderr: "pack-failed" } }),
  );
  process.argv = ["node", MODULE_PATH];

  await import("./publish-npm.ts");
  await vi.waitFor(() => expect(process.exitCode).toBe(1));

  // packAndUpload bails out early — pack failed → no mv or upload
  const spawned = spawnSync.mock.calls.map((c) =>
    `${String(c[0])} ${(c[1] as string[])[0]}`.trim(),
  );
  expect(spawned.some((s) => s.startsWith("mv"))).toBe(false);
  expect(errSpy.mock.calls.some((c: unknown[]) => String(c[0]).includes("pack failed"))).toBe(true);
  expect(
    errSpy.mock.calls.some((c: unknown[]) => String(c[0]).includes("failed to create release")),
  ).toBe(true);
});

test("npmPackFilename returns null when npm pack stdout is invalid JSON", async () => {
  spawnSync.mockImplementation(
    router({ "npm pack": { status: 0, stdout: "not-json", stderr: "" } }),
  );
  process.argv = ["node", MODULE_PATH];

  await import("./publish-npm.ts");
  await vi.waitFor(() => expect(process.exitCode).toBe(1));

  // JSON.parse throws → packAndUpload gets null → logs "pack failed"
  expect(errSpy.mock.calls.some((c: unknown[]) => String(c[0]).includes("pack failed"))).toBe(true);
  expect(
    errSpy.mock.calls.some((c: unknown[]) => String(c[0]).includes("failed to create release")),
  ).toBe(true);
});

test("packAndUpload logs error when gh release upload fails", async () => {
  const packJson = JSON.stringify([{ filename: "pantoken-css-0.2.0.tgz" }]);
  spawnSync.mockImplementation(uploadFailureRouter(packJson));
  process.argv = ["node", MODULE_PATH];

  await import("./publish-npm.ts");
  await vi.waitFor(() =>
    expect(errSpy.mock.calls.some((c: unknown[]) => String(c[0]).includes("done:"))).toBe(true),
  );

  expect(
    errSpy.mock.calls.some((c: unknown[]) => String(c[0]).includes("tarball upload failed")),
  ).toBe(true);
});

test("releaseNotes falls back to minimal message when CHANGELOG.md is missing", async () => {
  readFileSync.mockImplementation((...args: unknown[]) => {
    const filePath = String(args[0]);
    if (filePath.includes("CHANGELOG")) throw new Error("ENOENT");
    return "";
  });
  spawnSync.mockImplementation(router());
  process.argv = ["node", MODULE_PATH];

  await import("./publish-npm.ts");
  await vi.waitFor(() =>
    expect(errSpy.mock.calls.some((c: unknown[]) => String(c[0]).includes("done:"))).toBe(true),
  );

  // Release notes fell back to "Release <tag>." — release still created
  const spawned = spawnSync.mock.calls.map((c) => `${String(c[0])} ${(c[1] as string[])[0]}`);
  expect(spawned.some((s) => s.startsWith("gh release"))).toBe(true);
});

test("a failed release create continues past the failure and exits non-zero", async () => {
  spawnSync.mockImplementation(
    router({ "gh release": { status: 1, stdout: "", stderr: "release create boom" } }),
  );
  process.argv = ["node", MODULE_PATH];

  await import("./publish-npm.ts");
  await vi.waitFor(() => expect(process.exitCode).toBe(1));

  expect(
    errSpy.mock.calls.some((c: unknown[]) => String(c[0]).includes("failed to create release")),
  ).toBe(true);
});

test("failedPublish packages are logged and exit code is 1", async () => {
  spawnSync.mockImplementation(
    router({ "npm publish": { status: 1, stdout: "", stderr: "auth error" } }),
  );
  process.argv = ["node", MODULE_PATH];

  await import("./publish-npm.ts");
  await vi.waitFor(() =>
    expect(errSpy.mock.calls.some((c: unknown[]) => String(c[0]).includes("publish failed:"))).toBe(
      true,
    ),
  );
  expect(process.exitCode).toBe(1);
});
