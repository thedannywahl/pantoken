import { defineComponent } from "../lib/define.ts";
import { headingLevelRules } from "../lib/headings.ts";

export const heading = defineComponent({
  name: "heading",
  summary: "Heading typography from `-level-h1` to `-level-h6`.",
  modifiers: [
    { name: "-level-h1", description: "Render at the h1 type scale." },
    { name: "-level-h2", description: "Render at the h2 type scale." },
    { name: "-level-h3", description: "Render at the h3 type scale." },
    { name: "-level-h4", description: "Render at the h4 type scale." },
    { name: "-level-h5", description: "Render at the h5 type scale." },
    { name: "-level-h6", description: "Render at the h6 type scale." },
    { name: "-color-secondary", description: "Secondary (muted) colour." },
    { name: "-color-ai", description: "AI-accent colour." },
    { name: "-color-primary-inverse", description: "On-dark (primary inverse) colour." },
    { name: "-border-top", description: "Add a top rule." },
    { name: "-border-bottom", description: "Add a bottom rule." },
    { name: "-variant-label", description: "Label type preset." },
    { name: "-variant-title-page", description: "Page-title preset." },
    { name: "-variant-title-section", description: "Section-title preset." },
    { name: "-variant-title-card-mini", description: "Mini card-title preset." },
    { name: "-variant-title-card-regular", description: "Regular card-title preset." },
    { name: "-variant-title-card-section", description: "Card section-title preset." },
  ],
  examples: ['<div class="instui-heading -level-h1">Heading h1</div>'],
  css: (p) => `
.${p}heading {
  display: block;
  margin: 0;
  font-family: var(--instui-component-heading-h1-font-family);
  color: var(--instui-component-heading-base-color);
  line-height: var(--instui-component-heading-line-height);
  font-size: var(--instui-component-heading-h1-font-size);
  font-weight: var(--instui-component-heading-h1-font-weight);
}
${headingLevelRules((l) => `.${p}heading.-level-${l}`)}
.${p}heading.-variant-title-page { font-size: var(--instui-component-heading-title-page-desktop-font-size); font-weight: var(--instui-component-heading-title-page-desktop-font-weight); }
.${p}heading.-variant-title-section { font-size: var(--instui-component-heading-title-section-font-size); font-weight: var(--instui-component-heading-title-section-font-weight); }
.${p}heading.-variant-title-card-section { font-size: var(--instui-component-heading-title-card-section-font-size); font-weight: var(--instui-component-heading-title-card-section-font-weight); }
.${p}heading.-variant-title-card-regular { font-size: var(--instui-component-heading-title-card-regular-font-size); font-weight: var(--instui-component-heading-title-card-regular-font-weight); }
.${p}heading.-variant-title-card-mini { font-size: var(--instui-component-heading-title-card-mini-font-size); font-weight: var(--instui-component-heading-title-card-mini-font-weight); }
.${p}heading.-variant-label { font-size: var(--instui-component-heading-label-font-size); font-weight: var(--instui-component-heading-label-font-weight); }
.${p}heading.-color-secondary { color: var(--instui-component-heading-muted-color); }
.${p}heading.-color-primary-inverse { color: var(--instui-component-heading-inverse-color); }
.${p}heading.-color-ai {
  background: linear-gradient(to bottom, var(--instui-component-heading-ai-text-top-gradient-color) 0%, var(--instui-component-heading-ai-text-bottom-gradient-color) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}
.${p}heading.-border-bottom {
  border-bottom: var(--instui-component-heading-border-width) solid var(--instui-component-heading-border-color);
  padding-bottom: var(--instui-component-heading-border-padding);
}
.${p}heading.-border-top {
  border-top: var(--instui-component-heading-border-width) solid var(--instui-component-heading-border-color);
  padding-top: var(--instui-component-heading-border-padding);
}`,
});

export const headingCss = heading.css;
