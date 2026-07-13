import { defineComponent } from "../lib/define.ts";
import { css } from "../lib/css.ts";

export const link = defineComponent({
  name: "link",
  css: (p) =>
    // prettier-ignore
    css`
/**
 * @component link
 * @summary A styled hyperlink with sizes, an inverse variant for dark backgrounds, and inline or unstyled forms.
 * @modifier -color-inverse — For dark backgrounds.
 * @modifier -inline — Inline link, underlined within flowing text.
 * @modifier -sm — Small inline link (used with \`-inline\`).
 * @modifier -lg — Large inline link (used with \`-inline\`).
 * @modifier -unstyled — Strip link styling: inherit colour, no underline.
 * @modifier -size-sm — Small.
 * @modifier -size-lg — Large.
 * @cssstate disabled
 * @a11y Mark a disabled link with \`aria-disabled="true"\`.
 * @example
 * <a class="instui-link" href="#">A styled link</a>
 * @related breadcrumb — A breadcrumb trail is built from links.
 */
.${p}link {
  display: inline-flex;
  align-items: center;
  gap: var(--instui-component-link-gap-md);
  color: var(--instui-component-link-text-color);
  font-family: var(--instui-component-link-font-family);
  font-size: var(--instui-component-link-font-size-md);
  font-weight: var(--instui-component-link-font-weight);
  line-height: var(--instui-component-link-line-height-md);
  text-decoration: var(--instui-component-link-text-decoration-outside-text);
  cursor: pointer;
}
.${p}link:hover { color: var(--instui-component-link-text-hover-color); }
.${p}link[aria-disabled="true"] {
  color: var(--instui-component-link-text-disabled-color);
  cursor: not-allowed;
}
.${p}link.-size-sm {
  gap: var(--instui-component-link-gap-sm);
  font-size: var(--instui-component-link-font-size-sm);
  line-height: var(--instui-component-link-line-height-sm);
}
.${p}link.-size-lg {
  gap: var(--instui-component-link-gap-lg);
  font-size: var(--instui-component-link-font-size-lg);
  line-height: var(--instui-component-link-line-height-lg);
}
.${p}link.-color-inverse { color: var(--instui-component-link-on-color-text-color); }
.${p}link.-color-inverse:hover { color: var(--instui-component-link-on-color-text-hover-color); }
.${p}link.-color-inverse[aria-disabled="true"] { color: var(--instui-component-link-on-color-text-disabled-color); }
/* An inline link, decorated within the flow of text. */
.${p}link.-inline {
  display: inline;
  font-family: var(--instui-component-link-inline-link-medium-font-family);
  font-size: var(--instui-component-link-inline-link-medium-font-size);
  font-weight: var(--instui-component-link-inline-link-medium-font-weight);
  line-height: var(--instui-component-link-inline-link-medium-line-height);
  text-decoration: var(--instui-component-link-text-decoration-within-text);
}
.${p}link.-inline.-sm {
  font-size: var(--instui-component-link-inline-link-small-font-size);
  font-weight: var(--instui-component-link-inline-link-small-font-weight);
  line-height: var(--instui-component-link-inline-link-small-line-height);
}
.${p}link.-inline.-lg {
  font-size: var(--instui-component-link-inline-link-large-font-size);
  font-weight: var(--instui-component-link-inline-link-large-font-weight);
  line-height: var(--instui-component-link-inline-link-large-line-height);
}
.${p}link.-unstyled {
  color: var(--instui-component-link-unstyled-text-color);
  text-decoration: none;
}`,
});

export const linkCss = link.css;
