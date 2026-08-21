import { defineComponent, type Definition } from "../../../../lib/define.ts";
import { SENTINEL } from "../../../../lib/sentinel.ts";
import { drawerLayoutContent as drawerLayoutContentRaw } from "../../../../generated/component-styles.ts";

/** The `drawer-layout.content` member record: the primary scrollable content pane. */
export const drawerLayoutContent: Definition = defineComponent({
  name: "drawer-layout.content",
  css: (p) => drawerLayoutContentRaw.replaceAll(SENTINEL, p),
});
/** Standalone `drawer-layout.content` stylesheet. */
export const drawerLayoutContentCss: Definition["css"] = drawerLayoutContent.css;
