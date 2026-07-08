import { expect, test } from "vite-plus/test";
import { numberInputCss } from "../../src/index.ts";
import { numberInput } from "../../src/components/number-input.ts";
import { validate } from "../_validate.ts";

test("number-input: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(numberInput);
});

test("number-input has a +/- arrow column from the arrows tokens and hides native spinners", () => {
  const css = numberInputCss({ prefix: "instui" });
  expect(css).toContain(".instui-number-input .arrows");
  expect(css).toContain("var(--instui-component-text-input-arrows-background-color)");
  expect(css).toContain("var(--instui-color-icon-interactive-action-secondary-base)");
  expect(css).toContain("::-webkit-inner-spin-button");
  expect(css).toContain("appearance: textfield");
});
