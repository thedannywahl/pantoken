import { defineComponent, type Definition } from "../lib/define.ts";
import { SENTINEL } from "../lib/sentinel.ts";
import { checkbox as checkboxRaw } from "../generated/component-styles.ts";

/** The `checkbox` component record: a native checkbox with its label, or a switch via `-variant-toggle`. */
export const checkbox: Definition = defineComponent({
  name: "checkbox",
  css: (p) => checkboxRaw.replaceAll(SENTINEL, p),
});
/** Standalone `checkbox` stylesheet — the prefixed CSS for the checkbox and switch, ready to ship as a `.css` file. */
export const checkboxCss: Definition["css"] = checkbox.css;
