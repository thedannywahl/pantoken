import { badgeCss } from "@pantoken/components";
import type { ElementDefinition } from "../lib/context.ts";

/**
 * `<instui-badge>` — a small count/status badge. The `variant` attribute maps to the
 * `-color-<variant>` modifier; slotted content is the count or label.
 *
 * @example
 * ```html
 * <instui-badge variant="danger">9</instui-badge>
 * ```
 *
 * @demo self:badge
 */
export const badge: ElementDefinition = {
  name: "badge",
  define: (ctx) =>
    ctx.wrapper(
      "instui-badge",
      badgeCss(ctx.I),
      (host) =>
        `<span class="${ctx.variantClass("badge", host)}" part="badge"><slot></slot></span>`,
    ),
};
