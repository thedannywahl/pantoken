import englishBase from "./i18n.json" with { type: "json" };

/** User-visible strings emitted by the CodeMirror source-view plugin. */
export interface CodemirrorStrings {
  sourceToggleTooltip: string;
  sourceFormatTooltip: string;
  sourceFormatErrorMessage: string;
}

/** English defaults for the source-view interface. */
export const CODEMIRROR_STRINGS: CodemirrorStrings = Object.fromEntries(
  Object.entries(englishBase)
    .filter(([key]) => key !== "$schema")
    .map(([key, value]) => [key, typeof value === "string" ? value : value.message]),
) as unknown as CodemirrorStrings;
