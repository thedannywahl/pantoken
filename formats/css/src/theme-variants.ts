import { byTheme } from "@pantoken/tokens";
import type { Theme, Token } from "@pantoken/model";

const ICON_TOKEN_PREFIX = "--instui-icon-";

function withoutIcons(tokens: readonly Token[]): Token[] {
  return tokens.filter((t) => !t.name.startsWith(ICON_TOKEN_PREFIX));
}

function lightBranch(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed.startsWith("light-dark(") || !trimmed.endsWith(")")) return null;

  const inner = trimmed.slice("light-dark(".length, -1);
  let depth = 0;
  for (let i = 0; i < inner.length; i += 1) {
    const char = inner[i];
    if (char === "(") depth += 1;
    else if (char === ")") depth = Math.max(0, depth - 1);
    else if (char === "," && depth === 0) return inner.slice(0, i).trim();
  }
  return null;
}

function rebrandLightOnly(tokens: readonly Token[]): Token[] {
  return tokens.map((token) => {
    const light = lightBranch(token.value);
    if (!light) return token;
    return { ...token, value: light, themed: false };
  });
}

export function themedTokens(
  theme: Theme,
  options?: { includeIcons?: boolean; lightOnly?: boolean },
): Token[] {
  const { includeIcons = true, lightOnly = false } = options ?? {};
  const themeTokens = byTheme(theme);
  const modeTokens = lightOnly ? rebrandLightOnly(themeTokens) : themeTokens;
  return includeIcons ? modeTokens : withoutIcons(modeTokens);
}
