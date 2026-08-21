import { basename } from "node:path";
import { afterEach, beforeEach, expect, test, vi } from "vite-plus/test";

const writeFileSync = vi.fn();
const mkdirSync = vi.fn();
// readFileSync used by writeIfChanged — throwing causes it to always write, which is what we want.
const readFileSync = vi.fn().mockImplementation(() => {
  throw new Error("mock");
});

vi.mock("node:fs", () => ({ mkdirSync, writeFileSync, readFileSync }));

// Stub heavy data deps so the script is fast and hermetic.
vi.mock("@pantoken/icons", () => ({ icons: [] }));
vi.mock("@pantoken/tokens", () => ({ tokens: [] }));
vi.mock("@pantoken/utils", () => ({
  colorUtilitiesCss: () => "/* color-utilities */",
  tokenUtilitiesCss: () => "/* token-utilities */",
}));
vi.mock("../src/lib/css.ts", () => ({ css: String.raw }));
vi.mock("../src/lib/global-alias.ts", () => ({
  GLOBAL_ALIAS_TARGETS: ["button"],
  globalSelectors: (p: string, bareSelector: string, modifier: string) => [
    bareSelector,
    `.${p}button${modifier}`,
  ],
}));
vi.mock("./fonts.ts", () => ({ fontsCss: () => "/* fonts */" }));
vi.mock("../src/index.ts", () => ({
  baseCss: () => "/* base */",
  componentsCss: () => "/* components */",
  proseCss: () => "/* prose */",
  selectCss: () => "/* select */",
  iconGlyphsCss: () => "/* icons */",
  layoutUtilitiesCss: () => "/* layout */",
  responsiveUtilitiesCss: () => "/* responsive */",
  positionUtilitiesCss: () => "/* position */",
  overflowUtilitiesCss: () => "/* overflow */",
  cursorUtilitiesCss: () => "/* cursor */",
  maskUtilityCss: () => "/* mask */",
  stackingUtilityCss: () => "/* stacking */",
  spacingUtilitiesCss: () => "/* spacing */",
  gapCss: () => "/* gap */",
  transitionCss: () => "/* transition */",
  truncateCss: () => "/* truncate */",
  visualDebugCss: () => "/* visual-debug */",
  ELEVATION_NAMES: [],
}));

const MODULE_PATH = new URL("./generate.ts", import.meta.url).pathname;

beforeEach(async () => {
  vi.resetModules();
  vi.clearAllMocks();
  readFileSync.mockImplementation(() => {
    throw new Error("mock");
  });
  vi.spyOn(console, "log").mockImplementation(() => {});
  await import(MODULE_PATH);
});

afterEach(() => {
  vi.restoreAllMocks();
});

const writtenFiles = (): string[] => writeFileSync.mock.calls.map(([p]) => basename(String(p)));

test("writes base.css via applyMinify", () => {
  expect(writtenFiles()).toContain("base.css");
});

test("writes components.css via applyMinify", () => {
  expect(writtenFiles()).toContain("components.css");
});

test("writes prose.css via applyMinify", () => {
  expect(writtenFiles()).toContain("prose.css");
});

test("writes select.css via applyMinify", () => {
  expect(writtenFiles()).toContain("select.css");
});
