import { menuCss } from "@pantoken/components";
import type { ElementDefinition } from "../lib/context.ts";
import { drilldown as drilldownExtra } from "../generated/styles.ts";

/**
 * `<instui-drilldown>` — a stateful, multi-level menu over the menu styles. Each level is a light-DOM
 * `[data-page="id"]` whose inner `.item`s are cloned into a shadow `.instui-menu`; an item with
 * `data-goto="id"` descends to that page and a synthesized Back row (or any `[data-back]` item)
 * returns. The light DOM is the data source only — with no `<slot>` it never renders, so shadow CSS
 * fully styles each panel. The `active` attribute reflects the current page and can be set to
 * navigate; a bubbling `navigate` event (`detail.page`) fires on every move. Drivable from light DOM
 * via Invoker Commands: `<button command="--goto" commandfor="dd-id" data-page="…">` descends and
 * `<button command="--back" commandfor="dd-id">` returns.
 *
 * @example
 * ```html
 * <instui-drilldown active="root">
 *   <div data-page="root">
 *     <div class="item" data-goto="settings">Settings</div>
 *   </div>
 *   <div data-page="settings">
 *     <div class="item">Profile</div>
 *   </div>
 * </instui-drilldown>
 * ```
 */
export const drilldown: ElementDefinition = {
  name: "drilldown",
  define: (ctx) => {
    if (ctx.registry.get("instui-drilldown")) return;
    ctx.registry.define(
      "instui-drilldown",
      class extends HTMLElement {
        static observedAttributes = ["active"];
        #stack: string[] = [];
        #wired = false;
        constructor() {
          super();
          this.attachShadow({ mode: "open" });
        }
        connectedCallback(): void {
          const first =
            this.getAttribute("active") ??
            this.querySelector("[data-page]")?.getAttribute("data-page") ??
            "";
          this.#stack = first ? [first] : [];
          // Drivable from light DOM via Invoker Commands: `<button command="--goto" commandfor="dd-id"
          // data-page="…">` descends and `command="--back" commandfor="dd-id">` returns. (In-panel item
          // navigation stays click/keydown-delegated, since those items are your own markup.)
          if (!this.#wired) {
            this.#wired = true;
            ctx.onCommand(this, (command, source) => {
              if (command === "--back") this.back();
              else if (command === "--goto") {
                const page = source?.getAttribute("data-page");
                if (page) this.push(page);
              }
            });
          }
          this.paint();
        }
        attributeChangedCallback(name: string, _old: string | null, value: string | null): void {
          // An external `active` change reseeds the stack; ignored when it already matches the top
          // (which is the case for our own push/back writes, so they don't recurse).
          if (name === "active" && value && value !== this.#stack[this.#stack.length - 1]) {
            this.#stack = [value];
            this.paint();
          }
        }
        #pages(): Map<string, string> {
          const pages = new Map<string, string>();
          for (const el of this.querySelectorAll("[data-page]")) {
            pages.set(el.getAttribute("data-page") ?? "", el.innerHTML);
          }
          return pages;
        }
        push(id: string): void {
          if (!this.#pages().has(id)) return;
          this.#stack.push(id);
          this.setAttribute("active", id);
          this.paint();
          this.dispatchEvent(new CustomEvent("navigate", { detail: { page: id }, bubbles: true }));
        }
        back(): void {
          if (this.#stack.length <= 1) return;
          this.#stack.pop();
          const to = this.#stack[this.#stack.length - 1] ?? "";
          this.setAttribute("active", to);
          this.paint();
          this.dispatchEvent(new CustomEvent("navigate", { detail: { page: to }, bubbles: true }));
        }
        paint(): void {
          const root = this.shadowRoot;
          if (!root || !this.isConnected) return;
          const current = this.#stack[this.#stack.length - 1] ?? "";
          const body = this.#pages().get(current) ?? "";
          const backRow =
            this.#stack.length > 1
              ? `<div class="item -drilldown-back" role="menuitem" tabindex="0">${ctx.iconSvg("arrow-left")}<span>Back</span></div><div class="separator"></div>`
              : "";
          root.innerHTML =
            `<style>:host{display:inline-block}${menuCss(ctx.I)}${drilldownExtra}</style>` +
            `<div class="instui-menu" part="drilldown" role="menu">${backRow}${body}</div>`;
          const menu = root.querySelector<HTMLElement>(".instui-menu");
          const hit = (target: EventTarget | null): HTMLElement | null =>
            (target as HTMLElement | null)?.closest<HTMLElement>(
              "[data-goto],[data-back],.-drilldown-back",
            ) ?? null;
          menu?.addEventListener("click", (event) => {
            const item = hit(event.target);
            if (!item) return;
            if (item.hasAttribute("data-back") || item.classList.contains("-drilldown-back")) {
              this.back();
            } else {
              const to = item.getAttribute("data-goto");
              if (to) this.push(to);
            }
          });
          menu?.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
              const item = hit(event.target);
              if (item) {
                event.preventDefault();
                item.click();
              }
            } else if (event.key === "Escape" || event.key === "ArrowLeft") {
              this.back();
            }
          });
        }
      },
    );
  },
};
