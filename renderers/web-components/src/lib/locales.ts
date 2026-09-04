/**
 * pantoken's supported-locale registry, keyed by BCP47 tag. Seeded from the Canvas LMS supported-
 * language list, but the registry itself is pantoken's own — no runtime or build-time dependency on
 * Canvas. RTL flag and display label sourced from
 * https://community.instructure.com/en/kb/articles/662726-which-languages-does-canvas-support
 *
 * @module
 */

/** Display label and text-direction metadata for a single locale. */
export interface LocaleInfo {
  /** Human-readable label (English + native name where applicable). */
  label: string;
  /** Text direction. */
  dir: "ltr" | "rtl";
}

// prettier-ignore
/** All 44 supported locales keyed by BCP47 tag, with direction and display label. */
export const LOCALES: Record<string, LocaleInfo> = {
  "ar":       { label: "Arabic (العربية)",                     dir: "rtl" },
  "hy":       { label: "Armenian (Հայերեն)",                   dir: "ltr" },
  "ca":       { label: "Catalan (Catalá)",                     dir: "ltr" },
  "da":       { label: "Danish (Dansk)",                       dir: "ltr" },
  "nl":       { label: "Dutch (Nederlands)",                   dir: "ltr" },
  "en-AU":    { label: "English (Australia)",                  dir: "ltr" },
  "en-CA":    { label: "English (Canada)",                     dir: "ltr" },
  "en-GB":    { label: "English (United Kingdom)",             dir: "ltr" },
  "en":       { label: "English (United States)",              dir: "ltr" },
  "fi":       { label: "Finnish (Suomi)",                      dir: "ltr" },
  "fr":       { label: "French (Français)",                    dir: "ltr" },
  "fr-CA":    { label: "French Canadian (Français Canada)",    dir: "ltr" },
  "ga":       { label: "Irish Gaelic",                         dir: "ltr" },
  "de":       { label: "German (Deutsch)",                     dir: "ltr" },
  "el":       { label: "Greek (Ελληνικά)",                     dir: "ltr" },
  "ht":       { label: "Haitian Creole (Kreyòl Ayisyen)",      dir: "ltr" },
  "he":       { label: "Hebrew (עִברִית)",                     dir: "rtl" },
  "hi":       { label: "Hindi (हिन्दी)",                      dir: "ltr" },
  "hu":       { label: "Hungarian (Magyar)",                   dir: "ltr" },
  "is":       { label: "Icelandic (Íslenska)",                 dir: "ltr" },
  "id":       { label: "Indonesian",                           dir: "ltr" },
  "it":       { label: "Italian (Italiano)",                   dir: "ltr" },
  "ja":       { label: "Japanese (日本語)",                    dir: "ltr" },
  "ko":       { label: "Korean (한국말)",                      dir: "ltr" },
  "mi":       { label: "Maori (Reo Māori)",                    dir: "ltr" },
  "ms":       { label: "Malaysian (Bahasa Melayu)",            dir: "ltr" },
  "se":       { label: "Northern Sami",                        dir: "ltr" },
  "nb":       { label: "Norwegian Bokmål (Norsk Bokmål)",      dir: "ltr" },
  "nn":       { label: "Norwegian Nynorsk (Norsk Nynorsk)",    dir: "ltr" },
  "fa":       { label: "Persian / Farsi (فارسی)",              dir: "rtl" },
  "pl":       { label: "Polish (Polski)",                      dir: "ltr" },
  "pt":       { label: "Portuguese (Português)",               dir: "ltr" },
  "pt-BR":    { label: "Portuguese Brazil (Português do Brasil)", dir: "ltr" },
  "ru":       { label: "Russian (Русский)",                    dir: "ltr" },
  "zh-Hans":  { label: "Simplified Chinese (简体中文)",         dir: "ltr" },
  "sl":       { label: "Slovenian (Slovenščina)",              dir: "ltr" },
  "es":       { label: "Spanish (Español)",                    dir: "ltr" },
  "sv":       { label: "Swedish (Svenska)",                    dir: "ltr" },
  "th":       { label: "Thai (ไทย)",                          dir: "ltr" },
  "zh-Hant":  { label: "Traditional Chinese (繁體中文)",        dir: "ltr" },
  "tr":       { label: "Turkish (Türkçe)",                     dir: "ltr" },
  "uk":       { label: "Ukrainian (Українська)",               dir: "ltr" },
  "vi":       { label: "Vietnamese",                           dir: "ltr" },
  "cy":       { label: "Welsh (Cymraeg)",                      dir: "ltr" },
};
