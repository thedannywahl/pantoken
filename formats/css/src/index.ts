/**
 * `@pantoken/css` — emit Instructure design tokens as `@property`-typed CSS.
 *
 * {@link toCss} turns any token IR into CSS; {@link css} is the ready-made `rebrand` stylesheet and
 * {@link leanCss} is a lean variant that drops the full `--instui-icon-*` set (the ~1,777 icon data-URIs
 * that dominate the sheet) for CDN/embed delivery — ~a sixth the size over the wire. Both carry the
 * elevation + focus-outline foundation (composite custom properties whose pure builders live in
 * `@pantoken/utils`), so a component sheet resolves its shadows and focus ring against the token sheet
 * alone. A DOM side-effect entry lives at `@pantoken/css/inject`; static files at
 * `@pantoken/css/style.css` and `@pantoken/css/style.lean.css`.
 *
 * @module
 * @beta
 */
import { byTheme } from "@pantoken/tokens";
import { foundationPlugin } from "./foundation.ts";
import { toCss } from "./to-css.ts";
import type { Theme, Token } from "@pantoken/model";

export { toCss } from "./to-css.ts";
export type { ToCssOptions } from "./to-css.ts";
export { buildCssFile } from "./emit.ts";
export type { CssSection } from "./emit.ts";

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

function themedCss(
  theme: Theme,
  options?: { includeIcons?: boolean; lightOnly?: boolean },
): string {
  const { includeIcons = true, lightOnly = false } = options ?? {};
  const themeTokens = byTheme(theme);
  const modeTokens = lightOnly ? rebrandLightOnly(themeTokens) : themeTokens;
  const baseTokens = includeIcons ? modeTokens : withoutIcons(modeTokens);
  return toCss(baseTokens, { plugins: [foundationPlugin] });
}

/**
 * The ready-made `rebrand` stylesheet string (typed: concrete tokens as `@property` registrations).
 *
 * @example
 * ```ts
 * import { css } from "@pantoken/css";
 *
 * document.head.insertAdjacentHTML("beforeend", `<style>${css}</style>`);
 * ```
 */
export const css: string = themedCss("rebrand");

/** The `--instui-icon-*` glyph tokens — the full icon set as data-URIs, ~86% of the sheet's bytes. */
const ICON_TOKEN_PREFIX = "--instui-icon-";

/**
 * The lean `rebrand` stylesheet string — the full sheet minus the `--instui-icon-*` glyph tokens (the
 * ~1,777 icon data-URIs that make up most of {@link css}). Roughly a sixth the size over the wire; the
 * recommended foundation for CDN/embed delivery. Components reference only a handful of icons, shipped
 * separately as `@pantoken/components`'s `component-icons.css`; consumers who use `var(--instui-icon-*)`
 * broadly should load the full {@link css} (or the `icons.css` glyph sheet). See
 * `@pantoken/css/style.lean.css`.
 *
 * @example
 * ```ts
 * import { leanCss } from "@pantoken/css";
 * ```
 */
export const leanCss: string = toCss(withoutIcons(byTheme("rebrand")), {
  plugins: [foundationPlugin],
});

export default css;
