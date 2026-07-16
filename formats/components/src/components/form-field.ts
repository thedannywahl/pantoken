import { defineComponent } from "../lib/define.ts";
import { SENTINEL } from "../lib/sentinel.ts";
import { formField as formFieldRaw } from "../generated/component-styles.ts";

export const formField = defineComponent({
  name: "form-field",
  css: (p) => formFieldRaw.replaceAll(SENTINEL, p),
});
export const formFieldCss = formField.css;
