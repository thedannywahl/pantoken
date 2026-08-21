import { defineComponent, type Definition } from "../../../../lib/define.ts";
import { SENTINEL } from "../../../../lib/sentinel.ts";
import { calendarDay as calendarDayRaw } from "../../../../generated/component-styles.ts";

/** The `calendar.day` member record: a day cell (InstUI `Calendar.Day`). */
export const calendarDay: Definition = defineComponent({
  name: "calendar.day",
  css: (p) => calendarDayRaw.replaceAll(SENTINEL, p),
});
/** Standalone `calendar.day` stylesheet. */
export const calendarDayCss: Definition["css"] = calendarDay.css;
