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

// lucide-react's default SVG attributes (dist/esm/defaultAttributes.js), applied to every icon.
const LUCIDE_SVG_ATTRS =
  'xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" ' +
  'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';

function lucideModuleToSvg(source: string): string | undefined {
  const match = source.match(/const __iconNode = (\[[\s\S]*?\]);/);
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

function readLucideGlyphs(uiIconsRoot: string, bidi: Set<string>): IconToken[] {
  const out: IconToken[] = [];
  let lucideDir: string;
  try {
    const requireFromUi = createRequire(join(uiIconsRoot, "package.json"));
    lucideDir = dirname(requireFromUi.resolve("lucide-react/package.json"));
  } catch {
    return out;
  }

  const genIndex = join(uiIconsRoot, "es/generated/lucide/index.js");
  if (!existsSync(genIndex)) return out;
  const wrapped = new Set(
    [...readFileSync(genIndex, "utf8").matchAll(/wrapLucideIcon\(Lucide\.([A-Za-z0-9]+)\)/g)].map(
      (m) => m[1],
    ),
  );

  const mainIndex = readFileSync(join(lucideDir, "dist/esm/lucide-react.js"), "utf8");
  const nameToFile = new Map<string, string>();
  for (const line of mainIndex.matchAll(/export \{([^}]+)\} from '\.\/icons\/([a-z0-9-]+)\.js'/g)) {
    for (const exp of line[1].matchAll(/default as ([A-Za-z0-9]+)/g)) {
      nameToFile.set(exp[1], line[2]);
    }
  }

  const iconsDir = join(lucideDir, "dist/esm/icons");
  const seen = new Set<string>();
  for (const name of wrapped) {
    const file = nameToFile.get(name);
    if (!file || seen.has(file)) continue;
    seen.add(file);
    const svg = lucideModuleToSvg(readFileSync(join(iconsDir, `${file}.js`), "utf8"));
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
  if ((includeInstui || includeLucide) && !uiIconsRoot) {
    console.warn("@instructure/ui-icons not found — skipping icon glyph extraction");
    return { glyphs: [], colors: iconColorTokens() };
  }

  const bidi = uiIconsRoot ? readBidirectional(uiIconsRoot) : new Set<string>();
  const byName = new Map<string, IconToken>();

  if (uiIconsRoot && includeLucide) {
    for (const t of readLucideGlyphs(uiIconsRoot, bidi)) byName.set(t.name, t);
  }
  if (uiIconsRoot && includeInstui) {
    // Custom overrides Lucide on name collisions.
    for (const t of readCustomGlyphs(uiIconsRoot, bidi)) byName.set(t.name, t);
  }

  const glyphs = [...byName.values()].sort((a, b) => (a.name < b.name ? -1 : 1));
  return { glyphs, colors: iconColorTokens() };
}

function iconColorTokens(): [string, string][] {
  return Object.entries(ICON_COLOR_SPECIAL_VALUES).map(([k, v]) => [`--instui-icon-color-${k}`, v]);
}
