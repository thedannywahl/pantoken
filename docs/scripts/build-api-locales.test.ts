import { afterEach, beforeAll, beforeEach, expect, test, vi } from "vite-plus/test";

// build-api-locales runs build() on import, so we drive it entirely through mocked fs + child_process
// and the real (deterministic, keyless) glossary adapter. This covers translateMarkdownFiles end to end.
interface Stat {
  isDirectory: () => boolean;
}
const cpSync = vi.fn();
const existsSync = vi.fn<(path: string) => boolean>();
const mkdirSync = vi.fn();
const readdirSync = vi.fn<(path: string) => string[]>();
const readFileSync = vi.fn<(path: string) => string>();
const rmSync = vi.fn();
const statSync = vi.fn<(path: string) => Stat>();
const writeFileSync = vi.fn<(path: string, data: string) => void>();
const spawnSync = vi.fn<() => { status: number }>();
const spawn = vi.fn();

vi.mock("node:fs", () => ({
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
}));
vi.mock("node:child_process", () => ({ spawnSync, spawn }));
// One target locale keeps the loop (and the fixtures below, which only model a HU tree) deterministic.
vi.mock("../.vitepress/i18n.ts", () => ({ NON_ROOT_LOCALES: ["hu"] }));

const MARKDOWN = [
  "# button",
  "",
  "A short description of the button component.",
  "",
  "## Usage",
  "",
  "Regular prose describing how to use the component.",
  "",
].join("\n");

const SIDEBAR = JSON.stringify([
  { text: "Overview", link: "/api/index.md", items: [{ text: "Functions", link: "/api/fn.md" }] },
]);

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
    }).flatMap(([source, translation]) => [
      'msgctxt "docs.api:text"',
      `msgid "${source}"`,
      `msgstr "${translation}"`,
      "",
    ]),
  ].join("\n");
});

let logSpy: ReturnType<typeof vi.spyOn>;
let errSpy: ReturnType<typeof vi.spyOn>;
let savedExit: typeof process.exitCode;

beforeEach(() => {
  vi.resetModules();
  vi.clearAllMocks();
  delete process.env.DOCS_TRANSLATION_ADAPTER; // default glossary adapter (no real spawns)

  // The merged API cache contains the glossary entries used by this fixture.
  // memory.save() refreshes the (ignored) coverage reports via i18n.config.json; treat it as absent
  // so that real coverage-report pipeline is skipped instead of misreading the markdown/PO fixtures.
  existsSync.mockImplementation((path) => !path.endsWith("i18n.config.json"));
  readdirSync.mockReturnValue(["index.md", "typedoc-sidebar.json"]);
  statSync.mockReturnValue({ isDirectory: () => false });
  readFileSync.mockImplementation((path) => {
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
  await import("./build-api-locales.ts");
  // vi.waitFor's own default timeout (1s) is independent of the test's 20s timeout and can be too
  // short under a slow/loaded CI runner.
  await vi.waitFor(
    () =>
      expect(
        logSpy.mock.calls.some((c: unknown[]) => String(c[0]).includes("✓ hu: rendered")),
      ).toBe(true),
    { timeout: 15000 },
  );

  const glossaryEntryFor = (source: string): string => {
    const entries = JSON.parse(GLOSSARY_JSON) as { entries: Record<string, string> };
    const key = keyFor("text", source);
    return entries.entries[key];
  };

  // Generation ran (TypeDoc + the three node scripts) before the clone.
  expect(spawnSync).toHaveBeenCalled();
  expect(cpSync).toHaveBeenCalled();

  // The markdown file was rewritten with the glossary-translated heading; prose is passed through.
  const md = writtenTo("index.md");
  expect(md).toBeDefined();
  expect(md).toContain(`## ${glossaryEntryFor("Usage")}`);
  expect(md).toContain("Regular prose describing how to use the component.");

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
}, 20000); // dynamic import of build-api-locales.ts can exceed the default 5s under full-suite load

test("build surfaces a generation failure as a non-zero exit code", async () => {
  spawnSync.mockReturnValue({ status: 1 }); // TypeDoc/run() fails
  await import("./build-api-locales.ts");
  await vi.waitFor(() => expect(process.exitCode).toBe(1), { timeout: 15000 });
  expect(errSpy).toHaveBeenCalled();
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
