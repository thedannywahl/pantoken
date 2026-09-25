/**
 * Read glyphs from `@instructure/ui-icons` and turn each into an `<image>` icon token
 * (`url('data:image/svg+xml;utf8,…')`) with metadata (source, bidirectional, viewBox). Ported and
 * extended from `@instructure/instui-generate-css-tokens`'s `icons.ts`.
 *
 * @module
 */
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import type { TokenMeta } from "./model.ts";
import { ICON_COLOR_SPECIAL_VALUES, toKebab } from "./utils.ts";

const require = createRequire(import.meta.url);

/** Options controlling which icon sources are included. */
export interface CollectIconsOptions {
  /** Include Instructure-authored (Custom) glyphs (default: true). */
  includeInstui?: boolean;
  /** Include Lucide glyphs as `@instructure/ui-icons` exposes them (default: true). */
  includeLucide?: boolean;
}

/** A glyph token: its custom-property name, data-URI value, and icon metadata. */
export interface IconToken {
  name: string;
  value: string;
  meta: TokenMeta;
}

/** The icon layer: glyph tokens plus the icon-colour special values (`ai`, `inherit`). */
export interface IconLayer {
  glyphs: IconToken[];
  colors: [string, string][];
}

/**
 * Encode inline SVG markup as a `url('data:image/svg+xml;utf8,…')` value for an `<image>` token.
 *
 * @example
 * ```ts
 * import { svgToDataUri } from "@pantoken/core";
 *
 * svgToDataUri("<svg viewBox='0 0 24 24'><path d='M1 1'/></svg>");
 * // → "url('data:image/svg+xml;utf8,%3Csvg…')"
 * ```
 */
export function svgToDataUri(svgContent: string): string {
  return `url('data:image/svg+xml;utf8,${encodeURIComponent(svgContent)}')`;
}

function viewBoxOf(svg: string): string | undefined {
  return /viewBox="([^"]+)"/i.exec(svg)?.[1];
}

function resolvePackageDir(packageId: string): string | undefined {
  try {
    return dirname(require.resolve(`${packageId}/package.json`));
  } catch {
    return undefined;
  }
}

// Lucide's default SVG attributes, applied to every icon.
const LUCIDE_SVG_ATTRS =
  'xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" ' +
  'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';

function lucideModuleToSvg(source: string): string | undefined {
  const match = source.match(/const [A-Za-z_$][\w$]* = (\[[\s\S]*?\]);/);
  if (!match) return undefined;
  const json = match[1].replace(/([{,]\s*)([A-Za-z_]\w*)\s*:/g, '$1"$2":');
  const nodes = JSON.parse(json) as [string, Record<string, string | number>][];
  const elements = nodes
    .map(([tag, attrs]) => {
      const attrStr = Object.entries(attrs)
        .filter(([key]) => key !== "key")
        .map(([key, value]) => `${toKebab(key)}="${value}"`)
        .join(" ");
      return `<${tag} ${attrStr}/>`;
    })
    .join("");
  return `<svg ${LUCIDE_SVG_ATTRS}>${elements}</svg>`;
}

/** The set of icon names that flip horizontally in RTL, from ui-icons' `icons.config.cjs`. */
function readBidirectional(uiIconsRoot: string): Set<string> {
  try {
    const config = require(join(uiIconsRoot, "icons.config.cjs")) as {
      bidirectionalIcons?: string[];
    };
    if (Array.isArray(config.bidirectionalIcons)) {
      return new Set(config.bidirectionalIcons.map((n) => toKebab(n)));
    }
  } catch {
    // Config isn't shipped in every build — fall back to a name heuristic below.
  }
  return new Set();
}

const BIDI_HEURISTIC = /(^|-)(arrow|chevron|left|right|start|end|back|forward|next|previous)(-|$)/;

// The centred star used by InstUI 11.7.7's AI Spinner, sourced from igniteai-logo.svg without its sparkle.
const AI_SPINNER_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.0621 2.53451C11.3843 1.66389 12.6157 1.66389 12.9379 2.53451L15.0815 8.32767C15.1828 8.60139 15.3986 8.8172 15.6723 8.91848L21.4655 11.0621C22.3361 11.3843 22.3361 12.6157 21.4655 12.9379L15.6723 15.0815C15.3986 15.1828 15.1828 15.3986 15.0815 15.6723L12.9379 21.4655C12.6157 22.3361 11.3843 22.3361 11.0621 21.4655L8.91849 15.6723C8.8172 15.3986 8.60139 15.1828 8.32767 15.0815L2.53451 12.9379C1.66389 12.6157 1.66389 11.3843 2.53451 11.0621L8.32767 8.91849C8.60139 8.8172 8.8172 8.60139 8.91848 8.32767L11.0621 2.53451Z"/></svg>';

function supplementalInstuiGlyphs(): IconToken[] {
  return [
    {
      name: "--instui-icon-ai-spinner",
      value: svgToDataUri(AI_SPINNER_SVG),
      meta: {
        kind: "icon",
        source: "custom",
        style: "Custom",
        viewBox: "0 0 24 24",
        bidirectional: false,
      },
    },
  ];
}

function readCustomGlyphs(uiIconsRoot: string, bidi: Set<string>): IconToken[] {
  const out: IconToken[] = [];
  const dir = join(uiIconsRoot, "svg/Custom");
  if (!existsSync(dir)) return out;
  for (const file of readdirSync(dir).filter((f) => f.endsWith(".svg"))) {
    const name = toKebab(file.slice(0, -4));
    const svg = readFileSync(join(dir, file), "utf8");
    out.push({
      name: `--instui-icon-${name}`,
      value: svgToDataUri(svg),
      meta: {
        kind: "icon",
        source: "custom",
        style: "Custom",
        viewBox: viewBoxOf(svg),
        bidirectional: bidi.has(name) || BIDI_HEURISTIC.test(name),
      },
    });
  }
  return out;
}

/** Read an ESM module by base name, tolerating a `.js` or `.mjs` extension. */
function readEsmModule(dir: string, base: string): string | undefined {
  for (const ext of [".mjs", ".js"]) {
    const file = join(dir, `${base}${ext}`);
    if (existsSync(file)) return readFileSync(file, "utf8");
  }
  return undefined;
}

function readLucideGlyphs(lucideRoot: string, bidi: Set<string>): IconToken[] {
  const out: IconToken[] = [];
  const esmDir = join(lucideRoot, "dist/esm");
  const index = readEsmModule(esmDir, "iconsAndAliases");
  if (!index) return out;
  // Multiple export names may point at one module. Emit its canonical filename once, not aliases.
  const files = new Set(
    [...index.matchAll(/from ['"]\.\/icons\/([a-z0-9-]+)\.m?js['"]/g)].map((match) => match[1]),
  );

  const iconsDir = join(esmDir, "icons");
  for (const file of files) {
    const source = readEsmModule(iconsDir, file);
    const svg = source ? lucideModuleToSvg(source) : undefined;
    if (svg) {
      out.push({
        name: `--instui-icon-${file}`,
        value: svgToDataUri(svg),
        meta: {
          kind: "icon",
          source: "lucide",
          viewBox: "0 0 24 24",
          bidirectional: bidi.has(file) || BIDI_HEURISTIC.test(file),
        },
      });
    }
  }
  return out;
}

/**
 * Collect the unified InstUI icon layer. Custom glyphs take precedence over same-named Lucide
 * glyphs. Output is sorted by name for deterministic results.
 *
 * @example Collect every glyph plus the icon-colour special values
 * ```ts
 * import { collectIcons } from "@pantoken/core";
 *
 * const { glyphs, colors } = collectIcons();
 * // glyphs → IconToken[] (Custom + Lucide, name-sorted)
 * // colors → [["--instui-icon-color-ai", "…"], ["--instui-icon-color-inherit", "currentColor"]]
 * ```
 *
 * @example Restrict to Instructure-authored glyphs only
 * ```ts
 * import { collectIcons } from "@pantoken/core";
 *
 * const { glyphs } = collectIcons({ includeLucide: false });
 * // → only the Custom (Instructure-authored) glyphs
 * ```
 */
export function collectIcons(options: CollectIconsOptions = {}): IconLayer {
  const { includeInstui = true, includeLucide = true } = options;

  const uiIconsRoot = resolvePackageDir("@instructure/ui-icons");
  const lucideRoot = resolvePackageDir("lucide");
  if (includeInstui && !uiIconsRoot) {
    console.warn("@instructure/ui-icons not found — skipping Instructure custom icon extraction");
  }
  if (includeLucide && !lucideRoot) {
    console.warn("lucide not found — skipping Lucide icon extraction");
  }

  const bidi = uiIconsRoot ? readBidirectional(uiIconsRoot) : new Set<string>();
  const byName = new Map<string, IconToken>();

  if (lucideRoot && includeLucide) {
    for (const t of readLucideGlyphs(lucideRoot, bidi)) byName.set(t.name, t);
  }
  if (uiIconsRoot && includeInstui) {
    // Custom overrides Lucide on name collisions.
    for (const t of readCustomGlyphs(uiIconsRoot, bidi)) byName.set(t.name, t);
  }
  if (includeInstui) {
    for (const t of supplementalInstuiGlyphs()) byName.set(t.name, t);
  }

  const glyphs = [...byName.values()].sort((a, b) => (a.name < b.name ? -1 : 1));
  return { glyphs, colors: iconColorTokens() };
}

function iconColorTokens(): [string, string][] {
  return Object.entries(ICON_COLOR_SPECIAL_VALUES).map(([k, v]) => [`--instui-icon-color-${k}`, v]);
}
