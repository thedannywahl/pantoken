import { defineComponent, type Definition } from "../../lib/define.ts";
import { SENTINEL } from "../../lib/sentinel.ts";
import { textArea as textAreaRaw } from "../../generated/component-styles.ts";

/** The `textArea` component record: a styled, resizable native `<textarea>` sharing the text input's states and sizes. */
export const textArea: Definition = defineComponent({
  name: "text-area",
  css: (p) => textAreaRaw.replaceAll(SENTINEL, p),
});

/** Standalone `textArea` stylesheet — the prefixed CSS for the textarea, ready to ship as a `.css` file. */
export const textAreaCss: Definition["css"] = textArea.css;
