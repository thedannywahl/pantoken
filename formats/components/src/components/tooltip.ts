import { defineComponent } from "../lib/define.ts";
import { css } from "../lib/css.ts";
import { scope } from "../lib/helpers.ts";

export const tooltip = defineComponent({
  name: "tooltip",
  css: (p) => {
    const root = `.${p}tooltip`;
    const t = (k: string): string => `var(--instui-component-tooltip-${k})`;
    // prettier-ignore
    return css`
/**
 * @component tooltip
 * @summary A CSS hover and focus tooltip bubble, positionable on any side.
 * @part .tip — The bubble; \`-placement-*\` sets its side.
 * @a11y Point the trigger at the bubble with aria-describedby and give the bubble role="tooltip".
 * @example
 * <span class="${p}tooltip" aria-describedby="tt-1">
 *   <span class="${p}icon -icon-info"></span>
 *   <span class="tip" id="tt-1" role="tooltip">Default placement is top</span>
 * </span>
 * @structure
 * .${p}tooltip {
 *   .${p}icon {}
 *   .tip {}
 * }
 * @related popover — The larger, click-triggered anchored surface.
 * @related context-view — A related anchored surface with a pointer.
 */
${root} {
  position: relative;
  display: inline-flex;
}
${scope(
  root,
  `
.${p}tooltip .tip {
  position: absolute;
  z-index: 1;
  inset-block-end: 100%;
  inset-inline-start: 50%;
  transform: translateX(-50%);
  margin-block-end: var(--instui-spacing-space-xs);
  padding: ${t("padding")};
  background: var(--instui-color-background-inverse);
  color: var(--instui-color-text-inverse);
  border-radius: var(--instui-border-radius-sm);
  font-family: ${t("font-family")};
  font-size: ${t("font-size")};
  font-weight: ${t("font-weight")};
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: opacity 0.15s ease;
}
`,
  ["tip"],
)}
/* Show on hover or keyboard focus of the trigger. */
${root}:hover > .tip,
${root}:focus-within > .tip { opacity: 1; visibility: visible; }
/* Placement (authored on the .tip itself, matching the web-component): default is top; these move the
   bubble to the other sides. */
${root} > .tip.-placement-bottom { inset-block: 100% auto; margin-block: var(--instui-spacing-space-xs) 0; }
${root} > .tip.-placement-start { inset-block-end: auto; inset-inline: auto 100%; top: 50%; transform: translateY(-50%); margin: 0 var(--instui-spacing-space-xs) 0 0; }
${root} > .tip.-placement-end { inset-block-end: auto; inset-inline: 100% auto; top: 50%; transform: translateY(-50%); margin: 0 0 0 var(--instui-spacing-space-xs); }`;
  },
});

export const tooltipCss = tooltip.css;
