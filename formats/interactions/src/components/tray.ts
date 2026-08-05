// fallow-ignore-file unused-file
// Per-component interaction entry point for tray

import { applySpacing } from "../shared/index.js";

// Initialize on page load
function inittray() {
  for (const el of document.querySelectorAll(".instui-tray")) {
    applySpacing(el as HTMLElement);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", inittray);
} else {
  inittray();
}
