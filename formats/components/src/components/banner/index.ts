import { defineComponent, type Definition } from "../../lib/define.ts";
import { SENTINEL } from "../../lib/sentinel.ts";
import { banner as bannerRaw } from "../../generated/component-styles.ts";

/** The `banner` component record: a styled container for important information with size and theme variants. */
export const banner: Definition = defineComponent({
  name: "banner",
  css: (p) => bannerRaw.replaceAll(SENTINEL, p),
});
/** Standalone `banner` stylesheet — the prefixed CSS for the banner container, ready to ship as a `.css` file. */
export const bannerCss: Definition["css"] = banner.css;
