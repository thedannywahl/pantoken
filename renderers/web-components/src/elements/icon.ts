import type { ElementDefinition } from "../lib/context.ts";

/**
 * `<instui-icon>` — an inline SVG glyph from the pantoken icon set. The `name` attribute picks the
 * glyph, `size` (any CSS length, default `1em`) sizes it, and `color` (any CSS color) tints it.
 * Renders the SVG into its own light DOM, sized/coloured via inline styles on the host, so it
 * inherits `currentColor` like text.
 *
 * @example
 * ```html
 * <instui-icon name="arrow-left"></instui-icon>
 * <instui-icon name="star" size="1.5rem" color="gold"></instui-icon>
 * ```
 */
export const icon: ElementDefinition = {
  name: "icon",
  define: (ctx) => {
    if (ctx.registry.get("instui-icon")) return;
    ctx.registry.define(
      "instui-icon",
      class extends HTMLElement {
        static observedAttributes = ["name", "size", "color"];
        connectedCallback(): void {
          this.render();
        }
        attributeChangedCallback(): void {
          this.render();
        }
        render(): void {
          const size = this.getAttribute("size") ?? "1em";
          this.style.display = "inline-flex";
          this.style.width = size;
          this.style.height = size;
          const color = this.getAttribute("color");
          if (color) this.style.color = color;
          this.innerHTML = ctx.iconSvg(this.getAttribute("name") ?? "");
        }
      },
    );
  },
};
