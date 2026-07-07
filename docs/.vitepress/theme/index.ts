// The docs site is themed with pantoken's own output: the full @property token sheet from
// @pantoken/css, then the @pantoken/vitepress bridge that maps VitePress's --vp-* variables onto
// var(--instui-*). The site you're reading is a live demo of the VitePress renderer.
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import "@pantoken/css/style.css";
import "@pantoken/vitepress/custom.css";
import "@pantoken/vitepress/components.css";
import "@pantoken/components/components.css";
import "@pantoken/components/utilities.css";
import "@pantoken/components/fonts.css";
import VitePressMermaid from "../plugins/vitepress-mermaid/index.vue";
import "@pantoken/demo/demo.css";
import "./pantoken.css";

export default {
  extends: DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp?.(ctx);
    ctx.app.component("vitepress-mermaid", VitePressMermaid);

    // The demo figure's action buttons are static HTML from @pantoken/demo; the package can't run
    // host JS, so wire them here. One delegated listener takes the whole figure full screen (so its
    // toolbar — light/dark, exit full screen, new tab — stays on top) or asks the runner (same-origin)
    // to flip its light/dark scheme via postMessage.
    if (typeof document !== "undefined") {
      document.addEventListener("click", (event) => {
        const target = event.target as HTMLElement | null;
        const action = target?.closest?.('[data-role="fullscreen"], [data-role="scheme"]');
        if (!action) return;
        const figure = action.closest(".pantoken-demo") as HTMLElement | null;
        if (!figure) return;
        if (action.getAttribute("data-role") === "fullscreen") {
          // Fullscreen the figure, not the iframe, so the toolbar rides along. Toggle back out when
          // this figure is already the fullscreen element.
          if (document.fullscreenElement === figure) {
            void document.exitFullscreen?.();
          } else {
            void figure.requestFullscreen?.();
          }
        } else {
          const frame = figure.querySelector("iframe") as HTMLIFrameElement | null;
          frame?.contentWindow?.postMessage({ type: "pantoken-demo-scheme" }, "*");
        }
      });

      // Lucide `minimize`, swapped onto the active figure's control while it's full screen.
      const MINIMIZE_ICON =
        '<svg class="pantoken-demo__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 3v3a2 2 0 0 1-2 2H3"/><path d="M21 8h-3a2 2 0 0 1-2-2V3"/><path d="M3 16h3a2 2 0 0 1 2 2v3"/><path d="M16 21v-3a2 2 0 0 1 2-2h3"/></svg>';
      document.addEventListener("fullscreenchange", () => {
        document
          .querySelectorAll<HTMLElement>('.pantoken-demo [data-role="fullscreen"]')
          .forEach((btn) => {
            const active = document.fullscreenElement === btn.closest(".pantoken-demo");
            if (active) {
              // Stash the package's own maximize glyph so we can restore it, then show minimize.
              if (!btn.dataset.maximizeIcon) btn.dataset.maximizeIcon = btn.innerHTML;
              btn.innerHTML = MINIMIZE_ICON;
              btn.setAttribute("data-tooltip", "Minimize");
              btn.setAttribute("aria-label", "Minimize");
            } else if (btn.dataset.maximizeIcon) {
              btn.innerHTML = btn.dataset.maximizeIcon;
              btn.setAttribute("data-tooltip", "Full screen");
              btn.setAttribute("aria-label", "Full screen");
            }
          });
      });
    }
  },
} satisfies Theme;
