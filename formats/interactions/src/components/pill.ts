// Per-component interaction entry point for pill
// Applies spacing attributes to pill elements

import { applySpacing } from "../shared/index.js";

// Initialize on page load
function initpill() {
  for (const el of document.querySelectorAll(".instui-pill")) {
    applySpacing(el as HTMLElement);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initpill);
} else {
  initpill();
}
