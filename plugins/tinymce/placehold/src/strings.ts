import englishBase from "./i18n.json" with { type: "json" };

/** User-visible strings emitted by the Placehold TinyMCE plugin. */
export interface PlaceholdStrings {
  placeholdToolbarText: string;
  placeholdToolbarTooltip: string;
  placeholdMenuText: string;
  placeholdDialogTitle: string;
  placeholdWidthLabel: string;
  placeholdHeightLabel: string;
  placeholdBackgroundColorLabel: string;
  placeholdTextColorLabel: string;
  placeholdTextLabel: string;
  placeholdAltTextLabel: string;
  placeholdInsertButton: string;
  placeholdCancelButton: string;
  placeholdInvalidDimensions: string;
  placeholdInvalidColor: string;
  placeholdAltFallback: string;
}

/** English defaults for the Placehold TinyMCE interface. */
export const PLACEHOLD_STRINGS: PlaceholdStrings = Object.fromEntries(
  Object.entries(englishBase)
    .filter(([key]) => key !== "$schema")
    .map(([key, value]) => [key, typeof value === "string" ? value : value.message]),
) as unknown as PlaceholdStrings;

/** Fill a localized string's `{{name}}` placeholders with runtime values. */
export function formatPlaceholdString(
  template: string,
  values: Readonly<Record<string, string | number>>,
): string {
  return template.replace(/\{\{(\w+)\}\}/gu, (_match, key: string) => String(values[key] ?? ""));
}
