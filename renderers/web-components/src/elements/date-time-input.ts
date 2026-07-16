import { textInputCss } from "@pantoken/components";
import type { ElementDefinition } from "../lib/context.ts";
import dateTimeInputCss from "./date-time-input.css?inline";
import { esc } from "../lib/helpers.ts";

/**
 * `<instui-date-time-input>` — a nested `<instui-date-input>` plus a native time field. A change to
 * either recomputes a combined `value` (`yyyy-mm-ddThh:mm`, or just the date when no time) and emits
 * a composed, bubbling `change` (`detail.value`). Setting `value` splits it back across the two
 * fields.
 *
 * @example
 * ```html
 * <instui-date-time-input value="2026-07-08T14:30"></instui-date-time-input>
 * ```
 */
export const dateTimeInput: ElementDefinition = {
  name: "date-time-input",
  define: (ctx) => {
    if (ctx.registry.get("instui-date-time-input")) return;
    ctx.registry.define(
      "instui-date-time-input",
      class extends HTMLElement {
        static observedAttributes = ["value"];
        #date: HTMLElement | null = null;
        #time: HTMLInputElement | null = null;
        constructor() {
          super();
          this.attachShadow({ mode: "open" });
        }
        connectedCallback(): void {
          const root = this.shadowRoot;
          if (!root || root.querySelector(".dt")) return;
          const [datePart = "", timePart = ""] = (this.getAttribute("value") ?? "").split("T");
          root.innerHTML =
            `<style>${textInputCss(ctx.I)}${dateTimeInputCss}</style>` +
            `<div class="dt">` +
            `<${ctx.tag("date-input")} value="${esc(datePart)}"></${ctx.tag("date-input")}>` +
            `<input class="instui-text-input" type="time" part="time" aria-label="Time" value="${esc(timePart)}" />` +
            `</div>`;
          this.#date = root.querySelector(ctx.tag("date-input"));
          this.#time = root.querySelector('input[type="time"]');
          root.addEventListener("change", (event) => {
            if (event.target === this.#date || event.target === this.#time) {
              event.stopPropagation();
              this.#recompute();
            }
          });
        }
        #recompute(): void {
          const date = this.#date?.getAttribute("value") ?? "";
          const time = this.#time?.value ?? "";
          const value = date && time ? `${date}T${time}` : date;
          if (this.getAttribute("value") !== value) this.setAttribute("value", value);
          this.dispatchEvent(
            new CustomEvent("change", { detail: { value }, bubbles: true, composed: true }),
          );
        }
        attributeChangedCallback(name: string, _old: string | null, value: string | null): void {
          if (name !== "value" || !this.#date || !this.#time) return;
          const [datePart = "", timePart = ""] = (value ?? "").split("T");
          if (this.#date.getAttribute("value") !== datePart)
            this.#date.setAttribute("value", datePart);
          if (this.#time.value !== timePart) this.#time.value = timePart;
        }
      },
    );
  },
};
