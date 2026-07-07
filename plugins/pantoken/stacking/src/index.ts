/**
 * `@pantoken/plugin-stacking` — named z-index depths.
 *
 * InstUI's `View` exposes a stacking scale (`deepest`, `below`, `above`, `topmost`) so layers stack
 * predictably instead of by hand-tuned magic numbers. This plugin surfaces that scale two ways: it
 * emits `--instui-stacking-<level>` tokens (resolved to concrete z-index values from the shipped
 * `--instui-component-view-stacking-*` tokens, like `@pantoken/plugin-elevation` does for shadows),
 * and a matching set of `.instui-stack-<level>` utility classes.
 *
 * Both hooks are defined, so the consumer chooses the layer: add it to `buildTokens` to bake the
 * `--instui-stacking-*` records into every output, or to `toCss` (the css hook self-defines them, so
 * the `.instui-stack-*` classes stand alone).
 *
 * @example
 * ```ts
 * import { toCss } from "@pantoken/css";
 * import { byTheme } from "@pantoken/tokens";
 * import { stacking } from "@pantoken/plugin-stacking";
 *
 * const css = toCss(byTheme("rebrand"), { plugins: [stacking()] });
 * // :root { --instui-stacking-topmost: … } + .instui-stack-topmost { z-index: … }
 * ```
 *
 * @module
 */
import { definePlugin, makeResolver } from "@pantoken/plugin-kit";
import { byTheme } from "@pantoken/tokens";
import type { PantokenPlugin, Theme, Token, TokenInput } from "@pantoken/model";

/** The stacking depths, deepest → topmost, from InstUI's view stacking scale. */
export const STACKING_LEVELS: readonly string[] = ["deepest", "below", "above", "topmost"];

/** Options for the {@link stacking} plugin. */
export interface StackingOptions {
  /** The theme whose shipped IR seeds reference resolution (default `"rebrand"` in the css hook). */
  theme?: Theme;
  /** Where the css-hook rules land relative to the stylesheet: `"append"` (default) or `"prepend"`. */
  position?: "append" | "prepend";
}

/**
 * Create the stacking plugin.
 *
 * @param options - {@link StackingOptions}.
 * @returns A {@link PantokenPlugin} with `tokens` and `css` hooks.
 */
export function stacking(options: StackingOptions = {}): PantokenPlugin {
  const position = options.position ?? "append";

  function definitions(tokens: readonly Token[], theme: Theme): TokenInput[] {
    const resolve = makeResolver(byTheme(theme), { overrides: tokens });
    return STACKING_LEVELS.map((level) => ({
      name: `--instui-stacking-${level}`,
      value: resolve(`var(--instui-component-view-stacking-${level})`),
    }));
  }

  const rules = STACKING_LEVELS.map(
    (level) => `.instui-stack-${level} { z-index: var(--instui-stacking-${level}); }`,
  ).join("\n");

  return definePlugin({
    name: "@pantoken/plugin-stacking",
    tokens: ({ tokens, theme, define }) => [
      ...tokens,
      ...definitions(tokens, options.theme ?? theme).map((d) => define(d)),
    ],
    css: ({ tokens }) => {
      const present = new Set(tokens.map((t) => t.name));
      const declarations = definitions(tokens, options.theme ?? "rebrand")
        .filter((d) => !present.has(d.name))
        .map((d): [string, string] => [d.name, d.value]);
      return {
        marker: "pantoken:stacking",
        ...(declarations.length ? { declarations } : {}),
        [position]: rules,
      };
    },
  });
}

export default stacking;
