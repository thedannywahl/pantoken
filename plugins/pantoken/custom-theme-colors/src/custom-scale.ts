/**
 * OKLCH color math for deriving a full primitive scale from one arbitrary brand hex. Dependency-free
 * so a browser can derive a scale from a precomputed {@link ReferenceCurve} without the token set.
 */

/** An OKLCH color: `l` 0–1, `c` chroma, `h` hue in radians. */
export interface Oklch {
  l: number;
  c: number;
  h: number;
}

/** Per-step reference lightness and normalized chroma, index-aligned with `steps`. JSON-safe. */
export interface ReferenceCurve {
  steps: readonly number[];
  lightness: readonly number[];
  chromaProfile: readonly number[];
}

/** A derived custom primitive scale. */
export interface CustomColorScale {
  /** The validated input, normalized to lowercase `#rrggbb`. */
  input: string;
  /** The step whose reference lightness is nearest the input's. */
  anchorStep: number;
  /** Every primitive step mapped to its derived `#rrggbb`. */
  steps: ReadonlyMap<number, string>;
}

const HEX_INPUT = /^#?(?:[0-9a-f]{3}|[0-9a-f]{6})$/iu;
// Families whose peak chroma sits below this are neutrals and would flatten the chroma shape.
const NEUTRAL_CHROMA = 0.03;
const GAMUT_EPSILON = 1e-4;

/**
 * Validate and normalize a user-supplied hex color. This is the only entry point for untrusted
 * input into generated CSS, so anything but `#rgb`/`#rrggbb` is rejected.
 *
 * @param input - A hex color, with or without the leading `#`.
 * @returns Lowercase `#rrggbb`.
 * @throws TypeError when `input` isn't a 3- or 6-digit hex color.
 */
export function parseHexColor(input: string): string {
  const trimmed = typeof input === "string" ? input.trim() : "";
  if (!HEX_INPUT.test(trimmed)) throw new TypeError(`Invalid hex color: ${JSON.stringify(input)}`);
  const body = trimmed.replace("#", "").toLowerCase();
  return body.length === 3 ? `#${body.replace(/./gu, (ch) => `${ch}${ch}`)}` : `#${body}`;
}

/**
 * Whether a value is a valid {@link parseHexColor} input.
 *
 * @param input - The value to check.
 * @returns `true` for `#rgb`/`#rrggbb` strings.
 */
export function isHexColor(input: unknown): input is string {
  return typeof input === "string" && HEX_INPUT.test(input.trim());
}

function toLinear(channel: number): number {
  return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
}

function fromLinear(channel: number): number {
  return channel <= 0.0031308 ? channel * 12.92 : 1.055 * channel ** (1 / 2.4) - 0.055;
}

/**
 * Convert `#rrggbb` to OKLCH.
 *
 * @param hex - Lowercase `#rrggbb`.
 * @returns The OKLCH color.
 */
export function hexToOklch(hex: string): Oklch {
  const [r, g, b] = [1, 3, 5].map((i) => toLinear(Number.parseInt(hex.slice(i, i + 2), 16) / 255));
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  return { l: L, c: Math.hypot(A, B), h: Math.atan2(B, A) };
}

function oklchToLinearRgb({ l: L, c, h }: Oklch): [number, number, number] {
  const A = c * Math.cos(h);
  const B = c * Math.sin(h);
  const l = (L + 0.3963377774 * A + 0.2158037573 * B) ** 3;
  const m = (L - 0.1055613458 * A - 0.0638541728 * B) ** 3;
  const s = (L - 0.0894841775 * A - 1.291485548 * B) ** 3;
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
}

function inGamut(rgb: readonly number[]): boolean {
  return rgb.every((v) => v >= -GAMUT_EPSILON && v <= 1 + GAMUT_EPSILON);
}

/**
 * Convert OKLCH to `#rrggbb`, reducing chroma (keeping lightness and hue) until it fits sRGB.
 *
 * @param color - The OKLCH color.
 * @returns Lowercase `#rrggbb`.
 */
export function oklchToHex(color: Oklch): string {
  let rgb = oklchToLinearRgb(color);
  if (!inGamut(rgb)) {
    let low = 0;
    let high = color.c;
    for (let i = 0; i < 24; i += 1) {
      const mid = (low + high) / 2;
      if (inGamut(oklchToLinearRgb({ ...color, c: mid }))) low = mid;
      else high = mid;
    }
    rgb = oklchToLinearRgb({ ...color, c: low });
  }
  return `#${rgb
    .map((v) =>
      Math.round(fromLinear(Math.min(1, Math.max(0, v))) * 255)
        .toString(16)
        .padStart(2, "0"),
    )
    .join("")}`;
}

/**
 * Average the built-in families into a per-step lightness curve and chroma shape.
 *
 * @param stepHexes - For each family, its `#rrggbb` value at every step.
 * @param steps - The primitive steps, lightest first.
 * @returns The {@link ReferenceCurve}.
 */
export function buildReferenceCurve(
  stepHexes: readonly ReadonlyMap<number, string>[],
  steps: readonly number[],
): ReferenceCurve {
  const families = stepHexes
    .map((family) => steps.map((step) => family.get(step)))
    .filter((values): values is string[] => values.every(Boolean))
    .map((values) => values.map(hexToOklch));
  const chromatic = families.filter(
    (family) => Math.max(...family.map((color) => color.c)) >= NEUTRAL_CHROMA,
  );

  const lightness = steps.map((_, i) => {
    const ls = families.map((family) => family[i]!.l);
    return ls.reduce((sum, v) => sum + v, 0) / (ls.length || 1);
  });
  const chromaProfile = steps.map((_, i) => {
    const cs = chromatic.map((family) => family[i]!.c / Math.max(...family.map((c) => c.c)));
    return cs.reduce((sum, v) => sum + v, 0) / (cs.length || 1);
  });
  return { steps: [...steps], lightness, chromaProfile };
}

/**
 * Derive a full primitive scale from one hex: anchor it at the step with the nearest reference
 * lightness, then rebuild every step at its reference lightness with the input's hue and a chroma
 * scaled by the reference shape.
 *
 * @param hex - A hex color accepted by {@link parseHexColor}.
 * @param curve - Output of {@link buildReferenceCurve}.
 * @returns The {@link CustomColorScale}.
 */
export function deriveScale(hex: string, curve: ReferenceCurve): CustomColorScale {
  const input = parseHexColor(hex);
  const source = hexToOklch(input);

  let anchor = 0;
  let nearest = Number.POSITIVE_INFINITY;
  curve.lightness.forEach((l, i) => {
    const distance = Math.abs(l - source.l);
    if (distance < nearest) {
      nearest = distance;
      anchor = i;
    }
  });

  const anchorShape = curve.chromaProfile[anchor] ?? 0;
  const steps = new Map<number, string>();
  curve.steps.forEach((step, i) => {
    const shape = curve.chromaProfile[i] ?? 0;
    const c = anchorShape > 0 ? (source.c * shape) / anchorShape : source.c;
    steps.set(step, oklchToHex({ l: curve.lightness[i]!, c, h: source.h }));
  });
  return { input, anchorStep: curve.steps[anchor]!, steps };
}
