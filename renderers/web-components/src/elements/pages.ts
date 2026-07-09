import type { ElementDefinition } from "../lib/context.ts";

/**
 * `<instui-pages>` — shows one slotted `[data-page]` panel at a time, swapping with the View
 * Transitions API when available (a plain toggle otherwise). `push(id)`/`back()` keep a history
 * stack; the `active` attribute reflects the current page and can be set to navigate, and a bubbling
 * `change` event (`detail.page`) fires per swap. Drivable from light DOM via Invoker Commands:
 * `<button command="--push" commandfor="pages-id" data-page="…">` and
 * `<button command="--back" commandfor="pages-id">`.
 *
 * @example
 * ```html
 * <instui-pages active="one">
 *   <section data-page="one">First <button command="--push" commandfor="p" data-page="two">Next</button></section>
 *   <section data-page="two">Second <button command="--back" commandfor="p">Back</button></section>
 * </instui-pages>
 * ```
 */
export const pages: ElementDefinition = {
  name: "pages",
  define: (ctx) => {
    if (ctx.registry.get("instui-pages")) return;
    ctx.registry.define(
      "instui-pages",
      class extends HTMLElement {
        static observedAttributes = ["active"];
        #stack: string[] = [];
        constructor() {
          super();
          this.attachShadow({ mode: "open" });
        }
        connectedCallback(): void {
          const root = this.shadowRoot;
          if (root && !root.querySelector("slot")) {
            root.innerHTML =
              "<style>:host{display:block}::slotted([data-page]){display:block}" +
              "::slotted([data-page][hidden]){display:none}</style><slot></slot>";
            // Drivable from light DOM via Invoker Commands: `<button command="--push" commandfor="pages-id"
            // data-page="…">` and `command="--back" commandfor="pages-id">`.
            ctx.onCommand(this, (command, source) => {
              if (command === "--push") {
                const page = source?.getAttribute("data-page");
                if (page) this.push(page);
              } else if (command === "--back") this.back();
            });
          }
          const first =
            this.getAttribute("active") ??
            this.querySelector("[data-page]")?.getAttribute("data-page") ??
            "";
          this.#stack = first ? [first] : [];
          this.#apply();
        }
        attributeChangedCallback(name: string, _old: string | null, value: string | null): void {
          if (name === "active" && value && value !== this.#stack[this.#stack.length - 1]) {
            this.#stack = [value];
            this.#apply();
          }
        }
        #panels(): HTMLElement[] {
          return [...this.querySelectorAll<HTMLElement>("[data-page]")];
        }
        #apply(): void {
          if (!this.isConnected) return;
          const current = this.#stack[this.#stack.length - 1] ?? "";
          const swap = (): void => {
            for (const panel of this.#panels()) {
              panel.hidden = panel.getAttribute("data-page") !== current;
            }
          };
          const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
          if (typeof doc.startViewTransition === "function") doc.startViewTransition(swap);
          else swap();
          this.dispatchEvent(
            new CustomEvent("change", { detail: { page: current }, bubbles: true }),
          );
        }
        push(id: string): void {
          if (!this.#panels().some((panel) => panel.getAttribute("data-page") === id)) return;
          this.#stack.push(id);
          this.setAttribute("active", id);
          this.#apply();
        }
        back(): void {
          if (this.#stack.length <= 1) return;
          this.#stack.pop();
          this.setAttribute("active", this.#stack[this.#stack.length - 1] ?? "");
          this.#apply();
        }
      },
    );
  },
};
