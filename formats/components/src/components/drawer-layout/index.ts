import { defineComponent, type Definition } from "../../lib/define.ts";
import { SENTINEL } from "../../lib/sentinel.ts";
import { drawerLayout as drawerLayoutRaw } from "../../generated/component-styles.ts";

/** The `drawer-layout` component record: a side tray plus main content in a resizable row. */
export const drawerLayout: Definition = defineComponent({
  name: "drawer-layout",
  css: (p) => drawerLayoutRaw.replaceAll(SENTINEL, p),
});
/** Standalone `drawer-layout` stylesheet — the prefixed CSS for a resizable side tray layout. */
export const drawerLayoutCss: Definition["css"] = drawerLayout.css;
