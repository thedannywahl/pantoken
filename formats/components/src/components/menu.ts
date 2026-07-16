import { defineComponent } from "../lib/define.ts";
import { SENTINEL } from "../lib/sentinel.ts";
import { menu as menuRaw } from "../generated/component-styles.ts";

export const menu = defineComponent({ name: "menu", css: (p) => menuRaw.replaceAll(SENTINEL, p) });
export const menuCss = menu.css;
