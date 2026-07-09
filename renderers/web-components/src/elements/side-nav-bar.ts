import { sideNavBarCss } from "@pantoken/components";
import type { ElementDefinition } from "../lib/context.ts";

/**
 * `<instui-side-nav-bar>` — the styled shell of a vertical navigation rail. `minimized="true"` adds
 * the `-minimized` modifier (collapsed rail); the consumer slots the nav items.
 *
 * @example
 * ```html
 * <instui-side-nav-bar>
 *   <a href="/dashboard">Dashboard</a>
 *   <a href="/courses">Courses</a>
 * </instui-side-nav-bar>
 * ```
 *
 * @demo self:side-nav-bar
 */
export const sideNavBar: ElementDefinition = {
  name: "side-nav-bar",
  define: (ctx) =>
    // SideNavBar is a container: the consumer slots the items, the element supplies the styled shell.
    ctx.wrapper(
      "instui-side-nav-bar",
      sideNavBarCss(ctx.I),
      (host) => {
        const cls =
          host.getAttribute("minimized") === "true"
            ? "instui-side-nav-bar -minimized"
            : "instui-side-nav-bar";
        return `<nav class="${cls}" part="side-nav-bar"><slot></slot></nav>`;
      },
      "block",
    ),
};
