import { defineComponent } from "../lib/define.ts";
import { SENTINEL } from "../lib/sentinel.ts";
import { rating as ratingRaw } from "../generated/component-styles.ts";

export const rating = defineComponent({
  name: "rating",
  css: (p) => ratingRaw.replaceAll(SENTINEL, p),
});
export const ratingCss = rating.css;
