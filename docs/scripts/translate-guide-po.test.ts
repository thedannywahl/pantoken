import { afterEach, beforeEach, expect, test, vi } from "vite-plus/test";
import type { PoEntry } from "@pantoken/i18n-engine";
import { generatedFileMarkdown } from "../../tools/translation-adapters/src/generated-values.ts";
import { migrateCompatibilityTranslation } from "../../tools/translation-adapters/src/compatibility-markdown.ts";

const source =
  "<!-- pantoken-generated-values -->\n| Package | Version |\n| --- | --- |\n| `pkg` | `2.0` |\n";
const generated = generatedFileMarkdown(source);
const originalExitCode = process.exitCode;
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
  process.exitCode = originalExitCode;
  vi.restoreAllMocks();
  vi.unstubAllEnvs();
});

function compatibilityEntries(msgstr: string, fuzzy = false): PoEntry[] {
  return [...migrateCompatibilityTranslation(source, msgstr)].map(([msgid, translation]) => ({
    msgid,
    msgstr: translation,
    references: ["compatibility.md"],
    flags: fuzzy ? ["fuzzy", "no-c-format"] : ["no-c-format"],
    fuzzy,
    obsolete: false,
  }));
}

test("does not restore or approve a fuzzy legacy compatibility translation", async () => {
  const entries = compatibilityEntries(generated.template, true);
  mocks.parsePo.mockReturnValue(entries);

  await import("./translate-guide-po.ts");

  expect(mocks.runTranslateContent).toHaveBeenCalled();
  expect(mocks.writeFileSync).not.toHaveBeenCalled();
  expect(mocks.translateMarkdown).not.toHaveBeenCalled();
  expect(entries.every((entry) => entry.fuzzy && entry.flags.includes("fuzzy"))).toBe(true);
  expect(process.exitCode).toBe(1);
});

test("restores current values from a reviewed compatibility template", async () => {
  mocks.parsePo.mockReturnValue(
    compatibilityEntries(generated.template.replace("Package", "Csomag")),
  );

  await import("./translate-guide-po.ts");

  expect(mocks.writeFileSync).toHaveBeenCalledWith(
    expect.stringContaining("docs/hu/compatibility.md"),
    expect.stringContaining("| `pkg` | `2.0` |"),
  );
  expect(mocks.writeFileSync.mock.calls[0][1]).not.toContain("{{ptk_code_");
});

test("still rejects a corrupt reviewed compatibility template", async () => {
  const entries = compatibilityEntries(generated.template);
  const row = entries.find((entry) => entry.msgid.includes("{{ptk_code_1}}"));
  if (!row) throw new Error("Missing row fixture");
  row.msgstr = row.msgstr.replace("{{ptk_code_1}}", "");
  mocks.parsePo.mockReturnValue(entries);

  await expect(import("./translate-guide-po.ts")).rejects.toThrow("value bindings");

  expect(mocks.writeFileSync).not.toHaveBeenCalled();
});
