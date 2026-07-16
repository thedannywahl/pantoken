import { defineComponent } from "../lib/define.ts";
import { SENTINEL } from "../lib/sentinel.ts";
import { metric as metricRaw } from "../generated/component-styles.ts";

export const metric = defineComponent({
  name: "metric",
  css: (p) => metricRaw.replaceAll(SENTINEL, p),
});
export const metricCss = metric.css;
