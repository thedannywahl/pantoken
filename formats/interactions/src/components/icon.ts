// Per-component interaction entry point for icon
// Applies spacing attributes to icon elements

import { applySpacing } from "../shared/index.js";

// Initialize on page load
function initIcon() {
  for (const el of document.querySelectorAll(".instui-icon")) {
    applySpacing(el as HTMLElement);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initIcon);
} else {
  initIcon();
}
