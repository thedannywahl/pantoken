import { defineComponent } from "../lib/define.ts";
import { SENTINEL } from "../lib/sentinel.ts";
import { tooltip as tooltipRaw } from "../generated/component-styles.ts";

export const tooltip = defineComponent({
  name: "tooltip",
  css: (p) => tooltipRaw.replaceAll(SENTINEL, p),
});
export const tooltipCss = tooltip.css;
