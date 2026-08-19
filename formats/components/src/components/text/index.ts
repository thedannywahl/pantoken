import { defineComponent, type Definition } from "../../lib/define.ts";
import { SENTINEL } from "../../lib/sentinel.ts";
import { text as textRaw } from "../../generated/component-styles.ts";

/** The `text` component record: body-text typography with size, weight, colour, and style modifiers. */
export const text: Definition = defineComponent({
  name: "text",
  css: (p) => textRaw.replaceAll(SENTINEL, p),
});
/** Standalone `text` stylesheet — the prefixed CSS for the body typography, ready to ship as a `.css` file. */
export const textCss: Definition["css"] = text.css;
