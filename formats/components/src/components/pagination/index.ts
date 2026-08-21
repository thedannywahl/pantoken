import { defineComponent, type Definition } from "../../lib/define.ts";
import { SENTINEL } from "../../lib/sentinel.ts";
import { pagination as paginationRaw } from "../../generated/component-styles.ts";

/** The `pagination` component record: page navigation with numbered pages, first, previous, next, and last arrows, and an ellipsis for gaps. */
export const pagination: Definition = defineComponent({
  name: "pagination",
  css: (p) => paginationRaw.replaceAll(SENTINEL, p),
});
/** Standalone `pagination` stylesheet — the prefixed CSS for the page navigation, ready to ship as a `.css` file. */
export const paginationCss: Definition["css"] = pagination.css;
