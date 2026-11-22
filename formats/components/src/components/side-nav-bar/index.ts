import { defineComponent, type Definition } from "../../lib/define.ts";
import { SENTINEL } from "../../lib/sentinel.ts";
import { sideNavBar as sideNavBarRaw } from "../../generated/component-styles.ts";

/**
 * @deprecated Use `globalNavBar` instead. `sideNavBar` is maintained as a functional alias for backward compatibility.
 *
 * The `sideNavBar` component record: a vertical navigation rail of icon-over-label items, with a minimized icons-only mode.
 * This is a deprecated alias for the renamed `globalNavBar` component. The CSS selector `.pfx-side-nav-bar` is also supported as an alias to `.pfx-global-nav-bar`.
 */
export const sideNavBar: Definition = defineComponent({
  name: "side-nav-bar",
  css: (p) => sideNavBarRaw.replaceAll(SENTINEL, p),
});
/** Standalone `sideNavBar` stylesheet — the prefixed CSS for the navigation rail, ready to ship as a `.css` file.
 * @deprecated Use `globalNavBarCss` instead.
 */
export const sideNavBarCss: Definition["css"] = sideNavBar.css;
