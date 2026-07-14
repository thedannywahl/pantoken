import { defineComponent } from "../lib/define.ts";
import { css } from "../lib/css.ts";
import { scope } from "../lib/helpers.ts";

export const byline = defineComponent({
  name: "byline",
  css: (p) => {
    const root = `.${p}byline`;
    // Root + size/align rules stay outside @scope, prefixed, so the size-alias post-processor's twins are
    // valid; only the size-free element rules go inside.
    // prettier-ignore
    return css`
/**
 * @component byline
 * @summary A media object: a hero figure beside a title and description.
 * @modifier -align-content-center — Vertically centre the text beside the hero.
 * @modifier -align-content-top — Align the text to the top of the hero.
 * @modifier -size-sm — Small.
 * @modifier -size-md — Medium.
 * @modifier -size-lg — Large.
 * @part .title — The heading text.
 * @part .description — The supporting body text.
 * @compat Contains its element styles with the CSS \`@scope\` at-rule; needs a recent Chromium, Firefox, or Safari.
 * @example
 * <div class="instui-byline -size-md">
 *   <span class="instui-icon -icon-megaphone"></span>
 *   <div>
 *     <div class="title">What's new</div>
 *     <div class="description">The figure can be any leading visual — an icon, an avatar, or an image.</div>
 *   </div>
 * </div>
 * @structure
 * .instui-byline {
 *   .instui-icon {}
 *   div {
 *     .title {}
 *     .description {}
 *   }
 * }
 */
${root} {
  display: flex;
  align-items: center;
  gap: var(--instui-component-byline-figure-margin);
  background: var(--instui-component-byline-background);
  color: var(--instui-component-byline-color);
  font-family: var(--instui-component-byline-font-family);
}
/* alignContent="top" (default is center, from align-items above). */
.${p}byline.-align-content-top { align-items: flex-start; }
.${p}byline.-align-content-center { align-items: center; }
/* size sets a max-width (InstUI's byline small/medium/large). The size tokens are @property-only
   (registered, unvalued) in the IR, so each carries a literal fallback. */
.${p}byline.-size-sm { max-width: var(--instui-component-byline-small, 20rem); }
.${p}byline.-size-md { max-width: var(--instui-component-byline-medium, 30rem); }
.${p}byline.-size-lg { max-width: var(--instui-component-byline-large, 40rem); }
${scope(
  root,
  `
.${p}byline .title {
  margin: 0 0 var(--instui-component-byline-title-margin);
  font-size: var(--instui-component-byline-title-font-size);
  font-weight: var(--instui-component-byline-title-font-weight);
  line-height: var(--instui-component-byline-title-line-height);
}
.${p}byline .description {
  font-size: var(--instui-component-byline-description-font-size);
  font-weight: var(--instui-component-byline-description-font-weight);
  line-height: var(--instui-component-byline-description-line-height);
}
`,
)}`;
  },
});

export const bylineCss = byline.css;
