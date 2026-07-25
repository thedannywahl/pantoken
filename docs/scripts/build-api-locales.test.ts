import { afterEach, beforeEach, expect, test, vi } from "vite-plus/test";

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

let logSpy: ReturnType<typeof vi.spyOn>;
let errSpy: ReturnType<typeof vi.spyOn>;
let savedExit: typeof process.exitCode;

beforeEach(() => {
  vi.resetModules();
  vi.clearAllMocks();
  delete process.env.DOCS_TRANSLATION_ADAPTER; // default glossary adapter (no real spawns)

  // Cache file is absent → empty memory; every other path (the HU tree) exists.
  existsSync.mockImplementation((path) => !path.endsWith("hu.api.json"));
  readdirSync.mockReturnValue(["index.md", "typedoc-sidebar.json"]);
  statSync.mockReturnValue({ isDirectory: () => false });
  readFileSync.mockImplementation((path) =>
    path.endsWith("typedoc-sidebar.json") ? SIDEBAR : MARKDOWN,
  );
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
  await vi.waitFor(() =>
    expect(logSpy.mock.calls.some((c: unknown[]) => String(c[0]).includes("Localized"))).toBe(true),
  );

  // Generation ran (TypeDoc + the three node scripts) before the clone.
  expect(spawnSync).toHaveBeenCalled();
  expect(cpSync).toHaveBeenCalled();

  // The markdown file was rewritten with the glossary-translated heading; prose is passed through.
  const md = writtenTo("index.md");
  expect(md).toBeDefined();
  expect(md).toContain("## Használat"); // "## Usage" → Hungarian
  expect(md).toContain("Regular prose describing how to use the component.");

  // The sidebar labels are translated and its absolute /api links point into the HU tree.
  const sidebar = writtenTo("typedoc-sidebar.json");
  expect(sidebar).toBeDefined();
  expect(sidebar).toContain("Áttekintés"); // "Overview"
  expect(sidebar).toContain("Függvények"); // "Functions"
  expect(sidebar).toContain("/hu/api/index.md");

  // Summary log reports one markdown file and both glossary + prose counts.
  const summary = logSpy.mock.calls
    .map((c: unknown[]) => String(c[0]))
    .find((m: string) => m.includes("Localized"));
  expect(summary).toContain("Localized 1 API markdown files");
  expect(summary).toMatch(/glossary terms/);
  expect(summary).toMatch(/prose blocks/);
  expect(process.exitCode).toBeUndefined();
});

test("build surfaces a generation failure as a non-zero exit code", async () => {
  spawnSync.mockReturnValue({ status: 1 }); // TypeDoc/run() fails
  await import("./build-api-locales.ts");
  await vi.waitFor(() => expect(process.exitCode).toBe(1));
  expect(errSpy).toHaveBeenCalled();
});
