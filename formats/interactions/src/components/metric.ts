// Per-component interaction entry point for metric
// Applies spacing attributes to metric elements

import { applySpacing } from "../shared/index.js";

// Initialize on page load
function initmetric() {
  for (const el of document.querySelectorAll(".instui-metric")) {
    applySpacing(el as HTMLElement);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initmetric);
} else {
  initmetric();
}
