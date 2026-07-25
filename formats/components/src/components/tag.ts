import { defineComponent } from "../lib/define.ts";
import { SENTINEL } from "../lib/sentinel.ts";
import { tag as tagRaw } from "../generated/component-styles.ts";

/** The `tag` component record: an inline chip for a keyword or a filter. */
export const tag = defineComponent({ name: "tag", css: (p) => tagRaw.replaceAll(SENTINEL, p) });
/** Standalone `tag` stylesheet — the prefixed CSS for the chip, ready to ship as a `.css` file. */
export const tagCss = tag.css;
