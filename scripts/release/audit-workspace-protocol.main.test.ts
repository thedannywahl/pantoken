import { afterEach, beforeEach, expect, test, vi } from "vite-plus/test";
import type { WorkspacePackage } from "./workspace-packages.ts";

interface SpawnResult {
  status: number;
  stdout: string;
  stderr: string;
}

const spawnSync = vi.fn<(...args: unknown[]) => SpawnResult>();
const loadWorkspacePackages = vi.fn();

vi.mock("node:child_process", () => ({ spawnSync }));
vi.mock("./workspace-packages.ts", async (importActual) => {
  const actual = await importActual<typeof import("./workspace-packages.ts")>();
  return { ...actual, loadWorkspacePackages };
});

const MODULE_PATH = new URL("./audit-workspace-protocol.ts", import.meta.url).pathname;

function pkg(name: string, isPrivate = false): WorkspacePackage {
  return {
    name,
    path: `formats/${name.split("/")[1]}`,
    version: "0.2.0",
    private: isPrivate,
    workspaceDeps: new Set(),
  };
}

const CLEAN_MANIFEST = JSON.stringify({ dependencies: { "@pantoken/utils": "^0.2.5" } });
const BROKEN_MANIFEST = JSON.stringify({ dependencies: { "@pantoken/utils": "workspace:*" } });

function routeKey(cmd: string, firstArg: string): string {
  return `${cmd} ${firstArg}`;
}

/** spawnSync router keyed on the command + first subarg; overridable per test. */
function router(overrides: Partial<Record<string, SpawnResult>> = {}) {
  return (...spawnArgs: unknown[]): SpawnResult => {
    const cmd = spawnArgs[0] as string;
    const args = spawnArgs[1] as string[];
    const key = routeKey(cmd, args[0] ?? "");
    return overrides[key] ?? { status: 0, stdout: "", stderr: "" };
  };
}

/**
 * Router for tests needing different behavior for the `npm view <name> versions --json` query vs the
 * per-version `npm view <name>@<version> --json` manifest fetches it drives.
 */
function versionsThenManifestRouter(
  versionsResult: SpawnResult,
  manifestFor: (spec: string) => SpawnResult,
) {
  return (...spawnArgs: unknown[]): SpawnResult => {
    const args = spawnArgs[1] as string[];
    return args.includes("versions") ? versionsResult : manifestFor(args[1] ?? "");
  };
}

let errSpy: ReturnType<typeof vi.spyOn>;
let savedArgv: string[];
let savedExit: typeof process.exitCode;

beforeEach(() => {
  vi.resetModules();
  vi.clearAllMocks();
  loadWorkspacePackages.mockResolvedValue({
    rootDir: "/ws",
    packages: [pkg("@pantoken/css")],
    byName: new Map(),
  });
  errSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  savedArgv = process.argv;
  savedExit = process.exitCode;
  process.exitCode = undefined;
  process.argv = ["node", MODULE_PATH];
});

afterEach(() => {
  process.argv = savedArgv;
  process.exitCode = savedExit;
  vi.restoreAllMocks();
});

test("main: reports no findings and exits cleanly when every version is resolved", async () => {
  spawnSync.mockImplementation(
    router({
      "npm view": { status: 0, stdout: JSON.stringify(["0.2.0"]), stderr: "" },
    }),
  );

  await import("./audit-workspace-protocol.ts");
  await vi.waitFor(() =>
    expect(
      errSpy.mock.calls.some((c: unknown[]) => String(c[0]).includes("No published version")),
    ).toBe(true),
  );

  expect(process.exitCode).toBeUndefined();
});

test("main: reports affected versions and exits non-zero when a workspace: dep is found", async () => {
  spawnSync.mockImplementation(
    versionsThenManifestRouter(
      { status: 0, stdout: JSON.stringify(["0.1.0", "0.2.0"]), stderr: "" },
      (spec) =>
        spec === "@pantoken/css@0.1.0"
          ? { status: 0, stdout: BROKEN_MANIFEST, stderr: "" }
          : { status: 0, stdout: CLEAN_MANIFEST, stderr: "" },
    ),
  );

  await import("./audit-workspace-protocol.ts");
  await vi.waitFor(() => expect(process.exitCode).toBe(1));

  expect(
    errSpy.mock.calls.some((c: unknown[]) => String(c[0]).includes("affected version(s)")),
  ).toBe(true);
  expect(
    errSpy.mock.calls.some((c: unknown[]) =>
      String(c[0]).includes("@pantoken/css@0.1.0: @pantoken/utils@workspace:*"),
    ),
  ).toBe(true);
});

test("main: skips a package with no published versions", async () => {
  spawnSync.mockImplementation(router({ "npm view": { status: 1, stdout: "", stderr: "E404" } }));

  await import("./audit-workspace-protocol.ts");
  await vi.waitFor(() =>
    expect(errSpy.mock.calls.some((c: unknown[]) => String(c[0]).includes("not on npm"))).toBe(
      true,
    ),
  );

  expect(process.exitCode).toBeUndefined();
});

test("main: skips a version whose manifest can't be read", async () => {
  spawnSync.mockImplementation(
    versionsThenManifestRouter(
      { status: 0, stdout: JSON.stringify(["0.2.0"]), stderr: "" },
      () => ({ status: 0, stdout: "not-json", stderr: "" }),
    ),
  );

  await import("./audit-workspace-protocol.ts");
  await vi.waitFor(() =>
    expect(
      errSpy.mock.calls.some((c: unknown[]) => String(c[0]).includes("could not read manifest")),
    ).toBe(true),
  );

  expect(process.exitCode).toBeUndefined();
});
