import { defineComponent, type Definition } from "../../lib/define.ts";
import { PROGRESS_NUMERIC_PROPERTIES } from "../../lib/helpers.ts";
import { SENTINEL } from "../../lib/sentinel.ts";
import { progress as progressRaw } from "../../generated/component-styles.ts";

/** The `progress` component record: a determinate progress bar with a coloured meter, sizes, and an optional value label. */
export const progress: Definition = defineComponent({
  name: "progress",
  css: (p) => `${PROGRESS_NUMERIC_PROPERTIES}\n${progressRaw.replaceAll(SENTINEL, p)}`,
});
/** Standalone `progress` stylesheet — the prefixed CSS for the progress bar, ready to ship as a `.css` file. */
export const progressCss: Definition["css"] = progress.css;
