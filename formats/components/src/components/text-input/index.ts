import { defineComponent, type Definition } from "../../lib/define.ts";
import { SENTINEL } from "../../lib/sentinel.ts";
import { textInput as textInputRaw } from "../../generated/component-styles.ts";

/** The `textInput` component record: a styled native `<input>` — including `date`, `time`, and `datetime-local`, where the browser supplies the picker — with validation states and sizes. */
export const textInput: Definition = defineComponent({
  name: "text-input",
  css: (p) => textInputRaw.replaceAll(SENTINEL, p),
});

/** Standalone `textInput` stylesheet — the prefixed CSS for the text input, ready to ship as a `.css` file. */
export const textInputCss: Definition["css"] = textInput.css;
