import { defineUtility, type Definition } from "../../lib/define.ts";
import { SENTINEL } from "../../lib/sentinel.ts";
import { screenReaderContent as screenReaderContentRaw } from "../../generated/component-styles.ts";

/** The screen-reader-content utility — visually hides content while keeping it available to assistive tech, with the prefix sentinel replaced. */
export const screenReaderContent: Definition = defineUtility({
  name: "screen-reader-content",
  css: (p) => screenReaderContentRaw.replaceAll(SENTINEL, p),
});
/** The screen-reader-content utility as a standalone, header-wrapped stylesheet. */
export const screenReaderContentCss: Definition["css"] = screenReaderContent.css;
