import { defineComponent } from "../lib/define.ts";
import { css } from "../lib/css.ts";
import { headingLevelRules } from "../lib/headings.ts";

export const heading = defineComponent({
  name: "heading",
  css: (p) =>
    // prettier-ignore
    css`
/**
 * @component heading
 * @summary Heading typography from \`-level-h1\` to \`-level-h6\`.
 * @modifier -level-h1 — Render at the h1 type scale.
 * @modifier -level-h2 — Render at the h2 type scale.
 * @modifier -level-h3 — Render at the h3 type scale.
 * @modifier -level-h4 — Render at the h4 type scale.
 * @modifier -level-h5 — Render at the h5 type scale.
 * @modifier -level-h6 — Render at the h6 type scale.
 * @modifier -color-secondary — Secondary (muted) colour.
 * @modifier -color-ai — AI-accent colour.
 * @modifier -color-primary-inverse — On-dark (primary inverse) colour.
 * @modifier -border-top — Add a top rule.
 * @modifier -border-bottom — Add a bottom rule.
 * @modifier -variant-label — Label type preset.
 * @modifier -variant-title-page — Page-title preset.
 * @modifier -variant-title-section — Section-title preset.
 * @modifier -variant-title-card-mini — Mini card-title preset.
 * @modifier -variant-title-card-regular — Regular card-title preset.
 * @modifier -variant-title-card-section — Card section-title preset.
 * @accessibility These classes set the visual level only, so render a real \`<h1>\`–\`<h6>\` (or use \`role="heading"\` with \`aria-level\`) to convey the heading level.
 * @example
 * <div class="instui-heading -level-h1">Heading h1</div>
 * @related text — Body typography for non-heading text.
 */
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
