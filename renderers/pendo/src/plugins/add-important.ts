/**
 * Package-local PostCSS plugin: add `!important` to every ordinary declaration so the guide styles
 * survive Pendo's own inline/injected styles. Custom-property declarations (`--foo`) and descriptor
 * declarations (inside `@property`, `@font-face`, …) are left alone. Scoped to `@pantoken/pendo` —
 * this is a Pendo deployment concern, not a general pantoken transform.
 *
 * Mirrors `@instructure/postcss-add-important` from pendo-styles.
 *
 * @module
 */
import type { Plugin } from "postcss";

/**
 * Create the add-`!important` plugin.
 *
 * @example
 * ```ts
 * import postcss from "postcss";
 * import { addImportant } from "@pantoken/pendo";
 *
 * const { css } = postcss([addImportant()]).process(".x{color:red}", { from: undefined });
 * // ".x{color:red !important}"
 * ```
 */
export function addImportant(): Plugin {
  return {
    postcssPlugin: "pendo-add-important",
    Declaration(decl) {
      if (decl.prop.startsWith("--")) return; // custom properties keep cascading normally
      if (decl.parent?.type !== "rule") return; // skip @property/@font-face descriptors
      decl.important = true;
    },
  };
}
addImportant.postcss = true;

export default addImportant;
