// Per-component interaction entry point for calendar
// Applies spacing attributes to calendar elements

import { applySpacing } from "../shared/index.js";
import { syncInvoker } from "../shared/index.js";

// Initialize on page load
function initcalendar() {
  for (const el of document.querySelectorAll(".instui-calendar")) {
    applySpacing(el as HTMLElement);
    syncInvoker(el as HTMLElement);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initcalendar);
} else {
  initcalendar();
}
