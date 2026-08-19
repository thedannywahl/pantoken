import { defineComponent, type Definition } from "../../../../lib/define.ts";
import { SENTINEL } from "../../../../lib/sentinel.ts";
import { tableColHeader as tableColHeaderRaw } from "../../../../generated/component-styles.ts";

/** The `table.col-header` member record: a column-header cell (InstUI `Table.ColHeader`). */
export const tableColHeader: Definition = defineComponent({
  name: "table.col-header",
  css: (p) => tableColHeaderRaw.replaceAll(SENTINEL, p),
});
/** Standalone `table.col-header` stylesheet. */
export const tableColHeaderCss: Definition["css"] = tableColHeader.css;
