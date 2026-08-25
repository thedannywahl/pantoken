/**
 * Localized strings for the "Get started" scaffold tabs (`<GetStartedTabs />`), supplied per locale
 * via `themeConfig.getStartedTabs` (see `.vitepress/i18n.ts`) and read at runtime with
 * `useData().theme`, with the English values here as the fallback when a locale omits the block. The
 * `npx …` commands themselves are not translated.
 */
export interface GetStartedTabsStrings {
  /** Instructions shown on the "AI" tab in place of a shell command. */
  aiCommand: string;
}

/** English defaults, also the fallback when a locale doesn't localize the tabs. */
export const GET_STARTED_TABS_DEFAULTS: GetStartedTabsStrings = {
  aiCommand:
    "Run `npx @pantoken/ai init` in this project, then run the `/scaffold-pantoken` skill.",
};
