import { byTheme } from "@pantoken/tokens";
import type { Theme, Token } from "@pantoken/model";

const ICON_TOKEN_PREFIX = "--instui-icon-";

function withoutIcons(tokens: readonly Token[]): Token[] {
  return tokens.filter((t) => !t.name.startsWith(ICON_TOKEN_PREFIX));
}

/** Split the top-level comma of a `light-dark(light, dark)` value; `null` when it isn't one. */
function splitLightDark(value: string): [string, string] | null {
  const trimmed = value.trim();
  if (!trimmed.startsWith("light-dark(") || !trimmed.endsWith(")")) return null;

  const inner = trimmed.slice("light-dark(".length, -1);
  let depth = 0;
  for (let i = 0; i < inner.length; i += 1) {
    const char = inner[i];
    if (char === "(") depth += 1;
    else if (char === ")") depth = Math.max(0, depth - 1);
    else if (char === "," && depth === 0) {
      return [inner.slice(0, i).trim(), inner.slice(i + 1).trim()];
    }
  }
  return null;
}

/** The light branch of a `light-dark()` value, or `null` when the value isn't one. */
export function lightBranch(value: string): string | null {
  return splitLightDark(value)?.[0] ?? null;
}

/** The dark branch of a `light-dark()` value, or `null` when the value isn't one. */
export function darkBranch(value: string): string | null {
  return splitLightDark(value)?.[1] ?? null;
}

/** A color scheme a scope can be pinned to. */
export type Scheme = "light" | "dark";

function collapseScheme(tokens: readonly Token[], scheme: Scheme): Token[] {
  const pick = scheme === "light" ? lightBranch : darkBranch;
  return tokens.map((token) => {
    const branch = pick(token.value);
    if (!branch) return token;
    return { ...token, value: branch, themed: false };
  });
}

/**
 * The tokens whose value actually changes when a theme is pinned to `scheme` — i.e. the ones written
 * with `light-dark()`. This is the minimal forcing block for `[data-pantoken-scheme]`.
 */
export function schemeOverrideTokens(theme: Theme, scheme: Scheme): Token[] {
  const source = byTheme(theme);
  return collapseScheme(source, scheme).filter((token, i) => token.value !== source[i]?.value);
}

/** Build a theme token set with optional icon removal and light/dark collapse. */
export function themedTokens(
  theme: Theme,
  options?: { includeIcons?: boolean; lightOnly?: boolean; scheme?: Scheme },
): Token[] {
  const { includeIcons = true, lightOnly = false, scheme } = options ?? {};
  const pinned = scheme ?? (lightOnly ? "light" : undefined);
  const themeTokens = byTheme(theme);
  const modeTokens = pinned ? collapseScheme(themeTokens, pinned) : themeTokens;
  return includeIcons ? modeTokens : withoutIcons(modeTokens);
}
