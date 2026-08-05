// fallow-ignore-file unused-file
// Per-component interaction entry point for alert

import { applySpacing } from "../shared/index.js";

// Initialize on page load
function initalert() {
  for (const el of document.querySelectorAll(".instui-alert")) {
    applySpacing(el as HTMLElement);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initalert);
} else {
  initalert();
}
