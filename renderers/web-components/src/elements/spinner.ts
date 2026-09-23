import { spinnerCss } from "@pantoken/components";
import type { ElementDefinition } from "../lib/context.ts";

/**
 * `<instui-spinner>` — a loading spinner with `role="status"`. `variant="ai"` and
 * `variant="ai-on-color"` select the rotating AI star; size and colour follow the CSS tokens.
 *
 * @example
 * ```html
 * <instui-spinner></instui-spinner>
 * ```
 */
export const spinner: ElementDefinition = {
  name: "spinner",
  define: (ctx) =>
    ctx.wrapper(
      "instui-spinner",
      spinnerCss(ctx.I),
      (host) =>
        `<span class="${ctx.variantClass("spinner", host)}" role="status" part="spinner"></span>`,
    ),
};
