import { defineComponent, type Definition } from "../../../../lib/define.ts";
import { SENTINEL } from "../../../../lib/sentinel.ts";
import { menuItem as menuItemRaw } from "../../../../generated/component-styles.ts";

/** The `menu.item` member record: a single menu entry (InstUI `Menu.Item`). */
export const menuItem: Definition = defineComponent({
  name: "menu.item",
  css: (p) => menuItemRaw.replaceAll(SENTINEL, p),
});
/** Standalone `menu.item` stylesheet — the prefixed CSS for a menu entry, ready to ship as a `.css` file. */
export const menuItemCss: Definition["css"] = menuItem.css;
