import { expect, test } from "vite-plus/test";
import { progressCss } from "../../src/index.ts";
import { progress } from "../../src/components/progress.ts";
import { validate } from "../_validate.ts";
import { norm } from "../_css.ts";

test("progress: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(progress);
});

test("progress bar meter colours are distinct semantic backgrounds on the root, plus animate", () => {
  const css = norm(progressCss({ prefix: "instui" }));
  // Meter rules are flat (kept outside @scope so the deprecated -meter-color-* aliases can twin them).
  expect(css).toContain(".instui-progress.-color-success .bar");
  expect(css).toContain("var(--instui-color-background-success)");
  expect(css).toContain("var(--instui-color-background-error)");
  expect(css).toContain(".instui-progress.-should-animate > .bar { transition: all 0.5s; }");
  expect(css).toContain("--value: var(--value-now)");
  expect(css).toContain("--min: 0");
  expect(css).toContain("--max: var(--value-max)");
  expect(css).toContain("(var(--value) - var(--min)) / (var(--max) - var(--min))");
  expect(css).toContain("@element progress,meter");
  expect(css).toContain("@structure * label { * .instui-progress { * .bar {} * .value {} * } * }");
  expect(css).toContain('<label for="storage-used">Storage used</label>');
  expect(css).toContain('<meter id="storage-used"');
});

test("progress bar has sizes, the full meter palette, and an inverse scheme", () => {
  const css = norm(progressCss({ prefix: "instui" }));
  expect(css).toContain(".instui-progress.-size-sm");
  expect(css).toContain(".instui-progress.-size-md");
  expect(css).toContain(".instui-progress.-size-lg");
  expect(css).toContain("@scope (.instui-progress)");
  // Meter colour is the normalized `-color-*` root modifier, painting the bar a distinct status colour.
  expect(css).toContain(".instui-progress.-color-info .bar");
  expect(css).toContain(".instui-progress.-color-warning .bar");
  expect(css).toContain(".instui-progress.-color-danger .bar");
  // color="primary-inverse": full border + inverse track/meter, overriding meterColor.
  expect(css).toContain(".instui-progress.-color-primary-inverse");
  expect(css).toContain("var(--instui-component-progress-bar-border-color)");
  expect(css).toContain("var(--instui-component-progress-bar-track-color-inverse)");
  expect(css).toMatch(/:scope\s*>\s*\.value/u);
});

test("progress bar can render its value overlaid inside the track via -render-value-inside", () => {
  const css = norm(progressCss({ prefix: "instui" }));
  expect(css).toContain(
    ".instui-progress.-render-value-inside .value { position: absolute; inset: 0;",
  );
  expect(css).toContain("display: flex; align-items: center; justify-content: flex-start;");
});

test("progress bar falls back to a custom :indeterminate state for a valueless <progress>", () => {
  const css = norm(progressCss({ prefix: "instui" }));
  expect(css).toMatch(/:scope:indeterminate\s*>\s*\.bar/u);
  expect(css).toContain("animation: pantoken-progress-indeterminate");
  expect(css).toMatch(/:scope:indeterminate\s*>\s*\.value \{ visibility: hidden; \}/u);
});
