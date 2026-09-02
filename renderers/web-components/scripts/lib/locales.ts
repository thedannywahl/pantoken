/**
 * pantoken's supported-locale registry, keyed by BCP47 tag. Build-script-only copy of
 * `@pantoken/i18n`'s `src/lib/locales.ts` — duplicated (rather than imported) so these
 * scripts don't depend on `@pantoken/i18n`, which itself depends on this package.
 *
 * Seeded from the Canvas LMS supported-language list: RTL flag and display label sourced from
 * https://community.instructure.com/en/kb/articles/662726-which-languages-does-canvas-support
 *
 * @module
 */

/** Display label metadata for a single locale. */
export interface LocaleInfo {
  /** Human-readable label (English + native name where applicable). */
  label: string;
}

// prettier-ignore
/** All 44 supported locales keyed by BCP47 tag, with display label. */
export const LOCALES: Record<string, LocaleInfo> = {
  "ar":       { label: "Arabic (العربية)" },
  "hy":       { label: "Armenian (Հայերեն)" },
  "ca":       { label: "Catalan (Catalá)" },
  "da":       { label: "Danish (Dansk)" },
  "nl":       { label: "Dutch (Nederlands)" },
  "en-AU":    { label: "English (Australia)" },
  "en-CA":    { label: "English (Canada)" },
  "en-GB":    { label: "English (United Kingdom)" },
  "en":       { label: "English (United States)" },
  "fi":       { label: "Finnish (Suomi)" },
  "fr":       { label: "French (Français)" },
  "fr-CA":    { label: "French Canadian (Français Canada)" },
  "ga":       { label: "Irish Gaelic" },
  "de":       { label: "German (Deutsch)" },
  "el":       { label: "Greek (Ελληνικά)" },
  "ht":       { label: "Haitian Creole (Kreyòl Ayisyen)" },
  "he":       { label: "Hebrew (עִברִית)" },
  "hi":       { label: "Hindi (हिन्दी)" },
  "hu":       { label: "Hungarian (Magyar)" },
  "is":       { label: "Icelandic (Íslenska)" },
  "id":       { label: "Indonesian" },
  "it":       { label: "Italian (Italiano)" },
  "ja":       { label: "Japanese (日本語)" },
  "ko":       { label: "Korean (한국말)" },
  "mi":       { label: "Maori (Reo Māori)" },
  "ms":       { label: "Malaysian (Bahasa Melayu)" },
  "se":       { label: "Northern Sami" },
  "nb":       { label: "Norwegian Bokmål (Norsk Bokmål)" },
  "nn":       { label: "Norwegian Nynorsk (Norsk Nynorsk)" },
  "fa":       { label: "Persian / Farsi (فارسی)" },
  "pl":       { label: "Polish (Polski)" },
  "pt":       { label: "Portuguese (Português)" },
  "pt-BR":    { label: "Portuguese Brazil (Português do Brasil)" },
  "ru":       { label: "Russian (Русский)" },
  "zh-Hans":  { label: "Simplified Chinese (简体中文)" },
  "sl":       { label: "Slovenian (Slovenščina)" },
  "es":       { label: "Spanish (Español)" },
  "sv":       { label: "Swedish (Svenska)" },
  "th":       { label: "Thai (ไทย)" },
  "zh-Hant":  { label: "Traditional Chinese (繁體中文)" },
  "tr":       { label: "Turkish (Türkçe)" },
  "uk":       { label: "Ukrainian (Українська)" },
  "vi":       { label: "Vietnamese" },
  "cy":       { label: "Welsh (Cymraeg)" },
};
