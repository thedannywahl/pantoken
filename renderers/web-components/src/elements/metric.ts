import { metricCss } from "@pantoken/components";
import type { ElementDefinition } from "../lib/context.ts";
import { esc } from "../lib/helpers.ts";

/**
 * `<instui-metric>` — a labelled statistic: a large `value` over a smaller `label`. Both come from
 * attributes (escaped), not slots.
 *
 * @example
 * ```html
 * <instui-metric value="1,024" label="Enrolled"></instui-metric>
 * ```
 *
 * @demo self:metric
 */
export const metric: ElementDefinition = {
  name: "metric",
  define: (ctx) =>
    ctx.wrapper("instui-metric", metricCss(ctx.I), (host) => {
      const value = esc(host.getAttribute("value") ?? "");
      const label = esc(host.getAttribute("label") ?? "");
      return `<div class="instui-metric" part="metric"><span class="value">${value}</span><span class="label">${label}</span></div>`;
    }),
};
