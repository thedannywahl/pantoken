import { defineComponent } from "../lib/define.ts";
import { SENTINEL } from "../lib/sentinel.ts";
import { inPlaceEdit as inPlaceEditRaw } from "../generated/component-styles.ts";

export const inPlaceEdit = defineComponent({
  name: "in-place-edit",
  css: (p) => inPlaceEditRaw.replaceAll(SENTINEL, p),
});
export const inPlaceEditCss = inPlaceEdit.css;
