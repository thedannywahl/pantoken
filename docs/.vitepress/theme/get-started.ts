/**
 * Localized strings for the "Get started" scaffold tabs (`<GetStartedTabs />`), supplied per locale
 * via `themeConfig.getStartedTabs` (see `.vitepress/i18n.ts`) and read at runtime with
 * `useData().theme`, with the English values here as the fallback when a locale omits the block.
 * The commands themselves (both the package-manager and the agent-provider tabs) are plain English
 * sentences with embedded shell/prompt text and are not translated.
 */
export interface GetStartedTabsStrings {
  /** Copy-feedback text shown after a command is copied. */
  copied: string;
  /** Screen-reader label for the CLI install mode button. */
  cliInstall: string;
  /** Screen-reader label for the AI install mode button. */
  aiInstall: string;
  /** Label for the toggle button when the animation is playing (click to pause). */
  pauseAnimation: string;
  /** Label for the toggle button when the animation is paused (click to resume). */
  playAnimation: string;
}

/** English defaults, also the fallback when a locale doesn't localize the tabs. */
export const GET_STARTED_TABS_DEFAULTS: GetStartedTabsStrings = {
  copied: "Copied",
  cliInstall: "CLI install",
  aiInstall: "AI install",
  pauseAnimation: "Pause animation",
  playAnimation: "Resume animation",
};
