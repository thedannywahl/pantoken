// fallow-ignore-file unused-file
/* c8 ignore file */ // side-effect module, tested via behavior functions and IIFE bundles
import { initCloseButton } from "../behaviors/close-button.js";

function initCloseButtonComponents(): void {
  for (const btn of document.querySelectorAll<HTMLElement>(".instui-close-button")) {
    initCloseButton(btn);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initCloseButtonComponents);
} else {
  initCloseButtonComponents();
}
