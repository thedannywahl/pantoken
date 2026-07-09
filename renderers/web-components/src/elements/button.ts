import { buttonCss } from "@pantoken/components";
import type { ElementDefinition } from "../lib/context.ts";

/**
 * `<instui-button>` — a token-styled `<button>`. The `variant` attribute maps to the `-color-<variant>`
 * modifier (`secondary`, `tertiary`, `success`, `danger`, `ai`, …); slotted content is the label.
 *
 * @example
 * ```html
 * <instui-button variant="primary">Save changes</instui-button>
 * <instui-button variant="danger">Delete</instui-button>
 * ```
 */
export const button: ElementDefinition = {
  name: "button",
  define: (ctx) =>
    ctx.wrapper(
      "instui-button",
      buttonCss(ctx.I),
      (host) =>
        `<button class="${ctx.variantClass("button", host)}" part="button"><slot></slot></button>`,
    ),
};
