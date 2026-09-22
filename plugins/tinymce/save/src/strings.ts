import englishBase from "./i18n.json" with { type: "json" };

/** User-visible strings emitted by the preset management plugin. */
export interface SaveStrings {
  saveToolbarText: string;
  saveToolbarTooltip: string;
  saveAction: string;
  saveAsAction: string;
  openAction: string;
  deleteAction: string;
  saveAsDialogTitle: string;
  presetNameLabel: string;
  openDialogTitle: string;
  deleteDialogTitle: string;
  presetLabel: string;
  confirmOverwrite: string;
  confirmDiscard: string;
  confirmDelete: string;
  emptyPresets: string;
  invalidName: string;
  invalidPreset: string;
  storageReadError: string;
  storageWriteError: string;
  storageDeleteError: string;
  presetSaveButton: string;
  presetOpenButton: string;
  presetDeleteButton: string;
  presetCancelButton: string;
}

/** English defaults for the preset management interface. */
export const SAVE_STRINGS: SaveStrings = Object.fromEntries(
  Object.entries(englishBase)
    .filter(([key]) => key !== "$schema")
    .map(([key, value]) => [key, typeof value === "string" ? value : value.message]),
) as unknown as SaveStrings;

/** Fill a localized string's `{{name}}` placeholders with runtime values. */
export function formatSaveString(
  template: string,
  values: Readonly<Record<string, string | number>>,
): string {
  return template.replace(/\{\{(\w+)\}\}/gu, (_match, key: string) => String(values[key] ?? ""));
}
