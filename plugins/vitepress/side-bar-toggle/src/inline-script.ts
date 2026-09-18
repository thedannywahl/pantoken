import type { HeadConfig } from "vitepress";

/** localStorage key persisting the hidden/shown state. */
export const DEFAULT_STORAGE_KEY = "vitepress-sidebar-hidden";

/** Class applied to `<html>` while the sidebar is hidden. */
export const DEFAULT_HIDDEN_CLASS = "sidebar-hidden";

/** Options shared by {@link sidebarToggleHead} and `useSidebarVisibility`. */
export interface SidebarToggleOptions {
  /** localStorage key persisting the hidden/shown state. Defaults to {@link DEFAULT_STORAGE_KEY}. */
  storageKey?: string;
  /** Class applied to `<html>` while the sidebar is hidden. Defaults to {@link DEFAULT_HIDDEN_CLASS}. */
  hiddenClass?: string;
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
  const script =
    "(function(){try{" +
    `if(localStorage.getItem(${JSON.stringify(storageKey)})==="true"){` +
    `document.documentElement.classList.add(${JSON.stringify(hiddenClass)})}` +
    "}catch(e){}})();";
  return ["script", {}, script];
}
