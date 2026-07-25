import { defineComponent } from "../lib/define.ts";
import { SENTINEL } from "../lib/sentinel.ts";
import { formFieldMessages as formFieldMessagesRaw } from "../generated/component-styles.ts";

/** The `formFieldMessages` component record: field help and validation messages — hint, error, success, and screen-reader-only — with a glyph on error and success. */
export const formFieldMessages = defineComponent({
  name: "form-field-messages",
  css: (p) => formFieldMessagesRaw.replaceAll(SENTINEL, p),
});
/** Standalone `formFieldMessages` stylesheet — the prefixed CSS for the field messages, ready to ship as a `.css` file. */
export const formFieldMessagesCss = formFieldMessages.css;
