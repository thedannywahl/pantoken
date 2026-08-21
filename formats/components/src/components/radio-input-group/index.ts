import { defineComponent, type Definition } from "../../lib/define.ts";
import { SENTINEL } from "../../lib/sentinel.ts";
import { radioInputGroup as radioInputGroupRaw } from "../../generated/component-styles.ts";

/** The `radioInputGroup` component record: a single-select radio `<fieldset>`, plain or as a connected segmented toggle. */
export const radioInputGroup: Definition = defineComponent({
  name: "radio-input-group",
  css: (p) => radioInputGroupRaw.replaceAll(SENTINEL, p),
});
/** Standalone `radioInputGroup` stylesheet — the prefixed CSS for the radio group, ready to ship as a `.css` file. */
export const radioInputGroupCss: Definition["css"] = radioInputGroup.css;
