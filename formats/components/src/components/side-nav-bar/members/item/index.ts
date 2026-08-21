import { defineComponent, type Definition } from "../../../../lib/define.ts";
import { SENTINEL } from "../../../../lib/sentinel.ts";
import { sideNavBarItem as sideNavBarItemRaw } from "../../../../generated/component-styles.ts";

/** The `side-nav-bar.item` member record: a navigation entry (InstUI `SideNavBar.Item`). */
export const sideNavBarItem: Definition = defineComponent({
  name: "side-nav-bar.item",
  css: (p) => sideNavBarItemRaw.replaceAll(SENTINEL, p),
});
/** Standalone `side-nav-bar.item` stylesheet. */
export const sideNavBarItemCss: Definition["css"] = sideNavBarItem.css;
