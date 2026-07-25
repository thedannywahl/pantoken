import { defineComponent } from "../lib/define.ts";
import { SENTINEL } from "../lib/sentinel.ts";
import { contextView as contextViewRaw } from "../generated/component-styles.ts";

/** The `contextView` component record: an elevated callout with a caret, positionable on any side and usable as a native `[popover]`. */
export const contextView = defineComponent({
  name: "context-view",
  css: (p) => contextViewRaw.replaceAll(SENTINEL, p),
});
/** Standalone `contextView` stylesheet — the prefixed CSS for the caret callout, ready to ship as a `.css` file. */
export const contextViewCss = contextView.css;
