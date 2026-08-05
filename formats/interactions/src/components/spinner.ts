// Per-component interaction entry point for spinner
// Applies spacing attributes to spinner elements

import { applySpacing } from "../shared/index.js";

// Initialize on page load
function initspinner() {
  for (const el of document.querySelectorAll(".instui-spinner")) {
    applySpacing(el as HTMLElement);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initspinner);
} else {
  initspinner();
}
