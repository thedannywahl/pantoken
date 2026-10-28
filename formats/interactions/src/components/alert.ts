// fallow-ignore-file unused-file
/* c8 ignore file */ // side-effect module, tested via behavior functions and IIFE bundles
// Per-component interaction entry point for alert

import { applySpacing } from "../shared/index.js";
import { initRemove } from "../behaviors/remove.js";
import { PREFIX, sel } from "../shared/prefix.js";

// Initialize on page load
function initAlert() {
  for (const el of document.querySelectorAll<HTMLElement>(sel(".pfx-alert"))) {
    applySpacing(el);
    initRemove(el, {
      prefix: PREFIX,
      transition: el.classList.contains(sel("pfx-transition")) ? "fade" : "none",
    });
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAlert);
} else {
  initAlert();
}
