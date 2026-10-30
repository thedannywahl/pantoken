import { tooltipCss } from "@pantoken/components";
import { initTooltip } from "@pantoken/interactions";
import type { ElementDefinition } from "../lib/context.ts";
import tooltipGate from "./tooltip.css?inline";
import { frag } from "../lib/helpers.ts";

/**
 * `<instui-tooltip>` — wraps a slotted trigger and shows a `.tip` bubble (from the `tip` attribute)
 * on hover/focus. `placement` maps to `-placement-<value>` (e.g. `bottom`, `end`); `show-delay` and
 * `hide-delay` (ms, default 0) gate the reveal/hide. Shared behavior owns visibility; Escape
 * dismisses until both pointer and focus leave. Tooltip content is noninteractive.
 *
 * @example
 * ```html
 * <instui-tooltip tip="Placement bottom" placement="bottom" show-delay="200">
 *   <button class="instui-button -color-secondary">Hover me</button>
 * </instui-tooltip>
 * ```
 */
export const tooltip: ElementDefinition = {
  name: "tooltip",
  define: (ctx) => {
    if (ctx.registry.get("instui-tooltip")) return;
    ctx.registry.define(
      "instui-tooltip",
      class extends HTMLElement {
        static observedAttributes = ["tip", "placement", "show-delay", "hide-delay"];
        #handle: { cleanup(): void; cancelAndHide(): void } | undefined;
        #bubble: HTMLElement | null = null;
        #options = { showDelay: 0, hideDelay: 0 };
        constructor() {
          super();
          this.attachShadow({ mode: "open" });
        }
        connectedCallback(): void {
          this.paint();
        }
        attributeChangedCallback(): void {
          this.paint();
        }
        disconnectedCallback(): void {
          this.#handle?.cleanup();
          this.#handle = undefined;
        }
        paint(): void {
          const root = this.shadowRoot;
          if (!root) return;
          const placement = frag(this.getAttribute("placement"));
          const tipCls = placement ? `tip -placement-${placement}` : "tip";
          if (!this.#bubble) {
            root.innerHTML =
              `<style>:host{display:inline-flex}${tooltipCss(ctx.I)}${tooltipGate}</style>` +
              `<span class="instui-tooltip" part="tooltip"><slot></slot>` +
              `<span class="tip" role="tooltip"></span></span>`;
            this.#bubble = root.querySelector<HTMLElement>(".tip");
          }
          const wrap = root.querySelector<HTMLElement>(".instui-tooltip");
          if (!wrap || !this.#bubble) return;
          const shown = this.#bubble.classList.contains("-show");
          this.#bubble.className = tipCls;
          this.#bubble.classList.toggle("-show", shown);
          this.#bubble.textContent = this.getAttribute("tip") ?? "";
          this.#options.showDelay = Number(this.getAttribute("show-delay")) || 0;
          this.#options.hideDelay = Number(this.getAttribute("hide-delay")) || 0;
          // Retain interaction state across attribute updates, especially Escape dismissal.
          if (this.isConnected && !this.#handle)
            this.#handle = initTooltip(wrap, this.#bubble, this.#options);
        }
      },
    );
  },
};
