import { defineComponent } from "../lib/define.ts";
import { SENTINEL } from "../lib/sentinel.ts";
import { byline as bylineRaw } from "../generated/component-styles.ts";

export const byline = defineComponent({
  name: "byline",
  css: (p) => bylineRaw.replaceAll(SENTINEL, p),
});
export const bylineCss = byline.css;
