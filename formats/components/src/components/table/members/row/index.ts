import { defineComponent, type Definition } from "../../../../lib/define.ts";
import { SENTINEL } from "../../../../lib/sentinel.ts";
import { tableRow as tableRowRaw } from "../../../../generated/component-styles.ts";

/** The `table.row` member record: a table row (InstUI `Table.Row`). */
export const tableRow: Definition = defineComponent({
  name: "table.row",
  css: (p) => tableRowRaw.replaceAll(SENTINEL, p),
});
/** Standalone `table.row` stylesheet. */
export const tableRowCss: Definition["css"] = tableRow.css;
