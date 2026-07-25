import { defineComponent } from "../lib/define.ts";
import { SENTINEL } from "../lib/sentinel.ts";
import { progress as progressRaw } from "../generated/component-styles.ts";

/** The `progress` component record: a determinate progress bar with a coloured meter, sizes, and an optional value label. */
export const progress = defineComponent({
  name: "progress",
  css: (p) => progressRaw.replaceAll(SENTINEL, p),
});
/** Standalone `progress` stylesheet — the prefixed CSS for the progress bar, ready to ship as a `.css` file. */
export const progressCss = progress.css;
