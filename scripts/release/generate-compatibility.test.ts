import { afterEach, beforeEach, expect, test, vi } from "vite-plus/test";
import type { Compatibility } from "./compatibility.ts";

const writeFile = vi.fn<(...args: unknown[]) => Promise<void>>();
const buildCompatibility = vi.fn<() => Promise<Compatibility>>();

vi.mock("node:fs/promises", () => ({ default: { writeFile } }));
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
let savedExit: typeof process.exitCode;

beforeEach(() => {
  vi.resetModules();
  vi.clearAllMocks();
  buildCompatibility.mockResolvedValue(SAMPLE);
  writeFile.mockResolvedValue();
  logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
  savedExit = process.exitCode;
  process.exitCode = undefined;
});

afterEach(() => {
  process.exitCode = savedExit;
  vi.restoreAllMocks();
});

test("writes compatibility.json and docs/compatibility.md, then reports the counts", async () => {
  await import("./generate-compatibility.ts");
  await vi.waitFor(() => expect(writeFile).toHaveBeenCalledTimes(2));

  const targets = writeFile.mock.calls.map((c) => String(c[0]));
  expect(targets.some((t) => t.endsWith("compatibility.json"))).toBe(true);
  expect(targets.some((t) => t.endsWith("docs/compatibility.md"))).toBe(true);

  // JSON is pretty-printed with a trailing newline; the markdown is the rendered manifest.
  const json = writeFile.mock.calls.find((c) => String(c[0]).endsWith(".json"))?.[1] as string;
  expect(json.endsWith("\n")).toBe(true);
  expect(JSON.parse(json)).toEqual(SAMPLE);
  const md = writeFile.mock.calls.find((c) => String(c[0]).endsWith(".md"))?.[1] as string;
  expect(md).toContain("# Compatibility");

  expect(String(logSpy.mock.calls[0]?.[0])).toContain("1 upstream sources, 1 consumers");
});

test("surfaces a build failure as a non-zero exit code", async () => {
  buildCompatibility.mockRejectedValue(new Error("catalog read failed"));
  const errSpy = vi.spyOn(console, "error").mockImplementation(() => {});

  await import("./generate-compatibility.ts");
  await vi.waitFor(() => expect(process.exitCode).toBe(1));

  expect(errSpy.mock.calls.some((c) => String(c[0]).includes("catalog read failed"))).toBe(true);
  expect(writeFile).not.toHaveBeenCalled();
});
