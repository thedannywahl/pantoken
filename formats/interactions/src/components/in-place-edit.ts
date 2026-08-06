// fallow-ignore-file unused-file
/* c8 ignore file */ // side-effect module, tested via behavior functions and IIFE bundles
import { initInPlaceEdit } from "../behaviors/in-place-edit.js";

function initInPlaceEditComponents(): void {
  for (const el of document.querySelectorAll<HTMLElement>(".instui-in-place-edit")) {
    // For CSS usage the element IS contenteditable; it's also the dispatch target
    initInPlaceEdit(el, el);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initInPlaceEditComponents);
} else {
  initInPlaceEditComponents();
}
