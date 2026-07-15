import { defineComponent } from "../lib/define.ts";
import { css } from "../lib/css.ts";
import { CLOSE_ICON } from "../lib/helpers.ts";

export const closeButton = defineComponent({
  name: "close-button",
  css: (p) =>
    // prettier-ignore
    css`
/**
 * @component close-button
 * @summary A transparent icon button that draws its own × glyph, in three sizes plus an inverse variant.
 * @modifier -color-inverse — For dark backgrounds.
 * @modifier -size-sm — Small.
 * @modifier -size-lg — Large.
 * @pseudo ::before — The × glyph, masked in \`currentColor\`.
 * @a11y Give the icon-only button an \`aria-label\` (e.g. "Close").
 * @example
 * <button class="instui-close-button -size-sm" aria-label="Close"></button>
 * @related button — The general-purpose action button.
 */
.${p}close-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1;
  min-height: var(--instui-component-base-button-medium-height);
  padding: var(--instui-spacing-space-xs);
  border: 0;
  background: transparent;
  border-radius: var(--instui-component-base-button-border-radius);
  color: var(--instui-color-text-interactive-action-secondary-base);
  cursor: pointer;
}
.${p}close-button::before {
  content: "";
  inline-size: 1em;
  block-size: 1em;
  background: currentColor;
  -webkit-mask: ${CLOSE_ICON};
  mask: ${CLOSE_ICON};
}
.${p}close-button:hover { background: var(--instui-color-background-interactive-action-tertiary-hover); }
.${p}close-button:active { background: var(--instui-color-background-interactive-action-tertiary-active); }
.${p}close-button.-size-sm { min-height: var(--instui-component-base-button-small-height); }
.${p}close-button.-size-lg { min-height: var(--instui-component-base-button-large-height); }
.${p}close-button.-color-inverse { color: var(--instui-component-base-button-primary-inverse-ghost-color); }`,
});

export const closeButtonCss = closeButton.css;
