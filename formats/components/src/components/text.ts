import { defineComponent } from "../lib/define.ts";

export const text = defineComponent({
  name: "text",
  css: (p) => {
    // Modifiers are dash-prefixed compound classes (`.instui-text.-small`): terse to author
    // (`<span class="instui-text -small -secondary">`), collision-safe (always compound with the base,
    // and `.-small` is rare in the wild), and — treeshakeable via PostCSS.
    const mod = (token: string, decls: string): string => `.${p}text.-${token} { ${decls} }`;
    return `
/**
 * @component text
 * @summary Body-text typography with size, weight, colour, and style modifiers.
 * @modifier -color-brand — Brand text colour.
 * @modifier -color-secondary — Secondary (muted) text colour.
 * @modifier -color-ai — AI-accent text colour.
 * @modifier -color-success — Success text colour.
 * @modifier -color-warning — Warning text colour.
 * @modifier -color-danger — Danger text colour.
 * @modifier -color-primary-inverse — On-dark (primary inverse) text colour.
 * @modifier -weight-bold — Bold weight.
 * @modifier -style-italic — Italic.
 * @modifier -transform-uppercase — Uppercase the text.
 * @modifier -transform-lowercase — Lowercase the text.
 * @modifier -transform-capitalize — Capitalise each word.
 * @modifier -variant-content-small — Small-content type preset.
 * @modifier -variant-description-page — Page-description type preset.
 * @modifier -variant-description-section — Section-description type preset.
 * @modifier -variant-legend — Legend type preset.
 * @modifier -size-xs — Extra small.
 * @modifier -size-sm — Small.
 * @modifier -size-lg — Large.
 * @modifier -size-xl — Extra large.
 * @example
 * <span class="instui-text -size-xs">x-small text</span>
 * @related heading — Typography for headings rather than body text.
 * @related truncate — Clips this text to one line or a set number of lines.
 */
.${p}text {
  font-family: var(--instui-component-text-content-font-family);
  color: var(--instui-component-text-base-color);
  font-size: var(--instui-component-text-font-size-medium);
  font-weight: var(--instui-component-text-font-weight-normal);
  line-height: var(--instui-component-text-content-line-height);
}
${mod("size-xs", "font-size: var(--instui-component-text-font-size-x-small);")}
${mod("size-sm", "font-size: var(--instui-component-text-font-size-small);")}
${mod("size-lg", "font-size: var(--instui-component-text-font-size-large);")}
${mod("size-xl", "font-size: var(--instui-component-text-font-size-x-large);")}
${mod("weight-bold", "font-weight: var(--instui-component-text-font-weight-bold);")}
${mod("style-italic", "font-style: italic;")}
${mod("color-secondary", "color: var(--instui-component-text-muted-color);")}
${mod("color-brand", "color: var(--instui-component-text-primary-color);")}
${mod("color-success", "color: var(--instui-component-text-success-color);")}
${mod("color-danger", "color: var(--instui-component-text-error-color);")}
${mod("color-warning", "color: var(--instui-component-text-warning-color);")}
${mod("color-primary-inverse", "color: var(--instui-component-text-inverse-color);")}
${mod("color-ai", "color: var(--instui-component-text-ai-color); background: var(--instui-component-text-ai-background-color);")}
${mod("variant-description-page", "font-size: var(--instui-component-text-description-page-font-size); line-height: var(--instui-component-text-description-page-line-height);")}
${mod("variant-description-section", "font-size: var(--instui-component-text-description-section-font-size); line-height: var(--instui-component-text-description-section-line-height);")}
${mod("variant-content-small", "font-size: var(--instui-component-text-content-small-font-size); line-height: var(--instui-component-text-content-small-line-height);")}
${mod("variant-legend", "font-size: var(--instui-component-text-legend-font-size); line-height: var(--instui-component-text-legend-line-height);")}
${mod("transform-uppercase", "text-transform: uppercase;")}
${mod("transform-lowercase", "text-transform: lowercase;")}
${mod("transform-capitalize", "text-transform: capitalize;")}`;
  },
});

export const textCss = text.css;
