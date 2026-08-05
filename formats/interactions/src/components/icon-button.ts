// fallow-ignore-file unused-file
// Per-component interaction entry point for icon-button

import { applySpacing } from "../shared/index.js";
import { syncInvoker } from "../shared/index.js";

// Initialize on page load
function initiconButton() {
  for (const el of document.querySelectorAll(".instui-icon-button")) {
    applySpacing(el as HTMLElement);
    syncInvoker(el as HTMLElement);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initiconButton);
} else {
  initiconButton();
}
