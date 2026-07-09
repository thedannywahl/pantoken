import { alertCss } from "@pantoken/components";
import type { ElementDefinition } from "../lib/context.ts";

/**
 * `<instui-alert>` — an inline status message with `role="alert"`. The `variant` attribute maps to
 * the `-color-<variant>` modifier (`info`, `success`, `warning`, `danger`); slotted content is the
 * message body.
 *
 * @example
 * ```html
 * <instui-alert variant="success">Your changes were saved.</instui-alert>
 * ```
 */
export const alert: ElementDefinition = {
  name: "alert",
  define: (ctx) =>
    ctx.wrapper(
      "instui-alert",
      alertCss(ctx.I),
      (host) =>
        `<div class="${ctx.variantClass("alert", host)}" role="alert" part="alert"><slot></slot></div>`,
      "block",
    ),
};
