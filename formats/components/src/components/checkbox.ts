import { defineComponent } from "../lib/define.ts";
import { SENTINEL } from "../lib/sentinel.ts";
import { checkbox as checkboxRaw } from "../generated/component-styles.ts";

export const checkbox = defineComponent({
  name: "checkbox",
  css: (p) => checkboxRaw.replaceAll(SENTINEL, p),
});
export const checkboxCss = checkbox.css;
