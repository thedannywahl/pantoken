import { expect, test } from "vite-plus/test";
import { radioCss } from "../../src/index.ts";
import { radio } from "../../src/components/radio.ts";
import { validate } from "../_validate.ts";

test("radio: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(radio);
});

test("radio is a custom-appearance control with an inset dot and sizes", () => {
  const css = radioCss({ prefix: "instui" });
  expect(css).toContain("appearance: none");
  expect(css).toContain("var(--instui-component-radio-input-border-selected-color)");
  expect(css).toContain("var(--instui-component-radio-input-checked-inset-md)");
  // The dot-control sizes are scoped away from the toggle variant.
  expect(css).toContain(".instui-radio:not(.-variant-toggle):not(.-toggle).-size-sm");
  expect(css).toContain(".instui-radio:not(.-variant-toggle):not(.-toggle).-size-lg");
  expect(css).toContain("var(--instui-component-radio-input-background-disabled-color)");
});

test("radio has a variant=toggle segmented-button form with context colours and readonly", () => {
  const css = radioCss({ prefix: "instui" });
  // Dot-control rules are scoped away from the toggle variant (and its deprecated -toggle alias).
  expect(css).toContain('.instui-radio:not(.-variant-toggle):not(.-toggle) input[type="radio"]');
  // Toggle button + the four context fills.
  expect(css).toContain(".instui-radio.-variant-toggle");
  expect(css).toContain("var(--instui-component-radio-input-toggle-background-off)");
  expect(css).toContain(".instui-radio.-variant-toggle.-context-success");
  expect(css).toContain("var(--instui-component-radio-input-toggle-background-danger)");
  expect(css).toContain("var(--instui-component-radio-input-toggle-background-warning)");
  expect(css).toContain("var(--instui-component-radio-input-toggle-handle-text)");
  // Readonly (standard form).
  expect(css).toContain("var(--instui-component-radio-input-label-readonly-color)");
});
