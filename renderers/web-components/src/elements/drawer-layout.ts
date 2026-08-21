import { initResponsiveOverlay } from "@pantoken/interactions";
import type { ElementDefinition } from "../lib/context.ts";
import DRAWER_CSS from "./drawer-layout.css?inline";

/**
 * `<instui-drawer-layout>` — a side tray plus main content area. The `open` attribute reveals the
 * tray; `placement` (`start`|`end`) picks the side. Drivable from light DOM via Invoker Commands:
 * `<button command="--toggle|--open|--close" commandfor="drawer-id">`. Content goes in the default
 * slot; the tray in `slot="tray"`. The interactions behavior auto-toggles overlay mode based on the
 * `--pantoken-bp-md` threshold.
 *
 * @accessibility The content pane carries `role="region"`, matching InstUI's DrawerLayout; label it with `aria-label`/`aria-labelledby` when the surrounding context doesn't already name it.
 * @example
 * ```html
 * <button command="--toggle" commandfor="drawer">Toggle panel</button>
 * <instui-drawer-layout id="drawer" open placement="start">
 *   <nav slot="tray">…</nav>
 *   <article>Main content</article>
 * </instui-drawer-layout>
 * ```
 */
export const drawerLayout: ElementDefinition = {
  name: "drawer-layout",
  define: (ctx) => {
    if (ctx.registry.get("instui-drawer-layout")) return;
    ctx.registry.define(
      "instui-drawer-layout",
      class extends HTMLElement {
        static observedAttributes = ["open", "placement"];
        constructor() {
          super();
          this.attachShadow({ mode: "open" });
        }
        connectedCallback(): void {
          const root = this.shadowRoot;
          if (!root || root.querySelector(".layout")) return;
          root.innerHTML =
            `<style>${DRAWER_CSS}</style>` +
            `<div class="layout"><aside class="tray" part="tray"><slot name="tray"></slot></aside>` +
            `<main class="content" part="content" role="region"><slot></slot></main></div>`;
          initResponsiveOverlay(this, ctx.onCommand);
        }
        toggle(force?: boolean): void {
          if (force ?? !this.hasAttribute("open")) this.setAttribute("open", "");
          else this.removeAttribute("open");
        }
      },
    );
  },
};
