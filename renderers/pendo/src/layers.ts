/**
 * The Instructure Pendo-guide component CSS, ported verbatim from
 * `@instructure/pendo-global-css` (`src/themes/instui/`, MIT, same org). Each component keeps its
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
  closeButtonCss,
  imgCss,
  manualCss,
  maskCss,
  paginationCss,
  popoverCss,
  radioGroupCss,
  selectCss,
  textCss,
  textareaCss,
  videoCss,
  viewCss,
} from "../generated/embedded.ts";

/** The `--manual-*` extras + tokens InstUI doesn't ship (focus transitions, logos, TextArea dims). */
export const MANUAL_CSS: string = manualCss;

/**
 * Cascade order (lowest → highest), from the source `layers.css`. Layered `!important` beats Pendo's
 * own unlayered `!important`, so guide styles stay on top.
 */
export const LAYER_ORDER = [
  "tokens",
  "elevation",
  "icons",
  "popover",
  "alert",
  "text",
  "closeButton",
  "img",
  "inputs",
  "button",
  "pagination",
  "mask",
  "view",
  "card",
  "manual",
  // Declared LAST so its !important declarations are the lowest-priority focus layer — the delegated
  // ring is the baseline, and any component's own focus rules (earlier layers) still win.
  "focusOutline",
] as const;

/** A component's authored CSS and the cascade layer it belongs in. */
export interface ComponentLayer {
  layer: (typeof LAYER_ORDER)[number];
  css: string;
}

/** The component CSS in cascade order (the `tokens` and `manual` layers are handled separately). */
export const COMPONENTS: readonly ComponentLayer[] = [
  { layer: "icons", css: videoCss },
  { layer: "popover", css: popoverCss },
  { layer: "alert", css: alertCss },
  { layer: "text", css: textCss },
  { layer: "closeButton", css: closeButtonCss },
  { layer: "img", css: imgCss },
  { layer: "inputs", css: [textareaCss, selectCss, radioGroupCss].join("\n") },
  { layer: "button", css: buttonCss },
  { layer: "pagination", css: paginationCss },
  { layer: "mask", css: maskCss },
  { layer: "view", css: viewCss },
  { layer: "card", css: cardCss },
];
