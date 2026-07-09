/**
 * Pure string/date helpers shared across the elements: HTML/attribute escaping and the local-date
 * ISO utilities the calendar and date pickers use. No DOM, no side effects — safe to import anywhere.
 *
 * @module
 */

/** Escape text destined for shadow-root HTML. */
export const esc = (value: string): string =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Sanitize an attribute value used as a class-name fragment (modifiers, sizes). */
export const frag = (value: string | null): string => (value ?? "").replace(/[^a-z0-9-]/giu, "");

/** Weekday column headers, Sunday-first. */
export const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

/** Local-date ISO (`yyyy-mm-dd`) — sidesteps the UTC shift of `Date.prototype.toISOString`. */
export const isoDate = (date: Date): string =>
  `${String(date.getFullYear())}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

/** Parse a `yyyy-mm-dd` string to a local `Date`, or `null` when malformed. */
export const parseIsoDate = (value: string): Date | null => {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/u.exec(value.trim());
  if (!match) return null;
  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  return Number.isNaN(date.getTime()) ? null : date;
};
