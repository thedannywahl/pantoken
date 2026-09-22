import englishBase from "./i18n.json" with { type: "json" };

/** All user-visible strings emitted by the TinyMCE integration. */
export interface TinymceStrings {
  autocompleteModifierDetail: string;
  classValidationIncompleteComponent: string;
  classValidationTokenPrefix: string;
  classValidationUnknownComponent: string;
  componentsDialogTitle: string;
  componentsListLabel: string;
  componentsMenuText: string;
  componentsToolbarText: string;
  componentsToolbarTooltip: string;
  iconLabelDialogTitle: string;
  iconLabelInputLabel: string;
  iconsMenuText: string;
  iconsDialogTitle: string;
  iconsSearchPlaceholder: string;
  iconsSearchLabel: string;
  iconsAllSources: string;
  iconsResultCount: string;
  iconsNoResults: string;
  iconsToolbarText: string;
  iconsToolbarTooltip: string;
  layoutsConfirmReplace: string;
  layoutsDialogTitle: string;
  layoutsMenuText: string;
  layoutsSelectLabel: string;
  layoutsToolbarText: string;
  layoutsToolbarTooltip: string;
  logosToolbarText: string;
  logosToolbarTooltip: string;
  logosMenuText: string;
  logosDialogTitle: string;
  logosProductLabel: string;
  logosLayoutLabel: string;
  logosLayoutHorizontal: string;
  logosLayoutVertical: string;
  logosLayoutStacked: string;
  logosColorModeLabel: string;
  logosColorModeColor: string;
  logosColorModeMonochrome: string;
  logosColorModeLight: string;
  insertButton: string;
  replaceButton: string;
  cancelButton: string;
  logoAltSuffix: string;
  templatesConfirmReplace: string;
  templatesDialogTitle: string;
  templatesMenuText: string;
  templatesSelectLabel: string;
  templatesToolbarText: string;
}

/** English defaults for TinyMCE integration UI strings. */
export const TINYMCE_STRINGS: TinymceStrings = Object.fromEntries(
  Object.entries(englishBase)
    .filter(([key]) => key !== "$schema")
    .map(([key, value]) => [key, typeof value === "string" ? value : value.message]),
) as unknown as TinymceStrings;

/** Fill a catalog string's `{{name}}` placeholders with runtime values. */
export function formatTinymceString(
  template: string,
  values: Record<string, string | number>,
): string {
  return template.replace(/\{\{(\w+)\}\}/gu, (_match, key: string) => String(values[key] ?? ""));
}
