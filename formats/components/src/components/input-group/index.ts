import { defineComponent, type Definition } from "../../lib/define.ts";
import { SENTINEL } from "../../lib/sentinel.ts";
import { inputGroup as inputGroupRaw } from "../../generated/component-styles.ts";

/** The `inputGroup` component record: a facade around a text input with leading and trailing icon slots. */
export const inputGroup: Definition = defineComponent({
  name: "input-group",
  css: (p) => inputGroupRaw.replaceAll(SENTINEL, p),
});

/** Standalone `inputGroup` stylesheet — the prefixed CSS for the input group, ready to ship as a `.css` file. */
export const inputGroupCss: Definition["css"] = inputGroup.css;
