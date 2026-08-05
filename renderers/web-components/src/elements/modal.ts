import { modalCss } from "@pantoken/components";
import { initModal } from "@pantoken/interactions";
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
            const dialog = root.querySelector<HTMLDialogElement>("dialog");
            if (dialog) initModal(this, dialog, ctx.onCommand);
          }
        }
        attributeChangedCallback(): void {
          const dialog = this.shadowRoot?.querySelector<HTMLDialogElement>("dialog");
          if (!(dialog instanceof HTMLDialogElement)) return;
          const wantOpen = this.hasAttribute("open");
          if (wantOpen && !dialog.open) dialog.showModal();
          else if (!wantOpen && dialog.open) dialog.close();
        }
      },
    );
  },
};
