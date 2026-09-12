import { beforeEach, expect, test, vi } from "vite-plus/test";
import type { PoEntry } from "@pantoken/i18n-engine";

const mocks = vi.hoisted(() => ({
  mergePoWithTemplate: vi.fn(async () => {}),
  parsePo: vi.fn<() => PoEntry[]>(() => []),
  refreshCoverageReports: vi.fn(),
  serializePo: vi.fn(() => ""),
  writeCatalog: vi.fn(),
  AiTranslationAdapter: vi.fn(),
  refreshApiPot: vi.fn(),
}));

vi.mock("node:fs", () => ({ readFileSync: vi.fn(() => "") }));
vi.mock("@pantoken/i18n-engine", () => mocks);
vi.mock("./api-translation.ts", () => ({
  AiTranslationAdapter: mocks.AiTranslationAdapter,
}));
vi.mock("./refresh-api-pot.ts", () => ({ refreshApiPot: mocks.refreshApiPot }));

beforeEach(() => {
  vi.resetModules();
  vi.clearAllMocks();
  delete process.env.DOCS_TRANSLATION_LOCALE;
  delete process.env.DOCS_TRANSLATION_UNITS;
  mocks.parsePo.mockReturnValue([]);
});

test("merges the TypeDoc API catalog before filling entries", async () => {
  await import("./translate-api-po.ts");

  expect(mocks.refreshApiPot).toHaveBeenCalled();
  expect(mocks.mergePoWithTemplate).toHaveBeenCalledWith(
    expect.stringContaining("docs.api.po"),
    expect.stringContaining("l10n/docs.api.pot"),
  );
  expect(mocks.mergePoWithTemplate).toHaveBeenCalledAfter(mocks.refreshApiPot);
  expect(mocks.parsePo).toHaveBeenCalledAfter(mocks.mergePoWithTemplate);
});

test("passes only requested API units to the provider", async () => {
  const translateBatch = vi.fn(async (items: Array<{ id: string; text: string }>) => {
    expect(items).toEqual([{ id: "docs.api:prose\0One block", text: "One block" }]);
    return {};
  });
  mocks.parsePo.mockReturnValue([
    {
      msgctxt: "docs.api:prose",
      msgid: "One block",
      msgstr: "",
      obsolete: false,
      fuzzy: false,
      flags: [],
      references: [],
    },
    {
      msgctxt: "docs.api:prose",
      msgid: "Other block",
      msgstr: "",
      obsolete: false,
      fuzzy: false,
      flags: [],
      references: [],
    },
  ]);
  mocks.AiTranslationAdapter.mockImplementation(function adapterFactory() {
    return { translateBatch };
  });
  process.env.DOCS_TRANSLATION_UNITS = JSON.stringify([
    { msgctxt: "docs.api:prose", msgid: "One block" },
  ]);

  await import("./translate-api-po.ts");

  expect(translateBatch).toHaveBeenCalledTimes(1);
});
