/**
 * `@pantoken/plugin-stacking` — named z-index depths.
 *
 * InstUI's `View` exposes a stacking scale (`deepest`, `below`, `above`, `topmost`) so layers stack
 * predictably instead of by hand-tuned magic numbers. This plugin emits `--instui-stacking-<level>`
 * tokens, resolved to concrete z-index values from the shipped `--instui-component-view-stacking-*`
 * tokens, for consumers using the lower-level `@pantoken/css`/`@pantoken/tokens` pipeline directly.
 * The matching `.instui-stack-<level>` utility classes now live in `@pantoken/components`' own
 * `stacking` utility.
 *
 * @example
 * ```ts
 * import { buildTokens } from "@pantoken/core";
 * import { stacking } from "@pantoken/plugin-stacking";
 *
 * const tokens = buildTokens({ theme: "rebrand", plugins: [stacking()] });
 * // → includes --instui-stacking-topmost: …
 * ```
 *
 * @module
 * @beta
 */
import { definePlugin, makeResolver } from "@pantoken/plugin-kit";
import { byTheme } from "@pantoken/tokens";
import { defineToken } from "@pantoken/model";
import type { PantokenPlugin, Theme, Token, TokenInput } from "@pantoken/model";

/** The stacking depths, deepest → topmost, from InstUI's view stacking scale. */
export const STACKING_LEVELS: readonly string[] = ["deepest", "below", "above", "topmost"];

/** The `--instui-stacking-<level>` name/value pairs, resolved from the view stacking scale for `theme`. */
function definitions(tokens: readonly Token[], theme: Theme): TokenInput[] {
  const resolve = makeResolver(byTheme(theme), { overrides: tokens });
  return STACKING_LEVELS.map((level) => ({
    name: `--instui-stacking-${level}`,
    value: resolve(`var(--instui-component-view-stacking-${level})`),
  }));
}

/** Options for the {@link stacking} plugin. */
export interface StackingOptions {
  /** The theme whose shipped IR seeds reference resolution (default `"rebrand"`). */
  theme?: Theme;
}

/**
 * Create the stacking tokens plugin.
 *
 * @param options - {@link StackingOptions}.
 * @returns A {@link PantokenPlugin} with a `tokens` hook.
 */
export function stacking(options: StackingOptions = {}): PantokenPlugin {
  return definePlugin({
    name: "@pantoken/plugin-stacking",
    tokens: ({ tokens, theme }) => [
      ...tokens,
      ...definitions(tokens, options.theme ?? theme).map((d) => defineToken(d)),
    ],
  });
}

export default stacking;
