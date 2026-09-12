import { beforeEach, expect, test, vi } from "vite-plus/test";

const mocks = vi.hoisted(() => ({
  mergePoWithTemplate: vi.fn(async () => {}),
  parsePo: vi.fn(() => []),
  refreshCoverageReports: vi.fn(),
  serializePo: vi.fn(() => ""),
  writeCatalog: vi.fn(),
  AiTranslationAdapter: vi.fn(),
}));

vi.mock("node:fs", () => ({ readFileSync: vi.fn(() => "") }));
vi.mock("@pantoken/i18n-engine", () => mocks);
vi.mock("./api-translation.ts", () => ({
  AiTranslationAdapter: mocks.AiTranslationAdapter,
}));

beforeEach(() => {
  vi.resetModules();
  vi.clearAllMocks();
  delete process.env.DOCS_TRANSLATION_LOCALE;
});

test("merges the TypeDoc API catalog before filling entries", async () => {
  await import("./translate-api-po.ts");

  expect(mocks.mergePoWithTemplate).toHaveBeenCalledWith(
    expect.stringContaining("docs.api.po"),
    expect.stringContaining("l10n/docs.api.pot"),
  );
  expect(mocks.parsePo).toHaveBeenCalledAfter(mocks.mergePoWithTemplate);
});
