/**
 * The Instructure Pendo-guide component CSS, ported verbatim from
 * `@instructure/pendo-global-css` (`src/css/`, MIT, same org). Each component keeps its
 * original authored rules targeting Pendo's guide DOM (`._pendo-*`); only the assembly (cascade
 * `@layer` order + token source) is pantoken's. The CSS is inlined into `generated/embedded.ts` by
 * `scripts/embed.ts` — the published package carries no runtime file reads.
 *
 * @module
 */
import {
  alertCss,
  buttonCss,
  cardCss,
  chromeCss,
  closeButtonCss,
  paginationCss,
  popoverCss,
  radioGroupCss,
  selectCss,
  textCss,
  textareaCss,
  varsCss,
} from "../generated/embedded.ts";

/** The `--pendo-*` local aliases, override tokens, and logo references. */
export const PENDO_VARS_CSS: string = varsCss;

/**
 * Cascade order (lowest → highest), from the source `layers.css`. Layered `!important` beats Pendo's
 * own unlayered `!important`, so guide styles stay on top.
 */
export const LAYER_ORDER = [
  "tokens",
  "elevation",
  "popover",
  "alert",
  "text",
  "closeButton",
  "chrome",
  "inputs",
  "button",
  "pagination",
  "card",
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
  { layer: "popover", css: popoverCss },
  { layer: "alert", css: alertCss },
  { layer: "text", css: textCss },
  { layer: "closeButton", css: closeButtonCss },
  { layer: "chrome", css: chromeCss },
  { layer: "inputs", css: [textareaCss, selectCss, radioGroupCss].join("\n") },
  { layer: "button", css: buttonCss },
  { layer: "pagination", css: paginationCss },
  { layer: "card", css: cardCss },
];
