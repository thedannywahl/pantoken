import { defineComponent } from "../lib/define.ts";

export const inPlaceEdit = defineComponent({
  name: "in-place-edit",
  css: (p) => {
    const root = `.${p}in-place-edit`;
    const t = (s: string): string => `var(--instui-component-text-input-${s})`;
    return `
/**
 * @component in-place-edit
 * @summary A [contenteditable] that reads as text until focused, then shows input chrome.
 * @modifier -readonly — Shown inline but not editable (no hover/focus affordance).
 * @example
 * <span class="instui-in-place-edit" contenteditable="true" role="textbox" aria-label="Project name">Untitled</span>
 * @demo self:in-place-edit
 */
${root} {
  display: inline-block;
  min-inline-size: 2rem;
  padding: var(--instui-spacing-space2xs) var(--instui-spacing-space-xs);
  border: ${t("border-width")} solid transparent;
  border-radius: ${t("border-radius")};
  color: var(--instui-color-text-base);
  font: inherit;
  cursor: text;
}
/* Hover affordance: it's editable. */
${root}:hover { background: var(--instui-color-background-muted); }
/* Focus = edit mode: input chrome + the focus ring. */
${root}:focus {
  background: ${t("background-color")};
  border-color: ${t("border-color")};
  outline: none;
}
${root}:focus-visible {
  outline: var(--instui-focus-outline-width) var(--instui-focus-outline-style) var(--instui-focus-outline-color);
  outline-offset: var(--instui-focus-outline-offset);
}
${root}.-readonly { cursor: default; }
${root}.-readonly:hover { background: transparent; }`;
  },
});

export const inPlaceEditCss = inPlaceEdit.css;
