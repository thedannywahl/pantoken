// Per-component interaction entry point for date-time-input
// Applies spacing attributes to date-time-input elements

import { applySpacing } from "../shared/index.js";
import { syncInvoker } from "../shared/index.js";

// Initialize on page load
function initdateTimeInput() {
  for (const el of document.querySelectorAll(".instui-date-time-input")) {
    applySpacing(el as HTMLElement);
    syncInvoker(el as HTMLElement);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initdateTimeInput);
} else {
  initdateTimeInput();
}
