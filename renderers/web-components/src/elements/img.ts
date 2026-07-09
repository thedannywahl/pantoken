import { imgCss } from "@pantoken/components";
import type { ElementDefinition } from "../lib/context.ts";
import { esc, frag } from "../lib/helpers.ts";

/**
 * `<instui-img>` — a token-styled `<img>` built from `src`/`alt`. `constrain` maps to
 * `-constrain-<value>` (e.g. `cover`, `contain`) and `display="block"` to `-display-block`.
 *
 * @example
 * ```html
 * <instui-img src="/hero.jpg" alt="Campus" constrain="cover" display="block"></instui-img>
 * ```
 *
 * @demo self:img
 */
export const img: ElementDefinition = {
  name: "img",
  define: (ctx) =>
    // Img renders a styled <img> from `src`/`alt`, with `-constrain-*` and `-display-block` modifiers.
    ctx.wrapper("instui-img", imgCss(ctx.I), (host) => {
      const parts = ["instui-img"];
      const constrain = frag(host.getAttribute("constrain"));
      if (constrain) parts.push(`-constrain-${constrain}`);
      if (host.getAttribute("display") === "block") parts.push("-display-block");
      const src = esc(host.getAttribute("src") ?? "");
      const alt = esc(host.getAttribute("alt") ?? "");
      return `<img class="${parts.join(" ")}" src="${src}" alt="${alt}" part="img" />`;
    }),
};
