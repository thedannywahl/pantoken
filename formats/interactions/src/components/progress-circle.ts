// fallow-ignore-file unused-file
// Per-component interaction entry point for progress-circle

import { applySpacing } from "../shared/index.js";

// Initialize on page load
function initprogressCircle() {
  for (const el of document.querySelectorAll(".instui-progress-circle")) {
    applySpacing(el as HTMLElement);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initprogressCircle);
} else {
  initprogressCircle();
}
