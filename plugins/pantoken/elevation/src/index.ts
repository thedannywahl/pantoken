/**
 * `@pantoken/plugin-elevation` — named elevation shadows as multi-layer `box-shadow` tokens.
 *
 * A shadow at a given elevation is *two* stacked layers (a tight contact shadow plus a softer ambient
 * one), and there are several elevations — so it can't be a single flat token. This plugin emits one
 * `--instui-elevation-<name>` custom property per level, each holding the full multi-layer value, so
 * a consumer just writes `box-shadow: var(--instui-elevation-above)`.
 *
 * The named levels and their geometry come from InstUI's `ui-view` shadow scale
 * (`resting` / `above` / `topmost`, aliased `depth1`–`depth3`, `card`, `cardHover`); the *colours*
 * come from pantoken's themed `--instui-color-drop-shadow-shadow-color1/2` tokens, so the shadows
 * deepen correctly in dark mode. Values are resolved to concrete leaves (like `@pantoken/plugin-focus-outline`),
 * so the CSS hook's declarations stand alone.
 *
 * @example
 * ```ts
 * import { toCss } from "@pantoken/css";
 * import { byTheme } from "@pantoken/tokens";
 * import { elevation } from "@pantoken/plugin-elevation";
 *
 * const css = toCss(byTheme("rebrand"), { plugins: [elevation()] });
 * // adds :root { --instui-elevation-resting: …; --instui-elevation-above: …; … }
 * ```
 *
 * @module
 */
import { definePlugin, makeResolver } from "@pantoken/plugin-kit";
import { byTheme } from "@pantoken/tokens";
import type { PantokenPlugin, Theme, Token, TokenInput } from "@pantoken/model";

/**
 * Per-level geometry (`offset-x offset-y blur`) for the two shadow layers, from InstUI's ui-view
 * shadow scale. The tighter layer takes the softer colour (`color2`), the wider layer the stronger
 * one (`color1`) — the "lifted" look InstUI and the pendo styles use.
 */
const GEOMETRY: Record<string, [tight: string, wide: string]> = {
  resting: ["0 0.0625rem 0.125rem", "0 0.0625rem 0.1875rem"],
  above: ["0 0.1875rem 0.375rem", "0 0.1875rem 0.375rem"],
  topmost: ["0 0.375rem 0.4375rem", "0 0.625rem 1.75rem"],
};

/** Convenience aliases InstUI ships alongside the primary level names. */
const ALIASES: Record<string, keyof typeof GEOMETRY> = {
  depth1: "resting",
  depth2: "above",
  depth3: "topmost",
  card: "resting",
  cardHover: "topmost",
};

/**
 * Every elevation level and alias this plugin emits as `--instui-elevation-<name>`
 * (`resting`, `above`, `topmost`, `depth1`–`depth3`, `card`, `cardHover`). Derived from the geometry
 * and alias maps, so it can't drift from what the plugin actually defines.
 */
export const ELEVATION_NAMES: readonly string[] = [
  ...Object.keys(GEOMETRY),
  ...Object.keys(ALIASES),
];

/** Options for the {@link elevation} plugin. */
export interface ElevationOptions {
  /** The stronger (wider-layer) shadow colour (default: `var(--instui-color-drop-shadow-shadow-color1)`). */
  color1?: string;
  /** The softer (tighter-layer) shadow colour (default: `var(--instui-color-drop-shadow-shadow-color2)`). */
  color2?: string;
  /**
   * The theme whose shipped IR seeds reference resolution. Overrides the theme being built; when
   * omitted, the `tokens` hook adopts `ctx.theme` and the `css` hook falls back to `"rebrand"`.
   */
  theme?: Theme;
}

/**
 * Create the elevation plugin.
 *
 * @param options - {@link ElevationOptions}.
 * @returns A {@link PantokenPlugin} with `tokens` and `css` hooks.
 *
 * @example Bake resolved elevation tokens into every output
 * ```ts
 * import { buildTokens } from "@pantoken/core";
 * import { elevation } from "@pantoken/plugin-elevation";
 *
 * buildTokens({ theme: "rebrand", plugins: [elevation()] });
 * // adds --instui-elevation-resting / -above / -topmost / -depth1 … to the IR
 * ```
 */
export function elevation(options: ElevationOptions = {}): PantokenPlugin {
  const raw = {
    color1: options.color1 ?? "var(--instui-color-drop-shadow-shadow-color1)",
    color2: options.color2 ?? "var(--instui-color-drop-shadow-shadow-color2)",
  };

  /** Build the concrete `--instui-elevation-*` records for every level and alias. */
  function definitions(tokens: readonly Token[], theme: Theme): TokenInput[] {
    const resolve = makeResolver(byTheme(theme), { overrides: tokens });
    const c1 = resolve(raw.color1);
    const c2 = resolve(raw.color2);
    const shadow = ([tight, wide]: [string, string]): string => `${tight} ${c2}, ${wide} ${c1}`;
    const levels: [string, [string, string]][] = [
      ...Object.entries(GEOMETRY),
      ...Object.entries(ALIASES).map(([alias, base]): [string, [string, string]] => [
        alias,
        GEOMETRY[base],
      ]),
    ];
    return levels.map(([name, geo]) => ({
      name: `--instui-elevation-${name}`,
      value: shadow(geo),
    }));
  }

  return definePlugin({
    name: "@pantoken/plugin-elevation",
    // The explicit `theme` option wins; otherwise adopt the theme being built (`ctx.theme`).
    tokens: ({ tokens, theme, define }) => [
      ...tokens,
      ...definitions(tokens, options.theme ?? theme).map((d) => define(d)),
    ],
    css: ({ tokens }) => {
      // The css hook has no theme in context, so fall back to the option (default "rebrand").
      const present = new Set(tokens.map((t) => t.name));
      const declarations = definitions(tokens, options.theme ?? "rebrand")
        .filter((d) => !present.has(d.name))
        .map((d): [string, string] => [d.name, d.value]);
      return {
        marker: "pantoken:elevation",
        ...(declarations.length ? { declarations } : {}),
      };
    },
  });
}

export default elevation;
