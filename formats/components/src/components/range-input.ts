import { defineComponent } from "../lib/define.ts";
import { SENTINEL } from "../lib/sentinel.ts";
import { rangeInput as rangeInputRaw } from "../generated/component-styles.ts";

export const rangeInput = defineComponent({
  name: "range-input",
  css: (p) => rangeInputRaw.replaceAll(SENTINEL, p),
});
export const rangeInputCss = rangeInput.css;
