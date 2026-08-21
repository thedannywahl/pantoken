import { defineComponent, type Definition } from "../../../../lib/define.ts";
import { SENTINEL } from "../../../../lib/sentinel.ts";
import { modalFooter as modalFooterRaw } from "../../../../generated/component-styles.ts";

/** The `modal.footer` member record: the actions row (InstUI `Modal.Footer`). */
export const modalFooter: Definition = defineComponent({
  name: "modal.footer",
  css: (p) => modalFooterRaw.replaceAll(SENTINEL, p),
});
/** Standalone `modal.footer` stylesheet. */
export const modalFooterCss: Definition["css"] = modalFooter.css;
