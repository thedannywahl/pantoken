import { afterEach, beforeEach, expect, test, vi } from "vite-plus/test";
import type { PoEntry } from "@pantoken/i18n-engine";
import { generatedFileMarkdown } from "../../tools/translation-adapters/src/generated-values.ts";

const source =
  "<!-- pantoken-generated-values -->\n| Package | Version |\n| --- | --- |\n| `pkg` | `2.0` |\n";
const generated = generatedFileMarkdown(source);
const mocks = vi.hoisted(() => ({
  readFileSync: vi.fn(),
  writeFileSync: vi.fn(),
  loadConfig: vi.fn(() => ({})),
  listGuideFiles: vi.fn(() => []),
  parsePo: vi.fn<() => PoEntry[]>(() => []),
  runExtractContent: vi.fn(),
  runTranslateContent: vi.fn(async () => {}),
  translateMarkdown: vi.fn(),
}));

vi.mock("node:fs", () => mocks);
vi.mock("@pantoken/i18n-engine", () => ({
  ...mocks,
  refreshCoverageReports: vi.fn(),
  serializePo: vi.fn(),
  writeCatalog: vi.fn(),
}));
vi.mock("./api-translation.ts", () => ({
  AiTranslationAdapter: class {
    translateMarkdown = mocks.translateMarkdown;
  },
}));
vi.mock("../.vitepress/i18n.ts", () => ({
  NON_ROOT_LOCALES: ["hu"],
  parseRequestedLocales: () => ["hu"],
}));

beforeEach(() => {
  vi.resetModules();
  vi.clearAllMocks();
  vi.stubEnv("DOCS_TRANSLATION_FILE", "");
  vi.spyOn(console, "log").mockImplementation(() => {});
  mocks.readFileSync.mockImplementation((path: string) =>
    path.endsWith("compatibility.md") ? source : "",
  );
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllEnvs();
});

function compatibilityEntry(msgstr: string, fuzzy = false): PoEntry {
  return {
    msgid: generated.template,
    msgstr,
    references: ["compatibility.md"],
    flags: fuzzy ? ["fuzzy", "no-c-format"] : ["no-c-format"],
    fuzzy,
    obsolete: false,
  };
}

test("does not restore or approve a fuzzy legacy compatibility translation", async () => {
  const entry = compatibilityEntry(source, true);
  mocks.parsePo.mockReturnValue([entry]);

  await import("./translate-guide-po.ts");

  expect(mocks.runTranslateContent).toHaveBeenCalled();
  expect(mocks.writeFileSync).not.toHaveBeenCalled();
  expect(mocks.translateMarkdown).not.toHaveBeenCalled();
  expect(entry.fuzzy).toBe(true);
  expect(entry.flags).toContain("fuzzy");
  expect(entry.msgstr).toBe(source);
});

test("restores current values from a reviewed compatibility template", async () => {
  mocks.parsePo.mockReturnValue([
    compatibilityEntry(generated.template.replace("Package", "Csomag")),
  ]);

  await import("./translate-guide-po.ts");

  expect(mocks.writeFileSync).toHaveBeenCalledWith(
    expect.stringContaining("docs/hu/compatibility.md"),
    expect.stringContaining("| `pkg` | `2.0` |"),
  );
  expect(mocks.writeFileSync.mock.calls[0][1]).not.toContain("{{ptk_code_");
});

test("still rejects a corrupt reviewed compatibility template", async () => {
  mocks.parsePo.mockReturnValue([
    compatibilityEntry(generated.template.replace("{{ptk_code_1}}", "")),
  ]);

  await expect(import("./translate-guide-po.ts")).rejects.toThrow("placeholder");

  expect(mocks.writeFileSync).not.toHaveBeenCalled();
});
