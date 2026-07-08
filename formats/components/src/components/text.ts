import { defineComponent } from "../lib/define.ts";

export const text = defineComponent({
  name: "text",
  summary: "Body-text typography with size, weight, colour, and style modifiers.",
  modifiers: [
    { name: "-color-brand", description: "Brand text colour." },
    { name: "-color-secondary", description: "Secondary (muted) text colour." },
    { name: "-color-ai", description: "AI-accent text colour." },
    { name: "-color-success", description: "Success text colour." },
    { name: "-color-warning", description: "Warning text colour." },
    { name: "-color-danger", description: "Danger text colour." },
    { name: "-color-primary-inverse", description: "On-dark (primary inverse) text colour." },
    { name: "-weight-bold", description: "Bold weight." },
    { name: "-style-italic", description: "Italic." },
    { name: "-transform-uppercase", description: "Uppercase the text." },
    { name: "-transform-lowercase", description: "Lowercase the text." },
    { name: "-transform-capitalize", description: "Capitalise each word." },
    { name: "-variant-content-small", description: "Small-content type preset." },
    { name: "-variant-description-page", description: "Page-description type preset." },
    { name: "-variant-description-section", description: "Section-description type preset." },
    { name: "-variant-legend", description: "Legend type preset." },
    { name: "-size-xs", description: "Extra small." },
    { name: "-size-sm", description: "Small." },
    { name: "-size-lg", description: "Large." },
    { name: "-size-xl", description: "Extra large." },
  ],
  examples: ['<span class="instui-text -size-xs">x-small text</span>'],
  css: (p) => {
    // Modifiers are dash-prefixed compound classes (`.instui-text.-small`): terse to author
    // (`<span class="instui-text -small -secondary">`), collision-safe (always compound with the base,
    // and `.-small` is rare in the wild), and — treeshakeable via PostCSS.
    const mod = (token: string, decls: string): string => `.${p}text.-${token} { ${decls} }`;
    return `
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
