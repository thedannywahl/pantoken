// Per-component interaction entry point for truncate
// Applies spacing attributes to truncate elements

import { applySpacing } from "../shared/index.js";

// Initialize on page load
function inittruncate() {
  for (const el of document.querySelectorAll(".instui-truncate")) {
    applySpacing(el as HTMLElement);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", inittruncate);
} else {
  inittruncate();
}
