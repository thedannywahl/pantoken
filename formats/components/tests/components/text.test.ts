import { expect, test } from "vite-plus/test";
import { textCss } from "../../src/index.ts";
import { text } from "../../src/components/text/index.ts";
import { validate } from "../_validate.ts";

test("text: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(text);
});

test("text exposes sizes, weights, colours, and content variants (dash-prefixed compound modifiers)", () => {
  const css = textCss({ prefix: "instui" });
  expect(css).toContain("@scope (.instui-text)");
  expect(css).toMatch(/&\.-size-sm/u);
  expect(css).toContain("var(--instui-component-text-font-size-x-large)");
  expect(css).toMatch(/&\.-weight-bold/u);
  expect(css).toMatch(/&\.-color-danger/u);
  expect(css).toContain("var(--instui-component-text-error-color)");
  expect(css).toMatch(/&\.-variant-description-page/u);
  expect(css).toMatch(/&\.-variant-legend/u);
});
