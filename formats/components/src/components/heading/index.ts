import { defineComponent, type Definition } from "../../lib/define.ts";
import { SENTINEL } from "../../lib/sentinel.ts";
import { heading as headingRaw } from "../../generated/component-styles.ts";

/** The `heading` component record: heading typography from `-level-h1` through `-level-h6`. */
export const heading: Definition = defineComponent({
  name: "heading",
  css: (p) => headingRaw.replaceAll(SENTINEL, p),
});

/** Standalone `heading` stylesheet — the prefixed CSS for the heading type, ready to ship as a `.css` file. */
export const headingCss: Definition["css"] = heading.css;
