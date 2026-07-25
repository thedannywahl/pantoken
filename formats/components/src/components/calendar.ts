import { defineComponent } from "../lib/define.ts";
import { SENTINEL } from "../lib/sentinel.ts";
import { calendar as calendarRaw } from "../generated/component-styles.ts";

/** The `calendar` component record: a static month grid with navigation, weekday headers, and day cells. */
export const calendar = defineComponent({
  name: "calendar",
  css: (p) => calendarRaw.replaceAll(SENTINEL, p),
});
/** Standalone `calendar` stylesheet — the prefixed CSS for the month grid, ready to ship as a `.css` file. */
export const calendarCss = calendar.css;
