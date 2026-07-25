import { defineComponent } from "../lib/define.ts";
import { SENTINEL } from "../lib/sentinel.ts";
import { badge as badgeRaw } from "../generated/component-styles.ts";

/** The `badge` component record: a small count or status dot pinned to a target's corner. */
export const badge = defineComponent({
  name: "badge",
  css: (p) => badgeRaw.replaceAll(SENTINEL, p),
});
/** Standalone `badge` stylesheet — the prefixed CSS for the count-and-status badge, ready to ship as a `.css` file. */
export const badgeCss = badge.css;
