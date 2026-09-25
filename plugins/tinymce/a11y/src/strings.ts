import englishBase from "./i18n.json" with { type: "json" };

/** User-visible strings emitted by the accessibility checker plugin. */
export interface A11yStrings {
  a11yToolbarText: string;
  a11yToolbarTooltip: string;
  a11yMenuText: string;
  a11yDialogTitle: string;
  a11yNoIssues: string;
  a11yIssueCount: string;
  a11yStatusbarIssueCount: string;
  a11yIssueLabel: string;
  a11yCloseButton: string;
  a11yImageAltMessage: string;
  a11yImageAltWhy: string;
  a11yImageAltFilenameMessage: string;
  a11yImageAltFilenameWhy: string;
  a11yImageAltLengthMessage: string;
  a11yImageAltLengthWhy: string;
  a11yHeadingSequenceMessage: string;
  a11yHeadingSequenceWhy: string;
  a11yTableHeaderMessage: string;
  a11yTableHeaderWhy: string;
  a11yTableCaptionMessage: string;
  a11yTableCaptionWhy: string;
  a11yTableHeaderScopeMessage: string;
  a11yTableHeaderScopeWhy: string;
  a11yAdjacentLinksMessage: string;
  a11yAdjacentLinksWhy: string;
  a11yHeadingStartMessage: string;
  a11yHeadingStartWhy: string;
  a11yListStructureMessage: string;
  a11yListStructureWhy: string;
}

/** English defaults for the accessibility checker interface. */
export const A11Y_STRINGS: A11yStrings = Object.fromEntries(
  Object.entries(englishBase)
    .filter(([key]) => key !== "$schema")
    .map(([key, value]) => [key, typeof value === "string" ? value : value.message]),
) as unknown as A11yStrings;

/** Fill a localized string's `{{name}}` placeholders with runtime values. */
export function formatA11yString(
  template: string,
  values: Readonly<Record<string, string | number>>,
): string {
  return template.replace(/\{\{(\w+)\}\}/gu, (_match, key: string) => String(values[key] ?? ""));
}
