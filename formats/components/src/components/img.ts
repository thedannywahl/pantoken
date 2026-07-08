import { defineComponent } from "../lib/define.ts";

export const img = defineComponent({
  name: "img",
  summary: "A styled `<img>` with display, crop, and effect modifiers that stack.",
  modifiers: [
    { name: "-display-block", description: "Display as a block element." },
    { name: "-constrain-cover", description: "Scale to fill the box (cover)." },
    { name: "-constrain-contain", description: "Scale to fit within the box (contain)." },
    { name: "-with-grayscale", description: "Apply a grayscale effect." },
    { name: "-with-blur", description: "Apply a blur effect." },
  ],
  examples: ['<img class="instui-img" alt="Gradient">'],
  css: (p) => {
    const root = `.${p}img`;
    return `
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
