import { expect, test } from "vite-plus/test";
import { textCss } from "../../src/index.ts";
import { text } from "../../src/components/text.ts";
import { validate } from "../_validate.ts";

test("text: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(text);
});

test("text exposes sizes, weights, colours, and content variants (dash-prefixed compound modifiers)", () => {
  const css = textCss({ prefix: "instui" });
  expect(css).toContain(".instui-text.-size-sm");
  expect(css).toContain("var(--instui-component-text-font-size-x-large)");
  expect(css).toContain(".instui-text.-weight-bold");
  expect(css).toContain(".instui-text.-color-danger");
  expect(css).toContain("var(--instui-component-text-error-color)");
  expect(css).toContain(".instui-text.-variant-description-page");
  expect(css).toContain(".instui-text.-variant-legend");
});
