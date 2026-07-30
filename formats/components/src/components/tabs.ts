import { defineComponent, type Definition } from "../lib/define.ts";
import { SENTINEL } from "../lib/sentinel.ts";
import { tabs as tabsRaw } from "../generated/component-styles.ts";

/** The `tabs` component record: a tabbed panel set with a tab list, selectable tabs, and their panels. */
export const tabs: Definition = defineComponent({
  name: "tabs",
  css: (p) => tabsRaw.replaceAll(SENTINEL, p),
});
/** Standalone `tabs` stylesheet — the prefixed CSS for the tabbed panels, ready to ship as a `.css` file. */
export const tabsCss: Definition["css"] = tabs.css;
