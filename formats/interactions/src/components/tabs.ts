// fallow-ignore-file unused-file
/* c8 ignore file */ // side-effect module, tested via behavior functions and IIFE bundles
// Per-component interaction entry point for tabs

import { applySpacing } from "../shared/index.js";
import { initTabs } from "../behaviors/tabs.js";

function initTabsComponents(): void {
  for (const el of document.querySelectorAll<HTMLElement>(".instui-tabs")) {
    applySpacing(el);
    initTabs(el);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initTabsComponents);
} else {
  initTabsComponents();
}
