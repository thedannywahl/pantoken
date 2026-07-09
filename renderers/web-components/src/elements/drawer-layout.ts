import type { ElementDefinition } from "../lib/context.ts";
import { drawerLayout as DRAWER_CSS } from "../generated/styles.ts";

/**
 * `<instui-drawer-layout>` — a side tray plus main content in a resizable row. The `open` attribute
 * reveals the tray; `placement` (`start`|`end`) picks the side; a drag handle resizes the
 * `--drawer-width` custom property (clamped 8–40rem) via pointer capture. Drivable from light DOM via
 * Invoker Commands: `<button command="--toggle|--open|--close" commandfor="drawer-id">`. Content goes
 * in the default slot; the tray in `slot="tray"`.
 *
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
            `<div class="handle" part="handle" role="separator" aria-orientation="vertical"></div>` +
            `<main class="content" part="content"><slot></slot></main></div>`;
          const handle = root.querySelector<HTMLElement>(".handle");
          if (handle) this.#wireResize(handle);
          // Drivable from light DOM via Invoker Commands: `<button command="--toggle|--open|--close"
          // commandfor="drawer-id">`.
          ctx.onCommand(this, (command) => {
            if (command === "--toggle") this.toggle();
            else if (command === "--open") this.toggle(true);
            else if (command === "--close") this.toggle(false);
          });
        }
        toggle(force?: boolean): void {
          if (force ?? !this.hasAttribute("open")) this.setAttribute("open", "");
          else this.removeAttribute("open");
        }
        #wireResize(handle: HTMLElement): void {
          const rem = (): number =>
            parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
          let startX = 0;
          let startW = 0;
          const onMove = (event: PointerEvent): void => {
            const dir = this.getAttribute("placement") === "end" ? -1 : 1;
            const next = startW + dir * (event.clientX - startX);
            const px = Math.max(8 * rem(), Math.min(40 * rem(), next));
            this.style.setProperty("--drawer-width", `${String(px)}px`);
          };
          const onUp = (event: PointerEvent): void => {
            handle.classList.remove("-dragging");
            handle.releasePointerCapture(event.pointerId);
            handle.removeEventListener("pointermove", onMove);
            handle.removeEventListener("pointerup", onUp);
          };
          handle.addEventListener("pointerdown", (event) => {
            startX = event.clientX;
            const tray = this.shadowRoot?.querySelector<HTMLElement>(".tray");
            startW = tray?.getBoundingClientRect().width ?? 0;
            handle.classList.add("-dragging");
            handle.setPointerCapture(event.pointerId);
            handle.addEventListener("pointermove", onMove);
            handle.addEventListener("pointerup", onUp);
          });
        }
      },
    );
  },
};
