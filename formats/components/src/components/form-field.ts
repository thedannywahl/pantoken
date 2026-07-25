import { defineComponent } from "../lib/define.ts";
import { SENTINEL } from "../lib/sentinel.ts";
import { formField as formFieldRaw } from "../generated/component-styles.ts";

/** The `formField` component record: a wrapper pairing a label with its controls, in inline, required, or readonly layouts. */
export const formField = defineComponent({
  name: "form-field",
  css: (p) => formFieldRaw.replaceAll(SENTINEL, p),
});
/** Standalone `formField` stylesheet — the prefixed CSS for the form-field wrapper, ready to ship as a `.css` file. */
export const formFieldCss = formField.css;
