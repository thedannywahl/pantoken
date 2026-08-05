// Per-component interaction entry point for side-nav-bar
// Applies spacing attributes to side-nav-bar elements

import { applySpacing } from "../shared/index.js";

// Initialize on page load
function initsideNavBar() {
  for (const el of document.querySelectorAll(".instui-side-nav-bar")) {
    applySpacing(el as HTMLElement);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initsideNavBar);
} else {
  initsideNavBar();
}
