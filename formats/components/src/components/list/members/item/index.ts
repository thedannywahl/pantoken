import { defineComponent, type Definition } from "../../../../lib/define.ts";
import { SENTINEL } from "../../../../lib/sentinel.ts";
import { listItem as listItemRaw } from "../../../../generated/component-styles.ts";

/** The `list.item` member record: a list item (InstUI `List.Item`). */
export const listItem: Definition = defineComponent({
  name: "list.item",
  css: (p) => listItemRaw.replaceAll(SENTINEL, p),
});
/** Standalone `list.item` stylesheet. */
export const listItemCss: Definition["css"] = listItem.css;
