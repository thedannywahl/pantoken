/**
 * The focus-outline system — the InstUI focus ring, intrinsic to `base.css` so every focusable gets it
 * out of the box when pantoken owns the page. The resting element carries a transparent ring + a
 * transition, and `:focus-visible` reveals the colour and grows the offset. All rules are
 * zero-specificity `:where()`, so any component style overrides without `!important`.
 *
 * This is the one documented `@declaration` record, but it can't use `defineDeclaration` (its CSS is a
 * token block on one selector plus ring rules on another). Instead it exposes {@link focusOutlineCss}
 * (the bespoke builder `base.css` calls directly) and a {@link Definition}-shaped {@link focus} object
 * so the registry + `validate()` can treat it uniformly.
 *
 * @module
 */
import { focusOutlineDeclarations, focusOutlineRules } from "@pantoken/utils";
import { css } from "../lib/css.ts";
import type { Definition } from "../lib/define.ts";

// The pure focus-ring builders (`--instui-focus-outline-*` defs, the `:where()` ring rules, the
// focusable selector) now live in `@pantoken/utils`, so the token sheet (`@pantoken/css`) can emit the
// `:root` defs without depending on this package. Re-exported here so the `@pantoken/components` public
// surface is unchanged. This file keeps the cssdoc doc block, the header-wrapped `focusOutlineCss`, and
// the registry `Definition`.
export { FOCUSABLE_SELECTOR, focusOutlineDeclarations, focusOutlineRules } from "@pantoken/utils";

/** The focus declaration's cssdoc doc comment (authored inline; the CSS body follows in {@link focusOutlineCss}). */
// prettier-ignore
const FOCUS_DOC = css`/**
 * @declaration focus
 * @class :focus-visible
 * @summary The focus-outline system: the \`--instui-focus-outline-*\` custom properties (declared on \`:root\`) plus the \`:focus-visible\` ring every focusable gets, and opt-in tuning classes.
 * @modifier -focus-color-success — Success-coloured ring.
 * @modifier -focus-color-danger — Danger-coloured ring.
 * @modifier -focus-color-inverse — Inverse (on-dark) ring.
 * @modifier -focus-position-inset — Draw the ring inset, inside the element's edge.
 * @modifier -focus-within — Ring the element while a descendant is focused.
 * @modifier -without-focus-animation — Disable the ring's grow-in animation.
 * @cssproperty --instui-focus-outline-color — The ring colour once focus is visible (the themed info colour).
 * @cssproperty --instui-focus-outline-color-start — The resting, transparent ring colour the outline transitions from.
 * @cssproperty --instui-focus-outline-width — The outline width of the ring.
 * @cssproperty --instui-focus-outline-offset — The gap between the element's edge and the ring when focused.
 * @cssproperty --instui-focus-outline-radius — The ring's corner radius when focused.
 * @cssproperty --instui-focus-outline-style — The outline line style (solid).
 * @cssproperty --instui-focus-outline-transition — The transition that animates the ring's colour and offset in.
 * @cssproperty --instui-focus-outline-color-success — The ring colour for the \`-focus-color-success\` modifier.
 * @cssproperty --instui-focus-outline-color-danger — The ring colour for the \`-focus-color-danger\` modifier.
 * @cssproperty --instui-focus-outline-color-inverse — The ring colour for the \`-focus-color-inverse\` (on-dark) modifier.
 * @cssproperty --instui-focus-outline-inset — The outline offset used when \`-focus-position-inset\` draws the ring inside the edge.
 * @a11y Every focusable element gets a \`:focus-visible\` outline ring so keyboard users can see what's focused.
 * @example
 * <button class="instui-button -focus-color-danger">Delete</button>
 * @demo self:focus-outline
 */`;

/**
 * Build the focus-outline block: the `--instui-focus-outline-*` token defs plus the ring rules.
 * Baked into `base.css` (so focusables get the ring out of the box), and reusable by other layered
 * outputs (e.g. the Pendo renderer) via the `selector`/`tokenSelector` options.
 *
 * @param options - `selector` — the focusable selector; `tokenSelector` — where the token defs land
 *   (default `:where(:root)`).
 * @returns The CSS string.
 *
 * @demo self:focus-outline
 */
export function focusOutlineCss(
  options: { selector?: string; tokenSelector?: string } = {},
): string {
  const tokenSelector = options.tokenSelector ?? ":where(:root)";
  const decls = focusOutlineDeclarations()
    .map(([name, value]) => `  ${name}: ${value};`)
    .join("\n");
  // prettier-ignore
  return css`${FOCUS_DOC}\n${tokenSelector} {\n${decls}\n}\n\n${focusOutlineRules(options.selector)}\n`;
}

/**
 * The {@link Definition}-shaped view of the focus declaration, so it can sit in the DECLARATIONS
 * registry and be checked by `validate()`. `css()`/`rules()` delegate to {@link focusOutlineCss} (its
 * default `instui`-prefixed output is a single well-formed declaration record).
 */
export const focus: Definition = {
  name: "focus",
  kind: "declaration",
  rules: () => focusOutlineCss(),
  css: () => focusOutlineCss(),
};
