import { defineComponent, type Definition } from "../../../../lib/define.ts";
import { SENTINEL } from "../../../../lib/sentinel.ts";
import { menuSeparator as menuSeparatorRaw } from "../../../../generated/component-styles.ts";

/** The `menu.separator` member record: a divider rule between items (InstUI `Menu.Separator`). */
export const menuSeparator: Definition = defineComponent({
  name: "menu.separator",
  css: (p) => menuSeparatorRaw.replaceAll(SENTINEL, p),
});
/** Standalone `menu.separator` stylesheet. */
export const menuSeparatorCss: Definition["css"] = menuSeparator.css;
