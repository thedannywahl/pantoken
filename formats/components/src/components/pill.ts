import { defineComponent } from "../lib/define.ts";
import { SENTINEL } from "../lib/sentinel.ts";
import { pill as pillRaw } from "../generated/component-styles.ts";

/** The `pill` component record: a compact status label that takes a leading glyph via the `-icon-<name>` form. */
export const pill = defineComponent({ name: "pill", css: (p) => pillRaw.replaceAll(SENTINEL, p) });
/** Standalone `pill` stylesheet — the prefixed CSS for the status pill, ready to ship as a `.css` file. */
export const pillCss = pill.css;
