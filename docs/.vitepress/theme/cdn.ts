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
  /** Label for the token-sheet radio group. */
  tokenSheetLabel: string;
  /** The lean (icon-free) token-sheet option. */
  tokenLean: string;
  /** The full token-sheet option. */
  tokenFull: string;
  /** Label for the output-format radio group. */
  formatLabel: string;
  /** The `<link>` output option. */
  formatLink: string;
  /** The `@import` output option. */
  formatImport: string;
  /** Checkbox: include the opt-in base reset. */
  includeBase: string;
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
  allComponents: "All components (components.css)",
  tokenSheetLabel: "Token sheet",
  tokenLean: "Lean (no icons, ~23 KB gzip)",
  tokenFull: "Full (all icons, ~140 KB gzip)",
  formatLabel: "Output",
  formatLink: "<link>",
  formatImport: "@import",
  includeBase: "Include base reset",
  copy: "Copy",
  copied: "Copied",
  empty: "Select one or more components to build a URL.",
  fontsNote:
    "Fonts load separately — add a <link> to @pantoken/components/fonts.css when you need them.",
  iconsNote: "component-icons.css is included because a selected component uses icons.",
};
