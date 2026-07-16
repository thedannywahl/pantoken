import { defineComponent } from "../lib/define.ts";
import { SENTINEL } from "../lib/sentinel.ts";
import { text as textRaw } from "../generated/component-styles.ts";

export const text = defineComponent({ name: "text", css: (p) => textRaw.replaceAll(SENTINEL, p) });
export const textCss = text.css;
