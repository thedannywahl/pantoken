import { defineComponent } from "../lib/define.ts";

export const img = defineComponent({
  name: "img",
  css: (p) => {
    const root = `.${p}img`;
    return `
/**
 * @component img
 * @summary A styled \`<img>\` with display, crop, and effect modifiers that stack.
 * @modifier -display-block — Display as a block element.
 * @modifier -constrain-cover — Scale to fill the box (cover).
 * @modifier -constrain-contain — Scale to fit within the box (contain).
 * @modifier -with-grayscale — Apply a grayscale effect.
 * @modifier -with-blur — Apply a blur effect.
 * @cssproperty --pantoken-img-filter <filter-value-list> | none — The composed CSS filter on the image; the effect modifiers set it, and you can override it for a custom filter.
 * @accessibility Provide meaningful \`alt\` text that describes the image, and use an empty \`alt=""\` for purely decorative images so assistive tech skips them.
 * @example
 * <img class="instui-img" alt="Gradient">
 */
${root} {
  display: inline-block;
  max-inline-size: 100%;
  block-size: auto;
  --pantoken-img-filter: none;
  filter: var(--pantoken-img-filter);
  transition: filter var(--instui-component-img-effect-transition-duration) ease;
}
${root}.-display-block { display: block; }
/* constrain: fill a sized box (the consumer sets width/height). */
${root}.-constrain-cover { inline-size: 100%; block-size: 100%; object-fit: cover; }
${root}.-constrain-contain { inline-size: 100%; block-size: 100%; object-fit: contain; }
/* Effects compose through the custom property, so grayscale + blur can apply together. */
${root}.-with-grayscale { --pantoken-img-filter: grayscale(1); }
${root}.-with-blur { --pantoken-img-filter: blur(var(--instui-component-img-image-blur-amount)); }
${root}.-with-grayscale.-with-blur { --pantoken-img-filter: grayscale(1) blur(var(--instui-component-img-image-blur-amount)); }`;
  },
});

export const imgCss = img.css;
