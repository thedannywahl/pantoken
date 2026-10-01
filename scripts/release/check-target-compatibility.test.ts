import { afterEach, beforeEach, expect, test, vi } from "vite-plus/test";

interface AdapterFixture {
  directory: string;
  packageName: string;
  checkCompatibility?: boolean;
  checkRuntime?: boolean;
  source?: string;
}

const readFile = vi.fn<(file: string) => Promise<string>>();
const readdir = vi.fn<(directory: string) => Promise<unknown[]>>();
const stat = vi.fn<(file: string) => Promise<unknown>>();

vi.mock("node:fs/promises", () => ({ default: { readFile, readdir, stat } }));

let fixtures: AdapterFixture[];
let registry: Record<string, { status: string }>;
let logSpy: ReturnType<typeof vi.spyOn>;
let errorSpy: ReturnType<typeof vi.spyOn>;
let savedExitCode: typeof process.exitCode;

beforeEach(() => {
  vi.resetModules();
  vi.clearAllMocks();
  fixtures = [];
  registry = {};
  readdir.mockImplementation(async (directory) =>
    directory.endsWith("/bundlers")
      ? fixtures.map((fixture) => ({ name: fixture.directory, isDirectory: () => true }))
      : [],
  );
  readFile.mockImplementation(async (file) => {
    if (file.endsWith("target-compatibility.json")) return JSON.stringify(registry);
    const fixture = fixtures.find((entry) => file.includes(`/bundlers/${entry.directory}/`));
    if (file.endsWith("package.json") && fixture) {
      return JSON.stringify({ name: fixture.packageName });
    }
    if (file.endsWith("check-compatibility.ts") && fixture) return fixture.source ?? "";
    if (file.endsWith("check-runtime.ts") && fixture) return fixture.source ?? "";
    throw new Error(`Unexpected read: ${file}`);
  });
  stat.mockImplementation(async (file) => {
    const fixture = fixtures.find((entry) => file.includes(`/bundlers/${entry.directory}/`));
    if (file.endsWith("/check-compatibility.ts") && fixture?.checkCompatibility) return {};
    if (file.endsWith("/check-runtime.ts") && fixture?.checkRuntime) return {};
    throw new Error(`ENOENT: ${file}`);
  });
  logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
  errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  savedExitCode = process.exitCode;
  process.exitCode = undefined;
});

afterEach(() => {
  process.exitCode = savedExitCode;
  vi.restoreAllMocks();
});

test("accepts verified adapter checks and the runtime-check fallback", async () => {
  fixtures = [
    {
      directory: "check-script",
      packageName: "@pantoken/check-script",
      checkCompatibility: true,
      source: "commandTargetVersions()",
    },
    {
      directory: "runtime-script",
      packageName: "@pantoken/runtime-script",
      checkRuntime: true,
      source: "targetEnvironments()",
    },
    { directory: "no-script", packageName: "@pantoken/no-script" },
  ];
  registry = {
    "@pantoken/check-script": { status: "verified" },
    "@pantoken/runtime-script": { status: "environment-verified" },
  };

  await import("./check-target-compatibility.ts");
  await vi.waitFor(() => expect(logSpy).toHaveBeenCalled());

  expect(String(logSpy.mock.calls[0]?.[0])).toContain("every adapter check is connected");
  expect(process.exitCode).toBeUndefined();
});

test("reports missing, unverified, and disconnected target records", async () => {
  fixtures = [
    {
      directory: "missing-record",
      packageName: "@pantoken/missing-record",
      checkCompatibility: true,
      source: "commandTargetVersions()",
    },
    {
      directory: "unverified",
      packageName: "@pantoken/unverified",
      checkCompatibility: true,
      source: "commandTargetVersions()",
    },
    {
      directory: "disconnected",
      packageName: "@pantoken/disconnected",
      checkCompatibility: true,
      source: "export {};",
    },
  ];
  registry = {
    "@pantoken/unverified": { status: "unverified" },
    "@pantoken/disconnected": { status: "verified" },
  };

  await import("./check-target-compatibility.ts");
  await vi.waitFor(() => expect(errorSpy).toHaveBeenCalled());

  const errors = errorSpy.mock.calls.map((call: unknown[]) => String(call[0])).join("\n");
  expect(errors).toContain("compatibility script has no target registry record");
  expect(errors).toContain("compatibility script exists but target is unverified");
  expect(errors).toContain("does not read target-compatibility");
  expect(process.exitCode).toBe(1);
});
