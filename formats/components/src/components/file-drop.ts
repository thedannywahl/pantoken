import { defineComponent } from "../lib/define.ts";
import { css } from "../lib/css.ts";

export const fileDrop = defineComponent({
  name: "file-drop",
  css: (p) =>
    // prettier-ignore
    css`
/**
 * @component file-drop
 * @summary A file dropzone with hover, accepted, and rejected states.
 * @modifier -accepted — Drag state for an acceptable file.
 * @modifier -hover — Hover or drag-over state.
 * @modifier -rejected — Drag state for a rejected file.
 * @accessibility Wrap a native \`<input type="file">\` in the \`<label>\` drop zone so it stays a real, labelled file control that the keyboard and assistive tech can operate.
 * @example
 * <label class="instui-file-drop" id="fd">
 *   <span class="instui-icon -icon-cloud-upload"></span>
 *   <div class="instui-text"><strong>Drag an image here</strong>, or click to browse.</div>
 *   <div class="instui-text -size-sm instui-fg-muted" id="fd-msg">PNG or JPG up to 5&nbsp;MB.</div>
 *   <input type="file" id="fd-input">
 * </label>
 * @structure
 * .instui-file-drop {
 *   .instui-icon.-icon-cloud-upload {}
 *   .instui-text {
 *     strong {}
 *   }
 *   .instui-text.-size-sm.instui-fg-muted {}
 *   input {}
 * }
 */
.${p}file-drop {
  display: block;
  text-align: center;
  padding: var(--instui-spacing-space-lg);
  color: var(--instui-color-text-base);
  background: var(--instui-component-file-drop-background-color);
  border: var(--instui-component-file-drop-border-width) var(--instui-component-file-drop-border-style) var(--instui-component-file-drop-border-color);
  border-radius: var(--instui-component-file-drop-border-radius);
}
.${p}file-drop:hover,
.${p}file-drop.-hover { border-color: var(--instui-component-file-drop-hover-border-color); }
.${p}file-drop.-accepted { border-color: var(--instui-component-file-drop-accepted-color); }
.${p}file-drop.-rejected { border-color: var(--instui-component-file-drop-rejected-color); }`,
});

export const fileDropCss = fileDrop.css;
