/**
 * `@pantoken/postcss` — a PostCSS plugin that expands an `@pantoken;` at-rule into the full
 * Instructure token stylesheet (`@property` registrations + declarations). Write `@pantoken;` where
 * you want the tokens defined, and the plugin replaces it at build time.
 *
 * @module
 */
import { css as pantokenCss } from "@pantoken/css";
import type { Plugin } from "postcss";

/** Options for the plugin. */
export interface PantokenPostcssOptions {
  /** The at-rule name to expand (default `"pantoken"`, i.e. `@pantoken;`). */
  atRule?: string;
}

/**
 * The pantoken PostCSS plugin.
 *
 * @param options - {@link PantokenPostcssOptions}.
 * @returns A PostCSS {@link Plugin}.
 *
 * @example Register the plugin in postcss.config.js
 * ```js
 * import pantoken from "@pantoken/postcss";
 *
 * export default { plugins: [pantoken()] };
 * // In your entry stylesheet, `@pantoken;` expands to the token stylesheet.
 * ```
 *
 * @example Expand a custom at-rule (@instui; instead of @pantoken;)
 * ```js
 * import { pantoken } from "@pantoken/postcss";
 *
 * export default { plugins: [pantoken({ atRule: "instui" })] };
 * ```
 */
function pantoken(options: PantokenPostcssOptions = {}): Plugin {
  const name = options.atRule ?? "pantoken";
  return {
    postcssPlugin: "@pantoken/postcss",
    AtRule: {
      [name]: (atRule, { postcss }) => {
        atRule.replaceWith(postcss.parse(pantokenCss));
      },
    },
  };
}

pantoken.postcss = true;

export default pantoken;
export { pantoken };
