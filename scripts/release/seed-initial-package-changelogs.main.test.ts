import { afterEach, beforeEach, expect, test, vi } from "vite-plus/test";
import type { WorkspacePackage } from "./workspace-packages.ts";

const access = vi.fn<(...args: unknown[]) => Promise<void>>();
const readFile = vi.fn<(...args: unknown[]) => Promise<string>>();
const writeFile = vi.fn<(...args: unknown[]) => Promise<void>>();
const loadWorkspacePackages = vi.fn();

vi.mock("node:fs/promises", () => ({ default: { access, readFile, writeFile } }));
vi.mock("./workspace-packages.ts", async (importActual) => {
  const actual = await importActual<typeof import("./workspace-packages.ts")>();
  return { ...actual, loadWorkspacePackages };
});

const MODULE_PATH = new URL("./seed-initial-package-changelogs.ts", import.meta.url).pathname;

function pkg(
  name: string,
  relPath: string,
  version = "0.1.0",
  isPrivate = false,
): WorkspacePackage {
  return { name, path: relPath, version, private: isPrivate, workspaceDeps: new Set() };
}

let outSpy: ReturnType<typeof vi.spyOn>;
let savedArgv: string[];
let savedExit: typeof process.exitCode;

beforeEach(() => {
  vi.resetModules();
  vi.clearAllMocks();
  writeFile.mockResolvedValue();
  outSpy = vi.spyOn(process.stdout, "write").mockImplementation(() => true);
  vi.spyOn(console, "error").mockImplementation(() => {});
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

/** The path a package's CHANGELOG resolves to (rootDir is "/ws"). */
const clog = (relPath: string) => `/ws/${relPath}/CHANGELOG.md`;

test("seeds missing, prepends existing, and skips already-seeded changelogs", async () => {
  loadWorkspacePackages.mockResolvedValue({
    rootDir: "/ws",
    packages: [
      pkg("@pantoken/missing", "formats/missing"), // no CHANGELOG → write initial
      pkg("@pantoken/has-section", "formats/has-section"), // already has 0.1.0 → skip
      pkg("@pantoken/has-header", "formats/has-header"), // "# CHANGELOG" but no 0.1.0 → replace
      pkg("@pantoken/no-header", "formats/no-header"), // arbitrary content → prepend
      pkg("@pantoken/ignored", "formats/ignored", "1.0.0"), // public, not 0.1.0 → not a candidate
    ],
  });

  access.mockImplementation(async (...args: unknown[]) => {
    const p = args[0] as string;
    if (p === clog("formats/missing")) throw new Error("ENOENT");
    // Every other changelog exists.
  });
  readFile.mockImplementation(async (...args: unknown[]) => {
    const p = args[0] as string;
    if (p === clog("formats/has-section")) return "# CHANGELOG\n\n## 0.1.0\n\n- old\n";
    if (p === clog("formats/has-header")) return "# CHANGELOG\n\n## 0.2.0\n\n- later\n";
    if (p === clog("formats/no-header")) return "Some notes without a canonical header.\n";
    return "";
  });

  await import("./seed-initial-package-changelogs.ts");
  await vi.waitFor(() =>
    expect(outSpy.mock.calls.some((c: unknown[]) => String(c[0]).startsWith("Seeded"))).toBe(true),
  );

  const written = new Map(writeFile.mock.calls.map((c) => [String(c[0]), String(c[1])]));
  // Missing → brand-new initial changelog.
  expect(written.get(clog("formats/missing"))).toContain("- Initial release of @pantoken/missing.");
  // Header present → the 0.1.0 section is spliced in right after the title, keeping later sections.
  const header = written.get(clog("formats/has-header")) ?? "";
  expect(header).toContain("## 0.1.0");
  expect(header).toContain("## 0.2.0");
  // No canonical header → the whole initial changelog is prepended.
  expect(written.get(clog("formats/no-header"))).toMatch(/^# CHANGELOG[\s\S]*Some notes without/);
  // Already-seeded and non-candidate packages are never written.
  expect(written.has(clog("formats/has-section"))).toBe(false);
  expect(written.has(clog("formats/ignored"))).toBe(false);

  const summary = outSpy.mock.calls.map((c: unknown[]) => String(c[0])).join("");
  expect(summary).toContain("Seeded 3 package changelogs.");
  expect(summary).toContain("Skipped 1 packages.");
});

test("reports zero when nothing needs seeding", async () => {
  loadWorkspacePackages.mockResolvedValue({
    rootDir: "/ws",
    packages: [pkg("@pantoken/done", "formats/done")],
  });
  access.mockResolvedValue();
  readFile.mockResolvedValue("# CHANGELOG\n\n## 0.1.0\n\n- shipped\n");

  await import("./seed-initial-package-changelogs.ts");
  await vi.waitFor(() =>
    expect(outSpy.mock.calls.some((c: unknown[]) => String(c[0]).includes("Seeded 0"))).toBe(true),
  );

  expect(writeFile).not.toHaveBeenCalled();
});
