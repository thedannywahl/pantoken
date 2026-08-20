import { defineComponent, type Definition } from "../../lib/define.ts";
import { PROGRESS_NUMERIC_PROPERTIES } from "../../lib/helpers.ts";
import { SENTINEL } from "../../lib/sentinel.ts";
import { progressCircle as progressCircleRaw } from "../../generated/component-styles.ts";

/** The `progressCircle` component record: a circular progress ring driven by current and maximum values. */
export const progressCircle: Definition = defineComponent({
  name: "progress-circle",
  css: (p) => `${PROGRESS_NUMERIC_PROPERTIES}\n${progressCircleRaw.replaceAll(SENTINEL, p)}`,
});
/** Standalone `progressCircle` stylesheet — the prefixed CSS for the progress ring, ready to ship as a `.css` file. */
export const progressCircleCss: Definition["css"] = progressCircle.css;
