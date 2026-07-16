import { defineComponent } from "../lib/define.ts";
import { SENTINEL } from "../lib/sentinel.ts";
import { spinner as spinnerRaw } from "../generated/component-styles.ts";

export const spinner = defineComponent({
  name: "spinner",
  css: (p) => spinnerRaw.replaceAll(SENTINEL, p),
});
export const spinnerCss = spinner.css;
