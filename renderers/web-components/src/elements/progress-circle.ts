import { progressCircleCss } from "@pantoken/components";
import { initProgressCircle, type ProgressCircleHandle } from "@pantoken/interactions";
import type { ElementDefinition } from "../lib/context.ts";
import { esc } from "../lib/helpers.ts";

/**
 * `<instui-progress-circle>` — a circular progress meter with `role="img"`.
 *
 * `value-now`/`value` drive `--value`, while `value-max`/`max` drive `--max`. Add the boolean
 * `should-animate` attribute to animate from zero on mount; `animation-delay` is a millisecond delay.
 * `label` overrides the accessible name (which otherwise defaults to the percentage).
 *
 * @example
 * ```html
 * <instui-progress-circle value-now="40" value-max="60" should-animate></instui-progress-circle>
 * ```
 */
export const progressCircle: ElementDefinition = {
  name: "progress-circle",
  define: (ctx) => {
    if (ctx.registry.get("instui-progress-circle")) return;
    ctx.registry.define(
      "instui-progress-circle",
      class extends HTMLElement {
        static observedAttributes = [
          "value",
          "value-now",
          "max",
          "value-max",
          "label",
          "should-animate",
          "animation-delay",
        ];
        #animationHandle: ProgressCircleHandle | undefined;
        #hasAnimated = false;

        constructor() {
          super();
          this.attachShadow({ mode: "open" });
        }

        connectedCallback(): void {
          this.#paint();
          this.#startAnimation();
        }

        disconnectedCallback(): void {
          this.#animationHandle?.cleanup();
        }

        attributeChangedCallback(name: string, oldValue: string | null): void {
          if (!this.isConnected) return;
          if (name === "should-animate" && oldValue === null) this.#hasAnimated = false;
          this.#animationHandle?.cleanup();
          this.#paint();
          this.#startAnimation();
        }

        #values(): { value: number; max: number; delay: number } {
          const rawMax = Number(
            this.getAttribute("value-max") ?? this.getAttribute("max") ?? "100",
          );
          const max = Number.isFinite(rawMax) && rawMax > 0 ? rawMax : 100;
          const rawValue = Number(
            this.getAttribute("value-now") ?? this.getAttribute("value") ?? "0",
          );
          const value = Math.max(0, Math.min(max, Number.isFinite(rawValue) ? rawValue : 0));
          const rawDelay = Number(this.getAttribute("animation-delay") ?? "0");
          const delay = Number.isFinite(rawDelay) && rawDelay >= 0 ? rawDelay : 0;
          return { value, max, delay };
        }

        #paint(): void {
          const root = this.shadowRoot;
          if (!root) return;
          const { value, max, delay } = this.#values();
          const percentage = Math.min(100, (value / max) * 100);
          const label = esc(this.getAttribute("label") ?? `${String(percentage)}%`);
          const animate = this.hasAttribute("should-animate") && !this.#hasAnimated;
          root.innerHTML =
            `<style>:host{display:inline-block}${progressCircleCss(ctx.I)}</style>` +
            `<span class="instui-progress-circle${animate ? " -should-animate" : ""}" role="img" aria-label="${label}" part="progress-circle" style="--value:${String(value)};--max:${String(max)};--animation-delay:${String(delay)}"></span>`;
        }

        #startAnimation(): void {
          const ring = this.shadowRoot?.querySelector<HTMLElement>(".instui-progress-circle");
          if (!ring?.classList.contains("-should-animate")) return;
          this.#hasAnimated = true;
          this.#animationHandle = initProgressCircle(ring, {
            animationDelay: this.#values().delay,
          });
        }
      },
    );
  },
};
