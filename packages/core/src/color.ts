/**
 * Minimal colour math for applying Tokens Studio `modify` extensions (darken / lighten / alpha)
 * to concrete hex colours. Reference-valued modifiers are preserved as {@link TokenModify}
 * metadata instead, so the native (Style Dictionary) lineage can apply them precisely.
 *
 * @module
 */
import { parseHexColor } from "@pantoken/utils";
import type { TokenModify } from "./model.ts";

interface Rgb {
  r: number;
  g: number;
  b: number;
}

/** Parse `#rgb`, `#rrggbb`, or `#rrggbbaa` to 0–255 channels. Returns `undefined` otherwise. */
function parseHex(hex: string): Rgb | undefined {
  const c = parseHexColor(hex);
  return c ? { r: c.r, g: c.g, b: c.b } : undefined;
}

function toHex(n: number): string {
  return Math.max(0, Math.min(255, Math.round(n)))
    .toString(16)
    .padStart(2, "0");
}

function rgbToHsl({ r, g, b }: Rgb): [number, number, number] {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === rn) h = (gn - bn) / d + (gn < bn ? 6 : 0);
  else if (max === gn) h = (bn - rn) / d + 2;
  else h = (rn - gn) / d + 4;
  return [h / 6, s, l];
}

function hslToRgb(h: number, s: number, l: number): Rgb {
  if (s === 0) {
    const v = l * 255;
    return { r: v, g: v, b: v };
  }
  const hue = (t: number): number => {
    let tn = t;
    if (tn < 0) tn += 1;
    if (tn > 1) tn -= 1;
    if (tn < 1 / 6) return p + (q - p) * 6 * tn;
    if (tn < 1 / 2) return q;
    if (tn < 2 / 3) return p + (q - p) * (2 / 3 - tn) * 6;
    return p;
  };
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  return { r: hue(h + 1 / 3) * 255, g: hue(h) * 255, b: hue(h - 1 / 3) * 255 };
}

/**
 * Apply a Tokens Studio {@link TokenModify} to a concrete hex colour.
 *
 * @returns The modified colour, or `undefined` when `value` is not a hex colour (so the caller
 *   can fall back to preserving the modifier as metadata).
 *
 * @example Darken, lighten, and add alpha
 * ```ts
 * import { applyModify } from "@pantoken/core";
 *
 * applyModify("#808080", { type: "darken", value: 0.5 });  // → "#404040"
 * applyModify("#808080", { type: "lighten", value: 0.5 }); // → "#c0c0c0"
 * applyModify("#ffffff", { type: "alpha", value: 0.5 });   // → "#ffffff80"
 * ```
 *
 * @example Non-hex input and mix return undefined (preserve as metadata)
 * ```ts
 * import { applyModify } from "@pantoken/core";
 *
 * applyModify("var(--x)", { type: "darken", value: 0.1 });        // → undefined
 * applyModify("#fff", { type: "mix", value: 0.5, color: "#000" }); // → undefined
 * ```
 */
export function applyModify(value: string, modify: TokenModify): string | undefined {
  const rgb = parseHex(value);
  if (!rgb) return undefined;

  if (modify.type === "alpha") {
    return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}${toHex(modify.value * 255)}`;
  }

  const [h, s, l] = rgbToHsl(rgb);
  const nl =
    modify.type === "darken"
      ? l * (1 - modify.value)
      : modify.type === "lighten"
        ? l + (1 - l) * modify.value
        : l;
  if (modify.type === "mix") return undefined; // mix needs a second colour; preserve as meta.
  const out = hslToRgb(h, s, Math.max(0, Math.min(1, nl)));
  return `#${toHex(out.r)}${toHex(out.g)}${toHex(out.b)}`;
}
