import { afterEach, beforeEach, expect, test, vi } from "vite-plus/test";
import type { Compatibility } from "./compatibility.ts";

const readFile = vi.fn<(...args: unknown[]) => Promise<string>>();
const buildCompatibility = vi.fn<() => Promise<Compatibility>>();

vi.mock("node:fs/promises", () => ({ default: { readFile } }));
vi.mock("./compatibility.ts", async (importActual) => {
  const actual = await importActual<typeof import("./compatibility.ts")>();
  return { ...actual, buildCompatibility };
});

const SAMPLE: Compatibility = {
  upstream: {
    "@instructure/instructure-design-tokens": {
      range: "github:...#v1",
      resolved: "v1@abc",
      feeds: "token-ir",
    },
  },
  consumers: [{ package: "@pantoken/css", path: "formats/css", governedBy: "token-ir" }],
  deprecations: [],
};

let logSpy: ReturnType<typeof vi.spyOn>;
let errorSpy: ReturnType<typeof vi.spyOn>;
let savedExitCode: typeof process.exitCode;

beforeEach(() => {
  vi.resetModules();
  vi.clearAllMocks();
  buildCompatibility.mockResolvedValue(SAMPLE);
  logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
  errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  savedExitCode = process.exitCode;
  process.exitCode = undefined;
});

afterEach(() => {
  process.exitCode = savedExitCode;
  vi.restoreAllMocks();
});

test("passes when the committed manifest matches (key order/whitespace ignored)", async () => {
  // Reversed key order + extra whitespace — the canonical comparison must ignore both.
  readFile.mockResolvedValue(
    JSON.stringify({
      deprecations: SAMPLE.deprecations,
      consumers: SAMPLE.consumers,
      upstream: SAMPLE.upstream,
    }),
  );

  await import("./check-compatibility.ts");
  await vi.waitFor(() => expect(logSpy).toHaveBeenCalled());

  expect(String(logSpy.mock.calls[0]?.[0])).toContain("manifest matches");
  expect(process.exitCode).toBeUndefined();
});

test("fails when the committed manifest is stale", async () => {
  readFile.mockResolvedValue(JSON.stringify({ ...SAMPLE, consumers: [] }));

  await import("./check-compatibility.ts");
  await vi.waitFor(() => expect(errorSpy).toHaveBeenCalled());

  expect(errorSpy.mock.calls.some((c: unknown[]) => String(c[0]).includes("stale"))).toBe(true);
  expect(process.exitCode).toBe(1);
});

test("fails when compatibility.json is missing or unparseable", async () => {
  readFile.mockRejectedValue(new Error("ENOENT"));

  await import("./check-compatibility.ts");
  await vi.waitFor(() => expect(errorSpy).toHaveBeenCalled());

  expect(
    errorSpy.mock.calls.some((c: unknown[]) => String(c[0]).includes("missing or unparseable")),
  ).toBe(true);
  expect(process.exitCode).toBe(1);
});
