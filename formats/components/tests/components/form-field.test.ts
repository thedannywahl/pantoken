import { expect, test } from "vite-plus/test";
import { formFieldCss } from "../../src/index.ts";
import { formField } from "../../src/components/form-field/index.ts";
import { validate } from "../_validate.ts";
import { norm } from "../_css.ts";
import { parseCssDocs } from "@cssdoc/core";
import { Window, type HTMLElement } from "happy-dom";
import { collectExamples } from "../../scripts/audit-accessibility.ts";

test("form-field: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(formField);
});

test("form-field gates error messages on :user-invalid", () => {
  const css = norm(formFieldCss({ prefix: "instui" }));
  expect(css).toContain(".instui-form-field .instui-form-field-message.-type-error");
  expect(css).toContain(
    ".instui-form-field:has(:user-invalid) .instui-form-field-message.-type-error:not([hidden])",
  );
  expect(css).toContain(
    ".instui-form-field.-invalid .instui-form-field-message.-type-new-error:not([hidden])",
  );
});

test("the native-validation audit example starts valid and supplies a real, separate error", () => {
  const css = formFieldCss({ prefix: "instui" });
  const [example] = collectExamples(parseCssDocs(css), ["form-field"]);
  const window = new Window();
  try {
    window.document.body.innerHTML = example!.html;
    const host = window.document.querySelector("[data-native-validation]")!;
    const control = host.querySelector("input")!;
    const error = host.querySelector<HTMLElement>(".-type-error")!;
    expect(control.checkValidity()).toBe(true);
    expect(control.required).toBe(true);
    expect(control.getAttribute("aria-labelledby")).toBe("audit-email-label");
    expect(control.getAttribute("aria-describedby")).toBe("audit-email-hint");
    expect(error.id).toBe("audit-email-error");
    expect(error.textContent).toBe("Enter a valid email address.");
    expect(error.hidden).toBe(true);
    expect(host.contains(error)).toBe(true);
    expect(css).toContain("@pantoken/interactions/form-field.iife.js");
  } finally {
    void window.happyDOM.abort();
  }
});
test("form-field is a grid with label/controls/messages areas and inline layout", () => {
  const css = norm(formFieldCss({ prefix: "instui" }));
  expect(css).toContain('grid-template-areas: "label" "controls" "messages"');
  expect(css).toContain("@scope (.instui-form-field)");
  expect(css).toMatch(/:scope\s*\{\s*>\s*\.label/u);
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
