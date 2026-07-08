import { defineUtility } from "../lib/define.ts";

export const mask = defineUtility({
  name: "mask",
  summary:
    "An in-flow overlay that fills its positioned parent and centres its content — e.g. a spinner over a card. For a modal, prefer a native `<dialog>` (its `::backdrop` is the mask).",
  examples: [
    `<div style="position: relative">
  <div class="instui-mask">
    <span class="instui-spinner"></span>
  </div>
</div>`,
  ],
  css: (p) => `
/* An in-flow overlay for non-modal cases (e.g. a spinner over a card). For a modal, prefer a native
   <dialog>: its ::backdrop is the mask and reuses the same \`--instui-component-mask-background-color\`
   token (see modalRules). */
.${p}mask {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--instui-component-mask-background-color);
}
.${p}mask.-fullscreen { position: fixed; z-index: 999; }
.${p}mask.-blur { backdrop-filter: blur(0.5rem); }`,
});

export const maskCss = mask.css;
