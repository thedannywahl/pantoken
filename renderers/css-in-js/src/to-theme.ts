/**
 * Build a JS theme object for runtime CSS-in-JS libraries (Emotion, styled-components, Stitches).
 * Each token becomes a camelCased key. By default the value is a `var(--instui-*)` reference, so the
 * object is a typed façade over the CSS custom properties — pair it with `@pantoken/css` and runtime
 * light/dark + high-contrast switching keeps working through the cascade. Pass `resolve` to bake
 * concrete single-mode values instead (for SSR without CSS variables). Icon tokens are skipped.
 *
 * @module
 */
import { camelCase, resolveTokens } from "@pantoken/utils";
import type { Mode } from "@pantoken/utils";
import type { Token } from "@pantoken/model";

export type { Mode } from "@pantoken/utils";

/**
 * Turn `--instui-color-background-brand` into `colorBackgroundBrand`.
 *
 * @example
 * ```ts
 * import { toThemeKey } from "@pantoken/css-in-js";
 *
 * toThemeKey("--instui-color-background-brand"); // "colorBackgroundBrand"
 * ```
 */
export function toThemeKey(name: string): string {
  return camelCase(name.replace(/^--instui-/, ""));
}

/** Options for {@link toStyledTheme}. */
export interface ToStyledThemeOptions {
  /**
   * Bake concrete values for this colour mode instead of `var(--instui-*)` references. Omit to keep
   * the theme var()-backed (the default — lets `@pantoken/css` drive runtime theme switching).
   */
  resolve?: Mode;
}

/** A CSS-in-JS theme object: camelCased token key → value. */
export type StyledTheme = Record<string, string>;

/**
 * Build a CSS-in-JS theme object from a token IR.
 *
 * @param tokens - The IR (e.g. from `@pantoken/tokens`).
 * @param options - {@link ToStyledThemeOptions}.
 * @returns The theme object, keyed by camelCased token name.
 *
 * @example var()-backed (light/dark flows through @pantoken/css)
 * ```ts
 * import { toStyledTheme } from "@pantoken/css-in-js";
 * import { tokens } from "@pantoken/tokens";
 *
 * const theme = toStyledTheme(tokens);
 * // theme.colorBackgroundBrand → "var(--instui-color-background-brand)"
 * ```
 *
 * @example Bake concrete single-mode values (for SSR without CSS variables)
 * ```ts
 * import { toStyledTheme } from "@pantoken/css-in-js";
 * import { tokens } from "@pantoken/tokens";
 *
 * const dark = toStyledTheme(tokens, { resolve: "dark" });
 * // dark.colorBackgroundBase → a concrete value, not a var()
 * ```
 */
export function toStyledTheme(
  tokens: readonly Token[],
  options: ToStyledThemeOptions = {},
): StyledTheme {
  const resolved = options.resolve ? resolveTokens(tokens, { mode: options.resolve }) : undefined;
  const theme: StyledTheme = {};
  for (const token of tokens) {
    if (token.meta?.kind === "icon") continue;
    theme[toThemeKey(token.name)] = resolved
      ? (resolved.get(token.name) ?? token.value)
      : `var(${token.name})`;
  }
  return theme;
}
