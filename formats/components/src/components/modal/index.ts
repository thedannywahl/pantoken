import { defineComponent, type Definition } from "../../lib/define.ts";
import { SENTINEL } from "../../lib/sentinel.ts";
import { modal as modalRaw } from "../../generated/component-styles.ts";

/** The `modal` component record: a dialog surface with header, body, and footer parts, working on a native `<dialog>`. */
export const modal: Definition = defineComponent({
  name: "modal",
  css: (p) => modalRaw.replaceAll(SENTINEL, p),
});
/** Standalone `modal` stylesheet — the prefixed CSS for the dialog surface, ready to ship as a `.css` file. */
export const modalCss: Definition["css"] = modal.css;
