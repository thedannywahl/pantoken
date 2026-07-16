import { defineComponent } from "../lib/define.ts";
import { SENTINEL } from "../lib/sentinel.ts";
import { contextView as contextViewRaw } from "../generated/component-styles.ts";

export const contextView = defineComponent({
  name: "context-view",
  css: (p) => contextViewRaw.replaceAll(SENTINEL, p),
});
export const contextViewCss = contextView.css;
