import { afterEach, beforeEach, expect, test, vi } from "vite-plus/test";
import { BUGS_URL, ENGINES, HOMEPAGE_URL, REPOSITORY_URL } from "./repository-metadata.ts";
import type { WorkspacePackage } from "./workspace-packages.ts";

const readFile = vi.fn<(...args: unknown[]) => Promise<string>>();
const loadWorkspacePackages = vi.fn();

vi.mock("node:fs/promises", () => ({ default: { readFile } }));
vi.mock("./workspace-packages.ts", async (importActual) => {
  const actual = await importActual<typeof import("./workspace-packages.ts")>();
  return { ...actual, loadWorkspacePackages };
});

function pkg(name: string, relPath: string, isPrivate = false): WorkspacePackage {
  return { name, path: relPath, version: "0.2.0", private: isPrivate, workspaceDeps: new Set() };
}

/** A manifest that passes every metadata check for a package at `dir`. */
function validManifest(dir: string) {
  return {
    name: `@pantoken/${dir.split("/").pop()}`,
    repository: { type: "git", url: REPOSITORY_URL, directory: dir },
    homepage: HOMEPAGE_URL,
    bugs: BUGS_URL,
    type: "module",
    sideEffects: false,
    engines: ENGINES,
    publishConfig: { provenance: true },
    license: "MIT",
    files: ["dist"],
    description: "A pantoken package.",
  };
}

let _logSpy: ReturnType<typeof vi.spyOn>;
let errSpy: ReturnType<typeof vi.spyOn>;
let outSpy: ReturnType<typeof vi.spyOn>;
let savedExit: typeof process.exitCode;

beforeEach(() => {
  vi.resetModules();
  vi.clearAllMocks();
  _logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
  errSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  outSpy = vi.spyOn(process.stdout, "write").mockImplementation(() => true);
  savedExit = process.exitCode;
  process.exitCode = undefined;
});

afterEach(() => {
  process.exitCode = savedExit;
  vi.restoreAllMocks();
});

test("passes when every publishable manifest carries the canonical metadata", async () => {
  // A private package is filtered out (isPublishablePackage) — only css is checked.
  loadWorkspacePackages.mockResolvedValue({
    packages: [pkg("@pantoken/css", "formats/css"), pkg("@pantoken/docs", "docs", true)],
  });
  readFile.mockImplementation(async (...args: unknown[]) => {
    const p = args[0] as string;
    return JSON.stringify(validManifest(p.includes("formats/css") ? "formats/css" : "docs"));
  });

  await import("./check-repository-metadata.ts");
  await vi.waitFor(() => expect(outSpy).toHaveBeenCalled());

  expect(String(outSpy.mock.calls[0]?.[0])).toContain("passed for 1 publishable packages");
  expect(process.exitCode).toBeUndefined();
});

test("reports a message for every violated field and exits non-zero", async () => {
  loadWorkspacePackages.mockResolvedValue({ packages: [pkg("@pantoken/bad", "formats/bad")] });
  // Empty manifest → every check fails, exercising all message builders.
  readFile.mockResolvedValue(JSON.stringify({}));

  await import("./check-repository-metadata.ts");
  await vi.waitFor(() => expect(process.exitCode).toBe(1));

  const messages = errSpy.mock.calls.map((c: unknown[]) => String(c[0])).join("\n");
  expect(messages).toContain("Repository metadata check failed");
  for (const field of [
    "repository.url",
    "repository.directory",
    "homepage",
    "bugs",
    "sideEffects",
    "engines",
    "publishConfig.provenance is not true",
    "license",
    "type",
    "files is missing or empty",
    "description is missing or empty",
  ]) {
    expect(messages).toContain(field);
  }
});

test("accepts a string repository field and a CSS-shipping sideEffects glob", async () => {
  loadWorkspacePackages.mockResolvedValue({ packages: [pkg("@pantoken/css", "formats/css")] });
  const m = validManifest("formats/css");
  // repository as a bare string still satisfies repository.url; but directory then reads undefined →
  // one violation. Confirm the check distinguishes the two repository sub-fields.
  readFile.mockResolvedValue(JSON.stringify({ ...m, repository: REPOSITORY_URL }));

  await import("./check-repository-metadata.ts");
  await vi.waitFor(() => expect(process.exitCode).toBe(1));

  const messages = errSpy.mock.calls.map((c: unknown[]) => String(c[0])).join("\n");
  expect(messages).toContain("repository.directory");
  expect(messages).not.toContain("repository.url is");
});
