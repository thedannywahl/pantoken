// Per-component interaction entry point for popover
// Applies spacing attributes to popover elements

import { applySpacing } from "../shared/index.js";

// Initialize on page load
function initpopover() {
  for (const el of document.querySelectorAll(".instui-popover")) {
    applySpacing(el as HTMLElement);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initpopover);
} else {
  initpopover();
}
