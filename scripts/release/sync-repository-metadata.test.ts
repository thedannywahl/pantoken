import { afterEach, beforeEach, expect, test, vi } from "vite-plus/test";
import { BUGS_URL, ENGINES, HOMEPAGE_URL, REPOSITORY_URL } from "./repository-metadata.ts";
import type { WorkspacePackage } from "./workspace-packages.ts";

const readFile = vi.fn<(...args: unknown[]) => Promise<string>>();
const writeFile = vi.fn<(...args: unknown[]) => Promise<void>>();
const loadWorkspacePackages = vi.fn();

vi.mock("node:fs/promises", () => ({ default: { readFile, writeFile } }));
vi.mock("./workspace-packages.ts", async (importActual) => {
  const actual = await importActual<typeof import("./workspace-packages.ts")>();
  return { ...actual, loadWorkspacePackages };
});

function pkg(name: string, relPath: string, isPrivate = false): WorkspacePackage {
  return { name, path: relPath, version: "0.2.0", private: isPrivate, workspaceDeps: new Set() };
}

/** The exact serialized form syncPackage produces, so a re-sync is a no-op (already current). */
function alreadySynced(dir: string): string {
  const obj = {
    name: `@pantoken/${dir.split("/").pop()}`,
    repository: { type: "git", url: REPOSITORY_URL, directory: dir },
    homepage: HOMEPAGE_URL,
    bugs: BUGS_URL,
    type: "module",
    sideEffects: false,
    engines: { ...ENGINES },
    publishConfig: { provenance: true },
    license: "MIT",
    files: ["dist"],
    description: "x",
  };
  return `${JSON.stringify(obj, null, 2)}\n`;
}

let outSpy: ReturnType<typeof vi.spyOn>;
let savedExit: typeof process.exitCode;

beforeEach(() => {
  vi.resetModules();
  vi.clearAllMocks();
  outSpy = vi.spyOn(process.stdout, "write").mockImplementation(() => true);
  vi.spyOn(console, "error").mockImplementation(() => {});
  savedExit = process.exitCode;
  process.exitCode = undefined;
});

afterEach(() => {
  process.exitCode = savedExit;
  vi.restoreAllMocks();
});

test("rewrites a manifest missing the managed fields and reorders the keys", async () => {
  loadWorkspacePackages.mockResolvedValue({ packages: [pkg("@pantoken/css", "formats/css")] });
  // A bare manifest with the managed keys absent or out of place.
  readFile.mockResolvedValue(
    JSON.stringify({ name: "@pantoken/css", type: "module", license: "MIT", files: ["dist"] }),
  );

  await import("./sync-repository-metadata.ts");
  await vi.waitFor(() => expect(writeFile).toHaveBeenCalled());

  const written = String((writeFile.mock.calls[0] as unknown[])[1]);
  const parsed = JSON.parse(written);
  expect(parsed.repository).toEqual({ type: "git", url: REPOSITORY_URL, directory: "formats/css" });
  expect(parsed.homepage).toBe(HOMEPAGE_URL);
  expect(parsed.publishConfig).toEqual({ provenance: true });
  // homepage/bugs land right after repository; sideEffects/engines right after type.
  const keys = Object.keys(parsed);
  expect(keys.indexOf("homepage")).toBe(keys.indexOf("repository") + 1);
  expect(keys.indexOf("sideEffects")).toBe(keys.indexOf("type") + 1);

  const summary = outSpy.mock.calls.map((c: unknown[]) => String(c[0])).join("");
  expect(summary).toContain("1 changed");
});

test("leaves an already-synced manifest untouched (no write)", async () => {
  loadWorkspacePackages.mockResolvedValue({ packages: [pkg("@pantoken/css", "formats/css")] });
  readFile.mockResolvedValue(alreadySynced("formats/css"));

  await import("./sync-repository-metadata.ts");
  await vi.waitFor(() =>
    expect(outSpy.mock.calls.some((c: unknown[]) => String(c[0]).includes("already current"))).toBe(
      true,
    ),
  );

  expect(writeFile).not.toHaveBeenCalled();
  const summary = outSpy.mock.calls.map((c: unknown[]) => String(c[0])).join("");
  expect(summary).toContain("0 changed, 1 already current");
});

test("preserves a CSS-shipping package's sideEffects glob", async () => {
  loadWorkspacePackages.mockResolvedValue({ packages: [pkg("@pantoken/css", "formats/css")] });
  readFile.mockResolvedValue(
    JSON.stringify({ name: "@pantoken/css", type: "module", exports: { "./x.css": "./x.css" } }),
  );

  await import("./sync-repository-metadata.ts");
  await vi.waitFor(() => expect(writeFile).toHaveBeenCalled());

  const parsed = JSON.parse(String((writeFile.mock.calls[0] as unknown[])[1]));
  expect(parsed.sideEffects).toEqual(["**/*.css"]);
});
