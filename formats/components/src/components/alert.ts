import { defineComponent } from "../lib/define.ts";

export const alert = defineComponent({
  name: "alert",
  css: (p) => `
/**
 * @component alert
 * @summary An inline message with a status colour bar and a masked status glyph from the shared icon set.
 * @remarks A custom \`-icon-<name>\` swaps the status glyph but keeps the variant's coloured bar; the bar fill is re-asserted at higher specificity so the shared icon painter doesn't consume it.
 * @modifier -color-info — Informational (default).
 * @modifier -color-success — A positive/confirmation message.
 * @modifier -color-warning — A cautionary message.
 * @modifier -color-danger — An error message.
 * @modifier -without-shadow — Remove the default elevation shadow (InstUI \`hasShadow={false}\`).
 * @modifier -has-shadow-false — @deprecated {@link -without-shadow}
 * @modifier -screen-reader-only — Visually hidden but announced.
 * @modifier -variant-info — @deprecated {@link -color-info}
 * @modifier -variant-success — @deprecated {@link -color-success}
 * @modifier -variant-warning — @deprecated {@link -color-warning}
 * @modifier -variant-error — @deprecated {@link -color-danger}
 * @modifier -icon-<name> — Swap the status glyph for a custom icon (e.g. \`-icon-megaphone\`), kept white on the variant's coloured bar.
 * @modifier -render-custom-icon-<name> — @deprecated The former \`renderCustomIcon\` prop; still works as an alias, but use \`-icon-<name>\` (or override \`--pantoken-alert-glyph\`) instead.
 * @cssproperty --pantoken-alert-glyph <url> — The low-level status-glyph source; \`-icon-<name>\` sets it for you. Override for a custom icon (a url-encoded SVG).
 * @cssproperty --pantoken-alert-icon-bg <color> — The coloured status-bar fill behind the glyph; each \`-color-*\` variant sets its own.
 * @accessibility For an important message, add \`role="alert"\` or an \`aria-live\` region so assistive tech announces it; the dismiss control is a labelled close button (the \`.instui-close-button\` in the example carries \`aria-label="Close"\`).
 * @example
 * <div class="instui-alert -color-info">
 *   Dismissable with <code>transition="fade"</code> — I fade out when closed.
 *   <button class="instui-close-button -size-sm" aria-label="Close"></button>
 * </div>
 * @structure
 * .instui-alert.-color-info {
 *   code {}
 *   .instui-close-button.-size-sm {}
 * }
 * @demo self:alert
 */
.${p}alert {
  position: relative;
  min-inline-size: 12rem;
  padding: var(--instui-component-alert-content-padding-vertical) var(--instui-component-alert-content-padding-horizontal);
  padding-inline-start: calc(2.5rem + var(--instui-component-alert-content-padding-horizontal));
  background: var(--instui-component-alert-background);
  color: var(--instui-component-alert-color);
  border: var(--instui-component-alert-border-width) var(--instui-component-alert-border-style) var(--instui-component-alert-info-border-color);
  border-radius: var(--instui-component-alert-border-radius);
  /* Elevated by default (InstUI's hasShadow defaults to true); -without-shadow opts out. */
  box-shadow: var(--instui-elevation-above);
  font-family: var(--instui-component-alert-content-font-family);
  font-size: var(--instui-component-alert-content-font-size);
  font-weight: var(--instui-component-alert-content-font-weight);
  line-height: var(--instui-component-alert-content-line-height);
  --pantoken-alert-icon-bg: var(--instui-component-alert-info-icon-background);
  --pantoken-alert-glyph: var(--instui-icon-info);
}
/* The solid variant-coloured bar, flush to the rounded left edge (overlapping the border). */
.${p}alert::before {
  content: "";
  position: absolute;
  inset-block: calc(-1 * var(--instui-component-alert-border-width));
  inset-inline-start: calc(-1 * var(--instui-component-alert-border-width));
  inline-size: 2.5rem;
  border-start-start-radius: var(--instui-component-alert-border-radius);
  border-end-start-radius: var(--instui-component-alert-border-radius);
  background: var(--pantoken-alert-icon-bg);
}
/* The white variant glyph, centred over the bar (masked, so it takes the icon-colour token). */
.${p}alert::after {
  content: "";
  position: absolute;
  inset-block: 0;
  inset-inline-start: 0;
  inline-size: 2.5rem;
  background: var(--instui-component-alert-icon-color);
  -webkit-mask: var(--pantoken-alert-glyph) center / 1.125rem no-repeat;
  mask: var(--pantoken-alert-glyph) center / 1.125rem no-repeat;
}
/* Close/dismiss is optional: pin it in the top-end corner (the button's own box centres the ×, so it
   takes a small symmetric inset, not the content padding), and reserve room only when it's present. */
.${p}alert > .${p}close-button {
  position: absolute;
  inset-block-start: var(--instui-spacing-space-xs);
  inset-inline-end: var(--instui-spacing-space-xs);
}
.${p}alert:has(> .${p}close-button) {
  padding-inline-end: calc(var(--instui-component-base-button-medium-height) + var(--instui-spacing-space-xs));
}
/* Opt out of the default elevation (InstUI's hasShadow={false}). */
.${p}alert.-without-shadow { box-shadow: none; }
/* screenReaderOnly: announced to assistive tech, but visually hidden. */
.${p}alert.-screen-reader-only {
  position: absolute;
  inline-size: 1px;
  block-size: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
}
.${p}alert.-color-info { border-color: var(--instui-component-alert-info-border-color); }
.${p}alert.-color-success {
  border-color: var(--instui-component-alert-success-border-color);
  --pantoken-alert-icon-bg: var(--instui-component-alert-success-icon-background);
  --pantoken-alert-glyph: var(--instui-icon-circle-check);
}
.${p}alert.-color-warning {
  border-color: var(--instui-component-alert-warning-border-color);
  --pantoken-alert-icon-bg: var(--instui-component-alert-warning-icon-background);
  --pantoken-alert-glyph: var(--instui-icon-triangle-alert);
}
.${p}alert.-color-danger {
  border-color: var(--instui-component-alert-danger-border-color);
  --pantoken-alert-icon-bg: var(--instui-component-alert-danger-icon-background);
  --pantoken-alert-glyph: var(--instui-icon-circle-x);
}
/* A custom \`-icon-<name>\` on the alert swaps the status glyph (still drawn white over the coloured
   bar), keeping the variant's bar colour. Last, so it wins over the per-variant glyph above. The
   generic icon painter also targets \`[class*="-icon-"]::before\` at equal specificity and later in the
   sheet — it would consume the bar — so re-assert the bar here at higher specificity. */
.${p}alert[class*="-icon-"] { --pantoken-alert-glyph: var(--pantoken-glyph); }
.${p}alert[class*="-icon-"]::before {
  inline-size: 2.5rem;
  block-size: auto;
  background: var(--pantoken-alert-icon-bg);
  -webkit-mask: none;
  mask: none;
}`,
});

export const alertCss = alert.css;
