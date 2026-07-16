import { defineUtility } from "../lib/define.ts";
import { SENTINEL } from "../lib/sentinel.ts";
import { screenReaderContent as screenReaderContentRaw } from "../generated/component-styles.ts";

export const screenReaderContent = defineUtility({
  name: "screen-reader-content",
  css: (p) => screenReaderContentRaw.replaceAll(SENTINEL, p),
});
export const screenReaderContentCss = screenReaderContent.css;
