// fallow-ignore-file unused-file
/* c8 ignore file */ // side-effect module, tested via behavior functions and IIFE bundles
import { initFormField, type FormFieldControl } from "../behaviors/form-field.js";
import { applySpacing } from "../shared/index.js";
import { sel } from "../shared/prefix.js";

function initFormFields(): void {
  for (const host of document.querySelectorAll<HTMLElement>(
    sel(".pfx-form-field[data-native-validation]"),
  )) {
    if (host.localName.includes("-")) continue;
    const controls = host.querySelectorAll<FormFieldControl>("input, select, textarea");
    const errors = host.querySelectorAll<HTMLElement>(
      sel(".pfx-form-field-message.-type-error, .pfx-form-field-message.-type-new-error"),
    );
    if (controls.length !== 1 || errors.length !== 1)
      throw new Error("Native form-field validation requires exactly one control and one error");
    applySpacing(host);
    initFormField(host, controls[0], errors[0]);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initFormFields);
} else {
  initFormFields();
}
