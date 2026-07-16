import { defineComponent } from "../lib/define.ts";
import { SENTINEL } from "../lib/sentinel.ts";
import { closeButton as closeButtonRaw } from "../generated/component-styles.ts";

export const closeButton = defineComponent({
  name: "close-button",
  css: (p) => closeButtonRaw.replaceAll(SENTINEL, p),
});
export const closeButtonCss = closeButton.css;
