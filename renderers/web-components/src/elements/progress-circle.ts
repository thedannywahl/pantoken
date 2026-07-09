import { progressCircleCss } from "@pantoken/components";
import type { ElementDefinition } from "../lib/context.ts";
import { esc } from "../lib/helpers.ts";

/**
 * `<instui-progress-circle>` — a circular progress meter with `role="img"`. `value` (0–100, clamped)
 * drives the `--value` custom property the CSS reads; `label` overrides the accessible name (defaults
 * to `value%`).
 *
 * @example
 * ```html
 * <instui-progress-circle value="75"></instui-progress-circle>
 * ```
 */
export const progressCircle: ElementDefinition = {
  name: "progress-circle",
  define: (ctx) =>
    ctx.wrapper("instui-progress-circle", progressCircleCss(ctx.I), (host) => {
      const value = Math.max(0, Math.min(100, Number(host.getAttribute("value") ?? "0")));
      const label = esc(host.getAttribute("label") ?? `${String(value)}%`);
      return `<span class="instui-progress-circle" role="img" aria-label="${label}" part="progress-circle" style="--value:${String(value)}"></span>`;
    }),
};
