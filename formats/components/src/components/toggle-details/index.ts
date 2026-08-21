import { defineComponent, type Definition } from "../../lib/define.ts";
import { SENTINEL } from "../../lib/sentinel.ts";
import { toggleDetails as toggleDetailsRaw } from "../../generated/component-styles.ts";

/** The `toggleDetails` component record: a styled native `<details>` disclosure with a rotating chevron. */
export const toggleDetails: Definition = defineComponent({
  name: "toggle-details",
  css: (p) => toggleDetailsRaw.replaceAll(SENTINEL, p),
});
/** Standalone `toggleDetails` stylesheet — the prefixed CSS for the details disclosure, ready to ship as a `.css` file. */
export const toggleDetailsCss: Definition["css"] = toggleDetails.css;
