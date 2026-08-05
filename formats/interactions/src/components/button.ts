// Per-component interaction entry point for button
// Applies spacing attributes to button elements

import { applySpacing } from "../shared/index.js";
import { syncInvoker } from "../shared/index.js";

// Initialize on page load
function initbutton() {
  for (const el of document.querySelectorAll(".instui-button")) {
    applySpacing(el as HTMLElement);
    syncInvoker(el as HTMLElement);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initbutton);
} else {
  initbutton();
}
