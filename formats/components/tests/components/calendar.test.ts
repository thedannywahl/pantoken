import { expect, test } from "vite-plus/test";
import { calendarCss, calendarDayCss } from "../../src/index.ts";
import { calendar } from "../../src/components/calendar/index.ts";
import { validate } from "../_validate.ts";

test("calendar: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(calendar);
});

test("calendar is a seven-column grid with day states", () => {
  const css = calendarCss({ prefix: "instui" });
  expect(css).toContain("@scope (.instui-calendar)");
  // Fixed square columns, centred (1fr would stretch cells unevenly in the inline-block calendar).
  expect(css).toContain(
    "grid-template-columns: repeat(7, var(--instui-component-calendar-day-min-width));",
  );
  expect(css).toContain("justify-content: center;");
  expect(css).toMatch(/:scope\s*\{[\s\S]*?>\s*\.grid/u);
  const day = calendarDayCss({ prefix: "instui" });
  expect(day).toContain(".day.-today {");
  expect(day).toContain(".day.-selected {");
  expect(day).toContain(".day.-outside-month {");
});
