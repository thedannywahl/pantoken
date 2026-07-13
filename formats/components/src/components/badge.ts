import { defineComponent } from "../lib/define.ts";

export const badge = defineComponent({
  name: "badge",
  css: (p) => `
/**
 * @component badge
 * @summary A small count or status dot placed over a target's corner.
 * @modifier -color-success — A positive/complete count.
 * @modifier -color-danger — An attention/error count.
 * @modifier -color-inverse — On-dark: a light chip with dark text.
 * @modifier -type-notification — A dot only, no count.
 * @modifier -pulse — A pulsing attention ring.
 * @modifier -standalone — Render inline, not positioned over a target's corner.
 * @modifier -placement-top-start — Position at the top-start corner.
 * @modifier -placement-top-end — Position at the top-end corner.
 * @modifier -placement-bottom-start — Position at the bottom-start corner.
 * @modifier -placement-bottom-end — Position at the bottom-end corner.
 * @modifier -placement-start-center — Position centred on the start edge.
 * @modifier -placement-end-center — Position centred on the end edge.
 * @part .badge-wrapper — Wrap a target so a placed badge sits over its corner.
 * @cssproperty --pantoken-badge-accent <color> — The chip fill; each \`-color-*\` variant and the pulse ring read from it.
 * @cssproperty --pantoken-badge-text <color> — The text colour, paired to the accent so it stays legible.
 * @example
 * <span class="instui-badge">4</span>
 * @structure
 * .instui-badge-wrapper {
 *   .instui-badge {}
 * }
 * @related pill — The inline label-chip counterpart.
 * @demo self:badge
 */
@keyframes pantoken-badge-pulse {
  from { transform: scale(1); opacity: 0.7; }
  to { transform: scale(1.8); opacity: 0; }
}
/* Wrap a target in this so a placed badge can sit over its corner. It contains the badge (rather than
   being contained by it), so it's a flat prefixed class, not a scoped element. */
.${p}badge-wrapper {
  position: relative;
  display: inline-flex;
}
.${p}badge {
  --pantoken-badge-accent: var(--instui-component-badge-color-primary);
  /* The primary fill is the brand colour, which flips dark→light between light and dark mode; pair the
     text so it stays legible either way (white on the light-mode navy, dark on the dark-mode light
     fill). The saturated status fills below keep white text in both modes. */
  --pantoken-badge-text: light-dark(var(--instui-component-badge-color), var(--instui-component-badge-color-inverse));
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: var(--instui-component-badge-size);
  height: var(--instui-component-badge-size);
  padding: 0 var(--instui-component-badge-padding);
  font-family: var(--instui-component-badge-font-family);
  font-size: var(--instui-component-badge-font-size);
  font-weight: var(--instui-component-badge-font-weight);
  line-height: 1;
  border-radius: var(--instui-component-badge-border-radius);
  background: var(--pantoken-badge-accent);
  color: var(--pantoken-badge-text);
}
.${p}badge.-color-success {
  --pantoken-badge-accent: var(--instui-component-badge-color-success);
  --pantoken-badge-text: var(--instui-component-badge-color);
}
.${p}badge.-color-danger {
  --pantoken-badge-accent: var(--instui-component-badge-color-danger);
  --pantoken-badge-text: var(--instui-component-badge-color);
}
/* Inverse swaps fill and text (InstUI): a light chip with dark text, for a colour/dark surface. */
.${p}badge.-color-inverse {
  --pantoken-badge-accent: var(--instui-component-badge-color);
  --pantoken-badge-text: var(--instui-component-badge-color-inverse);
}
/* Notification: a small dot, no count. */
.${p}badge.-type-notification {
  min-width: 0;
  width: var(--instui-spacing-space-sm);
  height: var(--instui-spacing-space-sm);
  padding: 0;
  font-size: 0;
}
/* Pulse: an expanding ring in the badge's accent colour (InstUI \`pulse\`). */
.${p}badge.-pulse::before {
  content: "";
  position: absolute;
  inset: 0;
  border: var(--instui-border-width-md) solid var(--pantoken-badge-accent);
  border-radius: inherit;
  animation: pantoken-badge-pulse 1.2s ease-out infinite;
}
/* Placement: position the badge over a \`.badge-wrapper\` target. InstUI's countOffset is 0.5rem. */
.${p}badge.-placement-top-end,
.${p}badge.-placement-top-start,
.${p}badge.-placement-bottom-end,
.${p}badge.-placement-bottom-start,
.${p}badge.-placement-start-center,
.${p}badge.-placement-end-center {
  position: absolute;
}
.${p}badge.-placement-top-end { top: -0.5rem; inset-inline-end: -0.5rem; }
.${p}badge.-placement-top-start { top: -0.5rem; inset-inline-start: -0.5rem; }
.${p}badge.-placement-bottom-end { bottom: -0.5rem; inset-inline-end: -0.5rem; }
.${p}badge.-placement-bottom-start { bottom: -0.5rem; inset-inline-start: -0.5rem; }
.${p}badge.-placement-end-center { top: 50%; inset-inline-end: -0.5rem; transform: translateY(-50%); }
.${p}badge.-placement-start-center { top: 50%; inset-inline-start: -0.5rem; transform: translateY(-50%); }
/* Standalone: the inline chip, in flow — resets any placement. */
.${p}badge.-standalone {
  position: relative;
  inset: auto;
  transform: none;
}`,
});

export const badgeCss = badge.css;
