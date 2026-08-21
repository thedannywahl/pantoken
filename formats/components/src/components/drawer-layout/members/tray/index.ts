import { defineComponent, type Definition } from "../../../../lib/define.ts";
import { SENTINEL } from "../../../../lib/sentinel.ts";
import { drawerLayoutTray as drawerLayoutTrayRaw } from "../../../../generated/component-styles.ts";

/** The `drawer-layout.tray` member record: the resizable side panel. */
export const drawerLayoutTray: Definition = defineComponent({
  name: "drawer-layout.tray",
  css: (p) => drawerLayoutTrayRaw.replaceAll(SENTINEL, p),
});
/** Standalone `drawer-layout.tray` stylesheet. */
export const drawerLayoutTrayCss: Definition["css"] = drawerLayoutTray.css;
