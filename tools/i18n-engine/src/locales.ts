/**
 * Locale tier and lifecycle resolution — one axis (tiers), not two (per the localization-engine
 * plan's "Locale tiers" section). `exclude` removes a locale from the pipeline entirely;
 * everything else is expressed as tier membership, resolved in declaration order.
 *
 * @module
 */
import type { LocalesConfig, SpaceLocaleScope } from "./config.ts";

/**
 * True when `locale` matches a tier pattern: an exact BCP47 tag, a `"prefix*"` glob, or `"*"`.
 * Deliberately duplicated (not imported) from `tools/translation-adapters/src/drift-policy.ts` —
 * that package is deleted in Phase 5, so this engine doesn't take a dependency on it.
 */
export function localeMatchesPattern(pattern: string, locale: string): boolean {
  if (pattern === "*") return true;
  return pattern.endsWith("*") ? locale.startsWith(pattern.slice(0, -1)) : pattern === locale;
}

/** Name the first tier whose patterns match `locale`, in `tiers`' declaration order. */
export function resolveTier(tiers: LocalesConfig["tiers"], locale: string): string | undefined {
  for (const [tier, patterns] of Object.entries(tiers)) {
    if (patterns.some((pattern) => localeMatchesPattern(pattern, locale))) return tier;
  }
  return undefined;
}

/** A locale's full participation state in the pipeline. */
export interface LocaleStatus {
  locale: string;
  /** `undefined` when excluded, or when no tier's patterns match (a config gap, not a valid state). */
  tier: string | undefined;
  excluded: boolean;
}

/** Resolve one locale's tier + exclusion state from `locales.exclude`/`locales.tiers`. */
export function resolveLocaleStatus(locales: LocalesConfig, locale: string): LocaleStatus {
  const excluded = locales.exclude.includes(locale);
  return { locale, tier: excluded ? undefined : resolveTier(locales.tiers, locale), excluded };
}

/**
 * Move `locale` to `toTier`: remove it from every other tier's pattern list (leaving glob patterns
 * that still happen to match it untouched — this only edits exact-tag entries) and add an exact
 * entry to `toTier`, unless one of `toTier`'s existing patterns (e.g. a `"*"` catch-all) already
 * matches it. Returns a new `tiers` map; `locales.ts` never mutates its input.
 */
export function moveLocaleToTier(
  tiers: LocalesConfig["tiers"],
  locale: string,
  toTier: string,
): LocalesConfig["tiers"] {
  if (!(toTier in tiers)) {
    throw new Error(`Unknown tier "${toTier}" — add it to locales.tiers first`);
  }
  const next: Record<string, readonly string[]> = {};
  for (const [tier, patterns] of Object.entries(tiers)) {
    if (tier === toTier) continue;
    next[tier] = patterns.filter((pattern) => pattern !== locale);
  }
  const targetPatterns = tiers[toTier].filter((pattern) => pattern !== locale);
  const alreadyMatches = targetPatterns.some((pattern) => localeMatchesPattern(pattern, locale));
  next[toTier] = alreadyMatches ? targetPatterns : [...targetPatterns, locale];
  // Preserve declaration order (Object.entries/insertion order) with toTier's original position.
  const ordered: Record<string, readonly string[]> = {};
  for (const tier of Object.keys(tiers)) ordered[tier] = next[tier];
  return ordered;
}

/** Add `locale` to `exclude` (idempotent) — leaves entirely, not just demoted to a lenient tier. */
export function excludeLocale(locales: LocalesConfig, locale: string): LocalesConfig {
  if (locales.exclude.includes(locale)) return locales;
  return { ...locales, exclude: [...locales.exclude, locale] };
}

/** Remove `locale` from `exclude` (idempotent) — rejoins whatever tier its pattern already matches. */
export function includeLocale(locales: LocalesConfig, locale: string): LocalesConfig {
  if (!locales.exclude.includes(locale)) return locales;
  return { ...locales, exclude: locales.exclude.filter((l) => l !== locale) };
}

/** Every locale that participates in `spaceName`, applying the space's `only`/`exclude` scope. */
export function localesForSpace(
  allLocales: readonly string[],
  scope: SpaceLocaleScope | undefined,
): readonly string[] {
  if (!scope) return allLocales;
  if ("only" in scope) return allLocales.filter((l) => scope.only.includes(l));
  return allLocales.filter((l) => !scope.exclude.includes(l));
}
