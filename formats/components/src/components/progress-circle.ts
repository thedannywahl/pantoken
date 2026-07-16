import { defineComponent } from "../lib/define.ts";
import { SENTINEL } from "../lib/sentinel.ts";
import { progressCircle as progressCircleRaw } from "../generated/component-styles.ts";

export const progressCircle = defineComponent({
  name: "progress-circle",
  css: (p) => progressCircleRaw.replaceAll(SENTINEL, p),
});
export const progressCircleCss = progressCircle.css;
