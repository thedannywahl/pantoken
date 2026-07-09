import { truncateCss } from "@pantoken/components";
import type { ElementDefinition } from "../lib/context.ts";
import { frag } from "../lib/helpers.ts";

/**
 * `<instui-truncate>` — clamps slotted text to a fixed number of lines with an ellipsis. `lines`
 * (a positive integer) sets the `--lines` custom property; omit it for single-line truncation.
 *
 * @example
 * ```html
 * <instui-truncate lines="2">A long description that will be clamped to two lines…</instui-truncate>
 * ```
 *
 * @demo self:truncate
 */
export const truncate: ElementDefinition = {
  name: "truncate",
  define: (ctx) =>
    ctx.wrapper(
      "instui-truncate",
      truncateCss(ctx.I),
      (host) => {
        const lines = frag(host.getAttribute("lines"));
        const style = lines ? ` style="--lines:${lines}"` : "";
        return `<span class="instui-truncate" part="truncate"${style}><slot></slot></span>`;
      },
      "block",
    ),
};
