import { buttonCss } from "@pantoken/components";
import type { ElementDefinition } from "../lib/context.ts";

/**
 * `<instui-toggle-button>` — a two-state button. `pressed="true"` reflects to the button's
 * `aria-pressed`; slotted content is the label.
 *
 * @example
 * ```html
 * <instui-toggle-button pressed="true">Bookmarked</instui-toggle-button>
 * ```
 */
export const toggleButton: ElementDefinition = {
  name: "toggle-button",
  define: (ctx) =>
    ctx.wrapper("instui-toggle-button", buttonCss(ctx.I), (host) => {
      const pressed = host.getAttribute("pressed") === "true" ? "true" : "false";
      return `<button class="instui-button -toggle" aria-pressed="${pressed}" part="button"><slot></slot></button>`;
    }),
};
