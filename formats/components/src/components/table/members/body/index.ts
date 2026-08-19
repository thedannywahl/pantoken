import { defineComponent, type Definition } from "../../../../lib/define.ts";
import { SENTINEL } from "../../../../lib/sentinel.ts";
import { tableBody as tableBodyRaw } from "../../../../generated/component-styles.ts";

/** The `table.body` member record: the table's data row group (InstUI `Table.Body`). */
export const tableBody: Definition = defineComponent({
  name: "table.body",
  css: (p) => tableBodyRaw.replaceAll(SENTINEL, p),
});
/** Standalone `table.body` stylesheet. */
export const tableBodyCss: Definition["css"] = tableBody.css;
