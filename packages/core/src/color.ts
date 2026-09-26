/**
 * Minimal HSL and CIE LCH colour math for applying Tokens Studio `modify` extensions
 * (darken / lighten / alpha) to concrete hex colours.
 *
 * @module
 */
import { parseHexColor } from "@pantoken/utils";
import type { TokenModify } from "./model.ts";

interface Rgb {
  r: number;
  g: number;
  b: number;
  a: number;
}

/** Parse `#rgb`, `#rrggbb`, or `#rrggbbaa` to 0–255 channels. Returns `undefined` otherwise. */
function parseHex(hex: string): Rgb | undefined {
  const c = parseHexColor(hex);
  return c ? { r: c.r, g: c.g, b: c.b, a: c.a } : undefined;
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
    return { r: v, g: v, b: v, a: 1 };
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
  return { r: hue(h + 1 / 3) * 255, g: hue(h) * 255, b: hue(h - 1 / 3) * 255, a: 1 };
}

type Vector = [number, number, number];

function multiplyMatrix(matrix: readonly Vector[], vector: Vector): Vector {
  return matrix.map(
    (row) => row[0] * vector[0] + row[1] * vector[1] + row[2] * vector[2],
  ) as Vector;
}

function rgbToLch({ r, g, b }: Rgb): Vector {
  const linear = [r, g, b].map((channel) => {
    const value = channel / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  }) as Vector;
  const xyzD65 = multiplyMatrix(
    [
      [0.4123907993, 0.3575843394, 0.1804807884],
      [0.2126390059, 0.7151686788, 0.0721923154],
      [0.0193308187, 0.1191947798, 0.9505321522],
    ],
    linear,
  );
  const [x, y, z] = multiplyMatrix(
    [
      [1.0479298208, 0.0229467933, -0.0501922295],
      [0.0296278157, 0.9904344846, -0.017073825],
      [-0.0092430582, 0.0150551449, 0.7518742899],
    ],
    xyzD65,
  );
  const delta = 6 / 29;
  const f = (value: number): number =>
    value > delta ** 3 ? Math.cbrt(value) : value / (3 * delta ** 2) + 4 / 29;
  const fx = f(x / 0.96422);
  const fy = f(y);
  const fz = f(z / 0.82521);
  const labA = 500 * (fx - fy);
  const labB = 200 * (fy - fz);
  return [116 * fy - 16, Math.hypot(labA, labB), Math.atan2(labB, labA)];
}

function lchToRgb(lightness: number, chroma: number, hue: number): Rgb {
  const labA = chroma * Math.cos(hue);
  const labB = chroma * Math.sin(hue);
  const fy = (lightness + 16) / 116;
  const fx = fy + labA / 500;
  const fz = fy - labB / 200;
  const delta = 6 / 29;
  const finv = (value: number): number =>
    value > delta ? value ** 3 : 3 * delta ** 2 * (value - 4 / 29);
  const xyzD50: Vector = [0.96422 * finv(fx), finv(fy), 0.82521 * finv(fz)];
  const xyzD65 = multiplyMatrix(
    [
      [0.9554734527, -0.0230985369, 0.0632593087],
      [-0.0283697069, 1.009995458, 0.0210413989],
      [0.0123140017, -0.0205076964, 1.3303659366],
    ],
    xyzD50,
  );
  const linear = multiplyMatrix(
    [
      [3.2409699419, -1.5373831776, -0.4986107603],
      [-0.9692436363, 1.8759675015, 0.0415550574],
      [0.0556300797, -0.2039769589, 1.0569715142],
    ],
    xyzD65,
  );
  const gamma = (value: number): number =>
    255 * (value <= 0.0031308 ? 12.92 * value : 1.055 * value ** (1 / 2.4) - 0.055);
  return { r: gamma(linear[0]), g: gamma(linear[1]), b: gamma(linear[2]), a: 1 };
}

function formatHex({ r, g, b, a }: Rgb): string {
  const alpha = a < 1 ? toHex(a * 255) : "";
  return `#${toHex(r)}${toHex(g)}${toHex(b)}${alpha}`;
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
 * applyModify("#808080", { type: "darken", value: 0.5, space: "hsl" });  // → "#404040"
 * applyModify("#808080", { type: "lighten", value: 0.5, space: "hsl" }); // → "#c0c0c0"
 * applyModify("#808080", { type: "lighten", value: 0.5, space: "lch" }); // → "#bdbdbd"
 * applyModify("#ffffff", { type: "alpha", value: 0.5, space: "hsl" });   // → "#ffffff80"
 * ```
 *
 * @example Non-hex input returns undefined
 * ```ts
 * import { applyModify } from "@pantoken/core";
 *
 * applyModify("var(--x)", { type: "darken", value: 0.1, space: "hsl" }); // → undefined
 * ```
 */
export function applyModify(value: string, modify: TokenModify): string | undefined {
  const rgb = parseHex(value);
  if (!rgb) return undefined;

  if (modify.type === "alpha") {
    return formatHex({ ...rgb, a: modify.value });
  }

  let out: Rgb;
  if (modify.space === "lch") {
    const [lightness, chroma, hue] = rgbToLch(rgb);
    const nextLightness =
      modify.type === "darken"
        ? lightness * (1 - modify.value)
        : lightness + (100 - lightness) * modify.value;
    out = lchToRgb(Math.max(0, Math.min(100, nextLightness)), chroma, hue);
  } else {
    const [hue, saturation, lightness] = rgbToHsl(rgb);
    const nextLightness =
      modify.type === "darken"
        ? lightness * (1 - modify.value)
        : lightness + (1 - lightness) * modify.value;
    out = hslToRgb(hue, saturation, Math.max(0, Math.min(1, nextLightness)));
  }
  return formatHex({ ...out, a: rgb.a });
}

function trim(n: number): string {
  return String(Number(n.toFixed(6)));
}

/**
 * The CSS-expression form of {@link applyModify}: same maths, but applied to `base` at paint time
 * rather than to a hex at build time, so a `var(--instui-…)` origin survives into the stylesheet
 * and keeps tracking whatever that token resolves to (including a `light-dark()` pair, and any
 * runtime re-pointing of the primitive it derives from).
 *
 * Relative colour syntax resolves `l` on the 0–100 scale in both `hsl()` and `lch()`, and an
 * omitted alpha channel inherits the origin's — matching `applyModify`'s alpha passthrough.
 *
 * @param base - The origin colour: a `var(--token)`, a literal, or a nested expression.
 * @param modify - The Tokens Studio modifier to express.
 * @returns A CSS colour expression.
 *
 * @example
 * ```ts
 * import { modifyExpression } from "@pantoken/core";
 *
 * modifyExpression("var(--x)", { type: "alpha", value: 0.2, space: "hsl" });
 * // → "color-mix(in srgb, var(--x) 20%, transparent)"
 * modifyExpression("var(--x)", { type: "darken", value: 0.1, space: "hsl" });
 * // → "hsl(from var(--x) h s calc(l * 0.9))"
 * modifyExpression("var(--x)", { type: "lighten", value: 0.1, space: "hsl" });
 * // → "hsl(from var(--x) h s calc(l + (100 - l) * 0.1))"
 * ```
 */
export function modifyExpression(base: string, modify: TokenModify): string {
  if (modify.type === "alpha") {
    return `color-mix(in srgb, ${base} ${trim(modify.value * 100)}%, transparent)`;
  }
  const lightness =
    modify.type === "darken"
      ? `calc(l * ${trim(1 - modify.value)})`
      : `calc(l + (100 - l) * ${trim(modify.value)})`;
  return modify.space === "lch"
    ? `lch(from ${base} ${lightness} c h)`
    : `hsl(from ${base} h s ${lightness})`;
}
