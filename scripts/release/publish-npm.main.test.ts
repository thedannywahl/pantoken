import { afterEach, beforeEach, expect, test, vi } from "vite-plus/test";
import type { WorkspacePackage } from "./workspace-packages.ts";

interface SpawnResult {
  status: number;
  stdout: string;
  stderr: string;
}

const spawnSync = vi.fn<(...args: unknown[]) => SpawnResult>();
const readFileSync = vi.fn<(...args: unknown[]) => string>();
const existsSync = vi.fn<(...args: unknown[]) => boolean>();
const mkdirSync = vi.fn();
const writeFileSync = vi.fn();
const loadWorkspacePackages = vi.fn();

vi.mock("node:child_process", () => ({ spawnSync }));
vi.mock("node:fs", () => ({
  existsSync,
  mkdirSync,
  readFileSync,
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
const DEFAULT_TARBALL = "/ws/packs/pantoken-css-0.2.0.tgz";
const DEFAULT_MANIFEST = JSON.stringify({ dependencies: { "@pantoken/utils": "^0.2.0" } });
const DEFAULT_ROUTE_OVERRIDES: Record<string, SpawnResult> = {
  "npm view": NOT_FOUND_RESULT,
  "pnpm pack": { status: 0, stdout: `${DEFAULT_TARBALL}\n`, stderr: "" },
  "tar -xOzf": { status: 0, stdout: DEFAULT_MANIFEST, stderr: "" },
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

let _logSpy: ReturnType<typeof vi.spyOn>;
let errSpy: ReturnType<typeof vi.spyOn>;
let savedArgv: string[];
let savedExit: typeof process.exitCode;
let savedEnv: NodeJS.ProcessEnv;

beforeEach(() => {
  vi.resetModules();
  vi.clearAllMocks();
  existsSync.mockReturnValue(true);
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

test("normal run publishes pending versions and prepares the release manifest", async () => {
  spawnSync.mockImplementation(router());
  process.argv = ["node", MODULE_PATH];

  await import("./publish-npm.ts");
  await vi.waitFor(() =>
    expect(errSpy.mock.calls.some((c: unknown[]) => String(c[0]).includes("done:"))).toBe(true),
  );

  const spawned = spawnSync.mock.calls.map((c) =>
    `${String(c[0])} ${(c[1] as string[])[0]} ${(c[1] as string[])[1] ?? ""}`.trim(),
  );
  expect(spawned).toContain(`npm publish ${DEFAULT_TARBALL}`);
  // Script no longer creates GH releases directly; that happens in the workflow after attestation.
  expect(spawned.some((s) => s.startsWith("gh release create"))).toBe(false);
  // Release notes and manifest written so the workflow can create releases with all assets.
  expect(writeFileSync).toHaveBeenCalled();
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

test("--releases-only skips publishing and prepares manifest for versions already on npm", async () => {
  // Everything already on npm → nothing to publish; manifest prepared for the skipped set.
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
  // Script writes manifest; workflow creates the actual GH releases.
  expect(spawned.some((s) => s.startsWith("gh release create"))).toBe(false);
  expect(writeFileSync).toHaveBeenCalled();
});

test("existing releases are skipped (versionReleased guard is idempotent)", async () => {
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

  // All releases already exist → nothing prepared → no manifest written.
  const manifestWritten = writeFileSync.mock.calls.some((c: unknown[]) =>
    String(c[0]).includes("pantoken-releases.json"),
  );
  expect(manifestWritten).toBe(false);
  expect(process.exitCode).toBeUndefined();
});

test("prepareRelease packs via pnpm and writes a manifest entry when pnpm pack succeeds", async () => {
  spawnSync.mockImplementation(router());
  process.argv = ["node", MODULE_PATH];

  await import("./publish-npm.ts");
  await vi.waitFor(() =>
    expect(errSpy.mock.calls.some((c: unknown[]) => String(c[0]).includes("done:"))).toBe(true),
  );

  const spawned = spawnSync.mock.calls.map((c) =>
    `${String(c[0])} ${(c[1] as string[])[0]}`.trim(),
  );
  expect(spawned).toContain("pnpm pack");
  // writeReleaseManifest writes the JSON manifest (not appendFileSync/tags file)
  const manifestCall = writeFileSync.mock.calls.find((c: unknown[]) =>
    String(c[0]).includes("pantoken-releases.json"),
  );
  expect(manifestCall).toBeDefined();
  expect(errSpy.mock.calls.some((c: unknown[]) => String(c[0]).includes("pack failed for"))).toBe(
    false,
  );
});

test("pnpmPackToDir tolerates extra progress lines before the tarball path", async () => {
  spawnSync.mockImplementation(
    router({ "pnpm pack": { status: 0, stdout: `Packing...\n${DEFAULT_TARBALL}\n`, stderr: "" } }),
  );
  process.argv = ["node", MODULE_PATH];

  await import("./publish-npm.ts");
  await vi.waitFor(() =>
    expect(errSpy.mock.calls.some((c: unknown[]) => String(c[0]).includes("done:"))).toBe(true),
  );

  expect(errSpy.mock.calls.some((c: unknown[]) => String(c[0]).includes("pack failed for"))).toBe(
    false,
  );
});

test("pnpmPackToDir returns null when pnpm pack exits non-zero", async () => {
  spawnSync.mockImplementation(
    router({ "pnpm pack": { status: 1, stdout: "", stderr: "pack-failed" } }),
  );
  process.argv = ["node", MODULE_PATH];

  await import("./publish-npm.ts");
  await vi.waitFor(() => expect(process.exitCode).toBe(1));

  expect(errSpy.mock.calls.some((c: unknown[]) => String(c[0]).includes("pnpm pack failed"))).toBe(
    true,
  );
  expect(errSpy.mock.calls.some((c: unknown[]) => String(c[0]).includes("failed to publish"))).toBe(
    true,
  );
});

test("pnpmPackToDir returns null when the reported tarball path doesn't exist", async () => {
  existsSync.mockReturnValue(false);
  spawnSync.mockImplementation(router());
  process.argv = ["node", MODULE_PATH];

  await import("./publish-npm.ts");
  await vi.waitFor(() => expect(process.exitCode).toBe(1));

  expect(
    errSpy.mock.calls.some((c: unknown[]) =>
      String(c[0]).includes("did not report a tarball path"),
    ),
  ).toBe(true);
  expect(errSpy.mock.calls.some((c: unknown[]) => String(c[0]).includes("failed to publish"))).toBe(
    true,
  );
});

test("publish aborts when the packed tarball still has an unresolved workspace: dependency", async () => {
  const brokenManifest = JSON.stringify({ dependencies: { "@pantoken/utils": "workspace:*" } });
  spawnSync.mockImplementation(
    router({ "tar -xOzf": { status: 0, stdout: brokenManifest, stderr: "" } }),
  );
  process.argv = ["node", MODULE_PATH];

  await import("./publish-npm.ts");
  await vi.waitFor(() => expect(process.exitCode).toBe(1));

  const spawned = spawnSync.mock.calls.map((c) => `${String(c[0])} ${(c[1] as string[])[0]}`);
  expect(spawned).not.toContain("npm publish"); // guard must run before the registry call
  expect(
    errSpy.mock.calls.some((c: unknown[]) =>
      String(c[0]).includes("unresolved pnpm-protocol deps"),
    ),
  ).toBe(true);
});

test("publish aborts when the packed tarball still has an unresolved catalog: dependency", async () => {
  const brokenManifest = JSON.stringify({ dependencies: { postcss: "catalog:" } });
  spawnSync.mockImplementation(
    router({ "tar -xOzf": { status: 0, stdout: brokenManifest, stderr: "" } }),
  );
  process.argv = ["node", MODULE_PATH];

  await import("./publish-npm.ts");
  await vi.waitFor(() => expect(process.exitCode).toBe(1));

  const spawned = spawnSync.mock.calls.map((c) => `${String(c[0])} ${(c[1] as string[])[0]}`);
  expect(spawned).not.toContain("npm publish");
  expect(
    errSpy.mock.calls.some((c: unknown[]) =>
      String(c[0]).includes("unresolved pnpm-protocol deps"),
    ),
  ).toBe(true);
});

test("prepareRelease writes manifest JSON containing the tarball path", async () => {
  spawnSync.mockImplementation(router());
  process.argv = ["node", MODULE_PATH];

  await import("./publish-npm.ts");
  await vi.waitFor(() =>
    expect(errSpy.mock.calls.some((c: unknown[]) => String(c[0]).includes("done:"))).toBe(true),
  );

  const manifestCall = writeFileSync.mock.calls.find((c: unknown[]) =>
    String(c[0]).includes("pantoken-releases.json"),
  );
  expect(manifestCall).toBeDefined();
  const manifest = JSON.parse(String(manifestCall![1])) as { tarball: string }[];
  expect(manifest.length).toBeGreaterThan(0);
  expect(manifest[0].tarball).toContain("pantoken-css-0.2.0.tgz");
  // No upload errors logged (upload no longer happens in the script)
  expect(
    errSpy.mock.calls.some((c: unknown[]) => String(c[0]).includes("tarball upload failed")),
  ).toBe(false);
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

  // Notes fell back to "Release <tag>." — release manifest still prepared
  const manifestWritten = writeFileSync.mock.calls.some((c: unknown[]) =>
    String(c[0]).includes("pantoken-releases.json"),
  );
  expect(manifestWritten).toBe(true);
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
