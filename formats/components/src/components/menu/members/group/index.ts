import { defineComponent, type Definition } from "../../../../lib/define.ts";
import { SENTINEL } from "../../../../lib/sentinel.ts";
import { menuGroup as menuGroupRaw } from "../../../../generated/component-styles.ts";

/** The `menu.group` member record: a labelled group heading (InstUI `Menu.Group`). */
export const menuGroup: Definition = defineComponent({
  name: "menu.group",
  css: (p) => menuGroupRaw.replaceAll(SENTINEL, p),
});
/** Standalone `menu.group` stylesheet. */
export const menuGroupCss: Definition["css"] = menuGroup.css;
