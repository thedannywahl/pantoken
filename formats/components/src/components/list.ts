import { defineComponent } from "../lib/define.ts";
import { SENTINEL } from "../lib/sentinel.ts";
import { list as listRaw } from "../generated/component-styles.ts";

export const list = defineComponent({ name: "list", css: (p) => listRaw.replaceAll(SENTINEL, p) });
export const listCss = list.css;
