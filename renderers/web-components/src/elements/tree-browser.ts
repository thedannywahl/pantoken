import { treeBrowserCss } from "@pantoken/components";
import type { ElementDefinition } from "../lib/context.ts";

/**
 * `<instui-tree-browser>` — the styled shell of a collapsible tree, with `role="tree"`. The consumer
 * slots the tree markup.
 *
 * @example
 * ```html
 * <instui-tree-browser>
 *   <ul role="group">…</ul>
 * </instui-tree-browser>
 * ```
 */
export const treeBrowser: ElementDefinition = {
  name: "tree-browser",
  define: (ctx) =>
    // TreeBrowser is a container: the consumer slots the tree, the element supplies the styled shell.
    ctx.wrapper(
      "instui-tree-browser",
      treeBrowserCss(ctx.I),
      () => `<div class="instui-tree-browser" role="tree" part="tree-browser"><slot></slot></div>`,
      "block",
    ),
};
