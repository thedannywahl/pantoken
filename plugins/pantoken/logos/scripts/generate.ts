/**
 * Build-time generator for `@pantoken/plugin-logos`. Reads the vendored SVG logos under
 * `assets/logos/<product>/<layout>-<mode>.svg` (copied from Instructure's UX-guidelines shared
 * assets) and writes:
 *
 * - `generated/embedded.ts` — the parsed logo metadata plus each logo's SVG text, so the plugin
 *   ships them without a runtime file read.
 * - `generated/logos.css` — a `--instui-logo-<product>-<layout>-<mode>` custom property per logo,
 *   each set to a `url(data:image/svg+xml;base64,…)` image token, plus a typed `@property` registration
 *   per token (a `<url>` syntax and the data URI as `initial-value`) that the docs CSS-API table reads
 *   into its Type and Default columns.
 *
 * SVGs are small, so they're inlined as data URIs — the stylesheet is self-contained and the tokens
 * work anywhere `var()` does (`background-image`, `mask`, `content`).
 *
 * @module
 */
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const logosDir = join(root, "assets/logos");
const outDir = join(root, "generated");

/** Instructure products that ship logo assets. */
export const PRODUCTS: string[] = [
  "canvas",
  "igniteai",
  "instructure",
  "learnplatform",
  "mastery",
  "pantoken",
  "parchment",
];
// Longest-first so `icon-single-dot` matches before `icon`.
/** Recognised logo layout names, ordered longest-first so multi-word layouts win over `icon`. */
export const LAYOUTS: string[] = [
  "icon-single-dot",
  "icon-three-dot",
  "horizontal",
  "stacked",
  "icon",
];
/** Recognised color-treatment names for logo assets. */
export const COLOR_MODES: string[] = [
  "full-color-reversed",
  "full-color-bg",
  "full-color",
  "reversed-bg",
  "reversed",
  "current-color",
  "color",
  "dark",
  "light",
];
/** Recognised trailing language codes for localized wordmark variants, e.g. `horizontal-full-color-ar`. */
export const LANGS: string[] = [
  "ar",
  "el",
  "fa",
  "he",
  "hi",
  "hy",
  "jp",
  "ko",
  "ru",
  "th",
  "uk",
  "zh",
];

/** Script-local logo metadata; mirrors {@link LogoMeta} in `src/index.ts`. */
interface LogoMeta {
  product: string;
  layout: string;
  colorMode: string;
  lang?: string;
  name: string;
  path: string;
}

/**
 * Parse a logo filename stem (`<layout>-<mode>` or `<layout>-<mode>-<lang>`, without the `.svg`
 * extension) into its layout, color-mode, and optional language components.
 *
 * @param stem - The filename stem to parse, e.g. `"horizontal-color"` or
 *   `"horizontal-full-color-ar"`.
 * @returns The parsed `{ layout, colorMode, lang? }`, or `undefined` if the stem does not match any
 *   known layout + mode (+ lang) combination.
 */
export function parseStem(
  stem: string,
): { layout: string; colorMode: string; lang?: string } | undefined {
  for (const layout of LAYOUTS) {
    if (!stem.startsWith(`${layout}-`)) continue;
    const rest = stem.slice(layout.length + 1);
    for (const lang of LANGS) {
      if (!rest.endsWith(`-${lang}`)) continue;
      const mode = rest.slice(0, -(lang.length + 1));
      if (COLOR_MODES.includes(mode)) return { layout, colorMode: mode, lang };
    }
    if (COLOR_MODES.includes(rest)) return { layout, colorMode: rest };
  }
  return undefined;
}

const logos: LogoMeta[] = [];
const svgs: Record<string, string> = {};
for (const product of PRODUCTS) {
  let files: string[];
  try {
    files = readdirSync(join(logosDir, product)).toSorted();
  } catch {
    continue;
  }
  for (const file of files) {
    if (!file.endsWith(".svg")) continue;
    const parsed = parseStem(file.replace(/\.svg$/u, ""));
    if (!parsed) continue;
    const name = `${product}-${parsed.layout}-${parsed.colorMode}${parsed.lang ? `-${parsed.lang}` : ""}`;
    logos.push({
      product,
      layout: parsed.layout,
      colorMode: parsed.colorMode,
      ...(parsed.lang ? { lang: parsed.lang } : {}),
      name,
      path: `${product}/${file}`,
    });
    svgs[name] = readFileSync(join(logosDir, product, file), "utf8");
  }
}
logos.sort((a, b) => a.name.localeCompare(b.name));

/**
 * Encode a raw SVG string as a `data:image/svg+xml;base64,…` data URI.
 *
 * @param svg - The raw SVG markup to encode.
 * @returns The data URI string, suitable for `url()` in CSS or `src` in HTML.
 */
export const dataUri = (svg: string): string =>
  `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;

// One `url(data:…)` per logo, encoded once and reused by both the `:root` block and the `@property`
// registrations below (so the base64 is computed a single time, not twice).
const uriByName = new Map(logos.map((l) => [l.name, `url("${dataUri(svgs[l.name])}")`]));

// Every logo asset is a solid-fill SVG (a single flat color, or `currentColor`), so each one is
// maskable — pair it with the shared `-icon-<name>` painter (formats/components' `icon` utility,
// same convention as the InstUI icon set, Simple Icons, and custom-icons) so e.g.
// `-icon-canvas-icon-reversed` masks `--instui-logo-canvas-icon-reversed` in `currentColor`.
const glyphRule = (l: LogoMeta): string =>
  `.-icon-${l.name} { --pantoken-glyph: var(--instui-logo-${l.name}); }`;

const logosCss = [
  "/* Instructure product logos as image tokens (pantoken logos plugin) — generated, do not edit. */",
  ":root {",
  ...logos.map((l) => `  --instui-logo-${l.name}: ${uriByName.get(l.name)};`),
  "}",
  "",
  ...logos.map(glyphRule),
  "",
].join("\n");

// The cssdoc `@declaration` record for the static `logos.css` sheet only — NOT embedded in `LOGOS_CSS`
// (the runtime `toCss` output), so the plugin's emitted CSS stays doc-free. One `@cssproperty` per logo
// carries the prose description; the paired `@property` at-rule (below) carries the `<url>` type and the
// data-URI `initial-value`, which cssdoc reads into the CSS-API table's Type and Default columns.
const docProps = logos
  .map(
    (l) =>
      ` * @cssproperty --instui-logo-${l.name} — ${l.product} ${l.layout} logo (${l.colorMode}).`,
  )
  .join("\n");
const DOC = `/**
 * @declaration logos
 * @group Plugins
 * @summary Instructure product logos as CSS image tokens: \`--instui-logo-<product>-<layout>-<mode>\` holds a data-URI SVG, so a logo paints via e.g. \`background-image: var(--instui-logo-canvas-horizontal-color)\`.
${docProps}
 */`;

// A typed registration per logo: the value is a `<url>` (the repo types data-URI tokens as `<url>`, not
// the broader `<image>`), it cascades like an unregistered custom property (`inherits: true`), and its
// `initial-value` is the logo's own data URI. This duplicates the base64 into the sheet, so it roughly
// doubles `logos.css`; the payoff is a real Type/Default column per logo in the CSS-API docs.
const PROPERTY_RULES = logos
  .map(
    (l) =>
      `@property --instui-logo-${l.name} { syntax: "<url>"; inherits: true; initial-value: ${uriByName.get(l.name)}; }`,
  )
  .join("\n");

mkdirSync(outDir, { recursive: true });
// `:root` values lead (so plain imports get the tokens first), then the doc record, then the `@property`
// registrations — mirroring the stacking sheet's order so cssdoc folds the registrations into the record.
writeFileSync(join(outDir, "logos.css"), `${logosCss}${DOC}\n${PROPERTY_RULES}\n`);

// Doc-free per-product and per-individual-logo sheets (no `@declaration`/`@cssproperty` — those live
// only in the combined logos.css record), so CDN consumers can adopt one logo, a whole product's set,
// or everything — mirrors formats/components' per-component CSS split.
function sheetFor(subset: LogoMeta[]): string {
  const root = [
    ":root {",
    ...subset.map((l) => `  --instui-logo-${l.name}: ${uriByName.get(l.name)};`),
    "}",
    "",
  ].join("\n");
  const glyphs = subset.map(glyphRule).join("\n");
  const props = subset
    .map(
      (l) =>
        `@property --instui-logo-${l.name} { syntax: "<url>"; inherits: true; initial-value: ${uriByName.get(l.name)}; }`,
    )
    .join("\n");
  return `${root}${glyphs}\n${props}\n`;
}

let productSheetCount = 0;
for (const product of PRODUCTS) {
  const subset = logos.filter((l) => l.product === product);
  if (subset.length === 0) continue;
  writeFileSync(join(outDir, `${product}.css`), sheetFor(subset));
  productSheetCount++;
}
for (const logo of logos) {
  writeFileSync(join(outDir, `${logo.name}.css`), sheetFor([logo]));
}

const embedded = [
  "// GENERATED by scripts/generate.ts — do not edit by hand.",
  'import type { LogoMeta } from "../src/index.ts";',
  "",
  `export const LOGOS: LogoMeta[] = ${JSON.stringify(logos, null, 2)};`,
  "",
  `export const LOGO_SVGS: Record<string, string> = ${JSON.stringify(svgs, null, 2)};`,
  "",
  `export const LOGOS_CSS = ${JSON.stringify(logosCss)};`,
  "",
].join("\n");
writeFileSync(join(outDir, "embedded.ts"), embedded);

console.log(
  `✓ logos: ${logos.length} logos across ${new Set(logos.map((l) => l.product)).size} products ` +
    `(+ ${logos.length} per-logo and ${productSheetCount} per-product sheets)`,
);
