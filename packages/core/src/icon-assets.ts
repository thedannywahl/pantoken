/**
 * Native icon-asset emitters. Icons live in the IR as `<image>` tokens (data-URI SVGs); this module
 * decodes them and converts to platform asset formats. `toVectorDrawable` handles the SVG primitive
 * set the Instructure icons use (path, line, circle, rect, polyline, polygon) — enough to lift the
 * native platforms from styles-only to icons + styles.
 *
 * @module
 */
import { camelCase } from "@pantoken/utils";
import type { Token } from "./model.ts";

const DATA_PREFIX = "data:image/svg+xml;utf8,";

/**
 * Decode an icon token's `url('data:…')` value back to inline SVG.
 *
 * @example
 * ```ts
 * import { decodeIconSvg } from "@pantoken/core";
 *
 * const svg = "<svg viewBox='0 0 24 24'><path d='M1 1'/></svg>";
 * const value = `url('data:image/svg+xml;utf8,${encodeURIComponent(svg)}')`;
 * decodeIconSvg(value); // → "<svg viewBox='0 0 24 24'><path d='M1 1'/></svg>"
 * ```
 */
export function decodeIconSvg(value: string): string {
  const inner = /^url\(\s*'?(.*?)'?\s*\)$/.exec(value.trim())?.[1] ?? value;
  if (!inner.startsWith(DATA_PREFIX)) return "";
  try {
    return decodeURIComponent(inner.slice(DATA_PREFIX.length));
  } catch {
    return "";
  }
}

/**
 * Map every icon token to its decoded SVG (keyed by name without the `--instui-icon-` prefix).
 *
 * @example
 * ```ts
 * import { buildTokens, getIconSvgs } from "@pantoken/core";
 *
 * const svgs = getIconSvgs(buildTokens());
 * svgs.get("arrow-left"); // → inline SVG markup for the arrow-left glyph (non-icon tokens skipped)
 * ```
 */
export function getIconSvgs(tokens: readonly Token[]): Map<string, string> {
  const out = new Map<string, string>();
  for (const token of tokens) {
    if (token.meta?.kind !== "icon") continue;
    const svg = decodeIconSvg(token.value);
    if (svg) out.set(token.name.replace(/^--instui-icon-/, ""), svg);
  }
  return out;
}

function attr(tag: string, name: string): string | undefined {
  return new RegExp(`\\b${name}=["']([^"']*)["']`).exec(tag)?.[1];
}

const STROKED_RE = /\bstroke=["'](?!none)[^"']+["']/;

function nums(value: string | undefined): number[] {
  return (value ?? "")
    .split(/[\s,]+/)
    .filter(Boolean)
    .map(Number);
}

/** Convert a single SVG shape element to VectorDrawable `pathData`, or `undefined` if unsupported. */
function shapeToPathData(tagName: string, el: string): string | undefined {
  switch (tagName) {
    case "path":
      return attr(el, "d");
    case "line": {
      const [x1, y1, x2, y2] = [attr(el, "x1"), attr(el, "y1"), attr(el, "x2"), attr(el, "y2")].map(
        Number,
      );
      return `M${x1},${y1} L${x2},${y2}`;
    }
    case "circle": {
      const cx = Number(attr(el, "cx"));
      const cy = Number(attr(el, "cy"));
      const r = Number(attr(el, "r"));
      return `M${cx - r},${cy} a${r},${r} 0 1,0 ${r * 2},0 a${r},${r} 0 1,0 ${-r * 2},0`;
    }
    case "rect": {
      const x = Number(attr(el, "x") ?? "0");
      const y = Number(attr(el, "y") ?? "0");
      const w = Number(attr(el, "width"));
      const h = Number(attr(el, "height"));
      return `M${x},${y} h${w} v${h} h${-w} z`;
    }
    case "polyline":
    case "polygon": {
      const pts = nums(attr(el, "points"));
      if (pts.length < 4) return undefined;
      const parts: string[] = [`M${pts[0]},${pts[1]}`];
      for (let i = 2; i < pts.length; i += 2) parts.push(`L${pts[i]},${pts[i + 1]}`);
      if (tagName === "polygon") parts.push("z");
      return parts.join(" ");
    }
    default:
      return undefined;
  }
}

/** Options for {@link toVectorDrawable}. */
export interface VectorDrawableOptions {
  /** The colour applied to the drawable (default `#FF000000`; tint at usage). */
  color?: string;
}

/**
 * Convert an inline SVG to an Android VectorDrawable XML string. Stroke-based icons (Lucide) emit
 * `strokeColor`/`strokeWidth`; fill-based icons (Custom) emit `fillColor`.
 *
 * @param svg - Inline SVG markup.
 * @param options - {@link VectorDrawableOptions}.
 * @returns The VectorDrawable XML.
 *
 * @example A stroke-based (Lucide) icon emits strokeColor
 * ```ts
 * import { toVectorDrawable } from "@pantoken/core";
 *
 * const xml = toVectorDrawable(
 *   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
 *     '<path d="M5 12h14"/></svg>',
 * );
 * // → <vector …> with android:strokeColor and android:pathData="M5 12h14"
 * ```
 *
 * @example A fill-based (Custom) icon with a tint colour emits fillColor
 * ```ts
 * import { toVectorDrawable } from "@pantoken/core";
 *
 * toVectorDrawable('<svg viewBox="0 0 24 24"><path d="M0 0h24v24H0z"/></svg>', {
 *   color: "#FF0374B5",
 * });
 * // → <vector …> with android:fillColor="#FF0374B5"
 * ```
 */
export function toVectorDrawable(svg: string, options: VectorDrawableOptions = {}): string {
  const color = options.color ?? "#FF000000";
  const viewBox = nums(/viewBox=["']([^"']+)["']/.exec(svg)?.[1]);
  const [vw, vh] = viewBox.length === 4 ? [viewBox[2], viewBox[3]] : [24, 24];

  // The root <svg …> tag only (so a child's stroke doesn't count as the root default).
  const rootTag = /<svg\b[^>]*>/.exec(svg)?.[0] ?? "";
  const rootStroke = STROKED_RE.test(rootTag);
  const strokeWidth = attr(rootTag, "stroke-width") ?? "2";

  const paths: string[] = [];
  for (const [, tagName, el] of svg.matchAll(
    /<(path|line|circle|rect|polyline|polygon)\b([^>]*)>/g,
  )) {
    const data = shapeToPathData(tagName, el);
    if (!data) continue;
    const stroked = rootStroke || STROKED_RE.test(el);
    const paint = stroked
      ? `android:strokeColor="${color}" android:strokeWidth="${strokeWidth}" android:strokeLineCap="round" android:strokeLineJoin="round"`
      : `android:fillColor="${color}"`;
    paths.push(`  <path ${paint} android:pathData="${data}"/>`);
  }

  return [
    `<vector xmlns:android="http://schemas.android.com/apk/res/android"`,
    `  android:width="${vw}dp" android:height="${vh}dp"`,
    `  android:viewportWidth="${vw}" android:viewportHeight="${vh}">`,
    ...paths,
    `</vector>`,
    "",
  ].join("\n");
}

/** A generated file: a repo-relative path and its contents. */
export interface AssetFile {
  path: string;
  content: string;
}

/**
 * Build the files for an Xcode asset-catalog imageset holding an SVG (with vector preservation, so
 * it scales and tints on iOS 13+). Returns the `.svg` and its `Contents.json`.
 *
 * @param name - The icon name (imageset folder name).
 * @param svg - Inline SVG markup.
 * @returns The imageset's files, paths relative to the `.xcassets` root.
 *
 * @example
 * ```ts
 * import { toXcodeImageset } from "@pantoken/core";
 *
 * const files = toXcodeImageset("arrow-left", "<svg viewBox='0 0 24 24'/>");
 * // → [
 * //   { path: "arrow-left.imageset/arrow-left.svg", content: "<svg…" },
 * //   { path: "arrow-left.imageset/Contents.json", content: "{…preserves-vector-representation…}" },
 * // ]
 * ```
 */
export function toXcodeImageset(name: string, svg: string): AssetFile[] {
  const contents = {
    images: [{ filename: `${name}.svg`, idiom: "universal" }],
    info: { author: "pantoken", version: 1 },
    properties: { "preserves-vector-representation": true },
  };
  return [
    { path: `${name}.imageset/${name}.svg`, content: svg },
    { path: `${name}.imageset/Contents.json`, content: `${JSON.stringify(contents, null, 2)}\n` },
  ];
}

/**
 * Build a Flutter/Dart manifest of icon asset paths (for `flutter_svg`). Pair with the raw SVGs
 * copied under `assetDir`.
 *
 * @param names - Icon names.
 * @param assetDir - The asset directory the SVGs are copied to (default `assets/pantoken/icons`).
 * @returns Dart source declaring a `PanTokensIcons` class of asset-path constants.
 *
 * @example Default asset directory
 * ```ts
 * import { flutterIconManifest } from "@pantoken/core";
 *
 * flutterIconManifest(["arrow-left", "check-mark"]);
 * // → class PanTokensIcons {
 * //     static const String arrowLeft = 'assets/pantoken/icons/arrow-left.svg';
 * //     static const String checkMark = 'assets/pantoken/icons/check-mark.svg';
 * //   }
 * ```
 *
 * @example A custom asset directory
 * ```ts
 * import { flutterIconManifest } from "@pantoken/core";
 *
 * flutterIconManifest(["arrow-left"], "lib/icons");
 * // → static const String arrowLeft = 'lib/icons/arrow-left.svg';
 * ```
 */
export function flutterIconManifest(
  names: readonly string[],
  assetDir = "assets/pantoken/icons",
): string {
  const fields = names.map(
    (n) => `  static const String ${camelCase(n)} = '${assetDir}/${n}.svg';`,
  );
  return ["// GENERATED by @pantoken/core", "class PanTokensIcons {", ...fields, "}", ""].join(
    "\n",
  );
}
