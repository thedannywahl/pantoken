/**
 * `@pantoken/vitepress` — theme a VitePress site with Instructure tokens.
 *
 * VitePress theming is driven by `--vp-*` CSS variables. This points them at `var(--instui-*)`, so
 * dropping the output into `.vitepress/theme/custom.css` (alongside `@pantoken/css`, which defines
 * the custom properties) re-skins the docs with the Instructure look while light/dark keeps flowing
 * through the same tokens.
 *
 * @module
 * @beta
 */

import { VITEPRESS_VARS_CSS } from "./vitepress-vars.ts";

/** Options for {@link toVitePressCss}. */
export interface ToVitePressCssOptions {
  /** The selector the variables are emitted under (default `":root"`). */
  selector?: string;
}

/**
 * Emit the VitePress → Instructure CSS-variable bridge.
 *
 * Wraps the variable mappings in the specified selector (default `:root`).
 *
 * @internal
 * @param options - {@link ToVitePressCssOptions}.
 * @returns The bridging CSS string wrapped in the selector.
 */
export function toVitePressCss(options: ToVitePressCssOptions = {}): string {
  const selector = options.selector ?? ":root";

  // If using default selector, return the CSS as-is from the source file.
  // Otherwise, extract variables and re-wrap in the custom selector.
  if (selector === ":root") {
    return VITEPRESS_VARS_CSS;
  }

  // For custom selectors, extract the declarations from :root and wrap them
  const declarations = VITEPRESS_VARS_CSS.split("\n")
    .filter((line) => {
      const trimmed = line.trim();
      return trimmed.startsWith("--vp-") && trimmed.includes(":");
    })
    .map((line) => line.trim());

  return `${selector} {\n  ${declarations.join("\n  ")}\n}\n`;
}

/**
 * VitePress CSS variable → the Instructure token it resolves to.
 *
 * @example
 * ```ts
 * import { VITEPRESS_TO_INSTUI } from "@pantoken/vitepress";
 *
 * console.log(VITEPRESS_TO_INSTUI["--vp-c-bg"]); // "--instui-color-background-page"
 * ```
 */
export { VITEPRESS_TO_INSTUI } from "./vitepress-vars.ts";

export default toVitePressCss;
