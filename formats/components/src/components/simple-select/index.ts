import { defineComponent, type Definition } from "../../lib/define.ts";
import { SENTINEL } from "../../lib/sentinel.ts";
import { simpleSelect as simpleSelectRaw } from "../../generated/component-styles.ts";

/** The `simpleSelect` component record: a styled native `<select>` with a caret, matching the text-input states and sizes. */
export const simpleSelect: Definition = defineComponent({
  name: "simple-select",
  css: (p) => simpleSelectRaw.replaceAll(SENTINEL, p),
});

/** Standalone `simpleSelect` stylesheet — the prefixed CSS for the native select, ready to ship as a `.css` file. */
export const simpleSelectCss: Definition["css"] = simpleSelect.css;
