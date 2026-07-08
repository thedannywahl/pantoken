import { expect, test } from "vite-plus/test";
import { formFieldMessagesCss } from "../../src/index.ts";
import { formFieldMessages } from "../../src/components/form-field-messages.ts";
import { validate } from "../_validate.ts";

test("form-field-messages: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(formFieldMessages);
});

test("form-field messages colour by type and paint circle glyphs for error/success", () => {
  const css = formFieldMessagesCss({ prefix: "instui" });
  expect(css).toContain("var(--instui-component-form-field-message-hint-text-color)");
  expect(css).toContain(
    ".instui-form-field-message.-type-error { color: var(--instui-component-form-field-message-error-text-color)",
  );
  expect(css).toContain(
    ".instui-form-field-message.-type-success { color: var(--instui-component-form-field-message-success-text-color)",
  );
  // error/success get a masked circle glyph painted in currentColor.
  expect(css).toContain(".instui-form-field-message.-type-error::before");
  expect(css).toContain("background: currentColor");
  // screenreader-only is visually clipped.
  expect(css).toContain(".instui-form-field-message.-type-screenreader-only");
  expect(css).toContain("clip-path: inset(50%)");
});
