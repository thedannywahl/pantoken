import { defineComponent } from "../lib/define.ts";
import { scope } from "../lib/helpers.ts";

export const metric = defineComponent({
  name: "metric",
  summary: "A labelled statistic — a large value over a caption.",
  modifiers: [
    { name: "-text-align-start", description: "Start-align the value and label." },
    { name: "-text-align-center", description: "Centre the value and label." },
    { name: "-text-align-end", description: "End-align the value and label." },
  ],
  parts: [
    { name: ".value", description: "The large metric number." },
    { name: ".label", description: "The caption beneath the value." },
  ],
  examples: [
    `<div class="instui-metric">
  <span class="value">1,284</span>
  <span class="label">Active users</span>
</div>`,
  ],
  structure: `.instui-metric
  .value
  .label`,
  css: (p) => {
    const root = `.${p}metric`;
    return `
${root} {
  display: inline-flex;
  flex-direction: column;
  gap: var(--instui-component-metric-gap-texts);
  padding: 0 var(--instui-component-metric-padding-horizontal);
}
${scope(
  root,
  `
.${p}metric .value {
  color: var(--instui-component-metric-value-color);
  font-family: var(--instui-component-metric-value-font-family);
  font-size: var(--instui-component-metric-value-font-size);
  font-weight: var(--instui-component-metric-value-font-weight);
  line-height: var(--instui-component-metric-value-line-height);
}
.${p}metric .label {
  color: var(--instui-component-metric-label-color);
  font-family: var(--instui-component-metric-label-font-family);
  font-size: var(--instui-component-metric-label-font-size);
  font-weight: var(--instui-component-metric-label-font-weight);
  line-height: var(--instui-component-metric-label-line-height);
}
`,
  ["value", "label"],
)}
/* textAlign: the value/label are flex items in a column, so cross-axis alignment (align-items) is what
   actually positions them — text-align alone is a no-op on the shrink-wrapped box. Set both so it also
   covers wrapped multi-line text. */
${root}.-text-align-start { align-items: flex-start; text-align: start; }
${root}.-text-align-center { align-items: center; text-align: center; }
${root}.-text-align-end { align-items: flex-end; text-align: end; }`;
  },
});

export const metricCss = metric.css;
