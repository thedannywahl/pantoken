import { avatarCss } from "@pantoken/components";
import type { ElementDefinition } from "../lib/context.ts";
import { frag } from "../lib/helpers.ts";

/**
 * `<instui-avatar>` — a circular (or rectangular) avatar. `variant` maps to `-color-<variant>`,
 * `size` to `-size-<size>`, and `shape="rectangle"` to `-shape-rectangle`; slotted content is the
 * initials or `<img>`.
 *
 * @example
 * ```html
 * <instui-avatar size="lg">JS</instui-avatar>
 * <instui-avatar shape="rectangle"><img src="/photo.jpg" alt="" /></instui-avatar>
 * ```
 *
 * @demo self:avatar
 */
export const avatar: ElementDefinition = {
  name: "avatar",
  define: (ctx) =>
    ctx.wrapper("instui-avatar", avatarCss(ctx.I), (host) => {
      const parts = ["instui-avatar"];
      const variant = frag(host.getAttribute("variant"));
      const size = frag(host.getAttribute("size"));
      if (variant) parts.push(`-color-${variant}`);
      if (size) parts.push(`-size-${size}`);
      if (host.getAttribute("shape") === "rectangle") parts.push("-shape-rectangle");
      return `<span class="${parts.join(" ")}" part="avatar"><slot></slot></span>`;
    }),
};
