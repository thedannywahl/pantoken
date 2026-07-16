import { defineComponent } from "../lib/define.ts";
import { SENTINEL } from "../lib/sentinel.ts";
import { toggleGroup as toggleGroupRaw } from "../generated/component-styles.ts";

export const toggleGroup = defineComponent({
  name: "toggle-group",
  css: (p) => toggleGroupRaw.replaceAll(SENTINEL, p),
});
export const toggleGroupCss = toggleGroup.css;
