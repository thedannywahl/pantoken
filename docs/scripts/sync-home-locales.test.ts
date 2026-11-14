import { afterEach, beforeEach, expect, test, vi } from "vite-plus/test";

const mocks = vi.hoisted(() => ({
  loadConfig: vi.fn(() => ({})),
  runExtractContent: vi.fn(),
  runTranslateContent: vi.fn(async () => ({ translated: 2, untranslated: 0 })),
  runRenderContent: vi.fn(),
}));

vi.mock("@pantoken/i18n-engine", () => mocks);
vi.mock("../.vitepress/i18n.ts", () => ({
  NON_ROOT_LOCALES: ["el"],
  parseRequestedLocales: () => ["el"],
}));

beforeEach(() => {
  vi.resetModules();
  vi.clearAllMocks();
  for (const name of [
    "DOCS_TRANSLATION_COMMAND",
    "DOCS_TRANSLATION_COMMAND_ARGS",
    "DOCS_TRANSLATION_FORCE",
    "DOCS_TRANSLATION_UNITS",
    "I18N_TRANSLATION_COMMAND",
    "I18N_TRANSLATION_COMMAND_ARGS",
  ]) {
    vi.stubEnv(name, undefined);
  }
  mocks.runTranslateContent.mockResolvedValue({ translated: 2, untranslated: 0 });
  vi.spyOn(console, "log").mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllEnvs();
});

test("selects a provider without environment overrides and renders the translated homepage", async () => {
  await import("./sync-home-locales.ts");

  expect(mocks.runTranslateContent).toHaveBeenCalledWith(
    expect.anything(),
    expect.any(String),
    "docs.home",
    "el",
    { profile: "claude", unitKeys: undefined, force: false },
  );
  expect(mocks.runRenderContent).toHaveBeenCalledWith(
    expect.anything(),
    expect.any(String),
    "docs.home",
    "el",
  );
});

test("passes docs provider overrides, force, and targeted units to the engine", async () => {
  vi.stubEnv("DOCS_TRANSLATION_COMMAND", "/providers/copilot-wrapper.sh");
  vi.stubEnv("DOCS_TRANSLATION_COMMAND_ARGS", "--model auto");
  vi.stubEnv("DOCS_TRANSLATION_FORCE", "1");
  vi.stubEnv("DOCS_TRANSLATION_UNITS", JSON.stringify([{ msgid: "Build agentically" }]));

  await import("./sync-home-locales.ts");

  expect(process.env.I18N_TRANSLATION_COMMAND).toBe("/providers/copilot-wrapper.sh");
  expect(process.env.I18N_TRANSLATION_COMMAND_ARGS).toBe("--model auto");
  expect(mocks.runTranslateContent).toHaveBeenCalledWith(
    expect.anything(),
    expect.any(String),
    "docs.home",
    "el",
    { profile: "claude", unitKeys: ["\u0000Build agentically"], force: true },
  );
});

test("honors Claude arguments supplied without a docs command", async () => {
  vi.stubEnv("DOCS_TRANSLATION_COMMAND_ARGS", "--model claude-haiku-4-5-20251001 --effort low");

  await import("./sync-home-locales.ts");

  expect(process.env.I18N_TRANSLATION_COMMAND).toBe("claude");
  expect(process.env.I18N_TRANSLATION_COMMAND_ARGS).toContain("--effort low");
});

test("fails explicitly instead of rendering English fallback when translations remain missing", async () => {
  mocks.runTranslateContent.mockResolvedValue({ translated: 0, untranslated: 2 });

  await expect(import("./sync-home-locales.ts")).rejects.toThrow(
    "docs.home (el): 2 entries remain untranslated",
  );

  expect(mocks.runRenderContent).not.toHaveBeenCalled();
});
