import { defineComponent } from "../lib/define.ts";
import { SENTINEL } from "../lib/sentinel.ts";
import { calendar as calendarRaw } from "../generated/component-styles.ts";

export const calendar = defineComponent({
  name: "calendar",
  css: (p) => calendarRaw.replaceAll(SENTINEL, p),
});
export const calendarCss = calendar.css;
