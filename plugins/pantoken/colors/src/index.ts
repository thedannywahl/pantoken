/**
 * `@pantoken/plugin-colors` — CSS-only color math that mirrors the InstUI `@instructure/ui-color-utils`
 * helpers (`alpha`, `darken`, `lighten`, `overlayColors`).
 *
 * InstUI computes those at build time with `tinycolor2` against concrete hex values. pantoken emits
 * `var(--instui-*)` references that resolve in the browser (often through `light-dark()`), so the
 * math has to happen in CSS instead. Each helper returns a CSS color string built from
 * [`color-mix()`](https://developer.mozilla.org/docs/Web/CSS/color_value/color-mix) and
 * [relative color syntax](https://developer.mozilla.org/docs/Web/CSS/CSS_colors/Relative_colors) —
 * both Baseline modern-browser features — so a single expression tracks the token even when it's a
 * scheme-dependent `light-dark()` pair. Use them wherever you'd otherwise hard-code a derived shade.
 *
 * @example
 * ```ts
 * import { alpha, darken } from "@pantoken/plugin-colors";
 *
 * // A subtle brand-tinted hover, derived from the brand token (mirrors InstUI's ghost hover).
 * const hover = alpha(darken("var(--instui-color-institutional-brand-button-primary-bgd)", 10), 10);
 * // → "color-mix(in srgb, hsl(from var(--…brand-…) h s calc(l - 10)) 10%, transparent)"
 * ```
 *
 * @module
 */

/** A CSS color: a literal (`#1d354f`, `rebeccapurple`), a `var(--token)`, or a nested helper result. */
export type CssColor = string;

/**
 * Set a color's opacity to `percent`% — the CSS-only mirror of ui-color-utils `alpha`. Mixing with
 * `transparent` yields exactly the color at that alpha channel.
 *
 * @param color - The base color (literal, `var(--token)`, or a nested helper result).
 * @param percent - The target opacity, 0–100.
 * @returns A `color-mix()` expression.
 *
 * @example
 * ```ts
 * alpha("var(--brand)", 10); // "color-mix(in srgb, var(--brand) 10%, transparent)"
 * ```
 */
export function alpha(color: CssColor, percent: number): string {
  return `color-mix(in srgb, ${color} ${percent}%, transparent)`;
}

/**
 * Darken by `percent` HSL-lightness points — the CSS-only mirror of ui-color-utils `darken`
 * (tinycolor lowers HSL lightness). Uses relative color syntax so hue and saturation are preserved.
 *
 * In relative `hsl()`, the `l` channel resolves to a `<number>` on the 0–100 scale — the same scale
 * tinycolor's `amount` uses — so the points are subtracted directly (no `%`).
 *
 * @param color - The base color.
 * @param percent - Lightness points to subtract (default `10`, matching tinycolor's default).
 * @returns An `hsl(from …)` relative-color expression.
 *
 * @example
 * ```ts
 * darken("var(--brand)", 10); // "hsl(from var(--brand) h s calc(l - 10))"
 * ```
 */
export function darken(color: CssColor, percent = 10): string {
  return `hsl(from ${color} h s calc(l - ${percent}))`;
}

/**
 * Lighten by `percent` HSL-lightness points — the CSS-only mirror of ui-color-utils `lighten`
 * (tinycolor raises HSL lightness). Uses relative color syntax so hue and saturation are preserved.
 *
 * @param color - The base color.
 * @param percent - Lightness points to add (default `10`, matching tinycolor's default).
 * @returns An `hsl(from …)` relative-color expression.
 *
 * @example
 * ```ts
 * lighten("var(--brand)", 10); // "hsl(from var(--brand) h s calc(l + 10))"
 * ```
 */
export function lighten(color: CssColor, percent = 10): string {
  return `hsl(from ${color} h s calc(l + ${percent}))`;
}

/**
 * Flatten `overlay` (at `percent`% strength) over an opaque `base` — a CSS-only stand-in for
 * ui-color-utils `overlayColors`. That helper source-over-composites two RGBA colors into one opaque
 * result; the common case (a translucent tint over a solid surface) is exactly a two-color
 * `color-mix()`. General RGBA-over-RGBA compositing can't be a single CSS color, so this covers the
 * opaque-base case only.
 *
 * @param base - The opaque background color.
 * @param overlay - The color laid over it.
 * @param percent - How much of `overlay` shows through, 0–100 (default `50`).
 * @returns A `color-mix()` expression.
 *
 * @example
 * ```ts
 * overlayColors("var(--surface)", "var(--brand)", 12);
 * // "color-mix(in srgb, var(--brand) 12%, var(--surface))"
 * ```
 */
export function overlayColors(base: CssColor, overlay: CssColor, percent = 50): string {
  return `color-mix(in srgb, ${overlay} ${percent}%, ${base})`;
}

/**
 * The readable foreground — black or white — for content placed *on* `surface`. This is the CSS-only
 * form of InstUI's recurring `*-on-color` variants (a focus ring on a brand button, a
 * primary-inverse button's text, an icon on a coloured surface): rather than a fixed inverse token,
 * it picks the contrast from the surface itself, so it stays correct as the surface changes.
 *
 * It reads the surface's OKLCH lightness through relative color syntax and snaps it to `0` (black) or
 * `1` (white) at `threshold` using the `calc(… * infinity)` clamp trick — no JS, no fixed hex.
 *
 * @param surface - The background colour content sits on (literal, `var(--token)`, or a nested helper).
 * @param threshold - OKLCH lightness (0–1) above which the surface counts as "light" (default `0.62`).
 * @returns An `oklch(from …)` expression resolving to black or white.
 *
 * @example
 * ```ts
 * onColor("var(--instui-color-background-brand)"); // white on a dark brand surface, black on a light one
 * // → "oklch(from var(--…-brand) clamp(0, (0.62 - l) * infinity, 1) 0 0)"
 * ```
 */
export function onColor(surface: CssColor, threshold = 0.62): string {
  return `oklch(from ${surface} clamp(0, (${threshold} - l) * infinity, 1) 0 0)`;
}
