import { globalNavBarCss } from "@pantoken/components";
import type { ElementDefinition } from "../lib/context.ts";

/**
 * `<instui-global-nav-bar>` — a vertical navigation rail with icon-over-label items. The `minimized`
 * attribute (boolean) collapses it to icons only. Slotted content should be `<instui-global-nav-bar-item>`
 * elements or semantic `<a>` tags with the `.instui-global-nav-bar-item` class.
 *
 * @example
 * ```html
 * <instui-global-nav-bar aria-label="Primary">
 *   <instui-global-nav-bar-item href="#" selected>
 *     <span slot="icon">🏠</span>
 *     Home
 *   </instui-global-nav-bar-item>
 *   <instui-global-nav-bar-item href="#">
 *     <span slot="icon">📬</span>
 *     Inbox
 *   </instui-global-nav-bar-item>
 * </instui-global-nav-bar>
 * ```
 */
export const globalNavBar: ElementDefinition = {
  name: "global-nav-bar",
  define: (ctx) =>
    ctx.wrapper(
      "instui-global-nav-bar",
      globalNavBarCss(ctx.I),
      (host) => {
        const minimized = host.hasAttribute("minimized") ? " -minimized" : "";
        const cls = `instui-global-nav-bar${minimized}`;
        return (
          `<nav class="${cls}" part="global-nav-bar" aria-label="Primary">` +
          `<slot></slot>` +
          `</nav>`
        );
      },
      { display: "block" },
    ),
};
