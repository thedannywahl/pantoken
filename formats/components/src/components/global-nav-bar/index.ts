import { defineComponent, type Definition } from "../../lib/define.ts";
import { SENTINEL } from "../../lib/sentinel.ts";
import { globalNavBar as globalNavBarRaw } from "../../generated/component-styles.ts";

/** The `globalNavBar` component record: a vertical navigation rail of icon-over-label items, with a minimized icons-only mode. */
export const globalNavBar: Definition = defineComponent({
  name: "global-nav-bar",
  css: (p) => globalNavBarRaw.replaceAll(SENTINEL, p),
});
/** Standalone `globalNavBar` stylesheet — the prefixed CSS for the navigation rail, ready to ship as a `.css` file. */
export const globalNavBarCss: Definition["css"] = globalNavBar.css;
