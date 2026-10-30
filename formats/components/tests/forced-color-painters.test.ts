import { expect, test } from "vite-plus/test";
import { COMPONENTS } from "../src/components/index.ts";
import { UTILITIES } from "../src/utilities/index.ts";
import { buttonCss, headingCss, progressCss, progressCircleCss, radioCss } from "../src/index.ts";

test("standalone glyph and progress masks retain forced parent colors without whole-page opt-outs", () => {
  for (const prefix of ["instui-", "custom-", ""]) {
    const masked = [...COMPONENTS, ...UTILITIES].filter((record) =>
      /\bmask:/u.test(record.rules(prefix)),
    );
    expect(masked.length).toBeGreaterThanOrEqual(15);
    for (const record of masked) {
      const css = record.rules(prefix);
      expect(css, record.name).toContain("@media (forced-colors: active)");
      expect(css, record.name).toContain("forced-color-adjust: preserve-parent-color");
      expect(css, record.name).not.toContain("forced-color-adjust: none");
    }
  }
});

test("gradient text retains a solid system-color foreground in forced colors", () => {
  for (const build of [buttonCss, headingCss]) {
    const css = build({ prefix: "instui" });
    const forced = css.slice(css.indexOf("@media (forced-colors: active)"));
    expect(forced).toContain("-webkit-text-fill-color: currentColor");
    expect(forced).toMatch(/color: (?:ButtonText|CanvasText)/u);
  }
});

test("native progress uses themed value parts and a CSS-owned indeterminate segment", () => {
  const css = progressCss({ prefix: "instui" });
  expect(css).toContain("&:is(progress, meter)");
  expect(css).toContain("appearance: none");
  expect(css).toContain("&::-webkit-progress-value");
  expect(css).toContain("&::-moz-progress-bar");
  expect(css).toContain("&::-webkit-meter-optimum-value");
  expect(css).toContain("&::-moz-meter-bar");
  expect(css).toContain("&:indeterminate::before");
  expect(css).toContain("inset-inline-start: -40%");
  expect(css).toContain("background: Highlight");
  expect(css).toContain("@media (prefers-reduced-motion: no-preference)");
  expect(progressCircleCss({ prefix: "instui" })).toContain("--pantoken-pc-fill: CanvasText");
});

test("selected toggle radios retain a non-shadow state indicator in forced colors", () => {
  expect(radioCss({ prefix: "instui" })).toMatch(
    /&\.-variant-toggle:has\(input:checked\)\s*\{[^}]*@media \(forced-colors: active\)\s*\{\s*outline: 2px solid Highlight;/u,
  );
});
