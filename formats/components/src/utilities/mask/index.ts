/**
 * The mask utility — a global, dual copy of `mask`'s own modifiers (bare, or chained onto any
 * component), so the overlay effect doesn't require wrapping in a `.instui-mask` element.
 *
 * @module
 */
import { css } from "../../lib/css.ts";
import { defineUtility, type Definition } from "../../lib/define.ts";
import { globalSelectors } from "../../lib/global-alias.ts";

/** The mask utility — a global, dual copy of the `mask` component's own modifiers. */
export const maskUtility: Definition = defineUtility({
  name: "maskglobal",
  css: (p) => {
    const selectors = (name: string) =>
      globalSelectors(p, `.${p}mask-${name}`, `.-mask-${name}`).join(", ");

    const base = selectors("overlay");
    const fullscreen = selectors("fullscreen");
    const blur = selectors("blur");
    // prettier-ignore
    return css`/**
 * @utility maskglobal
 * @selector .instui-mask-overlay
 * @global
 * @summary A global, dual copy of the \`mask\` component's overlay modifiers — \`-mask-overlay\`, \`-mask-fullscreen\`, \`-mask-blur\` — usable bare or chained onto any component, without wrapping in a \`.instui-mask\` element.
 * @modifier -mask-overlay — The full mask overlay (position, centring, background).
 * @modifier -mask-fullscreen — Fixed to the viewport, covering it at a high z-index.
 * @modifier -mask-blur — Blur what's behind the mask with a backdrop-filter.
 * @example
 * <button class="instui-button -mask-overlay">…</button>
 */
${base} { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: var(--instui-component-mask-background-color); }
${fullscreen} { position: fixed; z-index: 999; }
${blur} { backdrop-filter: blur(0.5rem); }`;
  },
});

/** The mask utility as a standalone, header-wrapped stylesheet. */
export const maskUtilityCss: Definition["css"] = maskUtility.css;
