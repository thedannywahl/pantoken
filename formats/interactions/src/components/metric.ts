// fallow-ignore-file unused-file
// Per-component interaction entry point for metric

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
