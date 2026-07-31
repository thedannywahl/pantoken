import { afterEach, beforeEach, expect, test, vi } from "vite-plus/test";

// `build()` is the top-level orchestration: it reads the generated sheets, indexes sheet-local vars,
// and hands everything to `@cssdoc/typedoc`'s `emitCssApi`. Here we stub the filesystem and the three
// `@cssdoc/*` collaborators (kept separate from build-css-api.test.ts, which needs the REAL parser),
// then call `build()` directly so its wiring — readCss, rebuildResolver, makeSourceResolver,
// makeImportSnippet, writeCssIndexBlurb, assertNoUnknownReferences — is exercised end to end.
const readFileSync = vi.fn<(p: string) => string>();
const readdirSync = vi.fn<(p: string) => string[]>();
const writeFileSync = vi.fn<(p: string, data: string) => void>();
const makeResolver = vi.fn<() => (value: string) => string>();
const unknownReferences = vi.fn<(css: string) => string[]>();
interface EmitOpts {
  outSubdir: string;
  label: string;
  groups: string[];
}
const emitCssApi = vi.fn<(opts: EmitOpts) => { entries: unknown[]; sidebarMerged: boolean }>();
const parseCssDocs = vi.fn<() => unknown[]>();

vi.mock("node:fs", () => ({ readFileSync, readdirSync, writeFileSync }));
vi.mock("@cssdoc/typedoc", () => ({ emitCssApi }));
vi.mock("@cssdoc/core", () => ({ parseCssDocs }));
vi.mock("@pantoken/tokens", () => ({
  tokens: [{ name: "--instui-ok", value: "#000", syntax: "<color>", inherits: true }],
}));
vi.mock("@pantoken/utils", () => ({ makeResolver, unknownReferences }));
vi.mock("@cssdoc/config", () => ({
  CssDocConfigFile: { loadForFolder: () => ({ toConfiguration: () => ({}) }) },
}));

let logSpy: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
  vi.resetModules();
  vi.clearAllMocks();
  // Benign CSS for every read: no `var(--instui-*)` so the drift guard finds nothing unknown.
  readFileSync.mockReturnValue(".x { color: red; }");
  readdirSync.mockReturnValue([]); // component source dirs are empty
  emitCssApi.mockReturnValue({ entries: [], sidebarMerged: true });
  parseCssDocs.mockReturnValue([]);
  makeResolver.mockReturnValue((value: string) => value);
  unknownReferences.mockImplementation((css: string) =>
    [...css.matchAll(/var\((--[\w-]+)\)/gu)]
      .map((m) => m[1])
      .filter((name) => name !== "--instui-ok"),
  );
  logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
});

test("build wires the sheets into emitCssApi and writes the index blurb", async () => {
  const { build } = await import("./build-css-api.ts");
  build();

  // The emitter ran once, targeting the css subdir with the expected section groups.
  expect(emitCssApi).toHaveBeenCalledTimes(1);
  const opts = emitCssApi.mock.calls[0][0];
  expect(opts.outSubdir).toBe("css");
  expect(opts.label).toBe("CSS");
  expect(opts.groups).toEqual(["Components", "Utilities", "Rules", "Declarations", "Plugins"]);

  // The index-blurb prepend wrote the index.md back.
  expect(writeFileSync).toHaveBeenCalled();
  expect(logSpy.mock.calls.flat().map(String).join("\n")).toContain("CSS API: wrote");
});

test("build throws when the sheets reference an unknown token", async () => {
  readFileSync.mockReturnValue(".x { color: var(--instui-not-a-real-token-xyz); }");
  const { build } = await import("./build-css-api.ts");
  expect(() => build()).toThrow(/unknown token reference/u);
});
