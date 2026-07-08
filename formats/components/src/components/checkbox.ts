import { defineComponent } from "../lib/define.ts";
import { scope, CHECK_ICON, MINUS_ICON } from "../lib/helpers.ts";

export const checkbox = defineComponent({
  name: "checkbox",
  summary: "A native checkbox and its label, or a switch via `-variant-toggle`.",
  modifiers: [
    { name: "-invalid", description: "Invalid (error) state." },
    { name: "-label-placement-end", description: "Place the label after the control." },
    { name: "-label-placement-start", description: "Place the label before the control." },
    { name: "-label-placement-top", description: "Place the label above the control." },
    { name: "-readonly", description: "Read-only state." },
    { name: "-variant-toggle", description: "Render as a switch instead of a box." },
    { name: "-size-sm", description: "Small." },
    { name: "-size-lg", description: "Large." },
  ],
  parts: [{ name: ".asterisk", description: "The required-field asterisk." }],
  examples: ['<label class="instui-checkbox"><input type="checkbox" checked> Checked</label>'],
  css: (p) => {
    const base = `.${p}checkbox:not(.${p}checkbox.-variant-toggle)`;
    return `
.${p}checkbox {
  display: inline-flex;
  align-items: center;
  gap: var(--instui-component-checkbox-gap);
  color: var(--instui-component-checkbox-label-base-color);
  font-family: var(--instui-component-checkbox-font-family);
  font-size: var(--instui-component-checkbox-font-size-md);
  font-weight: var(--instui-component-checkbox-font-weight);
  line-height: var(--instui-component-checkbox-line-height);
}
/* labelPlacement: the control comes first in the markup, so reorder with flex. Default is "end"
   (label after the control); "start" puts it before, "top" stacks it above. */
.${p}checkbox.-label-placement-end { flex-direction: row; }
.${p}checkbox.-label-placement-start { flex-direction: row-reverse; }
.${p}checkbox.-label-placement-top {
  flex-direction: column-reverse;
  align-items: flex-start;
}
/* Base control: a native checkbox restyled via appearance:none so the InstUI border/background/checked
   tokens all apply, with the tick masked into a ::before. Scoped away from the --toggle switch. */
${base} input[type="checkbox"] {
  appearance: none;
  -webkit-appearance: none;
  display: inline-grid;
  place-content: center;
  flex: none;
  width: var(--instui-component-checkbox-control-size-md);
  height: var(--instui-component-checkbox-control-size-md);
  margin-block: var(--instui-component-checkbox-control-vertical-margin);
  border: var(--instui-component-checkbox-border-width) solid var(--instui-component-checkbox-border-color);
  border-radius: var(--instui-component-checkbox-border-radius);
  background: var(--instui-component-checkbox-background-color);
  cursor: pointer;
  transition: background-color 0.15s ease, border-color 0.15s ease;
}
${base} input[type="checkbox"] { --pantoken-cb-glyph: ${CHECK_ICON}; }
${base} input[type="checkbox"]::before {
  content: "";
  width: 0.75em;
  height: 0.75em;
  /* Auto-contrast the tick against the checked fill: white on a dark fill, near-black on a light one.
     The fill token is light-dark(), so a fixed on-color would vanish in one scheme. */
  background: oklch(from var(--instui-component-checkbox-background-checked-color) clamp(0, (0.62 - l) * infinity, 1) 0 0);
  -webkit-mask: var(--pantoken-cb-glyph);
  mask: var(--pantoken-cb-glyph);
  transform: scale(0);
  transition: transform 0.1s ease;
}
${base} input[type="checkbox"]:hover {
  border-color: var(--instui-component-checkbox-border-hover-color);
  background: var(--instui-component-checkbox-background-hover-color);
}
${base} input[type="checkbox"]:checked,
${base} input[type="checkbox"]:indeterminate {
  border-color: var(--instui-component-checkbox-border-checked-color);
  background: var(--instui-component-checkbox-background-checked-color);
}
${base} input[type="checkbox"]:checked::before,
${base} input[type="checkbox"]:indeterminate::before { transform: scale(1); }
/* Indeterminate (mixed) state: a dash in place of the tick. Set el.indeterminate = true in JS. */
${base} input[type="checkbox"]:indeterminate { --pantoken-cb-glyph: ${MINUS_ICON}; }
${base} input[type="checkbox"]:disabled {
  border-color: var(--instui-component-checkbox-border-disabled-color);
  background: var(--instui-component-checkbox-background-disabled-color);
  cursor: not-allowed;
}
.${p}checkbox:has(input:disabled) { color: var(--instui-component-checkbox-label-disabled-color); }
.${p}checkbox:hover { color: var(--instui-component-checkbox-label-hover-color); }
.${p}checkbox.-size-sm {
  font-size: var(--instui-component-checkbox-font-size-sm);
}
${base}.${p}checkbox.-size-sm input[type="checkbox"] {
  width: var(--instui-component-checkbox-control-size-sm);
  height: var(--instui-component-checkbox-control-size-sm);
}
.${p}checkbox.-size-lg {
  font-size: var(--instui-component-checkbox-font-size-lg);
}
${base}.${p}checkbox.-size-lg input[type="checkbox"] {
  width: var(--instui-component-checkbox-control-size-lg);
  height: var(--instui-component-checkbox-control-size-lg);
}
${base}.${p}checkbox.-invalid input[type="checkbox"] { border-color: var(--instui-component-checkbox-error-border-color); }
${base}.${p}checkbox.-invalid input[type="checkbox"]:hover { border-color: var(--instui-component-checkbox-error-border-hover-color); }
.${p}checkbox.-readonly {
  color: var(--instui-component-checkbox-label-readonly-color);
}
${base}.${p}checkbox.-readonly input[type="checkbox"] {
  border-color: var(--instui-component-checkbox-border-readonly-color);
  background: var(--instui-component-checkbox-background-readonly-color);
}
${scope(`.${p}checkbox`, `.${p}checkbox.-required .asterisk { color: var(--instui-component-checkbox-asterisk-color); }`)}
.${p}checkbox.-variant-toggle input[type="checkbox"] {
  /* InstUI's toggle facade is a fixed 40x24 switch: the switch height is the small choice-control
     size (24px), while the toggle-medium-height token (40px) is the track width. Its border is the
     small width (the toggle-border-width token resolves to the 4px large width, far too heavy), drawn
     as an inset shadow so it doesn't shift the absolutely-positioned handle. The handle sits 3x the
     border-width in from each edge and travels the difference (width - height). */
  --pantoken-toggle-h: var(--instui-size-choice-control-height-md);
  --pantoken-toggle-w: var(--instui-component-radio-input-toggle-medium-height);
  --pantoken-toggle-bw: var(--instui-border-width-sm);
  --pantoken-toggle-inset: calc(var(--pantoken-toggle-bw) * 3);
  --pantoken-toggle-handle: calc(var(--pantoken-toggle-h) - var(--pantoken-toggle-inset) * 2);
  appearance: none;
  -webkit-appearance: none;
  position: relative;
  width: var(--pantoken-toggle-w);
  height: var(--pantoken-toggle-h);
  border: 0;
  border-radius: var(--pantoken-toggle-h);
  box-shadow: inset 0 0 0 var(--pantoken-toggle-bw) var(--instui-color-stroke-base);
  /* The rebrand theme resolves toggle-background-off to the same green as the on state, so the off
     track uses the neutral muted background; the handle position and on-color signal the state. */
  background: var(--instui-color-background-muted);
  cursor: pointer;
  transition: background-color 0.15s ease;
}
.${p}checkbox.-variant-toggle input[type="checkbox"]::before {
  content: "";
  position: absolute;
  top: 50%;
  inset-inline-start: var(--pantoken-toggle-inset);
  transform: translateY(-50%);
  box-sizing: border-box;
  width: var(--pantoken-toggle-handle);
  height: var(--pantoken-toggle-handle);
  border-radius: 50%;
  border: var(--pantoken-toggle-bw) solid var(--instui-color-stroke-base);
  background: var(--instui-component-radio-input-toggle-handle-text);
  transition: inset-inline-start 0.15s ease;
}
/* A state glyph riding on the handle: an X when off, a check when on, in the track color. */
.${p}checkbox.-variant-toggle input[type="checkbox"]::after {
  content: "";
  position: absolute;
  top: 50%;
  inset-inline-start: var(--pantoken-toggle-inset);
  transform: translateY(-50%);
  width: var(--pantoken-toggle-handle);
  height: var(--pantoken-toggle-handle);
  background: var(--instui-color-text-muted);
  -webkit-mask: var(--instui-icon-x) center / 58% no-repeat;
  mask: var(--instui-icon-x) center / 58% no-repeat;
  transition: inset-inline-start 0.15s ease;
}
.${p}checkbox.-variant-toggle input[type="checkbox"]:checked {
  background: var(--instui-component-radio-input-toggle-background-success);
}
.${p}checkbox.-variant-toggle input[type="checkbox"]:checked::before {
  inset-inline-start: calc(100% - var(--pantoken-toggle-h) + var(--pantoken-toggle-inset));
  border-color: var(--instui-component-radio-input-toggle-background-success);
}
.${p}checkbox.-variant-toggle input[type="checkbox"]:checked::after {
  inset-inline-start: calc(100% - var(--pantoken-toggle-h) + var(--pantoken-toggle-inset));
  background: var(--instui-component-radio-input-toggle-background-success);
  -webkit-mask: var(--instui-icon-check) center / 58% no-repeat;
  mask: var(--instui-icon-check) center / 58% no-repeat;
}`;
  },
});

export const checkboxCss = checkbox.css;
