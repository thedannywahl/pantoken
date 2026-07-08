import { defineComponent } from "../lib/define.ts";

export const avatar = defineComponent({
  name: "avatar",
  summary: "A user avatar showing initials or an image, circular by default.",
  modifiers: [
    { name: "-color-ai", description: "AI-accent palette colour." },
    { name: "-color-ash", description: "Ash palette colour." },
    { name: "-color-blue", description: "Blue palette colour." },
    { name: "-color-green", description: "Green palette colour." },
    { name: "-color-grey", description: "Grey palette colour." },
    { name: "-color-orange", description: "Orange palette colour." },
    { name: "-color-red", description: "Red palette colour." },
    { name: "-has-inverse-color", description: "Use the inverse (on-dark) text colour." },
    { name: "-shape-rectangle", description: "Square (rectangular) shape instead of a circle." },
    { name: "-show-border", description: "Add a border ring." },
    { name: "-size-2xs", description: "Two sizes smaller." },
    { name: "-size-xs", description: "Extra small." },
    { name: "-size-sm", description: "Small." },
    { name: "-size-lg", description: "Large." },
    { name: "-size-xl", description: "Extra large." },
    { name: "-size-2xl", description: "Two sizes larger." },
    { name: "-color-accent1", deprecated: "{@link -color-blue}" },
    { name: "-color-accent2", deprecated: "{@link -color-green}" },
    { name: "-color-accent3", deprecated: "{@link -color-red}" },
    { name: "-color-accent4", deprecated: "{@link -color-orange}" },
    { name: "-color-accent5", deprecated: "{@link -color-ash}" },
    { name: "-color-accent6", deprecated: "{@link -color-grey}" },
  ],
  examples: ['<span class="instui-avatar">DW</span>'],
  css: (p) => {
    // Default mode: the colour tints the initials (transparent surface). Inverse mode: the colour fills
    // the surface and the initials go on-colour (that rule is more specific, so it wins when combined).
    const color = (name: string): string =>
      `.${p}avatar.-color-${name} { color: var(--instui-component-avatar-${name}-text-color); }
.${p}avatar.-color-${name}.-has-inverse-color { background: var(--instui-component-avatar-${name}-background-color); }`;
    return `
.${p}avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--instui-component-avatar-size-md);
  height: var(--instui-component-avatar-size-md);
  border-radius: 50%;
  overflow: hidden;
  background: var(--instui-component-avatar-background-color);
  color: var(--instui-component-avatar-blue-text-color);
  border: var(--instui-component-avatar-border-width-sm) solid var(--instui-component-avatar-border-color);
  font-family: var(--instui-component-avatar-font-family);
  font-size: var(--instui-component-avatar-font-size-md);
  font-weight: var(--instui-component-avatar-font-weight);
}
.${p}avatar.-shape-rectangle { border-radius: var(--instui-component-avatar-rectangle-radius); }
.${p}avatar.-size-sm {
  width: var(--instui-component-avatar-size-sm);
  height: var(--instui-component-avatar-size-sm);
  font-size: var(--instui-component-avatar-font-size-sm);
}
.${p}avatar.-size-2xs {
  width: var(--instui-component-avatar-size2xs);
  height: var(--instui-component-avatar-size2xs);
  font-size: var(--instui-component-avatar-font-size2xs);
}
.${p}avatar.-size-xs {
  width: var(--instui-component-avatar-size-xs);
  height: var(--instui-component-avatar-size-xs);
  font-size: var(--instui-component-avatar-font-size-xs);
}
.${p}avatar.-size-lg {
  width: var(--instui-component-avatar-size-lg);
  height: var(--instui-component-avatar-size-lg);
  font-size: var(--instui-component-avatar-font-size-lg);
}
.${p}avatar.-size-xl {
  width: var(--instui-component-avatar-size-xl);
  height: var(--instui-component-avatar-size-xl);
  font-size: var(--instui-component-avatar-font-size-xl);
}
.${p}avatar.-size-2xl {
  width: var(--instui-component-avatar-size2xl);
  height: var(--instui-component-avatar-size2xl);
  font-size: var(--instui-component-avatar-font-size2xl);
}
${color("ash")}
${color("blue")}
${color("green")}
${color("grey")}
${color("orange")}
${color("red")}
/* ai: always the violet→sea gradient fill with on-colour text (no border). */
.${p}avatar.-color-ai {
  background: linear-gradient(to bottom, var(--instui-component-avatar-ai-top-gradient-color), var(--instui-component-avatar-ai-bottom-gradient-color));
  color: var(--instui-component-avatar-text-on-color);
  border-color: transparent;
}
/* hasInverseColor: solid fill (default the accent1/blue surface) + on-colour initials, no ring. A
   \`-color-*\` companion overrides the fill per colour (that rule is more specific). */
.${p}avatar.-has-inverse-color {
  background: var(--instui-component-avatar-blue-background-color);
  color: var(--instui-component-avatar-text-on-color);
  border-color: transparent;
}
/* showBorder="always": force the ring back on, even over an inverse fill or a photo. */
.${p}avatar.-show-border {
  border-width: var(--instui-component-avatar-border-width-md);
  border-style: solid;
  border-color: var(--instui-component-avatar-border-color);
}
/* A photo: an <img> child fills the chip and covers the initials (image takes priority). */
.${p}avatar > img {
  inline-size: 100%;
  block-size: 100%;
  object-fit: cover;
  border-radius: inherit;
}`;
  },
});

export const avatarCss = avatar.css;
