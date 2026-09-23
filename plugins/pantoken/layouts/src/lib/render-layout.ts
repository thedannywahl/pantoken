/**
 * Locale-aware rendering for {@link PageLayout} records: swaps `{{key}}` tokens in `html`, `title`,
 * and image `altText` for the resolved locale's `layouts.strings` message, falling back to English.
 *
 * \@module
 */
import { MESSAGES } from "../../generated/locales/index.ts";
import type { PageLayout } from "../layouts/page-layout.ts";

const TOKEN_PATTERN = /\{\{([\w.]+)\}\}/gu;

/** Replace every `{{key}}` token in `template` with `t(key)`. */
export function substitute(template: string, t: (key: string) => string): string {
  return template.replace(TOKEN_PATTERN, (_match, key: string) => t(key));
}

/** Resolves `key` against `locale`'s bundle, falling back to `en`, then the literal key. */
function createLookup(locale: string): (key: string) => string {
  const resolved = MESSAGES[locale] ?? MESSAGES.en ?? {};
  const fallback = MESSAGES.en ?? {};
  return (key: string): string => resolved[key] ?? fallback[key] ?? key;
}

/** Render `layout`'s `{{key}}` tokens for `locale` (default `"en"`), falling back to English. */
export function renderPageLayout(layout: PageLayout, locale = "en"): PageLayout {
  const t = createLookup(locale);
  return {
    ...layout,
    title: substitute(layout.title, t),
    html: substitute(layout.html, t),
    imagePlaceholders: layout.imagePlaceholders?.map((placeholder) => ({
      ...placeholder,
      ...(placeholder.altText ? { altText: substitute(placeholder.altText, t) } : {}),
    })),
  };
}
