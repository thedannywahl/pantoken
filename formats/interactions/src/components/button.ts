// Per-component interaction entry point for button
// Applies spacing attributes to button elements

import { applySpacing } from "../shared/index.js";

// Initialize on page load
function initButton() {
  for (const el of document.querySelectorAll(".instui-button")) {
    applySpacing(el as HTMLElement);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initButton);
} else {
  initButton();
}
