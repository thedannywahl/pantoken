/**
 * Hex-colour parsing (`#rgb`/`#rrggbb`/`#rrggbbaa` → {@link Rgba}).
 *
 * @module
 */

/** An RGBA colour: `r`/`g`/`b` are 0–255 integers, `a` is 0–1 (defaults to 1). */
export interface Rgba {
  r: number;
  g: number;
  b: number;
  a: number;
}

/**
 * Parse `#rgb`, `#rrggbb`, or `#rrggbbaa` to {@link Rgba}; returns `undefined` otherwise.
 *
 * @example
 * ```ts
 * import { parseHexColor } from "@pantoken/utils";
 *
 * parseHexColor("#fff");      // → { r: 255, g: 255, b: 255, a: 1 }
 * parseHexColor("#0374B5");   // → { r: 3, g: 116, b: 181, a: 1 }
 * parseHexColor("#00000080"); // → { r: 0, g: 0, b: 0, a: 0.5019… }
 * parseHexColor("nope");      // → undefined
 * ```
 */
export function parseHexColor(hex: string): Rgba | undefined {
  const m = /^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i.exec(hex.trim());
  if (!m) return undefined;
  let h = m[1];
  if (h.length === 3) h = h.replace(/(.)/g, "$1$1");
  return {
    r: Number.parseInt(h.slice(0, 2), 16),
    g: Number.parseInt(h.slice(2, 4), 16),
    b: Number.parseInt(h.slice(4, 6), 16),
    a: h.length === 8 ? Number.parseInt(h.slice(6, 8), 16) / 255 : 1,
  };
}
