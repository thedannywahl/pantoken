import { defineComponent } from "../lib/define.ts";

export const radio = defineComponent({
  name: "radio",
  summary: "A native radio button and its label.",
  modifiers: [
    { name: "-context-off", description: "Off/neutral context colour (toggle variant)." },
    { name: "-context-success", description: "Success context colour (toggle variant)." },
    { name: "-context-warning", description: "Warning context colour (toggle variant)." },
    { name: "-context-danger", description: "Danger context colour (toggle variant)." },
    { name: "-readonly", description: "Read-only state." },
    { name: "-variant-toggle", description: "Render as a segmented toggle button." },
    { name: "-size-sm", description: "Small." },
    { name: "-size-lg", description: "Large." },
  ],
  examples: ['<label class="instui-radio"><input type="radio" name="r" checked> Option A</label>'],
  css: (p) => {
    const std = `.${p}radio:not(.-variant-toggle):not(.-toggle)`;
    const tog = `.${p}radio.-variant-toggle`;
    return `
.${p}radio {
  display: inline-flex;
  align-items: center;
  gap: var(--instui-component-radio-input-gap);
  color: var(--instui-component-radio-input-label-base-color);
  font-family: var(--instui-component-radio-input-font-family);
  font-size: var(--instui-component-radio-input-font-size-md);
  font-weight: var(--instui-component-radio-input-font-weight);
  line-height: var(--instui-component-radio-input-line-height-md);
}
${std} input[type="radio"] {
  appearance: none;
  -webkit-appearance: none;
  display: inline-grid;
  place-content: center;
  flex: none;
  width: var(--instui-component-radio-input-control-size-md);
  height: var(--instui-component-radio-input-control-size-md);
  margin-block: var(--instui-component-radio-input-control-vertical-margin);
  border: var(--instui-component-radio-input-border-width) solid var(--instui-component-radio-input-border-color);
  border-radius: 50%;
  background: var(--instui-component-radio-input-background-color);
  cursor: pointer;
  transition: border-color 0.15s ease, background-color 0.15s ease;
}
${std} input[type="radio"]::before {
  content: "";
  width: calc(var(--instui-component-radio-input-control-size-md) - 2 * var(--instui-component-radio-input-checked-inset-md));
  height: calc(var(--instui-component-radio-input-control-size-md) - 2 * var(--instui-component-radio-input-checked-inset-md));
  border-radius: 50%;
  background: var(--instui-component-radio-input-border-selected-color);
  transform: scale(0);
  transition: transform 0.1s ease;
}
${std} input[type="radio"]:hover {
  border-color: var(--instui-component-radio-input-border-hover-color);
  background: var(--instui-component-radio-input-background-hover-color);
}
${std} input[type="radio"]:checked { border-color: var(--instui-component-radio-input-border-selected-color); }
${std} input[type="radio"]:checked::before { transform: scale(1); }
${std} input[type="radio"]:disabled {
  border-color: var(--instui-component-radio-input-border-disabled-color);
  background: var(--instui-component-radio-input-background-disabled-color);
  cursor: not-allowed;
}
${std}:has(input:disabled) { color: var(--instui-component-radio-input-label-disabled-color); }
${std}:hover { color: var(--instui-component-radio-input-label-hover-color); }
${std}.-size-sm {
  font-size: var(--instui-component-radio-input-font-size-sm);
  line-height: var(--instui-component-radio-input-line-height-sm);
}
${std}.-size-sm input[type="radio"] {
  width: var(--instui-component-radio-input-control-size-sm);
  height: var(--instui-component-radio-input-control-size-sm);
}
${std}.-size-sm input[type="radio"]::before {
  width: calc(var(--instui-component-radio-input-control-size-sm) - 2 * var(--instui-component-radio-input-checked-inset-sm));
  height: calc(var(--instui-component-radio-input-control-size-sm) - 2 * var(--instui-component-radio-input-checked-inset-sm));
}
${std}.-size-lg {
  font-size: var(--instui-component-radio-input-font-size-lg);
  line-height: var(--instui-component-radio-input-line-height-lg);
}
${std}.-size-lg input[type="radio"] {
  width: var(--instui-component-radio-input-control-size-lg);
  height: var(--instui-component-radio-input-control-size-lg);
}
${std}.-size-lg input[type="radio"]::before {
  width: calc(var(--instui-component-radio-input-control-size-lg) - 2 * var(--instui-component-radio-input-checked-inset-lg));
  height: calc(var(--instui-component-radio-input-control-size-lg) - 2 * var(--instui-component-radio-input-checked-inset-lg));
}
${std}.-readonly {
  color: var(--instui-component-radio-input-label-readonly-color);
}
${std}.-readonly input[type="radio"] {
  border-color: var(--instui-component-radio-input-border-readonly-color);
  background: var(--instui-component-radio-input-background-readonly-color);
}
/* variant=toggle — the segmented-button look. The selected fill is a context colour, indirected
   through --pantoken-rt-fill so -context-* is a one-line override (default success/green). */
${tog} {
  --pantoken-rt-fill: var(--instui-component-radio-input-toggle-background-success);
  position: relative;
  justify-content: center;
  gap: 0;
  height: var(--instui-component-radio-input-toggle-medium-height);
  padding-inline: var(--instui-spacing-space-md);
  border: var(--instui-component-radio-input-toggle-border-width) solid var(--instui-color-stroke-base);
  border-radius: var(--instui-component-radio-input-toggle-border-radius);
  /* Unselected fill is the neutral muted surface: the toggle-background-off token resolves to the same
     green as success in-theme, so it can't read as "off" — the -context-* fills below drive selection. */
  background: var(--instui-color-background-muted);
  color: var(--instui-component-radio-input-label-base-color);
  font-size: var(--instui-component-radio-input-toggle-medium-font-size);
  cursor: pointer;
  transition: background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease;
}
/* Clip the native control (still focusable + in the a11y tree); the label is the button. */
${tog} input[type="radio"] {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
}
${tog}.-context-off { --pantoken-rt-fill: var(--instui-component-radio-input-toggle-background-off); }
${tog}.-context-success { --pantoken-rt-fill: var(--instui-component-radio-input-toggle-background-success); }
${tog}.-context-danger { --pantoken-rt-fill: var(--instui-component-radio-input-toggle-background-danger); }
${tog}.-context-warning { --pantoken-rt-fill: var(--instui-component-radio-input-toggle-background-warning); }
${tog}:has(input:checked) {
  background: var(--pantoken-rt-fill);
  border-color: var(--pantoken-rt-fill);
  color: var(--instui-component-radio-input-toggle-handle-text);
}
${tog}:has(input:focus-visible) {
  outline: var(--instui-focus-outline-width) var(--instui-focus-outline-style) var(--instui-focus-outline-color);
  outline-offset: var(--instui-focus-outline-offset);
}
${tog}:has(input:disabled) {
  opacity: 0.5;
  cursor: not-allowed;
}
${tog}.-size-sm {
  height: var(--instui-component-radio-input-toggle-small-height);
  font-size: var(--instui-component-radio-input-toggle-small-font-size);
}
${tog}.-size-lg {
  height: var(--instui-component-radio-input-toggle-large-height);
  font-size: var(--instui-component-radio-input-toggle-large-font-size);
}`;
  },
});

export const radioCss = radio.css;
