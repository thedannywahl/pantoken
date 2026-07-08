import { defineComponent } from "../lib/define.ts";

export const popover = defineComponent({
  name: "popover",
  summary: "An elevated surface for a native `[popover]`, positioned with CSS anchor positioning.",
  modifiers: [
    { name: "-placement-top", description: "Sit above the anchor." },
    { name: "-placement-bottom", description: "Sit below the anchor." },
    { name: "-placement-start", description: "Sit at the start (inline-start) of the anchor." },
    { name: "-placement-end", description: "Sit at the end (inline-end) of the anchor." },
  ],
  examples: [
    `<div class="instui-popover -placement-bottom" id="pop-1">
  <div class="instui-heading -level-h4">Share this page</div>
  <p class="instui-text -size-sm">A popover is a lightweight surface anchored to a trigger. This one uses the native <code>popover</code> attribute.</p>
</div>`,
  ],
  structure: `.instui-popover.-placement-bottom
  .instui-heading.-level-h4
  .instui-text.-size-sm
    code`,
  css: (p) => {
    const root = `.${p}popover`;
    return `
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
