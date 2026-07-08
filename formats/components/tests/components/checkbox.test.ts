import { expect, test } from "vite-plus/test";
import { checkboxCss } from "../../src/index.ts";
import { checkbox } from "../../src/components/checkbox.ts";
import { validate } from "../_validate.ts";

test("checkbox: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(checkbox);
});

test("checkbox has a toggle-switch variant driven by the toggle tokens", () => {
  const css = checkboxCss({ prefix: "instui" });
  expect(css).toContain(".instui-checkbox.-variant-toggle");
  expect(css).toContain("var(--instui-color-background-muted)");
  expect(css).toContain("var(--instui-component-radio-input-toggle-background-success)");
  expect(css).toContain('.instui-checkbox.-variant-toggle input[type="checkbox"]::before');
  // The base (square) control must exclude the toggle variant by its CURRENT class name, or the base
  // rules out-specify the switch and it renders as a checkbox (regression fix).
  expect(css).toContain(":not(.instui-checkbox.-variant-toggle)");
  expect(css).not.toContain(":not(.instui-checkbox.-toggle)");
});

test("checkbox is a custom-appearance control with sizes, error and readonly states", () => {
  const css = checkboxCss({ prefix: "instui" });
  expect(css).toContain("appearance: none");
  expect(css).toContain("var(--instui-component-checkbox-background-checked-color)");
  expect(css).toContain("var(--instui-component-checkbox-border-hover-color)");
  expect(css).toContain(".instui-checkbox.-size-sm");
  expect(css).toContain(".instui-checkbox.-size-lg");
  expect(css).toContain("var(--instui-component-checkbox-error-border-color)");
  expect(css).toContain("var(--instui-component-checkbox-background-readonly-color)");
  // Indeterminate (mixed) fills like checked and swaps the tick for a dash.
  expect(css).toContain('input[type="checkbox"]:indeterminate');
  expect(css).toContain("--pantoken-cb-glyph");
  // The toggle handle carries a state glyph (X off, check on).
  expect(css).toContain('.instui-checkbox.-variant-toggle input[type="checkbox"]::after');
  expect(css).toContain('.instui-checkbox.-variant-toggle input[type="checkbox"]:checked::after');
  // labelPlacement: end (default), start, top.
  expect(css).toContain(".instui-checkbox.-label-placement-start");
  expect(css).toContain(".instui-checkbox.-label-placement-top");
  expect(css).toContain("row-reverse");
});
