import { defineComponent } from "../lib/define.ts";
import { SENTINEL } from "../lib/sentinel.ts";
import { radio as radioRaw } from "../generated/component-styles.ts";

export const radio = defineComponent({
  name: "radio",
  css: (p) => radioRaw.replaceAll(SENTINEL, p),
});
export const radioCss = radio.css;
