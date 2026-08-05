// Per-component interaction entry point for tag
// Applies spacing attributes to tag elements

import { applySpacing } from "../shared/index.js";

// Initialize on page load
function inittag() {
  for (const el of document.querySelectorAll(".instui-tag")) {
    applySpacing(el as HTMLElement);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", inittag);
} else {
  inittag();
}
