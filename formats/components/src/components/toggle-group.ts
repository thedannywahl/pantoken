import { defineComponent } from "../lib/define.ts";
import { css } from "../lib/css.ts";
import { CHEVRON_RIGHT_ICON } from "../lib/helpers.ts";

export const toggleGroup = defineComponent({
  name: "toggle-group",
  css: (p) => {
    const root = `.${p}toggle-group`;
    // prettier-ignore
    return css`
/**
 * @component toggle-group
 * @summary A bordered disclosure built on \`<details>\`: a chevron summary row and collapsible content.
 * @remarks Built on the same native \`<details>\` foundation as toggle-details; put the \`<summary>\` first so it becomes the clickable header row and the rest is the collapsible content.
 * @modifier -without-border — Remove the border.
 * @modifier -size-sm — Small.
 * @modifier -size-lg — Large.
 * @pseudo ::before — Draws the summary row's disclosure chevron, a masked glyph that rotates to point down when the group is open.
 * @cssstate open
 * @example
 * <details class="instui-toggle-group" open>
 *   <summary>Advanced settings</summary>
 *   <div>These options are revealed when the group is expanded. The header row carries a chevron that rotates on open, and the content sits below a divider.</div>
 * </details>
 * @structure
 * .instui-toggle-group {
 *   summary {}
 *   div {}
 * }
 * @related toggle-details — The single, unbordered form of the same disclosure.
 */
${root} {
  display: block;
  border: var(--instui-border-width-sm) solid var(--instui-component-toggle-group-border-color);
  border-radius: var(--instui-border-radius-md);
  background: var(--instui-color-background-elevated-surface-base);
  color: var(--instui-component-toggle-details-text-color);
  font-family: var(--instui-component-toggle-details-font-family);
  font-weight: var(--instui-component-toggle-details-font-weight);
  line-height: var(--instui-component-toggle-details-line-height);
  overflow: hidden;
}
${root} > summary {
  display: flex;
  align-items: center;
  gap: var(--instui-component-toggle-details-icon-margin);
  cursor: pointer;
  list-style: none;
  padding: var(--instui-component-toggle-details-content-padding-medium);
  font-size: var(--instui-component-toggle-details-font-size-medium);
}
${root} > summary::-webkit-details-marker { display: none; }
${root} > summary::before {
  content: "";
  flex: none;
  inline-size: 1em;
  block-size: 1em;
  background: currentColor;
  -webkit-mask: ${CHEVRON_RIGHT_ICON};
  mask: ${CHEVRON_RIGHT_ICON};
  transition: transform 0.2s ease;
}
${root}[open] > summary::before { transform: rotate(90deg); }
/* the collapsible content: separated from the header by a top border in the group colour */
${root} > :not(summary) {
  border-block-start: var(--instui-border-width-sm) solid var(--instui-component-toggle-group-border-color);
  padding: var(--instui-component-toggle-details-content-padding-medium);
}
${root}.-size-sm > summary,
${root}.-size-sm > :not(summary) { font-size: var(--instui-component-toggle-details-font-size-small); padding: var(--instui-component-toggle-details-content-padding-small); }
${root}.-size-lg > summary,
${root}.-size-lg > :not(summary) { font-size: var(--instui-component-toggle-details-font-size-large); padding: var(--instui-component-toggle-details-content-padding-large); }
/* border={false} */
${root}.-without-border { border: 0; }
${root}.-without-border > :not(summary) { border-block-start: 0; }`;
  },
});

export const toggleGroupCss = toggleGroup.css;
