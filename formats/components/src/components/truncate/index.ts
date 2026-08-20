import { defineComponent, type Definition } from "../../lib/define.ts";
import { SENTINEL } from "../../lib/sentinel.ts";
import { truncate as truncateRaw } from "../../generated/component-styles.ts";

/** The `truncate` component record: ellipsis truncation with line clamping controlled by `--lines`. */
export const truncate: Definition = defineComponent({
  name: "truncate",
  css: (p) => truncateRaw.replaceAll(SENTINEL, p),
});
/** Standalone `truncate` stylesheet — the prefixed CSS for the truncation utility, ready to ship as a `.css` file. */
export const truncateCss: Definition["css"] = truncate.css;
