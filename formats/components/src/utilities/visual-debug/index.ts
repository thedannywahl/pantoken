/**
 * The visual-debug utility — the CSS for InstUI's `withVisualDebug` prop, ported from
 * `@pantoken/plugin-visual-debug` (now tokens-only). A single `-with-visual-debug` modifier that
 * outlines an element and its immediate children for layout debugging.
 *
 * @module
 */
import { defineUtility, type Definition } from "../../lib/define.ts";
import { SENTINEL } from "../../lib/sentinel.ts";
import { visualDebug as visualDebugRaw } from "../../generated/component-styles.ts";

/** The visual-debug utility — the `-with-visual-debug` outline modifier. */
export const visualDebug: Definition = defineUtility({
  name: "visual-debug",
  css: (p) => visualDebugRaw.replaceAll(SENTINEL, p),
});
/** The visual-debug utility as a standalone, header-wrapped stylesheet. */
export const visualDebugCss: Definition["css"] = visualDebug.css;
