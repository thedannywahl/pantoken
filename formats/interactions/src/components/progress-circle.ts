// fallow-ignore-file unused-file
/* c8 ignore file */ // side-effect module, tested via behavior functions and IIFE bundles
// Per-component interaction entry point for progress-circle

import { applySpacing } from "../shared/index.js";
import { initProgressCircle } from "../behaviors/progress-circle.js";

// Initialize on page load
function initProgressCircles() {
  for (const el of document.querySelectorAll<HTMLElement>(".instui-progress-circle")) {
    applySpacing(el);
    initProgressCircle(el);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initProgressCircles);
} else {
  initProgressCircles();
}
