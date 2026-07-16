import { defineComponent } from "../lib/define.ts";
import { SENTINEL } from "../lib/sentinel.ts";
import { pagination as paginationRaw } from "../generated/component-styles.ts";

export const pagination = defineComponent({
  name: "pagination",
  css: (p) => paginationRaw.replaceAll(SENTINEL, p),
});
export const paginationCss = pagination.css;
