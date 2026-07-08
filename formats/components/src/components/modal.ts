import { defineComponent } from "../lib/define.ts";
import { scope } from "../lib/helpers.ts";

export const modal = defineComponent({
  name: "modal",
  summary: "A dialog surface (works on a native <dialog>); header/body/footer parts.",
  modifiers: [
    { name: "-size-sm", description: "A narrow modal." },
    { name: "-size-lg", description: "A wide modal." },
    { name: "-size-auto", description: "Sized to content." },
    { name: "-size-fullscreen", description: "Edge-to-edge." },
    { name: "-density-compact", description: "Tighter part padding." },
    { name: "-color-inverse", description: "On-dark chrome (pairs with a media body)." },
    { name: "-blur", description: "Blur the backdrop behind the modal." },
    { name: "-overflow-fit", description: "Constrain to the viewport and scroll the body." },
  ],
  parts: [
    { name: ".header", description: "The title row." },
    { name: ".body", description: "The content region (a lone <img> goes full-bleed)." },
    { name: ".footer", description: "The actions row." },
  ],
  examples: [
    `<dialog class="instui-modal -size-sm" id="modal-sm">
  <div class="header"><strong>Small</strong></div>
  <div class="body"><code>-size-sm</code> — a narrow modal.</div>
  <div class="footer">
    <button class="instui-button">Close</button>
  </div>
</dialog>`,
  ],
  structure: `.instui-modal.-size-sm
  .header
    strong
  .body
    code
  .footer
    .instui-button`,
  demo: "self:modal",
  css: (p) => {
    const root = `.${p}modal`;
    return `
${root} {
  max-width: var(--instui-component-modal-medium-max-width);
  background: var(--instui-component-modal-background-color);
  color: var(--instui-component-modal-text-color);
  border: var(--instui-component-modal-border-width) solid var(--instui-component-modal-border-color);
  border-radius: var(--instui-component-modal-border-radius);
  font-family: var(--instui-component-modal-font-family);
  overflow: hidden;
  /* Modals float above the page; the elevation tokens are defined at the top of components.css. */
  box-shadow: var(--instui-elevation-topmost);
}
/* On a native <dialog>, drop the UA padding and centre it; \`showModal()\` puts it in the top layer, so
   no z-index is needed. The dialog's ::backdrop IS the modal's mask — dim it with the Mask token; the
   optional -blur modifier frosts it (mirrors .${p}mask.-blur). */
dialog${root} { margin: auto; padding: 0; }
dialog${root}::backdrop { background: var(--instui-component-mask-background-color); }
dialog${root}.-blur::backdrop { backdrop-filter: blur(0.5rem); }
.${p}modal.-size-sm { max-width: var(--instui-component-modal-small-max-width); }
.${p}modal.-size-lg { max-width: var(--instui-component-modal-large-max-width); }
.${p}modal.-size-auto {
  max-width: none;
  min-width: var(--instui-component-modal-auto-min-width);
}
/* Fullscreen is truly edge-to-edge (InstUI has no inset). It pins itself fixed and stretches via
   inset:0 + auto sizing, overriding both a <dialog>'s UA \`width: fit-content\`/\`margin: auto\` and its
   \`:modal\` max-width cap, so it works on a native dialog or a plain positioned div. No rounded corners
   at the viewport edge. */
.${p}modal.-size-fullscreen {
  position: fixed;
  inset: 0;
  width: auto;
  height: auto;
  max-width: none;
  max-height: none;
  margin: 0;
  border-radius: 0;
}
/* overflow="fit" (InstUI): cap the modal to the viewport and scroll the body, so the header/footer
   stay pinned. The default (overflow="scroll") lets the whole modal grow and the overlay scroll. */
.${p}modal.-overflow-fit {
  display: flex;
  flex-direction: column;
  max-block-size: calc(100dvh - var(--instui-spacing-space-xl) * 2);
}
.${p}modal.-color-inverse {
  background: var(--instui-component-modal-inverse-background-color);
  color: var(--instui-component-modal-inverse-text-color);
  border-color: var(--instui-component-modal-inverse-border-color);
}
${scope(
  root,
  `
.${p}modal.-overflow-fit .body { overflow-y: auto; }
.${p}modal .header {
  padding: var(--instui-component-modal-header-padding);
  background: var(--instui-component-modal-header-background-color);
  border-bottom: var(--instui-component-modal-header-border-width) solid var(--instui-component-modal-header-border-color);
}
.${p}modal .body { padding: var(--instui-component-modal-body-padding); }
/* A media modal: when the body holds an image it goes full-bleed (no padding) so the media meets the
   modal edges. Pair with -color-inverse for the on-dark chrome InstUI uses around media. */
.${p}modal .body:has(> img) { padding: 0; }
.${p}modal .body:has(> img) img { display: block; width: 100%; }
.${p}modal .footer {
  padding: var(--instui-component-modal-footer-padding);
  background: var(--instui-component-modal-footer-background-color);
  border-top: var(--instui-component-modal-footer-border-width) solid var(--instui-component-modal-footer-border-color);
  border-radius: 0 0 var(--instui-component-modal-footer-border-radius) var(--instui-component-modal-footer-border-radius);
}
.${p}modal.-density-compact .header { padding: var(--instui-component-modal-header-padding-compact); }
.${p}modal.-density-compact .body { padding: var(--instui-component-modal-body-padding-compact); }
.${p}modal.-density-compact .footer { padding: var(--instui-component-modal-footer-padding-compact); }
.${p}modal.-color-inverse .header {
  background: var(--instui-component-modal-header-inverse-background-color);
  border-bottom-color: var(--instui-component-modal-header-inverse-border-color);
}
.${p}modal.-color-inverse .body { background: var(--instui-component-modal-body-inverse-background-color); }
.${p}modal.-color-inverse .footer {
  background: var(--instui-component-modal-footer-inverse-background-color);
  border-top-color: var(--instui-component-modal-footer-inverse-border-color);
}
`,
  ["header", "body", "footer"],
)}`;
  },
});

export const modalCss = modal.css;
