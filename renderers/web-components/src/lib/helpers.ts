/**
 * Pure string/date helpers shared across the elements: HTML/attribute escaping and the local-date
 * ISO utilities the calendar and date pickers use. No DOM, no side effects — safe to import anywhere.
 *
 * @module
 */

/** Escape text destined for shadow-root HTML. */
export const esc = (value: string): string =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Allow navigable schemes and same-origin relative references; reject executable and network-path URLs. */
export function safeHref(value: string | null): string | undefined {
  const href = value;
  if (!href || href !== href.trim()) return undefined;
  for (const character of href) {
    const code = character.charCodeAt(0);
    if (code <= 0x20 || code === 0x7f || character === "\\") return undefined;
  }
  const scheme = /^([a-z][a-z\d+.-]*):/iu.exec(href)?.[1]?.toLowerCase();
  if (
    scheme &&
    !(
      ((scheme === "http" || scheme === "https") && /^https?:\/\//iu.test(href)) ||
      ((scheme === "mailto" || scheme === "tel") && href.length > scheme.length + 1)
    )
  ) {
    return undefined;
  }
  if (!scheme && href.startsWith("//")) return undefined;
  try {
    const base = new URL("https://pantoken.invalid/");
    const url = new URL(href, base);
    if (scheme) {
      return ["http:", "https:", "mailto:", "tel:"].includes(url.protocol) ? href : undefined;
    }
    return url.origin === base.origin ? href : undefined;
  } catch {
    return undefined;
  }
}

/** Sanitize an attribute value used as a class-name fragment (modifiers, sizes). */
export const frag = (value: string | null): string => (value ?? "").replace(/[^a-z0-9-]/giu, "");

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
