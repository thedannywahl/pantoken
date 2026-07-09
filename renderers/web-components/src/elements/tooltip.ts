import { tooltipCss } from "@pantoken/components";
import type { ElementDefinition } from "../lib/context.ts";
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
 *
 * @demo self:tooltip
 */
export const tooltip: ElementDefinition = {
  name: "tooltip",
  define: (ctx) => {
    if (ctx.registry.get("instui-tooltip")) return;
    ctx.registry.define(
      "instui-tooltip",
      class extends HTMLElement {
        static observedAttributes = ["tip", "placement", "show-delay", "hide-delay"];
        #timer: ReturnType<typeof setTimeout> | undefined;
        #bubble: HTMLElement | null = null;
        constructor() {
          super();
          this.attachShadow({ mode: "open" });
          // Escape dismisses; bound once on the host so it catches keydown bubbling from the slotted
          // (light-DOM) trigger, and never accumulates across repaints.
          this.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
              clearTimeout(this.#timer);
              this.#bubble?.classList.remove("-show");
            }
          });
        }
        connectedCallback(): void {
          this.paint();
        }
        attributeChangedCallback(): void {
          this.paint();
        }
        disconnectedCallback(): void {
          clearTimeout(this.#timer);
        }
        #delay(attr: string): number {
          const n = Number(this.getAttribute(attr));
          return Number.isFinite(n) && n >= 0 ? n : 0;
        }
        paint(): void {
          const root = this.shadowRoot;
          if (!root) return;
          const tip = esc(this.getAttribute("tip") ?? "");
          const placement = frag(this.getAttribute("placement"));
          const tipCls = placement ? `tip -placement-${placement}` : "tip";
          const gate =
            ".instui-tooltip > .tip:not(.-show){opacity:0!important;visibility:hidden!important}" +
            ".instui-tooltip > .tip.-show{opacity:1;visibility:visible}";
          root.innerHTML =
            `<style>:host{display:inline-flex}${tooltipCss(ctx.I)}${gate}</style>` +
            `<span class="instui-tooltip" part="tooltip"><slot></slot>` +
            `<span class="${tipCls}" role="tooltip">${tip}</span></span>`;
          const wrap = root.querySelector<HTMLElement>(".instui-tooltip");
          this.#bubble = root.querySelector<HTMLElement>(".tip");
          if (!wrap || !this.#bubble) return;
          const show = (): void => {
            clearTimeout(this.#timer);
            this.#timer = setTimeout(
              () => this.#bubble?.classList.add("-show"),
              this.#delay("show-delay"),
            );
          };
          const hide = (): void => {
            clearTimeout(this.#timer);
            this.#timer = setTimeout(
              () => this.#bubble?.classList.remove("-show"),
              this.#delay("hide-delay"),
            );
          };
          // Listeners sit on the fresh shadow wrapper rebuilt each paint, so they never accumulate.
          wrap.addEventListener("pointerenter", show);
          wrap.addEventListener("pointerleave", hide);
          wrap.addEventListener("focusin", show);
          wrap.addEventListener("focusout", hide);
        }
      },
    );
  },
};
