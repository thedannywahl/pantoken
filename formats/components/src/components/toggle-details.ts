import { defineComponent } from "../lib/define.ts";
import { SENTINEL } from "../lib/sentinel.ts";
import { toggleDetails as toggleDetailsRaw } from "../generated/component-styles.ts";

export const toggleDetails = defineComponent({
  name: "toggle-details",
  css: (p) => toggleDetailsRaw.replaceAll(SENTINEL, p),
});
export const toggleDetailsCss = toggleDetails.css;
