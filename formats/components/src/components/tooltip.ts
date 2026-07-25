import { defineComponent } from "../lib/define.ts";
import { SENTINEL } from "../lib/sentinel.ts";
import { tooltip as tooltipRaw } from "../generated/component-styles.ts";

/** The `tooltip` component record: a CSS hover-and-focus tooltip bubble, positionable on any side. */
export const tooltip = defineComponent({
  name: "tooltip",
  css: (p) => tooltipRaw.replaceAll(SENTINEL, p),
});
/** Standalone `tooltip` stylesheet — the prefixed CSS for the tooltip bubble, ready to ship as a `.css` file. */
export const tooltipCss = tooltip.css;
