import { afterEach, beforeEach, expect, test, vi } from "vite-plus/test";

const writeFileSync = vi.fn();
const mkdirSync = vi.fn();

vi.mock("node:fs", () => ({ mkdirSync, writeFileSync }));

const MODULE_PATH = new URL("./generate.ts", import.meta.url).pathname;

beforeEach(async () => {
  vi.resetModules();
  vi.clearAllMocks();
  vi.spyOn(console, "log").mockImplementation(() => {});
  await import(MODULE_PATH);
});

afterEach(() => {
  vi.restoreAllMocks();
});

const written = (suffix: string): string => {
  const call = writeFileSync.mock.calls.find(([p]) => String(p).endsWith(suffix));
  return call ? String(call[1]) : "";
};

test("writes style.css with @property registrations flattened to :root declarations", () => {
  const content = written("style.css");
  expect(content.length).toBeGreaterThan(0);
  expect(content).not.toContain("@property --instui-");
  expect(content).toContain(":root");
});

test("writes style.lean.css with @property registrations flattened", () => {
  const content = written("style.lean.css");
  expect(content.length).toBeGreaterThan(0);
  expect(content).not.toContain("@property --instui-");
});
