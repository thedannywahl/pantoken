import { defineComponent } from "../lib/define.ts";
import { SENTINEL } from "../lib/sentinel.ts";
import { tag as tagRaw } from "../generated/component-styles.ts";

export const tag = defineComponent({ name: "tag", css: (p) => tagRaw.replaceAll(SENTINEL, p) });
export const tagCss = tag.css;
