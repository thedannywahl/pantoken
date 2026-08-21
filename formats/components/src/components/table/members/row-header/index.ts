import { defineComponent, type Definition } from "../../../../lib/define.ts";
import { SENTINEL } from "../../../../lib/sentinel.ts";
import { tableRowHeader as tableRowHeaderRaw } from "../../../../generated/component-styles.ts";

/** The `table.row-header` member record: a row-header cell (InstUI `Table.RowHeader`). */
export const tableRowHeader: Definition = defineComponent({
  name: "table.row-header",
  css: (p) => tableRowHeaderRaw.replaceAll(SENTINEL, p),
});
/** Standalone `table.row-header` stylesheet. */
export const tableRowHeaderCss: Definition["css"] = tableRowHeader.css;
