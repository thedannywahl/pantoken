/**
 * Localization-engine runtime helpers (Phase 3 of `.claude/plans/localization-engine.md`) — MF2
 * message formatting, `Intl.*` wrappers bound to a locale, and RTL/bidi isolation. Node-free: this
 * ships to the browser (see `CLAUDE.md`).
 *
 * @module
 */
import { MessageFormat } from "messageformat";

/**
 * Format an MF2 `source` message for `locale`, substituting `params`. Throws on invalid MF2 syntax
 * — validate with `@pantoken/i18n-engine`'s `validateMf2` at build time, not at format time.
 *
 * `messageformat` already isolates each placeholder's formatted value in FSI/PDI bidi marks by
 * default (its `bidiIsolation: "default"` option) — {@link isolate} is for interpolation done
 * OUTSIDE of MF2 formatting, not needed here.
 */
export function formatMessage(
  locale: string,
  source: string,
  params?: Record<string, unknown>,
): string {
  return new MessageFormat(locale, source).format(params);
}

const FSI = "\u2068"; // First Strong Isolate
const PDI = "\u2069"; // Pop Directional Isolate

/**
 * Wrap `value` in Unicode bidi isolates (FSI/PDI) so it doesn't scramble the surrounding text's
 * direction — e.g. a Latin filename embedded in an Arabic sentence built with plain string
 * concatenation. `formatMessage` already does this for MF2 placeholders; use `isolate` only when
 * interpolating outside MF2.
 */
export function isolate(value: string): string {
  return `${FSI}${value}${PDI}`;
}

/** A locale-bound number formatter (thousands separators, currency, percent, etc.). */
export function formatNumber(
  locale: string,
  value: number,
  options?: Intl.NumberFormatOptions,
): string {
  return new Intl.NumberFormat(locale, options).format(value);
}

/** A locale-bound date/time formatter. */
export function formatDate(
  locale: string,
  value: Date | number,
  options?: Intl.DateTimeFormatOptions,
): string {
  return new Intl.DateTimeFormat(locale, options).format(value);
}

/** A locale-bound list formatter (e.g. `"a, b, and c"` in English, with correct conjunctions elsewhere). */
export function formatList(
  locale: string,
  items: readonly string[],
  options?: Intl.ListFormatOptions,
): string {
  return new Intl.ListFormat(locale, options).format(items);
}

/** A locale-bound relative-time formatter (e.g. `"3 days ago"`). */
export function formatRelativeTime(
  locale: string,
  value: number,
  unit: Intl.RelativeTimeFormatUnit,
  options?: Intl.RelativeTimeFormatOptions,
): string {
  return new Intl.RelativeTimeFormat(locale, options).format(value, unit);
}
