// fallow-ignore-file unused-file
/* c8 ignore file */ // side-effect module, tested via behavior functions and IIFE bundles
import { initCloseButton } from "../behaviors/close-button.js";
import { PREFIX, sel } from "../shared/prefix.js";

function initCloseButtonComponents(): void {
  for (const btn of document.querySelectorAll<HTMLElement>(sel(".pfx-close-button"))) {
    initCloseButton(btn, { prefix: PREFIX });
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initCloseButtonComponents);
} else {
  initCloseButtonComponents();
}
