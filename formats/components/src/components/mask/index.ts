import { defineComponent, type Definition } from "../../lib/define.ts";
import { SENTINEL } from "../../lib/sentinel.ts";
import { mask as maskRaw } from "../../generated/component-styles.ts";

/** The mask component — an in-flow overlay that fills its positioned parent and centres its content, with the prefix sentinel replaced. */
export const mask: Definition = defineComponent({
  name: "mask",
  css: (p) => maskRaw.replaceAll(SENTINEL, p),
});
/** The mask component as a standalone, header-wrapped stylesheet. */
export const maskCss: Definition["css"] = mask.css;
