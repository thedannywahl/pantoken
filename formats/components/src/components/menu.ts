import { defineComponent } from "../lib/define.ts";
import { scope } from "../lib/helpers.ts";

export const menu = defineComponent({
  name: "menu",
  css: (p) => {
    const root = `.${p}menu`;
    return `
/**
 * @component menu
 * @summary A dropdown surface of items, groups, and separators.
 * @part .item — A menu entry; add -disabled, -highlighted, or -active/[aria-checked].
 * @part .group — A labelled group heading.
 * @part .separator — A divider rule between items.
 * @part .item-info — Secondary info text within a menu item.
 * @example
 * <div class="instui-menu">
 *   <div class="group">Actions</div>
 *   <div class="item">Edit</div>
 *   <div class="item -active">Duplicate</div>
 *   <div class="separator"></div>
 *   <div class="item">Delete</div>
 * </div>
 * @structure
 * .instui-menu
 *   .group
 *   .item
 *   .item.-active
 *   .separator
 * @demo self:menu
 */
${root} {
  min-width: var(--instui-component-menu-min-width);
  max-width: var(--instui-component-menu-max-width);
  background: var(--instui-component-menu-item-background);
  border: var(--instui-border-width-sm) solid var(--instui-color-stroke-base);
  border-radius: var(--instui-border-radius-md);
  padding: var(--instui-spacing-space-xs) 0;
}
${scope(
  root,
  `
.${p}menu .item {
  display: block;
  padding: var(--instui-component-menu-item-padding-vertical) var(--instui-component-menu-item-padding-horizontal);
  color: var(--instui-component-menu-item-label-color);
  font-family: var(--instui-component-menu-item-font-family);
  font-size: var(--instui-component-menu-item-font-size);
  font-weight: var(--instui-component-menu-item-font-weight);
  line-height: var(--instui-component-menu-item-line-height);
  cursor: pointer;
}
/* A disabled item (InstUI Menu.Item \`disabled\`): muted, non-interactive. */
.${p}menu .item.-disabled {
  opacity: var(--instui-opacity-disabled);
  pointer-events: none;
  cursor: not-allowed;
}
.${p}menu .item:hover,
.${p}menu .item.-highlighted {
  background: var(--instui-component-menu-item-highlighted-background);
  color: var(--instui-component-menu-item-highlighted-label-color);
}
.${p}menu .item.-active,
.${p}menu .item[aria-checked="true"] {
  background: var(--instui-component-menu-item-active-background);
  color: var(--instui-component-menu-item-active-label-color);
}
.${p}menu .item.-active:hover,
.${p}menu .item[aria-checked="true"]:hover {
  background: var(--instui-component-menu-item-selected-highlighted-background);
}
/* Secondary line inside an item (a description or shortcut). */
.${p}menu .item-info { color: var(--instui-component-menu-item-label-info-color); }
.${p}menu .item:hover .item-info,
.${p}menu .item.-highlighted .item-info { color: var(--instui-component-menu-item-highlighted-label-info-color); }
/* A labelled group of items. */
.${p}menu .group {
  padding: var(--instui-component-menu-group-padding-vertical) var(--instui-component-menu-group-padding-horizontal);
  background: var(--instui-component-menu-group-background);
  color: var(--instui-component-menu-group-color);
  font-family: var(--instui-component-menu-group-font-family);
  font-size: var(--instui-component-menu-group-font-size);
  font-weight: var(--instui-component-menu-group-font-weight);
}
.${p}menu .separator {
  height: var(--instui-component-menu-separator-height);
  background: var(--instui-component-menu-separator-background);
  margin: var(--instui-component-menu-separator-margin-vertical) var(--instui-component-menu-separator-margin-horizontal);
}
`,
  ["item", "group", "separator"],
)}`;
  },
});

export const menuCss = menu.css;
