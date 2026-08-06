import { tooltipCss } from "@pantoken/components";
import { initTooltip } from "@pantoken/interactions";
import type { ElementDefinition } from "../lib/context.ts";
import tooltipGate from "./tooltip.css?inline";
import { esc, frag } from "../lib/helpers.ts";

/**
 * `<instui-tooltip>` — wraps a slotted trigger and shows a `.tip` bubble (from the `tip` attribute)
 * on hover/focus. `placement` maps to `-placement-<value>` (e.g. `bottom`, `end`); `show-delay` and
 * `hide-delay` (ms, default 0) gate the reveal/hide, and Escape dismisses it. JS owns the timing:
 * a `.-show`-gated `!important` override neutralizes the pure-CSS `:hover`/`:focus-within` auto-show
 * so the delay actually applies.
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
        constructor() {
          super();
          this.attachShadow({ mode: "open" });
          // Bound once on the host — catches Escape bubbling from the slotted light-DOM trigger.
          this.addEventListener("keydown", (e) => {
            if (e.key === "Escape") this.#handle?.cancelAndHide();
          });
        }
        connectedCallback(): void {
          this.paint();
        }
        attributeChangedCallback(): void {
          this.paint();
        }
        disconnectedCallback(): void {
          this.#handle?.cleanup();
        }
        paint(): void {
          this.#handle?.cleanup();
          const root = this.shadowRoot;
          if (!root) return;
          const tip = esc(this.getAttribute("tip") ?? "");
          const placement = frag(this.getAttribute("placement"));
          const tipCls = placement ? `tip -placement-${placement}` : "tip";
          root.innerHTML =
            `<style>:host{display:inline-flex}${tooltipCss(ctx.I)}${tooltipGate}</style>` +
            `<span class="instui-tooltip" part="tooltip"><slot></slot>` +
            `<span class="${tipCls}" role="tooltip">${tip}</span></span>`;
          const wrap = root.querySelector<HTMLElement>(".instui-tooltip");
          this.#bubble = root.querySelector<HTMLElement>(".tip");
          if (!wrap || !this.#bubble) return;
          // Listeners sit on the fresh shadow wrapper rebuilt each paint, so they never accumulate.
          this.#handle = initTooltip(wrap, this.#bubble, {
            showDelay: Number(this.getAttribute("show-delay")) || 0,
            hideDelay: Number(this.getAttribute("hide-delay")) || 0,
          });
        }
      },
    );
  },
};
