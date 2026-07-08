import { expect, test } from "vite-plus/test";
import { formFieldGroupCss } from "../../src/index.ts";
import { formFieldGroup } from "../../src/components/form-field-group.ts";
import { validate } from "../_validate.ts";

test("form-field-group: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(formFieldGroup);
});

test("form-field-group can align labels across fields via subgrid", () => {
  const css = formFieldGroupCss({ prefix: "instui" });
  expect(css).toContain("@supports (grid-template-columns: subgrid)");
  expect(css).toContain(".instui-form-field-group.-layout-aligned");
  expect(css).toContain("grid-template-columns: subgrid;");
});

test("form-field-group is a token-less fieldset composition with layouts and spacing", () => {
  const css = formFieldGroupCss({ prefix: "instui" });
  expect(css).toContain(".instui-form-field-group {");
  expect(css).toContain(".instui-form-field-group > legend");
  expect(css).toContain(".instui-form-field-group.-layout-columns");
  expect(css).toContain(".instui-form-field-group.-row-spacing-medium");
  expect(css).toContain("var(--instui-spacing-space-md)");
});
