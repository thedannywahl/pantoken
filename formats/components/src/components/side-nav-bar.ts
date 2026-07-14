import { defineComponent } from "../lib/define.ts";
import { css } from "../lib/css.ts";
import { scope } from "../lib/helpers.ts";

export const sideNavBar = defineComponent({
  name: "side-nav-bar",
  css: (p) => {
    const root = `.${p}side-nav-bar`;
    const s = (k: string): string => `var(--instui-component-side-nav-bar-${k})`;
    // prettier-ignore
    return css`
/**
 * @component side-nav-bar
 * @summary A vertical navigation rail of icon-over-label items, with a minimized icons-only mode.
 * @modifier -minimized — Collapse to icons only (labels hidden).
 * @part .item — A navigation entry; \`-selected\` marks the active one.
 * @part .label — An item's text label; hidden when the rail is minimized.
 * @a11y Label the \`<nav>\` with aria-label so it's announced as a named navigation landmark.
 * @example
 * <nav class="instui-side-nav-bar" aria-label="Primary">
 *   <a class="item -selected" href="#">
 *     <span class="instui-icon -icon-house"></span>
 *     <span class="label">Home</span>
 *   </a>
 *   <a class="item" href="#">
 *     <span class="instui-icon -icon-inbox"></span>
 *     <span class="label">Inbox</span>
 *   </a>
 *   <a class="item" href="#">
 *     <span class="instui-icon -icon-calendar"></span>
 *     <span class="label">Calendar</span>
 *   </a>
 *   <a class="item" href="#">
 *     <span class="instui-icon -icon-settings"></span>
 *     <span class="label">Settings</span>
 *   </a>
 * </nav>
 * @structure
 * .instui-side-nav-bar {
 *   .item {
 *     .instui-icon {}
 *     .label {}
 *   }
 * }
 */
${root} {
  display: flex;
  flex-direction: column;
  gap: ${s("content-gap")};
  padding: ${s("content-margin")};
  box-sizing: border-box;
  inline-size: fit-content;
  /* The rail sits on the page and runs full height (InstUI SideNavBar is 100% of its layout column). */
  block-size: 100%;
  min-block-size: 100%;
  background: ${s("background-color")};
  color: ${s("font-color")};
  font-family: ${s("item-font-family")};
}
${scope(
  root,
  `
.${p}side-nav-bar .item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--instui-spacing-space2xs);
  padding: ${s("item-content-padding")};
  min-inline-size: ${s("minimized-width")};
  color: ${s("item-font-color")};
  background: ${s("item-background-color")};
  border-radius: ${s("item-border-radius")};
  font-size: ${s("item-font-size")};
  font-weight: ${s("item-font-weight")};
  line-height: ${s("item-line-height")};
  text-align: center;
  text-decoration: ${s("item-link-text-decoration")};
  cursor: pointer;
}
.${p}side-nav-bar .item:hover { background: ${s("item-hover-background-color")}; }
.${p}side-nav-bar .item.-selected {
  background: ${s("item-selected-background-color")};
  color: ${s("item-selected-font-color")};
}
`,
  ["item"],
)}
/* minimized: a narrow rail — the icons stay, the labels are hidden. */
${root}.-minimized { inline-size: ${s("minimized-width")}; }
${root}.-minimized .item .label { display: none; }`;
  },
});

export const sideNavBarCss = sideNavBar.css;
