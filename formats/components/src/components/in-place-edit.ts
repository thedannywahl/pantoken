import { defineComponent, type Definition } from "../lib/define.ts";
import { SENTINEL } from "../lib/sentinel.ts";
import { inPlaceEdit as inPlaceEditRaw } from "../generated/component-styles.ts";

/** The `inPlaceEdit` component record: a `[contenteditable]` that reads as text until focused, then shows input chrome. */
export const inPlaceEdit: Definition = defineComponent({
  name: "in-place-edit",
  css: (p) => inPlaceEditRaw.replaceAll(SENTINEL, p),
});
/** Standalone `inPlaceEdit` stylesheet — the prefixed CSS for the in-place editor, ready to ship as a `.css` file. */
export const inPlaceEditCss: Definition["css"] = inPlaceEdit.css;
