import { afterEach, beforeEach, expect, test, vi } from "vite-plus/test";

// `fonts.ts` scans a directory with `readdirSync`; mock it so the test is hermetic. The internal
// `parseVariant` isn't exported — it's exercised in full through `fontsCss` by feeding it filenames.
const readdirSync = vi.fn<(...args: unknown[]) => string[]>();
vi.mock("node:fs", () => ({ readdirSync }));

const { fontsCss } = await import("./fonts.ts");

const FONTS_DIR = "/pkg/assets/fonts";

beforeEach(() => {
  vi.clearAllMocks();
});

afterEach(() => {
  vi.restoreAllMocks();
});

test("emits an @font-face rule per recognized woff2 with the right weight, style, and src", () => {
  readdirSync.mockReturnValue([
    "AtkinsonHyperlegibleNext-Regular.woff2",
    "AtkinsonHyperlegibleNext-Bold.woff2",
    "AtkinsonHyperlegibleNext-BoldItalic.woff2",
  ]);

  const css = fontsCss(FONTS_DIR);

  expect(css).toContain('font-family: "Atkinson Hyperlegible Next";');
  expect(css).toContain("font-weight: 400;");
  expect(css).toContain("font-weight: 700;");
  expect(css).toContain("font-style: italic;");
  expect(css).toContain("font-display: swap;");
  expect(css).toContain(
    'src: url("../assets/fonts/AtkinsonHyperlegibleNext/AtkinsonHyperlegibleNext-Bold.woff2") format("woff2");',
  );
  // Three recognized faces → three @font-face blocks.
  expect(css.match(/@font-face \{/gu)).toHaveLength(3);
});

test("maps every weight name to its CSS numeric weight", () => {
  readdirSync.mockReturnValue([
    "AtkinsonHyperlegibleNext-Thin.woff2",
    "AtkinsonHyperlegibleNext-ExtraLight.woff2",
    "AtkinsonHyperlegibleNext-Light.woff2",
    "AtkinsonHyperlegibleNext-Book.woff2",
    "AtkinsonHyperlegibleNext-Medium.woff2",
    "AtkinsonHyperlegibleNext-SemiBold.woff2",
    "AtkinsonHyperlegibleNext-ExtraBold.woff2",
    "AtkinsonHyperlegibleNext-Black.woff2",
    "AtkinsonHyperlegibleNext-ExtraBlack.woff2",
  ]);

  const css = fontsCss(FONTS_DIR);

  for (const weight of [100, 200, 300, 450, 500, 600, 800, 900, 950]) {
    expect(css).toContain(`font-weight: ${String(weight)};`);
  }
});

test("longest weight name wins: ExtraBold is 800, not Bold's 700", () => {
  readdirSync.mockReturnValue(["AtkinsonHyperlegibleNext-ExtraBold.woff2"]);

  const css = fontsCss(FONTS_DIR);

  expect(css).toContain("font-weight: 800;");
  expect(css).not.toContain("font-weight: 700;");
});

test("bare `Italic` variant is weight 400 italic", () => {
  readdirSync.mockReturnValue(["AtkinsonHyperlegibleNext-Italic.woff2"]);

  const css = fontsCss(FONTS_DIR);

  expect(css).toContain("font-weight: 400;");
  expect(css).toContain("font-style: italic;");
});

test("`<Weight>Italic` variant keeps the weight and sets italic", () => {
  readdirSync.mockReturnValue([
    "AtkinsonHyperlegibleNext-ExtraLightItalic.woff2",
    "AtkinsonHyperlegibleNext-SemiBoldItalic.woff2",
  ]);

  const css = fontsCss(FONTS_DIR);

  expect(css).toContain("font-weight: 200;");
  expect(css).toContain("font-weight: 600;");
  expect(css.match(/font-style: italic;/gu)).toHaveLength(2);
});

test("skips non-woff2 files and unrecognized variants", () => {
  readdirSync.mockReturnValue([
    "AtkinsonHyperlegibleNext-Bold.woff2", // kept
    "README.md", // not woff2
    "AtkinsonHyperlegibleNext-Bold.ttf", // not woff2
    "AtkinsonHyperlegibleNext-Wonky.woff2", // variant not a known weight
    "AtkinsonHyperlegibleNext-BoldOblique.woff2", // known weight but trailing "Oblique" ≠ "" / "Italic"
  ]);

  const css = fontsCss(FONTS_DIR);

  // Only the single valid Bold face survives.
  expect(css.match(/@font-face \{/gu)).toHaveLength(1);
  expect(css).not.toContain("Wonky");
  expect(css).not.toContain("Oblique");
  expect(css).not.toContain("README");
});

test("sorts faces by weight then style", () => {
  readdirSync.mockReturnValue([
    "AtkinsonHyperlegibleNext-Bold.woff2",
    "AtkinsonHyperlegibleNext-Thin.woff2",
    "AtkinsonHyperlegibleNext-BoldItalic.woff2",
  ]);

  const css = fontsCss(FONTS_DIR);

  const thin = css.indexOf("font-weight: 100;");
  const bold = css.indexOf("font-weight: 700;");
  expect(thin).toBeGreaterThanOrEqual(0);
  expect(thin).toBeLessThan(bold);
  // Within weight 700, "italic" sorts before "normal" (localeCompare of the style string).
  const boldNormal = css.indexOf("font-style: normal;\n  font-weight: 700;");
  const boldItalic = css.indexOf("font-style: italic;\n  font-weight: 700;");
  expect(boldItalic).toBeGreaterThanOrEqual(0);
  expect(boldItalic).toBeLessThan(boldNormal);
});

test("always emits the header comment and the :root family variable", () => {
  readdirSync.mockReturnValue([]);

  const css = fontsCss(FONTS_DIR);

  expect(css.startsWith("/* Instructure brand fonts (@pantoken/components) — generated")).toBe(
    true,
  );
  expect(css).toContain(
    '--instui-font-family-atkinson-hyperlegible-next: "Atkinson Hyperlegible Next", system-ui, sans-serif;',
  );
  // No fonts → no @font-face rules.
  expect(css).not.toContain("@font-face");
});
