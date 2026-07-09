import { spinnerCss } from "@pantoken/components";
import type { ElementDefinition } from "../lib/context.ts";

/**
 * `<instui-spinner>` — a loading spinner with `role="status"`. Purely presentational; size and
 * colour follow the CSS tokens.
 *
 * @example
 * ```html
 * <instui-spinner></instui-spinner>
 * ```
 *
 * @demo self:spinner
 */
export const spinner: ElementDefinition = {
  name: "spinner",
  define: (ctx) =>
    ctx.wrapper(
      "instui-spinner",
      spinnerCss(ctx.I),
      () => `<span class="instui-spinner" role="status" part="spinner"></span>`,
    ),
};
