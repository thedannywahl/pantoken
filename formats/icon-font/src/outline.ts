/**
 * Turn an icon SVG into a single **filled** glyph path (what a font glyph needs). Fill-based icons
 * (Instructure custom glyphs) pass through; stroke-based icons (Lucide) are converted from a
 * centerline stroke to a filled outline by flattening each subpath to points and offsetting it by
 * half the stroke width with round joins/caps (`points-on-path` + `clipper-lib`, pure JS).
 *
 * @module
 */
import ClipperLib from "clipper-lib";
import { pointsOnPath } from "points-on-path";

const SCALE = 100; // clipper works in integers; scale viewBox units up and back

function attr(tag: string, name: string): string | undefined {
  return new RegExp(`\\b${name}=["']([^"']*)["']`).exec(tag)?.[1];
}

const STROKED_RE = /\bstroke=["'](?!none)[^"']+["']/;

interface Subpath {
  d: string;
  closed: boolean;
}

function nums(value: string | undefined): number[] {
  return (value ?? "")
    .split(/[\s,]+/)
    .filter(Boolean)
    .map(Number);
}

/** Convert an SVG primitive element to a subpath `d` + closure. */
function primitiveToSubpath(tag: string, el: string): Subpath | undefined {
  switch (tag) {
    case "line": {
      const [x1, y1, x2, y2] = [attr(el, "x1"), attr(el, "y1"), attr(el, "x2"), attr(el, "y2")].map(
        Number,
      );
      return { d: `M${x1},${y1} L${x2},${y2}`, closed: false };
    }
    case "circle": {
      const cx = Number(attr(el, "cx"));
      const cy = Number(attr(el, "cy"));
      const r = Number(attr(el, "r"));
      return {
        d: `M${cx - r},${cy} a${r},${r} 0 1,0 ${r * 2},0 a${r},${r} 0 1,0 ${-r * 2},0`,
        closed: true,
      };
    }
    case "rect": {
      const x = Number(attr(el, "x") ?? "0");
      const y = Number(attr(el, "y") ?? "0");
      const w = Number(attr(el, "width"));
      const h = Number(attr(el, "height"));
      return { d: `M${x},${y} h${w} v${h} h${-w} z`, closed: true };
    }
    case "polyline":
    case "polygon": {
      const pts = nums(attr(el, "points"));
      if (pts.length < 4) return undefined;
      const parts = [`M${pts[0]},${pts[1]}`];
      for (let i = 2; i < pts.length; i += 2) parts.push(`L${pts[i]},${pts[i + 1]}`);
      if (tag === "polygon") parts.push("z");
      return { d: parts.join(" "), closed: tag === "polygon" };
    }
    default:
      return undefined;
  }
}

/** Split a path `d` into its subpaths (at each M/m), marking each closed if it contains z/Z. */
function splitSubpaths(d: string): Subpath[] {
  return (d.match(/[Mm][^Mm]*/g) ?? []).map((chunk) => ({
    d: chunk.trim(),
    closed: /[Zz]/.test(chunk),
  }));
}

/** A filled glyph path plus the SVG viewBox size to wrap it in. */
export interface GlyphPath {
  d: string;
  width: number;
  height: number;
}

/**
 * Produce a filled glyph path for an icon SVG.
 *
 * @param svg - Inline SVG markup.
 * @returns The filled path `d` (in viewBox coordinates) and the viewBox size.
 *
 * @example Outline a stroke-based (Lucide) icon and a fill-based icon
 * ```ts
 * import { svgToGlyphPath } from "@pantoken/icon-font";
 * import { getIcon } from "@pantoken/icons";
 *
 * const { d, width, height } = svgToGlyphPath(getIcon("arrow-left")!.svg);
 * // d: a single filled path; width/height: the viewBox size (e.g. 24, 24)
 * ```
 */
export function svgToGlyphPath(svg: string): GlyphPath {
  const vb = nums(/viewBox=["']([^"']+)["']/.exec(svg)?.[1]);
  const [width, height] = vb.length === 4 ? [vb[2], vb[3]] : [24, 24];
  const rootTag = /<svg\b[^>]*>/.exec(svg)?.[0] ?? "";
  const strokeWidth = Number(attr(rootTag, "stroke-width") ?? "2");
  const stroked = STROKED_RE.test(rootTag);

  const subpaths: Subpath[] = [];
  for (const [, tag, el] of svg.matchAll(/<(path|line|circle|rect|polyline|polygon)\b([^>]*)>/g)) {
    if (tag === "path") {
      const d = attr(el, "d");
      if (d) subpaths.push(...splitSubpaths(d));
    } else {
      const sub = primitiveToSubpath(tag, el);
      if (sub) subpaths.push(sub);
    }
  }

  // Fill icons are already regions — the font engine fills them directly.
  if (!stroked) return { d: subpaths.map((s) => s.d).join(" "), width, height };

  // Stroke icons: offset each subpath's centerline into a filled outline.
  const offset = new ClipperLib.ClipperOffset(2, 0.25);
  for (const sub of subpaths) {
    for (const poly of pointsOnPath(sub.d, 0.2, 0.2)) {
      if (poly.length < 2) continue;
      const path = poly.map(([x, y]) => ({ X: Math.round(x * SCALE), Y: Math.round(y * SCALE) }));
      offset.AddPath(
        path,
        ClipperLib.JoinType.jtRound,
        sub.closed ? ClipperLib.EndType.etClosedLine : ClipperLib.EndType.etOpenRound,
      );
    }
  }
  const solution = new ClipperLib.Paths();
  offset.Execute(solution, (strokeWidth / 2) * SCALE);
  const d = solution
    .map((poly) => `M${poly.map((pt) => `${pt.X / SCALE},${pt.Y / SCALE}`).join(" L")} Z`)
    .join(" ");
  return { d, width, height };
}
