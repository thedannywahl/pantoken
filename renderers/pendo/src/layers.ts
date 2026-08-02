/**
 * The Instructure Pendo-guide component CSS, ported from `@instructure/pendo-global-css`
 * (MIT, same org) and extended with pantoken optimisations. The CSS is inlined into
 * `generated/embedded.ts` by `scripts/embed.ts` — the published package carries no runtime file reads.
 *
 * File map (7 source files → 5 cascade layers):
 *   container  ← container.css (alert + popover + survey layout variants)
 *   card       ← card.css (shared card shell + row layout)
 *   text       ← text.css
 *   chrome     ← chrome.css (backdrop, image, video, divider, close button)
 *   button     ← button.css
 *   inputs     ← inputs.css (textarea, select, radio group, number-scale/NPS)
 *
 * @module
 */
import {
  buttonCss,
  cardCss,
  chromeCss,
  containerCss,
  inputsCss,
  textCss,
  varsCss,
} from "../generated/embedded.ts";

/** The `--pendo-*` local aliases, override tokens, and logo references. */
export const PENDO_VARS_CSS: string = varsCss;

/**
 * Cascade order (lowest → highest). Layered `!important` beats Pendo's
 * own unlayered `!important`, so guide styles stay on top.
 */
export const LAYER_ORDER = [
  "tokens",
  "elevation",
  "container",
  "card",
  "text",
  "chrome",
  "button",
  "inputs",
  "vars",
  // Declared LAST so its !important declarations are the lowest-priority focus layer — the delegated
  // ring is the baseline, and any component's own focus rules (earlier layers) still win.
  "focusOutline",
] as const;

/** A component's authored CSS and the cascade layer it belongs in. */
export interface ComponentLayer {
  layer: (typeof LAYER_ORDER)[number];
  css: string;
}

/** The component CSS in cascade order (the `tokens` and `vars` layers are handled separately). */
export const COMPONENTS: readonly ComponentLayer[] = [
  { layer: "container", css: containerCss },
  { layer: "card", css: cardCss },
  { layer: "text", css: textCss },
  { layer: "chrome", css: chromeCss },
  { layer: "button", css: buttonCss },
  { layer: "inputs", css: inputsCss },
];
