// fallow-ignore-file unused-file
/* c8 ignore file */ // side-effect module, tested via behavior functions and IIFE bundles
import { initMenu } from "../behaviors/menu.js";
import { applySpacing } from "../shared/index.js";

function initMenus(): void {
  for (const menu of document.querySelectorAll<HTMLElement>(".instui-menu[data-menu-navigation]")) {
    if (menu.localName.includes("-")) continue;
    const triggers = [
      ...document.querySelectorAll<HTMLButtonElement>("button[popovertarget]"),
    ].filter((button) => button.popoverTargetElement === menu);
    if (triggers.length !== 1)
      throw new Error("Menu navigation requires exactly one native popover button");
    applySpacing(menu);
    initMenu(menu, triggers[0]);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initMenus);
} else {
  initMenus();
}
