// Per-component interaction entry point for tooltip
// Applies spacing attributes to tooltip elements

import { applySpacing } from "../shared/index.js";

// Initialize on page load
function inittooltip() {
  for (const el of document.querySelectorAll(".instui-tooltip")) {
    applySpacing(el as HTMLElement);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", inittooltip);
} else {
  inittooltip();
}
