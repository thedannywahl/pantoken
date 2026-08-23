import { expect, test } from "vite-plus/test";
import { progressCss } from "../../src/index.ts";
import { progress } from "../../src/components/progress/index.ts";
import { validate } from "../_validate.ts";
import { norm } from "../_css.ts";

test("progress: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(progress);
});

test("progress bar meter colours are distinct semantic backgrounds on the root, plus animate", () => {
  const css = norm(progressCss({ prefix: "instui" }));
  // Meter rules are nested inside @scope, paired with deprecated -meter-color-* aliases via :is().
  expect(css).toMatch(
    /&:is\(\.-color-success,\s*\.-meter-color-success\)\s*>\s*\.bar\s*\{\s*background:\s*var\(--instui-color-background-success\)/u,
  );
  expect(css).toContain("var(--instui-color-background-error)");
  expect(css).toMatch(/&\.-should-animate\s*>\s*\.bar\s*\{\s*transition:\s*all\s*0\.5s/u);
  expect(css).toContain("--value: var(--value-now)");
  expect(css).toContain("--min: 0");
  expect(css).toContain("--max: var(--value-max)");
  expect(css).toContain("(var(--value) - var(--min)) / (var(--max) - var(--min))");
  expect(css).toContain("@element progress,meter");
  // Two named @structure variants (cssdoc 0.11's @variant), named for the markup pattern (either can
  // host a <progress> or <meter>), not the element itself.
  expect(css).toContain(
    "@structure * @variant nested-label { * label { * .instui-progress { * .bar {} * .value {} * } * } * } * @variant external-label { * label {} * .instui-progress { * .bar {} * .value {} * } * } *",
  );
  expect(css).toContain('<label for="storage-used">Storage used</label>');
  expect(css).toContain('<meter id="storage-used"');
});

test("progress bar has sizes, the full meter palette, and an inverse scheme", () => {
  const css = norm(progressCss({ prefix: "instui" }));
  // Size modifiers are nested inside @scope with & selector.
  expect(css).toMatch(/&\.-size-sm\s*\{/u);
  expect(css).toMatch(/&\.-size-md\s*\{/u);
  expect(css).toMatch(/&\.-size-lg\s*\{/u);
  expect(css).toContain("@scope (.instui-progress)");
  // Meter colour modifiers are nested inside @scope, paired with deprecated -meter-color-* aliases.
  expect(css).toMatch(
    /&:is\(\.-color-info,\s*\.-meter-color-info\)\s*>\s*\.bar\s*\{[\s\S]*background:/u,
  );
  expect(css).toMatch(
    /&:is\(\.-color-warning,\s*\.-meter-color-warning,\s*\.-meter-color-alert\)\s*>\s*\.bar/u,
  );
  expect(css).toMatch(/&:is\(\.-color-danger,\s*\.-meter-color-danger\)\s*>\s*\.bar/u);
  // color="primary-inverse": full border + inverse track/meter, overriding meterColor.
  expect(css).toMatch(/&\.-color-primary-inverse\s*\{[\s\S]*border-color:/u);
  expect(css).toContain("var(--instui-component-progress-bar-border-color)");
  expect(css).toContain("var(--instui-component-progress-bar-track-color-inverse)");
  // All rules nested inside @scope with & selector for root and child elements.
  expect(css).toMatch(/@scope\s*\(\.instui-progress\)\s*\{[\s\S]*&\s*\{[\s\S]*&\s*>\s*\.value/u);
});

test("progress bar can render its value overlaid inside the track via -render-value-inside", () => {
  const css = norm(progressCss({ prefix: "instui" }));
  expect(css).toMatch(
    /&\.-render-value-inside\s*>\s*\.value\s*\{\s*position:\s*absolute;\s*inset:\s*0;[\s\S]*display:\s*flex/u,
  );
  expect(css).toContain("align-items: center; justify-content: flex-start;");
});

test("progress bar falls back to a custom :indeterminate state for a valueless <progress>", () => {
  const css = norm(progressCss({ prefix: "instui" }));
  expect(css).toMatch(/&:indeterminate\s*>\s*\.bar/u);
  expect(css).toContain("animation: pantoken-progress-indeterminate");
  expect(css).toMatch(/&:indeterminate\s*>\s*\.value \{ visibility: hidden; \}/u);
});
