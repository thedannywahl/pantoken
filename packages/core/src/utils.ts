/**
 * Value-level helpers shared across the transformer: name kebab-casing, `@property` syntax
 * sniffing, and the icon-colour special values. Ported from
 * `@instructure/instui-generate-css-tokens`.
 *
 * @module
 */

/**
 * Convert a CamelCase / spaced string to kebab-case.
 *
 * @example
 * ```ts
 * import { toKebab } from "@pantoken/core";
 *
 * toKebab("baseButton");   // → "base-button"
 * toKebab("Font Family");  // → "font-family"
 * toKebab("rebrandLight"); // → "rebrand-light"
 * ```
 */
export function toKebab(str: string): string {
  return str
    .replace(/\s+/g, "")
    .replace(/([A-Z])/g, (m) => `-${m.toLowerCase()}`)
    .replace(/^-/, "");
}

// Only ABSOLUTE length units are valid in a typed @property `initial-value`: the value must be
// "computationally independent", which font-relative (rem/em/ex/ch/lh…) and viewport (vw/vh…)
// units are NOT — Chromium discards such @property rules. Those values fall back to `*` instead.
const ABSOLUTE_LENGTH_UNITS = "px|cm|mm|q|in|pt|pc";

// Direct color/image matches, checked in order on the trimmed value.
const SYNTAX_DIRECT: readonly [RegExp, string][] = [
  [/^#[0-9a-f]{3,8}$/i, "<color>"],
  [/^(rgb|rgba|hsl|hsla|hwb|lab|lch|oklab|oklch|color)\(/i, "<color>"],
  [/^transparent$/i, "<color>"],
  [/^url\(/i, "<image>"],
];

// Single-token numeric-with-unit matches, checked only when the value has no whitespace/commas.
const SYNTAX_TYPED: readonly [RegExp, string][] = [
  [/^-?\d*\.?\d+%$/, "<percentage>"],
  [new RegExp(`^-?\\d*\\.?\\d+(${ABSOLUTE_LENGTH_UNITS})$`, "i"), "<length>"],
  [/^-?\d*\.?\d+(deg|grad|rad|turn)$/i, "<angle>"],
  [/^-?\d*\.?\d+(s|ms)$/i, "<time>"],
  [/^-?\d*\.?\d+(dpi|dpcm|dppx)$/i, "<resolution>"],
  [/^-?\d+$/, "<integer>"],
  [/^-?\d*\.?\d+$/, "<number>"],
];

/**
 * Sniff the CSS `@property` `syntax` a concrete token should register under. Tokens Studio
 * `type`s don't map 1:1 to CSS syntax, so the value is inspected. Returns `"*"` (universal) for
 * anything that isn't a single, computationally-independent typed token.
 *
 * @param value - A concrete value (no `var()` / `light-dark()`).
 * @returns The `@property` syntax descriptor.
 *
 * @example Typed single-token values
 * ```ts
 * import { cssSyntaxForValue } from "@pantoken/core";
 *
 * cssSyntaxForValue("#03893D"); // → "<color>"
 * cssSyntaxForValue("2px");     // → "<length>"
 * cssSyntaxForValue("50%");     // → "<percentage>"
 * cssSyntaxForValue("400");     // → "<integer>"
 * ```
 *
 * @example Font-relative units and complex values fall back to universal
 * ```ts
 * import { cssSyntaxForValue } from "@pantoken/core";
 *
 * cssSyntaxForValue("1rem");                     // → "*" (rem isn't computationally independent)
 * cssSyntaxForValue("Lato, Helvetica, sans-serif"); // → "*"
 * cssSyntaxForValue("currentColor");             // → "*"
 * ```
 */
export function cssSyntaxForValue(value: string): string {
  const v = value.trim();

  for (const [re, syntax] of SYNTAX_DIRECT) if (re.test(v)) return syntax;

  // Single typed token only — anything with whitespace/commas (font stacks, shorthands,
  // gradients, keywords like `solid`/`none`/`currentColor`) is universal.
  if (!/[\s,]/.test(v)) {
    for (const [re, syntax] of SYNTAX_TYPED) if (re.test(v)) return syntax;
  }

  return "*";
}

/**
 * True when a value cannot be a typed `@property` initial-value (`var()` / `light-dark()`).
 *
 * @example
 * ```ts
 * import { isContextual } from "@pantoken/core";
 *
 * isContextual("var(--x)");            // → true
 * isContextual("light-dark(#fff, #000)"); // → true
 * isContextual("#fff");                // → false
 * ```
 */
export function isContextual(value: string): boolean {
  return /var\(|light-dark\(/.test(value);
}

/**
 * Icon colour values that exist nowhere else in the generated tokens.
 *
 * - `inherit`: the CSS `currentColor` keyword.
 * - `ai`: a gradient composed from two `aiSecondary` gradient icon-colour tokens.
 *
 * @example
 * ```ts
 * import { ICON_COLOR_SPECIAL_VALUES } from "@pantoken/core";
 *
 * ICON_COLOR_SPECIAL_VALUES.inherit; // → "currentColor"
 * ICON_COLOR_SPECIAL_VALUES.ai;      // → "linear-gradient(180deg, var(--instui-…) 0%, …)"
 * ```
 */
export const ICON_COLOR_SPECIAL_VALUES: Readonly<Record<string, string>> = Object.freeze({
  ai: `linear-gradient(180deg, var(--instui-color-icon-interactive-action-ai-secondary-top-gradient-base) 0%, var(--instui-color-icon-interactive-action-ai-secondary-bottom-gradient-base) 100%)`,
  inherit: "currentColor",
});
