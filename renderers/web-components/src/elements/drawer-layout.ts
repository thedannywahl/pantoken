import { drawerLayoutContentCss, drawerLayoutCss, drawerLayoutTrayCss } from "@pantoken/components";
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
        static observedAttributes = ["open", "placement", "should-overlay-tray"];
        constructor() {
          super();
          this.attachShadow({ mode: "open" });
        }
        connectedCallback(): void {
          const root = this.shadowRoot;
          if (!root || root.querySelector(".layout")) return;

          const style =
            drawerLayoutCss(ctx.I) +
            drawerLayoutTrayCss(ctx.I) +
            drawerLayoutContentCss(ctx.I) +
            DRAWER_CSS;

          const styleEl = document.createElement("style");
          styleEl.textContent = style;

          const layout = document.createElement("div");
          layout.className = `layout ${ctx.I.prefix}-drawer-layout`;

          const tray = document.createElement("aside");
          tray.className = "tray";
          tray.setAttribute("part", "tray");

          const traySlot = document.createElement("slot");
          traySlot.name = "tray";
          tray.append(traySlot);

          const content = document.createElement("main");
          content.className = "content";
          content.setAttribute("part", "content");
          content.setAttribute("role", "region");

          const contentSlot = document.createElement("slot");
          content.append(contentSlot);

          layout.append(tray, content);
          root.replaceChildren(styleEl, layout);
          this.syncLayoutState();
          initResponsiveOverlay(this, ctx.onCommand);
        }
        attributeChangedCallback(): void {
          this.syncLayoutState();
        }

        private syncLayoutState(): void {
          const layout = this.shadowRoot?.querySelector(".layout");
          if (!(layout instanceof HTMLElement)) return;

          const placement = this.getAttribute("placement");
          const hasOverlay =
            this.hasAttribute("should-overlay-tray") ||
            this.classList.contains("-should-overlay-tray");

          layout.classList.toggle("-open", this.hasAttribute("open"));
          layout.classList.toggle("-placement-end", placement === "end");
          layout.classList.toggle("-placement-start", placement !== "end");
          layout.classList.toggle("-should-overlay-tray", hasOverlay);
        }

        toggle(force?: boolean): void {
          if (force ?? !this.hasAttribute("open")) this.setAttribute("open", "");
          else this.removeAttribute("open");
        }
      },
    );
  },
};
