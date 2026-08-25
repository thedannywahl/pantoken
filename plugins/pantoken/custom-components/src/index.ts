/**
 * `@pantoken/plugin-custom-components` — custom components for downstream consumers.
 *
 * @example
 * ```ts
 * import { toCss } from "@pantoken/css";
 * import { byTheme } from "@pantoken/tokens";
 * import { customComponents } from "@pantoken/plugin-custom-components";
 *
 * const css = toCss(byTheme("rebrand"), { plugins: [customComponents()] });
 * // appends all custom-component rules to the token sheet
 * ```
 *
 * @module
 * @beta
 */
import { definePlugin } from "@pantoken/plugin-kit";
import type { PantokenPlugin } from "@pantoken/model";
import { cardRules, bannerRules } from "./components/index.ts";
export { cardRules, bannerRules } from "./components/index.ts";

/** Options for the {@link customComponents} plugin. */
export interface CustomComponentsOptions {
  /** Where the rules land relative to the stylesheet: `"append"` (default) or `"prepend"`. */
  position?: "append" | "prepend";
}

/**
 * Create the custom-components plugin.
 *
 * @param options - {@link CustomComponentsOptions}.
 * @returns A {@link PantokenPlugin} with a `css` hook.
 */
export function customComponents(options: CustomComponentsOptions = {}): PantokenPlugin {
  const position = options.position ?? "append";
  const rules = [cardRules(), bannerRules()].join("\n");

  return definePlugin({
    name: "@pantoken/plugin-custom-components",
    css: () => ({ marker: "pantoken:custom-components", [position]: rules }),
  });
}

export default customComponents;
