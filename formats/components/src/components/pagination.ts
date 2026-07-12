import { defineComponent } from "../lib/define.ts";
import { scope } from "../lib/helpers.ts";

export const pagination = defineComponent({
  name: "pagination",
  css: (p) => {
    const root = `.${p}pagination`;
    return `
/**
 * @component pagination
 * @summary Page navigation: numbered pages, first, previous, next, and last arrows, and an ellipsis for gaps.
 * @modifier -variant-input — Compact variant with a page-number input.
 * @part .page — A page link or button; the current page carries \`[aria-current]\`.
 * @part .arrow — A first, previous, next, or last control.
 * @part .ellipsis — The gap marker between page ranges.
 * @part .page-input-label — The label for the page-number input (input variant).
 * @example
 * <nav class="instui-pagination" aria-label="Pagination">
 *   <button class="arrow" type="button" aria-label="First page" disabled><span class="instui-icon -icon-chevrons-left"></span></button>
 *   <button class="arrow" type="button" aria-label="Previous page" disabled><span class="instui-icon -icon-chevron-left"></span></button>
 *   <a class="page" href="#" aria-current="page">1</a>
 *   <a class="page" href="#">2</a>
 *   <a class="page" href="#">3</a>
 *   <span class="ellipsis">…</span>
 *   <a class="page" href="#">12</a>
 *   <a class="arrow" href="#" aria-label="Next page"><span class="instui-icon -icon-chevron-right"></span></a>
 *   <a class="arrow" href="#" aria-label="Last page"><span class="instui-icon -icon-chevrons-right"></span></a>
 * </nav>
 * @structure
 * .instui-pagination
 *   .arrow
 *     .instui-icon.-icon-chevrons-left
 *   .page
 *   .ellipsis
 */
${root} {
  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--instui-component-pagination-page-indicator-gap);
  font-family: var(--instui-font-family-base);
}
${scope(
  root,
  `
/* A page number or a nav arrow — an <a> or <button>. Text-style primary button: brand text, no fill. */
.${p}pagination .page,
.${p}pagination .arrow {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-inline-size: 2rem;
  min-block-size: 2rem;
  padding: var(--instui-spacing-space2xs) var(--instui-spacing-space-xs);
  color: var(--instui-color-text-interactive-navigation-primary-base);
  background: transparent;
  border: var(--instui-border-width-md) solid transparent;
  border-radius: var(--instui-component-base-button-border-radius);
  font: inherit;
  font-weight: var(--instui-font-weight-interactive);
  text-decoration: none;
  cursor: pointer;
}
.${p}pagination .page:hover,
.${p}pagination .arrow:hover {
  background: var(--instui-color-background-muted);
  color: var(--instui-color-text-interactive-navigation-primary-hover);
}
/* The current page — a filled primary button (InstUI: color="primary" withBackground withBorder). */
.${p}pagination .page[aria-current],
.${p}pagination .page.-current {
  background: var(--instui-color-background-interactive-action-primary-base);
  color: var(--instui-color-text-interactive-action-primary-base);
  border-color: var(--instui-color-background-interactive-action-primary-base);
}
.${p}pagination .page[aria-current]:hover,
.${p}pagination .page.-current:hover {
  background: var(--instui-color-background-interactive-action-primary-hover);
  border-color: var(--instui-color-background-interactive-action-primary-hover);
  color: var(--instui-color-text-interactive-action-primary-base);
}
/* Disabled nav arrows (first/prev at page 1, etc.) — shown muted (InstUI showDisabledButtons). */
.${p}pagination .arrow:disabled,
.${p}pagination .arrow[aria-disabled="true"] {
  color: var(--instui-color-text-muted);
  background: transparent;
  opacity: var(--instui-opacity-disabled);
  cursor: not-allowed;
}
/* The truncation ellipsis — inert text. */
.${p}pagination .ellipsis {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-inline-size: 2rem;
  color: var(--instui-color-text-muted);
}
/* variant="input" label ("Page … of N"). */
.${p}pagination .page-input-label { color: var(--instui-component-pagination-page-input-label-color); }
`,
  ["page", "arrow", "ellipsis", "page-input-label"],
)}
/* variant="input": a "Page [n] of N" jumper (the input width + spacing come from the page-input tokens). */
${root}.-variant-input { gap: var(--instui-component-pagination-page-input-input-spacing); }
${root}.-variant-input .${p}text-input,
${root}.-variant-input .${p}number-input { inline-size: var(--instui-component-pagination-page-input-input-width); }`;
  },
});

export const paginationCss = pagination.css;
