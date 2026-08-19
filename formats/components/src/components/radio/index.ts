import { defineComponent, type Definition } from "../../lib/define.ts";
import { SENTINEL } from "../../lib/sentinel.ts";
import { radio as radioRaw } from "../../generated/component-styles.ts";

/** The `radio` component record: a native radio button with its label. */
export const radio: Definition = defineComponent({
  name: "radio",
  css: (p) => radioRaw.replaceAll(SENTINEL, p),
});
/** Standalone `radio` stylesheet — the prefixed CSS for the radio button, ready to ship as a `.css` file. */
export const radioCss: Definition["css"] = radio.css;
