import { defineComponent } from "../lib/define.ts";
import { SENTINEL } from "../lib/sentinel.ts";
import { sideNavBar as sideNavBarRaw } from "../generated/component-styles.ts";

export const sideNavBar = defineComponent({
  name: "side-nav-bar",
  css: (p) => sideNavBarRaw.replaceAll(SENTINEL, p),
});
export const sideNavBarCss = sideNavBar.css;
