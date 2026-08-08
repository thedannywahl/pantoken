/**
 * `@pantoken/plugin-layouts` — layout composition records for downstream consumers.
 *
 * @example
 * ```ts
 * import { toCss } from "@pantoken/css";
 * import { byTheme } from "@pantoken/tokens";
 * import { layouts } from "@pantoken/plugin-layouts";
 *
 * const css = toCss(byTheme("rebrand"), { plugins: [layouts()] });
 * // appends all layout rules to the token sheet
 * ```
 *
 * @module
 * @beta
 */
import { definePlugin } from "@pantoken/plugin-kit";
import type { PantokenPlugin } from "@pantoken/model";
import { wrapperRules } from "./layouts/index.ts";
export { wrapperRules } from "./layouts/index.ts";

/** Options for the {@link layouts} plugin. */
export interface LayoutsOptions {
  /** Where the rules land relative to the stylesheet: `"append"` (default) or `"prepend"`. */
  position?: "append" | "prepend";
}

/**
 * Create a pantoken plugin that emits layout composition rules.
 *
 * @example
 * ```ts
 * const css = toCss(byTheme("rebrand"), { plugins: [layouts()] });
 * ```
 */
export function layouts(options: LayoutsOptions = {}): PantokenPlugin {
  const position = options.position ?? "append";
  const rules = wrapperRules();
  return definePlugin({
    name: "@pantoken/plugin-layouts",
    css: () => ({ marker: "pantoken:layouts", [position]: rules }),
  });
}
