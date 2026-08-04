/**
 * Localized strings for the CDN picker (`<CdnPicker />`), supplied per locale via
 * `themeConfig.cdnPicker` (see `.vitepress/i18n.ts`) and read at runtime with `useData().theme`, with
 * the English values here as the fallback when a locale omits the block. Component names and the
 * generated URL are not translated.
 */
export interface CdnPickerStrings {
  /** Legend for the component checkbox group. */
  componentsLabel: string;
  /** Checkbox: use the whole `components.css` barrel instead of per-component sheets. */
  allComponents: string;
  /** Label for the output-format tabs. */
  formatLabel: string;
  /** The `<link>` output option. */
  formatLink: string;
  /** The `@import` output option. */
  formatImport: string;
  /** Checkbox: include the opt-in base reset. */
  includeBase: string;
  /** Info-popover label for the base-reset checkbox's info button. */
  baseInfoLabel: string;
  /** Info-popover blurb for the base-reset checkbox. */
  baseInfo: string;
  /** Checkbox: include the spacing/color/layout utility classes (mb-md, bg-brand, etc.). */
  includeUtilities: string;
  /** Info-popover label for the utilities checkbox's info button. */
  utilitiesInfoLabel: string;
  /** Info-popover blurb for the utilities checkbox. */
  utilitiesInfo: string;
  /** Copy button. */
  copy: string;
  /** Copy button, confirmation state. */
  copied: string;
  /** Shown when no component is selected. */
  empty: string;
  /** Note that fonts load separately (not via combine). */
  fontsNote: string;
  /** Note shown when a selected component pulls in the component-icons sheet. */
  iconsNote: string;
}

/** English defaults, also the fallback when a locale doesn't localize the picker. */
export const CDN_PICKER_DEFAULTS: CdnPickerStrings = {
  componentsLabel: "Components",
  allComponents: "All components",
  formatLabel: "Output",
  formatLink: "<link>",
  formatImport: "@import",
  includeBase: "Base",
  baseInfoLabel: "About the base reset",
  baseInfo:
    "The opt-in global reset: box-sizing, the page surface, base text colour and font, color-scheme, and link defaults.",
  includeUtilities: "Utilities",
  utilitiesInfoLabel: "About the utility classes",
  utilitiesInfo:
    "An opt-in layer of cross-cutting classes: a View primitive, spacing on the token scale, and semantic color overrides.",
  copy: "Copy",
  copied: "Copied",
  empty: "Select one or more components to build a URL.",
  fontsNote:
    "Fonts load separately — add a <link> to @pantoken/components/fonts.css when you need them.",
  iconsNote: "component-icons.css is included because a selected component uses icons.",
};
