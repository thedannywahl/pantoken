import { defineComponent, type Definition } from "../../../../lib/define.ts";
import { SENTINEL } from "../../../../lib/sentinel.ts";
import { tabsTab as tabsTabRaw } from "../../../../generated/component-styles.ts";

/** The `tabs.tab` member record: a single tab button (InstUI `Tabs.Tab`). */
export const tabsTab: Definition = defineComponent({
  name: "tabs.tab",
  css: (p) => tabsTabRaw.replaceAll(SENTINEL, p),
});
/** Standalone `tabs.tab` stylesheet. */
export const tabsTabCss: Definition["css"] = tabsTab.css;
