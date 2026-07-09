import { buttonCss, textInputCss } from "@pantoken/components";
import type { ElementDefinition } from "../lib/context.ts";
import { esc, parseIsoDate } from "../lib/helpers.ts";

/**
 * `<instui-date-input>` — a text field plus a calendar dropdown. The trigger toggles a `[popover]`
 * through the built-in `toggle-popover` Invoker Command (a click fallback covers browsers without the
 * API); picking a day in the nested `<instui-calendar>` fills the field (ISO `yyyy-mm-dd`), closes the
 * popover, and emits a composed, bubbling `change` (`detail.value`). Typing a valid `yyyy-mm-dd` (or
 * clearing it) and committing on the input's `change` works too. `value` is the ISO date, `label` the
 * accessible name (default `Date`), and `placeholder` the hint (default `yyyy-mm-dd`).
 *
 * @example
 * ```html
 * <instui-date-input value="2026-07-08" label="Due date"></instui-date-input>
 * ```
 */
export const dateInput: ElementDefinition = {
  name: "date-input",
  define: (ctx) => {
    if (ctx.registry.get("instui-date-input")) return;
    ctx.registry.define(
      "instui-date-input",
      class extends HTMLElement {
        static observedAttributes = ["value"];
        #input: HTMLInputElement | null = null;
        #calendar: HTMLElement | null = null;
        #popover: (HTMLElement & { togglePopover?: () => void; hidePopover?: () => void }) | null =
          null;
        constructor() {
          super();
          this.attachShadow({ mode: "open" });
        }
        connectedCallback(): void {
          const root = this.shadowRoot;
          if (!root || root.querySelector(".field")) return;
          const value = esc(this.getAttribute("value") ?? "");
          const label = esc(this.getAttribute("label") ?? "Date");
          const placeholder = esc(this.getAttribute("placeholder") ?? "yyyy-mm-dd");
          const styles =
            ":host{display:inline-block}" +
            ".field{position:relative;display:inline-flex}" +
            ".field{anchor-name:--datefield}" +
            ".field .instui-text-input{padding-inline-end:2.25rem}" +
            ".trigger{position:absolute;inset-inline-end:0.25rem;inset-block:50%;translate:0 -50%}" +
            ".trigger svg{inline-size:1em;block-size:1em}" +
            ".dropdown{position-anchor:--datefield;position-area:bottom span-inline-end;" +
            "margin-block:0.25rem 0;border:var(--instui-border-width-sm) solid var(--instui-color-stroke-base);" +
            "border-radius:var(--instui-border-radius-md);padding:var(--instui-spacing-space-sm);" +
            "background:var(--instui-color-background-elevated-surface-base)}";
          root.innerHTML =
            `<style>${textInputCss(ctx.I)}${buttonCss(ctx.I)}${styles}</style>` +
            `<div class="field">` +
            `<input class="instui-text-input" type="text" part="input" aria-label="${label}" placeholder="${placeholder}" value="${value}" />` +
            `<button type="button" class="instui-button -color-tertiary -shape-square trigger" command="toggle-popover" commandfor="datepop" aria-label="Open calendar">${ctx.iconSvg("calendar")}</button>` +
            `</div>` +
            `<div popover id="datepop" class="dropdown" part="dropdown"><${ctx.tag("calendar")} value="${value}"></${ctx.tag("calendar")}></div>`;
          this.#input = root.querySelector("input");
          this.#calendar = root.querySelector(ctx.tag("calendar"));
          this.#popover = root.getElementById("datepop");
          if (!ctx.invokerSupported) {
            root
              .querySelector(".trigger")
              ?.addEventListener("click", () => this.#popover?.togglePopover?.());
          }
          // A day picked in the nested calendar commits and closes the popover.
          const calendarTag = ctx.tag("calendar").toUpperCase();
          root.addEventListener("change", (event) => {
            if ((event.target as HTMLElement).tagName !== calendarTag) return;
            event.stopPropagation();
            this.#commit((event as CustomEvent<{ value: string }>).detail.value);
            this.#popover?.hidePopover?.();
          });
          // Manual typing: commit an empty or valid yyyy-mm-dd on change.
          this.#input?.addEventListener("change", () => {
            const typed = this.#input?.value.trim() ?? "";
            if (typed === "" || parseIsoDate(typed)) this.#commit(typed);
          });
        }
        #commit(value: string): void {
          if (this.#input) this.#input.value = value;
          if (value) this.#calendar?.setAttribute("value", value);
          else this.#calendar?.removeAttribute("value");
          if (this.getAttribute("value") !== value) this.setAttribute("value", value);
          this.dispatchEvent(
            new CustomEvent("change", { detail: { value }, bubbles: true, composed: true }),
          );
        }
        attributeChangedCallback(name: string, _old: string | null, value: string | null): void {
          if (name !== "value" || !this.#input) return;
          const next = value ?? "";
          if (this.#input.value !== next && this.shadowRoot?.activeElement !== this.#input) {
            this.#input.value = next;
            if (next) this.#calendar?.setAttribute("value", next);
          }
        }
      },
    );
  },
};
