import { defineComponent } from "../lib/define.ts";
import { SENTINEL } from "../lib/sentinel.ts";
import { link as linkRaw } from "../generated/component-styles.ts";

export const link = defineComponent({ name: "link", css: (p) => linkRaw.replaceAll(SENTINEL, p) });
export const linkCss = link.css;
