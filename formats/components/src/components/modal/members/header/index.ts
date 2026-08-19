import { defineComponent, type Definition } from "../../../../lib/define.ts";
import { SENTINEL } from "../../../../lib/sentinel.ts";
import { modalHeader as modalHeaderRaw } from "../../../../generated/component-styles.ts";

/** The `modal.header` member record: the title row (InstUI `Modal.Header`). */
export const modalHeader: Definition = defineComponent({
  name: "modal.header",
  css: (p) => modalHeaderRaw.replaceAll(SENTINEL, p),
});
/** Standalone `modal.header` stylesheet. */
export const modalHeaderCss: Definition["css"] = modalHeader.css;
