// Per-component interaction entry point for progress
// Applies spacing attributes to progress elements

import { applySpacing } from "../shared/index.js";

// Initialize on page load
function initprogress() {
  for (const el of document.querySelectorAll(".instui-progress")) {
    applySpacing(el as HTMLElement);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initprogress);
} else {
  initprogress();
}
