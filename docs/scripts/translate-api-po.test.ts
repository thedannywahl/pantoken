import { beforeEach, expect, test, vi } from "vite-plus/test";

const mocks = vi.hoisted(() => ({
  loadConfig: vi.fn(() => ({ spaces: { "docs.api": { kind: "content" } } })),
  mergePoWithTemplate: vi.fn(async () => {}),
  parsePo: vi.fn(() => []),
  refreshCoverageReports: vi.fn(),
  runExtractContent: vi.fn(() => ({ potPath: "/repo/l10n/docs.api.pot" })),
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

test("extracts and merges the current API catalog before filling entries", async () => {
  await import("./translate-api-po.ts");

  expect(mocks.loadConfig).toHaveBeenCalledWith(expect.stringContaining("i18n.config.json"));
  expect(mocks.runExtractContent).toHaveBeenCalledWith(
    expect.anything(),
    expect.stringContaining("/"),
    "docs.api",
  );
  expect(mocks.mergePoWithTemplate).toHaveBeenCalledWith(
    expect.stringContaining("docs.api.po"),
    "/repo/l10n/docs.api.pot",
  );
  expect(mocks.parsePo).toHaveBeenCalledAfter(mocks.mergePoWithTemplate);
});
