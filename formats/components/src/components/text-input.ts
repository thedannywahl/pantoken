import { defineComponent } from "../lib/define.ts";
import { css } from "../lib/css.ts";
import { fieldControlBase } from "../lib/field-controls.ts";

export const textInput = defineComponent({
  name: "text-input",
  css: (p) => {
    const t = (s: string): string => `var(--instui-component-text-input-${s})`;
    // prettier-ignore
    return css`
/**
 * @component text-input
 * @summary A styled native \`<input>\` — including \`date\`, \`time\`, and \`datetime-local\`, where the browser supplies the picker — with validation states and sizes.
 * @modifier -disabled — Disabled state.
 * @modifier -invalid — Invalid (error) state.
 * @modifier -readonly — Read-only state.
 * @modifier -success — Success (valid) state.
 * @modifier -size-sm — Small.
 * @modifier -size-lg — Large.
 * @pseudo ::placeholder — The placeholder text, in a muted color that shifts on hover.
 * @cssstate disabled
 * @example
 * <input class="${p}text-input" placeholder="Default">
 * @related text-area — The multi-line counterpart with the same states and sizes.
 * @related number-input — The numeric-entry input sharing this chrome.
 * @related simple-select — The native select sharing this field chrome.
 * @related input-group — Wraps this input with leading and trailing slots.
 */
${fieldControlBase(p, "text-input", "text-input")}
.${p}text-input {
  block-size: ${t("height-md")};
  padding-inline: ${t("padding-horizontal-md")};
  font-size: ${t("font-size-md")};
}
.${p}text-input.-size-sm { block-size: ${t("height-sm")}; padding-inline: ${t("padding-horizontal-sm")}; font-size: ${t("font-size-sm")}; }
.${p}text-input.-size-lg { block-size: ${t("height-lg")}; padding-inline: ${t("padding-horizontal-lg")}; font-size: ${t("font-size-lg")}; }`;
  },
});

export const textInputCss = textInput.css;
