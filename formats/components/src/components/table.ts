import { defineComponent } from "../lib/define.ts";
import { SENTINEL } from "../lib/sentinel.ts";
import { table as tableRaw } from "../generated/component-styles.ts";

/** The `table` component record: a styled data table for `th` and `td` plus an optional caption, with hover, fixed, and stacked-card layouts. */
export const table = defineComponent({
  name: "table",
  css: (p) => tableRaw.replaceAll(SENTINEL, p),
});
/** Standalone `table` stylesheet — the prefixed CSS for the data table, ready to ship as a `.css` file. */
export const tableCss = table.css;
