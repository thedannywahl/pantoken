import { defineComponent, type Definition } from "../../../../lib/define.ts";
import { SENTINEL } from "../../../../lib/sentinel.ts";
import { tabsPanel as tabsPanelRaw } from "../../../../generated/component-styles.ts";

/** The `tabs.panel` member record: the content panel for a tab (InstUI `Tabs.Panel`). */
export const tabsPanel: Definition = defineComponent({
  name: "tabs.panel",
  css: (p) => tabsPanelRaw.replaceAll(SENTINEL, p),
});
/** Standalone `tabs.panel` stylesheet. */
export const tabsPanelCss: Definition["css"] = tabsPanel.css;
