/** Resolve an editor locale without letting an embedded frame inherit standalone preferences. */
export function selectEditorLocale(
  embedded: boolean,
  queryLocale: string | null,
  storedLocale: string | null,
  initialLocale: string,
  supported: Record<string, "ltr" | "rtl">,
): string {
  if (embedded) {
    return queryLocale && Object.hasOwn(supported, queryLocale) ? queryLocale : "en";
  }
  if (storedLocale && Object.hasOwn(supported, storedLocale)) return storedLocale;
  return Object.hasOwn(supported, initialLocale) ? initialLocale : "en";
}
