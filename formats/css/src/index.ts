/**
 * `@pantoken/css` — emit Instructure design tokens as `@property`-typed CSS.
 *
 * {@link toCss} turns any token IR into CSS; {@link css} is the ready-made `rebrand` stylesheet.
 * A DOM side-effect entry lives at `@pantoken/css/inject`, and a static file at
 * `@pantoken/css/style.css`.
 *
 * @module
 */
import { tokens } from "@pantoken/tokens";
import { toCss } from "./to-css.ts";

export { toCss } from "./to-css.ts";
export type { ToCssOptions } from "./to-css.ts";
export { buildCssFile } from "./emit.ts";
export type { CssSection } from "./emit.ts";

/**
 * The ready-made `rebrand` stylesheet string.
 *
 * @example
 * ```ts
 * import { css } from "@pantoken/css";
 *
 * document.head.insertAdjacentHTML("beforeend", `<style>${css}</style>`);
 * ```
 */
export const css: string = toCss(tokens);

export default css;
