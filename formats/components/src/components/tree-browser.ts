import { defineComponent, type Definition } from "../lib/define.ts";
import { SENTINEL } from "../lib/sentinel.ts";
import { treeBrowser as treeBrowserRaw } from "../generated/component-styles.ts";

/** The `treeBrowser` component record: a disclosure tree of nested collections and leaf items, with rotating chevrons. */
export const treeBrowser: Definition = defineComponent({
  name: "tree-browser",
  css: (p) => treeBrowserRaw.replaceAll(SENTINEL, p),
});
/** Standalone `treeBrowser` stylesheet — the prefixed CSS for the disclosure tree, ready to ship as a `.css` file. */
export const treeBrowserCss: Definition["css"] = treeBrowser.css;
