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
  return `${tokenSelector} {\n${decls}\n}\n\n${focusOutlineRules(options.selector)}\n`;
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
const strokeUrl = (paths: string): string =>
  `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E${paths}%3C/svg%3E")`;

/** A contained, centred mask value from stroked path markup, painted via `background`. */
const strokeMask = (paths: string): string => `${strokeUrl(paths)} center / contain no-repeat`;

/** The per-variant Alert glyph URLs (Lucide info, circle-check, triangle-alert, circle-x). */
const ALERT_GLYPHS = {
  info: strokeUrl(
    "%3Ccircle cx='12' cy='12' r='10'/%3E%3Cpath d='M12 16v-4'/%3E%3Cpath d='M12 8h.01'/%3E",
  ),
  success: strokeUrl("%3Ccircle cx='12' cy='12' r='10'/%3E%3Cpath d='m9 12 2 2 4-4'/%3E"),
  warning: strokeUrl(
    "%3Cpath d='m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3'/%3E%3Cpath d='M12 9v4'/%3E%3Cpath d='M12 17h.01'/%3E",
  ),
  danger: strokeUrl(
    "%3Ccircle cx='12' cy='12' r='10'/%3E%3Cpath d='m15 9-6 6'/%3E%3Cpath d='m9 9 6 6'/%3E",
  ),
};

/** Lucide `x`, for the CloseButton glyph. */
const CLOSE_ICON = strokeMask("%3Cpath d='M18 6 6 18'/%3E%3Cpath d='m6 6 12 12'/%3E");

/** Lucide `check`, for the Checkbox tick. */
const CHECK_ICON = strokeMask("%3Cpath d='M20 6 9 17l-5-5'/%3E");

/** Lucide `minus`, masked, for the Checkbox indeterminate (mixed) state. */
const MINUS_ICON = strokeMask("%3Cpath d='M5 12h14'/%3E");

/** Bare `url()` glyphs (no positioning) for the Toggle handle — sized per state via `mask-size`. */
const CHECK_URL = strokeUrl("%3Cpath d='M20 6 9 17l-5-5'/%3E");
const CLOSE_URL = strokeUrl("%3Cpath d='M18 6 6 18'/%3E%3Cpath d='m6 6 12 12'/%3E");

/** Lucide `circle-alert`, masked — the FormFieldMessage error glyph (painted in `currentColor`). */
const ALERT_CIRCLE_ICON = strokeMask(
  "%3Ccircle cx='12' cy='12' r='10'/%3E%3Cline x1='12' x2='12' y1='8' y2='12'/%3E%3Cline x1='12' x2='12.01' y1='16' y2='16'/%3E",
);

/** Lucide `circle-check`, masked — the FormFieldMessage success glyph (painted in `currentColor`). */
const CHECK_CIRCLE_ICON = strokeMask(
  "%3Ccircle cx='12' cy='12' r='10'/%3E%3Cpath d='m9 12 2 2 4-4'/%3E",
);

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

/**
 * InstUI's `ai` glyph (Solid), inlined as a mask so it paints in the button's own colour — solid
 * white on `--ai`, the violet→sea gradient on `--ai-secondary`. Source: `@instructure/ui-icons`.
 */
const AI_ICON_MASK =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 1920 1920' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M960 0L1219.29 700.713L1920 960L1219.29 1219.29L960 1920L700.713 1219.29L0 960L700.713 700.713L960 0Z'/%3E%3Cpath d='M1600 0L1686.43 233.571L1920 320L1686.43 406.429L1600 640L1513.57 406.429L1280 320L1513.57 233.571L1600 0Z'/%3E%3C/svg%3E\") center / contain no-repeat";

/** Button rules: a primary fill by default, plus `--secondary` (outline) and `--danger`. */
function buttonRules(p: string): string {
  return `
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
  --pantoken-alert-glyph: ${ALERT_GLYPHS.info};
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
  --pantoken-alert-glyph: ${ALERT_GLYPHS.success};
}
.${p}alert.-color-warning {
  border-color: var(--instui-component-alert-warning-border-color);
  --pantoken-alert-icon-bg: var(--instui-component-alert-warning-icon-background);
  --pantoken-alert-glyph: ${ALERT_GLYPHS.warning};
}
.${p}alert.-color-danger {
  border-color: var(--instui-component-alert-danger-border-color);
  --pantoken-alert-icon-bg: var(--instui-component-alert-danger-icon-background);
  --pantoken-alert-glyph: ${ALERT_GLYPHS.danger};
}
`;
}

/** Badge rules: a small pill (brand fill by default), plus `--success` and `--danger`. */
function badgeRules(p: string): string {
  return `
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
  color: var(--instui-component-badge-color);
}
.${p}badge.-color-success { --pantoken-badge-accent: var(--instui-component-badge-color-success); }
.${p}badge.-color-danger { --pantoken-badge-accent: var(--instui-component-badge-color-danger); }
/* Inverse swaps fill and text (InstUI): a light chip with dark text, for a colour/dark surface. */
.${p}badge.-color-inverse {
  --pantoken-badge-accent: var(--instui-component-badge-color);
  color: var(--instui-component-badge-color-inverse);
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
function bylineRules(p: string): string {
  const root = `.${p}byline`;
  return `
${root} {
  display: flex;
  align-items: center;
  gap: var(--instui-component-byline-figure-margin);
  background: var(--instui-component-byline-background);
  color: var(--instui-component-byline-color);
  font-family: var(--instui-component-byline-font-family);
}
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

/**
 * Build the icon-glyph stylesheet: one `.<prefix>-icon-<name>` class per icon that points
 * `--pantoken-glyph` at the matching `--instui-icon-<name>` token. Kept out of the component bundle
 * (it's large); ships as its own `icons.css`. Pass the icon names (e.g. from `@pantoken/icons`).
 *
 * @param names - Icon names without the `--instui-icon-` prefix (e.g. `["megaphone", "check"]`).
 * @param options - {@link ComponentOptions}.
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
export function iconGlyphsCss(names: readonly string[], options: ComponentOptions = {}): string {
  const prefix = options.prefix || "";
  const p = ns(prefix);
  void p; // glyph classes are prefix-independent modifiers (.-icon-<name>); consumed by any host.
  const rules = names
    .map((name) => `.-icon-${name} { --pantoken-glyph: var(--instui-icon-${name}); }`)
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
  return `/* InstUI spacing utilities (@pantoken/components) — prefix: ${prefix} */\n${rules.join("\n")}\n`;
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
  return `/* InstUI View primitive (@pantoken/components) — prefix: ${prefix} */\n${rules.join("\n")}\n`;
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
  return `/* InstUI layout utilities (@pantoken/components) — prefix: ${prefix} */\n${rules}\n`;
}

/**
 * List rules: token-driven type and item spacing. Sizes `--sm`/`--lg`, spacing modifiers, and
 * `--solid`/`--dashed` delimiters that draw a rule between items.
 */
function listRules(p: string): string {
  return `
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
  -webkit-mask: ${CLOSE_URL} center / 58% no-repeat;
  mask: ${CLOSE_URL} center / 58% no-repeat;
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
  -webkit-mask: ${CHECK_URL} center / 58% no-repeat;
  mask: ${CHECK_URL} center / 58% no-repeat;
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
  const meter = (name: string, token: string): string =>
    `.${p}progress .bar.-${name} { background: var(--instui-component-progress-bar-meter-color-${token}); }
.${p}progress.-color-inverse .bar.-${name} { background: var(--instui-component-progress-bar-meter-color-${token}-inverse); }`;
  return `
${root} {
  display: block;
  width: 100%;
  height: var(--instui-component-progress-bar-medium-height);
  background: var(--instui-component-progress-bar-track-color);
  border-bottom: var(--instui-component-progress-bar-track-bottom-border-width) solid var(--instui-component-progress-bar-track-bottom-border-color);
  border-radius: var(--instui-component-progress-bar-border-radius);
  overflow: hidden;
}
.${p}progress.-size-xs { height: var(--instui-component-progress-bar-x-small-height); }
.${p}progress.-size-sm { height: var(--instui-component-progress-bar-small-height); }
.${p}progress.-size-lg { height: var(--instui-component-progress-bar-large-height); }
.${p}progress.-color-inverse {
  background: var(--instui-component-progress-bar-track-color-inverse);
  border-bottom-color: var(--instui-component-progress-bar-track-bottom-border-color-inverse);
}
${scope(
  root,
  `
.${p}progress .bar {
  height: 100%;
  background: var(--instui-component-progress-bar-meter-color-brand);
  border-radius: var(--instui-component-progress-bar-border-radius);
}
${meter("color-info", "info")}
${meter("color-success", "success")}
${meter("color-warning", "warning")}
${meter("color-alert", "alert")}
${meter("color-danger", "danger")}
.${p}progress.-color-inverse .bar { background: var(--instui-component-progress-bar-meter-color-brand-inverse); }
`,
  ["bar"],
)}
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
.${p}billboard .message {
  color: var(--instui-component-billboard-message-color);
  font-size: var(--instui-component-billboard-message-font-size-medium);
}
.${p}billboard.-clickable .message { color: var(--instui-component-billboard-message-color-clickable); }
`,
  ["message"],
)}
`;
}

/** Rating rules: filled and empty stars, with `--sm`/`--lg` sizes. */
function ratingRules(p: string): string {
  const root = `.${p}rating`;
  return `
${root} {
  display: inline-flex;
  align-items: center;
  gap: var(--instui-component-rating-icon-icon-margin);
  font-size: var(--instui-component-rating-icon-medium-icon-font-size);
}
.${p}rating.-size-sm { font-size: var(--instui-component-rating-icon-small-icon-font-size); }
.${p}rating.-size-lg { font-size: var(--instui-component-rating-icon-large-icon-font-size); }
${scope(
  root,
  `
.${p}rating .star { color: var(--instui-component-rating-icon-icon-empty-color); opacity: 0.35; }
.${p}rating .star.-filled { color: var(--instui-component-rating-icon-icon-filled-color); opacity: 1; }
`,
  ["star"],
)}
`;
}

/** Toggle-group rules: a segmented control that joins `.<prefix>-button` children. */
function toggleGroupRules(p: string): string {
  return `
.${p}toggle-group {
  display: inline-flex;
  border: var(--instui-border-width-sm) solid var(--instui-component-toggle-group-border-color);
  border-radius: var(--instui-border-radius-md);
  overflow: hidden;
}
.${p}toggle-group > .${p}button {
  border-radius: 0;
  border-top-width: 0;
  border-bottom-width: 0;
}
.${p}toggle-group > .${p}button + .${p}button {
  border-inline-start: var(--instui-border-width-sm) solid var(--instui-component-toggle-group-border-color);
}
`;
}

/** Context-view rules: a callout surface with a downward caret. */
function contextViewRules(p: string): string {
  return `
.${p}context-view {
  position: relative;
  display: inline-block;
  padding: var(--instui-spacing-space-md);
  background: var(--instui-color-background-elevated-surface-base);
  color: var(--instui-color-text-base);
  border: var(--instui-component-context-view-arrow-border-width) solid var(--instui-component-context-view-arrow-border-color);
  border-radius: var(--instui-component-context-view-border-radius);
}
.${p}context-view::after {
  content: "";
  position: absolute;
  top: 100%;
  inset-inline-start: var(--instui-spacing-space-lg);
  border: var(--instui-component-context-view-arrow-size) solid transparent;
  border-top-color: var(--instui-component-context-view-arrow-background-color);
}
/* Works as a native popover: the class already supplies the box (it out-specifies the UA popover
   border/padding), so we only keep \`overflow: visible\` for the caret and let the UA centre it in the
   top layer as the fallback. To point it at a trigger, the consumer opts in with standard CSS anchor
   positioning (\`anchor-name\` on the trigger + \`position-anchor\` here) where supported (Chromium). */
[popover].${p}context-view { position: fixed; overflow: visible; }
`;
}

/**
 * Progress-circle rules: a CSS `conic-gradient` ring driven by a `--value` (0–100) custom property.
 * The fill/track/stroke are indirected through `--pantoken-pc-*` custom props so sizes
 * (`--x-small`/`--sm`/`--lg`), the status palette, and `--inverse` are one-line overrides.
 */
function progressCircleRules(p: string): string {
  const meter = (name: string, token: string): string =>
    `.${p}progress-circle.-${name} { --pantoken-pc-fill: var(--instui-component-progress-circle-meter-color-${token}); }
.${p}progress-circle.-color-inverse.-${name} { --pantoken-pc-fill: var(--instui-component-progress-circle-meter-color-${token}-inverse); }`;
  const size = (mod: string, key: string): string =>
    `.${p}progress-circle.-${mod} {
  width: var(--instui-component-progress-circle-${key}-size);
  height: var(--instui-component-progress-circle-${key}-size);
  --pantoken-pc-stroke: var(--instui-component-progress-circle-${key}-stroke-width);
}`;
  return `
.${p}progress-circle {
  --value: 0;
  --pantoken-pc-fill: var(--instui-component-progress-circle-meter-color-brand);
  --pantoken-pc-track: var(--instui-component-progress-circle-track-color);
  --pantoken-pc-stroke: var(--instui-component-progress-circle-medium-stroke-width);
  display: inline-block;
  width: var(--instui-component-progress-circle-medium-size);
  height: var(--instui-component-progress-circle-medium-size);
  border-radius: 50%;
  background: conic-gradient(var(--pantoken-pc-fill) calc(var(--value) * 1%), var(--pantoken-pc-track) 0);
  -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - var(--pantoken-pc-stroke)), #000 0);
  mask: radial-gradient(farthest-side, #0000 calc(100% - var(--pantoken-pc-stroke)), #000 0);
}
${size("size-xs", "x-small")}
${size("size-sm", "small")}
${size("size-lg", "large")}
${meter("color-info", "info")}
${meter("color-success", "success")}
${meter("color-warning", "warning")}
${meter("color-alert", "alert")}
${meter("color-danger", "danger")}
.${p}progress-circle.-color-inverse {
  --pantoken-pc-fill: var(--instui-component-progress-circle-meter-color-brand-inverse);
  --pantoken-pc-track: var(--instui-component-progress-circle-track-color-inverse);
}
`;
}

/** Pagination rules: a row of page links with a current-page state. */
function paginationRules(p: string): string {
  const root = `.${p}pagination`;
  return `
${root} {
  display: inline-flex;
  align-items: center;
  gap: var(--instui-component-pagination-page-indicator-gap);
  font-family: var(--instui-font-family-base);
}
${scope(
  root,
  `
.${p}pagination .page {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 2rem;
  padding: var(--instui-spacing-space2xs) var(--instui-spacing-space-xs);
  color: var(--instui-color-text-interactive-navigation-primary-base);
  border-radius: var(--instui-border-radius-sm);
  text-decoration: none;
  cursor: pointer;
}
.${p}pagination .page:hover { background: var(--instui-color-background-muted); }
.${p}pagination .page[aria-current] {
  background: var(--instui-color-background-interactive-action-secondary-base);
  color: var(--instui-color-text-interactive-action-secondary-base);
}
`,
  ["page"],
)}
`;
}

/** Truncate rules: single-line ellipsis, plus a `--lines` multi-line clamp (set `--lines`). */
function truncateRules(p: string): string {
  return `
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
  font-size: var(--instui-component-toggle-details-font-size-medium);
  padding: var(--instui-component-toggle-details-toggle-padding);
  color: var(--instui-component-toggle-details-text-color);
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
 * Range rules: a styled `input[type="range"]` (track + handle, both engines) with hover/focus handle
 * states, and a `.range-value` bubble (a flat class, since it sits as a sibling) styled from the value tokens.
 */
function rangeRules(p: string): string {
  const track = `
  height: var(--instui-border-width-lg);
  background: var(--instui-component-range-input-track-background);
  border: var(--instui-border-width-sm) solid var(--instui-component-range-input-track-border-color);
  border-radius: 999px;`;
  const thumb = `
  width: var(--instui-component-range-input-handle-size);
  height: var(--instui-component-range-input-handle-size);
  background: var(--instui-component-range-input-handle-background);
  border: var(--instui-component-range-input-handle-border-size) solid var(--instui-component-range-input-handle-border-color);
  border-radius: 50%;
  box-shadow: 0 0 0 0 var(--instui-component-range-input-handle-shadow-color);
  cursor: pointer;`;
  return `
.${p}range {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  min-width: var(--instui-component-range-input-min-width);
  background: transparent;
}
.${p}range::-webkit-slider-runnable-track {${track}
}
.${p}range::-moz-range-track {${track}
}
.${p}range::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  margin-top: calc((var(--instui-border-width-lg) - var(--instui-component-range-input-handle-size)) / 2);${thumb}
}
.${p}range::-moz-range-thumb {${thumb}
}
.${p}range:hover::-webkit-slider-thumb { background: var(--instui-component-range-input-handle-hover-background); }
.${p}range:hover::-moz-range-thumb { background: var(--instui-component-range-input-handle-hover-background); }
.${p}range:focus-visible::-webkit-slider-thumb {
  background: var(--instui-component-range-input-handle-focus-background);
  box-shadow: 0 0 0 var(--instui-component-range-input-handle-focus-outline-width) var(--instui-component-range-input-handle-focus-outline-color);
}
.${p}range:focus-visible::-moz-range-thumb {
  background: var(--instui-component-range-input-handle-focus-background);
  box-shadow: 0 0 0 var(--instui-component-range-input-handle-focus-outline-width) var(--instui-component-range-input-handle-focus-outline-color);
}
.${p}range-value {
  padding: var(--instui-component-range-input-value-medium-padding);
  font-family: var(--instui-component-range-input-value-font-family);
  font-size: var(--instui-component-range-input-value-medium-font-size);
  font-weight: var(--instui-component-range-input-value-font-weight);
  line-height: var(--instui-component-range-input-value-medium-line-height);
}
.${p}range-value.-size-sm {
  padding: var(--instui-component-range-input-value-small-padding);
  font-size: var(--instui-component-range-input-value-small-font-size);
  line-height: var(--instui-component-range-input-value-small-line-height);
}
.${p}range-value.-size-lg {
  padding: var(--instui-component-range-input-value-large-padding);
  font-size: var(--instui-component-range-input-value-large-font-size);
  line-height: var(--instui-component-range-input-value-large-line-height);
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
 * Build the range stylesheet: `.<prefix>-range` (a styled `input[type="range"]`).
 *
 * @example
 * ```ts
 * import { rangeCss } from "@pantoken/components";
 *
 * const css = rangeCss();
 * // <input type="range" class="instui-range" min="0" max="100" value="50" />
 * ```
 *
 * @demo self:range
 */
export function rangeCss(options: ComponentOptions = {}): string {
  const prefix = options.prefix || "";
  return wrap("range", prefix, rangeRules(ns(prefix)));
}

/** Mask rules: a translucent overlay that covers its positioned parent, plus fullscreen and blur. */
function maskRules(p: string): string {
  return `
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
`;
}

/** TextInput rules: a native `<input>` styled from the `text-input-*` family, with `-size-{sm,md,lg}`. */
function textInputRules(p: string): string {
  const t = (s: string): string => `var(--instui-component-text-input-${s})`;
  return `
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
 * FormFieldMessages (container) + FormFieldMessage (item). Types `-type-{hint,error,success,
 * screenreader-only}` from the `form-field-message-*` tokens; error/success paint a masked circle glyph
 * on `::before` in `currentColor` (= the type colour, so no colour plumbing). `newError` is a deprecated
 * alias of `error` (added by `withDeprecatedAliases`). Both classes are flat-prefixed (not scoped), so
 * the messages region can live inside a FormField or a FormFieldGroup, or stand alone.
 */
function formFieldMessagesRules(p: string): string {
  const m = (s: string): string => `var(--instui-component-form-field-message-${s})`;
  return `
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
    rangeRules(ns(prefix)),
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
  ].map((r) => r.trim());
  const body = withDeprecatedAliases(withSizeAliases(rules.join("\n\n")), ns(prefix));
  // Elevation tokens lead the sheet so the shadows components reference (modal, alert, menu) resolve
  // from components.css alone — elevation is an intrinsic design attribute here, not an add-on.
  return `/* InstUI component styles (@pantoken/components) — prefix: ${prefix} */\n${elevationCss()}\n${body}\n`;
}
