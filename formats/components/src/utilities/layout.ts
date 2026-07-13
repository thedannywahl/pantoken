/**
 * The layout utilities — `display` and `text-align` as composable classes.
 *
 * @module
 */
import { css } from "../lib/css.ts";
import { defineUtility } from "../lib/define.ts";

export const layout = defineUtility({
  name: "layout",
  css: (p) =>
    // prettier-ignore
    css`/**
 * @utility layout
 * @class .instui-display-flex
 * @summary Display and text-align utilities — \`.instui-display-<value>\` and \`.instui-text-align-<value>\` — as composable classes.
 * @example
 * <div class="instui-display-flex instui-text-align-center">
 *   <span>One</span>
 *   <span>Two</span>
 * </div>
 */
${[
      ...["block", "inline-block", "inline", "flex", "inline-flex", "none"].map(
        (v) => `.${p}display-${v} { display: ${v}; }`,
      ),
      ...(
        [
          ["start", "start"],
          ["center", "center"],
          ["end", "end"],
          ["justify", "justify"],
        ] as const
      ).map(([name, value]) => `.${p}text-align-${name} { text-align: ${value}; }`),
    ].join("\n")}`,
});

export const layoutUtilitiesCss = layout.css;
