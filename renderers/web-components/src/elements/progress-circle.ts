import { progressCircleCss } from "@pantoken/components";
import { initProgressCircle, type ProgressCircleHandle } from "@pantoken/interactions";
import type { ElementDefinition } from "../lib/context.ts";
import { esc } from "../lib/helpers.ts";

/**
 * `<instui-progress-circle>` — a circular indicator backed by native `<progress>` or `<meter>` semantics.
 *
 * `value-now`/`value` drive `--value`, while `min` and `value-max`/`max` drive the range. A zero
 * minimum renders a native `<progress>`; a non-zero minimum renders `<meter>`. Add the boolean
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
          "min",
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

        #values(): { value: number; min: number; max: number; delay: number } {
          const rawMin = Number(this.getAttribute("min") ?? "0");
          const min = Number.isFinite(rawMin) ? rawMin : 0;
          const rawMax = Number(
            this.getAttribute("value-max") ?? this.getAttribute("max") ?? "100",
          );
          const max = Number.isFinite(rawMax) && rawMax > min ? rawMax : Math.max(100, min + 100);
          const rawValue = Number(
            this.getAttribute("value-now") ?? this.getAttribute("value") ?? String(min),
          );
          const value = Math.max(min, Math.min(max, Number.isFinite(rawValue) ? rawValue : min));
          const rawDelay = Number(this.getAttribute("animation-delay") ?? "0");
          const delay = Number.isFinite(rawDelay) && rawDelay >= 0 ? rawDelay : 0;
          return { value, min, max, delay };
        }

        #paint(): void {
          const root = this.shadowRoot;
          if (!root) return;
          const { value, min, max, delay } = this.#values();
          const percentage = ((value - min) / (max - min)) * 100;
          const label = esc(this.getAttribute("label") ?? `${String(percentage)}%`);
          const animate = this.hasAttribute("should-animate") && !this.#hasAnimated;
          const tag = min === 0 ? "progress" : "meter";
          const minAttribute = tag === "meter" ? ` min="${String(min)}"` : "";
          root.innerHTML =
            `<style>:host{display:inline-block}.native{position:absolute;inline-size:1px;block-size:1px;overflow:hidden;clip-path:inset(50%)}${progressCircleCss(ctx.I)}</style>` +
            `<${tag} class="native" value="${String(value)}"${minAttribute} max="${String(max)}" aria-label="${label}" part="native"></${tag}>` +
            `<span class="instui-progress-circle${animate ? " -should-animate" : ""}" aria-hidden="true" part="progress-circle" style="--value:${String(value)};--min:${String(min)};--max:${String(max)};--animation-delay:${String(delay)}"></span>`;
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
