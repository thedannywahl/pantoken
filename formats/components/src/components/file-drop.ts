import { defineComponent } from "../lib/define.ts";
import { SENTINEL } from "../lib/sentinel.ts";
import { fileDrop as fileDropRaw } from "../generated/component-styles.ts";

export const fileDrop = defineComponent({
  name: "file-drop",
  css: (p) => fileDropRaw.replaceAll(SENTINEL, p),
});
export const fileDropCss = fileDrop.css;
