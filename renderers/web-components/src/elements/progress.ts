import { progressCss } from "@pantoken/components";
import type { ElementDefinition } from "../lib/context.ts";
import { frag } from "../lib/helpers.ts";

/**
 * `<instui-progress>` — a horizontal progress bar with `role="progressbar"`.
 *
 * `value-now`/`value` drive `--value`, while `value-max`/`max` drive `--max`. Add the boolean
 * `should-animate` attribute to transition meter changes over half a second. `variant` maps the
 * component to `-color-<variant>` and `label` supplies its accessible name.
 *
 * @example
 * ```html
 * <instui-progress value-now="40" value-max="60" variant="success" should-animate></instui-progress>
 * ```
 */
export const progress: ElementDefinition = {
  name: "progress",
  define: (ctx) => {
    if (ctx.registry.get("instui-progress")) return;
    ctx.registry.define(
      "instui-progress",
      class extends HTMLElement {
        static observedAttributes = [
          "value",
          "value-now",
          "max",
          "value-max",
          "variant",
          "label",
          "should-animate",
        ];

        constructor() {
          super();
          const root = this.attachShadow({ mode: "open" });
          root.innerHTML =
            `<style>:host{display:block}${progressCss(ctx.I)}</style>` +
            `<div class="instui-progress" role="progressbar" aria-valuemin="0" part="progress"><div class="bar"></div></div>`;
        }

        connectedCallback(): void {
          this.#paint();
        }

        attributeChangedCallback(): void {
          if (this.isConnected) this.#paint();
        }

        #values(): { value: number; max: number } {
          const rawMax = Number(
            this.getAttribute("value-max") ?? this.getAttribute("max") ?? "100",
          );
          const max = Number.isFinite(rawMax) && rawMax > 0 ? rawMax : 100;
          const rawValue = Number(
            this.getAttribute("value-now") ?? this.getAttribute("value") ?? "0",
          );
          const value = Math.max(0, Math.min(max, Number.isFinite(rawValue) ? rawValue : 0));
          return { value, max };
        }

        #paint(): void {
          const meter = this.shadowRoot?.querySelector<HTMLElement>(".instui-progress");
          if (!meter) return;
          const { value, max } = this.#values();
          const variant = frag(this.getAttribute("variant"));
          meter.className = `instui-progress${variant ? ` -color-${variant}` : ""}${this.hasAttribute("should-animate") ? " -should-animate" : ""}`;
          meter.style.setProperty("--value", String(value));
          meter.style.setProperty("--max", String(max));
          meter.setAttribute("aria-valuenow", String(value));
          meter.setAttribute("aria-valuemax", String(max));
          const label = this.getAttribute("label");
          if (label) meter.setAttribute("aria-label", label);
          else meter.removeAttribute("aria-label");
        }
      },
    );
  },
};
