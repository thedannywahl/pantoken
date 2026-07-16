import { defineComponent } from "../lib/define.ts";
import { SENTINEL } from "../lib/sentinel.ts";
import { alert as alertRaw } from "../generated/component-styles.ts";

export const alert = defineComponent({
  name: "alert",
  css: (p) => alertRaw.replaceAll(SENTINEL, p),
});
export const alertCss = alert.css;
