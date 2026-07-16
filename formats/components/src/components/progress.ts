import { defineComponent } from "../lib/define.ts";
import { SENTINEL } from "../lib/sentinel.ts";
import { progress as progressRaw } from "../generated/component-styles.ts";

export const progress = defineComponent({
  name: "progress",
  css: (p) => progressRaw.replaceAll(SENTINEL, p),
});
export const progressCss = progress.css;
