import { progressCss } from "@pantoken/components";
import type { ElementDefinition } from "../lib/context.ts";
import { frag } from "../lib/helpers.ts";

/**
 * `<instui-progress>` — a horizontal indicator backed by native `<progress>` or `<meter>` semantics.
 *
 * `value-now`/`value` drive `--value`, while `min` and `value-max`/`max` drive the range. A zero
 * minimum renders a native `<progress>`; a non-zero minimum renders `<meter>`. Add the boolean
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
          "min",
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
            `<style>:host{display:block}.native{position:absolute;inline-size:1px;block-size:1px;overflow:hidden;clip-path:inset(50%)}${progressCss(ctx.I)}</style>` +
            `<div class="instui-progress" part="progress"><progress class="native" part="native"></progress><div class="bar" aria-hidden="true"></div></div>`;
        }

        connectedCallback(): void {
          this.#paint();
        }

        attributeChangedCallback(): void {
          if (this.isConnected) this.#paint();
        }

        #values(): { value: number; min: number; max: number } {
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
          return { value, min, max };
        }

        #paint(): void {
          const meter = this.shadowRoot?.querySelector<HTMLElement>(".instui-progress");
          if (!meter) return;
          const { value, min, max } = this.#values();
          const variant = frag(this.getAttribute("variant"));
          meter.className = `instui-progress${variant ? ` -color-${variant}` : ""}${this.hasAttribute("should-animate") ? " -should-animate" : ""}`;
          meter.style.setProperty("--value", String(value));
          meter.style.setProperty("--min", String(min));
          meter.style.setProperty("--max", String(max));
          const percentage = ((value - min) / (max - min)) * 100;
          const bar = meter.querySelector<HTMLElement>(".bar");
          if (bar) bar.style.width = `${String(percentage)}%`;

          const tag = min === 0 ? "progress" : "meter";
          let native = meter.querySelector<HTMLElement>(".native");
          if (native?.localName !== tag) {
            const replacement = document.createElement(tag);
            replacement.className = "native";
            replacement.setAttribute("part", "native");
            native?.replaceWith(replacement);
            native = replacement;
          }
          native?.setAttribute("value", String(value));
          native?.setAttribute("max", String(max));
          if (tag === "meter") native?.setAttribute("min", String(min));
          else native?.removeAttribute("min");
          const label = this.getAttribute("label");
          if (label) native?.setAttribute("aria-label", label);
          else native?.removeAttribute("aria-label");
        }
      },
    );
  },
};
