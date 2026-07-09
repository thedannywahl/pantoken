import { tagCss } from "@pantoken/components";
import type { ElementDefinition } from "../lib/context.ts";

/**
 * `<instui-tag>` — a token-styled tag/chip. Slotted content is the label.
 *
 * @example
 * ```html
 * <instui-tag>Design</instui-tag>
 * ```
 */
export const tag: ElementDefinition = {
  name: "tag",
  define: (ctx) =>
    ctx.wrapper(
      "instui-tag",
      tagCss(ctx.I),
      () => `<span class="instui-tag" part="tag"><slot></slot></span>`,
    ),
};
