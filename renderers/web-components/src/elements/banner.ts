import { bannerCss } from "@pantoken/components";
import type { ElementDefinition } from "../lib/context.ts";

/**
 * `<instui-banner>` — a styled container for displaying important information. The `size` attribute
 * maps to the `-size-compact` / `-size-relaxed` modifier. The `theme` attribute maps to the
 * `-theme-sea` / `-theme-violet` modifier. Slotted content is typically organized with parts for
 * heading, content, icon, and optional close button.
 *
 * @example
 * ```html
 * <instui-banner size="relaxed" theme="sea">
 *   <span slot="icon" aria-hidden="true">ⓘ</span>
 *   <div slot="heading">Important Information</div>
 *   <div slot="content">This is an important message that needs your attention.</div>
 * </instui-banner>
 * ```
 */
export const banner: ElementDefinition = {
  name: "banner",
  define: (ctx) =>
    ctx.wrapper(
      "instui-banner",
      bannerCss(ctx.I),
      (host) => {
        const size = host.getAttribute("size") || "relaxed";
        const theme = host.getAttribute("theme") || "sea";
        const sizeClass = size === "compact" ? "-size-compact" : "-size-relaxed";
        const themeClass = theme === "violet" ? "-theme-violet" : "-theme-sea";
        const cls = `${ctx.variantClass("banner", host)} ${sizeClass} ${themeClass}`.trim();
        return (
          `<div class="${cls}" part="banner">` +
          `<span class="icon" part="icon"><slot name="icon"></slot></span>` +
          `<div class="heading" part="heading"><slot name="heading"></slot></div>` +
          `<div class="content" part="content"><slot name="content"></slot></div>` +
          `<div class="close-button" part="close-button"><slot name="close-button"></slot></div>` +
          `</div>`
        );
      },
      { display: "block" },
    ),
};
