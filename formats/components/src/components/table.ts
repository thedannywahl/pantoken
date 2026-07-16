import { defineComponent } from "../lib/define.ts";
import { SENTINEL } from "../lib/sentinel.ts";
import { table as tableRaw } from "../generated/component-styles.ts";

export const table = defineComponent({
  name: "table",
  css: (p) => tableRaw.replaceAll(SENTINEL, p),
});
export const tableCss = table.css;
