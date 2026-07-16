import { defineComponent } from "../lib/define.ts";
import { SENTINEL } from "../lib/sentinel.ts";
import { badge as badgeRaw } from "../generated/component-styles.ts";

export const badge = defineComponent({
  name: "badge",
  css: (p) => badgeRaw.replaceAll(SENTINEL, p),
});
export const badgeCss = badge.css;
