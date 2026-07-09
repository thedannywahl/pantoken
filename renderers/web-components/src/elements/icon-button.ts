import { buttonCss } from "@pantoken/components";
import type { ElementDefinition } from "../lib/context.ts";
import { esc } from "../lib/helpers.ts";

/**
 * `<instui-icon-button>` — an icon-only, square button. `label` becomes the button's `aria-label`;
 * slotted content is the glyph (e.g. an `<instui-icon>`).
 *
 * @example
 * ```html
 * <instui-icon-button label="Close">
 *   <instui-icon name="x"></instui-icon>
 * </instui-icon-button>
 * ```
 */
export const iconButton: ElementDefinition = {
  name: "icon-button",
  define: (ctx) =>
    ctx.wrapper("instui-icon-button", buttonCss(ctx.I), (host) => {
      const label = esc(host.getAttribute("label") ?? "");
      const aria = label ? ` aria-label="${label}"` : "";
      return `<button class="instui-button -shape-square" part="button"${aria}><slot></slot></button>`;
    }),
};
