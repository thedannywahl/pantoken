import { defineComponent, type Definition } from "../lib/define.ts";
import { SENTINEL } from "../lib/sentinel.ts";
import { byline as bylineRaw } from "../generated/component-styles.ts";

/** The `byline` component record: a media object pairing a hero figure with a title and a description. */
export const byline: Definition = defineComponent({
  name: "byline",
  css: (p) => bylineRaw.replaceAll(SENTINEL, p),
});
/** Standalone `byline` stylesheet — the prefixed CSS for the media object, ready to ship as a `.css` file. */
export const bylineCss: Definition["css"] = byline.css;
