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
import { definePlugin } from "@pantoken/plugin-kit";
import { tokens } from "@pantoken/tokens";
import { elevationDeclarations, focusOutlineDeclarations } from "@pantoken/utils";
import { toCss } from "./to-css.ts";

export { toCss } from "./to-css.ts";
export type { ToCssOptions } from "./to-css.ts";
export { buildCssFile } from "./emit.ts";
export type { CssSection } from "./emit.ts";

/**
 * The elevation (`--instui-elevation-*`) and focus-outline (`--instui-focus-outline-*`) composite custom
 * properties. Their pure builders live in `@pantoken/utils`, so this package (which sits below
 * `@pantoken/components`) owns the emission without an upward dependency. The values are contextual
 * (`var(...)`), so they land as `:root` declarations in both the typed and lean builds.
 */
const foundationPlugin = definePlugin({
  name: "pantoken-foundation",
  css: () => ({
    marker: "pantoken foundation — elevation + focus-outline custom properties",
    declarations: [...elevationDeclarations(), ...focusOutlineDeclarations()],
  }),
});

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
export const css: string = toCss(tokens, { plugins: [foundationPlugin] });

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
export const leanCss: string = toCss(
  tokens.filter((t) => !t.name.startsWith(ICON_TOKEN_PREFIX)),
  { plugins: [foundationPlugin] },
);

export default css;
