import { defineComponent } from "../lib/define.ts";
import { css } from "../lib/css.ts";
import { scope } from "../lib/helpers.ts";

export const rating = defineComponent({
  name: "rating",
  css: (p) => {
    const root = `.${p}rating`;
    // prettier-ignore
    return css`
/**
 * @component rating
 * @summary A star rating with filled and empty glyphs and an optional numeric label.
 * @modifier -size-sm — Small.
 * @modifier -size-lg — Large.
 * @part .label — The numeric label, e.g. "3/5".
 * @a11y Give it role="img" and an aria-label stating the rating, since the stars are icon glyphs.
 * @example
 * <span class="instui-rating -size-sm" role="img" aria-label="2 out of 3 stars">
 *   <span class="instui-icon -icon-star-solid"></span> <span class="instui-icon -icon-star-solid"></span> <span class="instui-icon -icon-star"></span>
 *   <span class="label">2/3</span>
 * </span>
 * @structure
 * .instui-rating {
 *   .instui-icon {}
 *   .label {}
 * }
 */
${root} {
  display: inline-flex;
  align-items: center;
  gap: var(--instui-component-rating-icon-icon-margin);
  font-size: var(--instui-component-rating-icon-medium-icon-font-size);
  color: var(--instui-component-rating-icon-icon-empty-color);
}
.${p}rating.-size-sm { font-size: var(--instui-component-rating-icon-small-icon-font-size); }
.${p}rating.-size-lg { font-size: var(--instui-component-rating-icon-large-icon-font-size); }
${scope(
  root,
  `
/* The container paints the empty (outline) stars; a filled (solid) star overrides to the filled colour. */
.${p}rating .-icon-star-solid { color: var(--instui-component-rating-icon-icon-filled-color); }
/* The value label sits after the stars, reset to text size so it isn't scaled to the star glyph. */
.${p}rating .label {
  margin-inline-start: var(--instui-component-rating-icon-icon-margin);
  color: var(--instui-color-text-base);
  font-family: var(--instui-font-family-base);
  font-size: var(--instui-font-size-text-base);
}
`,
  ["label"],
)}`;
  },
});

export const ratingCss = rating.css;
