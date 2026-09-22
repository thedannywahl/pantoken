import type { HeadConfig } from "vitepress";

/** localStorage key persisting the hidden/shown state. */
export const DEFAULT_STORAGE_KEY = "vitepress-sidebar-hidden";

/** Class applied to `<html>` while the sidebar is hidden. */
export const DEFAULT_HIDDEN_CLASS = "sidebar-hidden";

/** Where the toggle appears in the VitePress navbar. */
export type SidebarPlacement = "start" | "end";

/** CSS classes for the icons shown when the sidebar is hidden or visible. */
export interface SidebarToggleIcons {
  /** Icon that shows the hidden sidebar. Defaults to `vpi-chevron-right`. */
  show?: string;
  /** Icon that hides the visible sidebar. Defaults to `vpi-chevron-left`. */
  hide?: string;
}

/** Options shared by {@link sidebarToggleHead} and `useSidebarVisibility`. */
export interface SidebarToggleOptions {
  /** localStorage key persisting the hidden/shown state. Defaults to {@link DEFAULT_STORAGE_KEY}. */
  storageKey?: string;
  /** Class applied to `<html>` while the sidebar is hidden. Defaults to {@link DEFAULT_HIDDEN_CLASS}. */
  hiddenClass?: string;
  /** Navbar placement before search or after the standard controls. Defaults to `end`. */
  placement?: SidebarPlacement;
  /** CSS classes for custom show and hide icons. */
  icons?: SidebarToggleIcons;
}

const CONFIG_KEY = "__VITEPRESS_SIDEBAR_TOGGLE__";

/** Reads UI options serialized by {@link sidebarToggleHead}. */
export function configuredSidebarToggleOptions(): SidebarToggleOptions {
  if (typeof window === "undefined") return {};
  return (window as unknown as Record<string, SidebarToggleOptions>)[CONFIG_KEY] ?? {};
}

/**
 * Builds the blocking, pre-hydration `<script>` head tag that restores the sidebar's hidden/shown
 * state from `localStorage` before paint — the same technique VitePress's own dark-mode appearance
 * switch uses, so there's no flash of the wrong state and no server/client hydration mismatch. Push
 * the result into `head` in the site's `config.ts`.
 */
export function sidebarToggleHead(options: SidebarToggleOptions = {}): HeadConfig {
  const storageKey = options.storageKey ?? DEFAULT_STORAGE_KEY;
  const hiddenClass = options.hiddenClass ?? DEFAULT_HIDDEN_CLASS;
  const config = JSON.stringify({
    storageKey,
    hiddenClass,
    placement: options.placement ?? "end",
    icons: {
      show: options.icons?.show ?? "vpi-chevron-right",
      hide: options.icons?.hide ?? "vpi-chevron-left",
    },
  }).replaceAll("<", "\\u003c");
  const script =
    "(function(){try{" +
    `window[${JSON.stringify(CONFIG_KEY)}]=${config};` +
    `if(localStorage.getItem(${JSON.stringify(storageKey)})==="true"){` +
    `document.documentElement.classList.add(${JSON.stringify(hiddenClass)})}` +
    "}catch(e){}})();";
  return ["script", {}, script];
}
