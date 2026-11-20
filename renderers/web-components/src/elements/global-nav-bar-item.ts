import { globalNavBarItemCss } from "@pantoken/components";
import type { ElementDefinition } from "../lib/context.ts";

/**
 * `<instui-global-nav-bar-item>` — a navigation item within `<instui-global-nav-bar>`. The `href`
 * attribute makes it a link. The `selected` attribute applies the `-selected` modifier for styling
 * the current page. Slotted content is the label; use `slot="icon"` for the icon.
 *
 * @example
 * ```html
 * <instui-global-nav-bar-item href="#home" selected>
 *   <span slot="icon">🏠</span>
 *   Home
 * </instui-global-nav-bar-item>
 * <instui-global-nav-bar-item href="#inbox">
 *   <span slot="icon">📬</span>
 *   Inbox
 * </instui-global-nav-bar-item>
 * ```
 */
export const globalNavBarItem: ElementDefinition = {
  name: "global-nav-bar.item",
  define: (ctx) =>
    ctx.wrapper(
      "instui-global-nav-bar-item",
      globalNavBarItemCss(ctx.I),
      (host) => {
        const href = host.getAttribute("href") || "#";
        const selected = host.hasAttribute("selected") ? " -selected" : "";
        const cls = `instui-global-nav-bar-item${selected}`;
        return (
          `<a class="${cls}" part="item" href="${href}">` +
          `<span class="icon" part="icon"><slot name="icon"></slot></span>` +
          `<span class="label" part="label"><slot></slot></span>` +
          `</a>`
        );
      },
      { display: "flex" },
    ),
};
