/**
 * Localized strings for the Canvas RCE utility page (`<CanvasRcePage />`), supplied per locale via
 * `themeConfig.canvasRce` (see `.vitepress/i18n.ts`) and read at runtime with `useData().theme`, with
 * the English values here as the fallback when a locale omits the block. The embedded editor itself
 * (built by `scripts/build-canvas-rce.ts`) is English-only regardless of locale.
 */
export interface CanvasRceStrings {
  /** Page title. */
  title: string;
  /** Lead paragraph describing the embedded editor. */
  description: string;
  /** Link text for opening the embedded editor in its own browser tab. */
  openInNewTab: string;
  /** Link text to the `create-pantoken-app` scaffold command for a locally editable copy. */
  runLocally: string;
}

/** English defaults, also the fallback when a locale doesn't localize the page. */
export const CANVAS_RCE_DEFAULTS: CanvasRceStrings = {
  title: "Canvas RCE",
  description:
    "A live preview of pantoken's Canvas LMS Rich Content Editor template: a TinyMCE-based editor with starter layouts, a live preview pane, and hand-editable theme.css/theme.js output.",
  openInNewTab: "Open in a new tab",
  runLocally: "Run locally: npx create-pantoken-app canvas-theme-editor",
};
