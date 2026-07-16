import { defineComponent } from "../lib/define.ts";
import { SENTINEL } from "../lib/sentinel.ts";
import { radioInputGroup as radioInputGroupRaw } from "../generated/component-styles.ts";

export const radioInputGroup = defineComponent({
  name: "radio-input-group",
  css: (p) => radioInputGroupRaw.replaceAll(SENTINEL, p),
});
export const radioInputGroupCss = radioInputGroup.css;
