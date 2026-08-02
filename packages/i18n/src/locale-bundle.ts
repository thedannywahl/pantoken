/**
 * Leaf module imported by generated locale files. Keeping `LocaleBundle`, `defineBundle`, and
 * `makeStrings` here (rather than in `index.ts`) breaks the circular dependency that arises when
 * `index.ts` re-exports the locale barrel and the locale files import back from `index.ts`.
 *
 * @module
 */
import { makeStrings } from "@pantoken/web-components";
import type { WebComponentStrings } from "@pantoken/web-components";

export type { WebComponentStrings };
export { makeStrings };

/** A fully resolved locale bundle: BCP47 tag, direction, display label, and translated strings. */
export interface LocaleBundle {
  /** BCP47 locale tag (e.g. `"hu"`, `"ar"`, `"zh-Hans"`). */
  locale: string;
  /** Text direction. */
  dir: "ltr" | "rtl";
  /** Human-readable display label. */
  label: string;
  /** Translated UI strings for the web-component element set. */
  strings: WebComponentStrings;
}

/**
 * Create and validate a {@link LocaleBundle}. Throws when required fields are missing or `locale`
 * is not a non-empty string.
 *
 * @example
 * ```ts
 * export const myLocale = defineBundle({
 *   locale: "x-acme",
 *   dir: "ltr",
 *   label: "Acme Corp Internal",
 *   strings: makeStrings("en", { back: "Return" }),
 * });
 * ```
 */
export function defineBundle(config: LocaleBundle): LocaleBundle {
  if (!config.locale || typeof config.locale !== "string")
    throw new Error("LocaleBundle requires a non-empty locale string.");
  if (config.dir !== "ltr" && config.dir !== "rtl")
    throw new Error(`LocaleBundle "${config.locale}": dir must be "ltr" or "rtl".`);
  return Object.assign({}, config);
}
