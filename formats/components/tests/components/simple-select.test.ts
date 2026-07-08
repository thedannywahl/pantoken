import { expect, test } from "vite-plus/test";
import { simpleSelectCss } from "../../src/index.ts";
import { simpleSelect } from "../../src/components/simple-select.ts";
import { validate } from "../_validate.ts";

test("simple-select: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(simpleSelect);
});

test("simple-select shares the text-input look with a background caret and appearance:none", () => {
  const css = simpleSelectCss({ prefix: "instui" });
  expect(css).toContain(".instui-simple-select {");
  expect(css).toContain("appearance: none");
  expect(css).toContain("background-image:");
  expect(css).toContain("var(--instui-component-text-input-border-color)");
  expect(css).toContain(".instui-simple-select.-invalid");
});
