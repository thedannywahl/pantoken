import { expect, test } from "vite-plus/test";
import { textInputCss } from "../../src/index.ts";
import { textInput } from "../../src/components/text-input.ts";
import { validate } from "../_validate.ts";

test("text-input: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(textInput);
});

test("form controls tint the focus ring by validity (danger on invalid, success on -success)", () => {
  const css = textInputCss({ prefix: "instui" });
  expect(css).toContain(
    ".instui-text-input:is(.-invalid, :user-invalid):focus-visible { outline-color: var(--instui-focus-outline-color-danger)",
  );
  expect(css).toContain(
    ".instui-text-input.-success:focus-visible { outline-color: var(--instui-focus-outline-color-success)",
  );
});
