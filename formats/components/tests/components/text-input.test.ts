import { expect, test } from "vite-plus/test";
import { textInputCss } from "../../src/index.ts";
import { textInput } from "../../src/components/text-input/index.ts";
import { validate } from "../_validate.ts";

test("text-input: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(textInput);
});

test("form controls tint the focus ring by validity (danger on invalid, success on -success)", () => {
  const css = textInputCss({ prefix: "instui" });
  expect(css).toContain("&:is(.-invalid, :user-invalid):focus-visible");
  expect(css).toContain("outline-color: var(--instui-focus-outline-color-danger)");
  expect(css).toContain("&.-success:focus-visible");
  expect(css).toContain("outline-color: var(--instui-focus-outline-color-success)");
});

test("-size-md is an explicit, first-class twin of the (default) medium base rule", () => {
  const css = textInputCss({ prefix: "instui" });
  expect(css).toContain("&.-size-md {");
  expect(css).toContain("var(--instui-component-text-input-height-md)");
  expect(css).toContain("var(--instui-component-text-input-padding-horizontal-md)");
  expect(css).toContain("var(--instui-component-text-input-font-size-md)");
});
