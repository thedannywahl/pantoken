// fallow-ignore-file unused-file
/* c8 ignore file */ // side-effect module, tested via behavior functions and IIFE bundles
// Hand-authored interaction entry point for truncate

import { applySpacing } from "../shared/index.js";
import { initTruncateAuto } from "../behaviors/truncate.js";

function wantsAutoLines(el: HTMLElement): boolean {
  const lines = (el.getAttribute("lines") ?? "").trim().toLowerCase();
  return lines === "auto" || el.classList.contains("-max-lines-auto");
}

// Initialize on page load
function inittruncate() {
  for (const el of document.querySelectorAll(".instui-truncate")) {
    const host = el as HTMLElement;
    applySpacing(host);
    if (wantsAutoLines(host)) initTruncateAuto(host, host);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", inittruncate);
} else {
  inittruncate();
}
