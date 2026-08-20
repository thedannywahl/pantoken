/**
 * The layout utilities — `display` and `text-align` as composable, globally-available classes (bare,
 * or chained onto any component).
 *
 * @module
 */
import { css } from "../../lib/css.ts";
import { defineUtility, type Definition } from "../../lib/define.ts";
import { utilityVariantRule } from "../../lib/helpers.ts";

/** The layout utility — composable, global `display` and `text-align` classes. */
export const layout: Definition = defineUtility({
  name: "layout",
  css: (p) =>
    // prettier-ignore
    css`/**
 * @utility layout
 * @selector .instui-display-flex
 * @global
 * @summary Display and text-align utilities — \`.instui-display-<value>\` and \`.instui-text-align-<value>\` — as composable, global classes, usable bare or chained onto any component.
 * @example
 * <div class="instui-display-flex instui-text-align-center">
 *   <span>One</span>
 *   <span>Two</span>
 * </div>
 */
${[
      ...["block", "inline-block", "inline", "flex", "inline-flex", "none"].map((v) => {
        const bareModifier = `-display-${v}`;
        return utilityVariantRule(`.${p}layout`, "layout", bareModifier, `display: ${v}`);
      }),
      ...(
        [
          ["start", "start"],
          ["center", "center"],
          ["end", "end"],
          ["justify", "justify"],
        ] as const
      ).map(([name, value]) => {
        const bareModifier = `-text-align-${name}`;
        return utilityVariantRule(`.${p}layout`, "layout", bareModifier, `text-align: ${value}`);
      }),
    ].join("\n")}`,
});

/** The layout utilities as a standalone, header-wrapped stylesheet. */
export const layoutUtilitiesCss: Definition["css"] = layout.css;
