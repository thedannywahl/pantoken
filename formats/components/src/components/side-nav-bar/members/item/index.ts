import { defineComponent, type Definition } from "../../../../lib/define.ts";
import { SENTINEL } from "../../../../lib/sentinel.ts";
import { sideNavBarItem as sideNavBarItemRaw } from "../../../../generated/component-styles.ts";

/**
 * @deprecated Use `globalNavBarItem` instead. `sideNavBarItem` is maintained as a functional alias for backward compatibility.
 *
 * The `side-nav-bar.item` member record: a navigation entry (InstUI `SideNavBar.Item`).
 * This is a deprecated alias for the renamed `global-nav-bar.item` member. The CSS selector `.pfx-side-nav-bar` is also supported as an alias to `.pfx-global-nav-bar`.
 */
export const sideNavBarItem: Definition = defineComponent({
  name: "side-nav-bar.item",
  css: (p) => sideNavBarItemRaw.replaceAll(SENTINEL, p),
});
/** Standalone `side-nav-bar.item` stylesheet.
 * @deprecated Use `globalNavBarItemCss` instead.
 */
export const sideNavBarItemCss: Definition["css"] = sideNavBarItem.css;
