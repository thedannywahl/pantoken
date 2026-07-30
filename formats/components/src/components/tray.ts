import { defineComponent, type Definition } from "../lib/define.ts";
import { SENTINEL } from "../lib/sentinel.ts";
import { tray as trayRaw } from "../generated/component-styles.ts";

/** The `tray` component record: an edge-pinned panel that slides in from any side, as a native `[popover]` or `<dialog>`. */
export const tray: Definition = defineComponent({
  name: "tray",
  css: (p) => trayRaw.replaceAll(SENTINEL, p),
});
/** Standalone `tray` stylesheet — the prefixed CSS for the sliding tray, ready to ship as a `.css` file. */
export const trayCss: Definition["css"] = tray.css;
