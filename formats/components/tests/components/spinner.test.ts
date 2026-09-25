import { expect, test } from "vite-plus/test";
import { spinnerCss } from "../../src/index.ts";
import { spinner } from "../../src/components/spinner/index.ts";
import { validate } from "../_validate.ts";

test("spinner: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(spinner);
});

test("spinner has sizes, inverse, and AI variants", () => {
  const css = spinnerCss({ prefix: "instui" });
  expect(css).toContain(".instui-spinner.-size-xs");
  expect(css).toContain(".instui-spinner.-size-sm");
  expect(css).toContain(".instui-spinner.-size-lg");
  expect(css).toContain("&.-color-inverse");
  expect(css).toContain("var(--instui-component-spinner-inverse-color)");
  expect(css).toContain("&.-color-ai,");
  expect(css).toContain("&.-color-ai-on-color");
  expect(css).toContain("var(--instui-icon-ai-spinner)");
  expect(css).toContain("var(--instui-color-stroke-ai-top-gradient)");
  expect(css).toContain("var(--instui-color-icon-on-color)");
  expect(css).toContain("animation-duration: 2.25s");
});
