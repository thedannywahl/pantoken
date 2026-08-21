import { defineComponent, type Definition } from "../../lib/define.ts";
import { SENTINEL } from "../../lib/sentinel.ts";
import { rangeInput as rangeInputRaw } from "../../generated/component-styles.ts";

/** The `rangeInput` component record: a styled range slider with an inverse value bubble. */
export const rangeInput: Definition = defineComponent({
  name: "range-input",
  css: (p) => rangeInputRaw.replaceAll(SENTINEL, p),
});
/** Standalone `rangeInput` stylesheet — the prefixed CSS for the range slider, ready to ship as a `.css` file. */
export const rangeInputCss: Definition["css"] = rangeInput.css;
