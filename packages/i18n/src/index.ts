/**
 * `@pantoken/i18n` — Canvas-parity locale bundles for `@pantoken/web-components`.
 *
 * Ships pre-built {@link LocaleBundle} objects for all 45 Canvas-supported locales (including 3
 * RTL: Arabic, Hebrew, Persian/Farsi). Pass any bundle — or a raw BCP47 tag — to
 * {@link registerLocalized} instead of the bare `register()` from `@pantoken/web-components`:
 *
 * @example
 * ```ts
 * import { registerLocalized, hu } from "@pantoken/i18n";
 * import "@pantoken/css";
 *
 * registerLocalized(hu); // Hungarian UI strings + correct first-day-of-week
 * registerLocalized("ar"); // Arabic auto-derived; dir="rtl" inferred from LOCALES
 * ```
 *
 * Consumers can define custom bundles with {@link defineBundle} for locales not in this package.
 *
 * @module
 */

import { makeStrings, register, type ElementRegistry } from "@pantoken/web-components";
import { LOCALES } from "./lib/locales.ts";
import type { LocaleBundle } from "./locale-bundle.ts";

export type { WebComponentStrings } from "@pantoken/web-components";
export { ENGLISH_STRINGS, makeStrings } from "@pantoken/web-components";

export { LOCALES } from "./lib/locales.ts";
export type { LocaleInfo } from "./lib/locales.ts";
export { defineBundle } from "./locale-bundle.ts";
export type { LocaleBundle } from "./locale-bundle.ts";
export {
  formatDate,
  formatList,
  formatMessage,
  formatNumber,
  formatRelativeTime,
  isolate,
} from "./lib/runtime.ts";

// ── Locale helpers ────────────────────────────────────────────────────────────

/**
 * Return the text direction for a locale — using the {@link LOCALES} registry for known
 * locales, falling back to `"ltr"` for unknown tags.
 *
 * @example
 * ```ts
 * getDir("ar"); // → "rtl"
 * getDir("hu"); // → "ltr"
 * ```
 */
export function getDir(localeOrBundle: string | LocaleBundle): "ltr" | "rtl" {
  if (typeof localeOrBundle !== "string") return localeOrBundle.dir;
  return LOCALES[localeOrBundle]?.dir ?? "ltr";
}

// ── registerLocalized ─────────────────────────────────────────────────────────

/**
 * Register `@pantoken/web-components` custom elements with locale-specific strings and direction.
 *
 * Accepts a fully resolved {@link LocaleBundle} *or* a raw BCP47 tag string. When a string is
 * passed, {@link makeStrings} derives weekday names via `Intl.DateTimeFormat` and all other strings
 * fall back to English; pass a bundle for full translations.
 *
 * @param bundle - A {@link LocaleBundle} object, or a BCP47 tag (`"hu"`, `"ar"`, …).
 * @param target - The registry to define into (defaults to `globalThis.customElements`).
 * @param options - Passed through to `register()` (e.g. `prefix`, `only`).
 *
 * @example
 * ```ts
 * import { registerLocalized, hu } from "@pantoken/i18n";
 *
 * registerLocalized(hu);
 * registerLocalized("ar"); // direction inferred from LOCALES
 * registerLocalized("x-custom", customElements, { prefix: "x" });
 * ```
 */
export function registerLocalized(
  bundle: LocaleBundle | string,
  target?: ElementRegistry,
  options: { prefix?: string | null; only?: readonly string[] } = {},
): void {
  if (typeof bundle === "string") {
    const meta = LOCALES[bundle];
    register(target, {
      ...options,
      locale: bundle,
      dir: meta?.dir ?? "ltr",
      strings: makeStrings(bundle),
    });
  } else {
    register(target, {
      ...options,
      locale: bundle.locale,
      dir: bundle.dir,
      strings: bundle.strings,
    });
  }
}

// ── Locale set ───────────────────────────────────────────────────────────────

/**
 * A typed subset of {@link LocaleBundle}s. Created by {@link createLocaleSet} to constrain an
 * app's supported locales at compile time — registering or retrieving a locale not in the set is a
 * TypeScript error.
 */
export interface LocaleSet<K extends string> {
  /** The locale tags included in this set. */
  readonly locales: readonly K[];
  /** Type guard — true when `locale` is in this set. */
  has(locale: string): locale is K;
  /** Return the bundle for `locale`. Throws at runtime when called with an unknown locale. */
  get(locale: K): LocaleBundle;
  /** Register `@pantoken/web-components` elements with the given locale from this set. */
  register(
    locale: K,
    target?: ElementRegistry,
    options?: { prefix?: string | null; only?: readonly string[] },
  ): void;
}

/**
 * Define the locale subset your app supports. Pass the imported bundle objects as an object
 * whose keys are the locale tags (JavaScript shorthand makes this natural). TypeScript narrows
 * the accepted locale tags to only the keys you provide.
 *
 * Not calling `createLocaleSet` at all gives the full 44-locale barrel — use this factory only
 * when you need compile-time validation or explicit tree-shaking signals.
 *
 * @example
 * ```ts
 * import { createLocaleSet, en, hu, de } from "@pantoken/i18n";
 *
 * const locales = createLocaleSet({ en, hu, de });
 *
 * locales.register("hu");          // ✓ type-safe
 * locales.register("fr");          // TypeScript error — not in this set
 * locales.has("hu");               // → true (type guard)
 * locales.get("hu");               // → LocaleBundle
 * ```
 */
export function createLocaleSet<K extends string>(bundles: Record<K, LocaleBundle>): LocaleSet<K> {
  const map = new Map<string, LocaleBundle>(Object.entries(bundles));
  const locales = (Object.keys(bundles) as K[]).sort() as readonly K[];
  return {
    locales,
    has(locale): locale is K {
      return map.has(locale);
    },
    get(locale) {
      const b = map.get(locale);
      if (!b) throw new Error(`Locale "${locale}" is not in this locale set.`);
      return b;
    },
    register(locale, target?, options?) {
      registerLocalized(this.get(locale), target, options ?? {});
    },
  };
}

// ── Built-in locale bundles ───────────────────────────────────────────────────
// Each locale is defined in its own file so consumers can import selectively.
// The barrel re-exports all 45 for convenience.

export { ar } from "./locales/ar.ts";
export { ca } from "./locales/ca.ts";
export { cy } from "./locales/cy.ts";
export { da } from "./locales/da.ts";
export { de } from "./locales/de.ts";
export { el } from "./locales/el.ts";
export { en } from "./locales/en.ts";
export { enAU } from "./locales/en-AU.ts";
export { enCA } from "./locales/en-CA.ts";
export { enGB } from "./locales/en-GB.ts";
export { es } from "./locales/es.ts";
export { fa } from "./locales/fa.ts";
export { fi } from "./locales/fi.ts";
export { fr } from "./locales/fr.ts";
export { frCA } from "./locales/fr-CA.ts";
export { ga } from "./locales/ga.ts";
export { he } from "./locales/he.ts";
export { hi } from "./locales/hi.ts";
export { ht } from "./locales/ht.ts";
export { hu } from "./locales/hu.ts";
export { hy } from "./locales/hy.ts";
export { id } from "./locales/id.ts";
export { is } from "./locales/is.ts";
export { it } from "./locales/it.ts";
export { ja } from "./locales/ja.ts";
export { ko } from "./locales/ko.ts";
export { mi } from "./locales/mi.ts";
export { ms } from "./locales/ms.ts";
export { nb } from "./locales/nb.ts";
export { nl } from "./locales/nl.ts";
export { nn } from "./locales/nn.ts";
export { pl } from "./locales/pl.ts";
export { pt } from "./locales/pt.ts";
export { ptBR } from "./locales/pt-BR.ts";
export { ru } from "./locales/ru.ts";
export { se } from "./locales/se.ts";
export { sl } from "./locales/sl.ts";
export { sv } from "./locales/sv.ts";
export { th } from "./locales/th.ts";
export { tr } from "./locales/tr.ts";
export { uk } from "./locales/uk.ts";
export { vi } from "./locales/vi.ts";
export { zhHans } from "./locales/zh-Hans.ts";
export { zhHant } from "./locales/zh-Hant.ts";
