import { defineComponent, type Definition } from "../lib/define.ts";
import { SENTINEL } from "../lib/sentinel.ts";
import { spinner as spinnerRaw } from "../generated/component-styles.ts";

/** The `spinner` component record: an animated loading ring; pair it with `role="status"` and an aria-label. */
export const spinner: Definition = defineComponent({
  name: "spinner",
  css: (p) => spinnerRaw.replaceAll(SENTINEL, p),
});
/** Standalone `spinner` stylesheet — the prefixed CSS for the loading ring, ready to ship as a `.css` file. */
export const spinnerCss: Definition["css"] = spinner.css;
