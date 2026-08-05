// fallow-ignore-file unused-file
// Per-component interaction entry point for avatar

import { applySpacing } from "../shared/index.js";

// Initialize on page load
function initavatar() {
  for (const el of document.querySelectorAll(".instui-avatar")) {
    applySpacing(el as HTMLElement);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initavatar);
} else {
  initavatar();
}
