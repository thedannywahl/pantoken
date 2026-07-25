import { defineComponent } from "../lib/define.ts";
import { SENTINEL } from "../lib/sentinel.ts";
import { metric as metricRaw } from "../generated/component-styles.ts";

/** The `metric` component record: a labelled statistic — a large value above a caption. */
export const metric = defineComponent({
  name: "metric",
  css: (p) => metricRaw.replaceAll(SENTINEL, p),
});
/** Standalone `metric` stylesheet — the prefixed CSS for the statistic, ready to ship as a `.css` file. */
export const metricCss = metric.css;
