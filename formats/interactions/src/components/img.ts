// Per-component interaction entry point for img
// Applies spacing attributes to img elements

import { applySpacing } from "../shared/index.js";

// Initialize on page load
function initimg() {
  for (const el of document.querySelectorAll(".instui-img")) {
    applySpacing(el as HTMLElement);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initimg);
} else {
  initimg();
}
