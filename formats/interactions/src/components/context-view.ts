// fallow-ignore-file unused-file
/* c8 ignore file */ // side-effect module, tested via behavior functions and IIFE bundles
// Per-component interaction entry point for context-view

import { applySpacing } from "../shared/index.js";

// Initialize on page load
function initcontextView() {
  for (const el of document.querySelectorAll(".instui-context-view")) {
    applySpacing(el as HTMLElement);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initcontextView);
} else {
  initcontextView();
}
