import { defineComponent } from "../lib/define.ts";
import { css } from "../lib/css.ts";

export const list = defineComponent({
  name: "list",
  css: (p) =>
    // prettier-ignore
    css`
/**
 * @component list
 * @summary A list with token-driven item spacing.
 * @modifier -ordered — Ordered-list numbering.
 * @modifier -inline — Lay items out inline (horizontal).
 * @modifier -unstyled — Remove markers and padding.
 * @modifier -delimiter-solid — Separate items with a solid rule.
 * @modifier -delimiter-dashed — Separate items with a dashed rule.
 * @modifier -size-sm — Small.
 * @modifier -size-lg — Large.
 * @pseudo ::marker — Renders the list bullet or ordered-list number.
 * @example
 * <ul class="${p}list">
 *   <li>First item</li>
 *   <li>Second item</li>
 *   <li>Third item</li>
 * </ul>
 * @structure
 * .${p}list {
 *   li {}
 * }
 */
.${p}list {
  color: var(--instui-component-list-item-color);
  font-family: var(--instui-component-list-item-font-family);
  font-size: var(--instui-component-list-item-font-size-medium);
  font-weight: var(--instui-component-list-item-font-weight);
  line-height: var(--instui-component-list-item-line-height);
  padding-inline-start: var(--instui-component-list-list-padding);
}
.${p}list > li { margin: var(--instui-component-list-item-spacing-medium) 0; }
.${p}list.-size-sm { font-size: var(--instui-component-list-item-font-size-small); }
.${p}list.-size-sm > li { margin: var(--instui-component-list-item-spacing-small) 0; }
.${p}list.-size-lg { font-size: var(--instui-component-list-item-font-size-large); }
.${p}list.-size-lg > li { margin: var(--instui-component-list-item-spacing-large) 0; }
.${p}list.-ordered > li::marker {
  font-weight: var(--instui-component-list-ordered-number-font-weight);
}
.${p}list.-ordered > li { padding-inline-start: var(--instui-component-list-ordered-number-margin); }
.${p}list.-delimiter-solid > li + li {
  border-top: var(--instui-component-list-item-delimiter-solid-border-width) var(--instui-component-list-item-delimiter-solid-border-style) var(--instui-component-list-item-delimiter-solid-border-color);
  padding-top: var(--instui-component-list-item-spacing-medium);
}
.${p}list.-delimiter-dashed > li + li {
  border-top: var(--instui-component-list-item-delimiter-dashed-border-width) var(--instui-component-list-item-delimiter-dashed-border-style) var(--instui-component-list-item-delimiter-dashed-border-color);
  padding-top: var(--instui-component-list-item-spacing-medium);
}
/* isUnstyled: strip markers and indentation. */
.${p}list.-unstyled {
  list-style: none;
  padding-inline-start: 0;
}
/* InlineList: lay items out in a wrapping row (\`.${p}list.-inline\`). */
.${p}list.-inline {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--instui-component-list-item-spacing-medium);
  list-style: none;
  padding-inline-start: 0;
}
.${p}list.-inline > li { margin: 0; }`,
});

export const listCss = list.css;
