/**
 * Emit the default stylesheets for `@pantoken/components`:
 *
 * - `generated/base.css` — the opt-in global base/reset (document defaults).
 * - `generated/components.css` — the class-based components (button, alert, badge), `.instui-*`.
 * - `generated/prose.css` — the prose/content styling, scoped to `.pantoken-prose`.
 * - `generated/icons.css` — one `.instui-icon-<name>` glyph class per icon (large; kept separate).
 * - `generated/utilities.css` — cross-cutting spacing/colour utilities + the View primitive.
 *
 * Consumers that need a different prefix or scope call `componentsCss({ prefix })` /
 * `proseCss({ scope })` and write their own file (the renderers do this for their content root).
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { icons } from "@pantoken/icons";
import { tokens } from "@pantoken/tokens";
import { colorUtilitiesCss, tokenUtilitiesCss } from "@pantoken/utils";
import { css } from "../src/lib/css.ts";
import { fontsCss } from "./fonts.ts";
import {
  baseCss,
  componentsCss,
  ELEVATION_NAMES,
  iconGlyphsCss,
  layoutUtilitiesCss,
  proseCss,
  responsiveUtilitiesCss,
  selectCss,
  spacingUtilitiesCss,
  viewCss,
} from "../src/index.ts";

const outDir = resolve(import.meta.dirname, "../generated");
mkdirSync(outDir, { recursive: true });

// The shipped stylesheets carry the default `instui` prefix. The builders opt out of a prefix on any
// falsy value, so pass it explicitly here (the `prefix: null` opt-out is a consumer-side choice).
const opts = { prefix: "instui" } as const;

// The semantic colour "intents" worth exposing as override utilities — the surface/text/border
// vocabulary an author actually reaches for. This deliberately skips the control-state subtree
// (`interactive-*`), the data-viz palettes (`chart-*`), and one-off surfaces (`overlay-*`,
// `elevated-surface-*`, opacity, gradients): those aren't overrides you paint onto arbitrary elements.
const SEMANTIC_INTENTS = new Set([
  "base",
  "brand",
  "page",
  "container",
  "container-base",
  "container-dark",
  "dark",
  "muted",
  "strong",
  "success",
  "warning",
  "error",
  "info",
  "inverse",
  "on-color",
]);

// The semantic colour token names per family (the `--instui-color-*` layer — not primitives), kept to
// the intents above plus the full `accent-*` palette (ash…violet). Each name is intersected with the
// family's real tokens, so a utility is only ever emitted for a token that exists (e.g. no `fg-brand`,
// since there's no `--instui-color-text-brand`).
const names = (family: string): string[] => {
  const prefix = `--instui-color-${family}-`;
  return tokens
    .filter((t) => t.name.startsWith(prefix))
    .map((t) => t.name.slice(prefix.length))
    .filter((name) => SEMANTIC_INTENTS.has(name) || name.startsWith("accent-"))
    .sort();
};

// Full token names under a family prefix — fed to the token-to-class transformer, which maps each to
// its natural CSS property. One "family → one property" pass per group.
const family = (prefix: string): string[] =>
  tokens
    .filter((t) => t.name.startsWith(prefix))
    .map((t) => t.name)
    .sort();

// Semantic families that map cleanly to a single CSS property. Colour and spacing are excluded — they
// have bespoke builders (bg/fg/border, m/p) since one token maps to several properties there.
const tokenGroups = [
  { property: "font-family", tokens: family("--instui-font-family-") },
  { property: "font-weight", tokens: family("--instui-font-weight-") },
  { property: "line-height", tokens: family("--instui-line-height-") },
  { property: "border-radius", tokens: family("--instui-border-radius-") },
  { property: "border-width", tokens: family("--instui-border-width-") },
  { property: "opacity", tokens: family("--instui-opacity-") },
  // Elevation shadows are defined by elevationCss (in components.css), not the base IR; reference them.
  { property: "box-shadow", tokens: ELEVATION_NAMES.map((n) => `--instui-elevation-${n}`) },
];

writeFileSync(join(outDir, "base.css"), baseCss());
writeFileSync(join(outDir, "components.css"), componentsCss(opts));
// Internal (NOT shipped): every record in the `pfx-` authoring prefix — the cssdoc `providers` target
// (see formats/components/cssdoc.jsonc) that lets the per-file source-`.css` lint resolve sibling records
// named in `@structure` (e.g. tree-browser's `.pfx-icon`). Written under src/generated/ (gitignored),
// never added to the shipped sheets. cssdoc resolves siblings by record NAME/class, so this must carry
// EVERY record — including the TS-authored holdouts (button, heading, the input controls) that a plain
// concatenation of the `.css` sources would miss — which is exactly what `componentsCss` bundles.
const srcGenDir = resolve(import.meta.dirname, "../src/generated");
mkdirSync(srcGenDir, { recursive: true });
writeFileSync(join(srcGenDir, "_records.css"), componentsCss({ prefix: "pfx" }));
// Opt-in font loading — @font-face rules for the brand typeface, src → the shipped assets/fonts/.
writeFileSync(join(outDir, "fonts.css"), fontsCss(resolve(import.meta.dirname, "../assets/fonts")));
writeFileSync(join(outDir, "prose.css"), proseCss());
// Opt-in EXPERIMENTAL customizable-select enhancement (@supports base-select) for .instui-simple-select.
writeFileSync(join(outDir, "select.css"), selectCss(opts));
writeFileSync(
  join(outDir, "icons.css"),
  iconGlyphsCss(
    icons.map((icon) => icon.name),
    { ...opts, deprecatedAliases: true },
  ),
);
// `colorUtilitiesCss` is a generic emitter (in @pantoken/utils), so its CSS-API doc comment is authored
// here, where the InstUI-semantic palette is fed in.
// prettier-ignore
const colorDoc = css`/**
 * @utility color
 * @class .instui-text-danger
 * @summary Semantic colour utilities: \`.instui-bg-<name>\`, \`.instui-text-<name>\`, and \`.instui-stroke-<name>\` for the curated semantic palette.
 * @example <p class="instui-text-danger">Something went wrong.</p>
 */\n`;
writeFileSync(
  join(outDir, "utilities.css"),
  `${viewCss(opts)}\n${layoutUtilitiesCss(opts)}\n${responsiveUtilitiesCss(opts)}\n${spacingUtilitiesCss(opts)}\n${colorDoc}${colorUtilitiesCss(
    { background: names("background"), text: names("text"), stroke: names("stroke") },
    opts,
  )}\n${tokenUtilitiesCss(tokenGroups, opts)}`,
);
console.log(
  "✓ components: wrote base.css + components.css + fonts.css + prose.css + select.css + icons.css + utilities.css",
);
