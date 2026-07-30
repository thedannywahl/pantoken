import { defineUtility, type Definition } from "../lib/define.ts";
import { SENTINEL } from "../lib/sentinel.ts";
import { icon as iconRaw } from "../generated/component-styles.ts";

/** The icon utility — `.instui-icon` sizing plus the shared `-icon-<name>` painter that masks a glyph, with the prefix sentinel replaced. */
export const icon: Definition = defineUtility({
  name: "icon",
  css: (p) => iconRaw.replaceAll(SENTINEL, p),
});
/** The icon utility as a standalone, header-wrapped stylesheet. */
export const iconCss: Definition["css"] = icon.css;
