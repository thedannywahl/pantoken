// Per-component interaction entry point for badge
// Applies spacing attributes to badge elements

import { applySpacing } from "../shared/index.js";

// Initialize on page load
function initbadge() {
  for (const el of document.querySelectorAll(".instui-badge")) {
    applySpacing(el as HTMLElement);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initbadge);
} else {
  initbadge();
}
