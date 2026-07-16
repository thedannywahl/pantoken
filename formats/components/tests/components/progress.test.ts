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
  expect(css).toContain(".-should-animate > .bar { transition: width");
});

test("progress bar has sizes, the full meter palette, and an inverse scheme", () => {
  const css = norm(progressCss({ prefix: "instui" }));
  expect(css).toContain(".instui-progress.-size-sm");
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
  expect(css).toContain(".instui-progress-value");
});
