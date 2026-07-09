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

/** InstUI spacing keywords (and the short pantoken aliases) → the matching space token. */
const SPACE_KEYWORDS: Record<string, string> = {
  "0": "0",
  none: "0",
  "2xs": "var(--instui-spacing-space2xs)",
  "xx-small": "var(--instui-spacing-space2xs)",
  "xxx-small": "var(--instui-spacing-space2xs)",
  xs: "var(--instui-spacing-space-xs)",
  "x-small": "var(--instui-spacing-space-xs)",
  sm: "var(--instui-spacing-space-sm)",
  small: "var(--instui-spacing-space-sm)",
  md: "var(--instui-spacing-space-md)",
  medium: "var(--instui-spacing-space-md)",
  lg: "var(--instui-spacing-space-lg)",
  large: "var(--instui-spacing-space-lg)",
  xl: "var(--instui-spacing-space-xl)",
  "x-large": "var(--instui-spacing-space-xl)",
  "2xl": "var(--instui-spacing-space2xl)",
  "xx-large": "var(--instui-spacing-space2xl)",
};

/**
 * Resolve ONE spacing value: an InstUI keyword (or short alias) → its space token, else the value
 * verbatim so raw CSS lengths pass through (e.g. `2rem`, `10px`, `auto`).
 *
 * @param value - A single keyword or CSS length.
 * @returns The resolved CSS value.
 */
export function resolveSpace(value: string): string {
  const v = value.trim();
  return SPACE_KEYWORDS[v] ?? v;
}

/**
 * Resolve an InstUI-style shorthand — 1–4 space-separated spacing values like `small` or
 * `small none small` (each a keyword or a raw length) — to a CSS `margin`/`padding` value. Empty/absent
 * → `""` (clears the property).
 *
 * @param attr - The raw attribute value, or `null`.
 * @returns The resolved CSS value.
 */
export function spacingValue(attr: string | null): string {
  if (!attr?.trim()) return "";
  return attr.trim().split(/\s+/u).map(resolveSpace).join(" ");
}

/** The logical + physical side suffixes a `margin-<side>`/`padding-<side>` attribute may target. */
const SPACING_SIDES = [
  "top",
  "right",
  "bottom",
  "left",
  "inline",
  "block",
  "inline-start",
  "inline-end",
  "block-start",
  "block-end",
];

/**
 * Apply the InstUI-/CSS-style spacing attributes on `host` to its inline style: the `margin` and
 * `padding` shorthands (1–4 keyword/length values), plus per-side `margin-<side>` / `padding-<side>`
 * (e.g. `margin-top`, `padding-inline-start`) whose side is a physical or logical edge. Managed
 * properties are cleared first, so removing an attribute removes its style. Idempotent — safe to
 * re-run on any attribute change.
 *
 * @param host - The custom-element host to style.
 */
export function applySpacing(host: HTMLElement): void {
  for (const box of ["margin", "padding"] as const) {
    host.style.removeProperty(box);
    for (const side of SPACING_SIDES) host.style.removeProperty(`${box}-${side}`);
    const shorthand = host.getAttribute(box);
    if (shorthand) host.style.setProperty(box, spacingValue(shorthand));
  }
  for (const name of host.getAttributeNames()) {
    const match = /^(margin|padding)-(.+)$/u.exec(name);
    if (match && SPACING_SIDES.includes(match[2])) {
      host.style.setProperty(name, resolveSpace(host.getAttribute(name) ?? ""));
    }
  }
}
