import { defineComponent } from "../lib/define.ts";

export const contextView = defineComponent({
  name: "context-view",
  css: (p) => {
    const root = `.${p}context-view`;
    const cv = (s: string): string => `var(--instui-component-context-view-${s})`;
    return `
/**
 * @component context-view
 * @summary An elevated callout with a caret, positionable on any side; works as a native \`[popover]\`.
 * @modifier -color-inverse — Dark (inverse) colour scheme.
 * @modifier -placement-top — Sit above the anchor.
 * @modifier -placement-bottom — Sit below the anchor.
 * @modifier -placement-start — Sit at the start (inline-start) of the anchor.
 * @modifier -placement-end — Sit at the end (inline-end) of the anchor.
 * @cssstate open
 * @example
 * <div class="instui-context-view -placement-bottom" id="cv-popover">A context view frames a callout with a caret. As a popover it rides the top layer and closes when you click away or press Esc.</div>
 */
${root} {
  position: relative;
  display: inline-block;
  padding: var(--instui-spacing-space-md);
  background: var(--instui-color-background-elevated-surface-base);
  color: var(--instui-color-text-base);
  border: ${cv("arrow-border-width")} solid ${cv("arrow-border-color")};
  border-radius: ${cv("border-radius")};
  /* ContextView floats over content — InstUI gives it a shadow. */
  box-shadow: var(--instui-elevation-above);
}
/* The caret is two stacked triangles: ::before is the border (outer, one border-width larger) and
   ::after is the fill (inner). Both are anchored to the same edge so the border peeks around the fill —
   without it, a surface-coloured caret is invisible against a matching surface. */
${root}::before,
${root}::after {
  content: "";
  position: absolute;
  border-style: solid;
  border-color: transparent;
}
${root}::before { border-width: calc(${cv("arrow-size")} + ${cv("arrow-border-width")}); }
${root}::after { border-width: ${cv("arrow-size")}; }
/* Default placement="top": the view sits above its target, so the caret is on the bottom edge
   pointing down. */
${root}::before {
  top: 100%;
  inset-inline-start: calc(var(--instui-spacing-space-lg) - ${cv("arrow-border-width")});
  border-top-color: ${cv("arrow-border-color")};
}
${root}::after {
  top: 100%;
  inset-inline-start: var(--instui-spacing-space-lg);
  border-top-color: ${cv("arrow-background-color")};
}
/* placement="bottom": caret on the top edge, pointing up. */
${root}.-placement-bottom::before {
  top: auto;
  bottom: 100%;
  border-top-color: transparent;
  border-bottom-color: ${cv("arrow-border-color")};
}
${root}.-placement-bottom::after {
  top: auto;
  bottom: 100%;
  border-top-color: transparent;
  border-bottom-color: ${cv("arrow-background-color")};
}
/* placement="start": the view sits before its target, caret on the inline-end edge pointing toward it. */
${root}.-placement-start::before,
${root}.-placement-start::after {
  top: 50%;
  inset-inline-start: 100%;
  transform: translateY(-50%);
  border-top-color: transparent;
}
${root}.-placement-start::before { border-inline-start-color: ${cv("arrow-border-color")}; }
${root}.-placement-start::after { border-inline-start-color: ${cv("arrow-background-color")}; }
/* placement="end": the view sits after its target, caret on the inline-start edge pointing toward it. */
${root}.-placement-end::before,
${root}.-placement-end::after {
  top: 50%;
  inset-inline-start: auto;
  inset-inline-end: 100%;
  transform: translateY(-50%);
  border-top-color: transparent;
}
${root}.-placement-end::before { border-inline-end-color: ${cv("arrow-border-color")}; }
${root}.-placement-end::after { border-inline-end-color: ${cv("arrow-background-color")}; }
/* background="inverse": dark surface, inverse text, and inverse-coloured caret layers per placement. */
${root}.-color-inverse {
  background: var(--instui-color-background-inverse);
  color: var(--instui-color-text-inverse);
  border-color: ${cv("arrow-border-color-inverse")};
}
${root}.-color-inverse::before { border-top-color: ${cv("arrow-border-color-inverse")}; }
${root}.-color-inverse::after { border-top-color: ${cv("arrow-background-color-inverse")}; }
${root}.-color-inverse.-placement-bottom::before { border-top-color: transparent; border-bottom-color: ${cv("arrow-border-color-inverse")}; }
${root}.-color-inverse.-placement-bottom::after { border-top-color: transparent; border-bottom-color: ${cv("arrow-background-color-inverse")}; }
${root}.-color-inverse.-placement-start::before { border-top-color: transparent; border-inline-start-color: ${cv("arrow-border-color-inverse")}; }
${root}.-color-inverse.-placement-start::after { border-top-color: transparent; border-inline-start-color: ${cv("arrow-background-color-inverse")}; }
${root}.-color-inverse.-placement-end::before { border-top-color: transparent; border-inline-end-color: ${cv("arrow-border-color-inverse")}; }
${root}.-color-inverse.-placement-end::after { border-top-color: transparent; border-inline-end-color: ${cv("arrow-background-color-inverse")}; }
/* Popover use: as a [popover] the UA hides the element until it's opened, but the base \`display\`
   above out-ranks the UA \`[popover]:not(:popover-open){display:none}\` rule — so restore the hide here,
   and float it in the top layer when open. Position it at a trigger with CSS anchor positioning where
   supported; elsewhere the UA centres it. */
[popover]${root} { position: fixed; overflow: visible; margin: 0; }
[popover]${root}:not(:popover-open) { display: none; }
/* CSS anchor positioning (Chromium): with \`anchor-name: --pantoken-anchor\` on the trigger (or a
   popovertarget invoker's implicit anchor), the -placement-* modifier docks the caret side to the
   trigger and flips to stay on-screen. Inert elsewhere — the UA centres it in the top layer. */
@supports (position-area: block-end) {
  [popover]${root} {
    position-anchor: --pantoken-anchor;
    position-try-fallbacks: flip-block, flip-inline;
  }
  [popover]${root}.-placement-top { position-area: block-start; }
  [popover]${root}.-placement-bottom { position-area: block-end; }
  [popover]${root}.-placement-start { position-area: inline-start center; }
  [popover]${root}.-placement-end { position-area: inline-end center; }
}`;
  },
});

export const contextViewCss = contextView.css;
