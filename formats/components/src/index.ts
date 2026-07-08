/**
 * `@pantoken/components` — an InstUI-look CSS component library, built from the `--instui-*` tokens.
 *
 * The shipped stylesheets:
 *
 * - **Base** ({@link baseCss}) — opt-in global document defaults from the tokens (box-sizing, body
 *   reset, page surface, base text colour/font, `color-scheme`). It also carries the focus-outline
 *   ring, so every focusable gets an accessible `:focus-visible` outline out of the box. Load it when
 *   pantoken owns the page.
 * - **Prose** ({@link proseCss}) — styles rendered markdown/prose HTML (tables, headings, links,
 *   lists, code) scoped to a content root, so a docs page or content region looks like InstUI
 *   without swapping the DOM for components. This is what the site renderers ship as their
 *   `components.css`.
 * - **Components** ({@link buttonCss}, {@link alertCss}, {@link badgeCss}, aggregated by
 *   {@link componentsCss}) — class-based component styles you apply to your own markup
 *   (`<button class="instui-button">`), for the InstUI look outside a component framework. The
 *   `--instui-elevation-*` shadow scale ({@link elevationCss}) leads this sheet, since enough
 *   components float that shadows are an intrinsic design attribute rather than an add-on.
 * - **Utilities** ({@link viewCss}, {@link spacingUtilitiesCss}, {@link layoutUtilitiesCss}, plus a
 *   curated semantic-colour/token set) — an opt-in layer of cross-cutting classes. The generic
 *   token→class emitters (`colorUtilitiesCss`, `tokenUtilitiesCss`) live in `@pantoken/utils`; this
 *   package feeds them the curated *semantic* names, while `@pantoken/plugin-primitives` feeds the raw
 *   palette.
 * - **Fonts** (opt-in `fonts.css`) — the `@font-face` rules for the Instructure brand fonts. Base
 *   *applies* the font; `fonts.css` *loads* the woff2s, so text degrades gracefully without it.
 *
 * Everything is pure CSS derived from the token IR, so it tracks InstUI through the tokens with no
 * dependency on the InstUI React packages. For the real, interactive components, use
 * `@pantoken/react-markdown` (content) or `@instructure/ui-*` (apps).
 *
 * @module
 */
import { alpha, darken } from "@pantoken/plugin-colors";
import { renderDocBlock, type RecordMeta } from "./lib/record.ts";

/** The default class prefix (`instui` → `.instui-button`). */
export const DEFAULT_PREFIX = "instui";

/** Join a class prefix to its separator: `"instui"` → `"instui-"`; a falsy prefix → `""` (no prefix). */
const ns = (prefix: string | null | undefined): string => (prefix ? `${prefix}-` : "");

/**
 * Wrap a component's element rules in an `@scope` at-rule rooted at the component, so its bare element
 * classes (`.item`, `.tab`) only take effect inside that component's subtree. Author `body` with the
 * component's own token — `${root}` for the root and `${root} .el` for a descendant element — and this
 * rewrites the root away: `${root} .el` → `.el` (bare, implicitly scoped), `${root}.-mod` →
 * `:scope.-mod` (root modifier), and any remaining `${root}` → `:scope`.
 *
 * `children` names the elements that are DIRECT children of the scope root; each is upgraded to the
 * RSCSS child combinator (`.el` → `:scope > .el`, `:scope.-mod .el` → `:scope.-mod > .el`) so a
 * consumer's same-named element nested DEEPER inside the component no longer matches. Omit an element
 * (leave it descendant) when its DOM parent is unclassed or variable — e.g. tabs `.tab` sits under
 * `.list`, byline `.title`/`.description` under an unclassed wrapper.
 *
 * Two rules for callers: (1) pass ONLY element rules — keep the root and root-modifier-only rules
 * (esp. `-size-*`, which the size-alias post-processor rewrites) OUTSIDE, prefixed, so their aliases
 * stay valid; (2) never pass a body whose root token is a prefix of a sibling class (e.g.
 * `.instui-progress` vs `.instui-progress-value`) — split those out first.
 *
 * Note: `@scope` (and even `>`) narrows *where* the rules apply; it does not make the bare names fully
 * collision-proof (a consumer's own `.item` at the same child position still matches). True
 * collision-safety needs a unique name — which is why non-nested parts stay flat-prefixed.
 */
const scope = (root: string, body: string, children: string[] = []): string => {
  let scoped = body
    .split(`${root} .`)
    .join(".")
    .split(`${root}.`)
    .join(":scope.")
    .split(`${root} `)
    .join(":scope ")
    .split(root)
    .join(":scope");
  for (const c of children) {
    // Direct child of the root: a bare `.c` starting a selector → `:scope > .c`.
    scoped = scoped.replace(
      new RegExp(`(^|[\\n,])(\\s*)\\.${c}(?![\\w-])`, "g"),
      `$1$2:scope > .${c}`,
    );
    // Direct child of a modified root: `:scope<mods> .c` → `:scope<mods> > .c`.
    scoped = scoped.replace(new RegExp(`(:scope[^ ,{\\n]*) \\.${c}(?![\\w-])`, "g"), `$1 > .${c}`);
  }
  return `@scope (${root}) {\n${scoped}\n}`;
};

// ---------------------------------------------------------------------------------------------------
// Elevation — named box-shadow depths, intrinsic to the component set (many components float: modal,
// alert, menu, the demo card). A shadow at a given depth is TWO stacked layers (a tight contact shadow
// + a softer ambient one), so each level is a multi-layer value held in one `--instui-elevation-<name>`
// custom property; a component just writes `box-shadow: var(--instui-elevation-topmost)`. The geometry
// is InstUI's ui-view shadow scale; the colours are pantoken's themed `--instui-color-drop-shadow-*`
// tokens (referenced as var(), so shadows deepen correctly in dark mode via their light-dark()).
// ---------------------------------------------------------------------------------------------------

/** Per-level geometry (`offset-x offset-y blur`) for the [tighter, wider] shadow layers. */
const ELEVATION_GEOMETRY: Record<string, [tight: string, wide: string]> = {
  resting: ["0 0.0625rem 0.125rem", "0 0.0625rem 0.1875rem"],
  above: ["0 0.1875rem 0.375rem", "0 0.1875rem 0.375rem"],
  topmost: ["0 0.375rem 0.4375rem", "0 0.625rem 1.75rem"],
};

/** Aliases InstUI ships alongside the primary level names. */
const ELEVATION_ALIASES: Record<string, keyof typeof ELEVATION_GEOMETRY> = {
  depth1: "resting",
  depth2: "above",
  depth3: "topmost",
  card: "resting",
  cardHover: "topmost",
};

/**
 * Every elevation level and alias emitted as `--instui-elevation-<name>` (`resting`, `above`,
 * `topmost`, `depth1`–`depth3`, `card`, `cardHover`). Derived from the geometry + alias maps.
 */
export const ELEVATION_NAMES: readonly string[] = [
  ...Object.keys(ELEVATION_GEOMETRY),
  ...Object.keys(ELEVATION_ALIASES),
];

// The tighter layer takes the softer colour, the wider layer the stronger one — InstUI's "lifted" look.
const ELEVATION_COLOR_STRONG = "var(--instui-color-drop-shadow-shadow-color1)";
const ELEVATION_COLOR_SOFT = "var(--instui-color-drop-shadow-shadow-color2)";
const elevationShadow = ([tight, wide]: [string, string]): string =>
  `${tight} ${ELEVATION_COLOR_SOFT}, ${wide} ${ELEVATION_COLOR_STRONG}`;

/**
 * The `--instui-elevation-*` name/value pairs (each a multi-layer `box-shadow`). Values reference the
 * themed drop-shadow colour tokens, so they adapt per theme wherever a token sheet is loaded.
 *
 * @returns One `[customProperty, value]` pair per level and alias.
 */
export function elevationDeclarations(): [name: string, value: string][] {
  const levels: [string, [string, string]][] = [
    ...Object.entries(ELEVATION_GEOMETRY),
    ...Object.entries(ELEVATION_ALIASES).map(([alias, base]): [string, [string, string]] => [
      alias,
      ELEVATION_GEOMETRY[base],
    ]),
  ];
  return levels.map(([name, geo]) => [`--instui-elevation-${name}`, elevationShadow(geo)]);
}

/**
 * Build the elevation token block: `<selector> { --instui-elevation-*: … }`. Shipped inside
 * `components.css` (so shadows are intrinsic — no plugin, no extra import), and reusable by other
 * layered outputs (e.g. the Pendo renderer) via the `selector` option.
 *
 * @param options - `selector` — the rule selector (default `:root`).
 * @returns The CSS string.
 *
 * @example
 * ```ts
 * import { elevationCss } from "@pantoken/components";
 *
 * elevationCss(); // ":root { --instui-elevation-resting: …; --instui-elevation-above: …; … }"
 * ```
 *
 * @demo self:elevation
 */
export function elevationCss(options: { selector?: string } = {}): string {
  const selector = options.selector ?? ":root";
  const body = elevationDeclarations()
    .map(([name, value]) => `  ${name}: ${value};`)
    .join("\n");
  return `${selector} {\n${body}\n}\n`;
}

// ---------------------------------------------------------------------------------------------------
// Focus outline — the InstUI focus ring, intrinsic to base.css so every focusable gets it out of the
// box when pantoken owns the page. The resting element carries a transparent ring + a transition, and
// `:focus-visible` reveals the colour and grows the offset (the way InstUI animates it). All rules are
// zero-specificity `:where()`, so any component style overrides without `!important`. Colours/width/
// offset reference the themed `--instui-component-shared-tokens-focus-outline-*` tokens (so the ring
// tracks the theme); `style` (solid) and `inset` (0) are constants InstUI doesn't vary.
// ---------------------------------------------------------------------------------------------------

/** The elements the ring applies to by default (the common interactive/focusable elements). */
export const FOCUSABLE_SELECTOR = "a, button, input, select, textarea, summary, [tabindex]";

const focusShared = (name: string): string =>
  `var(--instui-component-shared-tokens-focus-outline-${name})`;

/**
 * The `--instui-focus-outline-*` name/value pairs the ring rules read. Colour/width/offset reference
 * the themed shared focus tokens; the transition, line style, and inset are constants.
 *
 * @returns One `[customProperty, value]` pair per focus-ring variable.
 */
export function focusOutlineDeclarations(): [name: string, value: string][] {
  return [
    ["--instui-focus-outline-color", focusShared("info-color")],
    ["--instui-focus-outline-color-start", "transparent"],
    ["--instui-focus-outline-width", focusShared("width")],
    ["--instui-focus-outline-offset", focusShared("offset")],
    ["--instui-focus-outline-radius", "var(--instui-border-radius-md)"],
    ["--instui-focus-outline-style", "solid"],
    ["--instui-focus-outline-transition", "outline-color 0.2s, outline-offset 0.25s"],
    ["--instui-focus-outline-color-success", focusShared("success-color")],
    ["--instui-focus-outline-color-danger", focusShared("danger-color")],
    ["--instui-focus-outline-color-inverse", focusShared("on-color")],
    ["--instui-focus-outline-inset", "0rem"],
  ];
}

/**
 * The focus-ring rules for a given focusable selector: a transparent resting ring that transitions in
 * on `:focus-visible`, plus the `-focus-color-*` / `-focus-position-inset` / `-focus-within` /
 * `-without-focus-animation` modifiers. All `:where()`-wrapped, so zero-specificity.
 *
 * @param selector - The focusable selector the base ring applies to (default {@link FOCUSABLE_SELECTOR}).
 * @returns The CSS rules string.
 */
export function focusOutlineRules(selector: string = FOCUSABLE_SELECTOR): string {
  return [
    `:where(${selector}) {`,
    `  outline: var(--instui-focus-outline-width) var(--instui-focus-outline-style) var(--instui-focus-outline-color-start);`,
    `  outline-offset: 0;`,
    `  transition: var(--instui-focus-outline-transition);`,
    `}`,
    `:where(${selector}):where(:focus-visible) {`,
    `  outline-color: var(--instui-focus-outline-color);`,
    `  outline-offset: var(--instui-focus-outline-offset);`,
    `  border-radius: var(--instui-focus-outline-radius);`,
    `}`,
    `:where(.-focus-color-success):where(:focus-visible) { outline-color: var(--instui-focus-outline-color-success); }`,
    `:where(.-focus-color-danger):where(:focus-visible) { outline-color: var(--instui-focus-outline-color-danger); }`,
    `:where(.-focus-color-inverse):where(:focus-visible) { outline-color: var(--instui-focus-outline-color-inverse); }`,
    `:where(.-focus-position-inset):where(:focus-visible) { outline-offset: var(--instui-focus-outline-inset); }`,
    `:where(.-focus-within):where(:focus-within) {`,
    `  outline-color: var(--instui-focus-outline-color);`,
    `  outline-offset: var(--instui-focus-outline-offset);`,
    `  border-radius: var(--instui-focus-outline-radius);`,
    `}`,
    `:where(.-without-focus-animation) { transition: none; }`,
  ].join("\n");
}

/** The focus declaration's doc-block metadata (rendered by {@link renderDocBlock}). */
const focusMeta: RecordMeta = {
  kind: "declaration",
  name: "focus",
  className: ":focus-visible",
  summary:
    "The focus-outline system: the `--instui-focus-outline-*` custom properties (declared on `:root`) plus the `:focus-visible` ring every focusable gets, and opt-in tuning classes.",
  modifiers: [
    { name: "-focus-color-success", description: "Success-coloured ring." },
    { name: "-focus-color-danger", description: "Danger-coloured ring." },
    { name: "-focus-color-inverse", description: "Inverse (on-dark) ring." },
    {
      name: "-focus-position-inset",
      description: "Draw the ring inset, inside the element's edge.",
    },
    { name: "-focus-within", description: "Ring the element while a descendant is focused." },
    { name: "-without-focus-animation", description: "Disable the ring's grow-in animation." },
  ],
  examples: ['<button class="instui-button -focus-color-danger">Delete</button>'],
  demo: "self:focus-outline",
};

/**
 * Build the focus-outline block: the `--instui-focus-outline-*` token defs plus the ring rules.
 * Baked into `base.css` (so focusables get the ring out of the box), and reusable by other layered
 * outputs (e.g. the Pendo renderer) via the `selector`/`tokenSelector` options.
 *
 * @param options - `selector` — the focusable selector; `tokenSelector` — where the token defs land
 *   (default `:where(:root)`).
 * @returns The CSS string.
 *
 * @demo self:focus-outline
 */
export function focusOutlineCss(
  options: { selector?: string; tokenSelector?: string } = {},
): string {
  const tokenSelector = options.tokenSelector ?? ":where(:root)";
  const decls = focusOutlineDeclarations()
    .map(([name, value]) => `  ${name}: ${value};`)
    .join("\n");
  return `${renderDocBlock(focusMeta)}\n${tokenSelector} {\n${decls}\n}\n\n${focusOutlineRules(options.selector)}\n`;
}

/** The six document heading levels, in order. */
const HEADING_LEVELS = ["h1", "h2", "h3", "h4", "h5", "h6"] as const;

/**
 * Per-level heading size + weight, straight from the `--instui-component-heading-<level>-*` tokens.
 * Shared so the Heading component (`.instui-heading--h1`) and prose (`.pantoken-prose h1`) read one
 * source of truth instead of re-declaring the same six token pairs.
 */
const headingLevelRules = (selector: (level: string) => string): string =>
  HEADING_LEVELS.map(
    (l) =>
      `${selector(l)} { font-size: var(--instui-component-heading-${l}-font-size); font-weight: var(--instui-component-heading-${l}-font-weight); }`,
  ).join("\n");

// ─── Base ─────────────────────────────────────────────────────────────────────

/**
 * Global document defaults from the tokens: box-sizing, a body reset, the page surface + base text
 * colour/font, `color-scheme` (so `light-dark()` tokens and native controls track the theme), and a
 * base link. Opt-in — it paints `html`/`body`, so a host that themes its own chrome shouldn't load it.
 */
function baseRules(): string {
  return `
/**
 * @rule base
 * @class *
 * @summary The opt-in global reset: \`box-sizing\`, the page surface, base text colour and font, \`color-scheme\`, and link defaults.
 * @example
 * <html>
 *   <body>
 *     <a href="/">A styled link on the base surface.</a>
 *   </body>
 * </html>
 */
*,
*::before,
*::after {
  box-sizing: border-box;
}
:where(html) {
  color-scheme: light dark;
  background: var(--instui-color-background-page);
  color: var(--instui-color-text-base);
  font-family: var(--instui-font-family-base);
  font-size: var(--instui-component-text-content-font-size);
  line-height: var(--instui-component-text-content-line-height);
  -webkit-text-size-adjust: 100%;
  text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased;
}
:where(body) {
  margin: 0;
}
:where(a) {
  color: var(--instui-color-text-interactive-navigation-primary-base);
  text-decoration: underline;
}
:where(a:hover) {
  color: var(--instui-color-text-interactive-navigation-primary-hover);
}
::selection {
  background: color-mix(in srgb, var(--instui-color-text-interactive-navigation-primary-base) 25%, transparent);
}
`;
}

// ─── Prose ──────────────────────────────────────────────────────────────────

/** Build the InstUI-look prose rules under a scope selector. */
function proseRules(s: string): string {
  return `
/**
 * @rule prose
 * @summary Typographic defaults for raw HTML — headings, paragraphs, lists, links, and code — under the \`.pantoken-prose\` scope.
 * @example
 * <article class="pantoken-prose">
 *   <h2>Release notes</h2>
 *   <p>Body copy with a <a href="/">link</a>.</p>
 * </article>
 */
/* Body text is InstUI's Text \`content\` type style. */
${s} {
  color: var(--instui-component-text-base-color);
  font-family: var(--instui-component-text-content-font-family);
  font-size: var(--instui-component-text-content-font-size);
  font-weight: var(--instui-component-text-content-font-weight);
  line-height: var(--instui-component-text-content-line-height);
}

/*
 * Headings are InstUI's Heading component per level: one heading line-height and colour, but a
 * per-level font size and weight (h1/h3/h4 are strong, h2/h5/h6 are base — straight from the tokens).
 */
${s} h1, ${s} h2, ${s} h3, ${s} h4, ${s} h5, ${s} h6 {
  color: var(--instui-component-heading-base-color);
  font-family: var(--instui-component-heading-h1-font-family);
  line-height: var(--instui-component-heading-line-height);
  margin: var(--instui-spacing-space-lg) 0 var(--instui-spacing-space-sm);
}
${headingLevelRules((l) => `${s} ${l}`)}

${s} p { margin: var(--instui-spacing-space-md) 0; }

${s} a {
  color: var(--instui-color-text-interactive-navigation-primary-base);
  text-decoration: underline;
}
${s} a:hover { color: var(--instui-color-text-interactive-navigation-primary-hover); }

${s} strong, ${s} b { font-weight: var(--instui-component-text-content-important-font-weight); }
${s} em, ${s} i { font-style: italic; }
${s} small { font-size: var(--instui-component-text-content-small-font-size); }
${s} del, ${s} s { text-decoration: line-through; color: var(--instui-color-text-muted); }

${s} ul, ${s} ol { margin: var(--instui-spacing-space-md) 0; padding-inline-start: var(--instui-spacing-space-lg); }
${s} li { margin: var(--instui-spacing-space2xs) 0; }
${s} li.task-list-item { list-style: none; }
${s} input[type="checkbox"] {
  accent-color: var(--instui-color-text-interactive-navigation-primary-base);
  margin-inline-end: var(--instui-spacing-space-xs);
}

/* Blockquotes use InstUI's Text \`contentQuote\` type style, with a leading rule. */
${s} blockquote {
  margin: var(--instui-spacing-space-md) 0;
  padding-inline-start: var(--instui-spacing-space-md);
  border-inline-start: var(--instui-border-width-lg) solid var(--instui-color-stroke-base);
  color: var(--instui-component-text-base-color);
  font-size: var(--instui-component-text-content-quote-font-size);
  line-height: var(--instui-component-text-content-quote-line-height);
}

${s} code {
  font-family: var(--instui-font-family-code);
  font-size: 0.9em;
  background: var(--instui-color-background-muted);
  padding: var(--instui-spacing-space2xs) var(--instui-spacing-space-xs);
  border-radius: var(--instui-border-radius-sm);
}
${s} pre {
  font-family: var(--instui-font-family-code);
  background: var(--instui-color-background-container);
  color: var(--instui-color-text-base);
  padding: var(--instui-spacing-space-md);
  border: var(--instui-border-width-sm) solid var(--instui-color-stroke-base);
  border-radius: var(--instui-border-radius-md);
  overflow-x: auto;
}
${s} pre code { background: none; padding: 0; border-radius: 0; font-size: inherit; }

${s} hr {
  border: none;
  border-top: var(--instui-border-width-sm) solid var(--instui-color-stroke-base);
  margin: var(--instui-spacing-space-lg) 0;
}
${s} img { max-width: 100%; border-radius: var(--instui-border-radius-md); }

/* Prose only styles RAW markdown tables — i.e. classless \`<table>\` output. A classed table
   (\`.instui-table\` and friends) owns its own layout via its component CSS, so \`:not([class])\` keeps
   prose from injecting borders/backgrounds into it (prose is for typography of rendered markup, not
   table layout of components). */
${s} table:not([class]) {
  border-collapse: collapse;
  width: 100%;
  margin: var(--instui-spacing-space-md) 0;
  background: var(--instui-component-table-background);
  color: var(--instui-component-table-color);
  font-family: var(--instui-component-table-font-family);
  font-size: var(--instui-component-table-font-size);
}
${s} table:not([class]) th {
  text-align: start;
  background: var(--instui-component-table-col-header-background);
  color: var(--instui-component-table-col-header-color);
  font-weight: var(--instui-component-table-head-font-weight);
  padding: var(--instui-component-table-col-header-padding-vertical) var(--instui-component-table-col-header-padding-horizontal);
  border-bottom: var(--instui-border-width-md) solid var(--instui-component-table-row-border-color);
}
${s} table:not([class]) td {
  color: var(--instui-component-table-cell-color);
  line-height: var(--instui-component-table-cell-line-height);
  padding: var(--instui-component-table-cell-padding-vertical) var(--instui-component-table-cell-padding-horizontal);
  border-bottom: var(--instui-border-width-sm) solid var(--instui-component-table-row-border-color);
}
`;
}

/** Options for {@link proseCss}. */
export interface ProseOptions {
  /** The content-root selector the rules attach to (default `".pantoken-prose"`). */
  scope?: string;
}

/**
 * Build the InstUI-look prose stylesheet, scoped to `options.scope` (default `.pantoken-prose`).
 *
 * @param options - {@link ProseOptions}.
 * @returns The CSS string.
 *
 * @example Style content in the default .pantoken-prose region
 * ```ts
 * import { proseCss } from "@pantoken/components";
 *
 * const css = proseCss(); // rules under .pantoken-prose
 * ```
 *
 * @example Scope the prose rules to a custom content root
 * ```ts
 * import { proseCss } from "@pantoken/components";
 *
 * const css = proseCss({ scope: ".markdown-body" });
 * ```
 *
 * @demo self:prose
 */
export function proseCss(options: ProseOptions = {}): string {
  const scope = options.scope ?? ".pantoken-prose";
  return `/* InstUI-look prose styles (@pantoken/components) — scope: ${scope} */\n${proseRules(scope).trim()}\n`;
}

/**
 * Build the opt-in base/reset stylesheet: global document defaults from the tokens (box-sizing, body
 * reset, page surface, base text colour/font, `color-scheme`, base link). Load it once, ahead of the
 * component and prose sheets, when pantoken owns the page. Skip it when embedding into a host that
 * already themes its own `html`/`body`.
 *
 * @returns The CSS string.
 *
 * @example
 * ```ts
 * import "@pantoken/components/base.css";
 * // or: import { baseCss } from "@pantoken/components";
 * ```
 *
 * @demo self:base
 */
export function baseCss(): string {
  // The focus ring is a document-level default (it targets bare focusables), so it lives in the reset:
  // load base.css and every focusable gets the InstUI ring out of the box.
  return `/* InstUI-look base/reset (@pantoken/components) */\n${baseRules().trim()}\n\n${focusOutlineCss()}`;
}

// ─── Components ───────────────────────────────────────────────────────────────

/** Options for the class-based component builders. */
export interface ComponentOptions {
  /**
   * The class prefix. A truthy string namespaces every class (`"instui"` → `.instui-button`); any
   * falsy value (`null`, `undefined`, `""`, or omitting the option) drops the prefix entirely
   * (`.button`), so you can author `class="heading -h1"`. The stylesheets shipped by this package are
   * built with `"instui"`.
   */
  prefix?: string | null;
}

/** A `url()` for Lucide-style stroked SVG path markup (mask alpha comes from the strokes). */
/** A contained, centred mask value pointing at a shared `--instui-icon-<name>` token, painted via
 *  `background` (so the glyph takes the element's colour). This is the same source the `-icon-<name>`
 *  painter uses, reused for components that draw a fixed built-in glyph. Masks only — the token's
 *  `stroke=currentColor` is irrelevant since the alpha channel drives the mask. Painting a glyph as a
 *  `background-image` (which can't read `currentColor`) still needs a colour-baked data URI: see
 *  {@link SELECT_CHEVRON} / {@link CHECK_URL_ON}. */
const iconMask = (name: string): string => `var(--instui-icon-${name}) center / contain no-repeat`;

/** Lucide `x`, for the CloseButton glyph. */
const CLOSE_ICON = iconMask("x");

/** Lucide `check`, for the Checkbox tick. */
const CHECK_ICON = iconMask("check");

/** Lucide `minus`, masked, for the Checkbox indeterminate (mixed) state. */
const MINUS_ICON = iconMask("minus");

/** Lucide `circle-alert`, masked — the FormFieldMessage error glyph (painted in `currentColor`). */
const ALERT_CIRCLE_ICON = iconMask("circle-alert");

/** Lucide `circle-check`, masked — the FormFieldMessage success glyph (painted in `currentColor`). */
const CHECK_CIRCLE_ICON = iconMask("circle-check");

/** Lucide `chevron-down` in the InstUI icon grey — the SimpleSelect caret. A native `<select>` is a
 *  replaced element (no pseudo-elements), so the caret is a `background-image`, not `::after`; a data-URI
 *  background can't read `currentColor`, so the stroke is a fixed neutral grey that reads in both modes. */
const SELECT_CHEVRON =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%236a7883' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")";

/** Lucide `check` stroked white — the customizable-select selected-option glyph (on the action fill;
 *  a background-image can't read currentColor, and the selected fill is a saturated action colour that
 *  pairs with the on-colour white check). */
const CHECK_URL_ON =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 6 9 17l-5-5'/%3E%3C/svg%3E\")";

/** Lucide `chevron-up`/`chevron-down`, masked — the NumberInput spinner glyphs (painted in currentColor). */
const CHEVRON_UP_ICON = iconMask("chevron-up");
const CHEVRON_DOWN_ICON = iconMask("chevron-down");

/** Lucide `chevron-right`, masked — the ToggleDetails/ToggleGroup disclosure marker (rotates on [open]). */
const CHEVRON_RIGHT_ICON = iconMask("chevron-right");

/**
 * InstUI's `ai` glyph (Solid), inlined as a mask so it paints in the button's own colour — solid
 * white on `--ai`, the violet→sea gradient on `--ai-secondary`. Source: `@instructure/ui-icons`.
 */
const AI_ICON_MASK =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 1920 1920' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M960 0L1219.29 700.713L1920 960L1219.29 1219.29L960 1920L700.713 1219.29L0 960L700.713 700.713L960 0Z'/%3E%3Cpath d='M1600 0L1686.43 233.571L1920 320L1686.43 406.429L1600 640L1513.57 406.429L1280 320L1513.57 233.571L1600 0Z'/%3E%3C/svg%3E\") center / contain no-repeat";

/** Button rules: a primary fill by default, plus `--secondary` (outline) and `--danger`. */
function buttonRules(p: string): string {
  return `
/**
 * @component button
 * @summary An accessible action control, styled from the token palette; primary by default.
 * @example
 * <button class="instui-button">Primary</button>
 * @modifier -color-secondary — A lower-emphasis secondary action.
 * @modifier -color-tertiary — A text-style action (no fill or border until hover).
 * @modifier -color-danger — A destructive action.
 * @modifier -shape-circle — A round icon button.
 * @modifier -condensed — Tighter padding for dense toolbars.
 * @modifier -toggle — A pressed-state toggle button (drive with aria-pressed).
 * @modifier -without-background — Drop the fill (ghost).
 * @modifier -color-success — A positive/confirming action.
 * @modifier -color-ai — An AI action.
 * @modifier -color-ai-secondary — A lower-emphasis AI action.
 * @modifier -color-primary-inverse — Primary action for dark backgrounds.
 * @modifier -size-sm — Small.
 * @modifier -size-lg — Large.
 * @modifier -shape-square — A square icon button.
 * @modifier -display-block — Full-width block button.
 * @modifier -ghost — Outline (ghost) style: a border in the colour's ghost tokens, no fill.
 * @modifier -without-border — Remove the border.
 * @demo self:button
 */
.${p}button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--instui-spacing-space-xs);
  min-height: var(--instui-component-base-button-medium-height);
  padding: var(--instui-spacing-space-xs) var(--instui-component-base-button-medium-padding-horizontal);
  font-family: var(--instui-font-family-base);
  font-size: var(--instui-component-base-button-medium-font-size);
  font-weight: var(--instui-font-weight-interactive);
  line-height: var(--instui-line-height-standalone-text-base);
  border: var(--instui-border-width-md) solid transparent;
  border-radius: var(--instui-component-base-button-border-radius);
  cursor: pointer;
  background: var(--instui-color-background-interactive-action-primary-base);
  color: var(--instui-color-text-interactive-action-primary-base);
}
.${p}button:hover { background: var(--instui-color-background-interactive-action-primary-hover); }
.${p}button:active { background: var(--instui-color-background-interactive-action-primary-active); }
.${p}button:disabled,
.${p}button[aria-disabled="true"] {
  background: var(--instui-color-background-interactive-action-primary-disabled);
  color: var(--instui-color-text-interactive-action-primary-disabled);
  cursor: not-allowed;
}
.${p}button.-color-secondary {
  background: var(--instui-color-background-interactive-action-secondary-base);
  color: var(--instui-color-text-interactive-action-secondary-base);
  border-color: var(--instui-color-stroke-interactive-action-secondary-base);
}
.${p}button.-color-secondary:hover {
  background: var(--instui-color-background-interactive-action-secondary-hover);
  border-color: var(--instui-color-stroke-interactive-action-secondary-hover);
}
.${p}button.-color-secondary:active {
  background: var(--instui-color-background-interactive-action-secondary-active);
  border-color: var(--instui-color-stroke-interactive-action-secondary-active);
}
.${p}button.-color-danger {
  background: var(--instui-color-background-interactive-action-destructive-base);
  color: var(--instui-color-text-interactive-action-status-base);
}
.${p}button.-color-danger:hover { background: var(--instui-color-background-interactive-action-destructive-hover); }
.${p}button.-color-danger:active { background: var(--instui-color-background-interactive-action-destructive-active); }
.${p}button.-color-success {
  background: var(--instui-color-background-interactive-action-success-base);
  color: var(--instui-color-text-interactive-action-status-base);
}
.${p}button.-color-success:hover { background: var(--instui-color-background-interactive-action-success-hover); }
.${p}button.-color-tertiary {
  background: transparent;
  color: var(--instui-color-text-interactive-action-tertiary-base);
  border-color: var(--instui-color-stroke-interactive-action-tertiary-base);
}
.${p}button.-color-tertiary:hover { background: var(--instui-color-background-interactive-action-tertiary-hover); }
.${p}button.-color-tertiary:active { background: var(--instui-color-background-interactive-action-tertiary-active); }
.${p}button.-color-primary-inverse {
  background: var(--instui-component-base-button-primary-inverse-background);
  color: var(--instui-component-base-button-primary-inverse-color);
  border-color: var(--instui-component-base-button-primary-inverse-border-color);
}
/* On hover the border tracks the (light) hover fill, so it reads as no visible border. */
.${p}button.-color-primary-inverse:hover {
  background: var(--instui-component-base-button-primary-inverse-hover-background);
  border-color: var(--instui-component-base-button-primary-on-color-hover-border-color);
}
.${p}button.-color-primary-inverse:active {
  background: var(--instui-component-base-button-primary-inverse-active-background);
  border-color: var(--instui-component-base-button-primary-on-color-active-border-color);
}
/*
 * AI buttons carry two gradients: the fill (padding-box) and a distinct stroke gradient (border-box)
 * that shows through the transparent border — InstUI's ai-primary technique. The ai glyph is added
 * automatically via ::before.
 */
.${p}button.-color-ai {
  color: var(--instui-color-text-interactive-action-ai-base);
  border-color: transparent;
  background:
    linear-gradient(to bottom, var(--instui-color-background-interactive-action-ai-top-gradient-base) 0%, var(--instui-color-background-interactive-action-ai-bottom-gradient-base) 100%) padding-box,
    linear-gradient(to bottom, var(--instui-color-stroke-interactive-action-ai-top-gradient-base) 0%, var(--instui-color-stroke-interactive-action-ai-bottom-gradient-base) 100%) border-box;
}
.${p}button.-color-ai:hover {
  color: var(--instui-color-text-interactive-action-ai-hover);
  background:
    linear-gradient(to bottom, var(--instui-color-background-interactive-action-ai-top-gradient-hover) 0%, var(--instui-color-background-interactive-action-ai-bottom-gradient-hover) 100%) padding-box,
    linear-gradient(to bottom, var(--instui-color-stroke-interactive-action-ai-top-gradient-hover) 0%, var(--instui-color-stroke-interactive-action-ai-bottom-gradient-hover) 100%) border-box;
}
.${p}button.-color-ai:active {
  color: var(--instui-color-text-interactive-action-ai-active);
  background:
    linear-gradient(to bottom, var(--instui-color-background-interactive-action-ai-top-gradient-active) 0%, var(--instui-color-background-interactive-action-ai-bottom-gradient-active) 100%) padding-box,
    linear-gradient(to bottom, var(--instui-color-stroke-interactive-action-ai-top-gradient-active) 0%, var(--instui-color-stroke-interactive-action-ai-bottom-gradient-active) 100%) border-box;
}
/*
 * ai-secondary matches InstUI: a transparent rest fill, a violet→sea gradient border ring (::after,
 * masked to just the frame), and violet→sea gradient text (background-clip: text). The ai glyph
 * (::before) picks up the same gradient. A single element can't paint gradient text and a fill at
 * once, so — like InstUI's rest state — the centre stays transparent.
 */
.${p}button.-color-ai-secondary {
  position: relative;
  border-color: transparent;
  background: linear-gradient(to bottom, var(--instui-color-text-interactive-action-ai-secondary-top-gradient-base) 0%, var(--instui-color-text-interactive-action-ai-secondary-bottom-gradient-base) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}
/*
 * The ring spans the border-box (outermost) edge, so it isn't inset past the base button's
 * transparent border. The negative inset reaches out over that border; the radius is inherited, so
 * it stays concentric with the button's outer corners.
 */
.${p}button.-color-ai-secondary::after {
  content: "";
  position: absolute;
  inset: calc(-1 * var(--instui-border-width-md));
  border-radius: inherit;
  padding: var(--instui-border-width-sm);
  background: linear-gradient(to bottom, var(--instui-color-stroke-interactive-action-ai-top-gradient-base) 0%, var(--instui-color-stroke-interactive-action-ai-bottom-gradient-base) 100%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  pointer-events: none;
}
/*
 * Hover/active trade the clipped gradient text for InstUI's subtle gradient fill plus solid text —
 * one element can't paint clipped gradient text and a fill at once, so the interactive states fill.
 */
.${p}button.-color-ai-secondary:hover,
.${p}button.-color-ai-secondary:active {
  -webkit-background-clip: border-box;
  background-clip: border-box;
  color: var(--instui-color-text-interactive-action-ai-secondary-top-gradient-base);
  -webkit-text-fill-color: currentColor;
}
.${p}button.-color-ai-secondary:hover {
  background: linear-gradient(to bottom, var(--instui-color-background-interactive-action-ai-secondary-hover-top-gradient) 0%, var(--instui-color-background-interactive-action-ai-secondary-hover-bottom-gradient) 100%);
}
.${p}button.-color-ai-secondary:active {
  background: linear-gradient(to bottom, var(--instui-color-background-interactive-action-ai-secondary-active-top-gradient) 0%, var(--instui-color-background-interactive-action-ai-secondary-active-bottom-gradient) 100%);
}
/* The ai glyph, added automatically to every AI button and painted in its own colour. */
.${p}button.-color-ai::before,
.${p}button.-color-ai-secondary::before {
  content: "";
  inline-size: 1em;
  block-size: 1em;
  flex: none;
  -webkit-mask: ${AI_ICON_MASK};
  mask: ${AI_ICON_MASK};
}
.${p}button.-color-ai::before { background: var(--instui-color-text-interactive-action-ai-base); }
.${p}button.-color-ai-secondary::before {
  background: linear-gradient(to bottom, var(--instui-color-stroke-interactive-action-ai-top-gradient-base) 0%, var(--instui-color-stroke-interactive-action-ai-bottom-gradient-base) 100%);
}
/*
 * --ghost is InstUI's withBackground={false}: an outline button in the colour's ghost tokens
 * (transparent fill, coloured border + text). Defaults to primary; compose with --secondary for the
 * secondary ghost.
 */
.${p}button.-without-background {
  background: var(--instui-component-base-button-primary-ghost-background);
  color: var(--instui-component-base-button-primary-ghost-color);
  border-color: var(--instui-component-base-button-primary-ghost-border-color);
}
.${p}button.-color-secondary.-ghost {
  background: var(--instui-component-base-button-secondary-ghost-background);
  color: var(--instui-component-base-button-secondary-ghost-color);
  border-color: var(--instui-component-base-button-secondary-ghost-border-color);
}
/*
 * Ghost hover/active derive a subtle wash from the brand token via @pantoken/plugin-colors —
 * a low-opacity, slightly-darkened brand, exactly as InstUI's runtime computes it
 * (alpha(darken(brand), n)). The *-ghost-hover-background *tokens* resolve to the solid brand fill,
 * which would print same-colour-on-same-colour text; deriving the wash keeps the rest text legible
 * and tracks the brand. See the upstream token issue for why the raw tokens can't be used directly.
 */
.${p}button.-without-background:hover {
  background: ${alpha(darken("var(--instui-component-base-button-primary-ghost-color)", 10), 10)};
}
.${p}button.-without-background:active {
  background: ${alpha(darken("var(--instui-component-base-button-primary-ghost-color)", 10), 20)};
}
.${p}button.-color-secondary.-ghost:hover {
  background: ${alpha(darken("var(--instui-component-base-button-secondary-ghost-color)", 10), 10)};
}
.${p}button.-color-secondary.-ghost:active {
  background: ${alpha(darken("var(--instui-component-base-button-secondary-ghost-color)", 10), 20)};
}
/* --block is InstUI's display="block": a full-width button. */
.${p}button.-display-block {
  display: flex;
  width: 100%;
}
.${p}button.-size-sm {
  font-size: var(--instui-component-base-button-small-font-size);
  min-height: var(--instui-component-base-button-small-height);
  padding-inline: var(--instui-component-base-button-small-padding-horizontal);
}
.${p}button.-size-lg {
  font-size: var(--instui-component-base-button-large-font-size);
  min-height: var(--instui-component-base-button-large-height);
  padding-inline: var(--instui-component-base-button-large-padding-horizontal);
}
.${p}button.-shape-square {
  padding: var(--instui-spacing-space-xs);
  aspect-ratio: 1;
}
.${p}button.-shape-circle {
  padding: var(--instui-spacing-space-xs);
  aspect-ratio: 1;
  border-radius: 50%;
}
.${p}button.-condensed {
  background: transparent;
  border-color: transparent;
  min-height: 0;
  color: var(--instui-color-text-interactive-action-secondary-base);
  padding-inline: var(--instui-spacing-space-xs);
}
.${p}button.-condensed:hover { background: var(--instui-color-background-muted); }
.${p}button.-toggle[aria-pressed="true"] {
  background: var(--instui-color-background-interactive-action-secondary-active);
  border-color: var(--instui-color-stroke-interactive-action-secondary-active);
  color: var(--instui-color-text-interactive-action-secondary-base);
}
/* InstUI's withBorder={false}: drop the border but keep the button's box (border-box sizing). */
.${p}button.-without-border { border-style: none; }
`;
}

/**
 * Alert rules: just \`<div class="instui-alert instui-alert--danger">text…</div>\` — no icon/content
 * wrappers. The coloured left bar is `::before`, the variant glyph is `::after` (both self-drawn from
 * the variant tokens; swap `--pantoken-alert-glyph` for a custom icon), the body text (or prose) flows
 * in the padded box, and an optional `.instui-close-button` child is detected with `:has()`.
 */
function alertRules(p: string): string {
  return `
/**
 * @component alert
 * @summary An inline message with a status colour bar and a masked status glyph from the shared icon set.
 * @example
 * <div class="instui-alert -color-info">
 *   Dismissable with <code>transition="fade"</code> — I fade out when closed.
 *   <button class="instui-close-button -size-sm" aria-label="Close"></button>
 * </div>
 * @structure
 * .instui-alert.-color-info
 *   code
 *   .instui-close-button.-size-sm
 * @modifier -color-info — Informational (default).
 * @modifier -color-success — A positive/confirmation message.
 * @modifier -color-warning — A cautionary message.
 * @modifier -color-danger — An error message.
 * @modifier -has-shadow — Lift the alert with an elevation shadow.
 * @modifier -screen-reader-only — Visually hidden but announced.
 * @modifier -icon-<name> — Swap the status glyph for a custom icon (e.g. \`-icon-megaphone\`), kept white on the variant's coloured bar.
 * @modifier -render-custom-icon-<name> — @deprecated The former \`renderCustomIcon\` prop; still works as an alias, but use \`-icon-<name>\` (or override \`--pantoken-alert-glyph\`) instead.
 * @cssproperty --pantoken-alert-glyph <url> — The low-level status-glyph source; \`-icon-<name>\` sets it for you. Override for a custom icon (a url-encoded SVG).
 * @demo self:alert
 */
.${p}alert {
  position: relative;
  min-inline-size: 12rem;
  padding: var(--instui-component-alert-content-padding-vertical) var(--instui-component-alert-content-padding-horizontal);
  padding-inline-start: calc(2.5rem + var(--instui-component-alert-content-padding-horizontal));
  background: var(--instui-component-alert-background);
  color: var(--instui-component-alert-color);
  border: var(--instui-component-alert-border-width) var(--instui-component-alert-border-style) var(--instui-component-alert-info-border-color);
  border-radius: var(--instui-component-alert-border-radius);
  font-family: var(--instui-component-alert-content-font-family);
  font-size: var(--instui-component-alert-content-font-size);
  font-weight: var(--instui-component-alert-content-font-weight);
  line-height: var(--instui-component-alert-content-line-height);
  --pantoken-alert-icon-bg: var(--instui-component-alert-info-icon-background);
  --pantoken-alert-glyph: var(--instui-icon-info);
}
/* The solid variant-coloured bar, flush to the rounded left edge (overlapping the border). */
.${p}alert::before {
  content: "";
  position: absolute;
  inset-block: calc(-1 * var(--instui-component-alert-border-width));
  inset-inline-start: calc(-1 * var(--instui-component-alert-border-width));
  inline-size: 2.5rem;
  border-start-start-radius: var(--instui-component-alert-border-radius);
  border-end-start-radius: var(--instui-component-alert-border-radius);
  background: var(--pantoken-alert-icon-bg);
}
/* The white variant glyph, centred over the bar (masked, so it takes the icon-colour token). */
.${p}alert::after {
  content: "";
  position: absolute;
  inset-block: 0;
  inset-inline-start: 0;
  inline-size: 2.5rem;
  background: var(--instui-component-alert-icon-color);
  -webkit-mask: var(--pantoken-alert-glyph) center / 1.125rem no-repeat;
  mask: var(--pantoken-alert-glyph) center / 1.125rem no-repeat;
}
/* Close/dismiss is optional: pin it in the top-end corner (the button's own box centres the ×, so it
   takes a small symmetric inset, not the content padding), and reserve room only when it's present. */
.${p}alert > .${p}close-button {
  position: absolute;
  inset-block-start: var(--instui-spacing-space-xs);
  inset-inline-end: var(--instui-spacing-space-xs);
}
.${p}alert:has(> .${p}close-button) {
  padding-inline-end: calc(var(--instui-component-base-button-medium-height) + var(--instui-spacing-space-xs));
}
/* Optional elevation (InstUI's hasShadow) via the elevation plugin's named token. */
.${p}alert.-has-shadow { box-shadow: var(--instui-elevation-above); }
/* screenReaderOnly: announced to assistive tech, but visually hidden. */
.${p}alert.-screen-reader-only {
  position: absolute;
  inline-size: 1px;
  block-size: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
}
.${p}alert.-color-info { border-color: var(--instui-component-alert-info-border-color); }
.${p}alert.-color-success {
  border-color: var(--instui-component-alert-success-border-color);
  --pantoken-alert-icon-bg: var(--instui-component-alert-success-icon-background);
  --pantoken-alert-glyph: var(--instui-icon-circle-check);
}
.${p}alert.-color-warning {
  border-color: var(--instui-component-alert-warning-border-color);
  --pantoken-alert-icon-bg: var(--instui-component-alert-warning-icon-background);
  --pantoken-alert-glyph: var(--instui-icon-triangle-alert);
}
.${p}alert.-color-danger {
  border-color: var(--instui-component-alert-danger-border-color);
  --pantoken-alert-icon-bg: var(--instui-component-alert-danger-icon-background);
  --pantoken-alert-glyph: var(--instui-icon-circle-x);
}
/* A custom \`-icon-<name>\` on the alert swaps the status glyph (still drawn white over the coloured
   bar), keeping the variant's bar colour. Last, so it wins over the per-variant glyph above. The
   generic icon painter also targets \`[class*="-icon-"]::before\` at equal specificity and later in the
   sheet — it would consume the bar — so re-assert the bar here at higher specificity. */
.${p}alert[class*="-icon-"] { --pantoken-alert-glyph: var(--pantoken-glyph); }
.${p}alert[class*="-icon-"]::before {
  inline-size: 2.5rem;
  block-size: auto;
  background: var(--pantoken-alert-icon-bg);
  -webkit-mask: none;
  mask: none;
}
`;
}

/** Badge rules: a small pill (brand fill by default), plus `--success` and `--danger`. */
function badgeRules(p: string): string {
  return `
/**
 * @component badge
 * @summary A small count or status dot placed over a target's corner.
 * @example
 * <span class="instui-badge">4</span>
 * @modifier -color-success — A positive/complete count.
 * @modifier -color-danger — An attention/error count.
 * @modifier -color-inverse — On-dark: a light chip with dark text.
 * @modifier -type-notification — A dot only, no count.
 * @modifier -pulse — A pulsing attention ring.
 * @modifier -standalone — Render inline, not positioned over a target's corner.
 * @modifier -placement-top-start — Position at the top-start corner.
 * @modifier -placement-top-end — Position at the top-end corner.
 * @modifier -placement-bottom-start — Position at the bottom-start corner.
 * @modifier -placement-bottom-end — Position at the bottom-end corner.
 * @modifier -placement-start-center — Position centred on the start edge.
 * @modifier -placement-end-center — Position centred on the end edge.
 * @part .badge-wrapper — Wrap a target so a placed badge sits over its corner.
 * @demo self:badge
 */
@keyframes pantoken-badge-pulse {
  from { transform: scale(1); opacity: 0.7; }
  to { transform: scale(1.8); opacity: 0; }
}
/* Wrap a target in this so a placed badge can sit over its corner. It contains the badge (rather than
   being contained by it), so it's a flat prefixed class, not a scoped element. */
.${p}badge-wrapper {
  position: relative;
  display: inline-flex;
}
.${p}badge {
  --pantoken-badge-accent: var(--instui-component-badge-color-primary);
  /* The primary fill is the brand colour, which flips dark→light between light and dark mode; pair the
     text so it stays legible either way (white on the light-mode navy, dark on the dark-mode light
     fill). The saturated status fills below keep white text in both modes. */
  --pantoken-badge-text: light-dark(var(--instui-component-badge-color), var(--instui-component-badge-color-inverse));
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: var(--instui-component-badge-size);
  height: var(--instui-component-badge-size);
  padding: 0 var(--instui-component-badge-padding);
  font-family: var(--instui-component-badge-font-family);
  font-size: var(--instui-component-badge-font-size);
  font-weight: var(--instui-component-badge-font-weight);
  line-height: 1;
  border-radius: var(--instui-component-badge-border-radius);
  background: var(--pantoken-badge-accent);
  color: var(--pantoken-badge-text);
}
.${p}badge.-color-success {
  --pantoken-badge-accent: var(--instui-component-badge-color-success);
  --pantoken-badge-text: var(--instui-component-badge-color);
}
.${p}badge.-color-danger {
  --pantoken-badge-accent: var(--instui-component-badge-color-danger);
  --pantoken-badge-text: var(--instui-component-badge-color);
}
/* Inverse swaps fill and text (InstUI): a light chip with dark text, for a colour/dark surface. */
.${p}badge.-color-inverse {
  --pantoken-badge-accent: var(--instui-component-badge-color);
  --pantoken-badge-text: var(--instui-component-badge-color-inverse);
}
/* Notification: a small dot, no count. */
.${p}badge.-type-notification {
  min-width: 0;
  width: var(--instui-spacing-space-sm);
  height: var(--instui-spacing-space-sm);
  padding: 0;
  font-size: 0;
}
/* Pulse: an expanding ring in the badge's accent colour (InstUI \`pulse\`). */
.${p}badge.-pulse::before {
  content: "";
  position: absolute;
  inset: 0;
  border: var(--instui-border-width-md) solid var(--pantoken-badge-accent);
  border-radius: inherit;
  animation: pantoken-badge-pulse 1.2s ease-out infinite;
}
/* Placement: position the badge over a \`.badge-wrapper\` target. InstUI's countOffset is 0.5rem. */
.${p}badge.-placement-top-end,
.${p}badge.-placement-top-start,
.${p}badge.-placement-bottom-end,
.${p}badge.-placement-bottom-start,
.${p}badge.-placement-start-center,
.${p}badge.-placement-end-center {
  position: absolute;
}
.${p}badge.-placement-top-end { top: -0.5rem; inset-inline-end: -0.5rem; }
.${p}badge.-placement-top-start { top: -0.5rem; inset-inline-start: -0.5rem; }
.${p}badge.-placement-bottom-end { bottom: -0.5rem; inset-inline-end: -0.5rem; }
.${p}badge.-placement-bottom-start { bottom: -0.5rem; inset-inline-start: -0.5rem; }
.${p}badge.-placement-end-center { top: 50%; inset-inline-end: -0.5rem; transform: translateY(-50%); }
.${p}badge.-placement-start-center { top: 50%; inset-inline-start: -0.5rem; transform: translateY(-50%); }
/* Standalone: the inline chip, in flow — resets any placement. */
.${p}badge.-standalone {
  position: relative;
  inset: auto;
  transform: none;
}
`;
}

/**
 * Pill rules: a bordered status label, base by default, plus `-color-info`/`-color-success`/
 * `-color-warning`/`-color-danger`. A leading `-icon-<name>` glyph (InstUI's `renderIcon`) sits before
 * the text and inherits its colour.
 */
function pillRules(p: string): string {
  return `
/**
 * @component pill
 * @summary A compact status label; add a leading glyph with the shared \`-icon-<name>\` form.
 * @example
 * <span class="instui-pill">Draft</span>
 * @modifier -color-info — Informational status.
 * @modifier -color-success — Positive status.
 * @modifier -color-warning — Cautionary status.
 * @modifier -color-danger — Error status.
 * @modifier -icon-<name> — A leading glyph from the icon set (e.g. \`-icon-check\`), painted before the label.
 * @modifier -render-icon-<name> — @deprecated The former \`renderIcon\` prop; still works as an alias, but use \`-icon-<name>\` instead.
 * @demo self:pill
 */
.${p}pill {
  display: inline-flex;
  align-items: center;
  height: var(--instui-component-pill-height);
  max-width: var(--instui-component-pill-max-width);
  padding: 0 var(--instui-component-pill-padding-horizontal);
  background: var(--instui-component-pill-background-color);
  color: var(--instui-component-pill-base-text-color);
  border: var(--instui-component-pill-border-width) var(--instui-component-pill-border-style) var(--instui-component-pill-base-border-color);
  border-radius: var(--instui-component-pill-border-radius);
  font-family: var(--instui-component-pill-font-family);
  font-size: var(--instui-component-pill-text-font-size);
  font-weight: var(--instui-component-pill-text-font-weight);
  line-height: var(--instui-component-pill-line-height);
}
/* A leading icon (InstUI \`renderIcon\`): a glyph class on the pill renders a masked ::before that
   inherits the pill's colour. It refines the shared icon ::before to the pill's size + spacing. */
.${p}pill[class*="-icon-"]::before {
  inline-size: var(--instui-font-size-text-xs);
  block-size: var(--instui-font-size-text-xs);
  margin-inline-end: 0.375rem;
}
.${p}pill.-color-info {
  color: var(--instui-component-pill-info-text-color);
  border-color: var(--instui-component-pill-info-border-color);
}
.${p}pill.-color-success {
  color: var(--instui-component-pill-success-text-color);
  border-color: var(--instui-component-pill-success-border-color);
}
.${p}pill.-color-warning {
  color: var(--instui-component-pill-warning-text-color);
  border-color: var(--instui-component-pill-warning-border-color);
}
.${p}pill.-color-danger {
  color: var(--instui-component-pill-error-text-color);
  border-color: var(--instui-component-pill-error-border-color);
}
.${p}pill.-color-info,
.${p}pill.-color-success,
.${p}pill.-color-warning,
.${p}pill.-color-danger { font-weight: var(--instui-component-pill-status-label-font-weight); }
`;
}

/**
 * Tag rules: a filled chip with a hover state. Sizes `--sm`/`--lg`, plus an `--inline` dismissible
 * variant whose trailing `::after` masks a close glyph (no extra markup) painted with the icon tokens.
 */
function tagRules(p: string): string {
  return `
/**
 * @component tag
 * @summary An inline chip for a keyword or filter.
 * @example
 * <span class="instui-tag -size-sm">small</span>
 * @modifier -size-sm — A small tag.
 * @modifier -size-lg — A large tag.
 * @modifier -inline — Reads inline with text and gets a trailing dismiss glyph.
 * @modifier -readonly — Read-only (non-dismissable) tag.
 * @demo self:tag
 */
.${p}tag {
  display: inline-flex;
  align-items: center;
  height: var(--instui-component-tag-height-medium);
  max-width: var(--instui-component-tag-max-width);
  padding: 0 var(--instui-component-tag-padding-horizontal);
  background: var(--instui-component-tag-default-background);
  color: var(--instui-component-tag-default-color);
  border: var(--instui-component-tag-default-border-width) var(--instui-component-tag-default-border-style) var(--instui-component-tag-default-border-color);
  border-radius: var(--instui-component-tag-default-border-radius);
  font-family: var(--instui-component-tag-font-family);
  font-size: var(--instui-component-tag-font-size-medium);
}
.${p}tag:hover { background: var(--instui-component-tag-default-background-hover); }
.${p}tag.-size-sm {
  height: var(--instui-component-tag-height-small);
  padding: 0 var(--instui-component-tag-padding-horizontal-small);
  font-size: var(--instui-component-tag-font-size-small);
}
.${p}tag.-size-lg {
  height: var(--instui-component-tag-height-large);
  font-size: var(--instui-component-tag-font-size-large);
}
.${p}tag.-inline {
  gap: var(--instui-spacing-space-xs);
  background: var(--instui-component-tag-inline-background);
  color: var(--instui-component-tag-inline-color);
  border-color: var(--instui-component-tag-inline-border-color);
  border-radius: var(--instui-component-tag-inline-border-radius);
  cursor: pointer;
}
.${p}tag.-inline:hover { background: var(--instui-component-tag-inline-background-hover); }
.${p}tag.-inline::after {
  content: "";
  flex: none;
  width: 1em;
  height: 1em;
  background: var(--instui-component-tag-inline-icon-color);
  -webkit-mask: ${CLOSE_ICON};
  mask: ${CLOSE_ICON};
}
.${p}tag.-inline:hover::after { background: var(--instui-component-tag-inline-icon-hover-color); }
/* readOnly (InstUI): a static tag — no hover affordance, and the dismiss glyph is dropped. */
.${p}tag.-readonly {
  cursor: default;
  background: var(--instui-component-tag-default-background);
}
.${p}tag.-readonly.-inline::after { display: none; }
`;
}

/**
 * Avatar rules: a circular chip. By default (InstUI's `showBorder="auto"`) it's the base surface with
 * a subtle border and coloured initials — `-color-<name>` recolours the initials/border
 * (ash/blue/green/grey/orange/red, default blue/accent1). `-has-inverse-color` flips to a solid fill of
 * the colour with on-colour (white) initials. Sizes span `2xs`–`2xl`; plus `-shape-rectangle`,
 * `-show-border`, a `-icon-<name>` glyph (shared painter), and an `<img>` child for a photo.
 */
function avatarRules(p: string): string {
  // Default mode: the colour tints the initials (transparent surface). Inverse mode: the colour fills
  // the surface and the initials go on-colour (that rule is more specific, so it wins when combined).
  const color = (name: string): string =>
    `.${p}avatar.-color-${name} { color: var(--instui-component-avatar-${name}-text-color); }
.${p}avatar.-color-${name}.-has-inverse-color { background: var(--instui-component-avatar-${name}-background-color); }`;
  return `
/**
 * @component avatar
 * @summary A user avatar showing initials or an image, circular by default.
 * @example
 * <span class="instui-avatar">DW</span>
 * @modifier -color-ai — AI-accent palette colour.
 * @modifier -color-ash — Ash palette colour.
 * @modifier -color-blue — Blue palette colour.
 * @modifier -color-green — Green palette colour.
 * @modifier -color-grey — Grey palette colour.
 * @modifier -color-orange — Orange palette colour.
 * @modifier -color-red — Red palette colour.
 * @modifier -has-inverse-color — Use the inverse (on-dark) text colour.
 * @modifier -shape-rectangle — Square (rectangular) shape instead of a circle.
 * @modifier -show-border — Add a border ring.
 * @modifier -size-2xs — Two sizes smaller.
 * @modifier -size-xs — Extra small.
 * @modifier -size-sm — Small.
 * @modifier -size-lg — Large.
 * @modifier -size-xl — Extra large.
 * @modifier -size-2xl — Two sizes larger.
 */
.${p}avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--instui-component-avatar-size-md);
  height: var(--instui-component-avatar-size-md);
  border-radius: 50%;
  overflow: hidden;
  background: var(--instui-component-avatar-background-color);
  color: var(--instui-component-avatar-blue-text-color);
  border: var(--instui-component-avatar-border-width-sm) solid var(--instui-component-avatar-border-color);
  font-family: var(--instui-component-avatar-font-family);
  font-size: var(--instui-component-avatar-font-size-md);
  font-weight: var(--instui-component-avatar-font-weight);
}
.${p}avatar.-shape-rectangle { border-radius: var(--instui-component-avatar-rectangle-radius); }
.${p}avatar.-size-sm {
  width: var(--instui-component-avatar-size-sm);
  height: var(--instui-component-avatar-size-sm);
  font-size: var(--instui-component-avatar-font-size-sm);
}
.${p}avatar.-size-2xs {
  width: var(--instui-component-avatar-size2xs);
  height: var(--instui-component-avatar-size2xs);
  font-size: var(--instui-component-avatar-font-size2xs);
}
.${p}avatar.-size-xs {
  width: var(--instui-component-avatar-size-xs);
  height: var(--instui-component-avatar-size-xs);
  font-size: var(--instui-component-avatar-font-size-xs);
}
.${p}avatar.-size-lg {
  width: var(--instui-component-avatar-size-lg);
  height: var(--instui-component-avatar-size-lg);
  font-size: var(--instui-component-avatar-font-size-lg);
}
.${p}avatar.-size-xl {
  width: var(--instui-component-avatar-size-xl);
  height: var(--instui-component-avatar-size-xl);
  font-size: var(--instui-component-avatar-font-size-xl);
}
.${p}avatar.-size-2xl {
  width: var(--instui-component-avatar-size2xl);
  height: var(--instui-component-avatar-size2xl);
  font-size: var(--instui-component-avatar-font-size2xl);
}
${color("ash")}
${color("blue")}
${color("green")}
${color("grey")}
${color("orange")}
${color("red")}
/* ai: always the violet→sea gradient fill with on-colour text (no border). */
.${p}avatar.-color-ai {
  background: linear-gradient(to bottom, var(--instui-component-avatar-ai-top-gradient-color), var(--instui-component-avatar-ai-bottom-gradient-color));
  color: var(--instui-component-avatar-text-on-color);
  border-color: transparent;
}
/* hasInverseColor: solid fill (default the accent1/blue surface) + on-colour initials, no ring. A
   \`-color-*\` companion overrides the fill per colour (that rule is more specific). */
.${p}avatar.-has-inverse-color {
  background: var(--instui-component-avatar-blue-background-color);
  color: var(--instui-component-avatar-text-on-color);
  border-color: transparent;
}
/* showBorder="always": force the ring back on, even over an inverse fill or a photo. */
.${p}avatar.-show-border {
  border-width: var(--instui-component-avatar-border-width-md);
  border-style: solid;
  border-color: var(--instui-component-avatar-border-color);
}
/* A photo: an <img> child fills the chip and covers the initials (image takes priority). */
.${p}avatar > img {
  inline-size: 100%;
  block-size: 100%;
  object-fit: cover;
  border-radius: inherit;
}
`;
}

/**
 * Tabs rules: a container (`.tabs`) scoping a tab list (`.list`), tabs (`.tab`), and panels (`.panel`).
 * Two variants (InstUI's `variant` prop, set on the container): the default underline style, and a
 * `-variant-secondary` "folder" style whose selected tab connects into the panel. Per-tab state is
 * `-selected`/`[aria-selected]` and `-disabled`/`[aria-disabled]`; `-overflow-scroll` (InstUI
 * `tabOverflow="scroll"`) swaps wrapping for a horizontal scroller. Padding, radii, and the underline
 * thickness are the literals InstUI hardcodes in its Tab styles (`1rem 1.25rem`, `0.75rem 1rem`,
 * `0.1875rem`, `0.25rem`); everything else is token-driven. The full-width rule under the tabs is the
 * selected panel's `border-top`, and the selected tab overlaps it by the panel border width.
 */
function tabsRules(p: string): string {
  const root = `.${p}tabs`;
  return `
/**
 * @component tabs
 * @summary A tabbed panel set: a tab list, selectable tabs, and their panels.
 * @example
 * <div class="instui-tabs">
 *   <div class="list" role="tablist" aria-label="Default tabs">
 *     <button class="tab -selected" role="tab" aria-selected="true">Overview</button>
 *     <button class="tab" role="tab" aria-selected="false">Details</button>
 *     <button class="tab -disabled" role="tab" aria-disabled="true" disabled>Disabled</button>
 *     <button class="tab" role="tab" aria-selected="false">History</button>
 *   </div>
 *   <div class="panel" role="tabpanel">The Overview tab's content shows here.</div>
 * </div>
 * @structure
 * .instui-tabs
 *   .list
 *     .tab.-selected
 *     .tab
 *     .tab.-disabled
 *   .panel
 * @part .list — The row of tabs.
 * @part .tab — A single tab; \`-selected\` marks the active one.
 * @part .panel — The content panel for a tab.
 */
${root} {
  display: flex;
  flex-direction: column;
  background: var(--instui-component-tabs-default-background);
}
${scope(
  root,
  `
.${p}tabs .list {
  display: flex;
  width: 100%;
  flex-flow: row wrap;
}
.${p}tabs.-overflow-scroll .list {
  flex-wrap: nowrap;
  overflow-x: auto;
  scrollbar-width: none;
}
.${p}tabs.-overflow-scroll .list::-webkit-scrollbar { display: none; }
.${p}tabs .tab {
  appearance: none;
  -webkit-appearance: none;
  background: transparent;
  border: 0;
  color: var(--instui-component-tabs-tab-default-text-color);
  font-family: var(--instui-component-tabs-tab-font-family);
  font-size: var(--instui-component-tabs-tab-font-size);
  font-weight: var(--instui-component-tabs-tab-font-weight);
  line-height: 1;
  padding: 1rem 1.25rem;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
  position: relative;
  z-index: 1;
  /* Layout-stable underline: always 0.25rem, coloured only when hovered or selected. */
  border-bottom: 0.25rem solid transparent;
  margin-bottom: calc(-1 * var(--instui-component-tabs-panel-border-width));
}
.${p}tabs .tab:hover:not(.-selected):not(.-disabled):not([aria-selected="true"]):not([aria-disabled="true"]) {
  border-bottom-color: var(--instui-component-tabs-tab-default-hover-border-color);
}
.${p}tabs .tab.-selected,
.${p}tabs .tab[aria-selected="true"] {
  border-bottom-color: var(--instui-component-tabs-tab-default-selected-border-color);
}
.${p}tabs .tab.-disabled,
.${p}tabs .tab[aria-disabled="true"],
.${p}tabs .tab:disabled {
  opacity: 0.5;
  font-weight: normal;
  cursor: default;
}
/* Secondary variant: rounded "folder" tabs; the selected tab's bottom border matches the panel
   background so it visually connects into the panel below. */
.${p}tabs.-variant-secondary .tab {
  padding: 0.75rem 1rem;
  line-height: var(--instui-component-tabs-tab-line-height);
  color: var(--instui-component-tabs-tab-secondary-text-color);
  margin-inline-end: 0.2em;
  margin-bottom: calc(-1 * var(--instui-component-tabs-panel-border-width));
  border: var(--instui-component-tabs-panel-border-width) solid transparent;
  border-radius: 0.1875rem 0.1875rem 0 0;
}
.${p}tabs.-variant-secondary .tab:first-of-type { margin-inline-start: 0; }
.${p}tabs.-variant-secondary .tab:hover:not(.-selected):not(.-disabled):not([aria-selected="true"]):not([aria-disabled="true"]) {
  background: var(--instui-component-tabs-tab-secondary-selected-background);
  border-color: var(--instui-component-tabs-tab-secondary-selected-border-color);
  color: var(--instui-component-tabs-tab-secondary-selected-text-color);
}
.${p}tabs.-variant-secondary .tab.-selected,
.${p}tabs.-variant-secondary .tab[aria-selected="true"] {
  background: var(--instui-component-tabs-tab-secondary-selected-background);
  border-color: var(--instui-component-tabs-tab-secondary-selected-border-color);
  border-bottom-color: var(--instui-component-tabs-tab-secondary-selected-background);
  color: var(--instui-component-tabs-tab-secondary-selected-text-color);
}
.${p}tabs .panel {
  box-sizing: border-box;
  border-top: var(--instui-component-tabs-panel-border-width) solid var(--instui-component-tabs-panel-border-color);
  background: var(--instui-component-tabs-panel-background);
  color: var(--instui-component-tabs-panel-text-color);
  font-family: var(--instui-component-tabs-panel-font-family);
  font-size: var(--instui-component-tabs-panel-font-size);
  font-weight: var(--instui-component-tabs-panel-font-weight);
  line-height: var(--instui-component-tabs-panel-line-height);
  padding: var(--instui-spacing-space-sm) var(--instui-spacing-space-md) var(--instui-spacing-space-md);
}
.${p}tabs .panel[hidden] { display: none; }
`,
  ["list", "panel"],
)}
`;
}

/** Metric rules: a stacked value + label. */
function metricRules(p: string): string {
  const root = `.${p}metric`;
  return `
/**
 * @component metric
 * @summary A labelled statistic — a large value over a caption.
 * @example
 * <div class="instui-metric">
 *   <span class="value">1,284</span>
 *   <span class="label">Active users</span>
 * </div>
 * @structure
 * .instui-metric
 *   .value
 *   .label
 * @modifier -text-align-start — Start-align the value and label.
 * @modifier -text-align-center — Centre the value and label.
 * @modifier -text-align-end — End-align the value and label.
 * @part .value — The large metric number.
 * @part .label — The caption beneath the value.
 */
${root} {
  display: inline-flex;
  flex-direction: column;
  gap: var(--instui-component-metric-gap-texts);
  padding: 0 var(--instui-component-metric-padding-horizontal);
}
${scope(
  root,
  `
.${p}metric .value {
  color: var(--instui-component-metric-value-color);
  font-family: var(--instui-component-metric-value-font-family);
  font-size: var(--instui-component-metric-value-font-size);
  font-weight: var(--instui-component-metric-value-font-weight);
  line-height: var(--instui-component-metric-value-line-height);
}
.${p}metric .label {
  color: var(--instui-component-metric-label-color);
  font-family: var(--instui-component-metric-label-font-family);
  font-size: var(--instui-component-metric-label-font-size);
  font-weight: var(--instui-component-metric-label-font-weight);
  line-height: var(--instui-component-metric-label-line-height);
}
`,
  ["value", "label"],
)}
/* textAlign: the value/label are flex items in a column, so cross-axis alignment (align-items) is what
   actually positions them — text-align alone is a no-op on the shrink-wrapped box. Set both so it also
   covers wrapped multi-line text. */
${root}.-text-align-start { align-items: flex-start; text-align: start; }
${root}.-text-align-center { align-items: center; text-align: center; }
${root}.-text-align-end { align-items: flex-end; text-align: end; }
`;
}

/** Byline rules: a figure (avatar) beside a title and description. */
/**
 * Img rules: a styled `<img>`. `-display-block`, `-constrain-{cover,contain}` (object-fit within a sized
 * box), and the `-with-grayscale`/`-with-blur` effects (composed through a custom property so they stack).
 * InstUI's colour `overlay` needs a wrapping element (an `<img>` can't host a pseudo-element), so it's
 * left to the consumer; everything else is a modifier on the image itself.
 */
function imgRules(p: string): string {
  const root = `.${p}img`;
  return `
/**
 * @component img
 * @summary A styled \`<img>\` with display, crop, and effect modifiers that stack.
 * @example
 * <img class="instui-img" alt="Gradient">
 * @modifier -display-block — Display as a block element.
 * @modifier -constrain-cover — Scale to fill the box (cover).
 * @modifier -constrain-contain — Scale to fit within the box (contain).
 * @modifier -with-grayscale — Apply a grayscale effect.
 * @modifier -with-blur — Apply a blur effect.
 */
${root} {
  display: inline-block;
  max-inline-size: 100%;
  block-size: auto;
  --pantoken-img-filter: none;
  filter: var(--pantoken-img-filter);
  transition: filter var(--instui-component-img-effect-transition-duration) ease;
}
${root}.-display-block { display: block; }
/* constrain: fill a sized box (the consumer sets width/height). */
${root}.-constrain-cover { inline-size: 100%; block-size: 100%; object-fit: cover; }
${root}.-constrain-contain { inline-size: 100%; block-size: 100%; object-fit: contain; }
/* Effects compose through the custom property, so grayscale + blur can apply together. */
${root}.-with-grayscale { --pantoken-img-filter: grayscale(1); }
${root}.-with-blur { --pantoken-img-filter: blur(var(--instui-component-img-image-blur-amount)); }
${root}.-with-grayscale.-with-blur { --pantoken-img-filter: grayscale(1) blur(var(--instui-component-img-image-blur-amount)); }
`;
}

function bylineRules(p: string): string {
  const root = `.${p}byline`;
  // Root + size/align rules stay outside @scope, prefixed, so the size-alias post-processor's twins are
  // valid; only the size-free element rules go inside.
  return `
/**
 * @component byline
 * @summary A media object: a hero figure beside a title and description.
 * @example
 * <div class="instui-byline -size-md">
 *   <span class="instui-icon -icon-megaphone"></span>
 *   <div>
 *     <div class="title">What's new</div>
 *     <div class="description">The figure can be any leading visual — an icon, an avatar, or an image.</div>
 *   </div>
 * </div>
 * @structure
 * .instui-byline.-size-md
 *   .instui-icon.-icon-megaphone
 *   div
 *     .title
 *     .description
 * @modifier -align-content-center — Vertically centre the text beside the hero.
 * @modifier -align-content-top — Align the text to the top of the hero.
 * @modifier -size-sm — Small.
 * @modifier -size-md — Medium.
 * @modifier -size-lg — Large.
 * @part .hero — The leading figure (icon, image, or avatar).
 * @part .title — The heading text.
 * @part .description — The supporting body text.
 */
${root} {
  display: flex;
  align-items: center;
  gap: var(--instui-component-byline-figure-margin);
  background: var(--instui-component-byline-background);
  color: var(--instui-component-byline-color);
  font-family: var(--instui-component-byline-font-family);
}
/* alignContent="top" (default is center, from align-items above). */
.${p}byline.-align-content-top { align-items: flex-start; }
.${p}byline.-align-content-center { align-items: center; }
/* size sets a max-width (InstUI's byline small/medium/large). The size tokens are @property-only
   (registered, unvalued) in the IR, so each carries a literal fallback. */
.${p}byline.-size-sm { max-width: var(--instui-component-byline-small, 20rem); }
.${p}byline.-size-md { max-width: var(--instui-component-byline-medium, 30rem); }
.${p}byline.-size-lg { max-width: var(--instui-component-byline-large, 40rem); }
${scope(
  root,
  `
.${p}byline .title {
  margin: 0 0 var(--instui-component-byline-title-margin);
  font-size: var(--instui-component-byline-title-font-size);
  font-weight: var(--instui-component-byline-title-font-weight);
  line-height: var(--instui-component-byline-title-line-height);
}
.${p}byline .description {
  font-size: var(--instui-component-byline-description-font-size);
  font-weight: var(--instui-component-byline-description-font-weight);
  line-height: var(--instui-component-byline-description-line-height);
}
`,
)}
`;
}

/** Table rules: the InstUI table look as a class (for tables you build yourself). */
function tableRules(p: string): string {
  return `
/**
 * @component table
 * @summary A styled data table for \`th\` and \`td\` plus an optional caption, with hover, fixed, and stacked-card layouts.
 * @example
 * <table class="instui-table -hover">
 *   <caption>Top-rated films</caption>
 *   <thead>
 *     <tr>
 *       <th scope="col">Rank</th>
 *       <th scope="col">Title</th>
 *       <th scope="col">Year</th>
 *       <th scope="col">Rating</th>
 *     </tr>
 *   </thead>
 *   <tbody>
 *     <tr>
 *       <th scope="row">1</th>
 *       <td>The Shawshank Redemption</td>
 *       <td>1994</td>
 *       <td>9.3</td>
 *     </tr>
 *     <tr>
 *       <th scope="row">2</th>
 *       <td>The Godfather</td>
 *       <td>1972</td>
 *       <td>9.2</td>
 *     </tr>
 *     <tr>
 *       <th scope="row">3</th>
 *       <td>The Godfather: Part II</td>
 *       <td>1974</td>
 *       <td>9.0</td>
 *     </tr>
 *   </tbody>
 * </table>
 * @structure
 * .instui-table.-hover
 *   caption
 *   thead
 *     tr
 *       th
 *   tbody
 *     tr
 *       th
 *       td
 * @modifier -hover — Highlight rows on hover.
 * @modifier -layout-fixed — Fixed table layout (equal-width columns).
 * @modifier -layout-stacked — Stack each row as a card, via a per-cell \`data-label\`.
 */
.${p}table {
  border-collapse: collapse;
  width: 100%;
  background: var(--instui-component-table-background);
  color: var(--instui-component-table-color);
  font-family: var(--instui-component-table-font-family);
  font-size: var(--instui-component-table-font-size);
}
.${p}table caption {
  text-align: start;
  padding: var(--instui-component-table-cell-padding-vertical) var(--instui-component-table-cell-padding-horizontal);
  color: var(--instui-component-table-col-header-color);
  font-weight: var(--instui-component-table-head-font-weight);
}
/* layout="fixed": columns size to the header/first row, not content (InstUI \`layout\`). */
.${p}table.-layout-fixed { table-layout: fixed; }
.${p}table thead { background: var(--instui-component-table-head-background); }
.${p}table th {
  text-align: start;
  background: var(--instui-component-table-col-header-background);
  color: var(--instui-component-table-col-header-color);
  font-weight: var(--instui-component-table-head-font-weight);
  line-height: var(--instui-component-table-col-header-line-height);
  padding: var(--instui-component-table-col-header-padding-vertical) var(--instui-component-table-col-header-padding-horizontal);
}
/* The column-header underline lives on the head only — a distinct 2px rule under the header row. */
.${p}table thead th { border-bottom: var(--instui-border-width-md) solid var(--instui-component-table-row-border-color); }
/* A row-header cell (th scope=row) — styled from the row-header tokens, not the column-header ones. */
.${p}table tbody th,
.${p}table th[scope="row"] {
  background: var(--instui-component-table-row-header-background);
  color: var(--instui-component-table-row-header-color);
  font-weight: var(--instui-component-table-row-header-font-weight);
  line-height: var(--instui-component-table-row-header-line-height);
  padding: var(--instui-component-table-row-header-padding-vertical) var(--instui-component-table-row-header-padding-horizontal);
}
.${p}table td {
  color: var(--instui-component-table-cell-color);
  line-height: var(--instui-component-table-cell-line-height);
  padding: var(--instui-component-table-cell-padding-vertical) var(--instui-component-table-cell-padding-horizontal);
}
/* Body cells carry no border of their own — the separator lives on the row. Reset with tbody
   specificity (0,1,2) so a host stylesheet's cell borders (e.g. \`.pantoken-prose td\`, 0,1,1) can't leak
   in and double the row line (very visible in the stacked layout, where cells are display:block). */
.${p}table tbody td,
.${p}table tbody th { border: 0; }
/* The row separator is a single border on the ROW (InstUI puts it there), so it's uniform across the
   row-header and data cells — no mismatched per-cell borders. */
.${p}table tbody tr { border-bottom: var(--instui-border-width-sm) solid var(--instui-component-table-row-border-color); }
/* hover="true" (InstUI's opt-in \`hover\` prop): every row reserves a transparent 3px inline border and
   colours it with the brand hover-border on hover — a vertical bar on each edge, NOT a full box, and
   no layout shift. Only rows in a \`.-hover\` table react. */
.${p}table.-hover tbody tr { border-inline: 0.1875rem solid transparent; }
.${p}table.-hover tbody tr:hover { border-inline-color: var(--instui-component-table-row-hover-border-color); }
/* layout="stacked": each row becomes a card and cells stack, labelled by their column. InstUI does this
   by re-rendering the DOM; pure CSS can't pull the <th> text into each cell, so the author supplies a
   \`data-label\` per cell and it's shown via ::before. Always-on (toggle the class responsively). */
.${p}table.-layout-stacked thead {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
}
.${p}table.-layout-stacked,
.${p}table.-layout-stacked tbody,
.${p}table.-layout-stacked tr,
.${p}table.-layout-stacked td,
.${p}table.-layout-stacked th {
  display: block;
  width: auto;
}
/* InstUI's stacked row is just padding + the single bottom-border separator (the row's existing
   border-bottom carries over) — NOT a full card box. */
.${p}table.-layout-stacked tbody tr {
  padding: var(--instui-component-table-row-padding-vertical) var(--instui-component-table-row-padding-horizontal);
}
.${p}table.-layout-stacked tbody td[data-label]::before,
.${p}table.-layout-stacked tbody th[data-label]::before {
  content: attr(data-label);
  display: block;
  font-weight: var(--instui-component-table-head-font-weight);
  color: var(--instui-component-table-col-header-color);
}
`;
}

/**
 * Link rules: `.<prefix>-link` with a hover and disabled state. Sizes `--sm`/`--lg`, an `--on-color`
 * scheme for dark surfaces, an `--inline` variant (for links inside running text), and `--unstyled`.
 */
function linkRules(p: string): string {
  return `
/**
 * @component link
 * @summary A styled hyperlink with sizes, an inverse variant for dark backgrounds, and inline or unstyled forms.
 * @example
 * <a class="instui-link" href="#">A styled link</a>
 * @modifier -color-inverse — For dark backgrounds.
 * @modifier -inline — Inline link, underlined within flowing text.
 * @modifier -sm — Small inline link (used with \`-inline\`).
 * @modifier -lg — Large inline link (used with \`-inline\`).
 * @modifier -unstyled — Strip link styling: inherit colour, no underline.
 * @modifier -size-sm — Small.
 * @modifier -size-lg — Large.
 */
.${p}link {
  display: inline-flex;
  align-items: center;
  gap: var(--instui-component-link-gap-md);
  color: var(--instui-component-link-text-color);
  font-family: var(--instui-component-link-font-family);
  font-size: var(--instui-component-link-font-size-md);
  font-weight: var(--instui-component-link-font-weight);
  line-height: var(--instui-component-link-line-height-md);
  text-decoration: var(--instui-component-link-text-decoration-outside-text);
  cursor: pointer;
}
.${p}link:hover { color: var(--instui-component-link-text-hover-color); }
.${p}link[aria-disabled="true"] {
  color: var(--instui-component-link-text-disabled-color);
  cursor: not-allowed;
}
.${p}link.-size-sm {
  gap: var(--instui-component-link-gap-sm);
  font-size: var(--instui-component-link-font-size-sm);
  line-height: var(--instui-component-link-line-height-sm);
}
.${p}link.-size-lg {
  gap: var(--instui-component-link-gap-lg);
  font-size: var(--instui-component-link-font-size-lg);
  line-height: var(--instui-component-link-line-height-lg);
}
.${p}link.-color-inverse { color: var(--instui-component-link-on-color-text-color); }
.${p}link.-color-inverse:hover { color: var(--instui-component-link-on-color-text-hover-color); }
.${p}link.-color-inverse[aria-disabled="true"] { color: var(--instui-component-link-on-color-text-disabled-color); }
/* An inline link, decorated within the flow of text. */
.${p}link.-inline {
  display: inline;
  font-family: var(--instui-component-link-inline-link-medium-font-family);
  font-size: var(--instui-component-link-inline-link-medium-font-size);
  font-weight: var(--instui-component-link-inline-link-medium-font-weight);
  line-height: var(--instui-component-link-inline-link-medium-line-height);
  text-decoration: var(--instui-component-link-text-decoration-within-text);
}
.${p}link.-inline.-sm {
  font-size: var(--instui-component-link-inline-link-small-font-size);
  font-weight: var(--instui-component-link-inline-link-small-font-weight);
  line-height: var(--instui-component-link-inline-link-small-line-height);
}
.${p}link.-inline.-lg {
  font-size: var(--instui-component-link-inline-link-large-font-size);
  font-weight: var(--instui-component-link-inline-link-large-font-weight);
  line-height: var(--instui-component-link-inline-link-large-line-height);
}
.${p}link.-unstyled {
  color: var(--instui-component-link-unstyled-text-color);
  text-decoration: none;
}
`;
}

/**
 * Icon rules: any element carrying a glyph class from the icon sheet paints that glyph as a masked
 * `::before` in `currentColor`, sized to the text — so a single `<span class="instui-icon-megaphone">`
 * renders an icon anywhere, no wrapper class. Because the painter is a `::before`, a glyph class can
 * also ride a host element without repainting it — that's how the pill's flat `renderIcon` works.
 */
function iconRules(p: string): string {
  return `
/**
 * @utility icon
 * @summary The icon system: \`.instui-icon\` sizing plus the shared \`-icon-<name>\` painter that masks a glyph (in \`currentColor\`) before any element.
 * @example <span class="instui-icon -icon-megaphone" aria-hidden="true"></span>
 */
.${p}icon { display: inline-flex; }
[class*="-icon-"]::before {
  content: "";
  display: inline-block;
  inline-size: 1em;
  block-size: 1em;
  flex: none;
  vertical-align: -0.125em;
  background: currentColor;
  -webkit-mask: var(--pantoken-glyph) center / contain no-repeat;
  mask: var(--pantoken-glyph) center / contain no-repeat;
}
`;
}

/** Options for {@link iconGlyphsCss}. */
export interface IconGlyphsOptions extends ComponentOptions {
  /**
   * Also emit the deprecated InstUI-prop glyph aliases (`-render-icon-<name>`, `-render-custom-icon-<name>`)
   * as functional aliases of `-icon-<name>`. Off by default — turning it on roughly doubles the sheet, so
   * enable it only when you need markup written against the old `renderIcon`/`renderCustomIcon` prop names
   * to keep rendering. The shipped `icons.css` is built with this on.
   */
  deprecatedAliases?: boolean;
}

/**
 * Build the icon-glyph stylesheet: one `.<prefix>-icon-<name>` class per icon that points
 * `--pantoken-glyph` at the matching `--instui-icon-<name>` token. Kept out of the component bundle
 * (it's large); ships as its own `icons.css`. Pass the icon names (e.g. from `@pantoken/icons`).
 *
 * @param names - Icon names without the `--instui-icon-` prefix (e.g. `["megaphone", "check"]`).
 * @param options - {@link IconGlyphsOptions} (adds `deprecatedAliases` to {@link ComponentOptions}).
 * @returns The CSS string.
 *
 * @example
 * ```ts
 * import { iconGlyphsCss } from "@pantoken/components";
 * import { icons } from "@pantoken/icons";
 *
 * const css = iconGlyphsCss(icons.map((i) => i.name)); // .-icon-megaphone { --pantoken-glyph: … }
 * ```
 *
 * This is the glyph-token half of the icon system (the `.-icon-<name>` modifiers, shipped as
 * `icons.css`); {@link iconCss} is the painter half (the shared `::before`). They share the `icon`
 * demo. See {@link iconCss}.
 */
export function iconGlyphsCss(names: readonly string[], options: IconGlyphsOptions = {}): string {
  const prefix = options.prefix || "";
  const p = ns(prefix);
  void p; // glyph classes are prefix-independent modifiers (.-icon-<name>); consumed by any host.
  // The deprecated InstUI prop names that normalized to `-icon-<name>` (Pill's `renderIcon`, Alert's
  // `renderCustomIcon`). When `deprecatedAliases` is on, they're grouped onto the same rule as
  // FUNCTIONAL aliases (they set the same glyph var, and both contain the `-icon-` substring so the
  // shared painter + Alert's glyph pipe already fire) — otherwise omitted, which roughly halves the
  // sheet. They're `@deprecated` in each component's doc comment either way.
  const prefixes = options.deprecatedAliases
    ? ["-icon", "-render-icon", "-render-custom-icon"]
    : ["-icon"];
  const selectors = (name: string): string => prefixes.map((pre) => `.${pre}-${name}`).join(", ");
  const rules = names
    .map((name) => `${selectors(name)} { --pantoken-glyph: var(--instui-icon-${name}); }`)
    .join("\n");
  return `/* InstUI icon glyphs (@pantoken/components) — prefix: ${prefix} */\n${rules}\n`;
}

// ─── Utilities ──────────────────────────────────────────────────────────────
// Cross-cutting helpers (spacing, semantic colour) + a View primitive — InstUI's `View` props
// (`margin`/`padding`/`background`/`color`) expressed as standalone, namespaced classes. Unlike the
// component `-modifier` classes (which only style when compound with a base), these apply to any
// element, so they carry the `instui-` prefix. Large but opt-in (its own `utilities.css`) and
// treeshakeable.

/** The pantoken spacing scale (the `--instui-spacing-space-*` tokens) plus `0` and `auto`. */
const SPACING_STEPS: Record<string, string> = {
  "0": "0",
  "2xs": "var(--instui-spacing-space2xs)",
  xs: "var(--instui-spacing-space-xs)",
  sm: "var(--instui-spacing-space-sm)",
  md: "var(--instui-spacing-space-md)",
  lg: "var(--instui-spacing-space-lg)",
  xl: "var(--instui-spacing-space-xl)",
  "2xl": "var(--instui-spacing-space2xl)",
};

/** Logical sides (RTL-safe): key → the property suffix appended to `margin`/`padding`. */
const SPACING_SIDES: Record<string, string> = {
  "": "",
  t: "-block-start",
  b: "-block-end",
  s: "-inline-start",
  e: "-inline-end",
  x: "-inline",
  y: "-block",
};

/**
 * Build the spacing utility stylesheet: `.<prefix>-m{side}-{step}` / `.<prefix>-p{side}-{step}` on the
 * pantoken spacing scale, plus `margin`/`padding` long-form aliases (`.<prefix>-margin{side}-{step}`).
 * Compose to express InstUI's `margin="small auto large"` shorthand —
 * `<div class="instui-mt-sm instui-mx-auto instui-mb-lg">`. Sides are logical: `t`/`b` (block),
 * `s`/`e` (inline start/end), `x`/`y`, and none (all). Margin adds `auto`; padding omits it.
 *
 * @param options - {@link ComponentOptions}.
 * @returns The CSS string.
 *
 * @demo self:spacing
 */
export function spacingUtilitiesCss(options: ComponentOptions = {}): string {
  const prefix = options.prefix || "";
  const p = ns(prefix);
  const rules: string[] = [];
  for (const [prop, letters, steps] of [
    ["margin", ["m", "margin"], { ...SPACING_STEPS, auto: "auto" }],
    ["padding", ["p", "padding"], SPACING_STEPS],
  ] as const) {
    for (const letter of letters) {
      for (const [side, suffix] of Object.entries(SPACING_SIDES)) {
        for (const [step, value] of Object.entries(steps)) {
          rules.push(`.${p}${letter}${side}-${step} { ${prop}${suffix}: ${value}; }`);
        }
      }
    }
  }
  return `/**
 * @utility spacing
 * @class .instui-p-md
 * @summary Margin and padding utilities — \`.instui-m<side>-<step>\` and \`.instui-p<side>-<step>\` on the spacing scale (sides \`t\`/\`b\`/\`s\`/\`e\`/\`x\`/\`y\` or none; margin also takes \`auto\`).
 * @example <div class="instui-p-md instui-mt-lg">Padded box with a large top margin.</div>
 */
/* InstUI spacing utilities (@pantoken/components) — prefix: ${prefix} */\n${rules.join("\n")}\n`;
}

// The generic token → utility-class emitters (`colorUtilitiesCss`, `tokenUtilitiesCss`) now live in
// `@pantoken/utils` — they carry no InstUI-look opinion, and the primitive tier
// (`@pantoken/plugin-primitives`) consumes them from there too, so it no longer reaches up into this
// format. `generate.ts` imports them from `@pantoken/utils` and feeds the curated *semantic* names.

/**
 * Build the View primitive: `.<prefix>-view`, InstUI's `View`. Beyond the neutral box, it carries
 * key-value modifiers for View's own visual props — `-background-*`, `-border-radius-*`,
 * `-border-width-*`, `-border-color-*`, `-shadow-*`, `-display-*`, `-position-*`, `-overflow-x-*`,
 * `-overflow-y-*`, `-cursor-*` — so it has the same modifier devex as the other components. Free-value
 * props (width/height/inset) stay inline styles; the spacing utilities cover `margin`/`padding`.
 *
 * @param options - {@link ComponentOptions}.
 * @returns The CSS string.
 *
 * @demo self:view
 */
export function viewCss(options: ComponentOptions = {}): string {
  const prefix = options.prefix || "";
  const p = ns(prefix);
  const rule = (mod: string, decls: string): string => `.${p}view.-${mod} { ${decls} }`;
  const rules: string[] = [`.${p}view { display: block; box-sizing: border-box; }`];
  // background — InstUI View's surfaces (its own component-view-background-* tokens).
  for (const bg of [
    "primary",
    "secondary",
    "primary-inverse",
    "brand",
    "info",
    "alert",
    "success",
    "danger",
    "warning",
  ]) {
    rules.push(
      rule(`background-${bg}`, `background: var(--instui-component-view-background-${bg});`),
    );
  }
  rules.push(rule("background-transparent", "background: transparent;"));
  // border-radius — InstUI View's named radii (circle/pill are shape values).
  for (const [name, value] of [
    ["small", "var(--instui-border-radius-sm)"],
    ["medium", "var(--instui-border-radius-md)"],
    ["large", "var(--instui-border-radius-lg)"],
    ["circle", "50%"],
    ["pill", "var(--instui-border-radius-full)"],
  ] as const) {
    rules.push(rule(`border-radius-${name}`, `border-radius: ${value};`));
  }
  // border-width — sets a solid border in the base stroke colour (override with -border-color-*).
  for (const [name, size] of [
    ["small", "sm"],
    ["medium", "md"],
    ["large", "lg"],
  ] as const) {
    rules.push(
      rule(
        `border-width-${name}`,
        `border-style: solid; border-width: var(--instui-border-width-${size}); border-color: var(--instui-color-stroke-base);`,
      ),
    );
  }
  // border-color — semantic stroke colours (danger maps to the error stroke token).
  for (const [name, token] of [
    ["primary", "base"],
    ["brand", "brand"],
    ["success", "success"],
    ["info", "info"],
    ["warning", "warning"],
    ["danger", "error"],
  ] as const) {
    rules.push(rule(`border-color-${name}`, `border-color: var(--instui-color-stroke-${token});`));
  }
  // shadow — the named elevations (defined by elevationCss, shipped in components.css).
  for (const s of ["resting", "above", "topmost"]) {
    rules.push(rule(`shadow-${s}`, `box-shadow: var(--instui-elevation-${s});`));
  }
  // display / position / overflow / cursor — plain CSS enums.
  for (const d of ["block", "inline-block", "inline", "flex", "inline-flex", "none"]) {
    rules.push(rule(`display-${d}`, `display: ${d};`));
  }
  for (const pos of ["static", "relative", "absolute", "fixed", "sticky"]) {
    rules.push(rule(`position-${pos}`, `position: ${pos};`));
  }
  for (const o of ["visible", "hidden", "auto", "scroll", "clip"]) {
    rules.push(rule(`overflow-x-${o}`, `overflow-x: ${o};`));
    rules.push(rule(`overflow-y-${o}`, `overflow-y: ${o};`));
  }
  for (const c of ["auto", "default", "pointer", "not-allowed", "text", "move", "grab", "wait"]) {
    rules.push(rule(`cursor-${c}`, `cursor: ${c};`));
  }
  return `/**
 * @utility view
 * @summary The View primitive: a neutral box with key-value modifiers for background, border, radius, shadow, display, position, overflow, and cursor.
 * @example <div class="instui-view -background-secondary -border-radius-medium -shadow-resting">A card-like surface.</div>
 */
/* InstUI View primitive (@pantoken/components) — prefix: ${prefix} */\n${rules.join("\n")}\n`;
}

/**
 * Build the layout utilities: `.<prefix>-display-<value>` and `.<prefix>-text-align-<value>`. These
 * cover InstUI's cross-cutting `display` and `textAlign` props (on View, Button, Metric, Tabs, …) as
 * composable classes, so they don't need to be per-component modifiers.
 *
 * @param options - {@link ComponentOptions}.
 * @returns The CSS string.
 *
 * @demo self:layout
 */
export function layoutUtilitiesCss(options: ComponentOptions = {}): string {
  const prefix = options.prefix || "";
  const p = ns(prefix);
  const rules = [
    ...["block", "inline-block", "inline", "flex", "inline-flex", "none"].map(
      (v) => `.${p}display-${v} { display: ${v}; }`,
    ),
    ...(
      [
        ["start", "start"],
        ["center", "center"],
        ["end", "end"],
        ["justify", "justify"],
      ] as const
    ).map(([name, value]) => `.${p}text-align-${name} { text-align: ${value}; }`),
  ].join("\n");
  return `/**
 * @utility layout
 * @class .instui-display-flex
 * @summary Display and text-align utilities — \`.instui-display-<value>\` and \`.instui-text-align-<value>\` — as composable classes.
 * @example
 * <div class="instui-display-flex instui-text-align-center">
 *   <span>One</span>
 *   <span>Two</span>
 * </div>
 */
/* InstUI layout utilities (@pantoken/components) — prefix: ${prefix} */\n${rules}\n`;
}

/**
 * Responsive visibility utilities — the closest pure-CSS analogue to InstUI's `<Responsive>`. Media
 * queries can't read custom properties (and the `--instui-breakpoints-*` tokens are `@property`-only,
 * unvalued), so the widths are literal, matched to the size scale: `sm` 30rem, `md` 48rem, `lg` 64rem,
 * `xl` 80rem. `.<prefix>-hidden-max-<bp>` hides at/below a viewport width; `.<prefix>-hidden-min-<bp>`
 * hides at/above it. These react to the VIEWPORT; for a component that adapts to its OWN width, wrap it
 * in a `container-type: inline-size` element and use `@container` queries with the same widths.
 *
 * @demo self:responsive
 */
export function responsiveUtilitiesCss(options: ComponentOptions = {}): string {
  const prefix = options.prefix || "";
  const p = ns(prefix);
  const bp: [string, string][] = [
    ["sm", "30rem"],
    ["md", "48rem"],
    ["lg", "64rem"],
    ["xl", "80rem"],
  ];
  const viewport = bp
    .map(
      ([name, w]) =>
        `@media (max-width: ${w}) { .${p}hidden-max-${name} { display: none !important; } }\n` +
        `@media (min-width: ${w}) { .${p}hidden-min-${name} { display: none !important; } }`,
    )
    .join("\n");
  // Container-query variants — the true InstUI <Responsive> analogue: mark an ancestor `.<prefix>-container`
  // and these react to ITS width, not the viewport's. Same breakpoint scale, `-cq-` infix.
  const container = bp
    .map(
      ([name, w]) =>
        `@container (max-width: ${w}) { .${p}cq-hidden-max-${name} { display: none !important; } }\n` +
        `@container (min-width: ${w}) { .${p}cq-hidden-min-${name} { display: none !important; } }`,
    )
    .join("\n");
  return (
    `/**
 * @utility responsive
 * @class .instui-hidden-max-md
 * @summary Responsive visibility: \`.instui-hidden-max-<bp>\` / \`-hidden-min-<bp>\` hide by viewport width; the \`-cq-\` variants react to a \`.instui-container\` ancestor's width instead. Breakpoints \`sm\`/\`md\`/\`lg\`/\`xl\`.
 * @example <div class="instui-hidden-max-sm">Hidden at or below the small breakpoint.</div>
 */\n` +
    `/* InstUI responsive utilities (@pantoken/components) — prefix: ${prefix} */\n` +
    `${viewport}\n` +
    `.${p}container { container-type: inline-size; }\n` +
    `${container}\n`
  );
}

/**
 * List rules: token-driven type and item spacing. Sizes `--sm`/`--lg`, spacing modifiers, and
 * `--solid`/`--dashed` delimiters that draw a rule between items.
 */
function listRules(p: string): string {
  return `
/**
 * @component list
 * @summary A list with token-driven item spacing.
 * @example
 * <ul class="instui-list">
 *   <li>First item</li>
 *   <li>Second item</li>
 *   <li>Third item</li>
 * </ul>
 * @structure
 * .instui-list
 *   li
 * @modifier -ordered — Ordered-list numbering.
 * @modifier -inline — Lay items out inline (horizontal).
 * @modifier -unstyled — Remove markers and padding.
 * @modifier -delimiter-solid — Separate items with a solid rule.
 * @modifier -delimiter-dashed — Separate items with a dashed rule.
 * @modifier -size-sm — Small.
 * @modifier -size-lg — Large.
 */
.${p}list {
  color: var(--instui-component-list-item-color);
  font-family: var(--instui-component-list-item-font-family);
  font-size: var(--instui-component-list-item-font-size-medium);
  font-weight: var(--instui-component-list-item-font-weight);
  line-height: var(--instui-component-list-item-line-height);
  padding-inline-start: var(--instui-component-list-list-padding);
}
.${p}list > li { margin: var(--instui-component-list-item-spacing-medium) 0; }
.${p}list.-size-sm { font-size: var(--instui-component-list-item-font-size-small); }
.${p}list.-size-sm > li { margin: var(--instui-component-list-item-spacing-small) 0; }
.${p}list.-size-lg { font-size: var(--instui-component-list-item-font-size-large); }
.${p}list.-size-lg > li { margin: var(--instui-component-list-item-spacing-large) 0; }
.${p}list.-ordered > li::marker {
  font-weight: var(--instui-component-list-ordered-number-font-weight);
}
.${p}list.-ordered > li { padding-inline-start: var(--instui-component-list-ordered-number-margin); }
.${p}list.-delimiter-solid > li + li {
  border-top: var(--instui-component-list-item-delimiter-solid-border-width) var(--instui-component-list-item-delimiter-solid-border-style) var(--instui-component-list-item-delimiter-solid-border-color);
  padding-top: var(--instui-component-list-item-spacing-medium);
}
.${p}list.-delimiter-dashed > li + li {
  border-top: var(--instui-component-list-item-delimiter-dashed-border-width) var(--instui-component-list-item-delimiter-dashed-border-style) var(--instui-component-list-item-delimiter-dashed-border-color);
  padding-top: var(--instui-component-list-item-spacing-medium);
}
/* isUnstyled: strip markers and indentation. */
.${p}list.-unstyled {
  list-style: none;
  padding-inline-start: 0;
}
/* InlineList: lay items out in a wrapping row (\`.${p}list.-inline\`). */
.${p}list.-inline {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--instui-component-list-item-spacing-medium);
  list-style: none;
  padding-inline-start: 0;
}
.${p}list.-inline > li { margin: 0; }
`;
}

/**
 * Checkbox rules: a labeled native checkbox tinted with the InstUI checked color, plus a
 * `--toggle` modifier that renders the native checkbox as a switch.
 */
function checkboxRules(p: string): string {
  const base = `.${p}checkbox:not(.${p}checkbox.-variant-toggle)`;
  return `
/**
 * @component checkbox
 * @summary A native checkbox and its label, or a switch via \`-variant-toggle\`.
 * @example
 * <label class="instui-checkbox"><input type="checkbox" checked> Checked</label>
 * @modifier -invalid — Invalid (error) state.
 * @modifier -label-placement-end — Place the label after the control.
 * @modifier -label-placement-start — Place the label before the control.
 * @modifier -label-placement-top — Place the label above the control.
 * @modifier -readonly — Read-only state.
 * @modifier -variant-toggle — Render as a switch instead of a box.
 * @modifier -size-sm — Small.
 * @modifier -size-lg — Large.
 * @part .asterisk — The required-field asterisk.
 */
.${p}checkbox {
  display: inline-flex;
  align-items: center;
  gap: var(--instui-component-checkbox-gap);
  color: var(--instui-component-checkbox-label-base-color);
  font-family: var(--instui-component-checkbox-font-family);
  font-size: var(--instui-component-checkbox-font-size-md);
  font-weight: var(--instui-component-checkbox-font-weight);
  line-height: var(--instui-component-checkbox-line-height);
}
/* labelPlacement: the control comes first in the markup, so reorder with flex. Default is "end"
   (label after the control); "start" puts it before, "top" stacks it above. */
.${p}checkbox.-label-placement-end { flex-direction: row; }
.${p}checkbox.-label-placement-start { flex-direction: row-reverse; }
.${p}checkbox.-label-placement-top {
  flex-direction: column-reverse;
  align-items: flex-start;
}
/* Base control: a native checkbox restyled via appearance:none so the InstUI border/background/checked
   tokens all apply, with the tick masked into a ::before. Scoped away from the --toggle switch. */
${base} input[type="checkbox"] {
  appearance: none;
  -webkit-appearance: none;
  display: inline-grid;
  place-content: center;
  flex: none;
  width: var(--instui-component-checkbox-control-size-md);
  height: var(--instui-component-checkbox-control-size-md);
  margin-block: var(--instui-component-checkbox-control-vertical-margin);
  border: var(--instui-component-checkbox-border-width) solid var(--instui-component-checkbox-border-color);
  border-radius: var(--instui-component-checkbox-border-radius);
  background: var(--instui-component-checkbox-background-color);
  cursor: pointer;
  transition: background-color 0.15s ease, border-color 0.15s ease;
}
${base} input[type="checkbox"] { --pantoken-cb-glyph: ${CHECK_ICON}; }
${base} input[type="checkbox"]::before {
  content: "";
  width: 0.75em;
  height: 0.75em;
  /* Auto-contrast the tick against the checked fill: white on a dark fill, near-black on a light one.
     The fill token is light-dark(), so a fixed on-color would vanish in one scheme. */
  background: oklch(from var(--instui-component-checkbox-background-checked-color) clamp(0, (0.62 - l) * infinity, 1) 0 0);
  -webkit-mask: var(--pantoken-cb-glyph);
  mask: var(--pantoken-cb-glyph);
  transform: scale(0);
  transition: transform 0.1s ease;
}
${base} input[type="checkbox"]:hover {
  border-color: var(--instui-component-checkbox-border-hover-color);
  background: var(--instui-component-checkbox-background-hover-color);
}
${base} input[type="checkbox"]:checked,
${base} input[type="checkbox"]:indeterminate {
  border-color: var(--instui-component-checkbox-border-checked-color);
  background: var(--instui-component-checkbox-background-checked-color);
}
${base} input[type="checkbox"]:checked::before,
${base} input[type="checkbox"]:indeterminate::before { transform: scale(1); }
/* Indeterminate (mixed) state: a dash in place of the tick. Set el.indeterminate = true in JS. */
${base} input[type="checkbox"]:indeterminate { --pantoken-cb-glyph: ${MINUS_ICON}; }
${base} input[type="checkbox"]:disabled {
  border-color: var(--instui-component-checkbox-border-disabled-color);
  background: var(--instui-component-checkbox-background-disabled-color);
  cursor: not-allowed;
}
.${p}checkbox:has(input:disabled) { color: var(--instui-component-checkbox-label-disabled-color); }
.${p}checkbox:hover { color: var(--instui-component-checkbox-label-hover-color); }
.${p}checkbox.-size-sm {
  font-size: var(--instui-component-checkbox-font-size-sm);
}
${base}.${p}checkbox.-size-sm input[type="checkbox"] {
  width: var(--instui-component-checkbox-control-size-sm);
  height: var(--instui-component-checkbox-control-size-sm);
}
.${p}checkbox.-size-lg {
  font-size: var(--instui-component-checkbox-font-size-lg);
}
${base}.${p}checkbox.-size-lg input[type="checkbox"] {
  width: var(--instui-component-checkbox-control-size-lg);
  height: var(--instui-component-checkbox-control-size-lg);
}
${base}.${p}checkbox.-invalid input[type="checkbox"] { border-color: var(--instui-component-checkbox-error-border-color); }
${base}.${p}checkbox.-invalid input[type="checkbox"]:hover { border-color: var(--instui-component-checkbox-error-border-hover-color); }
.${p}checkbox.-readonly {
  color: var(--instui-component-checkbox-label-readonly-color);
}
${base}.${p}checkbox.-readonly input[type="checkbox"] {
  border-color: var(--instui-component-checkbox-border-readonly-color);
  background: var(--instui-component-checkbox-background-readonly-color);
}
${scope(`.${p}checkbox`, `.${p}checkbox.-required .asterisk { color: var(--instui-component-checkbox-asterisk-color); }`)}
.${p}checkbox.-variant-toggle input[type="checkbox"] {
  /* InstUI's toggle facade is a fixed 40x24 switch: the switch height is the small choice-control
     size (24px), while the toggle-medium-height token (40px) is the track width. Its border is the
     small width (the toggle-border-width token resolves to the 4px large width, far too heavy), drawn
     as an inset shadow so it doesn't shift the absolutely-positioned handle. The handle sits 3x the
     border-width in from each edge and travels the difference (width - height). */
  --pantoken-toggle-h: var(--instui-size-choice-control-height-md);
  --pantoken-toggle-w: var(--instui-component-radio-input-toggle-medium-height);
  --pantoken-toggle-bw: var(--instui-border-width-sm);
  --pantoken-toggle-inset: calc(var(--pantoken-toggle-bw) * 3);
  --pantoken-toggle-handle: calc(var(--pantoken-toggle-h) - var(--pantoken-toggle-inset) * 2);
  appearance: none;
  -webkit-appearance: none;
  position: relative;
  width: var(--pantoken-toggle-w);
  height: var(--pantoken-toggle-h);
  border: 0;
  border-radius: var(--pantoken-toggle-h);
  box-shadow: inset 0 0 0 var(--pantoken-toggle-bw) var(--instui-color-stroke-base);
  /* The rebrand theme resolves toggle-background-off to the same green as the on state, so the off
     track uses the neutral muted background; the handle position and on-color signal the state. */
  background: var(--instui-color-background-muted);
  cursor: pointer;
  transition: background-color 0.15s ease;
}
.${p}checkbox.-variant-toggle input[type="checkbox"]::before {
  content: "";
  position: absolute;
  top: 50%;
  inset-inline-start: var(--pantoken-toggle-inset);
  transform: translateY(-50%);
  box-sizing: border-box;
  width: var(--pantoken-toggle-handle);
  height: var(--pantoken-toggle-handle);
  border-radius: 50%;
  border: var(--pantoken-toggle-bw) solid var(--instui-color-stroke-base);
  background: var(--instui-component-radio-input-toggle-handle-text);
  transition: inset-inline-start 0.15s ease;
}
/* A state glyph riding on the handle: an X when off, a check when on, in the track color. */
.${p}checkbox.-variant-toggle input[type="checkbox"]::after {
  content: "";
  position: absolute;
  top: 50%;
  inset-inline-start: var(--pantoken-toggle-inset);
  transform: translateY(-50%);
  width: var(--pantoken-toggle-handle);
  height: var(--pantoken-toggle-handle);
  background: var(--instui-color-text-muted);
  -webkit-mask: var(--instui-icon-x) center / 58% no-repeat;
  mask: var(--instui-icon-x) center / 58% no-repeat;
  transition: inset-inline-start 0.15s ease;
}
.${p}checkbox.-variant-toggle input[type="checkbox"]:checked {
  background: var(--instui-component-radio-input-toggle-background-success);
}
.${p}checkbox.-variant-toggle input[type="checkbox"]:checked::before {
  inset-inline-start: calc(100% - var(--pantoken-toggle-h) + var(--pantoken-toggle-inset));
  border-color: var(--instui-component-radio-input-toggle-background-success);
}
.${p}checkbox.-variant-toggle input[type="checkbox"]:checked::after {
  inset-inline-start: calc(100% - var(--pantoken-toggle-h) + var(--pantoken-toggle-inset));
  background: var(--instui-component-radio-input-toggle-background-success);
  -webkit-mask: var(--instui-icon-check) center / 58% no-repeat;
  mask: var(--instui-icon-check) center / 58% no-repeat;
}
`;
}

/**
 * Radio rules. Two forms:
 * - **Standard** (default): a native radio restyled via appearance:none so the InstUI border/background
 *   tokens apply, with the selected dot masked in by a ::before sized from the `checked-inset` token.
 *   Sizes `-size-sm`/`-lg`; disabled and readonly states mirror Checkbox.
 * - **`-variant-toggle`**: InstUI's RadioInputGroup `variant="toggle"` — each radio renders as a
 *   segmented button, the selected one filled with a context colour (`-context-{off,success,danger,
 *   warning}`; success is the default). The native control is clipped (kept focusable + in the a11y
 *   tree) and the label is the button. `-toggle` is a deprecated alias for `-variant-toggle`.
 *
 * The dot-control rules are scoped away from the toggle variant (both `-variant-toggle` and its
 * deprecated `-toggle` alias) so the toggle button keeps its own chrome.
 */
function radioRules(p: string): string {
  const std = `.${p}radio:not(.-variant-toggle):not(.-toggle)`;
  const tog = `.${p}radio.-variant-toggle`;
  return `
/**
 * @component radio
 * @summary A native radio button and its label.
 * @example
 * <label class="instui-radio"><input type="radio" name="r" checked> Option A</label>
 * @modifier -context-off — Off/neutral context colour (toggle variant).
 * @modifier -context-success — Success context colour (toggle variant).
 * @modifier -context-warning — Warning context colour (toggle variant).
 * @modifier -context-danger — Danger context colour (toggle variant).
 * @modifier -readonly — Read-only state.
 * @modifier -variant-toggle — Render as a segmented toggle button.
 * @modifier -size-sm — Small.
 * @modifier -size-lg — Large.
 */
.${p}radio {
  display: inline-flex;
  align-items: center;
  gap: var(--instui-component-radio-input-gap);
  color: var(--instui-component-radio-input-label-base-color);
  font-family: var(--instui-component-radio-input-font-family);
  font-size: var(--instui-component-radio-input-font-size-md);
  font-weight: var(--instui-component-radio-input-font-weight);
  line-height: var(--instui-component-radio-input-line-height-md);
}
${std} input[type="radio"] {
  appearance: none;
  -webkit-appearance: none;
  display: inline-grid;
  place-content: center;
  flex: none;
  width: var(--instui-component-radio-input-control-size-md);
  height: var(--instui-component-radio-input-control-size-md);
  margin-block: var(--instui-component-radio-input-control-vertical-margin);
  border: var(--instui-component-radio-input-border-width) solid var(--instui-component-radio-input-border-color);
  border-radius: 50%;
  background: var(--instui-component-radio-input-background-color);
  cursor: pointer;
  transition: border-color 0.15s ease, background-color 0.15s ease;
}
${std} input[type="radio"]::before {
  content: "";
  width: calc(var(--instui-component-radio-input-control-size-md) - 2 * var(--instui-component-radio-input-checked-inset-md));
  height: calc(var(--instui-component-radio-input-control-size-md) - 2 * var(--instui-component-radio-input-checked-inset-md));
  border-radius: 50%;
  background: var(--instui-component-radio-input-border-selected-color);
  transform: scale(0);
  transition: transform 0.1s ease;
}
${std} input[type="radio"]:hover {
  border-color: var(--instui-component-radio-input-border-hover-color);
  background: var(--instui-component-radio-input-background-hover-color);
}
${std} input[type="radio"]:checked { border-color: var(--instui-component-radio-input-border-selected-color); }
${std} input[type="radio"]:checked::before { transform: scale(1); }
${std} input[type="radio"]:disabled {
  border-color: var(--instui-component-radio-input-border-disabled-color);
  background: var(--instui-component-radio-input-background-disabled-color);
  cursor: not-allowed;
}
${std}:has(input:disabled) { color: var(--instui-component-radio-input-label-disabled-color); }
${std}:hover { color: var(--instui-component-radio-input-label-hover-color); }
${std}.-size-sm {
  font-size: var(--instui-component-radio-input-font-size-sm);
  line-height: var(--instui-component-radio-input-line-height-sm);
}
${std}.-size-sm input[type="radio"] {
  width: var(--instui-component-radio-input-control-size-sm);
  height: var(--instui-component-radio-input-control-size-sm);
}
${std}.-size-sm input[type="radio"]::before {
  width: calc(var(--instui-component-radio-input-control-size-sm) - 2 * var(--instui-component-radio-input-checked-inset-sm));
  height: calc(var(--instui-component-radio-input-control-size-sm) - 2 * var(--instui-component-radio-input-checked-inset-sm));
}
${std}.-size-lg {
  font-size: var(--instui-component-radio-input-font-size-lg);
  line-height: var(--instui-component-radio-input-line-height-lg);
}
${std}.-size-lg input[type="radio"] {
  width: var(--instui-component-radio-input-control-size-lg);
  height: var(--instui-component-radio-input-control-size-lg);
}
${std}.-size-lg input[type="radio"]::before {
  width: calc(var(--instui-component-radio-input-control-size-lg) - 2 * var(--instui-component-radio-input-checked-inset-lg));
  height: calc(var(--instui-component-radio-input-control-size-lg) - 2 * var(--instui-component-radio-input-checked-inset-lg));
}
${std}.-readonly {
  color: var(--instui-component-radio-input-label-readonly-color);
}
${std}.-readonly input[type="radio"] {
  border-color: var(--instui-component-radio-input-border-readonly-color);
  background: var(--instui-component-radio-input-background-readonly-color);
}
/* variant=toggle — the segmented-button look. The selected fill is a context colour, indirected
   through --pantoken-rt-fill so -context-* is a one-line override (default success/green). */
${tog} {
  --pantoken-rt-fill: var(--instui-component-radio-input-toggle-background-success);
  position: relative;
  justify-content: center;
  gap: 0;
  height: var(--instui-component-radio-input-toggle-medium-height);
  padding-inline: var(--instui-spacing-space-md);
  border: var(--instui-component-radio-input-toggle-border-width) solid var(--instui-color-stroke-base);
  border-radius: var(--instui-component-radio-input-toggle-border-radius);
  /* Unselected fill is the neutral muted surface: the toggle-background-off token resolves to the same
     green as success in-theme, so it can't read as "off" — the -context-* fills below drive selection. */
  background: var(--instui-color-background-muted);
  color: var(--instui-component-radio-input-label-base-color);
  font-size: var(--instui-component-radio-input-toggle-medium-font-size);
  cursor: pointer;
  transition: background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease;
}
/* Clip the native control (still focusable + in the a11y tree); the label is the button. */
${tog} input[type="radio"] {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
}
${tog}.-context-off { --pantoken-rt-fill: var(--instui-component-radio-input-toggle-background-off); }
${tog}.-context-success { --pantoken-rt-fill: var(--instui-component-radio-input-toggle-background-success); }
${tog}.-context-danger { --pantoken-rt-fill: var(--instui-component-radio-input-toggle-background-danger); }
${tog}.-context-warning { --pantoken-rt-fill: var(--instui-component-radio-input-toggle-background-warning); }
${tog}:has(input:checked) {
  background: var(--pantoken-rt-fill);
  border-color: var(--pantoken-rt-fill);
  color: var(--instui-component-radio-input-toggle-handle-text);
}
${tog}:has(input:focus-visible) {
  outline: var(--instui-focus-outline-width) var(--instui-focus-outline-style) var(--instui-focus-outline-color);
  outline-offset: var(--instui-focus-outline-offset);
}
${tog}:has(input:disabled) {
  opacity: 0.5;
  cursor: not-allowed;
}
${tog}.-size-sm {
  height: var(--instui-component-radio-input-toggle-small-height);
  font-size: var(--instui-component-radio-input-toggle-small-font-size);
}
${tog}.-size-lg {
  height: var(--instui-component-radio-input-toggle-large-height);
  font-size: var(--instui-component-radio-input-toggle-large-font-size);
}
`;
}

/** Spinner rules: a CSS ring spinner. */
function spinnerRules(p: string): string {
  return `
/**
 * @component spinner
 * @summary An animated loading ring; give it role="status" and an aria-label.
 * @example
 * <span class="instui-spinner -size-xs" role="status" aria-label="Loading"></span>
 * @modifier -size-xs — Extra-small.
 * @modifier -size-sm — Small.
 * @modifier -size-lg — Large.
 * @modifier -color-inverse — On a dark surface.
 * @demo self:spinner
 */
@keyframes pantoken-spinner-rotate { to { transform: rotate(360deg); } }
.${p}spinner {
  display: inline-block;
  width: var(--instui-component-spinner-spinner-size-md);
  height: var(--instui-component-spinner-spinner-size-md);
  border: var(--instui-component-spinner-stroke-width-md) solid var(--instui-component-spinner-track-color);
  border-top-color: var(--instui-component-spinner-color);
  border-radius: 50%;
  animation: pantoken-spinner-rotate 0.8s linear infinite;
}
.${p}spinner.-size-xs {
  width: var(--instui-component-spinner-spinner-size-xs);
  height: var(--instui-component-spinner-spinner-size-xs);
  border-width: var(--instui-component-spinner-stroke-width-xs);
}
.${p}spinner.-size-sm {
  width: var(--instui-component-spinner-spinner-size-sm);
  height: var(--instui-component-spinner-spinner-size-sm);
  border-width: var(--instui-component-spinner-stroke-width-sm);
}
.${p}spinner.-size-lg {
  width: var(--instui-component-spinner-spinner-size-lg);
  height: var(--instui-component-spinner-spinner-size-lg);
  border-width: var(--instui-component-spinner-stroke-width-lg);
}
.${p}spinner.-color-inverse { border-top-color: var(--instui-component-spinner-inverse-color); }
`;
}

/**
 * Progress rules: a track + meter bar. Sizes `--x-small`/`--sm`/`--lg` set the track height, the meter
 * carries the full status palette (brand/info/success/warning/alert/danger), `--inverse` swaps in the
 * on-dark track and meter colors, and `.progress-value` (a flat class, since it sits as a sibling
 * not a child) styles an adjacent numeric label.
 */
function progressRules(p: string): string {
  const root = `.${p}progress`;
  // Meter colour uses our normalized `-color-*` scheme (canonical); the InstUI `meterColor` names
  // (`-meter-color-*`) are kept as @deprecated aliases (added by withDeprecatedAliases). Kept FLAT (not
  // in @scope) so those aliases — keyed on `.instui-progress.` — can twin them. The
  // `progress-bar-meter-color-*` tokens are degenerate (all brand) upstream, so paint from the semantic
  // `--instui-color-background-*` status colours (danger→error; there's no `-color-alert` in the
  // normalized scheme, so InstUI's `alert` folds to warning via the deprecated alias only).
  const meter = (mod: string, bg: string): string =>
    `${root}.-color-${mod} .bar { background: var(--instui-color-background-${bg}); }`;
  return `
/**
 * @component progress
 * @summary A determinate progress bar with a coloured meter, sizes, and an optional value label.
 * @example
 * <div class="instui-progress -color-brand">
 *   <div class="bar"></div>
 * </div>
 * @modifier -color-brand — Brand meter colour.
 * @modifier -color-info — Informational meter colour.
 * @modifier -color-success — Success meter colour.
 * @modifier -color-warning — Warning meter colour.
 * @modifier -color-danger — Danger meter colour.
 * @modifier -color-inverse — For dark backgrounds.
 * @modifier -color-primary-inverse — On-dark (primary inverse) meter colour.
 * @modifier -size-xs — Extra small.
 * @modifier -size-sm — Small.
 * @modifier -size-lg — Large.
 * @part .bar — The filled meter bar.
 */
${root} {
  position: relative;
  display: block;
  width: 100%;
  height: var(--instui-component-progress-bar-medium-height);
  background: var(--instui-component-progress-bar-track-color);
  /* The full border (InstUI trackLayout.border) frames the track on all sides. */
  border: var(--instui-component-progress-bar-track-bottom-border-width) solid var(--instui-component-progress-bar-border-color);
  border-radius: var(--instui-component-progress-bar-border-radius);
  overflow: hidden;
}
/* InstUI layers a distinct bottom rule (trackBottomBorderColor) over the meter, separate from the full
   border. In legacy Canvas the full border is transparent so only this rule shows; in the newer themes
   the full border shows and this rule is transparent. A pseudo keeps both layers independent. */
${root}::after {
  content: "";
  position: absolute;
  inset-inline: 0;
  bottom: 0;
  height: var(--instui-component-progress-bar-track-bottom-border-width);
  background: var(--instui-component-progress-bar-track-bottom-border-color);
  pointer-events: none;
}
.${p}progress.-size-xs { height: var(--instui-component-progress-bar-x-small-height); }
.${p}progress.-size-sm { height: var(--instui-component-progress-bar-small-height); }
.${p}progress.-size-lg { height: var(--instui-component-progress-bar-large-height); }
${scope(
  root,
  `
.${p}progress .bar {
  height: 100%;
  background: var(--instui-color-background-brand);
  border-radius: var(--instui-component-progress-bar-border-radius);
}
.${p}progress.-should-animate .bar { transition: width 0.5s ease; }
`,
  ["bar"],
)}
${meter("brand", "brand")}
${meter("info", "info")}
${meter("success", "success")}
${meter("warning", "warning")}
${meter("danger", "error")}
/* color="primary-inverse": the on-dark scheme. It's a distinct axis from meterColor and overrides it —
   InstUI's inverse meter tokens all collapse to background-base — so it comes AFTER the meter rules and
   wins at equal specificity. Pair it with a dark surface. */
${root}.-color-primary-inverse {
  background: var(--instui-component-progress-bar-track-color-inverse);
  border-color: var(--instui-component-progress-bar-border-color-inverse);
  color: var(--instui-component-progress-bar-text-color-inverse);
}
${root}.-color-primary-inverse::after { background: var(--instui-component-progress-bar-track-bottom-border-color-inverse); }
${root}.-color-primary-inverse .bar { background: var(--instui-component-progress-bar-meter-color-brand-inverse); }
.${p}progress-value {
  padding: 0 var(--instui-component-progress-bar-value-padding);
  color: var(--instui-component-progress-bar-text-color);
  font-family: var(--instui-component-progress-bar-font-family);
  font-size: var(--instui-component-progress-bar-medium-value-font-size);
  font-weight: var(--instui-component-progress-bar-font-weight);
  line-height: var(--instui-component-progress-bar-line-height);
}
.${p}progress.-color-inverse ~ .${p}progress-value,
.${p}progress-value.-color-inverse { color: var(--instui-component-progress-bar-text-color-inverse); }
`;
}

/** Menu rules: a dropdown surface with items, a highlighted state, and separators. */
function menuRules(p: string): string {
  const root = `.${p}menu`;
  return `
/**
 * @component menu
 * @summary A dropdown surface of items, groups, and separators.
 * @example
 * <div class="instui-menu">
 *   <div class="group">Actions</div>
 *   <div class="item">Edit</div>
 *   <div class="item -active">Duplicate</div>
 *   <div class="separator"></div>
 *   <div class="item">Delete</div>
 * </div>
 * @structure
 * .instui-menu
 *   .group
 *   .item
 *   .item.-active
 *   .separator
 * @part .item — A menu entry; add -disabled, -highlighted, or -active/[aria-checked].
 * @part .group — A labelled group heading.
 * @part .separator — A divider rule between items.
 * @part .item-info — Secondary info text within a menu item.
 * @demo self:menu
 */
${root} {
  min-width: var(--instui-component-menu-min-width);
  max-width: var(--instui-component-menu-max-width);
  background: var(--instui-component-menu-item-background);
  border: var(--instui-border-width-sm) solid var(--instui-color-stroke-base);
  border-radius: var(--instui-border-radius-md);
  padding: var(--instui-spacing-space-xs) 0;
}
${scope(
  root,
  `
.${p}menu .item {
  display: block;
  padding: var(--instui-component-menu-item-padding-vertical) var(--instui-component-menu-item-padding-horizontal);
  color: var(--instui-component-menu-item-label-color);
  font-family: var(--instui-component-menu-item-font-family);
  font-size: var(--instui-component-menu-item-font-size);
  font-weight: var(--instui-component-menu-item-font-weight);
  line-height: var(--instui-component-menu-item-line-height);
  cursor: pointer;
}
/* A disabled item (InstUI Menu.Item \`disabled\`): muted, non-interactive. */
.${p}menu .item.-disabled {
  opacity: var(--instui-opacity-disabled);
  pointer-events: none;
  cursor: not-allowed;
}
.${p}menu .item:hover,
.${p}menu .item.-highlighted {
  background: var(--instui-component-menu-item-highlighted-background);
  color: var(--instui-component-menu-item-highlighted-label-color);
}
.${p}menu .item.-active,
.${p}menu .item[aria-checked="true"] {
  background: var(--instui-component-menu-item-active-background);
  color: var(--instui-component-menu-item-active-label-color);
}
.${p}menu .item.-active:hover,
.${p}menu .item[aria-checked="true"]:hover {
  background: var(--instui-component-menu-item-selected-highlighted-background);
}
/* Secondary line inside an item (a description or shortcut). */
.${p}menu .item-info { color: var(--instui-component-menu-item-label-info-color); }
.${p}menu .item:hover .item-info,
.${p}menu .item.-highlighted .item-info { color: var(--instui-component-menu-item-highlighted-label-info-color); }
/* A labelled group of items. */
.${p}menu .group {
  padding: var(--instui-component-menu-group-padding-vertical) var(--instui-component-menu-group-padding-horizontal);
  background: var(--instui-component-menu-group-background);
  color: var(--instui-component-menu-group-color);
  font-family: var(--instui-component-menu-group-font-family);
  font-size: var(--instui-component-menu-group-font-size);
  font-weight: var(--instui-component-menu-group-font-weight);
}
.${p}menu .separator {
  height: var(--instui-component-menu-separator-height);
  background: var(--instui-component-menu-separator-background);
  margin: var(--instui-component-menu-separator-margin-vertical) var(--instui-component-menu-separator-margin-horizontal);
}
`,
  ["item", "group", "separator"],
)}
`;
}

/**
 * Modal rules: a dialog surface with header, body, and footer parts. Sizes `--sm`/`--lg`/`--auto`,
 * a `--compact` density that swaps in the compact paddings, a `--full-screen` variant, and an
 * `--inverse` (on-dark) scheme that recolors every part.
 */
function modalRules(p: string): string {
  const root = `.${p}modal`;
  return `
/**
 * @component modal
 * @summary A dialog surface (works on a native <dialog>); header/body/footer parts.
 * @example
 * <dialog class="instui-modal -size-sm" id="modal-sm">
 *   <div class="header"><strong>Small</strong></div>
 *   <div class="body"><code>-size-sm</code> — a narrow modal.</div>
 *   <div class="footer">
 *     <button class="instui-button">Close</button>
 *   </div>
 * </dialog>
 * @structure
 * .instui-modal.-size-sm
 *   .header
 *     strong
 *   .body
 *     code
 *   .footer
 *     .instui-button
 * @modifier -size-sm — A narrow modal.
 * @modifier -size-lg — A wide modal.
 * @modifier -size-auto — Sized to content.
 * @modifier -size-fullscreen — Edge-to-edge.
 * @modifier -density-compact — Tighter part padding.
 * @modifier -color-inverse — On-dark chrome (pairs with a media body).
 * @modifier -blur — Blur the backdrop behind the modal.
 * @modifier -overflow-fit — Constrain to the viewport and scroll the body.
 * @part .header — The title row.
 * @part .body — The content region (a lone <img> goes full-bleed).
 * @part .footer — The actions row.
 * @demo self:modal
 */
${root} {
  max-width: var(--instui-component-modal-medium-max-width);
  background: var(--instui-component-modal-background-color);
  color: var(--instui-component-modal-text-color);
  border: var(--instui-component-modal-border-width) solid var(--instui-component-modal-border-color);
  border-radius: var(--instui-component-modal-border-radius);
  font-family: var(--instui-component-modal-font-family);
  overflow: hidden;
  /* Modals float above the page; the elevation tokens are defined at the top of components.css. */
  box-shadow: var(--instui-elevation-topmost);
}
/* On a native <dialog>, drop the UA padding and centre it; \`showModal()\` puts it in the top layer, so
   no z-index is needed. The dialog's ::backdrop IS the modal's mask — dim it with the Mask token; the
   optional -blur modifier frosts it (mirrors .${p}mask.-blur). */
dialog${root} { margin: auto; padding: 0; }
dialog${root}::backdrop { background: var(--instui-component-mask-background-color); }
dialog${root}.-blur::backdrop { backdrop-filter: blur(0.5rem); }
.${p}modal.-size-sm { max-width: var(--instui-component-modal-small-max-width); }
.${p}modal.-size-lg { max-width: var(--instui-component-modal-large-max-width); }
.${p}modal.-size-auto {
  max-width: none;
  min-width: var(--instui-component-modal-auto-min-width);
}
/* Fullscreen is truly edge-to-edge (InstUI has no inset). It pins itself fixed and stretches via
   inset:0 + auto sizing, overriding both a <dialog>'s UA \`width: fit-content\`/\`margin: auto\` and its
   \`:modal\` max-width cap, so it works on a native dialog or a plain positioned div. No rounded corners
   at the viewport edge. */
.${p}modal.-size-fullscreen {
  position: fixed;
  inset: 0;
  width: auto;
  height: auto;
  max-width: none;
  max-height: none;
  margin: 0;
  border-radius: 0;
}
/* overflow="fit" (InstUI): cap the modal to the viewport and scroll the body, so the header/footer
   stay pinned. The default (overflow="scroll") lets the whole modal grow and the overlay scroll. */
.${p}modal.-overflow-fit {
  display: flex;
  flex-direction: column;
  max-block-size: calc(100dvh - var(--instui-spacing-space-xl) * 2);
}
.${p}modal.-color-inverse {
  background: var(--instui-component-modal-inverse-background-color);
  color: var(--instui-component-modal-inverse-text-color);
  border-color: var(--instui-component-modal-inverse-border-color);
}
${scope(
  root,
  `
.${p}modal.-overflow-fit .body { overflow-y: auto; }
.${p}modal .header {
  padding: var(--instui-component-modal-header-padding);
  background: var(--instui-component-modal-header-background-color);
  border-bottom: var(--instui-component-modal-header-border-width) solid var(--instui-component-modal-header-border-color);
}
.${p}modal .body { padding: var(--instui-component-modal-body-padding); }
/* A media modal: when the body holds an image it goes full-bleed (no padding) so the media meets the
   modal edges. Pair with -color-inverse for the on-dark chrome InstUI uses around media. */
.${p}modal .body:has(> img) { padding: 0; }
.${p}modal .body:has(> img) img { display: block; width: 100%; }
.${p}modal .footer {
  padding: var(--instui-component-modal-footer-padding);
  background: var(--instui-component-modal-footer-background-color);
  border-top: var(--instui-component-modal-footer-border-width) solid var(--instui-component-modal-footer-border-color);
  border-radius: 0 0 var(--instui-component-modal-footer-border-radius) var(--instui-component-modal-footer-border-radius);
}
.${p}modal.-density-compact .header { padding: var(--instui-component-modal-header-padding-compact); }
.${p}modal.-density-compact .body { padding: var(--instui-component-modal-body-padding-compact); }
.${p}modal.-density-compact .footer { padding: var(--instui-component-modal-footer-padding-compact); }
.${p}modal.-color-inverse .header {
  background: var(--instui-component-modal-header-inverse-background-color);
  border-bottom-color: var(--instui-component-modal-header-inverse-border-color);
}
.${p}modal.-color-inverse .body { background: var(--instui-component-modal-body-inverse-background-color); }
.${p}modal.-color-inverse .footer {
  background: var(--instui-component-modal-footer-inverse-background-color);
  border-top-color: var(--instui-component-modal-footer-inverse-border-color);
}
`,
  ["header", "body", "footer"],
)}
`;
}

/** Breadcrumb rules: an inline trail of links with `/` separators. */
function breadcrumbRules(p: string): string {
  const root = `.${p}breadcrumb`;
  // Root + size rules stay outside @scope, prefixed, so the size-alias post-processor's twins are
  // valid; only the element rules that don't carry a size modifier go inside.
  return `
/**
 * @component breadcrumb
 * @summary A breadcrumb trail with \`/\` separators; the last crumb is the current page.
 * @example
 * <nav class="instui-breadcrumb" aria-label="Breadcrumb">
 *   <span class="item">
 *     <a href="#"><span class="instui-icon -icon-house"></span> Home</a>
 *   </span>
 *   <span class="item"><a href="#">Guides</a></span>
 *   <span class="item"><a href="#">Components</a></span>
 *   <span class="item" aria-current="page">Breadcrumb</span>
 * </nav>
 * @structure
 * .instui-breadcrumb
 *   .item
 *     a
 *       .instui-icon.-icon-house
 * @modifier -size-sm — Small.
 * @modifier -size-lg — Large.
 * @part .item — A crumb; the last one is the current page.
 */
${root} {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--instui-component-breadcrumb-gap-md);
  font-family: var(--instui-component-link-font-family);
  font-size: var(--instui-component-link-font-size-md);
}
.${p}breadcrumb.-size-sm { gap: var(--instui-component-breadcrumb-gap-sm); font-size: var(--instui-component-link-font-size-sm); }
.${p}breadcrumb.-size-lg { gap: var(--instui-component-breadcrumb-gap-lg); font-size: var(--instui-component-link-font-size-lg); }
.${p}breadcrumb.-size-sm .item:not(:last-child)::after { margin-inline-start: var(--instui-component-breadcrumb-gap-sm); }
.${p}breadcrumb.-size-lg .item:not(:last-child)::after { margin-inline-start: var(--instui-component-breadcrumb-gap-lg); }
${scope(
  root,
  `
.${p}breadcrumb a { color: var(--instui-component-link-text-color); text-decoration: none; }
.${p}breadcrumb a:hover { color: var(--instui-component-link-text-hover-color); text-decoration: underline; }
.${p}breadcrumb .item:not(:last-child)::after {
  content: "/";
  margin-inline-start: var(--instui-component-breadcrumb-gap-md);
  color: var(--instui-color-text-muted);
}
`,
  ["item"],
)}
`;
}

/**
 * Billboard rules: a centered empty-state / hero block. Sizes `--sm`/`--lg` scale the padding and
 * message, and `--clickable` (for a billboard that acts as a button) adds hover and active states.
 */
function billboardRules(p: string): string {
  const root = `.${p}billboard`;
  // Root + size rules (incl. the size-scoped message font-size) stay outside @scope, prefixed, so the
  // size-alias post-processor's twins stay valid; the size-free element rules go inside.
  return `
/**
 * @component billboard
 * @summary A large empty-state or call-to-action block: a hero icon or image, a heading, and a message.
 * @example
 * <div class="instui-billboard">
 *   <span class="hero"><span class="instui-icon -icon-inbox"></span></span>
 *   <div class="heading">No items yet</div>
 *   <div class="message">Create your first item to get started.</div>
 * </div>
 * @structure
 * .instui-billboard
 *   .hero
 *     .instui-icon.-icon-inbox
 *   .heading
 *   .message
 * @modifier -clickable — Interactive (clickable) styling with hover feedback.
 * @modifier -size-sm — Small.
 * @modifier -size-lg — Large.
 * @part .hero — The leading icon or image.
 * @part .heading — The billboard heading.
 * @part .message — The supporting message.
 */
${root} {
  display: block;
  text-align: center;
  background: var(--instui-component-billboard-background-color);
  padding: var(--instui-component-billboard-padding-medium);
  margin: var(--instui-component-billboard-medium-margin);
  font-family: var(--instui-component-billboard-font-family);
  color: var(--instui-component-billboard-message-color);
}
.${p}billboard.-size-sm {
  padding: var(--instui-component-billboard-padding-small);
}
.${p}billboard.-size-lg {
  padding: var(--instui-component-billboard-padding-large);
  margin: var(--instui-component-billboard-large-margin);
}
.${p}billboard.-size-sm .message { font-size: var(--instui-component-billboard-message-font-size-small); }
.${p}billboard.-size-lg .message { font-size: var(--instui-component-billboard-message-font-size-large); }
.${p}billboard.-clickable {
  cursor: pointer;
  border: var(--instui-component-billboard-button-border-width) var(--instui-component-billboard-button-border-style) transparent;
  border-radius: var(--instui-component-billboard-button-border-radius);
}
.${p}billboard.-clickable:hover { border-style: var(--instui-component-billboard-button-hover-border-style); }
.${p}billboard.-clickable:active {
  background: var(--instui-component-billboard-clickable-active-bg);
  color: var(--instui-component-billboard-clickable-active-text);
}
${scope(
  root,
  `
/* The hero (an icon or image) leads the block. Size it via font-size on the glyph in the markup. */
.${p}billboard .hero {
  display: inline-flex;
  justify-content: center;
  margin-block-end: var(--instui-spacing-space-sm);
  color: var(--instui-component-billboard-message-color);
}
/* The heading sits above the message — bolder and larger (Billboard renders a Heading here). */
.${p}billboard .heading {
  margin: 0 0 var(--instui-spacing-space-xs);
  color: var(--instui-component-billboard-message-color);
  font-weight: bold;
  font-size: var(--instui-component-billboard-message-font-size-large);
}
.${p}billboard .message {
  color: var(--instui-component-billboard-message-color);
  font-size: var(--instui-component-billboard-message-font-size-medium);
}
.${p}billboard.-clickable .message,
.${p}billboard.-clickable .heading,
.${p}billboard.-clickable .hero { color: var(--instui-component-billboard-message-color-clickable); }
`,
  ["hero", "heading", "message"],
)}
`;
}

/**
 * Rating rules: a row of star glyphs from the icon sheet (`.instui-icon.-icon-star-solid` filled,
 * `.instui-icon.-icon-star` empty) sized by the container `font-size` (glyphs are `1em`). Sizes
 * `--sm`/`--lg`, plus a `.label` for the visible value text (e.g. "3/5"), which resets to text size so
 * it isn't scaled to the star size.
 */
function ratingRules(p: string): string {
  const root = `.${p}rating`;
  return `
/**
 * @component rating
 * @summary A star rating with filled and empty glyphs and an optional numeric label.
 * @example
 * <span class="instui-rating -size-sm" role="img" aria-label="2 out of 3 stars">
 *   <span class="instui-icon -icon-star-solid"></span> <span class="instui-icon -icon-star-solid"></span> <span class="instui-icon -icon-star"></span>
 *   <span class="label">2/3</span>
 * </span>
 * @structure
 * .instui-rating.-size-sm
 *   .instui-icon.-icon-star-solid
 *   .instui-icon.-icon-star
 *   .label
 * @modifier -size-sm — Small.
 * @modifier -size-lg — Large.
 * @part .label — The numeric label, e.g. "3/5".
 */
${root} {
  display: inline-flex;
  align-items: center;
  gap: var(--instui-component-rating-icon-icon-margin);
  font-size: var(--instui-component-rating-icon-medium-icon-font-size);
  color: var(--instui-component-rating-icon-icon-empty-color);
}
.${p}rating.-size-sm { font-size: var(--instui-component-rating-icon-small-icon-font-size); }
.${p}rating.-size-lg { font-size: var(--instui-component-rating-icon-large-icon-font-size); }
${scope(
  root,
  `
/* The container paints the empty (outline) stars; a filled (solid) star overrides to the filled colour. */
.${p}rating .-icon-star-solid { color: var(--instui-component-rating-icon-icon-filled-color); }
/* The value label sits after the stars, reset to text size so it isn't scaled to the star glyph. */
.${p}rating .label {
  margin-inline-start: var(--instui-component-rating-icon-icon-margin);
  color: var(--instui-color-text-base);
  font-family: var(--instui-font-family-base);
  font-size: var(--instui-font-size-text-base);
}
`,
  ["label"],
)}
`;
}

/** Toggle-group rules: a segmented control that joins `.<prefix>-button` children. */
function toggleGroupRules(p: string): string {
  const root = `.${p}toggle-group`;
  return `
/**
 * @component toggle-group
 * @summary A bordered disclosure built on \`<details>\`: a chevron summary row and collapsible content.
 * @example
 * <details class="instui-toggle-group" open>
 *   <summary>Advanced settings</summary>
 *   <div>These options are revealed when the group is expanded. The header row carries a chevron that rotates on open, and the content sits below a divider.</div>
 * </details>
 * @structure
 * .instui-toggle-group
 *   summary
 *   div
 * @modifier -without-border — Remove the border.
 * @modifier -size-sm — Small.
 * @modifier -size-lg — Large.
 */
${root} {
  display: block;
  border: var(--instui-border-width-sm) solid var(--instui-component-toggle-group-border-color);
  border-radius: var(--instui-border-radius-md);
  background: var(--instui-color-background-elevated-surface-base);
  color: var(--instui-component-toggle-details-text-color);
  font-family: var(--instui-component-toggle-details-font-family);
  font-weight: var(--instui-component-toggle-details-font-weight);
  line-height: var(--instui-component-toggle-details-line-height);
  overflow: hidden;
}
${root} > summary {
  display: flex;
  align-items: center;
  gap: var(--instui-component-toggle-details-icon-margin);
  cursor: pointer;
  list-style: none;
  padding: var(--instui-component-toggle-details-content-padding-medium);
  font-size: var(--instui-component-toggle-details-font-size-medium);
}
${root} > summary::-webkit-details-marker { display: none; }
${root} > summary::before {
  content: "";
  flex: none;
  inline-size: 1em;
  block-size: 1em;
  background: currentColor;
  -webkit-mask: ${CHEVRON_RIGHT_ICON};
  mask: ${CHEVRON_RIGHT_ICON};
  transition: transform 0.2s ease;
}
${root}[open] > summary::before { transform: rotate(90deg); }
/* the collapsible content: separated from the header by a top border in the group colour */
${root} > :not(summary) {
  border-block-start: var(--instui-border-width-sm) solid var(--instui-component-toggle-group-border-color);
  padding: var(--instui-component-toggle-details-content-padding-medium);
}
${root}.-size-sm > summary,
${root}.-size-sm > :not(summary) { font-size: var(--instui-component-toggle-details-font-size-small); padding: var(--instui-component-toggle-details-content-padding-small); }
${root}.-size-lg > summary,
${root}.-size-lg > :not(summary) { font-size: var(--instui-component-toggle-details-font-size-large); padding: var(--instui-component-toggle-details-content-padding-large); }
/* border={false} */
${root}.-without-border { border: 0; }
${root}.-without-border > :not(summary) { border-block-start: 0; }
`;
}

/** Context-view rules: a callout surface with a downward caret. */
function contextViewRules(p: string): string {
  const root = `.${p}context-view`;
  const cv = (s: string): string => `var(--instui-component-context-view-${s})`;
  return `
/**
 * @component context-view
 * @summary An elevated callout with a caret, positionable on any side; works as a native \`[popover]\`.
 * @example
 * <div class="instui-context-view -placement-bottom" id="cv-popover">A context view frames a callout with a caret. As a popover it rides the top layer and closes when you click away or press Esc.</div>
 * @modifier -color-inverse — Dark (inverse) colour scheme.
 * @modifier -placement-top — Sit above the anchor.
 * @modifier -placement-bottom — Sit below the anchor.
 * @modifier -placement-start — Sit at the start (inline-start) of the anchor.
 * @modifier -placement-end — Sit at the end (inline-end) of the anchor.
 */
${root} {
  position: relative;
  display: inline-block;
  padding: var(--instui-spacing-space-md);
  background: var(--instui-color-background-elevated-surface-base);
  color: var(--instui-color-text-base);
  border: ${cv("arrow-border-width")} solid ${cv("arrow-border-color")};
  border-radius: ${cv("border-radius")};
  /* ContextView floats over content — InstUI gives it a shadow. */
  box-shadow: var(--instui-elevation-above);
}
/* The caret is two stacked triangles: ::before is the border (outer, one border-width larger) and
   ::after is the fill (inner). Both are anchored to the same edge so the border peeks around the fill —
   without it, a surface-coloured caret is invisible against a matching surface. */
${root}::before,
${root}::after {
  content: "";
  position: absolute;
  border-style: solid;
  border-color: transparent;
}
${root}::before { border-width: calc(${cv("arrow-size")} + ${cv("arrow-border-width")}); }
${root}::after { border-width: ${cv("arrow-size")}; }
/* Default placement="top": the view sits above its target, so the caret is on the bottom edge
   pointing down. */
${root}::before {
  top: 100%;
  inset-inline-start: calc(var(--instui-spacing-space-lg) - ${cv("arrow-border-width")});
  border-top-color: ${cv("arrow-border-color")};
}
${root}::after {
  top: 100%;
  inset-inline-start: var(--instui-spacing-space-lg);
  border-top-color: ${cv("arrow-background-color")};
}
/* placement="bottom": caret on the top edge, pointing up. */
${root}.-placement-bottom::before {
  top: auto;
  bottom: 100%;
  border-top-color: transparent;
  border-bottom-color: ${cv("arrow-border-color")};
}
${root}.-placement-bottom::after {
  top: auto;
  bottom: 100%;
  border-top-color: transparent;
  border-bottom-color: ${cv("arrow-background-color")};
}
/* placement="start": the view sits before its target, caret on the inline-end edge pointing toward it. */
${root}.-placement-start::before,
${root}.-placement-start::after {
  top: 50%;
  inset-inline-start: 100%;
  transform: translateY(-50%);
  border-top-color: transparent;
}
${root}.-placement-start::before { border-inline-start-color: ${cv("arrow-border-color")}; }
${root}.-placement-start::after { border-inline-start-color: ${cv("arrow-background-color")}; }
/* placement="end": the view sits after its target, caret on the inline-start edge pointing toward it. */
${root}.-placement-end::before,
${root}.-placement-end::after {
  top: 50%;
  inset-inline-start: auto;
  inset-inline-end: 100%;
  transform: translateY(-50%);
  border-top-color: transparent;
}
${root}.-placement-end::before { border-inline-end-color: ${cv("arrow-border-color")}; }
${root}.-placement-end::after { border-inline-end-color: ${cv("arrow-background-color")}; }
/* background="inverse": dark surface, inverse text, and inverse-coloured caret layers per placement. */
${root}.-color-inverse {
  background: var(--instui-color-background-inverse);
  color: var(--instui-color-text-inverse);
  border-color: ${cv("arrow-border-color-inverse")};
}
${root}.-color-inverse::before { border-top-color: ${cv("arrow-border-color-inverse")}; }
${root}.-color-inverse::after { border-top-color: ${cv("arrow-background-color-inverse")}; }
${root}.-color-inverse.-placement-bottom::before { border-top-color: transparent; border-bottom-color: ${cv("arrow-border-color-inverse")}; }
${root}.-color-inverse.-placement-bottom::after { border-top-color: transparent; border-bottom-color: ${cv("arrow-background-color-inverse")}; }
${root}.-color-inverse.-placement-start::before { border-top-color: transparent; border-inline-start-color: ${cv("arrow-border-color-inverse")}; }
${root}.-color-inverse.-placement-start::after { border-top-color: transparent; border-inline-start-color: ${cv("arrow-background-color-inverse")}; }
${root}.-color-inverse.-placement-end::before { border-top-color: transparent; border-inline-end-color: ${cv("arrow-border-color-inverse")}; }
${root}.-color-inverse.-placement-end::after { border-top-color: transparent; border-inline-end-color: ${cv("arrow-background-color-inverse")}; }
/* Popover use: as a [popover] the UA hides the element until it's opened, but the base \`display\`
   above out-ranks the UA \`[popover]:not(:popover-open){display:none}\` rule — so restore the hide here,
   and float it in the top layer when open. Position it at a trigger with CSS anchor positioning where
   supported; elsewhere the UA centres it. */
[popover]${root} { position: fixed; overflow: visible; margin: 0; }
[popover]${root}:not(:popover-open) { display: none; }
/* CSS anchor positioning (Chromium): with \`anchor-name: --pantoken-anchor\` on the trigger (or a
   popovertarget invoker's implicit anchor), the -placement-* modifier docks the caret side to the
   trigger and flips to stay on-screen. Inert elsewhere — the UA centres it in the top layer. */
@supports (position-area: block-end) {
  [popover]${root} {
    position-anchor: --pantoken-anchor;
    position-try-fallbacks: flip-block, flip-inline;
  }
  [popover]${root}.-placement-top { position-area: block-start; }
  [popover]${root}.-placement-bottom { position-area: block-end; }
  [popover]${root}.-placement-start { position-area: inline-start center; }
  [popover]${root}.-placement-end { position-area: inline-end center; }
}
`;
}

/**
 * Progress-circle rules: a CSS `conic-gradient` ring driven by a `--value` (0–100) custom property.
 * The fill/track/stroke are indirected through `--pantoken-pc-*` custom props so sizes
 * (`--x-small`/`--sm`/`--lg`), the status palette, and `--inverse` are one-line overrides.
 */
function progressCircleRules(p: string): string {
  const root = `.${p}progress-circle`;
  // Meter colour uses our normalized `-color-*` scheme (canonical); InstUI's `meterColor` names
  // (`-meter-color-*`) are kept as @deprecated aliases (added by withDeprecatedAliases). Unlike the bar,
  // the circle's `progress-circle-meter-color-*` tokens are distinct upstream, so we paint from them.
  const meter = (mod: string, token: string): string =>
    `${root}.-color-${mod} { --pantoken-pc-fill: var(--instui-component-progress-circle-meter-color-${token}); }
${root}.-color-primary-inverse.-color-${mod} { --pantoken-pc-fill: var(--instui-component-progress-circle-meter-color-${token}-inverse); }`;
  const size = (mod: string, key: string): string =>
    `${root}.-${mod} {
  width: var(--instui-component-progress-circle-${key}-size);
  height: var(--instui-component-progress-circle-${key}-size);
  --pantoken-pc-stroke: var(--instui-component-progress-circle-${key}-stroke-width);
}`;
  return `
/**
 * @component progress-circle
 * @summary A circular progress ring driven by a \`--value\` (0–100) custom property.
 * @example
 * <span class="instui-progress-circle -size-sm" role="img" aria-label="25 percent">
 *   <span class="value">25%</span>
 * </span>
 * @modifier -color-brand — Brand meter colour.
 * @modifier -color-info — Informational meter colour.
 * @modifier -color-success — Success meter colour.
 * @modifier -color-warning — Warning meter colour.
 * @modifier -color-danger — Danger meter colour.
 * @modifier -color-primary-inverse — On-dark (primary inverse) meter colour.
 * @modifier -size-xs — Extra small.
 * @modifier -size-sm — Small.
 * @modifier -size-lg — Large.
 */
/* --value (0–100) drives the arc; registered so the conic-gradient re-evaluates (and can transition). */
@property --value { syntax: "<number>"; inherits: true; initial-value: 0; }
${root} {
  --value: 0;
  --pantoken-pc-fill: var(--instui-component-progress-circle-meter-color-brand);
  --pantoken-pc-track: var(--instui-component-progress-circle-track-color);
  --pantoken-pc-stroke: var(--instui-component-progress-circle-medium-stroke-width);
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--instui-component-progress-circle-medium-size);
  height: var(--instui-component-progress-circle-medium-size);
  color: var(--instui-component-progress-circle-color);
  font-family: var(--instui-component-progress-circle-font-family);
  font-weight: var(--instui-component-progress-circle-font-weight);
  line-height: var(--instui-component-progress-circle-line-height);
}
/* The ring is a masked conic donut on ::before; the value sits in the hole. */
${root}::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: conic-gradient(var(--pantoken-pc-fill) calc(var(--value) * 1%), var(--pantoken-pc-track) 0);
  -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - var(--pantoken-pc-stroke)), #000 0);
  mask: radial-gradient(farthest-side, #0000 calc(100% - var(--pantoken-pc-stroke)), #000 0);
}
${root} .value {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
${size("size-xs", "x-small")}
${size("size-sm", "small")}
${size("size-lg", "large")}
${meter("brand", "brand")}
${meter("info", "info")}
${meter("success", "success")}
${meter("warning", "warning")}
${meter("danger", "danger")}
${root}.-color-primary-inverse {
  --pantoken-pc-fill: var(--instui-component-progress-circle-meter-color-brand-inverse);
  --pantoken-pc-track: var(--instui-component-progress-circle-track-color-inverse);
  color: var(--instui-component-progress-circle-color-inverse);
}
`;
}

/**
 * Pagination rules: a row of page controls. Page numbers and the first/prev/next/last arrows render as
 * `color="primary"` text buttons (brand text, no fill; InstUI's PaginationButton/PaginationArrowButton);
 * the current page is a filled primary button (`withBackground` + `withBorder`). Pages work as `<a href>`
 * or `<button>`. `.ellipsis` is the inert truncation marker, and `-variant-input` lays out the
 * "Page [n] of N" jumper using the page-input tokens.
 */
function paginationRules(p: string): string {
  const root = `.${p}pagination`;
  return `
/**
 * @component pagination
 * @summary Page navigation: numbered pages, first, previous, next, and last arrows, and an ellipsis for gaps.
 * @example
 * <nav class="instui-pagination" aria-label="Pagination">
 *   <button class="arrow" type="button" aria-label="First page" disabled><span class="instui-icon -icon-chevrons-left"></span></button>
 *   <button class="arrow" type="button" aria-label="Previous page" disabled><span class="instui-icon -icon-chevron-left"></span></button>
 *   <a class="page" href="#" aria-current="page">1</a>
 *   <a class="page" href="#">2</a>
 *   <a class="page" href="#">3</a>
 *   <span class="ellipsis">…</span>
 *   <a class="page" href="#">12</a>
 *   <a class="arrow" href="#" aria-label="Next page"><span class="instui-icon -icon-chevron-right"></span></a>
 *   <a class="arrow" href="#" aria-label="Last page"><span class="instui-icon -icon-chevrons-right"></span></a>
 * </nav>
 * @structure
 * .instui-pagination
 *   .arrow
 *     .instui-icon.-icon-chevrons-left
 *   .page
 *   .ellipsis
 * @modifier -variant-input — Compact variant with a page-number input.
 * @part .page — A page link or button; the current page carries \`[aria-current]\`.
 * @part .arrow — A first, previous, next, or last control.
 * @part .ellipsis — The gap marker between page ranges.
 * @part .page-input-label — The label for the page-number input (input variant).
 */
${root} {
  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--instui-component-pagination-page-indicator-gap);
  font-family: var(--instui-font-family-base);
}
${scope(
  root,
  `
/* A page number or a nav arrow — an <a> or <button>. Text-style primary button: brand text, no fill. */
.${p}pagination .page,
.${p}pagination .arrow {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-inline-size: 2rem;
  min-block-size: 2rem;
  padding: var(--instui-spacing-space2xs) var(--instui-spacing-space-xs);
  color: var(--instui-color-text-interactive-navigation-primary-base);
  background: transparent;
  border: var(--instui-border-width-md) solid transparent;
  border-radius: var(--instui-component-base-button-border-radius);
  font: inherit;
  font-weight: var(--instui-font-weight-interactive);
  text-decoration: none;
  cursor: pointer;
}
.${p}pagination .page:hover,
.${p}pagination .arrow:hover {
  background: var(--instui-color-background-muted);
  color: var(--instui-color-text-interactive-navigation-primary-hover);
}
/* The current page — a filled primary button (InstUI: color="primary" withBackground withBorder). */
.${p}pagination .page[aria-current],
.${p}pagination .page.-current {
  background: var(--instui-color-background-interactive-action-primary-base);
  color: var(--instui-color-text-interactive-action-primary-base);
  border-color: var(--instui-color-background-interactive-action-primary-base);
}
.${p}pagination .page[aria-current]:hover,
.${p}pagination .page.-current:hover {
  background: var(--instui-color-background-interactive-action-primary-hover);
  border-color: var(--instui-color-background-interactive-action-primary-hover);
  color: var(--instui-color-text-interactive-action-primary-base);
}
/* Disabled nav arrows (first/prev at page 1, etc.) — shown muted (InstUI showDisabledButtons). */
.${p}pagination .arrow:disabled,
.${p}pagination .arrow[aria-disabled="true"] {
  color: var(--instui-color-text-muted);
  background: transparent;
  opacity: var(--instui-opacity-disabled);
  cursor: not-allowed;
}
/* The truncation ellipsis — inert text. */
.${p}pagination .ellipsis {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-inline-size: 2rem;
  color: var(--instui-color-text-muted);
}
/* variant="input" label ("Page … of N"). */
.${p}pagination .page-input-label { color: var(--instui-component-pagination-page-input-label-color); }
`,
  ["page", "arrow", "ellipsis", "page-input-label"],
)}
/* variant="input": a "Page [n] of N" jumper (the input width + spacing come from the page-input tokens). */
${root}.-variant-input { gap: var(--instui-component-pagination-page-input-input-spacing); }
${root}.-variant-input .${p}text-input,
${root}.-variant-input .${p}number-input { inline-size: var(--instui-component-pagination-page-input-input-width); }
`;
}

/** Truncate rules: single-line ellipsis, plus a `--lines` multi-line clamp (set `--lines`). */
function truncateRules(p: string): string {
  return `
/**
 * @component truncate
 * @summary Single-line ellipsis truncation, or a multi-line clamp via \`--lines\`.
 * @example
 * <div class="instui-truncate">This single line keeps going past the edge of its box, so it ends in an ellipsis.</div>
 * @modifier -lines — Multi-line clamp; set the line count via the \`--lines\` custom property (default 2).
 */
.${p}truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: var(--instui-component-truncate-text-font-family);
  line-height: var(--instui-component-truncate-text-line-height);
}
.${p}truncate.-lines {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: var(--lines, 2);
  line-clamp: var(--lines, 2);
  white-space: normal;
  overflow: hidden;
}
`;
}

/** Toggle-details rules: a styled native `<details>` accordion, with `--sm`/`--lg` sizes. */
function toggleDetailsRules(p: string): string {
  return `
/**
 * @component toggle-details
 * @summary A styled native \`<details>\` disclosure with a rotating chevron.
 * @example
 * <details class="instui-toggle-details" open>
 *   <summary>What ships in this package?</summary>
 *   Class-based component styles, built from the Instructure tokens, plus a prose layer.
 * </details>
 * @modifier -variant-filled — Filled (surface) variant.
 * @modifier -chevron-end — Place the chevron after the summary.
 * @modifier -size-sm — Small.
 * @modifier -size-lg — Large.
 */
.${p}toggle-details {
  color: var(--instui-component-toggle-details-text-color);
  font-family: var(--instui-component-toggle-details-font-family);
  font-weight: var(--instui-component-toggle-details-font-weight);
  line-height: var(--instui-component-toggle-details-line-height);
}
.${p}toggle-details > summary {
  display: flex;
  align-items: center;
  gap: var(--instui-component-toggle-details-icon-margin);
  cursor: pointer;
  list-style: none;
  font-size: var(--instui-component-toggle-details-font-size-medium);
  padding: var(--instui-component-toggle-details-toggle-padding);
  color: var(--instui-component-toggle-details-text-color);
}
/* Kill the native disclosure marker; we supply a rotating chevron. */
.${p}toggle-details > summary::-webkit-details-marker { display: none; }
.${p}toggle-details > summary::before {
  content: "";
  flex: none;
  inline-size: 1em;
  block-size: 1em;
  background: currentColor;
  -webkit-mask: ${CHEVRON_RIGHT_ICON};
  mask: ${CHEVRON_RIGHT_ICON};
  transition: transform 0.2s ease;
}
.${p}toggle-details[open] > summary::before { transform: rotate(90deg); }
/* iconPosition="end" (named -chevron-end, NOT -icon-position-end — a "-icon-" class would collide with the
   generic [class*="-icon-"] glyph painter): push the disclosure chevron to the inline-end. */
.${p}toggle-details.-chevron-end > summary::before { order: 1; margin-inline-start: auto; }
/* variant="filled": the summary reads as an action-secondary button. */
.${p}toggle-details.-variant-filled > summary {
  background: var(--instui-color-background-interactive-action-secondary-base);
  border-radius: var(--instui-component-toggle-details-toggle-border-radius);
}
.${p}toggle-details > :not(summary) {
  padding: var(--instui-component-toggle-details-content-padding-medium);
}
.${p}toggle-details.-size-sm > summary { font-size: var(--instui-component-toggle-details-font-size-small); }
.${p}toggle-details.-size-sm > :not(summary) { padding: var(--instui-component-toggle-details-content-padding-small); }
.${p}toggle-details.-size-lg > summary { font-size: var(--instui-component-toggle-details-font-size-large); }
.${p}toggle-details.-size-lg > :not(summary) { padding: var(--instui-component-toggle-details-content-padding-large); }
`;
}

/** File-drop rules: a dashed dropzone with hover, accepted, and rejected states. */
function fileDropRules(p: string): string {
  return `
/**
 * @component file-drop
 * @summary A file dropzone with hover, accepted, and rejected states.
 * @example
 * <label class="instui-file-drop" id="fd">
 *   <span class="instui-icon -icon-cloud-upload"></span>
 *   <div class="instui-text"><strong>Drag an image here</strong>, or click to browse.</div>
 *   <div class="instui-text -size-sm instui-fg-muted" id="fd-msg">PNG or JPG up to 5&nbsp;MB.</div>
 *   <input type="file" id="fd-input">
 * </label>
 * @structure
 * .instui-file-drop
 *   .instui-icon.-icon-cloud-upload
 *   .instui-text
 *     strong
 *   .instui-text.-size-sm.instui-fg-muted
 *   input
 * @modifier -accepted — Drag state for an acceptable file.
 * @modifier -hover — Hover or drag-over state.
 * @modifier -rejected — Drag state for a rejected file.
 */
.${p}file-drop {
  display: block;
  text-align: center;
  padding: var(--instui-spacing-space-lg);
  color: var(--instui-color-text-base);
  background: var(--instui-component-file-drop-background-color);
  border: var(--instui-component-file-drop-border-width) var(--instui-component-file-drop-border-style) var(--instui-component-file-drop-border-color);
  border-radius: var(--instui-component-file-drop-border-radius);
}
.${p}file-drop:hover,
.${p}file-drop.-hover { border-color: var(--instui-component-file-drop-hover-border-color); }
.${p}file-drop.-accepted { border-color: var(--instui-component-file-drop-accepted-color); }
.${p}file-drop.-rejected { border-color: var(--instui-component-file-drop-rejected-color); }
`;
}

/**
 * SideNavBar rules: a vertical navigation rail of icon-over-label `.item`s (InstUI SideNavBar +
 * SideNavBar.Item). `-selected` marks the current item; `-minimized` narrows the rail and hides the
 * labels, leaving the icons. Items work as `<a>` or `<button>`.
 */
function sideNavBarRules(p: string): string {
  const root = `.${p}side-nav-bar`;
  const s = (k: string): string => `var(--instui-component-side-nav-bar-${k})`;
  return `
/**
 * @component side-nav-bar
 * @summary A vertical navigation rail of icon-over-label items, with a minimized icons-only mode.
 * @example
 * <nav class="instui-side-nav-bar" aria-label="Primary">
 *   <a class="item -selected" href="#">
 *     <span class="instui-icon -icon-house"></span>
 *     <span class="label">Home</span>
 *   </a>
 *   <a class="item" href="#">
 *     <span class="instui-icon -icon-inbox"></span>
 *     <span class="label">Inbox</span>
 *   </a>
 *   <a class="item" href="#">
 *     <span class="instui-icon -icon-calendar"></span>
 *     <span class="label">Calendar</span>
 *   </a>
 *   <a class="item" href="#">
 *     <span class="instui-icon -icon-settings"></span>
 *     <span class="label">Settings</span>
 *   </a>
 * </nav>
 * @structure
 * .instui-side-nav-bar
 *   .item.-selected
 *     .instui-icon.-icon-house
 *     .label
 *   .item
 *     .instui-icon.-icon-inbox
 *     .label
 * @modifier -minimized — Collapse to icons only (labels hidden).
 * @part .item — A navigation entry; \`-selected\` marks the active one.
 */
${root} {
  display: flex;
  flex-direction: column;
  gap: ${s("content-gap")};
  padding: ${s("content-margin")};
  box-sizing: border-box;
  inline-size: fit-content;
  /* The rail sits on the page and runs full height (InstUI SideNavBar is 100% of its layout column). */
  block-size: 100%;
  min-block-size: 100%;
  background: ${s("background-color")};
  color: ${s("font-color")};
  font-family: ${s("item-font-family")};
}
${scope(
  root,
  `
.${p}side-nav-bar .item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--instui-spacing-space2xs);
  padding: ${s("item-content-padding")};
  min-inline-size: ${s("minimized-width")};
  color: ${s("item-font-color")};
  background: ${s("item-background-color")};
  border-radius: ${s("item-border-radius")};
  font-size: ${s("item-font-size")};
  font-weight: ${s("item-font-weight")};
  line-height: ${s("item-line-height")};
  text-align: center;
  text-decoration: ${s("item-link-text-decoration")};
  cursor: pointer;
}
.${p}side-nav-bar .item:hover { background: ${s("item-hover-background-color")}; }
.${p}side-nav-bar .item.-selected {
  background: ${s("item-selected-background-color")};
  color: ${s("item-selected-font-color")};
}
`,
  ["item"],
)}
/* minimized: a narrow rail — the icons stay, the labels are hidden. */
${root}.-minimized { inline-size: ${s("minimized-width")}; }
${root}.-minimized .item .label { display: none; }
`;
}

/**
 * TreeBrowser rules: a disclosure tree built from nested native `<details>` (collections) and leaf
 * `.item`s (InstUI TreeBrowser). Each collection `<summary>` gets a rotating chevron (marker removed);
 * leaves and summaries share the tree-button colours + hover/selected states. `-size-{sm,lg}` scale the
 * text and row spacing from the tree-button tokens.
 */
function treeBrowserRules(p: string): string {
  const root = `.${p}tree-browser`;
  const t = (k: string): string => `var(--instui-component-tree-browser-${k})`;
  return `
/**
 * @component tree-browser
 * @summary A disclosure tree of nested collections and leaf items, with rotating chevrons.
 * @example
 * <div class="instui-tree-browser" role="tree">
 *   <details open>
 *     <summary><span class="instui-icon -icon-folder"></span> Course files</summary>
 *     <ul role="group">
 *       <li>
 *         <a class="item" href="#"><span class="instui-icon -icon-file-text"></span> Syllabus.pdf</a>
 *       </li>
 *       <li>
 *         <details>
 *           <summary><span class="instui-icon -icon-folder"></span> Week 1</summary>
 *           <ul role="group">
 *             <li>
 *               <a class="item -selected" href="#"><span class="instui-icon -icon-file-text"></span> Reading.pdf</a>
 *             </li>
 *             <li>
 *               <a class="item" href="#"><span class="instui-icon -icon-file-text"></span> Slides.pptx</a>
 *             </li>
 *           </ul>
 *         </details>
 *       </li>
 *       <li>
 *         <a class="item" href="#"><span class="instui-icon -icon-file-text"></span> Rubric.docx</a>
 *       </li>
 *     </ul>
 *   </details>
 * </div>
 * @structure
 * .instui-tree-browser
 *   details
 *     summary
 *       .instui-icon.-icon-folder
 *     ul
 *       li
 *         .item
 *           .instui-icon.-icon-file-text
 * @modifier -size-sm — Small.
 * @modifier -size-lg — Large.
 * @part .item — A leaf entry in the tree.
 */
${root} {
  border-radius: ${t("border-radius")};
  font-family: ${t("tree-collection-font-family")};
  color: ${t("tree-button-name-text-color")};
}
/* A collection node (a <details><summary>) and a leaf (.item) share the button chrome. */
${root} details > summary,
${root} .item {
  display: flex;
  align-items: center;
  gap: ${t("tree-button-icons-margin-right-medium")};
  padding: ${t("tree-button-base-spacing-medium")};
  font-size: ${t("tree-button-name-font-size-medium")};
  line-height: ${t("tree-button-text-line-height")};
  color: ${t("tree-button-name-text-color")};
  border-radius: ${t("tree-button-border-radius")};
  cursor: pointer;
  list-style: none;
}
${root} details > summary::-webkit-details-marker { display: none; }
/* The disclosure chevron rotates open (same technique as toggle-details). */
${root} details > summary::before {
  content: "";
  flex: none;
  inline-size: 1em;
  block-size: 1em;
  background: currentColor;
  -webkit-mask: ${CHEVRON_RIGHT_ICON};
  mask: ${CHEVRON_RIGHT_ICON};
  transition: transform 0.2s ease;
}
${root} details[open] > summary::before { transform: rotate(90deg); }
${root} details > summary:hover,
${root} .item:hover {
  background: ${t("tree-button-hover-background-color")};
  color: ${t("tree-button-hover-text-color")};
}
${root} details > summary.-selected,
${root} .item.-selected {
  background: ${t("tree-button-selected-background-color")};
  color: ${t("tree-button-selected-text-color")};
}
/* Nested lists indent; the leaf list carries no bullets. */
${root} ul { margin: 0; padding-inline-start: ${t("tree-collection-base-spacing-medium")}; list-style: none; }
${root}.-size-sm details > summary,
${root}.-size-sm .item { padding: ${t("tree-button-base-spacing-small")}; font-size: ${t("tree-button-name-font-size-small")}; }
${root}.-size-lg details > summary,
${root}.-size-lg .item { padding: ${t("tree-button-base-spacing-large")}; font-size: ${t("tree-button-name-font-size-large")}; }
`;
}

/**
 * Calendar rules: a static month grid (InstUI Calendar). A `.nav` header row, a seven-column `.grid` of
 * `.weekday` labels + `.day` cells, with `-today`/`-selected`/`-outside-month` day states. The dates and
 * month navigation are the consumer's (or the web-component's) job — this styles the grid only.
 */
function calendarRules(p: string): string {
  const root = `.${p}calendar`;
  const c = (k: string): string => `var(--instui-component-calendar-${k})`;
  return `
/**
 * @component calendar
 * @summary A static month grid with navigation, weekday headers, and day cells.
 * @example
 * <div class="instui-calendar" role="table" aria-label="March 2026">
 *   <div class="nav">
 *     <button class="instui-button -color-tertiary -shape-square -icon-chevron-left" aria-label="Previous month"></button>
 *     <strong>March 2026</strong>
 *     <button class="instui-button -color-tertiary -shape-square -icon-chevron-right" aria-label="Next month"></button>
 *   </div>
 *   <div class="grid">
 *     <span class="weekday">Su</span>
 *     <span class="weekday">Mo</span>
 *     <span class="weekday">Tu</span>
 *     <span class="weekday">We</span>
 *     <span class="weekday">Th</span>
 *     <span class="weekday">Fr</span>
 *     <span class="weekday">Sa</span>
 *     <span class="day -outside-month">23</span>
 *     <span class="day -outside-month">24</span>
 *     <span class="day -outside-month">25</span>
 *     <span class="day -outside-month">26</span>
 *     <span class="day -outside-month">27</span>
 *     <span class="day -outside-month">28</span>
 *     <span class="day">1</span>
 *     <span class="day">2</span>
 *     <span class="day">3</span>
 *     <span class="day">4</span>
 *     <span class="day">5</span>
 *     <span class="day">6</span>
 *     <span class="day -today">7</span>
 *     <span class="day">8</span>
 *     <span class="day">9</span>
 *     <span class="day">10</span>
 *     <span class="day">11</span>
 *     <span class="day -selected">12</span>
 *     <span class="day">13</span>
 *     <span class="day">14</span>
 *     <span class="day">15</span>
 *   </div>
 * </div>
 * @structure
 * .instui-calendar
 *   .nav
 *     .instui-button.-color-tertiary.-shape-square.-icon-chevron-left
 *     strong
 *     .instui-button.-color-tertiary.-shape-square.-icon-chevron-right
 *   .grid
 *     .weekday
 *     .day.-outside-month
 *     .day
 *     .day.-today
 *     .day.-selected
 * @part .nav — The month navigation row.
 * @part .grid — The seven-column day grid.
 * @part .weekday — A weekday column header.
 * @part .day — A day cell; \`-today\`, \`-selected\`, and \`-outside-month\` mark its state.
 */
${root} {
  display: inline-block;
  text-align: center;
  background: ${c("background")};
  color: ${c("color")};
  font-family: ${c("font-family")};
  font-size: ${c("font-size")};
  font-weight: ${c("font-weight")};
  line-height: ${c("line-height")};
}
${scope(
  root,
  `
.${p}calendar .nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: ${c("nav-margin")};
  max-inline-size: ${c("max-header-width")};
}
/* Fixed square day cells, centred as a block (1fr columns would stretch the cells unevenly and
   off-centre inside the inline-block calendar). */
.${p}calendar .grid {
  display: grid;
  grid-template-columns: repeat(7, ${c("day-min-width")});
  justify-content: center;
  row-gap: var(--instui-spacing-space2xs);
}
.${p}calendar .weekday,
.${p}calendar .day {
  display: flex;
  align-items: center;
  justify-content: center;
  inline-size: ${c("day-min-width")};
  block-size: ${c("day-height")};
}
.${p}calendar .weekday { font-weight: var(--instui-font-weight-interactive); }
.${p}calendar .day {
  font-size: ${c("day-font-size")};
  color: ${c("day-color")};
  background: ${c("day-background")};
  cursor: pointer;
}
.${p}calendar .day.-outside-month { color: ${c("day-outside-month-color")}; }
.${p}calendar .day.-today {
  background: ${c("day-today-background")};
  color: ${c("day-today-color")};
  border-radius: ${c("day-today-border-radius")};
}
.${p}calendar .day.-selected {
  background: ${c("day-selected-background")};
  color: ${c("day-selected-color")};
  border-radius: ${c("day-selected-border-radius")};
}
`,
  // Only .nav and .grid are direct children; .weekday and .day live inside .grid, so leave them as
  // descendant selectors (listing them would force an incorrect :scope > direct-child match).
  ["nav", "grid"],
)}
`;
}

/**
 * Popover rules: a generic elevated surface for a native `[popover]` (InstUI Popover). The UA hides it
 * until opened and floats it in the top layer; the class supplies the surface, border, radius, and
 * shadow. Position it at a trigger with CSS anchor positioning where supported.
 */
function popoverRules(p: string): string {
  const root = `.${p}popover`;
  return `
/**
 * @component popover
 * @summary An elevated surface for a native \`[popover]\`, positioned with CSS anchor positioning.
 * @example
 * <div class="instui-popover -placement-bottom" id="pop-1">
 *   <div class="instui-heading -level-h4">Share this page</div>
 *   <p class="instui-text -size-sm">A popover is a lightweight surface anchored to a trigger. This one uses the native <code>popover</code> attribute.</p>
 * </div>
 * @structure
 * .instui-popover.-placement-bottom
 *   .instui-heading.-level-h4
 *   .instui-text.-size-sm
 *     code
 * @modifier -placement-top — Sit above the anchor.
 * @modifier -placement-bottom — Sit below the anchor.
 * @modifier -placement-start — Sit at the start (inline-start) of the anchor.
 * @modifier -placement-end — Sit at the end (inline-end) of the anchor.
 */
${root} {
  background: var(--instui-color-background-elevated-surface-base);
  color: var(--instui-color-text-base);
  border: var(--instui-border-width-sm) solid var(--instui-component-popover-border-color);
  border-radius: var(--instui-component-popover-border-radius);
  padding: var(--instui-spacing-space-sm);
  box-shadow: var(--instui-elevation-above);
}
[popover]${root} { margin: 0; }
/* CSS anchor positioning (Chromium): if the trigger declares \`anchor-name: --pantoken-anchor\` (or the
   popover is opened via a popovertarget invoker, which supplies an implicit anchor), the -placement-*
   modifier places it beside the trigger and it flips to stay on-screen. Inert where unsupported — the UA
   then centres the popover in the top layer. */
@supports (position-area: block-end) {
  [popover]${root} {
    position-anchor: --pantoken-anchor;
    position-try-fallbacks: flip-block, flip-inline;
  }
  [popover]${root}.-placement-top { position-area: block-start; }
  [popover]${root}.-placement-bottom { position-area: block-end; }
  [popover]${root}.-placement-start { position-area: inline-start center; }
  [popover]${root}.-placement-end { position-area: inline-end center; }
}
/* A gentle open animation (native popover + @starting-style, no JS). Inert where unsupported. */
@supports (transition-behavior: allow-discrete) {
  [popover]${root} {
    transition: opacity 0.15s ease, transform 0.15s ease, overlay 0.15s allow-discrete, display 0.15s allow-discrete;
    opacity: 1;
    transform: translateY(0);
  }
  [popover]${root}:not(:popover-open) { opacity: 0; transform: translateY(-0.25rem); }
  @starting-style {
    [popover]${root}:popover-open { opacity: 0; transform: translateY(-0.25rem); }
  }
}
`;
}

/**
 * Tray rules: an edge-pinned panel (InstUI Tray). `-placement-{start,end,top,bottom}` docks it to a
 * viewport edge; `-size-{xs,sm,md,lg,xl}` sets the width (or height for top/bottom). Works as a native
 * `[popover]` or `<dialog>` so it opens in the top layer; the web-component adds focus management.
 */
function trayRules(p: string): string {
  const root = `.${p}tray`;
  const w = (k: string): string => `var(--instui-component-tray-width-${k})`;
  return `
/**
 * @component tray
 * @summary An edge-pinned panel that slides in from any side; a native \`[popover]\` or \`<dialog>\`.
 * @example
 * <div class="instui-tray -size-sm" id="tray-start">
 *   <div>
 *     <strong>Filters</strong>
 *     <button class="instui-close-button" aria-label="Close"></button>
 *   </div>
 *   <p class="instui-text -size-sm">A tray slides in from the start edge and fills the viewport height.</p>
 * </div>
 * @structure
 * .instui-tray.-size-sm
 *   div
 *     strong
 *     .instui-close-button
 *   .instui-text.-size-sm
 * @modifier -placement-top — Pin to the top edge.
 * @modifier -placement-bottom — Pin to the bottom edge.
 * @modifier -placement-end — Pin to the end (inline-end) edge.
 * @modifier -size-xs — Extra small.
 * @modifier -size-sm — Small.
 * @modifier -size-lg — Large.
 * @modifier -size-xl — Extra large.
 */
${root} {
  position: fixed;
  inset-block: 0;
  inset-inline-start: 0;
  inline-size: ${w("md")};
  max-inline-size: 100%;
  /* block-size:auto lets inset-block:0 stretch it full height, overriding the UA popover's
     height:fit-content; so the edge shadows fall outside the viewport. */
  block-size: auto;
  max-block-size: none;
  background: var(--instui-component-tray-background-color);
  border: var(--instui-component-tray-border-width) solid var(--instui-component-tray-border-color);
  padding: var(--instui-component-tray-padding);
  z-index: var(--instui-component-tray-z-index);
  box-shadow: var(--instui-elevation-topmost);
}
${root}.-placement-end { inset-inline: auto 0; }
${root}.-placement-top { inset: 0 0 auto 0; inline-size: 100%; block-size: auto; }
${root}.-placement-bottom { inset: auto 0 0 0; inline-size: 100%; block-size: auto; }
${root}.-size-xs { inline-size: ${w("xs")}; }
${root}.-size-sm { inline-size: ${w("sm")}; }
${root}.-size-lg { inline-size: ${w("lg")}; }
${root}.-size-xl { inline-size: ${w("xl")}; }
[popover]${root} { margin: 0; }
dialog${root} { margin: 0; padding: var(--instui-component-tray-padding); border: var(--instui-component-tray-border-width) solid var(--instui-component-tray-border-color); }
/* Slide in from the docked edge on open (native popover + @starting-style, no JS). The transform is
   keyed to placement; inert where allow-discrete transitions aren't supported. */
@supports (transition-behavior: allow-discrete) {
  [popover]${root} {
    transition: transform 0.2s ease, overlay 0.2s allow-discrete, display 0.2s allow-discrete;
    transform: translateX(0);
  }
  [popover]${root}:not(:popover-open) { transform: translateX(-100%); }
  @starting-style { [popover]${root}:popover-open { transform: translateX(-100%); } }
  [popover]${root}.-placement-end:not(:popover-open) { transform: translateX(100%); }
  @starting-style { [popover]${root}.-placement-end:popover-open { transform: translateX(100%); } }
  [popover]${root}.-placement-top:not(:popover-open) { transform: translateY(-100%); }
  @starting-style { [popover]${root}.-placement-top:popover-open { transform: translateY(-100%); } }
  [popover]${root}.-placement-bottom:not(:popover-open) { transform: translateY(100%); }
  @starting-style { [popover]${root}.-placement-bottom:popover-open { transform: translateY(100%); } }
}
`;
}

/**
 * Tooltip rules: a CSS hover/focus tooltip (InstUI Tooltip). `.instui-tooltip` wraps the trigger; the
 * `.tip` child is the inverse bubble that appears on hover or keyboard focus. `-placement-*` moves it.
 * The web-component adds show/hide delay, Esc-dismiss, and the `aria-describedby` wiring; a CSS-only
 * tooltip should still point `aria-describedby` at the tip for screen-reader users.
 */
function tooltipRules(p: string): string {
  const root = `.${p}tooltip`;
  const t = (k: string): string => `var(--instui-component-tooltip-${k})`;
  return `
/**
 * @component tooltip
 * @summary A CSS hover and focus tooltip bubble, positionable on any side.
 * @example
 * <span class="instui-tooltip" aria-describedby="tt-1">
 *   <span class="instui-icon -icon-info"></span>
 *   <span class="tip" id="tt-1" role="tooltip">Default placement is top</span>
 * </span>
 * @structure
 * .instui-tooltip
 *   .instui-icon.-icon-info
 *   .tip
 * @part .tip — The bubble; \`-placement-*\` sets its side.
 */
${root} {
  position: relative;
  display: inline-flex;
}
${scope(
  root,
  `
.${p}tooltip .tip {
  position: absolute;
  z-index: 1;
  inset-block-end: 100%;
  inset-inline-start: 50%;
  transform: translateX(-50%);
  margin-block-end: var(--instui-spacing-space-xs);
  padding: ${t("padding")};
  background: var(--instui-color-background-inverse);
  color: var(--instui-color-text-inverse);
  border-radius: var(--instui-border-radius-sm);
  font-family: ${t("font-family")};
  font-size: ${t("font-size")};
  font-weight: ${t("font-weight")};
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: opacity 0.15s ease;
}
`,
  ["tip"],
)}
/* Show on hover or keyboard focus of the trigger. */
${root}:hover > .tip,
${root}:focus-within > .tip { opacity: 1; visibility: visible; }
/* Placement (authored on the .tip itself, matching the web-component): default is top; these move the
   bubble to the other sides. */
${root} > .tip.-placement-bottom { inset-block: 100% auto; margin-block: var(--instui-spacing-space-xs) 0; }
${root} > .tip.-placement-start { inset-block-end: auto; inset-inline: auto 100%; top: 50%; transform: translateY(-50%); margin: 0 var(--instui-spacing-space-xs) 0 0; }
${root} > .tip.-placement-end { inset-block-end: auto; inset-inline: 100% auto; top: 50%; transform: translateY(-50%); margin: 0 0 0 var(--instui-spacing-space-xs); }
`;
}

/**
 * RangeInput rules: a styled `input[type="range"]` (`.range-input`, track + handle for both engines) with
 * hover/focus handle states, plus a `.range-input-value` bubble — an inverse ContextView-style pill with a
 * left-pointing caret (InstUI renders the value in a `ContextView` placed end-center), sized per `-size-*`
 * from the value tokens. The input's block-size = the handle size so the thumb isn't clipped, and the thin
 * track is centred within it.
 */
function rangeInputRules(p: string): string {
  const v = (s: string): string => `var(--instui-component-range-input-${s})`;
  const track = `
  block-size: 0.25rem;
  background: ${v("track-background")};
  border: var(--instui-border-width-sm) solid ${v("track-border-color")};
  border-radius: 999px;`;
  const thumb = `
  inline-size: ${v("handle-size")};
  block-size: ${v("handle-size")};
  background: ${v("handle-background")};
  border: ${v("handle-border-size")} solid ${v("handle-border-color")};
  border-radius: 50%;
  box-shadow: 0 0 0 0 ${v("handle-shadow-color")};
  cursor: pointer;`;
  return `
/**
 * @component range-input
 * @summary A styled range slider with an inverse value bubble.
 * @example
 * <input class="instui-range-input" id="r1" type="range" value="30">
 */
.${p}range-input {
  -webkit-appearance: none;
  appearance: none;
  inline-size: 100%;
  min-inline-size: ${v("min-width")};
  block-size: ${v("handle-size")};
  background: transparent;
}
/* Chrome/Safari: the runnable track is centred in the (handle-sized) control box. */
.${p}range-input::-webkit-slider-runnable-track {${track}
}
.${p}range-input::-moz-range-track {${track}
}
.${p}range-input::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  margin-block-start: calc((0.25rem - ${v("handle-size")}) / 2);${thumb}
}
.${p}range-input::-moz-range-thumb {${thumb}
}
.${p}range-input:hover::-webkit-slider-thumb { background: ${v("handle-hover-background")}; }
.${p}range-input:hover::-moz-range-thumb { background: ${v("handle-hover-background")}; }
.${p}range-input:focus-visible { outline: none; }
.${p}range-input:focus-visible::-webkit-slider-thumb {
  background: ${v("handle-focus-background")};
  box-shadow: 0 0 0 ${v("handle-focus-outline-width")} ${v("handle-focus-outline-color")};
}
.${p}range-input:focus-visible::-moz-range-thumb {
  background: ${v("handle-focus-background")};
  box-shadow: 0 0 0 ${v("handle-focus-outline-width")} ${v("handle-focus-outline-color")};
}
/* The value bubble: an inverse pill with a caret pointing back toward the track (InstUI ContextView). */
.${p}range-input-value {
  position: relative;
  display: inline-flex;
  align-items: center;
  /* Hug the number: the value line-height token is oversized (a container height), and as a flex item
     the bubble must not stretch to the row — so pin line-height to the text and never self-stretch. */
  align-self: center;
  margin-inline-start: 0.5rem;
  background: var(--instui-color-background-inverse);
  color: var(--instui-color-text-inverse);
  border-radius: var(--instui-border-radius-md);
  padding: ${v("value-medium-padding")};
  font-family: ${v("value-font-family")};
  font-size: ${v("value-medium-font-size")};
  font-weight: ${v("value-font-weight")};
  line-height: 1;
}
.${p}range-input-value::before {
  content: "";
  position: absolute;
  inset-inline-start: -0.375rem;
  inset-block-start: 50%;
  transform: translateY(-50%);
  border-block: 0.375rem solid transparent;
  border-inline-end: 0.375rem solid var(--instui-color-background-inverse);
  border-inline-start: 0;
}
.${p}range-input-value.-size-sm {
  padding: ${v("value-small-padding")};
  font-size: ${v("value-small-font-size")};
  line-height: ${v("value-small-line-height")};
}
.${p}range-input-value.-size-lg {
  padding: ${v("value-large-padding")};
  font-size: ${v("value-large-font-size")};
  line-height: ${v("value-large-line-height")};
}
`;
}

const wrap = (name: string, prefix: string, rules: string): string =>
  `/* InstUI ${name} (@pantoken/components) — prefix: ${prefix} */\n${rules.trim()}\n`;

/**
 * Build the button stylesheet: `.<prefix>-button` with `--secondary` and `--danger` modifiers.
 *
 * @param options - {@link ComponentOptions}.
 * @returns The CSS string.
 *
 * @example Default instui prefix
 * ```ts
 * import { buttonCss } from "@pantoken/components";
 *
 * const css = buttonCss();
 * // <button class="instui-button">Save</button>
 * // <button class="instui-button instui-button--secondary">Cancel</button>
 * ```
 *
 * @example Custom class prefix
 * ```ts
 * import { buttonCss } from "@pantoken/components";
 *
 * const css = buttonCss({ prefix: "ui" });
 * // <button class="ui-button ui-button--danger">Delete</button>
 * ```
 *
 * @demo self:button
 */
export function buttonCss(options: ComponentOptions = {}): string {
  const prefix = options.prefix || "";
  return wrap("button", prefix, buttonRules(ns(prefix)));
}

/**
 * Build the alert stylesheet: `.<prefix>-alert` with `--info`, `--success`, `--warning`, `--danger`.
 *
 * @param options - {@link ComponentOptions}.
 * @returns The CSS string.
 *
 * @example
 * ```ts
 * import { alertCss } from "@pantoken/components";
 *
 * const css = alertCss();
 * // <div class="instui-alert instui-alert--success">Saved.</div>
 * ```
 *
 * @demo self:alert
 */
export function alertCss(options: ComponentOptions = {}): string {
  const prefix = options.prefix || "";
  return wrap("alert", prefix, alertRules(ns(prefix)));
}

/**
 * Build the badge stylesheet: `.<prefix>-badge` with `--success` and `--danger` modifiers.
 *
 * @param options - {@link ComponentOptions}.
 * @returns The CSS string.
 *
 * @example
 * ```ts
 * import { badgeCss } from "@pantoken/components";
 *
 * const css = badgeCss();
 * // <span class="instui-badge instui-badge--danger">3</span>
 * ```
 *
 * @demo self:badge
 */
export function badgeCss(options: ComponentOptions = {}): string {
  const prefix = options.prefix || "";
  return wrap("badge", prefix, badgeRules(ns(prefix)));
}

/**
 * Build the pill stylesheet: `.<prefix>-pill` with `--info`, `--success`, `--warning`, `--danger`.
 *
 * @param options - {@link ComponentOptions}.
 * @returns The CSS string.
 *
 * @example
 * ```ts
 * import { pillCss } from "@pantoken/components";
 *
 * const css = pillCss();
 * // <span class="instui-pill instui-pill--warning">Pending</span>
 * ```
 *
 * @demo self:pill
 */
export function pillCss(options: ComponentOptions = {}): string {
  const prefix = options.prefix || "";
  return wrap("pill", prefix, pillRules(ns(prefix)));
}

/**
 * Build the tag stylesheet: `.<prefix>-tag` (a filled chip with a hover state).
 *
 * @param options - {@link ComponentOptions}.
 * @returns The CSS string.
 *
 * @example
 * ```ts
 * import { tagCss } from "@pantoken/components";
 *
 * const css = tagCss();
 * // <span class="instui-tag">Design</span>
 * ```
 *
 * @demo self:tag
 */
export function tagCss(options: ComponentOptions = {}): string {
  const prefix = options.prefix || "";
  return wrap("tag", prefix, tagRules(ns(prefix)));
}

/**
 * Build the avatar stylesheet: `.<prefix>-avatar` with `--rectangle`, size (`--sm`, `--lg`), and
 * color (`--blue`, `--green`, `--red`, `--orange`) modifiers.
 *
 * @param options - {@link ComponentOptions}.
 * @returns The CSS string.
 *
 * @example
 * ```ts
 * import { avatarCss } from "@pantoken/components";
 *
 * const css = avatarCss();
 * // <span class="instui-avatar instui-avatar--lg instui-avatar--blue">AB</span>
 * ```
 *
 * @demo self:avatar
 */
export function avatarCss(options: ComponentOptions = {}): string {
  const prefix = options.prefix || "";
  return wrap("avatar", prefix, avatarRules(ns(prefix)));
}

/**
 * Build the tabs stylesheet: a `.<prefix>-tabs` container scoping `.list`, `.tab` (`-selected`,
 * `-disabled`), and `.panel` elements. The `-variant-secondary` and `-overflow-scroll` modifiers go
 * on the container.
 *
 * @param options - {@link ComponentOptions}.
 * @returns The CSS string.
 *
 * @example
 * ```ts
 * import { tabsCss } from "@pantoken/components";
 *
 * const css = tabsCss();
 * // <div class="instui-tabs">
 * //   <div class="list" role="tablist">
 * //     <button class="tab -selected" role="tab" aria-selected="true">First</button>
 * //     <button class="tab" role="tab">Second</button>
 * //   </div>
 * //   <div class="panel" role="tabpanel">…</div>
 * // </div>
 * ```
 *
 * @demo self:tabs
 */
export function tabsCss(options: ComponentOptions = {}): string {
  const prefix = options.prefix || "";
  return wrap("tabs", prefix, tabsRules(ns(prefix)));
}

/**
 * Build the metric stylesheet: `.<prefix>-metric` scoping `.value` and `.label`, plus
 * `-text-align-{start,center,end}` (InstUI's `textAlign`, applied as `align-items` on the flex column).
 *
 * @param options - {@link ComponentOptions}.
 * @returns The CSS string.
 *
 * @example
 * ```ts
 * import { metricCss } from "@pantoken/components";
 *
 * const css = metricCss();
 * // <div class="instui-metric">
 * //   <span class="value">1,024</span>
 * //   <span class="label">Students</span>
 * // </div>
 * ```
 *
 * @demo self:metric
 */
export function metricCss(options: ComponentOptions = {}): string {
  const prefix = options.prefix || "";
  return wrap("metric", prefix, metricRules(ns(prefix)));
}

/**
 * Build the byline stylesheet: `.<prefix>-byline` scoping `.title` and `.description`.
 *
 * @param options - {@link ComponentOptions}.
 * @returns The CSS string.
 *
 * @example
 * ```ts
 * import { bylineCss } from "@pantoken/components";
 *
 * const css = bylineCss();
 * // <div class="instui-byline">
 * //   <span class="title">Ada Lovelace</span>
 * //   <span class="description">Mathematician</span>
 * // </div>
 * ```
 *
 * @demo self:byline
 */
export function bylineCss(options: ComponentOptions = {}): string {
  const prefix = options.prefix || "";
  return wrap("byline", prefix, bylineRules(ns(prefix)));
}

/**
 * Build the img stylesheet: `.<prefix>-img` — a styled `<img>` with `-display-block`,
 * `-constrain-{cover,contain}`, and `-with-grayscale`/`-with-blur` effects.
 *
 * @param options - {@link ComponentOptions}.
 * @returns The CSS string.
 *
 * @demo self:img
 */
export function imgCss(options: ComponentOptions = {}): string {
  const prefix = options.prefix || "";
  return wrap("img", prefix, imgRules(ns(prefix)));
}

/**
 * Build the table stylesheet: the InstUI table look as `.<prefix>-table` (for tables you build
 * yourself; markdown tables are covered by {@link proseCss}).
 *
 * @param options - {@link ComponentOptions}.
 * @returns The CSS string.
 *
 * @example
 * ```ts
 * import { tableCss } from "@pantoken/components";
 *
 * const css = tableCss();
 * // <table class="instui-table"><thead>…</thead><tbody>…</tbody></table>
 * ```
 *
 * @demo self:table
 */
export function tableCss(options: ComponentOptions = {}): string {
  const prefix = options.prefix || "";
  return wrap("table", prefix, tableRules(ns(prefix)));
}

/**
 * Build the link stylesheet: `.<prefix>-link` with hover and `[aria-disabled]` states.
 *
 * @example
 * ```ts
 * import { linkCss } from "@pantoken/components";
 *
 * const css = linkCss();
 * // <a class="instui-link" href="/docs">Docs</a>
 * ```
 *
 * @demo self:link
 */
export function linkCss(options: ComponentOptions = {}): string {
  const prefix = options.prefix || "";
  return wrap("link", prefix, linkRules(ns(prefix)));
}

/**
 * Build the list stylesheet: `.<prefix>-list` with token-driven item spacing.
 *
 * @example
 * ```ts
 * import { listCss } from "@pantoken/components";
 *
 * const css = listCss();
 * // <ul class="instui-list"><li>One</li><li>Two</li></ul>
 * ```
 *
 * @demo self:list
 */
export function listCss(options: ComponentOptions = {}): string {
  const prefix = options.prefix || "";
  return wrap("list", prefix, listRules(ns(prefix)));
}

/**
 * Build the icon stylesheet: the `::before` painter that renders any glyph class from the icon sheet
 * (`.<prefix>-icon-<name>`, from {@link iconGlyphsCss}) as a masked glyph in `currentColor`, sized to
 * the text. For a full, name-based icon element use `<instui-icon>` from `@pantoken/web-components`.
 *
 * @param options - {@link ComponentOptions}.
 * @returns The CSS string.
 *
 * @example
 * ```ts
 * import { iconCss } from "@pantoken/components";
 *
 * const css = iconCss();
 * // <button class="instui-button">Save <span class="instui-icon-arrow-right"></span></button>
 * ```
 *
 * @demo self:icon
 */
export function iconCss(options: ComponentOptions = {}): string {
  const prefix = options.prefix || "";
  return wrap("icon", prefix, iconRules(ns(prefix)));
}

/**
 * Build the checkbox stylesheet: `.<prefix>-checkbox` (labeled native checkbox), with a `--toggle`
 * modifier that renders the checkbox as a switch.
 *
 * @example Labeled checkbox
 * ```ts
 * import { checkboxCss } from "@pantoken/components";
 *
 * const css = checkboxCss();
 * // <label class="instui-checkbox"><input type="checkbox" /> Remember me</label>
 * ```
 *
 * @example Toggle (switch) variant
 * ```ts
 * import { checkboxCss } from "@pantoken/components";
 *
 * const css = checkboxCss();
 * // <label class="instui-checkbox instui-checkbox--toggle"><input type="checkbox" checked /> Notifications</label>
 * ```
 *
 * @demo self:checkbox
 */
export function checkboxCss(options: ComponentOptions = {}): string {
  const prefix = options.prefix || "";
  return wrap("checkbox", prefix, checkboxRules(ns(prefix)));
}

/**
 * Build the radio stylesheet: `.<prefix>-radio` (labeled native radio), plus the `-variant-toggle`
 * segmented-button form with `-context-{off,success,danger,warning}` and `-size-{sm,lg}`.
 *
 * @example
 * ```ts
 * import { radioCss } from "@pantoken/components";
 *
 * const css = radioCss();
 * // <label class="instui-radio"><input type="radio" name="plan" /> Free</label>
 * // Toggle buttons (variant="toggle"), selected fill picked by -context-*:
 * // <label class="instui-radio -variant-toggle -context-success"><input type="radio" name="size" checked /> Small</label>
 * ```
 *
 * @demo self:radio
 */
export function radioCss(options: ComponentOptions = {}): string {
  const prefix = options.prefix || "";
  return wrap("radio", prefix, radioRules(ns(prefix)));
}

/**
 * Build the spinner stylesheet: `.<prefix>-spinner` (a CSS ring spinner).
 *
 * @example
 * ```ts
 * import { spinnerCss } from "@pantoken/components";
 *
 * const css = spinnerCss();
 * // <span class="instui-spinner" role="status" aria-label="Loading"></span>
 * ```
 *
 * @demo self:spinner
 */
export function spinnerCss(options: ComponentOptions = {}): string {
  const prefix = options.prefix || "";
  return wrap("spinner", prefix, spinnerRules(ns(prefix)));
}

/**
 * Build the progress stylesheet: `.<prefix>-progress` scoping `.bar` (`-color-success`/`-color-danger`).
 *
 * @example
 * ```ts
 * import { progressCss } from "@pantoken/components";
 *
 * const css = progressCss();
 * // <div class="instui-progress">
 * //   <div class="bar -color-success" style="width: 60%"></div>
 * // </div>
 * ```
 *
 * @demo self:progress
 */
export function progressCss(options: ComponentOptions = {}): string {
  const prefix = options.prefix || "";
  return wrap("progress", prefix, progressRules(ns(prefix)));
}

/**
 * Build the menu stylesheet: `.<prefix>-menu` scoping `.item` and `.separator`.
 *
 * @example
 * ```ts
 * import { menuCss } from "@pantoken/components";
 *
 * const css = menuCss();
 * // <ul class="instui-menu">
 * //   <li class="item">Edit</li>
 * //   <li class="separator"></li>
 * // </ul>
 * ```
 *
 * @demo self:menu
 */
export function menuCss(options: ComponentOptions = {}): string {
  const prefix = options.prefix || "";
  return wrap("menu", prefix, menuRules(ns(prefix)));
}

/**
 * Build the modal stylesheet: `.<prefix>-modal` scoping `.header`, `.body`, `.footer`.
 *
 * @example
 * ```ts
 * import { modalCss } from "@pantoken/components";
 *
 * const css = modalCss();
 * // <div class="instui-modal">
 * //   <div class="header">Title</div>
 * //   <div class="body">…</div>
 * //   <div class="footer">…</div>
 * // </div>
 * ```
 *
 * @demo self:modal
 */
export function modalCss(options: ComponentOptions = {}): string {
  const prefix = options.prefix || "";
  return wrap("modal", prefix, modalRules(ns(prefix)));
}

/**
 * Build the breadcrumb stylesheet: `.<prefix>-breadcrumb` scoping `.item` separators.
 *
 * @example
 * ```ts
 * import { breadcrumbCss } from "@pantoken/components";
 *
 * const css = breadcrumbCss();
 * // <nav class="instui-breadcrumb">
 * //   <a class="item" href="/">Home</a>
 * //   <span class="item">Docs</span>
 * // </nav>
 * ```
 *
 * @demo self:breadcrumb
 */
export function breadcrumbCss(options: ComponentOptions = {}): string {
  const prefix = options.prefix || "";
  return wrap("breadcrumb", prefix, breadcrumbRules(ns(prefix)));
}

/**
 * Build the billboard stylesheet: `.<prefix>-billboard` scoping `.message`.
 *
 * @example
 * ```ts
 * import { billboardCss } from "@pantoken/components";
 *
 * const css = billboardCss();
 * // <div class="instui-billboard">
 * //   <p class="message">Nothing here yet</p>
 * // </div>
 * ```
 *
 * @demo self:billboard
 */
export function billboardCss(options: ComponentOptions = {}): string {
  const prefix = options.prefix || "";
  return wrap("billboard", prefix, billboardRules(ns(prefix)));
}

/**
 * Build the rating stylesheet: `.<prefix>-rating` scoping `.star` (`-filled`).
 *
 * @example
 * ```ts
 * import { ratingCss } from "@pantoken/components";
 *
 * const css = ratingCss();
 * // <div class="instui-rating">
 * //   <span class="star -filled"></span>
 * //   <span class="star"></span>
 * // </div>
 * ```
 *
 * @demo self:rating
 */
export function ratingCss(options: ComponentOptions = {}): string {
  const prefix = options.prefix || "";
  return wrap("rating", prefix, ratingRules(ns(prefix)));
}

/**
 * Build the toggle-group stylesheet: `.<prefix>-toggle-group` joining `.<prefix>-button` children.
 *
 * @example
 * ```ts
 * import { toggleGroupCss } from "@pantoken/components";
 *
 * const css = toggleGroupCss();
 * // <div class="instui-toggle-group">
 * //   <button class="instui-button" aria-pressed="true">Day</button>
 * //   <button class="instui-button" aria-pressed="false">Week</button>
 * // </div>
 * ```
 *
 * @demo self:toggle-group
 */
export function toggleGroupCss(options: ComponentOptions = {}): string {
  const prefix = options.prefix || "";
  return wrap("toggle-group", prefix, toggleGroupRules(ns(prefix)));
}

/**
 * Build the context-view stylesheet: `.<prefix>-context-view` (callout with a caret).
 *
 * @example
 * ```ts
 * import { contextViewCss } from "@pantoken/components";
 *
 * const css = contextViewCss();
 * // <div class="instui-context-view">Helpful hint</div>
 * ```
 *
 * @demo self:context-view
 */
export function contextViewCss(options: ComponentOptions = {}): string {
  const prefix = options.prefix || "";
  return wrap("context-view", prefix, contextViewRules(ns(prefix)));
}

/**
 * Build the progress-circle stylesheet: `.<prefix>-progress-circle` (set `--value` 0–100).
 *
 * @example
 * ```ts
 * import { progressCircleCss } from "@pantoken/components";
 *
 * const css = progressCircleCss();
 * // <div class="instui-progress-circle" style="--value: 75"></div>
 * ```
 *
 * @demo self:progress-circle
 */
export function progressCircleCss(options: ComponentOptions = {}): string {
  const prefix = options.prefix || "";
  return wrap("progress-circle", prefix, progressCircleRules(ns(prefix)));
}

/**
 * Build the pagination stylesheet: `.<prefix>-pagination` scoping `.page` (with `[aria-current]`).
 *
 * @example
 * ```ts
 * import { paginationCss } from "@pantoken/components";
 *
 * const css = paginationCss();
 * // <nav class="instui-pagination">
 * //   <a class="page" aria-current="page">1</a>
 * //   <a class="page">2</a>
 * // </nav>
 * ```
 *
 * @demo self:pagination
 */
export function paginationCss(options: ComponentOptions = {}): string {
  const prefix = options.prefix || "";
  return wrap("pagination", prefix, paginationRules(ns(prefix)));
}

/**
 * Build the truncate stylesheet: `.<prefix>-truncate` (single line) + `--lines` (multi-line clamp).
 *
 * @example Single-line ellipsis
 * ```ts
 * import { truncateCss } from "@pantoken/components";
 *
 * const css = truncateCss();
 * // <span class="instui-truncate">A very long single line…</span>
 * ```
 *
 * @example Multi-line clamp
 * ```ts
 * import { truncateCss } from "@pantoken/components";
 *
 * const css = truncateCss();
 * // <p class="instui-truncate instui-truncate--lines" style="--lines: 3">…</p>
 * ```
 *
 * @demo self:truncate
 */
export function truncateCss(options: ComponentOptions = {}): string {
  const prefix = options.prefix || "";
  return wrap("truncate", prefix, truncateRules(ns(prefix)));
}

/**
 * Build the toggle-details stylesheet: `.<prefix>-toggle-details` (a styled `<details>`).
 *
 * @example
 * ```ts
 * import { toggleDetailsCss } from "@pantoken/components";
 *
 * const css = toggleDetailsCss();
 * // <details class="instui-toggle-details">
 * //   <summary>More info</summary>
 * //   <p>Details…</p>
 * // </details>
 * ```
 *
 * @demo self:toggle-details
 */
export function toggleDetailsCss(options: ComponentOptions = {}): string {
  const prefix = options.prefix || "";
  return wrap("toggle-details", prefix, toggleDetailsRules(ns(prefix)));
}

/**
 * Build the file-drop stylesheet: `.<prefix>-file-drop` with `--hover`/`--accepted`/`--rejected`.
 *
 * @example
 * ```ts
 * import { fileDropCss } from "@pantoken/components";
 *
 * const css = fileDropCss();
 * // <div class="instui-file-drop instui-file-drop--hover">Drop files here</div>
 * ```
 *
 * @demo self:file-drop
 */
export function fileDropCss(options: ComponentOptions = {}): string {
  const prefix = options.prefix || "";
  return wrap("file-drop", prefix, fileDropRules(ns(prefix)));
}

/**
 * Build the side-nav-bar stylesheet: `.<prefix>-side-nav-bar` — a vertical rail of icon-over-label
 * `.item`s, with `-selected` and a `-minimized` (icons-only) mode.
 * @demo self:side-nav-bar
 */
export function sideNavBarCss(options: ComponentOptions = {}): string {
  const prefix = options.prefix || "";
  return wrap("side-nav-bar", prefix, sideNavBarRules(ns(prefix)));
}

/**
 * Build the tree-browser stylesheet: `.<prefix>-tree-browser` — a disclosure tree of nested `<details>`
 * collections and `.item` leaves, with `-size-{sm,lg}`.
 * @demo self:tree-browser
 */
export function treeBrowserCss(options: ComponentOptions = {}): string {
  const prefix = options.prefix || "";
  return wrap("tree-browser", prefix, treeBrowserRules(ns(prefix)));
}

/**
 * Build the calendar stylesheet: `.<prefix>-calendar` — a static month grid (`.nav`, `.grid`,
 * `.weekday`, `.day` with `-today`/`-selected`/`-outside-month`). Dates + navigation are the consumer's.
 * @demo self:calendar
 */
export function calendarCss(options: ComponentOptions = {}): string {
  const prefix = options.prefix || "";
  return wrap("calendar", prefix, calendarRules(ns(prefix)));
}

/**
 * Build the popover stylesheet: `.<prefix>-popover` — an elevated surface for a native `[popover]`.
 * @demo self:popover
 */
export function popoverCss(options: ComponentOptions = {}): string {
  const prefix = options.prefix || "";
  return wrap("popover", prefix, popoverRules(ns(prefix)));
}

/**
 * Build the tray stylesheet: `.<prefix>-tray` — an edge-pinned panel with `-placement-*` and `-size-*`.
 * @demo self:tray
 */
export function trayCss(options: ComponentOptions = {}): string {
  const prefix = options.prefix || "";
  return wrap("tray", prefix, trayRules(ns(prefix)));
}

/**
 * Build the tooltip stylesheet: `.<prefix>-tooltip` — a CSS hover/focus bubble (`.tip`) with
 * `-placement-*`. The web-component tier adds delay, Esc-dismiss, and `aria-describedby` wiring.
 * @demo self:tooltip
 */
export function tooltipCss(options: ComponentOptions = {}): string {
  const prefix = options.prefix || "";
  return wrap("tooltip", prefix, tooltipRules(ns(prefix)));
}

/**
 * Build the RangeInput stylesheet: `.<prefix>-range-input` (a styled `input[type="range"]`) plus the
 * `.<prefix>-range-input-value` inverse bubble. Sizes `-size-{sm,lg}` on the value.
 *
 * @example
 * ```ts
 * import { rangeInputCss } from "@pantoken/components";
 *
 * const css = rangeInputCss();
 * // <input type="range" class="instui-range-input" min="0" max="100" value="50" />
 * // <span class="instui-range-input-value">50</span>
 * ```
 *
 * @demo self:range-input
 */
export function rangeInputCss(options: ComponentOptions = {}): string {
  const prefix = options.prefix || "";
  return wrap("range-input", prefix, rangeInputRules(ns(prefix)));
}

/** Mask rules: a translucent overlay that covers its positioned parent, plus fullscreen and blur. */
function maskRules(p: string): string {
  return `
/**
 * @utility mask
 * @summary An in-flow overlay that fills its positioned parent and centres its content — e.g. a spinner over a card. For a modal, prefer a native \`<dialog>\` (its \`::backdrop\` is the mask).
 * @example
 * <div style="position: relative">
 *   <div class="instui-mask">
 *     <span class="instui-spinner"></span>
 *   </div>
 * </div>
 */
/* An in-flow overlay for non-modal cases (e.g. a spinner over a card). For a modal, prefer a native
   <dialog>: its ::backdrop is the mask and reuses the same \`--instui-component-mask-background-color\`
   token (see modalRules). */
.${p}mask {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--instui-component-mask-background-color);
}
.${p}mask.-fullscreen { position: fixed; z-index: 999; }
.${p}mask.-blur { backdrop-filter: blur(0.5rem); }
`;
}

/**
 * Build the mask stylesheet: `.<prefix>-mask` (an overlay that dims its parent), plus `--fullscreen`
 * (fixed, viewport-covering) and `--blur`.
 *
 * @example
 * ```ts
 * import { maskCss } from "@pantoken/components";
 *
 * const css = maskCss();
 * // <div class="instui-mask"><span class="instui-spinner"></span></div>
 * ```
 *
 * @demo self:mask
 */
export function maskCss(options: ComponentOptions = {}): string {
  const prefix = options.prefix || "";
  return wrap("mask", prefix, maskRules(ns(prefix)));
}

/** ScreenReaderContent rules: visually hidden, but still read by assistive tech. */
function screenReaderContentRules(p: string): string {
  return `
/**
 * @utility screen-reader-content
 * @summary Visually hides content while keeping it available to assistive tech (the standard clip pattern).
 * @example <span class="instui-screen-reader-content">Opens in a new window</span>
 */
.${p}screen-reader-content {
  position: absolute;
  inline-size: 1px;
  block-size: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
}
`;
}

/**
 * Build the screen-reader-content stylesheet: `.<prefix>-screen-reader-content` hides an element
 * visually while keeping it in the accessibility tree.
 *
 * @example
 * ```ts
 * import { screenReaderContentCss } from "@pantoken/components";
 *
 * const css = screenReaderContentCss();
 * // <span class="instui-screen-reader-content">Loading…</span>
 * ```
 *
 * @demo self:screen-reader-content
 */
export function screenReaderContentCss(options: ComponentOptions = {}): string {
  const prefix = options.prefix || "";
  return wrap("screen-reader-content", prefix, screenReaderContentRules(ns(prefix)));
}

/**
 * Heading rules: InstUI's Heading as a class. Base is level h1; `--h1`…`--h6` set the level scale,
 * `--title-page`/`--title-section`/`--title-card-*`/`--label` the named type variants, plus colour
 * (`--secondary`, `--inverse`, `--ai`) and `--border-top`/`--border-bottom`.
 */
function headingRules(p: string): string {
  return `
/**
 * @component heading
 * @summary Heading typography from \`-level-h1\` to \`-level-h6\`.
 * @example
 * <div class="instui-heading -level-h1">Heading h1</div>
 * @modifier -level-h1 — Render at the h1 type scale.
 * @modifier -level-h2 — Render at the h2 type scale.
 * @modifier -level-h3 — Render at the h3 type scale.
 * @modifier -level-h4 — Render at the h4 type scale.
 * @modifier -level-h5 — Render at the h5 type scale.
 * @modifier -level-h6 — Render at the h6 type scale.
 * @modifier -color-secondary — Secondary (muted) colour.
 * @modifier -color-ai — AI-accent colour.
 * @modifier -color-primary-inverse — On-dark (primary inverse) colour.
 * @modifier -border-top — Add a top rule.
 * @modifier -border-bottom — Add a bottom rule.
 * @modifier -variant-label — Label type preset.
 * @modifier -variant-title-page — Page-title preset.
 * @modifier -variant-title-section — Section-title preset.
 * @modifier -variant-title-card-mini — Mini card-title preset.
 * @modifier -variant-title-card-regular — Regular card-title preset.
 * @modifier -variant-title-card-section — Card section-title preset.
 */
.${p}heading {
  display: block;
  margin: 0;
  font-family: var(--instui-component-heading-h1-font-family);
  color: var(--instui-component-heading-base-color);
  line-height: var(--instui-component-heading-line-height);
  font-size: var(--instui-component-heading-h1-font-size);
  font-weight: var(--instui-component-heading-h1-font-weight);
}
${headingLevelRules((l) => `.${p}heading.-level-${l}`)}
.${p}heading.-variant-title-page { font-size: var(--instui-component-heading-title-page-desktop-font-size); font-weight: var(--instui-component-heading-title-page-desktop-font-weight); }
.${p}heading.-variant-title-section { font-size: var(--instui-component-heading-title-section-font-size); font-weight: var(--instui-component-heading-title-section-font-weight); }
.${p}heading.-variant-title-card-section { font-size: var(--instui-component-heading-title-card-section-font-size); font-weight: var(--instui-component-heading-title-card-section-font-weight); }
.${p}heading.-variant-title-card-regular { font-size: var(--instui-component-heading-title-card-regular-font-size); font-weight: var(--instui-component-heading-title-card-regular-font-weight); }
.${p}heading.-variant-title-card-mini { font-size: var(--instui-component-heading-title-card-mini-font-size); font-weight: var(--instui-component-heading-title-card-mini-font-weight); }
.${p}heading.-variant-label { font-size: var(--instui-component-heading-label-font-size); font-weight: var(--instui-component-heading-label-font-weight); }
.${p}heading.-color-secondary { color: var(--instui-component-heading-muted-color); }
.${p}heading.-color-primary-inverse { color: var(--instui-component-heading-inverse-color); }
.${p}heading.-color-ai {
  background: linear-gradient(to bottom, var(--instui-component-heading-ai-text-top-gradient-color) 0%, var(--instui-component-heading-ai-text-bottom-gradient-color) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}
.${p}heading.-border-bottom {
  border-bottom: var(--instui-component-heading-border-width) solid var(--instui-component-heading-border-color);
  padding-bottom: var(--instui-component-heading-border-padding);
}
.${p}heading.-border-top {
  border-top: var(--instui-component-heading-border-width) solid var(--instui-component-heading-border-color);
  padding-top: var(--instui-component-heading-border-padding);
}
`;
}

/**
 * Build the heading stylesheet: `.<prefix>-heading` and its level/variant/colour modifiers.
 *
 * @example
 * ```ts
 * import { headingCss } from "@pantoken/components";
 *
 * const css = headingCss();
 * // <h2 class="instui-heading -variant-title-section">Section</h2>
 * ```
 *
 * @demo self:heading
 */
export function headingCss(options: ComponentOptions = {}): string {
  const prefix = options.prefix || "";
  return wrap("heading", prefix, headingRules(ns(prefix)));
}

/**
 * Text rules: InstUI's Text as a class. Base is the `medium` body size; add size (`--x-small`…
 * `--x-large`), `--bold`/`--italic`, colour (`--secondary`, `--brand`, `--success`, `--danger`,
 * `--warning`, `--inverse`, `--ai`), or a type variant (`--description-page`, `--content-small`,
 * `--legend`).
 */
function textRules(p: string): string {
  // Modifiers are dash-prefixed compound classes (`.instui-text.-small`): terse to author
  // (`<span class="instui-text -small -secondary">`), collision-safe (always compound with the base,
  // and `.-small` is rare in the wild), and — treeshakeable via PostCSS.
  const mod = (token: string, decls: string): string => `.${p}text.-${token} { ${decls} }`;
  return `
/**
 * @component text
 * @summary Body-text typography with size, weight, colour, and style modifiers.
 * @example
 * <span class="instui-text -size-xs">x-small text</span>
 * @modifier -color-brand — Brand text colour.
 * @modifier -color-secondary — Secondary (muted) text colour.
 * @modifier -color-ai — AI-accent text colour.
 * @modifier -color-success — Success text colour.
 * @modifier -color-warning — Warning text colour.
 * @modifier -color-danger — Danger text colour.
 * @modifier -color-primary-inverse — On-dark (primary inverse) text colour.
 * @modifier -weight-bold — Bold weight.
 * @modifier -style-italic — Italic.
 * @modifier -transform-uppercase — Uppercase the text.
 * @modifier -transform-lowercase — Lowercase the text.
 * @modifier -transform-capitalize — Capitalise each word.
 * @modifier -variant-content-small — Small-content type preset.
 * @modifier -variant-description-page — Page-description type preset.
 * @modifier -variant-description-section — Section-description type preset.
 * @modifier -variant-legend — Legend type preset.
 * @modifier -size-xs — Extra small.
 * @modifier -size-sm — Small.
 * @modifier -size-lg — Large.
 * @modifier -size-xl — Extra large.
 */
.${p}text {
  font-family: var(--instui-component-text-content-font-family);
  color: var(--instui-component-text-base-color);
  font-size: var(--instui-component-text-font-size-medium);
  font-weight: var(--instui-component-text-font-weight-normal);
  line-height: var(--instui-component-text-content-line-height);
}
${mod("size-xs", "font-size: var(--instui-component-text-font-size-x-small);")}
${mod("size-sm", "font-size: var(--instui-component-text-font-size-small);")}
${mod("size-lg", "font-size: var(--instui-component-text-font-size-large);")}
${mod("size-xl", "font-size: var(--instui-component-text-font-size-x-large);")}
${mod("weight-bold", "font-weight: var(--instui-component-text-font-weight-bold);")}
${mod("style-italic", "font-style: italic;")}
${mod("color-secondary", "color: var(--instui-component-text-muted-color);")}
${mod("color-brand", "color: var(--instui-component-text-primary-color);")}
${mod("color-success", "color: var(--instui-component-text-success-color);")}
${mod("color-danger", "color: var(--instui-component-text-error-color);")}
${mod("color-warning", "color: var(--instui-component-text-warning-color);")}
${mod("color-primary-inverse", "color: var(--instui-component-text-inverse-color);")}
${mod("color-ai", "color: var(--instui-component-text-ai-color); background: var(--instui-component-text-ai-background-color);")}
${mod("variant-description-page", "font-size: var(--instui-component-text-description-page-font-size); line-height: var(--instui-component-text-description-page-line-height);")}
${mod("variant-description-section", "font-size: var(--instui-component-text-description-section-font-size); line-height: var(--instui-component-text-description-section-line-height);")}
${mod("variant-content-small", "font-size: var(--instui-component-text-content-small-font-size); line-height: var(--instui-component-text-content-small-line-height);")}
${mod("variant-legend", "font-size: var(--instui-component-text-legend-font-size); line-height: var(--instui-component-text-legend-line-height);")}
${mod("transform-uppercase", "text-transform: uppercase;")}
${mod("transform-lowercase", "text-transform: lowercase;")}
${mod("transform-capitalize", "text-transform: capitalize;")}
`;
}

/**
 * Build the text stylesheet: `.<prefix>-text` and its dash-prefixed compound modifiers
 * (`.<prefix>-text.-small`), so you author `<span class="instui-text -small -secondary">`.
 *
 * @example
 * ```ts
 * import { textCss } from "@pantoken/components";
 *
 * const css = textCss();
 * // <span class="instui-text -size-sm -color-secondary">Caption</span>
 * ```
 *
 * @demo self:text
 */
export function textCss(options: ComponentOptions = {}): string {
  const prefix = options.prefix || "";
  return wrap("text", prefix, textRules(ns(prefix)));
}

/**
 * CloseButton rules: InstUI's CloseButton — a transparent, borderless icon button with an auto "×"
 * glyph. Base is medium/secondary; `--sm`/`--lg` size it and `--inverse` recolours it white for a
 * dark surface.
 */
function closeButtonRules(p: string): string {
  return `
/**
 * @component close-button
 * @summary A transparent icon button that draws its own × glyph, in three sizes plus an inverse variant.
 * @example
 * <button class="instui-close-button -size-sm" aria-label="Close"></button>
 * @modifier -color-inverse — For dark backgrounds.
 * @modifier -size-sm — Small.
 * @modifier -size-lg — Large.
 */
.${p}close-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1;
  min-height: var(--instui-component-base-button-medium-height);
  padding: var(--instui-spacing-space-xs);
  border: 0;
  background: transparent;
  border-radius: var(--instui-component-base-button-border-radius);
  color: var(--instui-color-text-interactive-action-secondary-base);
  cursor: pointer;
}
.${p}close-button::before {
  content: "";
  inline-size: 1em;
  block-size: 1em;
  background: currentColor;
  -webkit-mask: ${CLOSE_ICON};
  mask: ${CLOSE_ICON};
}
.${p}close-button:hover { background: var(--instui-color-background-interactive-action-tertiary-hover); }
.${p}close-button:active { background: var(--instui-color-background-interactive-action-tertiary-active); }
.${p}close-button.-size-sm { min-height: var(--instui-component-base-button-small-height); }
.${p}close-button.-size-lg { min-height: var(--instui-component-base-button-large-height); }
.${p}close-button.-color-inverse { color: var(--instui-component-base-button-primary-inverse-ghost-color); }
`;
}

/**
 * Build the close-button stylesheet: `.<prefix>-close-button` (a transparent icon button with a "×").
 *
 * @example
 * ```ts
 * import { closeButtonCss } from "@pantoken/components";
 *
 * const css = closeButtonCss();
 * // <button class="instui-close-button" aria-label="Close"></button>
 * ```
 *
 * @demo self:close-button
 */
export function closeButtonCss(options: ComponentOptions = {}): string {
  const prefix = options.prefix || "";
  return wrap("close-button", prefix, closeButtonRules(ns(prefix)));
}

// ─── Forms ──────────────────────────────────────────────────────────────────
// FormField (layout wrapper) + FormFieldGroup + FormFieldMessages/Message, and the styled text controls
// TextInput / TextArea / SimpleSelect. TextInput and SimpleSelect share the `text-input-*` token family;
// TextArea has its own parallel `text-area-*` family — so the base control declarations come from one
// shared helper parameterised by the token family.

/**
 * The shared text-control base: box/typography/background/border + hover/disabled/readonly/invalid/
 * success states, painted from a `--instui-component-<fam>-*` family (TextInput and SimpleSelect pass
 * `text-input`; TextArea passes `text-area`). Uses `background-color` (longhand, not the `background`
 * shorthand) so SimpleSelect's caret `background-image` survives the hover/state rules.
 */
function fieldControlBase(p: string, cls: string, fam: string): string {
  const t = (s: string): string => `var(--instui-component-${fam}-${s})`;
  const root = `.${p}${cls}`;
  return `
${root} {
  display: block;
  inline-size: 100%;
  box-sizing: border-box;
  font-family: ${t("font-family")};
  font-weight: ${t("font-weight")};
  color: ${t("text-color")};
  background-color: ${t("background-color")};
  border: ${t("border-width")} solid ${t("border-color")};
  border-radius: ${t("border-radius")};
}
${root}::placeholder { color: ${t("placeholder-color")}; }
${root}:hover {
  background-color: ${t("background-hover-color")};
  border-color: ${t("border-hover-color")};
}
${root}:hover::placeholder { color: ${t("placeholder-hover-color")}; }
${root}:disabled,
${root}.-disabled {
  background-color: ${t("background-disabled-color")};
  border-color: ${t("border-disabled-color")};
  color: ${t("text-disabled-color")};
  cursor: not-allowed;
}
${root}.-readonly {
  background-color: ${t("background-readonly-color")};
  border-color: ${t("border-readonly-color")};
  color: ${t("text-readonly-color")};
}
${root}.-invalid { border-color: ${t("error-border-color")}; }
${root}.-success { border-color: ${t("success-border-color")}; }
/* Focus ring tracks the validity: danger when explicitly -invalid OR natively :user-invalid (after the
   user has interacted), success on -success — overriding base.css's info-blue ring for focusables. */
${root}:is(.-invalid, :user-invalid):focus-visible { outline-color: var(--instui-focus-outline-color-danger); }
${root}.-success:focus-visible { outline-color: var(--instui-focus-outline-color-success); }
`;
}

/** TextInput rules: a native `<input>` styled from the `text-input-*` family, with `-size-{sm,md,lg}`. */
function textInputRules(p: string): string {
  const t = (s: string): string => `var(--instui-component-text-input-${s})`;
  return `
/**
 * @component text-input
 * @summary A styled native \`<input>\` — including \`date\`, \`time\`, and \`datetime-local\`, where the browser supplies the picker — with validation states and sizes.
 * @example
 * <input class="instui-text-input" placeholder="Default">
 * @modifier -disabled — Disabled state.
 * @modifier -invalid — Invalid (error) state.
 * @modifier -readonly — Read-only state.
 * @modifier -success — Success (valid) state.
 * @modifier -size-sm — Small.
 * @modifier -size-lg — Large.
 */
${fieldControlBase(p, "text-input", "text-input")}
.${p}text-input {
  block-size: ${t("height-md")};
  padding-inline: ${t("padding-horizontal-md")};
  font-size: ${t("font-size-md")};
}
.${p}text-input.-size-sm { block-size: ${t("height-sm")}; padding-inline: ${t("padding-horizontal-sm")}; font-size: ${t("font-size-sm")}; }
.${p}text-input.-size-lg { block-size: ${t("height-lg")}; padding-inline: ${t("padding-horizontal-lg")}; font-size: ${t("font-size-lg")}; }
`;
}

/** TextArea rules: a native `<textarea>` from the `text-area-*` family — resizable, min-height, sizes. */
function textAreaRules(p: string): string {
  const t = (s: string): string => `var(--instui-component-text-area-${s})`;
  return `
/**
 * @component text-area
 * @summary A styled, resizable native \`<textarea>\` with the same states and sizes as the text input.
 * @example
 * <textarea class="instui-text-area" placeholder="Write a comment…"></textarea>
 * @modifier -disabled — Disabled state.
 * @modifier -invalid — Invalid (error) state.
 * @modifier -readonly — Read-only state.
 * @modifier -success — Success (valid) state.
 * @modifier -size-sm — Small.
 * @modifier -size-lg — Large.
 */
${fieldControlBase(p, "text-area", "text-area")}
.${p}text-area {
  padding: ${t("padding")};
  font-size: ${t("font-size-md")};
  line-height: 1.5;
  min-block-size: 4rem;
  resize: vertical;
}
.${p}text-area.-size-sm { font-size: ${t("font-size-sm")}; }
.${p}text-area.-size-lg { font-size: ${t("font-size-lg")}; }
`;
}

/** SimpleSelect rules: a native `<select>` styled like TextInput (`text-input-*`) with a caret. */
function simpleSelectRules(p: string): string {
  const t = (s: string): string => `var(--instui-component-text-input-${s})`;
  return `
/**
 * @component simple-select
 * @summary A styled native \`<select>\` with a caret, matching the text-input states and sizes.
 * @example
 * <select class="instui-simple-select">
 *   <option>Choose a fruit…</option>
 *   <option>Apple</option>
 *   <option>Orange</option>
 *   <option>Pear</option>
 * </select>
 * @structure
 * .instui-simple-select
 *   option
 * @modifier -disabled — Disabled state.
 * @modifier -invalid — Invalid (error) state.
 * @modifier -readonly — Read-only state.
 * @modifier -success — Success (valid) state.
 * @modifier -size-sm — Small.
 * @modifier -size-lg — Large.
 */
${fieldControlBase(p, "simple-select", "text-input")}
.${p}simple-select {
  block-size: ${t("height-md")};
  padding-inline: ${t("padding-horizontal-md")};
  padding-inline-end: calc(${t("padding-horizontal-md")} + 1.5rem);
  font-size: ${t("font-size-md")};
  appearance: none;
  -webkit-appearance: none;
  background-image: ${SELECT_CHEVRON};
  background-repeat: no-repeat;
  background-position: right ${t("padding-horizontal-md")} center;
  background-size: 1em;
}
.${p}simple-select.-size-sm { block-size: ${t("height-sm")}; padding-inline: ${t("padding-horizontal-sm")}; padding-inline-end: calc(${t("padding-horizontal-sm")} + 1.5rem); font-size: ${t("font-size-sm")}; }
.${p}simple-select.-size-lg { block-size: ${t("height-lg")}; padding-inline: ${t("padding-horizontal-lg")}; padding-inline-end: calc(${t("padding-horizontal-lg")} + 1.5rem); font-size: ${t("font-size-lg")}; }
`;
}

/**
 * The wrapped-input facade shared by InputGroup and NumberInput: a flex row that carries the text-input
 * chrome (border/bg/radius/height/states/sizes from `text-input-*`) so icon/arrow content can sit INSIDE
 * the field beside the input. The real `<input>` inside sheds its own border/bg/padding; the facade shows
 * the focus ring (via `:has(:focus-visible)`) since the input is chromeless. `cls` is the root class.
 */
function inputFacadeBase(p: string, cls: string): string {
  const t = (s: string): string => `var(--instui-component-text-input-${s})`;
  const root = `.${p}${cls}`;
  return `
${root} {
  display: flex;
  align-items: center;
  inline-size: 100%;
  box-sizing: border-box;
  block-size: ${t("height-md")};
  padding-inline: ${t("padding-horizontal-md")};
  gap: ${t("gap-content")};
  background-color: ${t("background-color")};
  border: ${t("border-width")} solid ${t("border-color")};
  border-radius: ${t("border-radius")};
  color: ${t("text-color")};
  font-family: ${t("font-family")};
  font-size: ${t("font-size-md")};
}
${root}:hover { background-color: ${t("background-hover-color")}; border-color: ${t("border-hover-color")}; }
/* The inner control is chromeless — the facade provides border/bg/ring. */
${root} > input,
${root} .${p}text-input {
  flex: 1;
  min-inline-size: 0;
  border: 0;
  padding: 0;
  background: transparent;
  block-size: auto;
  font: inherit;
  color: inherit;
  outline: none;
}
${root} > input::placeholder { color: ${t("placeholder-color")}; }
/* Leading/trailing content slots (icons ride the -icon-* glyph painter). */
${root} .before,
${root} .after { display: inline-flex; align-items: center; flex: none; color: ${t("text-color")}; }
${root}.-disabled,
${root}:has(> input:disabled) {
  background-color: ${t("background-disabled-color")};
  border-color: ${t("border-disabled-color")};
  color: ${t("text-disabled-color")};
  cursor: not-allowed;
}
${root}.-readonly {
  background-color: ${t("background-readonly-color")};
  border-color: ${t("border-readonly-color")};
  color: ${t("text-readonly-color")};
}
${root}.-invalid { border-color: ${t("error-border-color")}; }
${root}.-success { border-color: ${t("success-border-color")}; }
/* Focus ring lives on the facade (the input has no chrome). */
${root}:has(:focus-visible) {
  outline: var(--instui-focus-outline-width) var(--instui-focus-outline-style) var(--instui-focus-outline-color);
  outline-offset: var(--instui-focus-outline-offset);
  border-radius: var(--instui-focus-outline-radius);
}
${root}:is(.-invalid, :has(> input:user-invalid)):has(:focus-visible) { outline-color: var(--instui-focus-outline-color-danger); }
${root}.-success:has(:focus-visible) { outline-color: var(--instui-focus-outline-color-success); }
${root}.-size-sm { block-size: ${t("height-sm")}; padding-inline: ${t("padding-horizontal-sm")}; font-size: ${t("font-size-sm")}; }
${root}.-size-lg { block-size: ${t("height-lg")}; padding-inline: ${t("padding-horizontal-lg")}; font-size: ${t("font-size-lg")}; }
`;
}

/** InputGroup: the facade around a TextInput with `.before`/`.after` icon slots + `-should-not-wrap`. */
function inputGroupRules(p: string): string {
  return `
/**
 * @component input-group
 * @summary A facade around a text input with leading and trailing icon slots.
 * @modifier -disabled — Disabled state.
 * @modifier -invalid — Invalid (error) state.
 * @modifier -readonly — Read-only state.
 * @modifier -success — Success (valid) state.
 * @modifier -size-sm — Small.
 * @modifier -size-lg — Large.
 * @modifier -should-not-wrap — Keep the group on one line (no wrapping).
 */
${inputFacadeBase(p, "input-group")}
.${p}input-group.-should-not-wrap { flex-wrap: nowrap; }
`;
}

/** NumberInput: the facade + a trailing +/- arrow column styled from the `text-input-arrows-*` tokens. */
function numberInputRules(p: string): string {
  const t = (s: string): string => `var(--instui-component-text-input-${s})`;
  const a = (s: string): string => `var(--instui-component-text-input-arrows-${s})`;
  const root = `.${p}number-input`;
  return `
/**
 * @component number-input
 * @summary A number-input facade with a +/- spinner column.
 * @example
 * <span class="instui-number-input">
 *   <input id="qty" type="number" value="1" aria-label="Quantity">
 *   <span class="arrows">
 *     <button type="button" id="up" aria-hidden="true"></button>
 *     <button class="down" type="button" id="down" aria-hidden="true"></button>
 *   </span>
 * </span>
 * @structure
 * .instui-number-input
 *   input
 *   .arrows
 *     button
 *     .down
 * @modifier -disabled — Disabled state.
 * @modifier -invalid — Invalid (error) state.
 * @modifier -readonly — Read-only state.
 * @modifier -success — Success (valid) state.
 * @modifier -size-sm — Small.
 * @modifier -size-lg — Large.
 */
${inputFacadeBase(p, "number-input")}
/* the arrow column sits flush at the inline-end; drop the facade's end padding, and clip the column to
   the facade's radius so it doesn't overhang the rounded corners (Firefox especially). The focus ring
   is an outline, so overflow:hidden doesn't clip it. */
${root} { padding-inline-end: 0; overflow: hidden; }
/* native UA spinners off — we supply our own */
${root} > input::-webkit-outer-spin-button,
${root} > input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
${root} > input[type="number"] { -moz-appearance: textfield; appearance: textfield; }
${root} .arrows {
  display: flex;
  flex-direction: column;
  flex: none;
  align-self: stretch;
  /* the arrows-container-width token is @property-only (value-less upstream), so a literal is used */
  inline-size: 1.5rem;
  border-inline-start: ${t("border-width")} solid ${t("border-color")};
}
${root} .arrows button {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 0;
  background: ${a("background-color")};
  color: var(--instui-color-icon-interactive-action-secondary-base);
  cursor: pointer;
}
${root} .arrows button + button { border-block-start: ${t("border-width")} solid ${t("border-color")}; }
${root} .arrows button:hover { background: ${a("background-hover-color")}; }
${root} .arrows button:active { background: ${a("background-active-color")}; }
${root} .arrows button:disabled { background: ${a("background-disabled-color")}; cursor: not-allowed; }
${root} .arrows button::before {
  content: "";
  inline-size: 0.875em;
  block-size: 0.875em;
  background: currentColor;
  -webkit-mask: ${CHEVRON_UP_ICON};
  mask: ${CHEVRON_UP_ICON};
}
${root} .arrows button.down::before { -webkit-mask: ${CHEVRON_DOWN_ICON}; mask: ${CHEVRON_DOWN_ICON}; }
`;
}

/**
 * InPlaceEdit: a native `[contenteditable]` that reads as plain text until focused, then shows text-input
 * chrome — the pure-CSS "simple" InstUI InPlaceEdit. Hover hints it's editable; focus gives it the input
 * border/background + focus ring. `-readonly` drops the affordance. The full view→edit toggle with
 * confirm/cancel buttons is stateful and lives in the web-component tier.
 */
function inPlaceEditRules(p: string): string {
  const root = `.${p}in-place-edit`;
  const t = (s: string): string => `var(--instui-component-text-input-${s})`;
  return `
/**
 * @component in-place-edit
 * @summary A [contenteditable] that reads as text until focused, then shows input chrome.
 * @example
 * <span class="instui-in-place-edit" contenteditable="true" role="textbox" aria-label="Project name">Untitled</span>
 * @modifier -readonly — Shown inline but not editable (no hover/focus affordance).
 * @demo self:in-place-edit
 */
${root} {
  display: inline-block;
  min-inline-size: 2rem;
  padding: var(--instui-spacing-space2xs) var(--instui-spacing-space-xs);
  border: ${t("border-width")} solid transparent;
  border-radius: ${t("border-radius")};
  color: var(--instui-color-text-base);
  font: inherit;
  cursor: text;
}
/* Hover affordance: it's editable. */
${root}:hover { background: var(--instui-color-background-muted); }
/* Focus = edit mode: input chrome + the focus ring. */
${root}:focus {
  background: ${t("background-color")};
  border-color: ${t("border-color")};
  outline: none;
}
${root}:focus-visible {
  outline: var(--instui-focus-outline-width) var(--instui-focus-outline-style) var(--instui-focus-outline-color);
  outline-offset: var(--instui-focus-outline-offset);
}
${root}.-readonly { cursor: default; }
${root}.-readonly:hover { background: transparent; }
`;
}

/**
 * FormFieldMessages (container) + FormFieldMessage (item). Types `-type-{hint,error,success,
 * screenreader-only}` from the `form-field-message-*` tokens; error/success paint a masked circle glyph
 * on `::before` in `currentColor` (= the type colour, so no colour plumbing). `newError` is a deprecated
 * alias of `error` (added by `withDeprecatedAliases`). Both classes are flat-prefixed (not scoped), so
 * the messages region can live inside a FormField or a FormFieldGroup, or stand alone.
 */
function formFieldMessagesRules(p: string): string {
  const m = (s: string): string => `var(--instui-component-form-field-message-${s})`;
  return `
/**
 * @component form-field-messages
 * @summary Field help and validation messages — hint, error, success, and screen-reader-only — with a glyph on error and success.
 */
.${p}form-field-messages {
  display: flex;
  flex-direction: column;
  gap: var(--instui-component-form-field-layout-gap-primitives);
}
.${p}form-field-message {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-family: ${m("font-family")};
  font-size: ${m("font-size")};
  font-weight: ${m("font-weight")};
  line-height: ${m("line-height")};
  color: ${m("hint-text-color")};
}
.${p}form-field-message.-type-hint { color: ${m("hint-text-color")}; }
.${p}form-field-message.-type-error { color: ${m("error-text-color")}; }
.${p}form-field-message.-type-success { color: ${m("success-text-color")}; }
.${p}form-field-message.-type-error::before,
.${p}form-field-message.-type-success::before {
  content: "";
  flex: none;
  inline-size: 1em;
  block-size: 1em;
  background: currentColor;
}
.${p}form-field-message.-type-error::before { -webkit-mask: ${ALERT_CIRCLE_ICON}; mask: ${ALERT_CIRCLE_ICON}; }
.${p}form-field-message.-type-success::before { -webkit-mask: ${CHECK_CIRCLE_ICON}; mask: ${CHECK_CIRCLE_ICON}; }
.${p}form-field-message.-type-screenreader-only {
  position: absolute;
  inline-size: 1px;
  block-size: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
}
`;
}

/**
 * FormField: the InstUI FormFieldLayout as CSS Grid with named areas (`label`/`controls`/`messages`).
 * `-layout-stacked` (default) stacks them; `-layout-inline` puts the label beside the controls. The
 * required asterisk renders from EITHER the `-required` class OR a native `:required` control inside the
 * field (decorative `::after` on the label, so it's out of the a11y tree). `.label`/`.controls` are
 * scoped to the field; the messages-placement rule stays OUTSIDE `@scope` because
 * `.instui-form-field-messages` shares the `form-field` prefix (the split would corrupt it).
 */
function formFieldRules(p: string): string {
  const root = `.${p}form-field`;
  const L = (s: string): string => `var(--instui-component-form-field-layout-${s})`;
  return `
/**
 * @component form-field
 * @summary A form-field wrapper: a label, its controls, and inline, required, or readonly layouts.
 * @example
 * <label class="instui-form-field">
 *   <span class="label">Email address</span>
 *   <span class="controls"><input class="instui-text-input" type="email" placeholder="you@example.com"></span>
 *   <div class="instui-form-field-messages">
 *     <span class="instui-form-field-message -type-hint">We'll never share it.</span>
 *     <span class="instui-form-field-message -type-error">Enter a valid email address.</span>
 *   </div>
 * </label>
 * @structure
 * .instui-form-field
 *   .label
 *   .controls
 *     .instui-text-input
 *   .instui-form-field-messages
 *     .instui-form-field-message.-type-hint
 *     .instui-form-field-message.-type-error
 * @modifier -inline — Inline layout (shorthand for \`-layout-inline\`).
 * @modifier -layout-inline — Inline layout: label beside the controls.
 * @modifier -layout-stacked — Stacked layout: label above the controls.
 * @modifier -label-align-start — Start-align the label text.
 * @modifier -label-align-end — End-align the label text.
 * @modifier -invalid — Invalid (error) state.
 * @modifier -readonly — Read-only state.
 * @modifier -v-align-top — Top-align the label with the controls.
 * @modifier -v-align-bottom — Bottom-align the label with the controls.
 * @part .label — The field label.
 * @part .controls — The control area beside or below the label.
 */
${root} {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas: "label" "controls" "messages";
  gap: ${L("gap-inputs")};
  color: ${L("text-color")};
  font-family: ${L("font-family")};
}
${scope(
  root,
  `
${root} .label {
  grid-area: label;
  color: ${L("text-color")};
  font-family: ${L("font-family")};
  font-weight: ${L("font-weight")};
  font-size: ${L("font-size")};
  line-height: ${L("line-height")};
}
${root} .controls { grid-area: controls; }
`,
  ["label", "controls"],
)}
/* Messages region — kept OUTSIDE @scope: the messages class shares the form-field prefix. */
${root} > .${p}form-field-messages { grid-area: messages; }
/* Client-side validation: an error message stays hidden until the field's control is :user-invalid
   (after the user has interacted), per MDN guidance; then it shows. The explicit -invalid class on the
   control (and a standalone .instui-form-field-messages outside a field) are unaffected. */
${root} .${p}form-field-message.-type-error,
${root} .${p}form-field-message.-type-new-error { display: none; }
${root}:has(:user-invalid) .${p}form-field-message.-type-error,
${root}:has(:user-invalid) .${p}form-field-message.-type-new-error,
${root}.-invalid .${p}form-field-message.-type-error,
${root}.-invalid .${p}form-field-message.-type-new-error { display: inline-flex; }
/* Required indicator: native [required] control OR the -required class; decorative (aria-hidden). */
${root}:is(.-required, :has(:required)) .label::after {
  content: "*";
  margin-inline-start: 0.25rem;
  color: ${L("asterisk-color")};
}
${root}.-readonly .label { color: ${L("readonly-text-color")}; }
${root}.-layout-stacked { grid-template-columns: 1fr; grid-template-areas: "label" "controls" "messages"; }
${root}.-layout-inline {
  grid-template-columns: auto 1fr;
  grid-template-areas: "label controls" ". messages";
  align-items: center;
  column-gap: ${L("gap-primitives")};
}
${root}.-layout-inline.-v-align-top { align-items: start; }
${root}.-layout-inline.-v-align-bottom { align-items: end; }
${root}.-layout-inline.-label-align-start .label { text-align: start; }
${root}.-layout-inline.-label-align-end .label { text-align: end; }
${root}.-inline { display: inline-grid; inline-size: auto; }
`;
}

/**
 * FormFieldGroup: a `<fieldset>` grouping several FormFields under a `<legend>`. No dedicated tokens —
 * pure composition on the spacing scale. Default stacks; `-layout-columns`/`-layout-inline` flow the
 * fields into responsive columns (the legend spans all columns). `-row-spacing-*`/`-col-spacing-*` and
 * `-v-align-*` tune the grid.
 */
function formFieldGroupRules(p: string): string {
  const root = `.${p}form-field-group`;
  const L = (s: string): string => `var(--instui-component-form-field-layout-${s})`;
  return `
/**
 * @component form-field-group
 * @summary A \`<fieldset>\` group with a legend, a column or inline layout, and configurable spacing.
 * @example
 * <fieldset class="instui-form-field-group -layout-columns -col-spacing-medium">
 *   <legend>Shipping address</legend>
 *   <label class="instui-form-field">
 *     <span class="label">First name</span>
 *     <span class="controls"><input class="instui-text-input"></span>
 *   </label>
 *   <label class="instui-form-field">
 *     <span class="label">Last name</span>
 *     <span class="controls"><input class="instui-text-input"></span>
 *   </label>
 *   <label class="instui-form-field">
 *     <span class="label">City</span>
 *     <span class="controls"><input class="instui-text-input"></span>
 *   </label>
 *   <label class="instui-form-field">
 *     <span class="label">State</span>
 *     <span class="controls">
 *       <select class="instui-simple-select">
 *         <option>CA</option>
 *         <option>NY</option>
 *         <option>TX</option>
 *       </select>
 *     </span>
 *   </label>
 *   <div class="instui-form-field-messages">
 *     <span class="instui-form-field-message -type-hint">All fields are used for delivery only.</span>
 *   </div>
 * </fieldset>
 * @structure
 * .instui-form-field-group.-layout-columns.-col-spacing-medium
 *   legend
 *   .instui-form-field
 *     .label
 *     .controls
 *       .instui-text-input
 *   .instui-form-field-messages
 *     .instui-form-field-message.-type-hint
 * @modifier -col-spacing-none — No column gap.
 * @modifier -col-spacing-small — Small column gap.
 * @modifier -col-spacing-medium — Medium column gap.
 * @modifier -col-spacing-large — Large column gap.
 * @modifier -row-spacing-none — No row gap.
 * @modifier -row-spacing-small — Small row gap.
 * @modifier -row-spacing-medium — Medium row gap.
 * @modifier -row-spacing-large — Large row gap.
 * @modifier -layout-aligned — Align child fields to a shared grid.
 * @modifier -layout-columns — Lay child fields out in columns.
 * @modifier -layout-inline — Lay child fields inline, in a row.
 * @modifier -required — Mark the group as required.
 * @modifier -v-align-top — Top-align the fields.
 * @modifier -v-align-middle — Middle-align the fields.
 * @modifier -v-align-bottom — Bottom-align the fields.
 */
${root} {
  display: grid;
  grid-template-columns: 1fr;
  gap: ${L("gap-inputs")};
  min-inline-size: 0;
  margin: 0;
  padding: 0;
  border: 0;
}
${root} > legend {
  grid-column: 1 / -1;
  padding: 0;
  margin-block-end: ${L("gap-primitives")};
  color: ${L("text-color")};
  font-family: ${L("font-family")};
  font-weight: ${L("font-weight")};
  font-size: ${L("font-size")};
  line-height: ${L("line-height")};
}
${root}.-required > legend::after {
  content: "*";
  margin-inline-start: 0.25rem;
  color: ${L("asterisk-color")};
}
${root}.-layout-columns,
${root}.-layout-inline {
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
}
${root}.-row-spacing-none { row-gap: 0; }
${root}.-row-spacing-small { row-gap: var(--instui-spacing-space-sm); }
${root}.-row-spacing-medium { row-gap: var(--instui-spacing-space-md); }
${root}.-row-spacing-large { row-gap: var(--instui-spacing-space-lg); }
${root}.-col-spacing-none { column-gap: 0; }
${root}.-col-spacing-small { column-gap: var(--instui-spacing-space-sm); }
${root}.-col-spacing-medium { column-gap: var(--instui-spacing-space-md); }
${root}.-col-spacing-large { column-gap: var(--instui-spacing-space-lg); }
${root}.-v-align-top { align-items: start; }
${root}.-v-align-middle { align-items: center; }
${root}.-v-align-bottom { align-items: end; }
/* -layout-aligned: the group's inline fields share one [label | controls] grid via subgrid, so every
   label lines up in a single column (Chromium/Firefox). Inert where subgrid is unsupported — the fields
   just fall back to their own stacked layout. */
@supports (grid-template-columns: subgrid) {
  ${root}.-layout-aligned {
    grid-template-columns: auto 1fr;
    align-items: center;
  }
  ${root}.-layout-aligned > .${p}form-field {
    display: grid;
    grid-column: 1 / -1;
    grid-template-columns: subgrid;
    grid-template-areas: "label controls" ". messages";
    align-items: center;
  }
}
`;
}

/**
 * RadioInputGroup: the same `<fieldset>`/`<legend>` grouping as FormFieldGroup, specialised for radios.
 * The children share a `name`, so selection is natively single-choice. `-variant-simple` (default) lays
 * the standard radios out (stacked, or `-layout-columns`/`-layout-inline` into a row); `-variant-toggle`
 * connects the child `.instui-radio.-variant-toggle` buttons into ONE segmented control — collapsed
 * borders, rounded outer ends, no gaps — so a set of toggle buttons reads (and behaves) as a single
 * single-select control rather than loose, individually-styled buttons.
 */
function radioInputGroupRules(p: string): string {
  const root = `.${p}radio-input-group`;
  const L = (s: string): string => `var(--instui-component-form-field-layout-${s})`;
  const r = "var(--instui-component-radio-input-toggle-border-radius)";
  const bw = "var(--instui-component-radio-input-toggle-border-width)";
  return `
/**
 * @component radio-input-group
 * @summary A single-select radio \`<fieldset>\`, plain or as a connected segmented toggle.
 * @example
 * <fieldset class="instui-radio-input-group -variant-toggle">
 *   <legend>T-shirt size</legend>
 *   <label class="instui-radio -variant-toggle"><input type="radio" name="size" checked> Small</label>
 *   <label class="instui-radio -variant-toggle"><input type="radio" name="size"> Medium</label>
 *   <label class="instui-radio -variant-toggle"><input type="radio" name="size"> Large</label>
 * </fieldset>
 * @structure
 * .instui-radio-input-group.-variant-toggle
 *   legend
 *   .instui-radio.-variant-toggle
 *     input
 * @modifier -layout-columns — Lay the radios out in columns.
 * @modifier -layout-inline — Lay the radios out inline.
 * @modifier -required — Mark the group as required.
 * @modifier -variant-toggle — Connect the child toggles into one segmented control.
 */
${root} {
  display: flex;
  flex-direction: column;
  gap: ${L("gap-inputs")};
  min-inline-size: 0;
  margin: 0;
  padding: 0;
  border: 0;
}
${root} > legend {
  padding: 0;
  margin-block-end: ${L("gap-primitives")};
  color: ${L("text-color")};
  font-family: ${L("font-family")};
  font-weight: ${L("font-weight")};
  font-size: ${L("font-size")};
  line-height: ${L("line-height")};
}
${root}.-required > legend::after {
  content: "*";
  margin-inline-start: 0.25rem;
  color: ${L("asterisk-color")};
}
/* simple variant: -layout-columns/-inline flow the standard radios into a wrapping row */
${root}.-layout-columns,
${root}.-layout-inline {
  flex-flow: row wrap;
  align-items: center;
  column-gap: var(--instui-spacing-space-md);
}
${root}.-layout-columns > legend,
${root}.-layout-inline > legend { flex-basis: 100%; }
/* toggle variant: connect the child .instui-radio.-variant-toggle buttons into one segmented control */
${root}.-variant-toggle {
  flex-flow: row wrap;
  align-items: center;
}
${root}.-variant-toggle > legend { flex-basis: 100%; }
${root}.-variant-toggle > .${p}radio { border-radius: 0; position: relative; }
${root}.-variant-toggle > .${p}radio:first-of-type {
  border-start-start-radius: ${r};
  border-end-start-radius: ${r};
}
${root}.-variant-toggle > .${p}radio:last-of-type {
  border-start-end-radius: ${r};
  border-end-end-radius: ${r};
}
${root}.-variant-toggle > .${p}radio + .${p}radio { margin-inline-start: calc(-1 * ${bw}); }
${root}.-variant-toggle > .${p}radio:has(input:checked) { z-index: 1; }
`;
}

/**
 * Build the FormField stylesheet: `.<prefix>-form-field`, a Grid label/controls/messages layout.
 *
 * @param options - {@link ComponentOptions}.
 * @returns The CSS string.
 *
 * @example
 * ```ts
 * import { formFieldCss } from "@pantoken/components";
 *
 * const css = formFieldCss();
 * // <label class="instui-form-field -required">
 * //   <span class="label">Email</span>
 * //   <span class="controls"><input class="instui-text-input" required /></span>
 * //   <div class="instui-form-field-messages">…</div>
 * // </label>
 * ```
 *
 * @demo self:form-field
 */
export function formFieldCss(options: ComponentOptions = {}): string {
  const prefix = options.prefix || "";
  return wrap("form-field", prefix, formFieldRules(ns(prefix)));
}

/**
 * Build the FormFieldGroup stylesheet: `.<prefix>-form-field-group` (a `<fieldset>`/`<legend>` group).
 *
 * @param options - {@link ComponentOptions}.
 * @returns The CSS string.
 *
 * @example
 * ```ts
 * import { formFieldGroupCss } from "@pantoken/components";
 *
 * const css = formFieldGroupCss();
 * // <fieldset class="instui-form-field-group"><legend>Address</legend> …fields… </fieldset>
 * ```
 *
 * @demo self:form-field-group
 */
export function formFieldGroupCss(options: ComponentOptions = {}): string {
  const prefix = options.prefix || "";
  return wrap("form-field-group", prefix, formFieldGroupRules(ns(prefix)));
}

/**
 * Build the RadioInputGroup stylesheet: `.<prefix>-radio-input-group` (a single-select radio
 * `<fieldset>`). `-variant-simple` (default) lays out standard radios; `-variant-toggle` connects the
 * child `.<prefix>-radio.-variant-toggle` buttons into one segmented control. Children share a `name`.
 *
 * @param options - {@link ComponentOptions}.
 * @returns The CSS string.
 *
 * @example
 * ```ts
 * import { radioInputGroupCss } from "@pantoken/components";
 *
 * const css = radioInputGroupCss();
 * // <fieldset class="instui-radio-input-group -variant-toggle">
 * //   <legend>Size</legend>
 * //   <label class="instui-radio -variant-toggle"><input type="radio" name="size" checked /> S</label>
 * //   <label class="instui-radio -variant-toggle"><input type="radio" name="size" /> M</label>
 * // </fieldset>
 * ```
 *
 * @demo self:radio-input-group
 */
export function radioInputGroupCss(options: ComponentOptions = {}): string {
  const prefix = options.prefix || "";
  return wrap("radio-input-group", prefix, radioInputGroupRules(ns(prefix)));
}

/**
 * Build the FormFieldMessages stylesheet: `.<prefix>-form-field-messages` (container) +
 * `.<prefix>-form-field-message` with `-type-{hint,error,success,screenreader-only}`.
 *
 * @param options - {@link ComponentOptions}.
 * @returns The CSS string.
 *
 * @example
 * ```ts
 * import { formFieldMessagesCss } from "@pantoken/components";
 *
 * const css = formFieldMessagesCss();
 * // <div class="instui-form-field-messages">
 * //   <span class="instui-form-field-message -type-error">Required.</span>
 * // </div>
 * ```
 *
 * @demo self:form-messages
 */
export function formFieldMessagesCss(options: ComponentOptions = {}): string {
  const prefix = options.prefix || "";
  return wrap("form-field-messages", prefix, formFieldMessagesRules(ns(prefix)));
}

/**
 * Build the TextInput stylesheet: `.<prefix>-text-input` (a styled native `<input>`), with
 * `-invalid`/`-success`/`-readonly`/`-disabled` and `-size-{sm,md,lg}`.
 *
 * @param options - {@link ComponentOptions}.
 * @returns The CSS string.
 *
 * @example
 * ```ts
 * import { textInputCss } from "@pantoken/components";
 *
 * const css = textInputCss();
 * // <input class="instui-text-input" placeholder="Name" />
 * ```
 *
 * @demo self:text-input
 * @demo self:date-time-inputs
 */
export function textInputCss(options: ComponentOptions = {}): string {
  const prefix = options.prefix || "";
  return wrap("text-input", prefix, textInputRules(ns(prefix)));
}

/**
 * Build the TextArea stylesheet: `.<prefix>-text-area` (a styled native `<textarea>`), resizable, with
 * the same states/sizes as TextInput.
 *
 * @param options - {@link ComponentOptions}.
 * @returns The CSS string.
 *
 * @example
 * ```ts
 * import { textAreaCss } from "@pantoken/components";
 *
 * const css = textAreaCss();
 * // <textarea class="instui-text-area" rows="4"></textarea>
 * ```
 *
 * @demo self:text-area
 */
export function textAreaCss(options: ComponentOptions = {}): string {
  const prefix = options.prefix || "";
  return wrap("text-area", prefix, textAreaRules(ns(prefix)));
}

/**
 * Build the SimpleSelect stylesheet: `.<prefix>-simple-select` (a styled native `<select>` with a
 * caret), sharing the TextInput look and states.
 *
 * @param options - {@link ComponentOptions}.
 * @returns The CSS string.
 *
 * @example
 * ```ts
 * import { simpleSelectCss } from "@pantoken/components";
 *
 * const css = simpleSelectCss();
 * // <select class="instui-simple-select"><option>One</option></select>
 * ```
 *
 * @demo self:simple-select
 */
export function simpleSelectCss(options: ComponentOptions = {}): string {
  const prefix = options.prefix || "";
  return wrap("simple-select", prefix, simpleSelectRules(ns(prefix)));
}

/**
 * Build the InputGroup stylesheet: `.<prefix>-input-group`, a facade wrapping a `.<prefix>-text-input`
 * with `.before`/`.after` icon slots (InstUI's `renderBeforeInput`/`renderAfterInput`) and
 * `-should-not-wrap`. The wrapper carries the border/bg/ring; the inner input is chromeless.
 *
 * @param options - {@link ComponentOptions}.
 * @returns The CSS string.
 *
 * @example
 * ```ts
 * import { inputGroupCss } from "@pantoken/components";
 *
 * const css = inputGroupCss();
 * // <span class="instui-input-group">
 * //   <span class="before instui-icon-search"></span>
 * //   <input class="instui-text-input" placeholder="Search" />
 * // </span>
 * ```
 *
 * @demo self:input-group
 */
export function inputGroupCss(options: ComponentOptions = {}): string {
  const prefix = options.prefix || "";
  return wrap("input-group", prefix, inputGroupRules(ns(prefix)));
}

/**
 * Build the NumberInput stylesheet: `.<prefix>-number-input`, the input facade + a trailing +/- arrow
 * column from the `text-input-arrows-*` tokens. Arrows are visual; the native `type="number"` keyboard
 * works and a consumer wires `stepUp()`/`stepDown()` on click. `-size-{md,lg}`.
 *
 * @param options - {@link ComponentOptions}.
 * @returns The CSS string.
 *
 * @example
 * ```ts
 * import { numberInputCss } from "@pantoken/components";
 *
 * const css = numberInputCss();
 * // <span class="instui-number-input">
 * //   <input type="number" value="1" />
 * //   <span class="arrows"><button aria-hidden="true"></button><button class="down" aria-hidden="true"></button></span>
 * // </span>
 * ```
 *
 * @demo self:number-input
 */
export function numberInputCss(options: ComponentOptions = {}): string {
  const prefix = options.prefix || "";
  return wrap("number-input", prefix, numberInputRules(ns(prefix)));
}

/**
 * Build the in-place-edit stylesheet: `.<prefix>-in-place-edit` — a `[contenteditable]` that reads as
 * text until focused, then shows text-input chrome. `-readonly` drops the affordance.
 * @demo self:in-place-edit
 */
export function inPlaceEditCss(options: ComponentOptions = {}): string {
  const prefix = options.prefix || "";
  return wrap("in-place-edit", prefix, inPlaceEditRules(ns(prefix)));
}

/**
 * The **experimental** customizable-select enhancement for `.<prefix>-simple-select`. Everything is
 * gated behind `@supports (appearance: base-select)` (the CSS Customizable Select model — Chrome 135+,
 * NOT yet Baseline), so it's pure progressive enhancement: browsers without support keep the plain
 * `simpleSelectCss` control; supporting browsers get a styled `::picker(select)` panel and styled
 * `option`s (hover/selected) from the `--instui-component-options-item-*` tokens. Shipped as its own
 * opt-in `select.css` (like `fonts.css`) rather than folded into `components.css`, precisely because the
 * feature is experimental — you opt in deliberately.
 *
 * @param options - {@link ComponentOptions}.
 * @returns The CSS string.
 *
 * @example
 * ```ts
 * import { selectCss } from "@pantoken/components";
 *
 * // Load AFTER components.css; enhances the same <select class="instui-simple-select"> element.
 * const css = selectCss();
 * ```
 *
 * @demo self:simple-select
 */
export function selectCss(options: ComponentOptions = {}): string {
  const prefix = options.prefix || "";
  const p = ns(prefix);
  const O = (s: string): string => `var(--instui-component-options-item-${s})`;
  const sel = `.${p}simple-select`;
  const body = `
/* Experimental: CSS Customizable Select (\`appearance: base-select\`, Chrome 135+, not yet Baseline).
   Enhances .${p}simple-select; degrades to the plain control where unsupported. */
@supports (appearance: base-select) {
  ${sel},
  ${sel}::picker(select) {
    appearance: base-select;
  }
  /* Keep simple-select's own background-image caret; hide the UA-generated picker icon. */
  ${sel}::picker-icon { display: none; }
  ${sel}::picker(select) {
    border: var(--instui-component-select-popover-border-width) solid var(--instui-component-text-input-border-color);
    border-radius: var(--instui-border-radius-lg);
    box-shadow: var(--instui-elevation-topmost);
    background-color: ${O("background")};
    padding: 0;
    margin: 0;
    overflow: hidden;
  }
  ${sel} option {
    padding: ${O("padding-vertical")} ${O("padding-horizontal")};
    background-color: ${O("background")};
    color: ${O("color")};
    font-family: ${O("font-family")};
    font-weight: ${O("font-weight")};
    font-size: ${O("font-size")};
    line-height: ${O("line-height")};
    cursor: pointer;
  }
  /* Hide the UA checkmark; the selected row gets our own trailing check via background-image. */
  ${sel} option::checkmark { display: none; }
  ${sel} option:hover,
  ${sel} option:focus {
    background-color: ${O("highlighted-background")};
    color: ${O("highlighted-label-color")};
    outline: none;
  }
  ${sel} option:checked {
    background-color: ${O("selected-background")};
    color: ${O("selected-label-color")};
    font-weight: ${O("font-weight-selected")};
    background-image: ${CHECK_URL_ON};
    background-repeat: no-repeat;
    background-position: right ${O("padding-horizontal")} center;
    background-size: 1rem 1rem;
    padding-inline-end: calc(${O("padding-horizontal")} + 1.5rem);
  }
}
`;
  return wrap("select", prefix, body);
}

/** Long-form spellings for the size scale — emitted as first-class aliases beside the short forms. */
const SIZE_LONG: Record<string, string> = {
  xs: "x-small",
  sm: "small",
  md: "medium",
  lg: "large",
  xl: "x-large",
};

/**
 * For every rule whose selector uses a short size class (`.-size-sm`), append a twin rule with the
 * long spelling (`.-size-small`) so both are first-class (like the `m`/`margin` spacing aliases).
 * Size rules are flat and `@keyframes` never carry a `-size-` selector, so a flat-rule scan is safe.
 */
function withSizeAliases(css: string): string {
  const extra: string[] = [];
  const rule = /([^{}]*\.-size-(xs|sm|md|lg|xl)\b[^{}]*)(\{[^{}]*\})/g;
  for (const [, selector, , body] of css.matchAll(rule)) {
    const long = selector
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/\.-size-(xs|sm|md|lg|xl)\b/g, (_m, s) => `.-size-${SIZE_LONG[s]}`)
      .trim();
    extra.push(`${long} ${body}`);
  }
  return extra.length ? `${css}\n/* size aliases */\n${extra.join("\n")}\n` : css;
}

/**
 * Emit deprecated InstUI-semantic aliases where a canonical modifier renames the InstUI prop/value.
 * Alert normalizes InstUI's `variant`→`color` (and value `error`→`danger`); keep the `-variant-*`
 * form working, marked `@deprecated`, so InstUI users aren't broken.
 */
function withDeprecatedAliases(css: string, p: string): string {
  const pairs: [canonical: string, deprecated: string][] = [
    // Alert: InstUI's prop is `variant` (value `error`), which we normalize to `color`/`danger`.
    [`${p}alert.-color-info`, `${p}alert.-variant-info`],
    [`${p}alert.-color-success`, `${p}alert.-variant-success`],
    [`${p}alert.-color-warning`, `${p}alert.-variant-warning`],
    [`${p}alert.-color-danger`, `${p}alert.-variant-error`],
    // Avatar: InstUI documents the palette as accent1–accent6; we name them (blue…grey) after the
    // tokens. accent1 blue, accent2 green, accent3 red, accent4 orange, accent5 ash, accent6 grey.
    [`${p}avatar.-color-blue`, `${p}avatar.-color-accent1`],
    [`${p}avatar.-color-green`, `${p}avatar.-color-accent2`],
    [`${p}avatar.-color-red`, `${p}avatar.-color-accent3`],
    [`${p}avatar.-color-orange`, `${p}avatar.-color-accent4`],
    [`${p}avatar.-color-ash`, `${p}avatar.-color-accent5`],
    [`${p}avatar.-color-grey`, `${p}avatar.-color-accent6`],
    // Radio: `variant="toggle"` renders as segmented buttons; keep the bare `-toggle` shorthand working.
    [`${p}radio.-variant-toggle`, `${p}radio.-toggle`],
    // FormFieldMessage: InstUI's `newError` type is deprecated and behaves exactly like `error`.
    [`${p}form-field-message.-type-error`, `${p}form-field-message.-type-new-error`],
    // Progress bar + circle: InstUI's `meterColor` prop maps to our normalized `-color-*` scheme.
    // `alert` folds to `warning` (no `-color-alert` in the normalized scheme).
    [`${p}progress.-color-brand`, `${p}progress.-meter-color-brand`],
    [`${p}progress.-color-info`, `${p}progress.-meter-color-info`],
    [`${p}progress.-color-success`, `${p}progress.-meter-color-success`],
    [`${p}progress.-color-warning`, `${p}progress.-meter-color-warning`],
    [`${p}progress.-color-warning`, `${p}progress.-meter-color-alert`],
    [`${p}progress.-color-danger`, `${p}progress.-meter-color-danger`],
    [`${p}progress-circle.-color-brand`, `${p}progress-circle.-meter-color-brand`],
    [`${p}progress-circle.-color-info`, `${p}progress-circle.-meter-color-info`],
    [`${p}progress-circle.-color-success`, `${p}progress-circle.-meter-color-success`],
    [`${p}progress-circle.-color-warning`, `${p}progress-circle.-meter-color-warning`],
    [`${p}progress-circle.-color-warning`, `${p}progress-circle.-meter-color-alert`],
    [`${p}progress-circle.-color-danger`, `${p}progress-circle.-meter-color-danger`],
  ];
  const extra: string[] = [];
  for (const [canonical, deprecated] of pairs) {
    const rule = new RegExp(
      `([^{}]*${canonical.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[^{}]*)(\\{[^{}]*\\})`,
      "g",
    );
    for (const [, selector, body] of css.matchAll(rule)) {
      const dep = selector
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .split(canonical)
        .join(deprecated)
        .trim();
      extra.push(`/* @deprecated → use .-${canonical.split(".-")[1]} */\n${dep} ${body}`);
    }
  }
  return extra.length
    ? `${css}\n/* deprecated InstUI-semantic aliases */\n${extra.join("\n")}\n`
    : css;
}

/**
 * Build the full component stylesheet: every class-based component (button, alert, badge, and the
 * rest) concatenated under one prefix. This is what ships as `components.css`. Prose, the base reset,
 * and the utilities are separate sheets — use {@link proseCss}, {@link baseCss}, and the utility
 * builders.
 *
 * Beyond concatenating the per-component rules, it:
 * - **leads with the elevation scale** ({@link elevationCss}) — the `--instui-elevation-*` shadow
 *   custom properties, so components that float (modal, alert, menu) resolve their shadows from this
 *   sheet plus a token layer, with no separate elevation stylesheet;
 * - **adds size aliases** — every `-size-sm` rule gets a first-class `-size-small` twin (and so on
 *   across the `xs`…`xl` scale), so both spellings work;
 * - **adds deprecated InstUI aliases** — where a canonical modifier renames an InstUI prop/value
 *   (Alert `variant`→`color`, Avatar `accent1`…`accent6`→named colours), the old form is kept working
 *   and marked `@deprecated`;
 * - **wraps element rules in `@scope`** — nested sub-elements (e.g. `.instui-menu .item`) are scoped
 *   to their component for intent and proximity.
 *
 * @param options - {@link ComponentOptions}. `options.prefix` sets the class prefix; any falsy value
 *   (`null`/`undefined`/`""`/omitted) drops it entirely (`.button`, `.alert`).
 * @returns The CSS string.
 *
 * @example Write the default stylesheet
 * ```ts
 * import { componentsCss } from "@pantoken/components";
 * import { writeFileSync } from "node:fs";
 *
 * writeFileSync("ui.css", componentsCss()); // .instui-button, .instui-alert, …
 * ```
 *
 * @example Emit every component under a custom prefix (or none)
 * ```ts
 * import { componentsCss } from "@pantoken/components";
 *
 * componentsCss({ prefix: "ui" }); // .ui-button, .ui-alert, …
 * componentsCss({ prefix: null }); // .button, .alert — unprefixed
 * ```
 *
 * @demo self:components
 */
export function componentsCss(options: ComponentOptions = {}): string {
  const prefix = options.prefix || "";
  const rules = [
    buttonRules(ns(prefix)),
    alertRules(ns(prefix)),
    badgeRules(ns(prefix)),
    pillRules(ns(prefix)),
    tagRules(ns(prefix)),
    avatarRules(ns(prefix)),
    tabsRules(ns(prefix)),
    metricRules(ns(prefix)),
    bylineRules(ns(prefix)),
    imgRules(ns(prefix)),
    tableRules(ns(prefix)),
    linkRules(ns(prefix)),
    listRules(ns(prefix)),
    iconRules(ns(prefix)),
    checkboxRules(ns(prefix)),
    radioRules(ns(prefix)),
    spinnerRules(ns(prefix)),
    progressRules(ns(prefix)),
    menuRules(ns(prefix)),
    modalRules(ns(prefix)),
    breadcrumbRules(ns(prefix)),
    billboardRules(ns(prefix)),
    ratingRules(ns(prefix)),
    toggleGroupRules(ns(prefix)),
    contextViewRules(ns(prefix)),
    progressCircleRules(ns(prefix)),
    paginationRules(ns(prefix)),
    truncateRules(ns(prefix)),
    toggleDetailsRules(ns(prefix)),
    fileDropRules(ns(prefix)),
    sideNavBarRules(ns(prefix)),
    treeBrowserRules(ns(prefix)),
    calendarRules(ns(prefix)),
    popoverRules(ns(prefix)),
    trayRules(ns(prefix)),
    tooltipRules(ns(prefix)),
    rangeInputRules(ns(prefix)),
    maskRules(ns(prefix)),
    screenReaderContentRules(ns(prefix)),
    headingRules(ns(prefix)),
    textRules(ns(prefix)),
    closeButtonRules(ns(prefix)),
    formFieldRules(ns(prefix)),
    formFieldGroupRules(ns(prefix)),
    radioInputGroupRules(ns(prefix)),
    formFieldMessagesRules(ns(prefix)),
    textInputRules(ns(prefix)),
    textAreaRules(ns(prefix)),
    simpleSelectRules(ns(prefix)),
    inputGroupRules(ns(prefix)),
    numberInputRules(ns(prefix)),
    inPlaceEditRules(ns(prefix)),
  ].map((r) => r.trim());
  const body = withDeprecatedAliases(withSizeAliases(rules.join("\n\n")), ns(prefix));
  // Elevation tokens lead the sheet so the shadows components reference (modal, alert, menu) resolve
  // from components.css alone — elevation is an intrinsic design attribute here, not an add-on.
  return `/* InstUI component styles (@pantoken/components) — prefix: ${prefix} */\n${elevationCss()}\n${body}\n`;
}
