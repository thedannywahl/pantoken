import { treeBrowserCss } from "@pantoken/components";
import { initTreeBrowser, type TreeBrowserHandle } from "@pantoken/interactions";
import type { ElementDefinition } from "../lib/context.ts";

/**
 * `<instui-tree-browser>` — an ARIA tree with shared keyboard navigation and expansion.
 * Name the host and slot `treeitem`/`group` markup. Load the component stylesheet for slotted items.
 *
 * @example
 * ```html
 * <instui-tree-browser aria-label="Files">
 *   <a class="item" role="treeitem" tabindex="0" href="/syllabus">Syllabus.pdf</a>
 * </instui-tree-browser>
 * ```
 */
export const treeBrowser: ElementDefinition = {
  name: "tree-browser",
  define: (ctx) => {
    if (ctx.registry.get("instui-tree-browser")) return;
    const css = treeBrowserCss(ctx.I);
    ctx.registry.define(
      "instui-tree-browser",
      class extends HTMLElement {
        #handle: TreeBrowserHandle | undefined;
        #slot: HTMLSlotElement;

        constructor() {
          super();
          const root = this.attachShadow({ mode: "open" });
          root.innerHTML = `<style>:host{display:block}${css}</style><div class="instui-tree-browser" part="tree-browser"><slot></slot></div>`;
          this.#slot = root.querySelector("slot")!;
        }

        #initialize = (): void => {
          this.#handle?.cleanup();
          this.#handle = initTreeBrowser(this);
        };

        connectedCallback(): void {
          this.classList.add("instui-tree-browser");
          this.setAttribute("role", "tree");
          this.#initialize();
          this.#slot.addEventListener("slotchange", this.#initialize);
        }

        disconnectedCallback(): void {
          this.#slot.removeEventListener("slotchange", this.#initialize);
          this.#handle?.cleanup();
          this.#handle = undefined;
        }
      },
    );
  },
};
