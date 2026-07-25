import { defineComponent } from "../lib/define.ts";
import { SENTINEL } from "../lib/sentinel.ts";
import { menu as menuRaw } from "../generated/component-styles.ts";

/** The `menu` component record: a dropdown surface of items, groups, and separators. */
export const menu = defineComponent({ name: "menu", css: (p) => menuRaw.replaceAll(SENTINEL, p) });
/** Standalone `menu` stylesheet — the prefixed CSS for the dropdown menu, ready to ship as a `.css` file. */
export const menuCss = menu.css;
