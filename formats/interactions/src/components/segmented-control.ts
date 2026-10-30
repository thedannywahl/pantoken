/* c8 ignore file */
import { initSegmentedControl } from "../behaviors/segmented-control.js";
import { sel } from "../shared/prefix.js";

function initSegmentedControls(): void {
  for (const host of document.querySelectorAll<HTMLElement>(sel(".pfx-segmented-control"))) {
    initSegmentedControl(host);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initSegmentedControls);
} else {
  initSegmentedControls();
}
