import { defineComponent, type Definition } from "../lib/define.ts";
import { SENTINEL } from "../lib/sentinel.ts";
import { metric as metricRaw } from "../generated/component-styles.ts";

/** The `metric` component record: a labelled statistic — a large value above a caption. */
export const metric: Definition = defineComponent({
  name: "metric",
  css: (p) => metricRaw.replaceAll(SENTINEL, p),
});
/** Standalone `metric` stylesheet — the prefixed CSS for the statistic, ready to ship as a `.css` file. */
export const metricCss: Definition["css"] = metric.css;
