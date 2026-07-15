import { defineComponent } from "../lib/define.ts";
import { css } from "../lib/css.ts";

export const radio = defineComponent({
  name: "radio",
  css: (p) => {
    const std = `.${p}radio:not(.-variant-toggle):not(.-toggle)`;
    const tog = `.${p}radio.-variant-toggle`;
    // prettier-ignore
    return css`
/**
 * @component radio
 * @summary A native radio button and its label.
 * @modifier -context-off — Off/neutral context colour (toggle variant).
 * @modifier -context-success — Success context colour (toggle variant).
 * @modifier -context-warning — Warning context colour (toggle variant).
 * @modifier -context-danger — Danger context colour (toggle variant).
 * @modifier -readonly — Read-only state.
 * @modifier -variant-toggle — Render as a segmented toggle button.
 * @modifier -size-sm — Small.
 * @modifier -size-lg — Large.
 * @modifier -toggle — @deprecated {@link -variant-toggle}
 * @pseudo ::before — The filled inner dot shown when checked; on \`-variant-toggle\` it is the focus ring drawn just outside the pill.
 * @cssproperty --pantoken-rt-fill <color> — The toggle's selected fill colour; the -context-* modifiers set it.
 * @cssstate checked
 * @cssstate disabled
 * @accessibility A native \`<input type="radio">\` drives \`:checked\` and \`:disabled\`; \`-readonly\` is styling only, since radios have no native readonly attribute.
 * @example
 * <label class="instui-radio"><input type="radio" name="r" checked> Option A</label>
 * @related checkbox — The multi-select counterpart to a single-select radio.
 * @related radio-input-group — Collects radios into one single-select fieldset.
 */
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
/* variant=toggle — a segmented control (InstUI RadioInput toggle facade). Each segment is plain
   uppercase label text; the facade is hidden until checked, so unselected segments have NO border and
   NO background. Only the SELECTED segment shows a pill: the context fill, the resting (depth1) shadow,
   rounded corners, and white text. The fill is indirected through --pantoken-rt-fill so -context-* is a
   one-line override (default success/green). */
${tog} {
  --pantoken-rt-fill: var(--instui-component-radio-input-toggle-background-success);
  position: relative;
  justify-content: center;
  gap: 0;
  height: var(--instui-component-radio-input-toggle-medium-height);
  padding-inline: 0.875rem;
  border-radius: var(--instui-component-radio-input-toggle-border-radius);
  background: transparent;
  color: var(--instui-component-radio-input-label-base-color);
  font-size: var(--instui-component-radio-input-toggle-medium-font-size);
  line-height: 1;
  text-transform: uppercase;
  white-space: nowrap;
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease;
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
/* Selected: the pill appears — the context fill, white label, and the resting elevation shadow. */
${tog}:has(input:checked) {
  background: var(--pantoken-rt-fill);
  color: var(--instui-component-radio-input-toggle-handle-text);
  box-shadow: var(--instui-elevation-depth1);
}
/* Focus: underline the label and draw a ring offset just outside the pill (the InstUI focus facade). */
${tog}:has(input:focus-visible) {
  text-decoration: underline;
}
${tog}:has(input:focus-visible)::before {
  content: "";
  position: absolute;
  inset: -0.25rem;
  border: var(--instui-focus-outline-width) var(--instui-focus-outline-style) var(--instui-focus-outline-color);
  border-radius: calc(var(--instui-component-radio-input-toggle-border-radius) + 0.0625rem);
  pointer-events: none;
}
${tog}:has(input:disabled) {
  opacity: 0.5;
  cursor: not-allowed;
}
${tog}.-size-sm {
  height: var(--instui-component-radio-input-toggle-small-height);
  font-size: var(--instui-component-radio-input-toggle-small-font-size);
  padding-inline: 0.5rem;
}
${tog}.-size-lg {
  height: var(--instui-component-radio-input-toggle-large-height);
  font-size: var(--instui-component-radio-input-toggle-large-font-size);
  padding-inline: 1rem;
}`;
  },
});

export const radioCss = radio.css;
