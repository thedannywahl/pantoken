import { progressCss } from "@pantoken/components";
import type { ElementDefinition } from "../lib/context.ts";
import { frag } from "../lib/helpers.ts";

/**
 * `<instui-progress>` — a horizontal progress bar with `role="progressbar"`. `value` (0–100, clamped)
 * sets the fill width; `variant` maps the bar to `-color-<variant>`.
 *
 * @example
 * ```html
 * <instui-progress value="60" variant="success"></instui-progress>
 * ```
 */
export const progress: ElementDefinition = {
  name: "progress",
  define: (ctx) =>
    ctx.wrapper(
      "instui-progress",
      progressCss(ctx.I),
      (host) => {
        const value = Math.max(0, Math.min(100, Number(host.getAttribute("value") ?? "0")));
        const variant = frag(host.getAttribute("variant"));
        const bar = variant ? `bar -color-${variant}` : "bar";
        return `<div class="instui-progress" role="progressbar" part="progress"><div class="${bar}" style="width:${String(value)}%"></div></div>`;
      },
      { display: "block" },
    ),
};
