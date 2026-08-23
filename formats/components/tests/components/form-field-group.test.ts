import { expect, test } from "vite-plus/test";
import { formFieldGroupCss } from "../../src/index.ts";
import { formFieldGroup } from "../../src/components/form-field-group/index.ts";
import { validate } from "../_validate.ts";

test("form-field-group: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(formFieldGroup);
});

test("form-field-group can align labels across fields via subgrid", () => {
  const css = formFieldGroupCss({ prefix: "instui" });
  expect(css).toContain("@supports (grid-template-columns: subgrid)");
  expect(css).toContain("@scope (.instui-form-field-group)");
  expect(css).toMatch(/&\.-layout-aligned/u);
  expect(css).toContain("grid-template-columns: subgrid;");
});

test("form-field-group is a token-less fieldset composition with layouts and spacing", () => {
  const css = formFieldGroupCss({ prefix: "instui" });
  expect(css).toContain("@scope (.instui-form-field-group)");
  expect(css).toMatch(/&\s*\{/u);
  expect(css).toMatch(/&\s*>\s*legend/u);
  expect(css).toMatch(/&\.-layout-columns/u);
  expect(css).toMatch(/&\.-row-spacing-medium/u);
  expect(css).toContain("var(--instui-spacing-space-md)");
});
