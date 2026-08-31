/**
 * Localized strings for the "Get started" scaffold tabs (`<GetStartedTabs />`), supplied per locale
 * via `themeConfig.getStartedTabs` (see `.vitepress/i18n.ts`) and read at runtime with
 * `useData().theme`, with the English values here as the fallback when a locale omits the block.
 * The package-manager tab's `npx …` commands are not translated (they're literal shell commands),
 * but the agent tab's prompt sentence is prose and goes through the same translation pipeline as
 * the rest of `UiStrings` (see `docs/scripts/translate-chrome.ts`).
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
  /**
   * The quoted agent prompt typed into the agent-shell face. Quoted so the copied/typed line is one
   * valid shell argument for every launcher; the `create.pantoken.app/SKILL.md` URL and quoting must
   * survive translation unchanged.
   */
  agentPrompt: string;
}

/** English defaults, also the fallback when a locale doesn't localize the tabs. */
export const GET_STARTED_TABS_DEFAULTS: GetStartedTabsStrings = {
  copied: "Copied",
  cliInstall: "CLI install",
  aiInstall: "AI install",
  pauseAnimation: "Pause animation",
  playAnimation: "Resume animation",
  agentPrompt:
    '"Fetch create.pantoken.app/SKILL.md and follow it to set up pantoken in this project."',
};
