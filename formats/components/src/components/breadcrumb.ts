import { defineComponent } from "../lib/define.ts";
import { css } from "../lib/css.ts";
import { scope } from "../lib/helpers.ts";

export const breadcrumb = defineComponent({
  name: "breadcrumb",
  css: (p) => {
    const root = `.${p}breadcrumb`;
    // Root + size rules stay outside @scope, prefixed, so the size-alias post-processor's twins are
    // valid; only the element rules that don't carry a size modifier go inside.
    // prettier-ignore
    return css`
/**
 * @component breadcrumb
 * @summary A breadcrumb trail with \`/\` separators; the last crumb is the current page.
 * @modifier -size-sm — Small.
 * @modifier -size-lg — Large.
 * @part .item — A crumb; the last one is the current page.
 * @pseudo ::after — Renders the \`/\` separator after every crumb except the last.
 * @a11y Wrap the trail in \`<nav aria-label>\` and mark the current page's crumb with \`aria-current="page"\`.
 * @compat Contains its element styles with the CSS \`@scope\` at-rule; needs a recent Chromium, Firefox, or Safari.
 * @example
 * <nav class="instui-breadcrumb" aria-label="Breadcrumb">
 *   <span class="item">
 *     <a href="#"><span class="instui-icon -icon-house"></span> Home</a>
 *   </span>
 *   <span class="item"><a href="#">Guides</a></span>
 *   <span class="item"><a href="#">Components</a></span>
 *   <span class="item" aria-current="page">Breadcrumb</span>
 * </nav>
 * @structure
 * .instui-breadcrumb {
 *   .item {
 *     a {
 *       .instui-icon {}
 *     }
 *   }
 * }
 * @related link — Styles each crumb as a link.
 */
${root} {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--instui-component-breadcrumb-gap-md);
  font-family: var(--instui-component-link-font-family);
  font-size: var(--instui-component-link-font-size-md);
}
.${p}breadcrumb.-size-sm { gap: var(--instui-component-breadcrumb-gap-sm); font-size: var(--instui-component-link-font-size-sm); }
.${p}breadcrumb.-size-lg { gap: var(--instui-component-breadcrumb-gap-lg); font-size: var(--instui-component-link-font-size-lg); }
.${p}breadcrumb.-size-sm .item:not(:last-child)::after { margin-inline-start: var(--instui-component-breadcrumb-gap-sm); }
.${p}breadcrumb.-size-lg .item:not(:last-child)::after { margin-inline-start: var(--instui-component-breadcrumb-gap-lg); }
${scope(
  root,
  `
.${p}breadcrumb a { color: var(--instui-component-link-text-color); text-decoration: none; }
.${p}breadcrumb a:hover { color: var(--instui-component-link-text-hover-color); text-decoration: underline; }
.${p}breadcrumb .item:not(:last-child)::after {
  content: "/";
  margin-inline-start: var(--instui-component-breadcrumb-gap-md);
  color: var(--instui-color-text-muted);
}
`,
  ["item"],
)}`;
  },
});

export const breadcrumbCss = breadcrumb.css;
