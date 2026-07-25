import { defineComponent } from "../lib/define.ts";
import { SENTINEL } from "../lib/sentinel.ts";
import { link as linkRaw } from "../generated/component-styles.ts";

/** The `link` component record: a styled hyperlink with sizes, an inverse variant for dark backgrounds, and inline or unstyled forms. */
export const link = defineComponent({ name: "link", css: (p) => linkRaw.replaceAll(SENTINEL, p) });
/** Standalone `link` stylesheet — the prefixed CSS for the hyperlink, ready to ship as a `.css` file. */
export const linkCss = link.css;
