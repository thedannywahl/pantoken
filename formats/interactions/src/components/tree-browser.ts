// fallow-ignore-file unused-file
/* c8 ignore file */ // side-effect module, tested via behavior functions and IIFE bundles
import { initTreeBrowser } from "../behaviors/tree-browser.js";
import { applySpacing } from "../shared/index.js";

function initTreeBrowsers(): void {
  for (const tree of document.querySelectorAll<HTMLElement>('.instui-tree-browser[role="tree"]')) {
    if (tree.localName.includes("-")) continue;
    applySpacing(tree);
    initTreeBrowser(tree);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initTreeBrowsers);
} else {
  initTreeBrowsers();
}
