import { trayCss } from "@pantoken/components";
import type { ElementDefinition } from "../lib/context.ts";

/**
 * `<instui-tray>` — a panel docked to a viewport edge, backed by a native `[popover]` (top layer +
 * light-dismiss). `placement` maps to `-placement-<value>` (e.g. `start`, `end`, `top`, `bottom`) and
 * `size` to `-size-<value>`; a light-DOM `popovertarget` button toggles it by id. Content goes in the
 * default slot.
 *
 * @example
 * ```html
 * <button popovertarget="nav">Menu</button>
 * <instui-tray id="nav" placement="start" size="small">…</instui-tray>
 * ```
 */
export const tray: ElementDefinition = {
  name: "tray",
  define: (ctx) => {
    if (ctx.registry.get("instui-tray")) return;
    ctx.registry.define(
      "instui-tray",
      class extends HTMLElement {
        static observedAttributes = ["placement", "size"];
        constructor() {
          super();
          this.attachShadow({ mode: "open" });
        }
        connectedCallback(): void {
          if (!this.hasAttribute("popover")) this.setAttribute("popover", "auto");
          this.paint();
        }
        attributeChangedCallback(): void {
          this.paint();
        }
        paint(): void {
          const root = this.shadowRoot;
          if (!root) return;
          const parts = ["instui-tray"];
          const placement = (this.getAttribute("placement") ?? "").replace(/[^a-z-]/giu, "");
          const size = (this.getAttribute("size") ?? "").replace(/[^a-z]/giu, "");
          if (placement) parts.push(`-placement-${placement}`);
          if (size) parts.push(`-size-${size}`);
          root.innerHTML = `<style>:host{margin:0;border:0;padding:0;inset:auto;background:transparent}${trayCss(ctx.I)}</style><div class="${parts.join(" ")}" part="tray"><slot></slot></div>`;
        }
      },
    );
  },
};
