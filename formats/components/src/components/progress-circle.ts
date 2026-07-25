import { defineComponent } from "../lib/define.ts";
import { SENTINEL } from "../lib/sentinel.ts";
import { progressCircle as progressCircleRaw } from "../generated/component-styles.ts";

/** The `progressCircle` component record: a circular progress ring driven by a `--value` (0–100) custom property. */
export const progressCircle = defineComponent({
  name: "progress-circle",
  css: (p) => progressCircleRaw.replaceAll(SENTINEL, p),
});
/** Standalone `progressCircle` stylesheet — the prefixed CSS for the progress ring, ready to ship as a `.css` file. */
export const progressCircleCss = progressCircle.css;
