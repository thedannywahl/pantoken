import { defineComponent, type Definition } from "../lib/define.ts";
import { SENTINEL } from "../lib/sentinel.ts";
import { img as imgRaw } from "../generated/component-styles.ts";

/** The `img` component record: a styled `<img>` with stackable display, crop, and effect modifiers. */
export const img: Definition = defineComponent({
  name: "img",
  css: (p) => imgRaw.replaceAll(SENTINEL, p),
});
/** Standalone `img` stylesheet — the prefixed CSS for the styled image, ready to ship as a `.css` file. */
export const imgCss: Definition["css"] = img.css;
