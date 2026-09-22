import { basename, dirname } from "node:path";
import { beforeEach, expect, test, vi } from "vite-plus/test";

const mkdirSync = vi.fn();
const writeFileSync = vi.fn();

vi.mock("node:fs", async (importOriginal) => {
  const actual = await importOriginal<typeof import("node:fs")>();
  return { ...actual, mkdirSync, writeFileSync };
});

const MODULE_PATH = new URL("./generate.ts", import.meta.url).pathname;

beforeEach(async () => {
  vi.resetModules();
  vi.clearAllMocks();
  vi.spyOn(console, "log").mockImplementation(() => {});
  await import(MODULE_PATH);
});

const writes = (): Array<{ dir: string; file: string; css: string }> =>
  writeFileSync.mock.calls.map(([path, css]) => ({
    dir: basename(dirname(String(path))),
    file: basename(String(path)),
    css: String(css),
  }));

test("writes raw cssdoc layouts for docs and model generation", () => {
  const raw = writes().find((write) => write.dir === "generated" && write.file === "layouts.css");
  expect(raw?.css).toContain("@layout wrapper");
  expect(raw?.css).toContain("@component side-nav-bar");
  expect(raw?.css).toContain(":optional");
});

test("writes runtime-safe layouts for package css exports", () => {
  const runtime = writes().find((write) => write.dir === "runtime" && write.file === "layouts.css");
  expect(runtime?.css).not.toContain("@layout wrapper");
  expect(runtime?.css).not.toContain("@component side-nav-bar");
  expect(runtime?.css).not.toMatch(/:(?:optional|one-or-more)\b/u);
  expect(runtime?.css).toContain('body[class~="instui-display-flex"]');
});

test("writes per-layout runtime-safe css", () => {
  const wrapper = writes().find((write) => write.dir === "runtime" && write.file === "wrapper.css");
  expect(wrapper?.css).not.toContain("@component");

  const rubricNote = writes().find(
    (write) => write.dir === "runtime" && write.file === "rubric-note.css",
  );
  expect(rubricNote?.css).not.toContain(":one-or-more");
});
