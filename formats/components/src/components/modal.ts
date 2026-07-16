import { defineComponent } from "../lib/define.ts";
import { SENTINEL } from "../lib/sentinel.ts";
import { modal as modalRaw } from "../generated/component-styles.ts";

export const modal = defineComponent({
  name: "modal",
  css: (p) => modalRaw.replaceAll(SENTINEL, p),
});
export const modalCss = modal.css;
