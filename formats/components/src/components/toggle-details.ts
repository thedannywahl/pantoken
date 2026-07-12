import { defineComponent } from "../lib/define.ts";
import { CHEVRON_RIGHT_ICON } from "../lib/helpers.ts";

export const toggleDetails = defineComponent({
  name: "toggle-details",
  css: (p) => `
/**
 * @component toggle-details
 * @summary A styled native \`<details>\` disclosure with a rotating chevron.
 * @modifier -variant-filled — Filled (surface) variant.
 * @modifier -chevron-end — Place the chevron after the summary.
 * @modifier -size-sm — Small.
 * @modifier -size-lg — Large.
 * @cssstate open
 * @example
 * <details class="instui-toggle-details" open>
 *   <summary>What ships in this package?</summary>
 *   Class-based component styles, built from the Instructure tokens, plus a prose layer.
 * </details>
 */
.${p}toggle-details {
  color: var(--instui-component-toggle-details-text-color);
  font-family: var(--instui-component-toggle-details-font-family);
  font-weight: var(--instui-component-toggle-details-font-weight);
  line-height: var(--instui-component-toggle-details-line-height);
}
.${p}toggle-details > summary {
  display: flex;
  align-items: center;
  gap: var(--instui-component-toggle-details-icon-margin);
  cursor: pointer;
  list-style: none;
  font-size: var(--instui-component-toggle-details-font-size-medium);
  padding: var(--instui-component-toggle-details-toggle-padding);
  color: var(--instui-component-toggle-details-text-color);
}
/* Kill the native disclosure marker; we supply a rotating chevron. */
.${p}toggle-details > summary::-webkit-details-marker { display: none; }
.${p}toggle-details > summary::before {
  content: "";
  flex: none;
  inline-size: 1em;
  block-size: 1em;
  background: currentColor;
  -webkit-mask: ${CHEVRON_RIGHT_ICON};
  mask: ${CHEVRON_RIGHT_ICON};
  transition: transform 0.2s ease;
}
.${p}toggle-details[open] > summary::before { transform: rotate(90deg); }
/* iconPosition="end" (named -chevron-end, NOT -icon-position-end — a "-icon-" class would collide with the
   generic [class*="-icon-"] glyph painter): push the disclosure chevron to the inline-end. */
.${p}toggle-details.-chevron-end > summary::before { order: 1; margin-inline-start: auto; }
/* variant="filled": the summary reads as an action-secondary button. */
.${p}toggle-details.-variant-filled > summary {
  background: var(--instui-color-background-interactive-action-secondary-base);
  border-radius: var(--instui-component-toggle-details-toggle-border-radius);
}
.${p}toggle-details > :not(summary) {
  padding: var(--instui-component-toggle-details-content-padding-medium);
}
.${p}toggle-details.-size-sm > summary { font-size: var(--instui-component-toggle-details-font-size-small); }
.${p}toggle-details.-size-sm > :not(summary) { padding: var(--instui-component-toggle-details-content-padding-small); }
.${p}toggle-details.-size-lg > summary { font-size: var(--instui-component-toggle-details-font-size-large); }
.${p}toggle-details.-size-lg > :not(summary) { padding: var(--instui-component-toggle-details-content-padding-large); }`,
});

export const toggleDetailsCss = toggleDetails.css;
