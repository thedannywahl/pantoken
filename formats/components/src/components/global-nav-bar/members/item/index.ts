import { defineComponent, type Definition } from "../../../../lib/define.ts";
import { SENTINEL } from "../../../../lib/sentinel.ts";
import { globalNavBarItem as globalNavBarItemRaw } from "../../../../generated/component-styles.ts";

/** The `global-nav-bar.item` member record: a navigation entry (InstUI `GlobalNavBar.Item`). */
export const globalNavBarItem: Definition = defineComponent({
  name: "global-nav-bar.item",
  css: (p) => globalNavBarItemRaw.replaceAll(SENTINEL, p),
});
/** Standalone `global-nav-bar.item` stylesheet. */
export const globalNavBarItemCss: Definition["css"] = globalNavBarItem.css;
