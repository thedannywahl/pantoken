import { defineComponent } from "../lib/define.ts";
import { css } from "../lib/css.ts";
import { CLOSE_ICON } from "../lib/helpers.ts";

export const tag = defineComponent({
  name: "tag",
  css: (p) =>
    // prettier-ignore
    css`
/**
 * @component tag
 * @summary An inline chip for a keyword or filter.
 * @modifier -size-sm — A small tag.
 * @modifier -size-lg — A large tag.
 * @modifier -inline — Reads inline with text and gets a trailing dismiss glyph.
 * @modifier -readonly — Read-only (non-dismissable) tag.
 * @pseudo ::after — Renders the trailing dismiss glyph on a dismissible inline tag.
 * @example
 * <span class="instui-tag -size-sm">small</span>
 * @related pill — The read-only label-chip counterpart.
 * @demo self:tag
 */
.${p}tag {
  display: inline-flex;
  align-items: center;
  height: var(--instui-component-tag-height-medium);
  max-width: var(--instui-component-tag-max-width);
  padding: 0 var(--instui-component-tag-padding-horizontal);
  background: var(--instui-component-tag-default-background);
  color: var(--instui-component-tag-default-color);
  border: var(--instui-component-tag-default-border-width) var(--instui-component-tag-default-border-style) var(--instui-component-tag-default-border-color);
  border-radius: var(--instui-component-tag-default-border-radius);
  font-family: var(--instui-component-tag-font-family);
  font-size: var(--instui-component-tag-font-size-medium);
}
.${p}tag:hover { background: var(--instui-component-tag-default-background-hover); }
.${p}tag.-size-sm {
  height: var(--instui-component-tag-height-small);
  padding: 0 var(--instui-component-tag-padding-horizontal-small);
  font-size: var(--instui-component-tag-font-size-small);
}
.${p}tag.-size-lg {
  height: var(--instui-component-tag-height-large);
  font-size: var(--instui-component-tag-font-size-large);
}
.${p}tag.-inline {
  gap: var(--instui-spacing-space-xs);
  background: var(--instui-component-tag-inline-background);
  color: var(--instui-component-tag-inline-color);
  border-color: var(--instui-component-tag-inline-border-color);
  border-radius: var(--instui-component-tag-inline-border-radius);
  cursor: pointer;
}
.${p}tag.-inline:hover { background: var(--instui-component-tag-inline-background-hover); }
.${p}tag.-inline::after {
  content: "";
  flex: none;
  width: 1em;
  height: 1em;
  background: var(--instui-component-tag-inline-icon-color);
  -webkit-mask: ${CLOSE_ICON};
  mask: ${CLOSE_ICON};
}
.${p}tag.-inline:hover::after { background: var(--instui-component-tag-inline-icon-hover-color); }
/* readOnly (InstUI): a static tag — no hover affordance, and the dismiss glyph is dropped. */
.${p}tag.-readonly {
  cursor: default;
  background: var(--instui-component-tag-default-background);
}
.${p}tag.-readonly.-inline::after { display: none; }`,
});

export const tagCss = tag.css;
