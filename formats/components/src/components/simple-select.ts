import { defineComponent } from "../lib/define.ts";
import { SELECT_CHEVRON } from "../lib/helpers.ts";
import { fieldControlBase } from "../lib/field-controls.ts";

export const simpleSelect = defineComponent({
  name: "simple-select",
  css: (p) => {
    const t = (s: string): string => `var(--instui-component-text-input-${s})`;
    return `
/**
 * @component simple-select
 * @summary A styled native \`<select>\` with a caret, matching the text-input states and sizes.
 * @modifier -disabled — Disabled state.
 * @modifier -invalid — Invalid (error) state.
 * @modifier -readonly — Read-only state.
 * @modifier -success — Success (valid) state.
 * @modifier -size-sm — Small.
 * @modifier -size-lg — Large.
 * @cssstate disabled
 * @example
 * <select class="instui-simple-select">
 *   <option>Choose a fruit…</option>
 *   <option>Apple</option>
 *   <option>Orange</option>
 *   <option>Pear</option>
 * </select>
 * @structure
 * .instui-simple-select
 *   option
 */
${fieldControlBase(p, "simple-select", "text-input")}
.${p}simple-select {
  block-size: ${t("height-md")};
  padding-inline: ${t("padding-horizontal-md")};
  padding-inline-end: calc(${t("padding-horizontal-md")} + 1.5rem);
  font-size: ${t("font-size-md")};
  appearance: none;
  -webkit-appearance: none;
  background-image: ${SELECT_CHEVRON};
  background-repeat: no-repeat;
  background-position: right ${t("padding-horizontal-md")} center;
  background-size: 1em;
}
.${p}simple-select.-size-sm { block-size: ${t("height-sm")}; padding-inline: ${t("padding-horizontal-sm")}; padding-inline-end: calc(${t("padding-horizontal-sm")} + 1.5rem); font-size: ${t("font-size-sm")}; }
.${p}simple-select.-size-lg { block-size: ${t("height-lg")}; padding-inline: ${t("padding-horizontal-lg")}; padding-inline-end: calc(${t("padding-horizontal-lg")} + 1.5rem); font-size: ${t("font-size-lg")}; }`;
  },
});

export const simpleSelectCss = simpleSelect.css;
