// fallow-ignore-file unused-file
/* c8 ignore file */ // side-effect module, tested via behavior functions and IIFE bundles
import { initTooltip } from "../behaviors/tooltip.js";

function initTooltipComponents(): void {
  for (const wrapper of document.querySelectorAll<HTMLElement>(".instui-tooltip")) {
    const tip = wrapper.querySelector<HTMLElement>(".tip");
    if (tip) {
      const showDelay = Number(wrapper.getAttribute("data-show-delay")) || 0;
      const hideDelay = Number(wrapper.getAttribute("data-hide-delay")) || 0;
      initTooltip(wrapper, tip, { showDelay, hideDelay });
    }
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initTooltipComponents);
} else {
  initTooltipComponents();
}
