import { modalCss } from "@pantoken/components";
import type { ElementDefinition } from "../lib/context.ts";

/**
 * `<instui-modal>` — a real `<dialog>`, so it gets focus trapping, Escape-to-close, and a
 * `::backdrop` for free. The `open` attribute drives `showModal()`/`close()`; a native dismissal
 * (Escape or a backdrop click) reflects back to the attribute and re-fires as a bubbling `close`
 * event. Drivable from light DOM via Invoker Commands — a
 * `<button command="--show|--close|--toggle" commandfor="modal-id">` toggles it by id. Content goes
 * in the default slot.
 *
 * @example
 * ```html
 * <button command="--show" commandfor="confirm">Delete…</button>
 * <instui-modal id="confirm">
 *   <h2>Delete this item?</h2>
 *   <button command="--close" commandfor="confirm">Cancel</button>
 * </instui-modal>
 * ```
 *
 * @demo self:modal
 */
export const modal: ElementDefinition = {
  name: "modal",
  define: (ctx) => {
    if (ctx.registry.get("instui-modal")) return;
    ctx.registry.define(
      "instui-modal",
      class extends HTMLElement {
        static observedAttributes = ["open"];
        constructor() {
          super();
          this.attachShadow({ mode: "open" });
        }
        connectedCallback(): void {
          const root = this.shadowRoot;
          if (root && !root.querySelector("dialog")) {
            root.innerHTML = `<style>:host{display:contents}${modalCss(ctx.I)}</style><dialog class="instui-modal" part="modal"><slot></slot></dialog>`;
            root.querySelector("dialog")?.addEventListener("close", () => {
              if (this.hasAttribute("open")) this.removeAttribute("open");
              this.dispatchEvent(new CustomEvent("close", { bubbles: true }));
            });
            // Drivable from light DOM via Invoker Commands (the shadow <dialog> can't be a `commandfor`
            // target itself): `<button command="--show|--close|--toggle" commandfor="modal-id">`.
            ctx.onCommand(this, (command) => {
              if (command === "--show") this.setAttribute("open", "");
              else if (command === "--close") this.removeAttribute("open");
              else if (command === "--toggle") this.toggleAttribute("open");
            });
          }
          this.syncOpen();
        }
        attributeChangedCallback(): void {
          this.syncOpen();
        }
        syncOpen(): void {
          const dialog = this.shadowRoot?.querySelector("dialog");
          if (!(dialog instanceof HTMLDialogElement)) return;
          const wantOpen = this.hasAttribute("open");
          if (wantOpen && !dialog.open) dialog.showModal();
          else if (!wantOpen && dialog.open) dialog.close();
        }
      },
    );
  },
};
