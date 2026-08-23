import { expect, test } from "vite-plus/test";
import { formFieldMessagesCss } from "../../src/index.ts";
import { formFieldMessages } from "../../src/components/form-field-messages/index.ts";
import { validate } from "../_validate.ts";
import { norm } from "../_css.ts";

test("form-field-messages: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(formFieldMessages);
});

test("form-field messages colour by type and paint circle glyphs for error/success", () => {
  const css = norm(formFieldMessagesCss({ prefix: "instui" }));
  expect(css).toContain("var(--instui-component-form-field-message-hint-text-color)");
  expect(css).toContain("@scope (.instui-form-field-message)");
  expect(css).toMatch(
    /&\.-type-error\s*\{\s*color:\s*var\(--instui-component-form-field-message-error-text-color\)/u,
  );
  expect(css).toMatch(
    /&\.-type-success\s*\{\s*color:\s*var\(--instui-component-form-field-message-success-text-color\)/u,
  );
  // error/success get a masked circle glyph painted in currentColor.
  expect(css).toMatch(/&\.-type-error::before/u);
  expect(css).toContain("background: currentColor");
  // screenreader-only is visually clipped.
  expect(css).toMatch(/&\.-type-screenreader-only/u);
  expect(css).toContain("clip-path: inset(50%)");
});
