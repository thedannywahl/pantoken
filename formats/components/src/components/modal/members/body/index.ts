import { defineComponent, type Definition } from "../../../../lib/define.ts";
import { SENTINEL } from "../../../../lib/sentinel.ts";
import { modalBody as modalBodyRaw } from "../../../../generated/component-styles.ts";

/** The `modal.body` member record: the content region (InstUI `Modal.Body`). */
export const modalBody: Definition = defineComponent({
  name: "modal.body",
  css: (p) => modalBodyRaw.replaceAll(SENTINEL, p),
});
/** Standalone `modal.body` stylesheet. */
export const modalBodyCss: Definition["css"] = modalBody.css;
