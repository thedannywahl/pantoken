import { beforeEach, expect, test, vi } from "vite-plus/test";
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import type { Application, RendererEvent } from "typedoc";
import { injectLiveExamples, load } from "../src/index.ts";

vi.mock("node:fs", () => ({
  readdirSync: vi.fn(),
  readFileSync: vi.fn(),
  writeFileSync: vi.fn(),
}));
const readdirMock = readdirSync as unknown as ReturnType<typeof vi.fn>;
const readMock = readFileSync as unknown as ReturnType<typeof vi.fn>;
const writeMock = writeFileSync as unknown as ReturnType<typeof vi.fn>;

/** Create a minimal mock Dirent with a name and isDirectory predicate. */
const dirent = (name: string, isDir = false) => ({ name, isDirectory: () => isDir });

beforeEach(() => {
  vi.clearAllMocks();
});

test("injectLiveExamples recurses directories and rewrites only changed .md files", () => {
  // /root: one subdirectory + one non-md file; /root/sub: an md with a fence + an md without one.
  readdirMock.mockImplementation((path: string) => {
    if (path === "/root") return [dirent("sub", true), dirent("notes.txt")];
    if (path === "/root/sub") return [dirent("with-fence.md"), dirent("plain.md")];
    return [];
  });
  readMock.mockImplementation((path: string) => {
    if (String(path).endsWith("with-fence.md")) return '```html\n<span class="x">1</span>\n```';
    return "# just prose, no fence";
  });

  const changed = injectLiveExamples("/root");

  // Only the file that actually gained a preview is written.
  expect(changed).toBe(1);
  expect(writeMock).toHaveBeenCalledTimes(1);
  const [path, content] = writeMock.mock.calls[0];
  expect(String(path).endsWith("with-fence.md")).toBe(true);
  expect(content).toContain('<div class="css-example">');
});

test("injectLiveExamples applies a custom wrap option", () => {
  readdirMock.mockReturnValue([dirent("a.md")]);
  readMock.mockReturnValue("```html\n<b>hi</b>\n```");

  const changed = injectLiveExamples("/root", { wrap: (html) => `<card>${html}</card>` });

  expect(changed).toBe(1);
  expect(writeMock.mock.calls[0][1]).toContain("<card><b>hi</b></card>");
});

/** A fake TypeDoc app that records declarations + the render-end handler. */
function fakeApp(values: Record<string, unknown>) {
  const declarations: { name: string }[] = [];
  const renderer: ((event: RendererEvent) => void)[] = [];
  const app = {
    options: {
      addDeclaration: (d: { name: string }) => declarations.push(d),
      getValue: (name: string) => values[name],
    },
    renderer: { on: (_event: unknown, cb: (event: RendererEvent) => void) => renderer.push(cb) },
  } as unknown as Application;
  return { app, declarations, renderer };
}

test("load registers both option declarations and a render-end handler", () => {
  const { app, declarations, renderer } = fakeApp({
    liveExampleDir: "css",
    liveExampleWrapper: "",
  });
  load(app);
  expect(declarations.map((d) => d.name)).toEqual(["liveExampleDir", "liveExampleWrapper"]);
  expect(renderer).toHaveLength(1);
});

test("render-end injects previews into the configured subdirectory (default wrapper)", () => {
  const { app, renderer } = fakeApp({ liveExampleDir: "css", liveExampleWrapper: "" });
  load(app);

  readdirMock.mockReturnValue([dirent("badge.md")]);
  readMock.mockReturnValue('```html\n<span class="instui-badge">4</span>\n```');

  renderer[0]({ outputDirectory: "/out" } as RendererEvent);

  expect(String(readdirMock.mock.calls[0][0]).endsWith("/out/css")).toBe(true);
  expect(writeMock.mock.calls[0][1]).toContain('<div class="css-example">');
});

test("render-end honors a %s wrapper template", () => {
  const { app, renderer } = fakeApp({ liveExampleDir: "css", liveExampleWrapper: "<box>%s</box>" });
  load(app);

  readdirMock.mockReturnValue([dirent("a.md")]);
  readMock.mockReturnValue("```html\n<i>x</i>\n```");

  renderer[0]({ outputDirectory: "/out" } as RendererEvent);

  expect(writeMock.mock.calls[0][1]).toContain("<box><i>x</i></box>");
});

test("render-end swallows errors when the pages directory is absent", () => {
  const { app, renderer } = fakeApp({ liveExampleDir: "css", liveExampleWrapper: "" });
  load(app);

  readdirMock.mockImplementation(() => {
    throw new Error("ENOENT");
  });

  // The thrown readdir is caught inside load's handler — no rethrow.
  expect(() => renderer[0]({ outputDirectory: "/out" } as RendererEvent)).not.toThrow();
  expect(writeMock).not.toHaveBeenCalled();
});
