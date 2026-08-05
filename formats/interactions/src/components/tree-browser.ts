// Per-component interaction entry point for tree-browser
// Applies spacing attributes to tree-browser elements

import { applySpacing } from "../shared/index.js";

// Initialize on page load
function inittreeBrowser() {
  for (const el of document.querySelectorAll(".instui-tree-browser")) {
    applySpacing(el as HTMLElement);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", inittreeBrowser);
} else {
  inittreeBrowser();
}
