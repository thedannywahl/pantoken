import { defineComponent, type Definition } from "../../lib/define.ts";
import { SENTINEL } from "../../lib/sentinel.ts";
import { numberInput as numberInputRaw } from "../../generated/component-styles.ts";

/** The `numberInput` component record: a number-input facade with a plus/minus spinner column. */
export const numberInput: Definition = defineComponent({
  name: "number-input",
  css: (p) => numberInputRaw.replaceAll(SENTINEL, p),
});

/** Standalone `numberInput` stylesheet — the prefixed CSS for the number input, ready to ship as a `.css` file. */
export const numberInputCss: Definition["css"] = numberInput.css;
