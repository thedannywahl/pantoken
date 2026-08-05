// Per-component interaction entry point for pages
// Applies spacing attributes to pages elements

import { applySpacing } from "../shared/index.js";
import { syncInvoker } from "../shared/index.js";

// Initialize on page load
function initpages() {
  for (const el of document.querySelectorAll(".instui-pages")) {
    applySpacing(el as HTMLElement);
    syncInvoker(el as HTMLElement);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initpages);
} else {
  initpages();
}
