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
import { foundationPlugin } from "./foundation.ts";
import { themedTokens } from "./theme-variants.ts";
import { toCss } from "./to-css.ts";
import type { Theme } from "@pantoken/model";

export { toCss } from "./to-css.ts";
export type { ToCssOptions } from "./to-css.ts";
export { buildCssFile } from "./emit.ts";
export type { CssSection } from "./emit.ts";

function themedCss(
  theme: Theme,
  options?: { includeIcons?: boolean; lightOnly?: boolean },
): string {
  return toCss(themedTokens(theme, options), { plugins: [foundationPlugin] });
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
export const leanCss: string = toCss(themedTokens("rebrand", { includeIcons: false }), {
  plugins: [foundationPlugin],
});

export default css;
