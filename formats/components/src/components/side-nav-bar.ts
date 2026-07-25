import { defineComponent } from "../lib/define.ts";
import { SENTINEL } from "../lib/sentinel.ts";
import { sideNavBar as sideNavBarRaw } from "../generated/component-styles.ts";

/** The `sideNavBar` component record: a vertical navigation rail of icon-over-label items, with a minimized icons-only mode. */
export const sideNavBar = defineComponent({
  name: "side-nav-bar",
  css: (p) => sideNavBarRaw.replaceAll(SENTINEL, p),
});
/** Standalone `sideNavBar` stylesheet — the prefixed CSS for the navigation rail, ready to ship as a `.css` file. */
export const sideNavBarCss = sideNavBar.css;
