import { defineComponent } from "../lib/define.ts";
import { fieldControlBase } from "../lib/field-controls.ts";

export const textArea = defineComponent({
  name: "text-area",
  css: (p) => {
    const t = (s: string): string => `var(--instui-component-text-area-${s})`;
    return `
/**
 * @component text-area
 * @summary A styled, resizable native \`<textarea>\` with the same states and sizes as the text input.
 * @modifier -disabled — Disabled state.
 * @modifier -invalid — Invalid (error) state.
 * @modifier -readonly — Read-only state.
 * @modifier -success — Success (valid) state.
 * @modifier -size-sm — Small.
 * @modifier -size-lg — Large.
 * @cssstate disabled
 * @example
 * <textarea class="instui-text-area" placeholder="Write a comment…"></textarea>
 * @related text-input — The single-line counterpart with the same states and sizes.
 */
${fieldControlBase(p, "text-area", "text-area")}
.${p}text-area {
  padding: ${t("padding")};
  font-size: ${t("font-size-md")};
  line-height: 1.5;
  min-block-size: 4rem;
  resize: vertical;
}
.${p}text-area.-size-sm { font-size: ${t("font-size-sm")}; }
.${p}text-area.-size-lg { font-size: ${t("font-size-lg")}; }`;
  },
});

export const textAreaCss = textArea.css;
