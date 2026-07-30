import { defineComponent, type Definition } from "../lib/define.ts";
import { SENTINEL } from "../lib/sentinel.ts";
import { closeButton as closeButtonRaw } from "../generated/component-styles.ts";

/** The `closeButton` component record: a transparent icon button that draws its own × glyph, in three sizes plus an inverse variant. */
export const closeButton: Definition = defineComponent({
  name: "close-button",
  css: (p) => closeButtonRaw.replaceAll(SENTINEL, p),
});
/** Standalone `closeButton` stylesheet — the prefixed CSS for the close button, ready to ship as a `.css` file. */
export const closeButtonCss: Definition["css"] = closeButton.css;
