import { defineComponent } from "../lib/define.ts";
import { SENTINEL } from "../lib/sentinel.ts";
import { formFieldGroup as formFieldGroupRaw } from "../generated/component-styles.ts";

export const formFieldGroup = defineComponent({
  name: "form-field-group",
  css: (p) => formFieldGroupRaw.replaceAll(SENTINEL, p),
});
export const formFieldGroupCss = formFieldGroup.css;
