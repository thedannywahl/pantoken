import { defineComponent, type Definition } from "../lib/define.ts";
import { progressTransitionRules } from "@pantoken/plugin-transition/progress";
import { SENTINEL } from "../lib/sentinel.ts";
import { progress as progressRaw } from "../generated/component-styles.ts";

/** The `progress` component record: a determinate progress bar with a coloured meter, sizes, and an optional value label. */
export const progress: Definition = defineComponent({
  name: "progress",
  css: (p) =>
    `${progressRaw.replaceAll(SENTINEL, p)}\n${progressTransitionRules(p.replace(/-$/u, ""))}`,
});
/** Standalone `progress` stylesheet — the prefixed CSS for the progress bar, ready to ship as a `.css` file. */
export const progressCss: Definition["css"] = progress.css;
