/**
 * Emit the default stylesheets for `@pantoken/components`:
 *
 * - `generated/base.css` — the opt-in global base/reset (document defaults).
 * - `generated/components.css` — the class-based components (button, alert, badge), `.instui-*`.
 * - `generated/prose.css` — the prose/content styling, scoped to `.pantoken-prose`.
 * - `generated/icons.css` — one `.instui-icon-<name>` glyph class per icon (large; kept separate).
 * - `generated/utilities.css` — cross-cutting spacing/colour/layout utilities, including the global
 *   dual copies of `view`'s/`text`'s own modifiers (bare, or chained onto any component).
 *
 * Per-component CSS files (`generated/<name>.css`) are emitted separately by `scripts/build-entries.ts`
 * which only runs as part of `build`, not `generate`. This keeps the generate step (used by docs:dev)
 * from writing 46+ files on every hot-reload and triggering a workspace-observer loop.
 *
 * Consumers that need a different prefix or scope call `componentsCss({ prefix })` /
 * `proseCss({ scope })` and write their own file (the renderers do this for their content root).
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { applyMinify } from "@pantoken/plugin-props-minify";
import { icons } from "@pantoken/icons";
import { tokens } from "@pantoken/tokens";
import {
  colorUtilitiesCss,
  globalModifierSelector,
  tokenUtilitiesCss,
  type ColorUtilityEntry,
} from "@pantoken/utils";
import { css } from "../src/lib/css.ts";
import { fontsCss } from "./fonts.ts";
import {
  baseCss,
  componentsCss,
  cursorUtilitiesCss,
  ELEVATION_NAMES,
  gapCss,
  iconGlyphsCss,
  layoutUtilitiesCss,
  maskUtilityCss,
  overflowUtilitiesCss,
  positionUtilitiesCss,
  proseCss,
  responsiveUtilitiesCss,
  selectCss,
  spacingUtilitiesCss,
  stackingUtilityCss,
  transitionCss,
  truncateCss,
  visualDebugCss,
} from "../src/index.ts";
const outDir = resolve(import.meta.dirname, "../generated");
mkdirSync(outDir, { recursive: true });

const writeIfChanged = (path: string, next: string): void => {
  try {
    const prev = readFileSync(path, "utf8");
    if (prev === next) return;
  } catch {
    // no-op: write below
  }
  writeFileSync(path, next);
};

// The shipped stylesheets carry the default `instui` prefix. The builders opt out of a prefix on any
// falsy value, so pass it explicitly here (the `prefix: null` opt-out is a consumer-side choice).
const opts = { prefix: "instui" } as const;
/** Join a class prefix to its separator, matching `lib/helpers.ts`'s `ns()` (kept local here so this
 *  script doesn't need to pull in `helpers.ts`'s `@pantoken/utils` dependency just for one string join). */
const ns = (prefix: string): string => (prefix ? `${prefix}-` : "");

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
// have bespoke builders (bg/text/border, m/p) since one token maps to several properties there.
const tokenGroups = [
  { property: "font-family", tokens: family("--instui-font-family-") },
  { property: "font-weight", tokens: family("--instui-font-weight-") },
  { property: "font-size", tokens: family("--instui-font-size-") },
  { property: "line-height", tokens: family("--instui-line-height-") },
  { property: "border-radius", tokens: family("--instui-border-radius-") },
  { property: "border-width", tokens: family("--instui-border-width-") },
  { property: "opacity", tokens: family("--instui-opacity-") },
  // Elevation shadows are defined by elevationCss (in components.css), not the base IR; reference them.
  { property: "box-shadow", tokens: ELEVATION_NAMES.map((n) => `--instui-elevation-${n}`) },
];

// A handful of `view`'s/`text`'s own short-spelled modifier names are value-equal aliases of an
// already-emitted token-scale class above (or a literal, non-token value) — copied here as their own
// global dual rule rather than invented under a new class word. See docs/conventions/authoring.md.
const aliasRule = (name: string, prop: string, value: string): string =>
  `${globalModifierSelector(ns(opts.prefix), name)} { ${prop}: ${value}; }`;
const extraAliases = [
  // `-weight-bold` (text) — same value as the existing `.instui-font-weight-body-strong`.
  aliasRule("font-weight-bold", "font-weight", "var(--instui-font-weight-body-strong)"),
  // `-size-{xs,sm,lg,xl}` (text) — same values as the existing `.instui-font-size-text-*` scale.
  aliasRule("font-size-xs", "font-size", "var(--instui-font-size-text-xs)"),
  aliasRule("font-size-sm", "font-size", "var(--instui-font-size-text-sm)"),
  aliasRule("font-size-lg", "font-size", "var(--instui-font-size-text-lg)"),
  aliasRule("font-size-xl", "font-size", "var(--instui-font-size-text2xl)"),
  // `-size-xx-large` (text) — no matching generic tier; a genuinely new value.
  aliasRule("font-size-xx-large", "font-size", "2.375rem"),
  // `-border-radius-{circle,pill}` (view) — circle is a literal shape value; pill reuses the
  // existing `full` token.
  aliasRule("border-radius-circle", "border-radius", "50%"),
  aliasRule("border-radius-pill", "border-radius", "var(--instui-border-radius-full)"),
].join("\n");

const componentsSheet = componentsCss(opts);
writeFileSync(join(outDir, "base.css"), applyMinify(baseCss(), { flatten: true }));
writeFileSync(join(outDir, "components.css"), applyMinify(componentsSheet, { flatten: true }));
// component-icons.css: just the `--instui-icon-*` glyph tokens the component sheets actually reference
// (a small subset of the full ~1,777-icon set). Auto-detected from the component CSS, valued from the
// token IR. This lets per-component CDN delivery resolve its icons against the lean, icon-free token
// sheet (`@pantoken/css/style.lean.css`) without loading the entire icon set. Consumers who use
// `var(--instui-icon-*)` broadly should load the full token sheet or `icons.css` instead.
const usedIcons = [
  ...new Set([...componentsSheet.matchAll(/var\((--instui-icon-[a-z0-9-]+)\)/g)].map((m) => m[1])),
].sort();
const iconValues = new Map(tokens.map((t) => [t.name, t.value]));
const componentIconsBody = usedIcons
  .map((name) => {
    const value = iconValues.get(name);
    if (value === undefined)
      throw new Error(`component-icons: no token in the IR for referenced icon ${name}`);
    return `  ${name}: ${value};`;
  })
  .join("\n");
writeFileSync(
  join(outDir, "component-icons.css"),
  `/* Icon glyph tokens referenced by @pantoken/components (${usedIcons.length} of the full icon set) */\n:root {\n${componentIconsBody}\n}\n`,
);
// Internal (NOT shipped): every record in the `pfx-` authoring prefix — the cssdoc `providers` target
// (see formats/components/cssdoc.jsonc) that lets the per-file source-`.css` lint resolve sibling records
// named in `@structure` (e.g. tree-browser's `.pfx-icon`). Written under src/generated/ (gitignored),
// never added to the shipped sheets. cssdoc resolves siblings by record NAME/class, so this must carry
// EVERY record — including the TS-authored holdouts (button, heading, the input controls) that a plain
// concatenation of the `.css` sources would miss — which is exactly what `componentsCss` bundles.
const srcGenDir = resolve(import.meta.dirname, "../src/generated");
mkdirSync(srcGenDir, { recursive: true });
writeIfChanged(join(srcGenDir, "_records.css"), componentsCss({ prefix: "pfx" }));
// Opt-in font loading — @font-face rules for the brand typeface, src → the shipped assets/fonts/.
writeFileSync(join(outDir, "fonts.css"), fontsCss(resolve(import.meta.dirname, "../assets/fonts")));
writeFileSync(join(outDir, "prose.css"), applyMinify(proseCss(), { flatten: true }));
// Opt-in EXPERIMENTAL customizable-select enhancement (@supports base-select) for .instui-simple-select.
writeFileSync(join(outDir, "select.css"), applyMinify(selectCss(opts), { flatten: true }));
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
 * @selector .--text-danger
 * @global
 * @summary Semantic colour utilities: \`.--bg-<name>\`, \`.--text-<name>\` (aliased as \`.--color-<name>\`), and \`.--border-<name>\` for the curated semantic palette. Every one of these also has a component-attached alias modifier (for example \`-bg-danger\` on any \`.instui-<component>\`).
 * @example <p class="--text-danger">Something went wrong.</p>
 */\n`;
// `view`'s/`text`'s own component-specific token families, merged onto the SAME generic class words
// (`bg`/`border`/`text`) rather than inventing a parallel word — see docs/conventions/authoring.md.
// Names that already exist generically (brand/info/success/warning) are intentionally NOT repeated
// here: their view-surface tokens are confirmed literal `var()` aliases of the generic ones already
// emitted above, so re-emitting them would be a harmless but pointless duplicate rule.
const backgroundExtras: ColorUtilityEntry[] = [
  ["primary", "--instui-component-view-background-primary"],
  ["secondary", "--instui-component-view-background-secondary"],
  ["primary-inverse", "--instui-component-view-background-primary-inverse"],
  ["alert", "--instui-component-view-background-alert"],
  ["danger", "--instui-component-view-background-danger"],
  ["transparent", "transparent"],
];
const strokeExtras: ColorUtilityEntry[] = [
  ["primary", "--instui-color-stroke-base"],
  ["danger", "--instui-color-stroke-error"],
];
const textExtras: ColorUtilityEntry[] = [
  ["primary", "--instui-component-text-primary-color"],
  ["secondary", "--instui-component-text-muted-color"],
  [
    "brand",
    "light-dark(var(--instui-color-institutional-brand-primary), var(--instui-color-institutional-brand-font-color-dark))",
  ],
  ["danger", "--instui-component-text-error-color"],
  ["primary-inverse", "--instui-component-text-inverse-color"],
  ["secondary-inverse", "--instui-component-text-inverse-color"],
  ["primary-on", "--instui-component-text-base-on-color"],
  ["secondary-on", "--instui-component-text-muted-on-color"],
];
// `-color-ai`/`-color-ai-highlight` (text) — two properties, so it can't be a `[name, value]` pair.
const aiTextRule = `${globalModifierSelector(ns(opts.prefix), "text-ai")} { color: var(--instui-component-text-ai-color); background: var(--instui-component-text-ai-background-color); }`;
writeFileSync(
  join(outDir, "utilities.css"),
  `${layoutUtilitiesCss(opts)}\n${responsiveUtilitiesCss(opts)}\n${positionUtilitiesCss(opts)}\n${overflowUtilitiesCss(opts)}\n${cursorUtilitiesCss(opts)}\n${stackingUtilityCss(opts)}\n${maskUtilityCss(opts)}\n${transitionCss(opts)}\n${truncateCss(opts)}\n${visualDebugCss(opts)}\n${spacingUtilitiesCss(opts)}\n${gapCss(opts)}\n${colorDoc}${colorUtilitiesCss(
    {
      background: [...names("background"), ...backgroundExtras],
      text: [...names("text"), ...textExtras],
      stroke: [...names("stroke"), ...strokeExtras],
    },
    opts,
  )}\n${aiTextRule}\n${tokenUtilitiesCss(tokenGroups, opts)}\n${extraAliases}`,
);
console.log(
  `✓ components: wrote base.css + components.css + component-icons.css (${usedIcons.length} icons) + fonts.css + prose.css + select.css + icons.css + utilities.css`,
);
