// fallow-ignore-file unused-file
/* c8 ignore file */ // side-effect module, tested via behavior functions and IIFE bundles
import { initInPlaceEdit } from "../behaviors/in-place-edit.js";
import type { InPlaceEditInputType } from "../behaviors/in-place-edit.js";

const INPUT_TYPES = new Set<InPlaceEditInputType>([
  "text",
  "number",
  "email",
  "url",
  "tel",
  "search",
]);

function initInPlaceEditComponents(): void {
  for (const el of document.querySelectorAll<HTMLElement>(".instui-in-place-edit")) {
    const inputType = el.dataset.inputType as InPlaceEditInputType | undefined;
    // For CSS usage the element IS contenteditable; it's also the dispatch target
    initInPlaceEdit(el, el, {
      inputType: inputType && INPUT_TYPES.has(inputType) ? inputType : undefined,
    });
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initInPlaceEditComponents);
} else {
  initInPlaceEditComponents();
}
