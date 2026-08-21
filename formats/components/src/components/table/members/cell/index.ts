import { defineComponent, type Definition } from "../../../../lib/define.ts";
import { SENTINEL } from "../../../../lib/sentinel.ts";
import { tableCell as tableCellRaw } from "../../../../generated/component-styles.ts";

/** The `table.cell` member record: a data cell (InstUI `Table.Cell`). */
export const tableCell: Definition = defineComponent({
  name: "table.cell",
  css: (p) => tableCellRaw.replaceAll(SENTINEL, p),
});
/** Standalone `table.cell` stylesheet. */
export const tableCellCss: Definition["css"] = tableCell.css;
