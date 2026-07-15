import { defineComponent } from "../lib/define.ts";
import { css } from "../lib/css.ts";
import { AI_ICON_MASK } from "../lib/helpers.ts";
import { alpha, darken } from "@pantoken/plugin-colors";

export const button = defineComponent({
  name: "button",
  css: (p) =>
    // prettier-ignore
    css`
/**
 * @component button
 * @summary An accessible action control, styled from the token palette; primary by default.
 * @remarks The AI variants layer two gradients — a padding-box fill and a border-box stroke — for their frame, and \`-color-ai-secondary\` can't paint gradient text and a fill at once, so its centre stays transparent at rest and fills on hover or active. Ghost hover and active derive a low-opacity, slightly-darkened brand wash rather than using the raw hover-background tokens, which would print same-colour-on-same-colour text.
 * @modifier -color-secondary — A lower-emphasis secondary action.
 * @modifier -color-tertiary — A text-style action (no fill or border until hover).
 * @modifier -color-danger — A destructive action.
 * @modifier -shape-circle — A round icon button.
 * @modifier -condensed — Tighter padding for dense toolbars.
 * @modifier -toggle — A pressed-state toggle button (drive with aria-pressed).
 * @modifier -without-background — Drop the fill (ghost).
 * @modifier -color-success — A positive/confirming action.
 * @modifier -color-ai — An AI action.
 * @modifier -color-ai-secondary — A lower-emphasis AI action.
 * @modifier -color-primary-inverse — Primary action for dark backgrounds.
 * @modifier -size-sm — Small.
 * @modifier -size-lg — Large.
 * @modifier -shape-square — A square icon button.
 * @modifier -display-block — Full-width block button.
 * @modifier -ghost — Outline (ghost) style: a border in the colour's ghost tokens, no fill.
 * @modifier -without-border — Remove the border.
 * @modifier -icon-* — Render a glyph from the icon set before the label (e.g. \`-icon-arrow-right\`), painted in the button's text colour; pair with \`-shape-square\`/\`-shape-circle\` for an icon-only button.
 * @pseudo ::before — The AI glyph, added automatically to AI buttons and masked in the variant's own colour.
 * @pseudo ::after — The AI-secondary gradient border ring, masked to just the button's frame.
 * @cssstate disabled
 * @cssstate pressed
 * @a11y Drive the \`-toggle\` variant's pressed state with \`aria-pressed\`, and mark a disabled button with \`aria-disabled\` (or the native \`disabled\`).
 * @example
 * <button class="instui-button">Primary</button>
 * @related close-button — The icon-only dismiss button.
 * @demo self:button
 */
.${p}button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--instui-spacing-space-xs);
  min-height: var(--instui-component-base-button-medium-height);
  padding: var(--instui-spacing-space-xs) var(--instui-component-base-button-medium-padding-horizontal);
  font-family: var(--instui-font-family-base);
  font-size: var(--instui-component-base-button-medium-font-size);
  font-weight: var(--instui-font-weight-interactive);
  line-height: var(--instui-line-height-standalone-text-base);
  border: var(--instui-border-width-md) solid transparent;
  border-radius: var(--instui-component-base-button-border-radius);
  cursor: pointer;
  background: var(--instui-color-background-interactive-action-primary-base);
  color: var(--instui-color-text-interactive-action-primary-base);
}
.${p}button:hover { background: var(--instui-color-background-interactive-action-primary-hover); }
.${p}button:active { background: var(--instui-color-background-interactive-action-primary-active); }
.${p}button:disabled,
.${p}button[aria-disabled="true"] {
  background: var(--instui-color-background-interactive-action-primary-disabled);
  color: var(--instui-color-text-interactive-action-primary-disabled);
  cursor: not-allowed;
}
.${p}button.-color-secondary {
  background: var(--instui-color-background-interactive-action-secondary-base);
  color: var(--instui-color-text-interactive-action-secondary-base);
  border-color: var(--instui-color-stroke-interactive-action-secondary-base);
}
.${p}button.-color-secondary:hover {
  background: var(--instui-color-background-interactive-action-secondary-hover);
  border-color: var(--instui-color-stroke-interactive-action-secondary-hover);
}
.${p}button.-color-secondary:active {
  background: var(--instui-color-background-interactive-action-secondary-active);
  border-color: var(--instui-color-stroke-interactive-action-secondary-active);
}
.${p}button.-color-danger {
  background: var(--instui-color-background-interactive-action-destructive-base);
  color: var(--instui-color-text-interactive-action-status-base);
}
.${p}button.-color-danger:hover { background: var(--instui-color-background-interactive-action-destructive-hover); }
.${p}button.-color-danger:active { background: var(--instui-color-background-interactive-action-destructive-active); }
.${p}button.-color-success {
  background: var(--instui-color-background-interactive-action-success-base);
  color: var(--instui-color-text-interactive-action-status-base);
}
.${p}button.-color-success:hover { background: var(--instui-color-background-interactive-action-success-hover); }
.${p}button.-color-tertiary {
  background: transparent;
  color: var(--instui-color-text-interactive-action-tertiary-base);
  border-color: var(--instui-color-stroke-interactive-action-tertiary-base);
}
.${p}button.-color-tertiary:hover { background: var(--instui-color-background-interactive-action-tertiary-hover); }
.${p}button.-color-tertiary:active { background: var(--instui-color-background-interactive-action-tertiary-active); }
.${p}button.-color-primary-inverse {
  background: var(--instui-component-base-button-primary-inverse-background);
  color: var(--instui-component-base-button-primary-inverse-color);
  border-color: var(--instui-component-base-button-primary-inverse-border-color);
}
/* On hover the border tracks the (light) hover fill, so it reads as no visible border. */
.${p}button.-color-primary-inverse:hover {
  background: var(--instui-component-base-button-primary-inverse-hover-background);
  border-color: var(--instui-component-base-button-primary-on-color-hover-border-color);
}
.${p}button.-color-primary-inverse:active {
  background: var(--instui-component-base-button-primary-inverse-active-background);
  border-color: var(--instui-component-base-button-primary-on-color-active-border-color);
}
/*
 * AI buttons carry two gradients: the fill (padding-box) and a distinct stroke gradient (border-box)
 * that shows through the transparent border — InstUI's ai-primary technique. The ai glyph is added
 * automatically via ::before.
 */
.${p}button.-color-ai {
  color: var(--instui-color-text-interactive-action-ai-base);
  border-color: transparent;
  background:
    linear-gradient(to bottom, var(--instui-color-background-interactive-action-ai-top-gradient-base) 0%, var(--instui-color-background-interactive-action-ai-bottom-gradient-base) 100%) padding-box,
    linear-gradient(to bottom, var(--instui-color-stroke-interactive-action-ai-top-gradient-base) 0%, var(--instui-color-stroke-interactive-action-ai-bottom-gradient-base) 100%) border-box;
}
.${p}button.-color-ai:hover {
  color: var(--instui-color-text-interactive-action-ai-hover);
  background:
    linear-gradient(to bottom, var(--instui-color-background-interactive-action-ai-top-gradient-hover) 0%, var(--instui-color-background-interactive-action-ai-bottom-gradient-hover) 100%) padding-box,
    linear-gradient(to bottom, var(--instui-color-stroke-interactive-action-ai-top-gradient-hover) 0%, var(--instui-color-stroke-interactive-action-ai-bottom-gradient-hover) 100%) border-box;
}
.${p}button.-color-ai:active {
  color: var(--instui-color-text-interactive-action-ai-active);
  background:
    linear-gradient(to bottom, var(--instui-color-background-interactive-action-ai-top-gradient-active) 0%, var(--instui-color-background-interactive-action-ai-bottom-gradient-active) 100%) padding-box,
    linear-gradient(to bottom, var(--instui-color-stroke-interactive-action-ai-top-gradient-active) 0%, var(--instui-color-stroke-interactive-action-ai-bottom-gradient-active) 100%) border-box;
}
/*
 * ai-secondary matches InstUI: a transparent rest fill, a violet→sea gradient border ring (::after,
 * masked to just the frame), and violet→sea gradient text (background-clip: text). The ai glyph
 * (::before) picks up the same gradient. A single element can't paint gradient text and a fill at
 * once, so — like InstUI's rest state — the centre stays transparent.
 */
.${p}button.-color-ai-secondary {
  position: relative;
  border-color: transparent;
  background: linear-gradient(to bottom, var(--instui-color-text-interactive-action-ai-secondary-top-gradient-base) 0%, var(--instui-color-text-interactive-action-ai-secondary-bottom-gradient-base) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}
/*
 * The ring spans the border-box (outermost) edge, so it isn't inset past the base button's
 * transparent border. The negative inset reaches out over that border; the radius is inherited, so
 * it stays concentric with the button's outer corners.
 */
.${p}button.-color-ai-secondary::after {
  content: "";
  position: absolute;
  inset: calc(-1 * var(--instui-border-width-md));
  border-radius: inherit;
  padding: var(--instui-border-width-sm);
  background: linear-gradient(to bottom, var(--instui-color-stroke-interactive-action-ai-top-gradient-base) 0%, var(--instui-color-stroke-interactive-action-ai-bottom-gradient-base) 100%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  pointer-events: none;
}
/*
 * Hover/active trade the clipped gradient text for InstUI's subtle gradient fill plus solid text —
 * one element can't paint clipped gradient text and a fill at once, so the interactive states fill.
 */
.${p}button.-color-ai-secondary:hover,
.${p}button.-color-ai-secondary:active {
  -webkit-background-clip: border-box;
  background-clip: border-box;
  color: var(--instui-color-text-interactive-action-ai-secondary-top-gradient-base);
  -webkit-text-fill-color: currentColor;
}
.${p}button.-color-ai-secondary:hover {
  background: linear-gradient(to bottom, var(--instui-color-background-interactive-action-ai-secondary-hover-top-gradient) 0%, var(--instui-color-background-interactive-action-ai-secondary-hover-bottom-gradient) 100%);
}
.${p}button.-color-ai-secondary:active {
  background: linear-gradient(to bottom, var(--instui-color-background-interactive-action-ai-secondary-active-top-gradient) 0%, var(--instui-color-background-interactive-action-ai-secondary-active-bottom-gradient) 100%);
}
/* The ai glyph, added automatically to every AI button and painted in its own colour. */
.${p}button.-color-ai::before,
.${p}button.-color-ai-secondary::before {
  content: "";
  inline-size: 1em;
  block-size: 1em;
  flex: none;
  -webkit-mask: ${AI_ICON_MASK};
  mask: ${AI_ICON_MASK};
}
.${p}button.-color-ai::before { background: var(--instui-color-text-interactive-action-ai-base); }
.${p}button.-color-ai-secondary::before {
  background: linear-gradient(to bottom, var(--instui-color-stroke-interactive-action-ai-top-gradient-base) 0%, var(--instui-color-stroke-interactive-action-ai-bottom-gradient-base) 100%);
}
/*
 * --ghost is InstUI's withBackground={false}: an outline button in the colour's ghost tokens
 * (transparent fill, coloured border + text). Defaults to primary; compose with --secondary for the
 * secondary ghost.
 */
.${p}button.-without-background {
  background: var(--instui-component-base-button-primary-ghost-background);
  color: var(--instui-component-base-button-primary-ghost-color);
  border-color: var(--instui-component-base-button-primary-ghost-border-color);
}
.${p}button.-color-secondary.-ghost {
  background: var(--instui-component-base-button-secondary-ghost-background);
  color: var(--instui-component-base-button-secondary-ghost-color);
  border-color: var(--instui-component-base-button-secondary-ghost-border-color);
}
/*
 * Ghost hover/active derive a subtle wash from the brand token via @pantoken/plugin-colors —
 * a low-opacity, slightly-darkened brand, exactly as InstUI's runtime computes it
 * (alpha(darken(brand), n)). The *-ghost-hover-background *tokens* resolve to the solid brand fill,
 * which would print same-colour-on-same-colour text; deriving the wash keeps the rest text legible
 * and tracks the brand. See the upstream token issue for why the raw tokens can't be used directly.
 */
.${p}button.-without-background:hover {
  background: ${alpha(darken("var(--instui-component-base-button-primary-ghost-color)", 10), 10)};
}
.${p}button.-without-background:active {
  background: ${alpha(darken("var(--instui-component-base-button-primary-ghost-color)", 10), 20)};
}
.${p}button.-color-secondary.-ghost:hover {
  background: ${alpha(darken("var(--instui-component-base-button-secondary-ghost-color)", 10), 10)};
}
.${p}button.-color-secondary.-ghost:active {
  background: ${alpha(darken("var(--instui-component-base-button-secondary-ghost-color)", 10), 20)};
}
/* --block is InstUI's display="block": a full-width button. */
.${p}button.-display-block {
  display: flex;
  width: 100%;
}
.${p}button.-size-sm {
  font-size: var(--instui-component-base-button-small-font-size);
  min-height: var(--instui-component-base-button-small-height);
  padding-inline: var(--instui-component-base-button-small-padding-horizontal);
}
.${p}button.-size-lg {
  font-size: var(--instui-component-base-button-large-font-size);
  min-height: var(--instui-component-base-button-large-height);
  padding-inline: var(--instui-component-base-button-large-padding-horizontal);
}
.${p}button.-shape-square {
  padding: var(--instui-spacing-space-xs);
  aspect-ratio: 1;
}
.${p}button.-shape-circle {
  padding: var(--instui-spacing-space-xs);
  aspect-ratio: 1;
  border-radius: 50%;
}
/*
 * A composed \`-icon-<name>\` rides the shared icon painter (utilities/icon), so a text button needs no
 * button-specific glyph CSS — the ::before already inherits the label's colour and 1em size. Icon-only
 * shape buttons carry no label, so grow the glyph to fill the square control rather than tracking a
 * (missing) label's cap height.
 */
.${p}button.-shape-square[class*="-icon-"]::before,
.${p}button.-shape-circle[class*="-icon-"]::before {
  inline-size: 1.25em;
  block-size: 1.25em;
}
.${p}button.-condensed {
  background: transparent;
  border-color: transparent;
  min-height: 0;
  color: var(--instui-color-text-interactive-action-secondary-base);
  padding-inline: var(--instui-spacing-space-xs);
}
.${p}button.-condensed:hover { background: var(--instui-color-background-muted); }
.${p}button.-toggle[aria-pressed="true"] {
  background: var(--instui-color-background-interactive-action-secondary-active);
  border-color: var(--instui-color-stroke-interactive-action-secondary-active);
  color: var(--instui-color-text-interactive-action-secondary-base);
}
/* InstUI's withBorder={false}: drop the border but keep the button's box (border-box sizing). */
.${p}button.-without-border { border-style: none; }`,
});

export const buttonCss = button.css;
