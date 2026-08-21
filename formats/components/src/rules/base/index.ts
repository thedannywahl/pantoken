import { defineRule, type Definition } from "../../lib/define.ts";
import { SENTINEL } from "../../lib/sentinel.ts";
import { base as baseRaw } from "../../generated/component-styles.ts";

/** The base rule — the opt-in global reset (box-sizing, page surface, base text and font, color-scheme, link defaults), with the prefix sentinel replaced. */
export const base: Definition = defineRule({
  name: "base",
  css: (p) => baseRaw.replaceAll(SENTINEL, p),
});
