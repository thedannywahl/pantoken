import { defineComponent, type Definition } from "../../../../lib/define.ts";
import { SENTINEL } from "../../../../lib/sentinel.ts";
import { tableHead as tableHeadRaw } from "../../../../generated/component-styles.ts";

/** The `table.head` member record: the table's header row group (InstUI `Table.Head`). */
export const tableHead: Definition = defineComponent({
  name: "table.head",
  css: (p) => tableHeadRaw.replaceAll(SENTINEL, p),
});
/** Standalone `table.head` stylesheet. */
export const tableHeadCss: Definition["css"] = tableHead.css;
