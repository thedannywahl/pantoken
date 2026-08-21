import { afterEach, beforeEach, expect, test, vi } from "vite-plus/test";
import type { CssDocEntry } from "@cssdoc/core";

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
vi.mock("@pantoken/utils", () => ({ makeResolver, unknownReferences, BESPOKE_SYNTAX: [] }));
vi.mock("@cssdoc/config", () => ({
  CssDocConfigFile: { loadForFolder: () => ({ toConfiguration: () => ({}) }) },
}));

let logSpy: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
  vi.resetModules();
  vi.clearAllMocks();
  // Benign CSS for every read: no `var(--instui-*)` so the drift guard finds nothing unknown.
  // The merged sidebar read/rewrite needs its own branch: everything else is a stylesheet.
  readFileSync.mockImplementation((p: string) =>
    p.endsWith("typedoc-sidebar.json") ? "[]" : ".x { color: red; }",
  );
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
  expect(opts.groups).toEqual([
    "Components",
    "Utilities",
    "Rules",
    "Declarations",
    "Layouts",
    "Plugins",
  ]);

  // The index-blurb prepend wrote the index.md back.
  expect(writeFileSync).toHaveBeenCalled();
  expect(logSpy.mock.calls.flat().map(String).join("\n")).toContain("CSS API: wrote");
});

test("build throws when the sheets reference an unknown token", async () => {
  readFileSync.mockImplementation((p: string) =>
    p.endsWith("typedoc-sidebar.json") ? "[]" : ".x { color: var(--instui-not-a-real-token-xyz); }",
  );
  const { build } = await import("./build-css-api.ts");
  expect(() => build()).toThrow(/unknown token reference/u);
});

test("build re-nests CSS sidebar members under their parent when the sidebar was merged", async () => {
  const mergedSidebar = [
    {
      text: "CSS",
      items: [
        {
          text: "Components",
          items: [
            { text: "breadcrumb", link: "/api/css/breadcrumb.md" },
            { text: "breadcrumb.link", link: "/api/css/breadcrumb.link.md" },
          ],
        },
      ],
    },
  ];
  readFileSync.mockImplementation((p: string) =>
    p.endsWith("typedoc-sidebar.json") ? JSON.stringify(mergedSidebar) : ".x { color: red; }",
  );
  emitCssApi.mockReturnValue({
    entries: [
      { name: "breadcrumb" },
      { name: "breadcrumb.link", memberOf: { component: "breadcrumb", private: false } },
    ],
    sidebarMerged: true,
  });

  const { build } = await import("./build-css-api.ts");
  build();

  const sidebarWrite = writeFileSync.mock.calls.find((call) =>
    String(call[0]).endsWith("typedoc-sidebar.json"),
  );
  expect(sidebarWrite).toBeDefined();
  const written = JSON.parse(String(sidebarWrite![1]));
  const components = written[0].items[0].items;
  expect(components).toHaveLength(1);
  expect(components[0]).toMatchObject({
    text: "breadcrumb",
    items: [{ text: "link" }],
  });
});

test("build skips the sidebar rewrite when emitCssApi didn't merge one", async () => {
  emitCssApi.mockReturnValue({ entries: [], sidebarMerged: false });
  const { build } = await import("./build-css-api.ts");
  build();

  expect(
    writeFileSync.mock.calls.some((call) => String(call[0]).endsWith("typedoc-sidebar.json")),
  ).toBe(false);
});

test("nestCssSidebarMembers moves a member into its parent's items", async () => {
  const { nestCssSidebarMembers } = await import("./build-css-api.ts");
  const sidebar = [
    {
      text: "CSS",
      items: [
        {
          text: "Components",
          items: [
            { text: "breadcrumb", link: "/api/css/breadcrumb.md" },
            { text: "breadcrumb.link", link: "/api/css/breadcrumb.link.md" },
            { text: "button", link: "/api/css/button.md" },
          ],
        },
      ],
    },
  ];
  const entries = [
    { name: "breadcrumb" },
    { name: "breadcrumb.link", memberOf: { component: "breadcrumb", private: false } },
    { name: "button" },
  ] as CssDocEntry[];

  const nested = nestCssSidebarMembers(sidebar, entries, "CSS");
  const components = nested[0].items![0].items!;

  expect(components.map((i) => i.text)).toEqual(["breadcrumb", "button"]);
  expect(components[0].items).toEqual([{ text: "link", link: "/api/css/breadcrumb.link.md" }]);
  expect(components[0].collapsed).toBe(true);
});

test("nestCssSidebarMembers leaves an orphaned memberOf flat", async () => {
  const { nestCssSidebarMembers } = await import("./build-css-api.ts");
  const sidebar = [
    {
      text: "CSS",
      items: [
        {
          text: "Components",
          items: [{ text: "orphan.link", link: "/api/css/orphan.link.md" }],
        },
      ],
    },
  ];
  const entries = [
    { name: "orphan.link", memberOf: { component: "missing-parent", private: false } },
  ] as CssDocEntry[];

  const nested = nestCssSidebarMembers(sidebar, entries, "CSS");
  expect(nested[0].items![0].items).toEqual([
    { text: "orphan.link", link: "/api/css/orphan.link.md" },
  ]);
});

test("nestCssSidebarMembers leaves non-CSS sections untouched", async () => {
  const { nestCssSidebarMembers } = await import("./build-css-api.ts");
  const sidebar = [{ text: "packages", items: [{ text: "core", link: "/api/packages/core/" }] }];
  const nested = nestCssSidebarMembers(sidebar, [], "CSS");
  expect(nested).toEqual(sidebar);
});
