import { defineComponent } from "../lib/define.ts";
import { SENTINEL } from "../lib/sentinel.ts";
import { truncate as truncateRaw } from "../generated/component-styles.ts";

/** The `truncate` component record: single-line ellipsis truncation, or a multi-line clamp via `--lines`. */
export const truncate = defineComponent({
  name: "truncate",
  css: (p) => truncateRaw.replaceAll(SENTINEL, p),
});
/** Standalone `truncate` stylesheet — the prefixed CSS for the truncation utility, ready to ship as a `.css` file. */
export const truncateCss = truncate.css;
