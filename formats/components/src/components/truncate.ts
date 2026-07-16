import { defineComponent } from "../lib/define.ts";
import { SENTINEL } from "../lib/sentinel.ts";
import { truncate as truncateRaw } from "../generated/component-styles.ts";

export const truncate = defineComponent({
  name: "truncate",
  css: (p) => truncateRaw.replaceAll(SENTINEL, p),
});
export const truncateCss = truncate.css;
