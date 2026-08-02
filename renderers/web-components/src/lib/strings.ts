/**
 * Localizable UI strings for `@pantoken/web-components` elements and the derivation helpers.
 * All strings default to English; consumers override via `register(target, { strings })`.
 *
 * @module
 */
import englishBase from "../i18n.json" with { type: "json" };

/** All user-visible strings emitted by the web-component element set. */
export interface WebComponentStrings {
  /** `aria-label` for the calendar's "previous month" button. */
  prevMonth: string;
  /** `aria-label` for the calendar's "next month" button. */
  nextMonth: string;
  /** Weekday column headers in locale-appropriate first-day-of-week order. */
  weekdays: readonly [string, string, string, string, string, string, string];
  /** Default `aria-label` for `<instui-date-input>` when the `label` attribute is absent. */
  dateLabel: string;
  /** Default placeholder for the ISO date text field. */
  datePlaceholder: string;
  /** `aria-label` for the calendar-open trigger inside `<instui-date-input>`. */
  openCalendar: string;
  /** `aria-label` for the native time `<input>` inside `<instui-date-time-input>`. */
  timeLabel: string;
  /** Text for the synthesized Back row in `<instui-drilldown>`. */
  back: string;
}

/** English defaults used when no locale bundle is provided. */
export const ENGLISH_STRINGS: WebComponentStrings = {
  ...englishBase,
  // Weekday names are always derived at runtime via Intl.DateTimeFormat — not in the JSON.
  weekdays: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
};

/** First day of week as a JS `Date.getDay()` index (0=Sunday … 6=Saturday). */
export function resolveFirstDay(locale: string): number {
  try {
    // weekInfo.firstDay: 1=Mon…7=Sun; convert to JS 0=Sun…6=Sat
    const fi = (new Intl.Locale(locale) as unknown as { weekInfo?: { firstDay?: number } }).weekInfo
      ?.firstDay;
    if (typeof fi === "number") return fi === 7 ? 0 : fi;
  } catch {
    // Intl.Locale or weekInfo unavailable in this environment
  }
  return 0;
}

function weekdaysForLocale(
  locale: string,
  firstDay: number,
): readonly [string, string, string, string, string, string, string] {
  const fmt = new Intl.DateTimeFormat(locale, { weekday: "short" });
  // 2024-01-07 is a Sunday — use as the Sunday anchor for the 7-day reference window.
  const sun = new Date(2024, 0, 7);
  const all = Array.from({ length: 7 }, (_, i) =>
    fmt.format(new Date(sun.getTime() + i * 86_400_000)),
  );
  return [...all.slice(firstDay), ...all.slice(0, firstDay)] as [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
  ];
}

/**
 * Build a `WebComponentStrings` object for `locale`.
 * Weekday names are derived from `Intl.DateTimeFormat` (and rotated to the locale's first day of
 * week); all other strings fall back to English unless provided in `overrides`.
 */
export function makeStrings(
  locale: string,
  overrides?: Partial<WebComponentStrings>,
): WebComponentStrings {
  const firstDay = resolveFirstDay(locale);
  const weekdays = overrides?.weekdays ?? weekdaysForLocale(locale, firstDay);
  return { ...ENGLISH_STRINGS, ...overrides, weekdays };
}
