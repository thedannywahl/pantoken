/**
 * The **experimental** customizable-select enhancement for `.<prefix>-simple-select`. Bespoke (no
 * cssdoc record, not in the COMPONENTS registry): everything is gated behind
 * `@supports (appearance: base-select)`, and it ships as its own opt-in `select.css`.
 *
 * @module
 */
import { CHECK_URL_ON, ns, wrap, type ComponentOptions } from "../lib/helpers.ts";

/**
 * The **experimental** customizable-select enhancement for `.<prefix>-simple-select`. Everything is
 * gated behind `@supports (appearance: base-select)` (the CSS Customizable Select model — Chrome 135+,
 * NOT yet Baseline), so it's pure progressive enhancement: browsers without support keep the plain
 * `simpleSelectCss` control; supporting browsers get a styled `::picker(select)` panel and styled
 * `option`s (hover/selected) from the `--instui-component-options-item-*` tokens. Shipped as its own
 * opt-in `select.css` (like `fonts.css`) rather than folded into `components.css`, precisely because the
 * feature is experimental — you opt in deliberately.
 *
 * @param options - {@link ComponentOptions}.
 * @returns The CSS string.
 *
 * @example
 * ```ts
 * import { selectCss } from "@pantoken/components";
 *
 * // Load AFTER components.css; enhances the same <select class="instui-simple-select"> element.
 * const css = selectCss();
 * ```
 *
 * @demo self:simple-select
 */
export function selectCss(options: ComponentOptions = {}): string {
  const prefix = options.prefix || "";
  const p = ns(prefix);
  const O = (s: string): string => `var(--instui-component-options-item-${s})`;
  const sel = `.${p}simple-select`;
  const body = `
/* Experimental: CSS Customizable Select (\`appearance: base-select\`, Chrome 135+, not yet Baseline).
   Enhances .${p}simple-select; degrades to the plain control where unsupported. */
@supports (appearance: base-select) {
  ${sel},
  ${sel}::picker(select) {
    appearance: base-select;
  }
  /* Keep simple-select's own background-image caret; hide the UA-generated picker icon. */
  ${sel}::picker-icon { display: none; }
  ${sel}::picker(select) {
    border: var(--instui-component-select-popover-border-width) solid var(--instui-component-text-input-border-color);
    border-radius: var(--instui-border-radius-lg);
    box-shadow: var(--instui-elevation-topmost);
    background-color: ${O("background")};
    padding: 0;
    margin: 0;
    overflow: hidden;
  }
  ${sel} option {
    padding: ${O("padding-vertical")} ${O("padding-horizontal")};
    background-color: ${O("background")};
    color: ${O("color")};
    font-family: ${O("font-family")};
    font-weight: ${O("font-weight")};
    font-size: ${O("font-size")};
    line-height: ${O("line-height")};
    cursor: pointer;
  }
  /* Hide the UA checkmark; the selected row gets our own trailing check via background-image. */
  ${sel} option::checkmark { display: none; }
  ${sel} option:hover,
  ${sel} option:focus {
    background-color: ${O("highlighted-background")};
    color: ${O("highlighted-label-color")};
    outline: none;
  }
  ${sel} option:checked {
    background-color: ${O("selected-background")};
    color: ${O("selected-label-color")};
    font-weight: ${O("font-weight-selected")};
    background-image: ${CHECK_URL_ON};
    background-repeat: no-repeat;
    background-position: right ${O("padding-horizontal")} center;
    background-size: 1rem 1rem;
    padding-inline-end: calc(${O("padding-horizontal")} + 1.5rem);
  }
}
`;
  return wrap("select", prefix, body);
}
