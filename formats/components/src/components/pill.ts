import { defineComponent } from "../lib/define.ts";

export const pill = defineComponent({
  name: "pill",
  css: (p) => `
/**
 * @component pill
 * @summary A compact status label; add a leading glyph with the shared \`-icon-<name>\` form.
 * @modifier -color-info — Informational status.
 * @modifier -color-success — Positive status.
 * @modifier -color-warning — Cautionary status.
 * @modifier -color-danger — Error status.
 * @modifier -icon-<name> — A leading glyph from the icon set (e.g. \`-icon-check\`), painted before the label.
 * @modifier -render-icon-<name> — @deprecated The former \`renderIcon\` prop; still works as an alias, but use \`-icon-<name>\` instead.
 * @example
 * <span class="instui-pill">Draft</span>
 * @demo self:pill
 */
.${p}pill {
  display: inline-flex;
  align-items: center;
  height: var(--instui-component-pill-height);
  max-width: var(--instui-component-pill-max-width);
  padding: 0 var(--instui-component-pill-padding-horizontal);
  background: var(--instui-component-pill-background-color);
  color: var(--instui-component-pill-base-text-color);
  border: var(--instui-component-pill-border-width) var(--instui-component-pill-border-style) var(--instui-component-pill-base-border-color);
  border-radius: var(--instui-component-pill-border-radius);
  font-family: var(--instui-component-pill-font-family);
  font-size: var(--instui-component-pill-text-font-size);
  font-weight: var(--instui-component-pill-text-font-weight);
  line-height: var(--instui-component-pill-line-height);
}
/* A leading icon (InstUI \`renderIcon\`): a glyph class on the pill renders a masked ::before that
   inherits the pill's colour. It refines the shared icon ::before to the pill's size + spacing. */
.${p}pill[class*="-icon-"]::before {
  inline-size: var(--instui-font-size-text-xs);
  block-size: var(--instui-font-size-text-xs);
  margin-inline-end: 0.375rem;
}
.${p}pill.-color-info {
  color: var(--instui-component-pill-info-text-color);
  border-color: var(--instui-component-pill-info-border-color);
}
.${p}pill.-color-success {
  color: var(--instui-component-pill-success-text-color);
  border-color: var(--instui-component-pill-success-border-color);
}
.${p}pill.-color-warning {
  color: var(--instui-component-pill-warning-text-color);
  border-color: var(--instui-component-pill-warning-border-color);
}
.${p}pill.-color-danger {
  color: var(--instui-component-pill-error-text-color);
  border-color: var(--instui-component-pill-error-border-color);
}
.${p}pill.-color-info,
.${p}pill.-color-success,
.${p}pill.-color-warning,
.${p}pill.-color-danger { font-weight: var(--instui-component-pill-status-label-font-weight); }`,
});

export const pillCss = pill.css;
