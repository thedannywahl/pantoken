/**
 * The shared swatch model and colour helpers. A {@link Swatch} is just a name + hex colour — the
 * flat reduction of the token set that every designer swatch format consumes.
 *
 * @module
 */
import { makeResolver, parseHexColor } from "@pantoken/utils";
import type { Token } from "@pantoken/model";

/** A single palette entry. */
export interface Swatch {
  name: string;
  hex: string;
}

/** RGB channels, 0–255. */
export interface Rgb {
  r: number;
  g: number;
  b: number;
}

/**
 * Parse `#rgb`/`#rrggbb`/`#rrggbbaa` to 0–255 channels, or `undefined` if not a hex colour.
 *
 * @example
 * ```ts
 * import { hexToRgb } from "@pantoken/swatches";
 *
 * hexToRgb("#ff8800"); // { r: 255, g: 136, b: 0 }
 * hexToRgb("nope"); // undefined
 * ```
 */
export function hexToRgb(hex: string): Rgb | undefined {
  const c = parseHexColor(hex);
  return c ? { r: c.r, g: c.g, b: c.b } : undefined;
}

/** The colour mode to resolve when flattening `light-dark()` values. */
export type Mode = "light" | "dark";

/**
 * Reduce a token IR to a flat list of colour swatches: resolve references, pick a mode, keep only
 * tokens whose value is a hex colour (icons and non-colour tokens are dropped).
 *
 * @param tokens - The IR (e.g. from `@pantoken/tokens`).
 * @param mode - Which colour mode to resolve (default `"light"`).
 * @returns The swatch list, named by token (without the `--instui-` prefix).
 *
 * @example Reduce the token IR to light-mode swatches
 * ```ts
 * import { toSwatches } from "@pantoken/swatches";
 * import { tokens } from "@pantoken/tokens";
 *
 * const swatches = toSwatches(tokens); // [{ name: "color-background-brand", hex: "#…" }, …]
 * ```
 *
 * @example Dark mode
 * ```ts
 * import { toSwatches } from "@pantoken/swatches";
 * import { byTheme } from "@pantoken/tokens";
 *
 * const swatches = toSwatches(byTheme("canvas"), "dark");
 * ```
 */
export function toSwatches(tokens: readonly Token[], mode: Mode = "light"): Swatch[] {
  const resolve = makeResolver(tokens, { mode });
  const out: Swatch[] = [];
  for (const token of tokens) {
    if (token.meta?.kind === "icon") continue;
    const hex = resolve(token.value).trim();
    if (hexToRgb(hex)) out.push({ name: token.name.replace(/^--instui-/, ""), hex });
  }
  return out;
}
