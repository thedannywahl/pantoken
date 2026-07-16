import { defineComponent } from "../lib/define.ts";
import { SENTINEL } from "../lib/sentinel.ts";
import { treeBrowser as treeBrowserRaw } from "../generated/component-styles.ts";

export const treeBrowser = defineComponent({
  name: "tree-browser",
  css: (p) => treeBrowserRaw.replaceAll(SENTINEL, p),
});
export const treeBrowserCss = treeBrowser.css;
