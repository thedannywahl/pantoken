import { inPlaceEditCss } from "@pantoken/components";
import type { ElementDefinition } from "../lib/context.ts";
import { esc } from "../lib/helpers.ts";

/**
 * `<instui-in-place-edit>` — a click-to-edit field. `value` shows as text; on click/focus it becomes
 * editable, Enter or blur commits (and fires a bubbling `change` event with `detail.value`), and
 * Escape reverts to the pre-edit value. `readonly` disables editing. An external `value` change
 * reflects into the field while it isn't being edited.
 *
 * @example
 * ```html
 * <instui-in-place-edit value="Course title"></instui-in-place-edit>
 * ```
 */
export const inPlaceEdit: ElementDefinition = {
  name: "in-place-edit",
  define: (ctx) => {
    if (ctx.registry.get("instui-in-place-edit")) return;
    ctx.registry.define(
      "instui-in-place-edit",
      class extends HTMLElement {
        static observedAttributes = ["value", "readonly"];
        #field: HTMLElement | null = null;
        #original = "";
        constructor() {
          super();
          this.attachShadow({ mode: "open" });
        }
        connectedCallback(): void {
          const root = this.shadowRoot;
          if (!root) return;
          const readonly = this.hasAttribute("readonly");
          const value = esc(this.getAttribute("value") ?? this.textContent ?? "");
          root.innerHTML =
            `<style>:host{display:inline-block}${inPlaceEditCss(ctx.I)}</style>` +
            `<span class="instui-in-place-edit${readonly ? " -readonly" : ""}" part="field" role="textbox"` +
            ` contenteditable="${readonly ? "false" : "true"}">${value}</span>`;
          const field = root.querySelector<HTMLElement>(".instui-in-place-edit");
          this.#field = field;
          if (!field || readonly) return;
          field.addEventListener("focus", () => {
            this.#original = field.textContent ?? "";
          });
          field.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              field.blur();
            } else if (event.key === "Escape") {
              field.textContent = this.#original;
              field.blur();
            }
          });
          field.addEventListener("blur", () => {
            const next = field.textContent ?? "";
            this.setAttribute("value", next);
            if (next !== this.#original) {
              this.dispatchEvent(
                new CustomEvent("change", { detail: { value: next }, bubbles: true }),
              );
            }
          });
        }
        attributeChangedCallback(name: string): void {
          // Reflect an external value change into the field when it isn't being edited.
          if (name === "value" && this.#field && this.shadowRoot?.activeElement !== this.#field) {
            this.#field.textContent = this.getAttribute("value") ?? "";
          }
        }
      },
    );
  },
};
