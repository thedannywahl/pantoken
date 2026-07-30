import { defineComponent, type Definition } from "../lib/define.ts";
import { SENTINEL } from "../lib/sentinel.ts";
import { list as listRaw } from "../generated/component-styles.ts";

/** The `list` component record: a list with token-driven item spacing. */
export const list: Definition = defineComponent({
  name: "list",
  css: (p) => listRaw.replaceAll(SENTINEL, p),
});
/** Standalone `list` stylesheet — the prefixed CSS for the spaced list, ready to ship as a `.css` file. */
export const listCss: Definition["css"] = list.css;
