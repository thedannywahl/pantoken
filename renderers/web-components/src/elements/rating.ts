import { ratingCss } from "@pantoken/components";
import type { ElementDefinition } from "../lib/context.ts";
import { esc } from "../lib/helpers.ts";

/**
 * `<instui-rating>` — a star rating with `role="img"`. `value` is the number of filled stars, `max`
 * the total (default 5), and `label` overrides the accessible name (defaults to `value/max`). Stars
 * render as inline SVG glyphs (solid = filled), sized to the text.
 *
 * @example
 * ```html
 * <instui-rating value="4" max="5" label="4 out of 5 stars"></instui-rating>
 * ```
 */
export const rating: ElementDefinition = {
  name: "rating",
  define: (ctx) =>
    // Rating renders star glyphs as inline SVG (solid = filled, outline = empty); the rating CSS colours
    // the filled ones. A small appended rule sizes the SVGs to the text (1em), and a `.label` shows the
    // value. (The CSS glyph painter isn't inlined here, so we embed the SVG directly.)
    ctx.wrapper(
      "instui-rating",
      `${ratingCss(ctx.I)}\n.instui-rating svg{inline-size:1em;block-size:1em}`,
      (host) => {
        const value = Math.max(0, Number(host.getAttribute("value") ?? "0"));
        const max = Math.max(1, Number(host.getAttribute("max") ?? "5"));
        const label = esc(host.getAttribute("label") ?? `${String(value)}/${String(max)}`);
        const stars = Array.from({ length: max }, (_, i) => {
          const solid = i < value;
          const cls = solid ? "instui-icon -icon-star-solid" : "instui-icon -icon-star";
          return `<span class="${cls}" style="display:inline-flex">${ctx.iconSvg(solid ? "star-solid" : "star")}</span>`;
        }).join("");
        return `<span class="instui-rating" role="img" aria-label="${label}" part="rating">${stars}<span class="label">${label}</span></span>`;
      },
    ),
};
