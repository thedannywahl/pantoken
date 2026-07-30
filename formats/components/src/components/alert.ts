import { defineComponent, type Definition } from "../lib/define.ts";
import { SENTINEL } from "../lib/sentinel.ts";
import { alert as alertRaw } from "../generated/component-styles.ts";

/** The `alert` component record: an inline message with a coloured status bar and a masked status glyph from the shared icon set. */
export const alert: Definition = defineComponent({
  name: "alert",
  css: (p) => alertRaw.replaceAll(SENTINEL, p),
});
/** Standalone `alert` stylesheet — the prefixed CSS for the status message, ready to ship as a `.css` file. */
export const alertCss: Definition["css"] = alert.css;
