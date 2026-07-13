import { defineComponent } from "../lib/define.ts";
import { css } from "../lib/css.ts";
import { inputFacadeBase } from "../lib/field-controls.ts";

export const inputGroup = defineComponent({
  name: "input-group",
  css: (p) =>
    // prettier-ignore
    css`
/**
 * @component input-group
 * @summary A facade around a text input with leading and trailing icon slots.
 * @modifier -disabled — Disabled state.
 * @modifier -invalid — Invalid (error) state.
 * @modifier -readonly — Read-only state.
 * @modifier -success — Success (valid) state.
 * @modifier -size-sm — Small.
 * @modifier -size-lg — Large.
 * @modifier -should-not-wrap — Keep the group on one line (no wrapping).
 * @cssstate disabled
 * @example
 * <span class="instui-input-group">
 *   <span class="before">@</span>
 *   <input type="text" placeholder="username">
 * </span>
 * @related text-input — Wraps a text input, adding leading and trailing icon slots.
 */
${inputFacadeBase(p, "input-group")}
.${p}input-group.-should-not-wrap { flex-wrap: nowrap; }`,
});

export const inputGroupCss = inputGroup.css;
