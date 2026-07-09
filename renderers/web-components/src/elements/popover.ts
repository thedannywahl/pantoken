import { popoverCss } from "@pantoken/components";
import type { ElementDefinition } from "../lib/context.ts";
import { popoverReset } from "../generated/styles.ts";

/**
 * `<instui-popover>` — a floating surface. Like `<instui-context-view>`, the host is a native
 * `[popover]` (top layer + light-dismiss), so a light-DOM `popovertarget` button can toggle it by id.
 * Content goes in the default slot.
 *
 * @example
 * ```html
 * <button popovertarget="menu">Options</button>
 * <instui-popover id="menu">…</instui-popover>
 * ```
 */
export const popover: ElementDefinition = {
  name: "popover",
  define: (ctx) => {
    if (ctx.registry.get("instui-popover")) return;
    ctx.registry.define(
      "instui-popover",
      class extends HTMLElement {
        constructor() {
          super();
          this.attachShadow({ mode: "open" });
        }
        connectedCallback(): void {
          if (!this.hasAttribute("popover")) this.setAttribute("popover", "auto");
          const root = this.shadowRoot;
          if (root && !root.querySelector("div")) {
            root.innerHTML = `<style>${popoverReset}${popoverCss(ctx.I)}</style><div class="instui-popover" part="popover"><slot></slot></div>`;
          }
        }
      },
    );
  },
};
