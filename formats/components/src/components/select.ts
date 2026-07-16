/**
 * The **experimental** customizable-select enhancement for `.<prefix>-simple-select`. Bespoke (no
 * cssdoc record, not in the COMPONENTS registry): everything is gated behind
 * `@supports (appearance: base-select)`, and it ships as its own opt-in `select.css`. The CSS is
 * authored in `select.css` (with the `pfx-` prefix sentinel); this wrapper applies the prefix and the
 * standalone-sheet header.
 *
 * @module
 */
import { ns, wrap, type ComponentOptions } from "../lib/helpers.ts";
import { SENTINEL } from "../lib/sentinel.ts";
import { select as selectRaw } from "../generated/component-styles.ts";

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
  return wrap("select", prefix, selectRaw.replaceAll(SENTINEL, ns(prefix)));
}
