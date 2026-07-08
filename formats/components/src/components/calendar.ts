import { defineComponent } from "../lib/define.ts";
import { scope } from "../lib/helpers.ts";

export const calendar = defineComponent({
  name: "calendar",
  summary: "A static month grid with navigation, weekday headers, and day cells.",
  parts: [
    { name: ".nav", description: "The month navigation row." },
    { name: ".grid", description: "The seven-column day grid." },
    { name: ".weekday", description: "A weekday column header." },
    {
      name: ".day",
      description: "A day cell; `-today`, `-selected`, and `-outside-month` mark its state.",
    },
  ],
  examples: [
    `<div class="instui-calendar" role="table" aria-label="March 2026">
  <div class="nav">
    <button class="instui-button -color-tertiary -shape-square -icon-chevron-left" aria-label="Previous month"></button>
    <strong>March 2026</strong>
    <button class="instui-button -color-tertiary -shape-square -icon-chevron-right" aria-label="Next month"></button>
  </div>
  <div class="grid">
    <span class="weekday">Su</span>
    <span class="weekday">Mo</span>
    <span class="weekday">Tu</span>
    <span class="weekday">We</span>
    <span class="weekday">Th</span>
    <span class="weekday">Fr</span>
    <span class="weekday">Sa</span>
    <span class="day -outside-month">23</span>
    <span class="day -outside-month">24</span>
    <span class="day -outside-month">25</span>
    <span class="day -outside-month">26</span>
    <span class="day -outside-month">27</span>
    <span class="day -outside-month">28</span>
    <span class="day">1</span>
    <span class="day">2</span>
    <span class="day">3</span>
    <span class="day">4</span>
    <span class="day">5</span>
    <span class="day">6</span>
    <span class="day -today">7</span>
    <span class="day">8</span>
    <span class="day">9</span>
    <span class="day">10</span>
    <span class="day">11</span>
    <span class="day -selected">12</span>
    <span class="day">13</span>
    <span class="day">14</span>
    <span class="day">15</span>
  </div>
</div>`,
  ],
  structure: `.instui-calendar
  .nav
    .instui-button.-color-tertiary.-shape-square.-icon-chevron-left
    strong
    .instui-button.-color-tertiary.-shape-square.-icon-chevron-right
  .grid
    .weekday
    .day.-outside-month
    .day
    .day.-today
    .day.-selected`,
  css: (p) => {
    const root = `.${p}calendar`;
    const c = (k: string): string => `var(--instui-component-calendar-${k})`;
    return `
${root} {
  display: inline-block;
  text-align: center;
  background: ${c("background")};
  color: ${c("color")};
  font-family: ${c("font-family")};
  font-size: ${c("font-size")};
  font-weight: ${c("font-weight")};
  line-height: ${c("line-height")};
}
${scope(
  root,
  `
.${p}calendar .nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: ${c("nav-margin")};
  max-inline-size: ${c("max-header-width")};
}
/* Fixed square day cells, centred as a block (1fr columns would stretch the cells unevenly and
   off-centre inside the inline-block calendar). */
.${p}calendar .grid {
  display: grid;
  grid-template-columns: repeat(7, ${c("day-min-width")});
  justify-content: center;
  row-gap: var(--instui-spacing-space2xs);
}
.${p}calendar .weekday,
.${p}calendar .day {
  display: flex;
  align-items: center;
  justify-content: center;
  inline-size: ${c("day-min-width")};
  block-size: ${c("day-height")};
}
.${p}calendar .weekday { font-weight: var(--instui-font-weight-interactive); }
.${p}calendar .day {
  font-size: ${c("day-font-size")};
  color: ${c("day-color")};
  background: ${c("day-background")};
  cursor: pointer;
}
.${p}calendar .day.-outside-month { color: ${c("day-outside-month-color")}; }
.${p}calendar .day.-today {
  background: ${c("day-today-background")};
  color: ${c("day-today-color")};
  border-radius: ${c("day-today-border-radius")};
}
.${p}calendar .day.-selected {
  background: ${c("day-selected-background")};
  color: ${c("day-selected-color")};
  border-radius: ${c("day-selected-border-radius")};
}
`,
  // Only .nav and .grid are direct children; .weekday and .day live inside .grid, so leave them as
  // descendant selectors (listing them would force an incorrect :scope > direct-child match).
  ["nav", "grid"],
)}`;
  },
});

export const calendarCss = calendar.css;
