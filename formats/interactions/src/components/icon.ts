// fallow-ignore-file unused-file
// Per-component interaction entry point for icon

import { applySpacing } from "../shared/index.js";

// Initialize on page load
function initicon() {
  for (const el of document.querySelectorAll(".instui-icon")) {
    applySpacing(el as HTMLElement);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initicon);
} else {
  initicon();
}
