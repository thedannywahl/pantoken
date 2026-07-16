import { expect, test } from "vite-plus/test";
import { formFieldCss } from "../../src/index.ts";
import { formField } from "../../src/components/form-field.ts";
import { validate } from "../_validate.ts";
import { norm } from "../_css.ts";

test("form-field: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(formField);
});

test("form-field gates error messages on :user-invalid", () => {
  const css = norm(formFieldCss({ prefix: "instui" }));
  expect(css).toContain(".instui-form-field .instui-form-field-message.-type-error");
  expect(css).toContain(
    ".instui-form-field:has(:user-invalid) .instui-form-field-message.-type-error",
  );
});

test("form-field is a grid with label/controls/messages areas and inline layout", () => {
  const css = norm(formFieldCss({ prefix: "instui" }));
  expect(css).toContain('grid-template-areas: "label" "controls" "messages"');
  expect(css).toContain("@scope (.instui-form-field)");
  expect(css).toContain(":scope > .label");
  expect(css).toContain(".instui-form-field.-layout-inline");
  // Messages placement stays flat (outside @scope — shared form-field prefix).
  expect(css).toContain(".instui-form-field > .instui-form-field-messages { grid-area: messages;");
  expect(css).not.toContain(":scope-messages");
});

test("form-field required fires from both -required and native :required, in the asterisk colour", () => {
  const css = norm(formFieldCss({ prefix: "instui" }));
  expect(css).toContain(".instui-form-field:is(.-required,:has(:required)) .label::after");
  expect(css).toContain('content: "*"');
  expect(css).toContain("var(--instui-component-form-field-layout-asterisk-color)");
  expect(css).toContain("var(--instui-component-form-field-layout-readonly-text-color)");
});
