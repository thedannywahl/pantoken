import { buttonCss, calendarCss } from "@pantoken/components";
import type { ElementDefinition } from "../lib/context.ts";
import { WEEKDAYS, esc, isoDate, parseIsoDate } from "../lib/helpers.ts";

/**
 * `<instui-calendar>` — an interactive month grid. `value` (`yyyy-mm-dd`) is the selected day and
 * `view` (`yyyy-mm-dd`, optional) the visible month. The prev/next chevrons and every day are
 * `<button>`s driving the Invoker Commands API (`--calendar-prev`, `--calendar-next`,
 * `--calendar-select`) at the grid; selecting a day updates `value`/`view` and dispatches a composed,
 * bubbling `change` event (`detail.value` is the ISO date). Renders its own grid (no slot), so it
 * works standalone or nested inside a date picker.
 *
 * @example
 * ```html
 * <instui-calendar value="2026-07-08"></instui-calendar>
 * ```
 */
export const calendar: ElementDefinition = {
  name: "calendar",
  define: (ctx) => {
    if (ctx.registry.get("instui-calendar")) return;
    ctx.registry.define(
      "instui-calendar",
      class extends HTMLElement {
        static observedAttributes = ["value", "view"];
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
        #shiftMonth(delta: number): void {
          const base =
            parseIsoDate(this.getAttribute("view") ?? "") ??
            parseIsoDate(this.getAttribute("value") ?? "") ??
            new Date();
          this.setAttribute(
            "view",
            isoDate(new Date(base.getFullYear(), base.getMonth() + delta, 1)),
          );
        }
        #select(value: string): void {
          this.setAttribute("value", value);
          this.setAttribute("view", value);
          this.dispatchEvent(
            new CustomEvent("change", { detail: { value }, bubbles: true, composed: true }),
          );
        }
        paint(): void {
          const root = this.shadowRoot;
          if (!root) return;
          const selected = this.getAttribute("value") ?? "";
          const view =
            parseIsoDate(this.getAttribute("view") ?? "") ?? parseIsoDate(selected) ?? new Date();
          const year = view.getFullYear();
          const month = view.getMonth();
          const label = view.toLocaleDateString(undefined, { month: "long", year: "numeric" });
          const today = isoDate(new Date());
          // Leading days of the previous month, this month, then trailing days to fill the last week.
          const lead = new Date(year, month, 1).getDay();
          const total = new Date(year, month + 1, 0).getDate();
          const cells: Date[] = [];
          for (let i = 0; i < lead; i++) cells.push(new Date(year, month, 1 - (lead - i)));
          for (let d = 1; d <= total; d++) cells.push(new Date(year, month, d));
          for (let d = 1; cells.length % 7 !== 0; d++) cells.push(new Date(year, month + 1, d));
          const dayHtml = cells
            .map((date) => {
              const iso = isoDate(date);
              const classes = ["day"];
              if (date.getMonth() !== month) classes.push("-outside-month");
              if (iso === today) classes.push("-today");
              if (iso === selected) classes.push("-selected");
              const current = iso === selected ? ' aria-current="date"' : "";
              return `<button type="button" class="${classes.join(" ")}" data-value="${iso}" command="--calendar-select" commandfor="cal"${current}>${String(date.getDate())}</button>`;
            })
            .join("");
          const reset =
            ".instui-calendar button.day{appearance:none;-webkit-appearance:none;border:0;font:inherit}" +
            ".instui-calendar .instui-button{padding:0}" +
            ".instui-calendar .instui-button svg{inline-size:1em;block-size:1em}";
          const weekdays = WEEKDAYS.map((w) => `<span class="weekday">${w}</span>`).join("");
          root.innerHTML =
            `<style>:host{display:inline-block}${calendarCss(ctx.I)}${buttonCss(ctx.I)}${reset}</style>` +
            `<div class="instui-calendar" id="cal" role="group" aria-label="${esc(label)}" part="calendar">` +
            `<div class="nav">` +
            `<button type="button" class="instui-button -color-tertiary -shape-square" command="--calendar-prev" commandfor="cal" aria-label="Previous month">${ctx.iconSvg("chevron-left")}</button>` +
            `<strong>${esc(label)}</strong>` +
            `<button type="button" class="instui-button -color-tertiary -shape-square" command="--calendar-next" commandfor="cal" aria-label="Next month">${ctx.iconSvg("chevron-right")}</button>` +
            `</div>` +
            `<div class="grid">${weekdays}${dayHtml}</div>` +
            `</div>`;
          const cal = root.getElementById("cal");
          if (cal) {
            ctx.onCommand(cal, (command, source) => {
              if (command === "--calendar-prev") this.#shiftMonth(-1);
              else if (command === "--calendar-next") this.#shiftMonth(1);
              else if (command === "--calendar-select") {
                const value = source?.getAttribute("data-value");
                if (value) this.#select(value);
              }
            });
          }
        }
      },
    );
  },
};
