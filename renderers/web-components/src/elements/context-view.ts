import { contextViewCss } from "@pantoken/components";
import type { ElementDefinition } from "../lib/context.ts";

/**
 * `<instui-context-view>` — a callout surface with a caret. The host itself is a native `[popover]`
 * (top layer + light-dismiss), so a light-DOM `popovertarget`/`command` button can toggle it by id.
 * Position it near its trigger with CSS anchor positioning where supported; otherwise it centres in
 * the top layer. Content goes in the default slot.
 *
 * @example
 * ```html
 * <button popovertarget="cv">Details</button>
 * <instui-context-view id="cv">More about this item.</instui-context-view>
 * ```
 *
 * @demo self:context-view
 */
export const contextView: ElementDefinition = {
  name: "context-view",
  define: (ctx) => {
    if (ctx.registry.get("instui-context-view")) return;
    ctx.registry.define(
      "instui-context-view",
      class extends HTMLElement {
        constructor() {
          super();
          this.attachShadow({ mode: "open" });
        }
        connectedCallback(): void {
          if (!this.hasAttribute("popover")) this.setAttribute("popover", "auto");
          const root = this.shadowRoot;
          if (root && !root.querySelector("span")) {
            root.innerHTML = `<style>:host{margin:0;border:0;padding:0;inset:auto;overflow:visible;background:transparent}${contextViewCss(ctx.I)}</style><span class="instui-context-view" part="context-view"><slot></slot></span>`;
          }
        }
      },
    );
  },
};
