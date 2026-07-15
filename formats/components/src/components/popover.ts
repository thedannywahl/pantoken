import { defineComponent } from "../lib/define.ts";
import { css } from "../lib/css.ts";

export const popover = defineComponent({
  name: "popover",
  css: (p) => {
    const root = `.${p}popover`;
    // prettier-ignore
    return css`
/**
 * @component popover
 * @summary An elevated surface for a native \`[popover]\`, positioned with CSS anchor positioning.
 * @modifier -placement-top — Sit above the anchor.
 * @modifier -placement-bottom — Sit below the anchor.
 * @modifier -placement-start — Sit at the start (inline-start) of the anchor.
 * @modifier -placement-end — Sit at the end (inline-end) of the anchor.
 * @compat Uses CSS anchor positioning (\`position-anchor\`/\`position-area\`) and the native \`[popover]\` API, both Chromium-only today; an \`@supports\` guard keeps the placement inert elsewhere, where the UA centres the popover in the top layer.
 * @example
 * <div class="${p}popover -placement-bottom" id="pop-1">
 *   <div class="${p}heading -level-h4">Share this page</div>
 *   <p class="${p}text -size-sm">A popover is a lightweight surface anchored to a trigger. This one uses the native <code>popover</code> attribute.</p>
 * </div>
 * @structure
 * .${p}popover {
 *   .${p}heading {}
 *   .${p}text {
 *     code {}
 *   }
 * }
 * @related tooltip — A tooltip is a smaller, hover- or focus-triggered anchored surface.
 * @related context-view — Context view is a related anchored surface with a pointer.
 */
${root} {
  background: var(--instui-color-background-elevated-surface-base);
  color: var(--instui-color-text-base);
  border: var(--instui-border-width-sm) solid var(--instui-component-popover-border-color);
  border-radius: var(--instui-component-popover-border-radius);
  padding: var(--instui-spacing-space-sm);
  box-shadow: var(--instui-elevation-above);
}
[popover]${root} { margin: 0; }
/* CSS anchor positioning (Chromium): if the trigger declares \`anchor-name: --pantoken-anchor\` (or the
   popover is opened via a popovertarget invoker, which supplies an implicit anchor), the -placement-*
   modifier places it beside the trigger and it flips to stay on-screen. Inert where unsupported — the UA
   then centres the popover in the top layer. */
@supports (position-area: block-end) {
  [popover]${root} {
    position-anchor: --pantoken-anchor;
    position-try-fallbacks: flip-block, flip-inline;
  }
  [popover]${root}.-placement-top { position-area: block-start; }
  [popover]${root}.-placement-bottom { position-area: block-end; }
  [popover]${root}.-placement-start { position-area: inline-start center; }
  [popover]${root}.-placement-end { position-area: inline-end center; }
}
/* A gentle open animation (native popover + @starting-style, no JS). Inert where unsupported. */
@supports (transition-behavior: allow-discrete) {
  [popover]${root} {
    transition: opacity 0.15s ease, transform 0.15s ease, overlay 0.15s allow-discrete, display 0.15s allow-discrete;
    opacity: 1;
    transform: translateY(0);
  }
  [popover]${root}:not(:popover-open) { opacity: 0; transform: translateY(-0.25rem); }
  @starting-style {
    [popover]${root}:popover-open { opacity: 0; transform: translateY(-0.25rem); }
  }
}`;
  },
});

export const popoverCss = popover.css;
