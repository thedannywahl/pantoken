import { defineComponent } from "../lib/define.ts";
import { SENTINEL } from "../lib/sentinel.ts";
import { billboard as billboardRaw } from "../generated/component-styles.ts";

export const billboard = defineComponent({
  name: "billboard",
  css: (p) => billboardRaw.replaceAll(SENTINEL, p),
});
export const billboardCss = billboard.css;
