import { defineComponent, type Definition } from "../../lib/define.ts";
import { SENTINEL } from "../../lib/sentinel.ts";
import { toggleGroup as toggleGroupRaw } from "../../generated/component-styles.ts";

/** The `toggleGroup` component record: a bordered disclosure built on `<details>`, with a chevron summary row and collapsible content. */
export const toggleGroup: Definition = defineComponent({
  name: "toggle-group",
  css: (p) => toggleGroupRaw.replaceAll(SENTINEL, p),
});
/** Standalone `toggleGroup` stylesheet — the prefixed CSS for the bordered disclosure, ready to ship as a `.css` file. */
export const toggleGroupCss: Definition["css"] = toggleGroup.css;
