/**
 * `@pantoken/react-native` — Instructure design tokens as React Native `StyleSheet`-friendly
 * objects. React Native has no CSS variables, so tokens are fully resolved to concrete values:
 * colours stay hex strings, dimensions become numbers (dp), and icons are excluded.
 *
 * @module
 */
import { tokens } from "@pantoken/tokens";
import { camelCase, resolveTokens } from "@pantoken/utils";

type Mode = "light" | "dark";

/** A React Native token value: a colour/string or a numeric dimension. */
export type RNTokenValue = string | number;

function build(mode: Mode): Record<string, RNTokenValue> {
  const resolved = resolveTokens(tokens, { mode: mode });
  const out: Record<string, RNTokenValue> = {};
  for (const token of tokens) {
    if (token.meta?.kind === "icon") continue;
    const value = (resolved.get(token.name) ?? token.value).trim();
    const dim = /^(-?\d*\.?\d+)(px|rem|em)?$/.exec(value);
    out[camelCase(token.name.replace(/^--instui-/, ""))] = dim
      ? Number(dim[1]) * (dim[2] === "rem" || dim[2] === "em" ? 16 : 1)
      : value;
  }
  return out;
}

/** The `light`-mode token object. */
export const light: Record<string, RNTokenValue> = build("light");

/** The `dark`-mode token object. */
export const dark: Record<string, RNTokenValue> = build("dark");

/**
 * Select the token object for a colour scheme (pair with RN's `useColorScheme`).
 *
 * @example
 * ```tsx
 * import { useColorScheme } from "react-native";
 * import { tokensForScheme } from "@pantoken/react-native";
 *
 * const t = tokensForScheme(useColorScheme());
 * const styles = { card: { backgroundColor: t.colorBackgroundBase, padding: t.spacingSpaceMd } };
 * ```
 */
export function tokensForScheme(
  scheme: "light" | "dark" | null | undefined,
): Record<string, RNTokenValue> {
  return scheme === "dark" ? dark : light;
}
