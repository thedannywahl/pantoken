/**
 * Localized strings for the shadcn/ui registry browser (`<RegistryBrowser />`), supplied per locale
 * via `themeConfig.registryBrowser` (see `.vitepress/i18n.ts`) and read at runtime with
 * `useData().theme`, with the English values here as the fallback when a locale omits the block.
 */
export interface RegistryBrowserStrings {
  /** Page title for the registry browser. */
  title: string;
  /** Subtitle / intro description explaining the registry. */
  subtitle: string;
  /** Label for the 'All' category tab. */
  tabAll: string;
  /** Label for the 'Components' category tab. */
  tabComponents: string;
  /** Label for the 'Themes' category tab. */
  tabThemes: string;
  /** Label for the 'Hooks' category tab. */
  tabHooks: string;
  /** Placeholder text for the filter/search input. */
  searchPlaceholder: string;
  /** Label preceding the package manager selector tabs. */
  cliLabel: string;
  /** Copy button label. */
  copy: string;
  /** Copy button label after copying. */
  copied: string;
  /** Label preceding dependency tags. */
  depsLabel: string;
  /** Summary label for expandable item details. */
  previewDetails: string;
  /** Heading for light token preview mappings. */
  previewTokens: string;
  /** Link text to view raw JSON manifest. */
  viewJson: string;
  /** Message displayed when no registry items match filters. */
  emptyTitle: string;
  /** Button label to reset filters when empty. */
  emptyReset: string;
}

/** English defaults, also the fallback when a locale doesn't localize the registry browser. */
export const REGISTRY_BROWSER_DEFAULTS: RegistryBrowserStrings = {
  title: "shadcn/ui Registry",
  subtitle:
    "CSS components, layouts, plugins, and themes for package-managed shadcn projects. Items install styles and usage metadata, not React components.",
  tabAll: "All",
  tabComponents: "Components",
  tabThemes: "Themes",
  tabHooks: "Hooks",
  searchPlaceholder: "Filter components, layouts, plugins, themes…",
  cliLabel: "CLI:",
  copy: "Copy",
  copied: "Copied",
  depsLabel: "Deps:",
  previewDetails: "Preview details",
  previewTokens: "Token mappings (light)",
  viewJson: "JSON",
  emptyTitle: "No registry items match your search.",
  emptyReset: "Reset Filters",
};
