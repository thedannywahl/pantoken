// Per-component interaction entry point for rating
// Applies spacing attributes to rating elements

import { applySpacing } from "../shared/index.js";

// Initialize on page load
function initrating() {
  for (const el of document.querySelectorAll(".instui-rating")) {
    applySpacing(el as HTMLElement);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initrating);
} else {
  initrating();
}
