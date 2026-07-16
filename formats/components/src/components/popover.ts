import { defineComponent } from "../lib/define.ts";
import { SENTINEL } from "../lib/sentinel.ts";
import { popover as popoverRaw } from "../generated/component-styles.ts";

export const popover = defineComponent({
  name: "popover",
  css: (p) => popoverRaw.replaceAll(SENTINEL, p),
});
export const popoverCss = popover.css;
