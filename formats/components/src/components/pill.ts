import { defineComponent } from "../lib/define.ts";
import { SENTINEL } from "../lib/sentinel.ts";
import { pill as pillRaw } from "../generated/component-styles.ts";

export const pill = defineComponent({ name: "pill", css: (p) => pillRaw.replaceAll(SENTINEL, p) });
export const pillCss = pill.css;
