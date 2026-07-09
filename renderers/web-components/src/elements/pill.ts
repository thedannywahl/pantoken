import { pillCss } from "@pantoken/components";
import type { ElementDefinition } from "../lib/context.ts";

/**
 * `<instui-pill>` — a compact status pill. The `variant` attribute maps to the `-color-<variant>`
 * modifier; slotted content is the label.
 *
 * @example
 * ```html
 * <instui-pill variant="success">Active</instui-pill>
 * ```
 */
export const pill: ElementDefinition = {
  name: "pill",
  define: (ctx) =>
    ctx.wrapper(
      "instui-pill",
      pillCss(ctx.I),
      (host) => `<span class="${ctx.variantClass("pill", host)}" part="pill"><slot></slot></span>`,
    ),
};
