import { defineComponent, type Definition } from "../../lib/define.ts";
import { SENTINEL } from "../../lib/sentinel.ts";
import { popover as popoverRaw } from "../../generated/component-styles.ts";

/** The `popover` component record: an elevated surface for a native `[popover]`, placed with CSS anchor positioning. */
export const popover: Definition = defineComponent({
  name: "popover",
  css: (p) => popoverRaw.replaceAll(SENTINEL, p),
});
/** Standalone `popover` stylesheet — the prefixed CSS for the popover surface, ready to ship as a `.css` file. */
export const popoverCss: Definition["css"] = popover.css;
