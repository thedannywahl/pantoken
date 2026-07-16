import { defineComponent } from "../lib/define.ts";
import { SENTINEL } from "../lib/sentinel.ts";
import { img as imgRaw } from "../generated/component-styles.ts";

export const img = defineComponent({ name: "img", css: (p) => imgRaw.replaceAll(SENTINEL, p) });
export const imgCss = img.css;
