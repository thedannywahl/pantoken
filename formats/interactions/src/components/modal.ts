// Per-component interaction entry point for modal
// Applies spacing attributes to modal elements

import { applySpacing } from "../shared/index.js";

// Initialize on page load
function initmodal() {
  for (const el of document.querySelectorAll(".instui-modal")) {
    applySpacing(el as HTMLElement);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initmodal);
} else {
  initmodal();
}
