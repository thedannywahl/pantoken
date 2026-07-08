import { defineComponent } from "../lib/define.ts";
import { scope } from "../lib/helpers.ts";

export const billboard = defineComponent({
  name: "billboard",
  summary:
    "A large empty-state or call-to-action block: a hero icon or image, a heading, and a message.",
  modifiers: [
    { name: "-clickable", description: "Interactive (clickable) styling with hover feedback." },
    { name: "-size-sm", description: "Small." },
    { name: "-size-lg", description: "Large." },
  ],
  parts: [
    { name: ".hero", description: "The leading icon or image." },
    { name: ".heading", description: "The billboard heading." },
    { name: ".message", description: "The supporting message." },
  ],
  examples: [
    `<div class="instui-billboard">
  <span class="hero"><span class="instui-icon -icon-inbox"></span></span>
  <div class="heading">No items yet</div>
  <div class="message">Create your first item to get started.</div>
</div>`,
  ],
  structure: `.instui-billboard
  .hero
    .instui-icon.-icon-inbox
  .heading
  .message`,
  css: (p) => {
    const root = `.${p}billboard`;
    // Root + size rules (incl. the size-scoped message font-size) stay outside @scope, prefixed, so the
    // size-alias post-processor's twins stay valid; the size-free element rules go inside.
    return `
${root} {
  display: block;
  text-align: center;
  background: var(--instui-component-billboard-background-color);
  padding: var(--instui-component-billboard-padding-medium);
  margin: var(--instui-component-billboard-medium-margin);
  font-family: var(--instui-component-billboard-font-family);
  color: var(--instui-component-billboard-message-color);
}
.${p}billboard.-size-sm {
  padding: var(--instui-component-billboard-padding-small);
}
.${p}billboard.-size-lg {
  padding: var(--instui-component-billboard-padding-large);
  margin: var(--instui-component-billboard-large-margin);
}
.${p}billboard.-size-sm .message { font-size: var(--instui-component-billboard-message-font-size-small); }
.${p}billboard.-size-lg .message { font-size: var(--instui-component-billboard-message-font-size-large); }
.${p}billboard.-clickable {
  cursor: pointer;
  border: var(--instui-component-billboard-button-border-width) var(--instui-component-billboard-button-border-style) transparent;
  border-radius: var(--instui-component-billboard-button-border-radius);
}
.${p}billboard.-clickable:hover { border-style: var(--instui-component-billboard-button-hover-border-style); }
.${p}billboard.-clickable:active {
  background: var(--instui-component-billboard-clickable-active-bg);
  color: var(--instui-component-billboard-clickable-active-text);
}
${scope(
  root,
  `
/* The hero (an icon or image) leads the block. Size it via font-size on the glyph in the markup. */
.${p}billboard .hero {
  display: inline-flex;
  justify-content: center;
  margin-block-end: var(--instui-spacing-space-sm);
  color: var(--instui-component-billboard-message-color);
}
/* The heading sits above the message — bolder and larger (Billboard renders a Heading here). */
.${p}billboard .heading {
  margin: 0 0 var(--instui-spacing-space-xs);
  color: var(--instui-component-billboard-message-color);
  font-weight: bold;
  font-size: var(--instui-component-billboard-message-font-size-large);
}
.${p}billboard .message {
  color: var(--instui-component-billboard-message-color);
  font-size: var(--instui-component-billboard-message-font-size-medium);
}
.${p}billboard.-clickable .message,
.${p}billboard.-clickable .heading,
.${p}billboard.-clickable .hero { color: var(--instui-component-billboard-message-color-clickable); }
`,
  ["hero", "heading", "message"],
)}`;
  },
});

export const billboardCss = billboard.css;
