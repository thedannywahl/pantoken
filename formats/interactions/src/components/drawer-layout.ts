// fallow-ignore-file unused-file
/* c8 ignore file */ // side-effect module, tested via behavior functions and IIFE bundles
// Per-component interaction entry point for drawer-layout

import { initResponsiveOverlay } from "../behaviors/responsive-overlay.js";
import { applySpacing, makeOnCommand } from "../shared/index.js";

// Initialize on page load
function initdrawerLayout() {
  const invokerSupported = "command" in (HTMLButtonElement.prototype as object);
  const onCommand = makeOnCommand(invokerSupported);
  for (const el of document.querySelectorAll(".instui-drawer-layout")) {
    const host = el as HTMLElement;
    applySpacing(host);
    initResponsiveOverlay(host, onCommand);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initdrawerLayout);
} else {
  initdrawerLayout();
}
