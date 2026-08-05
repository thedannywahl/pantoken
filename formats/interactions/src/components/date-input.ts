// Per-component interaction entry point for date-input
// Applies spacing attributes to date-input elements

import { applySpacing } from "../shared/index.js";
import { syncInvoker } from "../shared/index.js";

// Initialize on page load
function initdateInput() {
  for (const el of document.querySelectorAll(".instui-date-input")) {
    applySpacing(el as HTMLElement);
    syncInvoker(el as HTMLElement);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initdateInput);
} else {
  initdateInput();
}
