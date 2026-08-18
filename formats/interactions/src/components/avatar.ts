// fallow-ignore-file unused-file
/* c8 ignore file */ // side-effect module, tested via behavior functions and IIFE bundles
// Per-component interaction entry point for avatar (hand-authored — see BEHAVIORAL_COMPONENTS)

import { applySpacing } from "../shared/index.js";
import { initInitials } from "../behaviors/initials.js";

// Initialize on page load
function initavatar() {
  for (const el of document.querySelectorAll<HTMLElement>(".instui-avatar")) {
    applySpacing(el);
    initInitials(el);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initavatar);
} else {
  initavatar();
}
