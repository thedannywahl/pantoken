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
 */
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const logosDir = join(root, "assets/logos");
const outDir = join(root, "generated");

const PRODUCTS = ["canvas", "igniteai", "instructure", "learnplatform", "mastery", "parchment"];
// Longest-first so `icon-single-dot` matches before `icon`.
const LAYOUTS = ["icon-single-dot", "icon-three-dot", "horizontal", "stacked", "icon"];
const COLOR_MODES = [
  "full-color-reversed",
  "full-color-bg",
  "full-color",
  "reversed-bg",
  "reversed",
  "color",
  "dark",
  "light",
];

interface LogoMeta {
  product: string;
  layout: string;
  colorMode: string;
  name: string;
  path: string;
}

/** Parse `<layout>-<mode>` (filename without extension) into layout + colorMode. */
function parseStem(stem: string): { layout: string; colorMode: string } | undefined {
  for (const layout of LAYOUTS) {
    if (stem.startsWith(`${layout}-`)) {
      const mode = stem.slice(layout.length + 1);
      if (COLOR_MODES.includes(mode)) return { layout, colorMode: mode };
    }
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
    const name = `${product}-${parsed.layout}-${parsed.colorMode}`;
    logos.push({
      product,
      layout: parsed.layout,
      colorMode: parsed.colorMode,
      name,
      path: `${product}/${file}`,
    });
    svgs[name] = readFileSync(join(logosDir, product, file), "utf8");
  }
}
logos.sort((a, b) => a.name.localeCompare(b.name));

const dataUri = (svg: string): string =>
  `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;

// One `url(data:…)` per logo, encoded once and reused by both the `:root` block and the `@property`
// registrations below (so the base64 is computed a single time, not twice).
const uriByName = new Map(logos.map((l) => [l.name, `url("${dataUri(svgs[l.name])}")`]));

const logosCss = [
  "/* Instructure product logos as image tokens (pantoken logos plugin) — generated, do not edit. */",
  ":root {",
  ...logos.map((l) => `  --instui-logo-${l.name}: ${uriByName.get(l.name)};`),
  "}",
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
  `✓ logos: ${logos.length} logos across ${new Set(logos.map((l) => l.product)).size} products`,
);
