// Per-component interaction entry point for drilldown
// Applies spacing attributes to drilldown elements

import { applySpacing } from "../shared/index.js";
import { syncInvoker } from "../shared/index.js";

// Initialize on page load
function initdrilldown() {
  for (const el of document.querySelectorAll(".instui-drilldown")) {
    applySpacing(el as HTMLElement);
    syncInvoker(el as HTMLElement);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initdrilldown);
} else {
  initdrilldown();
}
