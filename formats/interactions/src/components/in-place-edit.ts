// Per-component interaction entry point for in-place-edit
// Applies spacing attributes to in-place-edit elements

import { applySpacing } from "../shared/index.js";

// Initialize on page load
function initinPlaceEdit() {
  for (const el of document.querySelectorAll(".instui-in-place-edit")) {
    applySpacing(el as HTMLElement);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initinPlaceEdit);
} else {
  initinPlaceEdit();
}
