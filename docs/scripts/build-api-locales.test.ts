import { afterEach, beforeAll, beforeEach, expect, test, vi } from "vite-plus/test";

// build-api-locales runs build() on import, so we drive it entirely through mocked fs + child_process
// and the real (deterministic, keyless) glossary adapter. This covers translateMarkdownFiles end to end.
interface Stat {
  isDirectory: () => boolean;
}
const cpSync = vi.fn();
const existsSync = vi.fn<(path: string) => boolean>();
const globSync = vi.fn<(pattern: string, options: { cwd: string }) => string[]>();
const mkdirSync = vi.fn();
const readdirSync = vi.fn<(path: string) => string[]>();
const readFileSync = vi.fn<(path: string) => string>();
const rmSync = vi.fn();
const statSync = vi.fn<(path: string) => Stat>();
const writeFileSync = vi.fn<(path: string, data: string) => void>();
const spawnSync = vi.fn<() => { status: number }>();
const spawn = vi.fn();
const refreshApiPot = vi.fn();
const writeApiCompatibility = vi.fn();
const PANTOKEN_VERBATIM_FLAG = "pantoken-verbatim";
const LOCALE_VERBATIM_API_PROSE = new Map([
  [
    "nl",
    [
      "Filters",
      " Syllabus.pdf",
      " Week 1",
      "Miguel Sanchez",
      "Miguel",
      "Sanchez",
      "Dr. Nguyen Van Thoc",
    ],
  ],
  ["se", [" Syllabus.pdf", "Miguel Sanchez", "Miguel", "Sanchez", "Dr. Nguyen Van Thoc"]],
  ["de", ["Dr. Nguyen Van Thoc"]],
  ["fi", ["Miguel Sanchez", "Miguel", "Sanchez"]],
]);

vi.mock("node:fs", () => ({
  cpSync,
  existsSync,
  globSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
}));
vi.mock("node:child_process", () => ({ spawnSync, spawn }));
vi.mock("./refresh-api-pot.ts", () => ({
  refreshApiPot,
  PANTOKEN_VERBATIM_FLAG,
  LOCALE_VERBATIM_API_PROSE,
}));
vi.mock("./write-api-compatibility.ts", () => ({ writeApiCompatibility }));
// One target locale keeps the loop (and the fixtures below, which only model a HU tree) deterministic.
vi.mock("../.vitepress/i18n.ts", () => ({
  NON_ROOT_LOCALES: ["hu"],
  parseRequestedLocales: (requested: string | undefined, fallback: readonly string[]) =>
    requested ? requested.split(",") : fallback,
}));

const MARKDOWN = [
  "# button",
  "",
  "A short description of the button component.",
  "",
  "CA",
  "",
  "## Usage",
  "",
  "Regular prose describing how to use the component.",
  "",
  "## Examples",
  "",
  "```html",
  '<div class="instui-button-group">',
  '  <button class="instui-button" aria-label="Primary">Primary</button>',
  '  <button class="instui-button -color-secondary">Secondary</button>',
  "</div>",
  "```",
  "",
].join("\n");

const SIDEBAR = JSON.stringify([
  { text: "Overview", link: "/api/index.md", items: [{ text: "Functions", link: "/api/fn.md" }] },
]);
const POT = [
  "#, no-c-format, pantoken-verbatim",
  'msgctxt "docs.api:prose"',
  'msgid "CA"',
  'msgstr ""',
  "",
].join("\n");
const PAGES_FILE = "/tmp/pantoken-docs-pages.json";

// segment-markdown/translation-memory are deterministic and fs-free for the surface we touch, but must
// be imported dynamically (after the vi.fn stubs initialize) so the node:fs mock factory doesn't run
// against uninitialized bindings.
let keyFor: (kind: string, source: string) => string;
let GLOSSARY_JSON: string;
let GLOSSARY_PO: string;

beforeAll(async () => {
  ({ keyFor } = await import("./translation-memory.ts"));
  // A minimal glossary cache covering exactly the terms this fixture's markdown/sidebar need.
  const entries = {
    [keyFor("text", "Usage")]: "Használat",
    [keyFor("text", "Overview")]: "Áttekintés",
    [keyFor("text", "Functions")]: "Függvények",
  };
  GLOSSARY_JSON = JSON.stringify({ version: 1, entries });
  GLOSSARY_PO = [
    'msgid ""',
    'msgstr ""',
    '"Content-Type: text/plain; charset=UTF-8\\n"',
    "",
    ...Object.entries({
      Usage: "Használat",
      Overview: "Áttekintés",
      Functions: "Függvények",
      CA: "CA",
      Primary: "Elsődleges",
      Secondary: "Másodlagos",
    }).flatMap(([source, translation]) => {
      const kind = ["Primary", "Secondary", "CA"].includes(source) ? "prose" : "text";
      return [`msgctxt "docs.api:${kind}"`, `msgid "${source}"`, `msgstr "${translation}"`, ""];
    }),
  ].join("\n");
});

let logSpy: ReturnType<typeof vi.spyOn>;
let errSpy: ReturnType<typeof vi.spyOn>;
let savedExit: typeof process.exitCode;

beforeEach(() => {
  vi.resetModules();
  vi.clearAllMocks();
  delete process.env.DOCS_TRANSLATION_ADAPTER; // default glossary adapter (no real spawns)
  delete process.env.DOCS_CHANGED_PAGES_FILE;

  // The merged API cache contains the glossary entries used by this fixture.
  // memory.save() refreshes the (ignored) coverage reports via i18n.config.json; treat it as absent
  // so that real coverage-report pipeline is skipped instead of misreading the markdown/PO fixtures.
  existsSync.mockImplementation((path) => !path.endsWith("i18n.config.json"));
  globSync.mockReturnValue(["index.md"]);
  readdirSync.mockReturnValue(["index.md", "typedoc-sidebar.json"]);
  statSync.mockReturnValue({ isDirectory: () => false });
  readFileSync.mockImplementation((path) => {
    if (path === PAGES_FILE) return JSON.stringify(["hu/api/index.md"]);
    if (path.endsWith("docs.api.pot")) return POT;
    if (path.endsWith("docs.api.po")) return GLOSSARY_PO;
    return path.endsWith("typedoc-sidebar.json") ? SIDEBAR : MARKDOWN;
  });
  spawnSync.mockReturnValue({ status: 0 });

  logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
  errSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  savedExit = process.exitCode;
  process.exitCode = undefined;
});

afterEach(() => {
  process.exitCode = savedExit;
  vi.restoreAllMocks();
});

/** The data written to the first path whose name ends with `suffix`. */
function writtenTo(suffix: string): string | undefined {
  return writeFileSync.mock.calls.find((c: unknown[]) => String(c[0]).endsWith(suffix))?.[1];
}

test("build localizes markdown headings, prose, and sidebars, then logs the summary", async () => {
  const { buildPromise } = await import("./build-api-locales.ts");
  await buildPromise;

  const glossaryEntryFor = (source: string): string => {
    const entries = JSON.parse(GLOSSARY_JSON) as { entries: Record<string, string> };
    const key = keyFor("text", source);
    return entries.entries[key];
  };

  // Generation ran (TypeDoc + the three node scripts) before the clone.
  expect(spawnSync).toHaveBeenCalled();
  expect(cpSync).toHaveBeenCalled();
  expect(writeApiCompatibility).toHaveBeenCalledOnce();
  expect(refreshApiPot).toHaveBeenCalledExactlyOnceWith({ force: true });
  expect(writeApiCompatibility.mock.invocationCallOrder[0]).toBeLessThan(
    refreshApiPot.mock.invocationCallOrder[0],
  );

  // The markdown file was rewritten with the glossary-translated heading; prose is passed through.
  const md = writtenTo("index.md");
  expect(md).toBeDefined();
  expect(md).toContain(`## ${glossaryEntryFor("Usage")}`);
  expect(md).toContain("Regular prose describing how to use the component.");
  expect(md).toContain("\nCA\n");
  expect(md).toContain('<button class="instui-button" aria-label="Primary">Elsődleges</button>');
  expect(md).toContain('<button class="instui-button -color-secondary">Másodlagos</button>');

  // The sidebar labels are translated and its absolute /api links point into the HU tree.
  const sidebar = writtenTo("typedoc-sidebar.json");
  expect(sidebar).toBeDefined();
  expect(sidebar).toContain(glossaryEntryFor("Overview"));
  expect(sidebar).toContain(glossaryEntryFor("Functions"));
  expect(sidebar).toContain("/hu/api/index.md");

  // Summary log reports prose + glossary totals after the per-file output.
  const summary = logSpy.mock.calls
    .map((c: unknown[]) => String(c[0]))
    .find((m: string) => m.includes("📄 Summary:"));
  const sidebarSummary = logSpy.mock.calls
    .map((c: unknown[]) => String(c[0]))
    .find((m: string) => m.includes("📋 Summary:"));

  expect(summary).toMatch(/prose blocks/);
  expect(summary).toMatch(/glossary terms/);
  expect(sidebarSummary).toContain("2 labels");
  expect(summary).toMatch(/\(\d+ cached, \d+ translated\)/);
  expect(process.exitCode).toBeUndefined();
  expect(writtenTo("docs.api.po")).toContain("pantoken-verbatim");
}, 20000); // dynamic import of build-api-locales.ts can exceed the default 5s under full-suite load

test("partial mode skips API generation when no API pages changed", async () => {
  process.env.DOCS_CHANGED_PAGES_FILE = PAGES_FILE;
  readFileSync.mockImplementation((path) => {
    if (path === PAGES_FILE) return JSON.stringify(["guide/cli.md", "hu/guide/cli.md"]);
    if (path.endsWith("docs.api.po")) return GLOSSARY_PO;
    return path.endsWith("typedoc-sidebar.json") ? SIDEBAR : MARKDOWN;
  });

  const { buildPromise } = await import("./build-api-locales.ts");
  await buildPromise;

  expect(spawnSync).not.toHaveBeenCalled();
  expect(cpSync).not.toHaveBeenCalled();
  expect(writeFileSync).not.toHaveBeenCalled();
  expect(logSpy.mock.calls.map((c: unknown[]) => String(c[0])).join("\n")).toContain(
    "skipping API locale build",
  );
});

test("locale-specific identity prose is limited to locales whose translation is English", async () => {
  const { LOCALE_VERBATIM_API_PROSE } =
    await vi.importActual<typeof import("./refresh-api-pot.ts")>("./refresh-api-pot.ts");

  expect(LOCALE_VERBATIM_API_PROSE.get("nl")).toEqual(
    expect.arrayContaining([
      "Filters",
      " Syllabus.pdf",
      " Week 1",
      "Miguel Sanchez",
      "Miguel",
      "Sanchez",
      "Dr. Nguyen Van Thoc",
    ]),
  );
  expect(LOCALE_VERBATIM_API_PROSE.get("se")).toEqual([
    " Syllabus.pdf",
    "Miguel Sanchez",
    "Miguel",
    "Sanchez",
    "Dr. Nguyen Van Thoc",
  ]);
  expect(LOCALE_VERBATIM_API_PROSE.get("de")).toContain("Dr. Nguyen Van Thoc");
  expect(LOCALE_VERBATIM_API_PROSE.get("fi")).toContain("Miguel");
  expect(LOCALE_VERBATIM_API_PROSE.get("fi")).not.toContain("Dr. Nguyen Van Thoc");
  expect(LOCALE_VERBATIM_API_PROSE.get("ja")).toBeUndefined();
});

test.each([
  ["Navigation", ["de", "fr", "fr-CA"]],
  ["Sa", ["de", "fr", "fr-CA", "ga", "ht"]],
  ["Su", ["fi", "is"]],
  ["Mo", ["de"]],
  ["Fr", ["de"]],
  ["Pastel", ["cy", "es", "fr", "fr-CA", "id", "ms", "nl", "pt", "pt-BR", "tr"]],
  ["Menu", ["da", "fr", "fr-CA", "id", "ms", "nl", "pl", "pt", "pt-BR"]],
  ["Design", ["da", "nb", "pt", "pt-BR", "sv"]],
  ["link", ["da", "de", "pt", "pt-BR"]],
  ["Guides", ["fr", "fr-CA"]],
  ["General", ["ca", "es"]],
  ["Dashboard", ["nl"]],
] as const)("approves %s only in its matching locales", async (source, locales) => {
  const { LOCALE_VERBATIM_API_PROSE } =
    await vi.importActual<typeof import("./refresh-api-pot.ts")>("./refresh-api-pot.ts");

  const approvedLocales = [...LOCALE_VERBATIM_API_PROSE]
    .filter(([, sources]) => sources.includes(source))
    .map(([locale]) => locale)
    .sort();

  expect(approvedLocales).toEqual([...locales].sort());
});

test("partial mode translates only allowlisted locale API markdown", async () => {
  process.env.DOCS_CHANGED_PAGES_FILE = PAGES_FILE;

  const { buildPromise } = await import("./build-api-locales.ts");
  await buildPromise;

  expect(spawnSync).toHaveBeenCalled();
  expect(cpSync).toHaveBeenCalled();
  expect(writtenTo("index.md")).toContain("Regular prose describing how to use the component.");
});

test("escapes stray prose tags without changing Markdown code or balanced HTML", async () => {
  const { escapeBareHtmlTags } = await import("./build-api-locales.ts");

  expect(escapeBareHtmlTags("Use `<li>` in prose, but escape <dialog>.")).toBe(
    "Use `<li>` in prose, but escape &lt;dialog&gt;.",
  );
  expect(escapeBareHtmlTags('<span class="raw">raw HTML</span>')).toBe(
    '<span class="raw">raw HTML</span>',
  );
});

test("matches code spans by backtick-run length, like CommonMark", async () => {
  const { escapeBareHtmlTags } = await import("./build-api-locales.ts");

  // A stray double backtick opens a span that closes at the next double backtick, leaving the
  // `<name>` after it as bare prose Vue would parse as an unclosed element.
  expect(escapeBareHtmlTags("a ``width`/`height` b ``dist/<name>.png`` c `<img>` d")).toBe(
    "a ``width`/`height` b ``dist/&lt;name&gt;.png`` c `<img>` d",
  );
  expect(escapeBareHtmlTags("Use ``a `<li>` b`` here.")).toBe("Use ``a `<li>` b`` here.");
  expect(escapeBareHtmlTags("```\n<dialog>\n```")).toBe("```\n<dialog>\n```");
});

test("build surfaces a generation failure as a non-zero exit code", async () => {
  spawnSync.mockReturnValue({ status: 1 }); // TypeDoc/run() fails
  await import("./build-api-locales.ts");
  await vi.waitFor(() => expect(process.exitCode).toBe(1), { timeout: 15000 });
  expect(errSpy).toHaveBeenCalled();
});

test.each([
  ["foo--", true],
  ["foo.bar-baz()?", true],
  ["$token", true],
  ["_token", true],
  ["foo.9-part", true],
  ["foo-bar.baz()", true],
  ["", false],
  ["foo.", false],
  ["foo-", false],
  ["9foo", false],
  ["foo()()", false],
  ["foo??", false],
  ["foo.()", false],
  ["foo()bar", false],
] as const)("classifies identifier boundary %j as verbatim: %s", async (source, expected) => {
  const { isRequiredVerbatimApiUnit } = await import("./build-api-locales.ts");

  expect(isRequiredVerbatimApiUnit(source)).toBe(expected);
});

test("keeps API identifiers and code-shaped prose verbatim", async () => {
  const { isRequiredVerbatimApiUnit } = await import("./build-api-locales.ts");

  for (const source of [
    "AggregateOptions",
    "buildThemeCss",
    "canvas-theme-editor",
    "Token",
    "**panda.config.ts**",
    "- https://www.figma.com/design/EmUrCpRWx",
    "cursor: auto.",
    '@import "@pantoken/plugin-custom-components";',
    "readonly `string`[]",
  ]) {
    expect(isRequiredVerbatimApiUnit(source), source).toBe(true);
  }

  for (const source of [
    "Overview",
    "Functions",
    "Build the preview block appended after each example.",
  ]) {
    expect(isRequiredVerbatimApiUnit(source), source).toBe(false);
  }
});
