import { defineComponent } from "../lib/define.ts";
import { css } from "../lib/css.ts";

export const tray = defineComponent({
  name: "tray",
  css: (p) => {
    const root = `.${p}tray`;
    const w = (k: string): string => `var(--instui-component-tray-width-${k})`;
    // prettier-ignore
    return css`
/**
 * @component tray
 * @summary An edge-pinned panel that slides in from any side; a native \`[popover]\` or \`<dialog>\`.
 * @modifier -placement-top — Pin to the top edge.
 * @modifier -placement-bottom — Pin to the bottom edge.
 * @modifier -placement-end — Pin to the end (inline-end) edge.
 * @modifier -size-xs — Extra small.
 * @modifier -size-sm — Small.
 * @modifier -size-lg — Large.
 * @modifier -size-xl — Extra large.
 * @compat Opens with the native \`[popover]\` API and \`@starting-style\`; the slide-in sits behind an \`@supports (transition-behavior: allow-discrete)\` guard, so browsers without it still open the tray, just without the slide.
 * @accessibility The tray is a dialog or popover surface, so name it with \`aria-label\` or \`aria-labelledby\`, and its close control carries an \`aria-label\` (the \`.instui-close-button\` in the example uses \`aria-label="Close"\`).
 * @example
 * <div class="instui-tray -size-sm" id="tray-start">
 *   <div>
 *     <strong>Filters</strong>
 *     <button class="instui-close-button" aria-label="Close"></button>
 *   </div>
 *   <p class="instui-text -size-sm">A tray slides in from the start edge and fills the viewport height.</p>
 * </div>
 * @structure
 * .instui-tray.-size-sm {
 *   div {
 *     strong {}
 *     .instui-close-button {}
 *   }
 *   .instui-text.-size-sm {}
 * }
 * @related modal — The same dismissible overlay pattern, centred instead of edge-pinned.
 * @related popover — The generic top-layer surface this builds on.
 */
${root} {
  position: fixed;
  inset-block: 0;
  inset-inline-start: 0;
  inline-size: ${w("md")};
  max-inline-size: 100%;
  /* block-size:auto lets inset-block:0 stretch it full height, overriding the UA popover's
     height:fit-content; so the edge shadows fall outside the viewport. */
  block-size: auto;
  max-block-size: none;
  background: var(--instui-component-tray-background-color);
  border: var(--instui-component-tray-border-width) solid var(--instui-component-tray-border-color);
  padding: var(--instui-component-tray-padding);
  z-index: var(--instui-component-tray-z-index);
  box-shadow: var(--instui-elevation-topmost);
}
${root}.-placement-end { inset-inline: auto 0; }
${root}.-placement-top { inset: 0 0 auto 0; inline-size: 100%; block-size: auto; }
${root}.-placement-bottom { inset: auto 0 0 0; inline-size: 100%; block-size: auto; }
${root}.-size-xs { inline-size: ${w("xs")}; }
${root}.-size-sm { inline-size: ${w("sm")}; }
${root}.-size-lg { inline-size: ${w("lg")}; }
${root}.-size-xl { inline-size: ${w("xl")}; }
[popover]${root} { margin: 0; }
dialog${root} { margin: 0; padding: var(--instui-component-tray-padding); border: var(--instui-component-tray-border-width) solid var(--instui-component-tray-border-color); }
/* Slide in from the docked edge on open (native popover + @starting-style, no JS). The transform is
   keyed to placement; inert where allow-discrete transitions aren't supported. */
@supports (transition-behavior: allow-discrete) {
  [popover]${root} {
    transition: transform 0.2s ease, overlay 0.2s allow-discrete, display 0.2s allow-discrete;
    transform: translateX(0);
  }
  [popover]${root}:not(:popover-open) { transform: translateX(-100%); }
  @starting-style { [popover]${root}:popover-open { transform: translateX(-100%); } }
  [popover]${root}.-placement-end:not(:popover-open) { transform: translateX(100%); }
  @starting-style { [popover]${root}.-placement-end:popover-open { transform: translateX(100%); } }
  [popover]${root}.-placement-top:not(:popover-open) { transform: translateY(-100%); }
  @starting-style { [popover]${root}.-placement-top:popover-open { transform: translateY(-100%); } }
  [popover]${root}.-placement-bottom:not(:popover-open) { transform: translateY(100%); }
  @starting-style { [popover]${root}.-placement-bottom:popover-open { transform: translateY(100%); } }
}`;
  },
});

export const trayCss = tray.css;
