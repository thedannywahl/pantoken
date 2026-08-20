/**
 * Generate the CSS API reference from the shipped component/utility stylesheets.
 *
 * The rendering (pages, index, sidebar, escaping, structure diagrams, token tables) lives in
 * `@cssdoc/markdown` and is driven here through `@cssdoc/typedoc`'s `emitCssApi` — the same plugin the
 * rest of the ecosystem uses, dogfooded before it's published. All that stays pantoken-specific is the
 * token resolution: `resolveToken` cross-references the `--instui-*` IR (type + light/dark value) and
 * `resolveSource` links each record to its source. `emitCssApi` writes `docs/api/css/**` and merges a
 * "CSS" section into the TypeDoc sidebar, so the CSS pages ride along in the same nav. The in-page live
 * `@example` previews are seamed on at compile time by `demoMarkdownIt` (see `.vitepress/config.ts`),
 * not here — the generated `.md` stays a plain source fence.
 *
 * Runs after `docs:api:en` (TypeDoc cleans `docs/api` and writes `typedoc-sidebar.json`, which this
 * merges into) and before `docs:api:locales`/vitepress.
 */
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { CssDocConfigFile } from "@cssdoc/config";
import { emitCssApi } from "@cssdoc/typedoc";
import { parseCssDocs, type CssDocEntry } from "@cssdoc/core";
import { tokens, type Token } from "@pantoken/tokens";
import { makeResolver, unknownReferences } from "@pantoken/utils";
import { BADGE_CLASS_BY_LABEL } from "./api-badge-classes.ts";

const docsRoot = join(import.meta.dirname, "..");

const CSS_OVERVIEW_BLURB =
  "The CSS API reference covers pantoken's class-based component layer: components, utilities, " +
  "global rules, and declarations built on the token system.";

const tokenByName = new Map(tokens.map((t) => [t.name, t]));

// Resolve a token value to its concrete form: expand every `var(...)` down to primitives, keeping a
// `light-dark(a, b)` pair intact (no `mode`), so a themed value shows both its light and dark result.
// Rebuilt in build() once the sheet-local custom properties are indexed, so `var(--pantoken-*)`
// references (e.g. the toggle geometry `calc()`s) resolve too.
let resolveValue = makeResolver(tokens);

/**
 * Custom properties defined in the sheets themselves (not the token IR) — the `--instui-elevation-*`
 * shadows and `--instui-focus-outline-*` ring — so their values can be resolved too. Populated by
 * {@link build} before rendering.
 */
const localVars = new Map<string, string>();

/**
 * Patterns for inferring CSS value types. Integrated URL patterns with numeric/time patterns.
 * Matched in order (most specific first).
 */
const SYNTAX_PATTERNS: [RegExp, string][] = [
  // URL and data patterns (most specific).
  [/^(?:url\(|data:)/iu, "<url>"],
  // Length patterns with all units.
  [/-?\d*\.?\d+(?:px|rem|em|vh|vw|vmin|vmax|svh|svw|ch|ex|cm|mm|in|pt|pc|q|%)\b/iu, "<length>"],
  // Time patterns (milliseconds and seconds).
  [/^-?\d*\.?\d+m?s$/iu, "<time>"],
  // Integer pattern.
  [/^-?\d+$/u, "<integer>"],
  // Decimal number pattern.
  [/^-?\d*\.?\d+$/u, "<number>"],
];

/**
 * Check if a value is a color (themed value, hex, rgb, hsl, etc.).
 */
function getColorSyntax(v: string): string | undefined {
  if (
    /light-dark\s*\(/iu.test(v) ||
    /(#[0-9a-f]{3,8}\b|\b(?:rgb|hsl|hwb|oklch|oklab|lab|lch|color)\()/iu.test(v)
  ) {
    return "<color>";
  }
  return undefined;
}

/**
 * Match a value against syntax patterns and return the matching syntax type.
 */
function matchSyntaxPattern(v: string): string | undefined {
  for (const [pattern, syntax] of SYNTAX_PATTERNS) {
    if (pattern.test(v)) return syntax;
  }
  return undefined;
}

/**
 * Infer a CSS `@property` syntax from a resolved token value. Component/semantic tokens carry
 * `syntax: "*"` (they're contextual `var()` aliases or `light-dark()` pairs that can't be a static
 * `@property` type), so the human-meaningful type is derived from what the value ultimately IS.
 */
export function inferSyntax(value: string): string | undefined {
  const v = value.trim();
  // Try color first (includes url/data detection).
  const color = getColorSyntax(v);
  if (color) return color;
  // Then try pattern matching.
  return matchSyntaxPattern(v);
}

/**
 * Composite / keyword-valued properties can't be inferred from a single value (`solid` alone doesn't
 * imply the set; a box-shadow or font stack isn't a primitive), but the token name says which property
 * it feeds — so map it to that property's CSS value-definition grammar (CSS Values 4 §2.1 notation:
 * `|` `||` `&&` `[]` `?` `{a,b}` `#`). Matched by name substring, most-specific first, so it also catches
 * variants (`…-text-decoration-outside-text`) and non-IR tokens (elevation shadows, the focus ring).
 */
const LINE_STYLE =
  "none | hidden | dotted | dashed | solid | double | groove | ridge | inset | outset";
const PROPERTY_SYNTAX: [RegExp, string][] = [
  [/font-family/u, "[ <font-family-name> | <generic-font-family> ]#"],
  [/elevation/u, "[ inset? && <length>{2,4} && <color>? ]# | none"],
  [/text-decoration/u, "none | underline || overline || line-through || blink"],
  [/focus-outline-color/u, "<color> | invert"],
  [/focus-outline-style/u, `auto | ${LINE_STYLE}`],
  [/focus-outline-(width|offset|radius)/u, "<length>"],
  [/border-style/u, LINE_STYLE],
  // Icon glyph vars hold a url-encoded SVG; type by name so even the value-less placeholder resolves.
  [/glyph/u, "<url>"],
  [/-filter\b/u, "<filter-value-list> | none"],
];

/**
 * Check if a token has a concrete (non-wildcard) syntax.
 */
function hasConcretesSyntax(token: Token | undefined): boolean {
  return !!(token?.syntax && token.syntax !== "*");
}

/**
 * Try to follow a token's `refersTo` chain.
 */
function getNextChainToken(
  token: Token | undefined,
  lookup: Map<string, Token>,
  seen: Set<string>,
): Token | undefined {
  if (!token?.refersTo || seen.has(token.refersTo)) return undefined;
  seen.add(token.refersTo);
  return lookup.get(token.refersTo);
}

/**
 * Try to infer syntax from a token's value.
 */
function inferFromTokenValue(token: Token | undefined): string | undefined {
  return token?.value ? inferSyntax(token.value) : undefined;
}

/**
 * Recursively walk a token's `refersTo` chain for the first concrete `syntax`,
 * else infer from its terminal value.
 */
function walkTokenChain(
  token: Token | undefined,
  lookup: Map<string, Token>,
  seen: Set<string>,
): string | undefined {
  // Base case: no token.
  if (!token) return undefined;

  // Concrete syntax found.
  if (hasConcretesSyntax(token)) return token.syntax!;

  // Try to follow the chain.
  const next = getNextChainToken(token, lookup, seen);
  if (next) return walkTokenChain(next, lookup, seen);

  // No more chain, try inferring from value.
  return inferFromTokenValue(token);
}

/**
 * Walk a token's `refersTo` chain for the first concrete `syntax`, else infer from its terminal value.
 * `lookup` (the token index, defaulting to the module's) is injectable so the chain-walk is testable.
 */
export function syntaxFromChain(
  name: string,
  lookup: Map<string, Token> = tokenByName,
): string | undefined {
  const token = lookup.get(name);
  return walkTokenChain(token, lookup, new Set<string>());
}

/**
 * Find the syntax for a property name in the PROPERTY_SYNTAX map.
 */
function findPropertySyntax(name: string): string | undefined {
  return PROPERTY_SYNTAX.find(([re]) => re.test(name))?.[1];
}

/**
 * The human-meaningful syntax of a consumed token: the first concrete `syntax` along its `refersTo`
 * chain, else inferred from the terminal value, else the enumerated keyword set for keyword-valued
 * properties. Returns undefined only when nothing can be derived.
 */
export function resolveSyntax(
  name: string,
  lookup: Map<string, Token> = tokenByName,
  locals: Map<string, string> = localVars,
  resolve: (value: string) => string = resolveValue,
): string | undefined {
  // Try the chain first.
  const chained = syntaxFromChain(name, lookup);
  if (chained) return chained;

  // Composite/keyword property grammar by name takes precedence.
  const prop = findPropertySyntax(name);
  if (prop) return prop;

  // Fall back to inferring from a sheet-local value.
  const local = locals.get(name);
  return local ? inferSyntax(resolve(local)) : undefined;
}

/**
 * Get the raw token value from either the token registry or local sheet variables.
 */
function getRawTokenValue(
  name: string,
  lookup: Map<string, Token>,
  locals: Map<string, string>,
): string | undefined {
  return lookup.get(name)?.value ?? locals.get(name);
}

/**
 * The `resolveToken` hook `@cssdoc/markdown` calls for each consumed `--instui-*` property: its
 * human-meaningful type ({@link resolveSyntax}) and its concrete value (IR value, else a sheet-local
 * var), resolved down to primitives. Undefined when neither can be derived.
 */
export function resolveToken(
  name: string,
  lookup: Map<string, Token> = tokenByName,
  locals: Map<string, string> = localVars,
  resolve: (value: string) => string = resolveValue,
): { syntax?: string; value?: string } | undefined {
  const syntax = resolveSyntax(name, lookup, locals, resolve);
  const raw = getRawTokenValue(name, lookup, locals);
  const value = raw ? resolve(raw) : undefined;

  return syntax || value ? { syntax, value } : undefined;
}

// Use the generated CSS files (which retain doc comments) instead of the packaged dist (which tsdown/css
// strips comments from). This ensures `parseCssDocs` can extract `@component`, `@utility` records.
const generatedCssDir = join(docsRoot, "..", "formats", "components", "generated");
const cssPath = (subpath: string): string => join(generatedCssDir, subpath);
const readCss = (subpath: string): string => readFileSync(cssPath(subpath), "utf8");

/**
 * `classNames` (new in `@cssdoc/markdown` 0.7.2) lets HTML-preserving renderers wrap the deprecation
 * marker — the record-level `> [!WARNING]` banner and every deprecated modifier-table cell — in a
 * `<span class="…">`, and (via `stage`) the `@stable`/etc release-stage marker on the header line the
 * same way. `alias` (new in 0.13.2) wraps the `@alias` marker in a modifier-table cell the same way,
 * kept visually distinct from `deprecated` since an alias is a plain rename, not a warning. We render
 * all as an `instui-pill` (components.css is already loaded on doc pages for the live examples, so the
 * class paints). The extra `pantoken-doc-tag` is a docs-only marker: the shipped pill is a compact
 * fixed-height badge, so `.vitepress/theme/pantoken.css` uses it to relax the pill for the flowing
 * sentence it wraps — without touching how the real `.instui-pill` renders in a component preview.
 * Keep these classes in sync with the TypeDoc badge transformer via `api-badge-classes.ts`.
 */
const classNames = {
  deprecated: BADGE_CLASS_BY_LABEL.Deprecated,
  alias: BADGE_CLASS_BY_LABEL.Alias,
  stage: { stable: BADGE_CLASS_BY_LABEL.Stable },
};

// The repo root (this worktree) and its GitHub blob base, for `**Source:**` links.
const repoRoot = join(docsRoot, "..");
const SOURCE_URL_BASE = "https://github.com/thedannywahl/pantoken/blob/main";

/** Map each record name → its authoring source file (repo-relative), by scanning for the record tag. */
export function sourceMap(files: string[]): Map<string, string> {
  const RECORD = /@(?:component|utility|rule|declaration)\s+([a-z][\w-]*)/u;
  const map = new Map<string, string>();
  for (const file of files) {
    const m = readFileSync(file, "utf8").match(RECORD);
    if (m && !map.has(m[1])) map.set(m[1], relative(repoRoot, file));
  }
  return map;
}

/** A `resolveSource` hook: link a record to its source file (GitHub blob), labelled with the filename. */
export const makeResolveSource =
  (map: Map<string, string>) =>
  (entry: CssDocEntry): { href: string; label?: string } | undefined => {
    const path = map.get(entry.name);
    return path ? { href: `${SOURCE_URL_BASE}/${path}`, label: path.split("/").pop() } : undefined;
  };

/**
 * Every authoring source under `<componentsRoot>/src/{components,utilities,rules,declarations}` + the
 * color record's generate.ts. Scans both `.css` (the migrated static records carry the `@component` tag
 * in their co-located `.css`) and `.ts` (the parametric records — button, the input controls, heading —
 * still author the tag inside a `css` template). A migrated record's `.ts` is a tag-less wrapper, so
 * `sourceMap` skips it and links to the `.css`.
 */
export function componentSources(componentsRoot: string): string[] {
  const files = ["components", "utilities", "rules", "declarations"].flatMap((d) => {
    const dir = join(componentsRoot, "src", d);
    return readdirSync(dir)
      .filter((f) => f.endsWith(".ts") || f.endsWith(".css"))
      .map((f) => join(dir, f));
  });
  files.push(join(componentsRoot, "scripts", "generate.ts")); // the `color` utility's doc lives here
  return files;
}

/** One CSS-emitting plugin's cssdoc source: its package dir, generated sheet name, and `@import` specifier. */
type PluginRecord = { pkg: string; sheet: string; import: string };

/**
 * The CSS-emitting plugins (visual-debug/logos/primitives/layouts) carry cssdoc records in their
 * generated sheets. Plugins use `@group Plugins`; the layouts plugin uses `@group Layouts` so it
 * gets its own sidebar section. They render in the SAME pass as the component records — one `emitCssApi`
 * call, one "CSS" section. `stacking`/`transition` are excluded here — they're tokens-only plugins now;
 * their CSS records live in `@pantoken/components`' own utilities and are picked up via `files()` above.
 */
export function pluginRecords(): PluginRecord[] {
  return [
    {
      pkg: "plugins/pantoken/visual-debug",
      sheet: "visual-debug.css",
      import: "@pantoken/plugin-visual-debug/visual-debug.css",
    },
    {
      pkg: "plugins/pantoken/logos",
      sheet: "logos.css",
      import: "@pantoken/plugin-logos/logos.css",
    },
    {
      pkg: "plugins/pantoken/primitives",
      sheet: "primitives.css",
      import: "@pantoken/plugin-primitives/primitives.css",
    },
    {
      pkg: "plugins/pantoken/custom-components",
      sheet: "custom-components.css",
      import: "@pantoken/plugin-custom-components/custom-components.css",
    },
    {
      pkg: "plugins/pantoken/layouts",
      sheet: "layouts.css",
      import: "@pantoken/plugin-layouts/layouts.css",
    },
  ];
}

/**
 * Index every sheet-local custom property so its value resolves like an IR token — elevation shadows +
 * focus ring in the component sheets, `--instui-stacking-*`/`--instui-transition-*` in the plugin
 * sheets; first definition wins.
 */
export function indexLocalVars(texts: string[], target: Map<string, string> = localVars): void {
  for (const text of texts)
    for (const m of text.matchAll(/(--[\w-]+)\s*:\s*([^;{}]+);/gu))
      if (!target.has(m[1])) target.set(m[1], m[2].trim());
}

/** Rebuild the value resolver with the indexed sheet-local custom properties in scope. */
export function rebuildResolver(): void {
  const localTokens: Token[] = [...localVars].map(([name, value]) => ({
    name,
    value,
    syntax: "*",
    inherits: true,
  }));
  resolveValue = makeResolver([...tokens, ...localTokens]);
}

/**
 * The `**Source:**` `resolveSource` hook covering each record's authoring source: a component
 * `.ts`/`.css`, or a plugin's `scripts/generate.ts` (where its doc block is authored). Record names
 * don't collide, so one map.
 */
export function makeSourceResolver(
  componentsRoot: string,
  pluginRecordDefs: PluginRecord[],
): (entry: CssDocEntry) => { href: string; label?: string } | undefined {
  const pluginSources = pluginRecordDefs.map((r) =>
    join(repoRoot, r.pkg, "scripts", "generate.ts"),
  );
  return makeResolveSource(sourceMap([...componentSources(componentsRoot), ...pluginSources]));
}

/**
 * Index sheets to find which sheet each CSS record belongs to.
 */
function indexRecordSheets(
  sheets: string[],
  configuration: ReturnType<CssDocConfigFile["toConfiguration"]>,
  readSheet: (subpath: string) => string,
): Map<string, string> {
  const recordSheet = new Map<string, string>();
  for (const sheet of sheets) {
    for (const e of parseCssDocs(readSheet(sheet), { configuration })) {
      recordSheet.set(e.name, sheet);
    }
  }
  return recordSheet;
}

/**
 * Index plugin imports to find which plugin import each record belongs to.
 */
function indexPluginImports(
  pluginRecordDefs: PluginRecord[],
  configuration: ReturnType<CssDocConfigFile["toConfiguration"]>,
  readPluginSheet: (r: PluginRecord) => string,
): Map<string, string> {
  const pluginImportByName = new Map<string, string>();
  for (const r of pluginRecordDefs) {
    for (const e of parseCssDocs(readPluginSheet(r), { configuration })) {
      pluginImportByName.set(e.name, r.import);
    }
  }
  return pluginImportByName;
}

/**
 * Generate the import snippet for a CSS record.
 */
function generateImportSnippet(
  entry: CssDocEntry,
  pluginImportByName: Map<string, string>,
  recordSheet: Map<string, string>,
): string | undefined {
  const pluginImport = pluginImportByName.get(entry.name);
  if (pluginImport) return `@import "${pluginImport}";`;

  const sheet = recordSheet.get(entry.name);
  if (!sheet) return undefined;

  if (entry.kind === "component") {
    return [
      `@import "@pantoken/components/${sheet}";`,
      `@import "@pantoken/components/${entry.name}.css";`,
    ].join("\n");
  }

  return `@import "@pantoken/components/${sheet}";`;
}

/**
 * The `## Usage` import-snippet hook: a record's plugin `@import`, else the record's sheet import
 * `@pantoken/components/<sheet>` (plus the per-component `<name>.css` subpath for components).
 */
export function makeImportSnippet(
  sheets: string[],
  pluginRecordDefs: PluginRecord[],
  pluginSheet: (r: PluginRecord) => string,
  configuration: ReturnType<CssDocConfigFile["toConfiguration"]>,
  readSheet: (subpath: string) => string = readCss,
  readPluginSheet: (r: PluginRecord) => string = (r) => readFileSync(pluginSheet(r), "utf8"),
): (entry: CssDocEntry) => string | undefined {
  const recordSheet = indexRecordSheets(sheets, configuration, readSheet);
  const pluginImportByName = indexPluginImports(pluginRecordDefs, configuration, readPluginSheet);

  return (entry: CssDocEntry): string | undefined =>
    generateImportSnippet(entry, pluginImportByName, recordSheet);
}

/**
 * Prepend a short landing-page blurb to the generated CSS index (idempotent), mirroring the API
 * overview style while keeping cssdoc-generated tables and section ordering intact.
 */
export function writeCssIndexBlurb(
  outSubdir: string,
  cssIndexPath: string = join(docsRoot, "api", outSubdir, "index.md"),
): void {
  const cssIndex = readFileSync(cssIndexPath, "utf8");
  if (!cssIndex.includes(CSS_OVERVIEW_BLURB)) {
    const heading = "# CSS API reference\n\n";
    const withBlurb = cssIndex.startsWith(heading)
      ? `${heading}${CSS_OVERVIEW_BLURB}\n\n${cssIndex.slice(heading.length)}`
      : `# CSS API reference\n\n${CSS_OVERVIEW_BLURB}\n\n${cssIndex}`;
    writeFileSync(cssIndexPath, withBlurb);
  }
}

/** Drift guard: every consumed token must exist in the IR (a typo'd var() is a build failure). */
export function assertNoUnknownReferences(css: string): void {
  const missing = unknownReferences(css, tokens).filter(
    (r) => !r.startsWith("--instui-elevation-") && !r.startsWith("--instui-focus-outline-"),
  );
  if (missing.length) {
    throw new Error(`CSS API: ${missing.length} unknown token reference(s): ${missing.join(", ")}`);
  }
}

/** A `typedoc-vitepress-theme`-compatible sidebar node (mirrors `@cssdoc/markdown`'s `SidebarItem`). */
interface SidebarItem {
  text: string;
  link?: string;
  collapsed?: boolean;
  items?: SidebarItem[];
}

/**
 * `buildSidebar` (from `@cssdoc/markdown`, via `emitCssApi`) lists every record as a flat sibling within
 * its group, so a `@memberOf` sub-component (e.g. `breadcrumb.link`) sits next to its parent (`breadcrumb`)
 * rather than nested under it — both land at the same VitePress sidebar depth. Re-nest each member under
 * its parent's `items` within the CSS section named `label`, using the `memberOf` already carried on
 * `entries`, and drop the now-redundant `<parent>.` prefix from its label (`breadcrumb.link` -> `link`).
 * Parents/members not found in the same group are left flat (defensive: a stale or cross-group
 * `@memberOf` shouldn't break the build or drop a page from the nav).
 */
export function nestCssSidebarMembers(
  sidebarItems: readonly SidebarItem[],
  entries: readonly CssDocEntry[],
  label: string,
): SidebarItem[] {
  const entryByName = new Map(entries.map((e) => [e.name, e]));

  /** Get the parent component name for an item, if it exists in the group. */
  // fallow-ignore-next-line complexity
  const getParent = (
    item: SidebarItem,
    byText: Map<string, SidebarItem>,
  ): SidebarItem | undefined => {
    const parentName = entryByName.get(item.text)?.memberOf?.component;
    return parentName && byText.has(parentName) && byText.get(parentName) !== byText.get(item.text)
      ? byText.get(parentName)
      : undefined;
  };

  /** Compute the display label for a child item (strip parent prefix). */
  const getChildLabel = (childText: string, parentName: string): string =>
    childText.startsWith(`${parentName}.`) ? childText.slice(parentName.length + 1) : childText;

  const nestGroup = (groupItems: readonly SidebarItem[]): SidebarItem[] => {
    const byText = new Map(groupItems.map((item) => [item.text, { ...item }]));
    const topLevel: string[] = [];

    for (const item of groupItems) {
      const parent = getParent(item, byText);
      if (parent) {
        const child = byText.get(item.text)!;
        const parentName = entryByName.get(item.text)!.memberOf!.component!;
        const label = getChildLabel(child.text, parentName);
        parent.items = [...(parent.items ?? []), { ...child, text: label }];
        parent.collapsed = true;
      } else {
        topLevel.push(item.text);
      }
    }

    return topLevel.map((text) => byText.get(text)!);
  };

  const nestSection = (item: SidebarItem): SidebarItem =>
    item.text === label && item.items
      ? {
          ...item,
          items: item.items.map((group) =>
            group.items ? { ...group, items: nestGroup(group.items) } : group,
          ),
        }
      : item;

  return sidebarItems.map(nestSection);
}

/** Generate the CSS API reference: index sheet-local vars, then emit every record via `emitCssApi`. */
export const build = (): void => {
  // The component sheet is the primary source; base/utilities/prose carry the non-component records
  // (@rule/@utility/@declaration). All four feed the emitter so every record is picked up in one pass.
  const sheets = ["components.css", "utilities.css", "prose.css", "base.css"];
  const cssPaths = sheets.map(cssPath);
  const css = sheets.map(readCss).join("\n");

  const PLUGIN_RECORDS = pluginRecords();
  const pluginSheet = (r: PluginRecord): string => join(repoRoot, r.pkg, "generated", r.sheet);
  const pluginPaths = PLUGIN_RECORDS.map(pluginSheet);

  // Index the sheet-local custom properties, then rebuild the resolver with them in scope.
  indexLocalVars([css, readCss("base.css"), ...pluginPaths.map((p) => readFileSync(p, "utf8"))]);
  rebuildResolver();

  // Load the repo's shared cssdoc.json (root) — the single declarative config that also drives the lint
  // plugins and the per-record test guard. `configFile` feeds `emitCssApi` (parse config + `render`
  // order/heading); `configuration` is its parse view, reused locally for `parseCssDocs`.
  const componentsRoot = join(generatedCssDir, "..");
  const configFile = CssDocConfigFile.loadForFolder(repoRoot);
  const configuration = configFile.toConfiguration();

  const resolveSource = makeSourceResolver(componentsRoot, PLUGIN_RECORDS);
  const importSnippet = makeImportSnippet(sheets, PLUGIN_RECORDS, pluginSheet, configuration);

  const outSubdir = "css";
  const cssSectionLabel = "CSS";
  const { entries, sidebarMerged } = emitCssApi({
    outputDirectory: join(docsRoot, "api"),
    css: [...cssPaths, ...pluginPaths],
    outSubdir,
    label: cssSectionLabel,
    baseHref: "/api/css/",
    // The four record kinds first, then the plugins' `@group Plugins` subsection last.
    groups: ["Components", "Utilities", "Rules", "Declarations", "Layouts", "Plugins"],
    configFile,
    classNames,
    resolveToken,
    resolveSource,
    importSnippet,
  });

  // `buildSidebar` lists members as flat siblings of their parent; re-nest them so the sidebar reflects
  // the `@memberOf` hierarchy (see `nestCssSidebarMembers`).
  if (sidebarMerged) {
    const sidebarPath = join(docsRoot, "api", "typedoc-sidebar.json");
    const sidebar = JSON.parse(readFileSync(sidebarPath, "utf8")) as SidebarItem[];
    writeFileSync(
      sidebarPath,
      JSON.stringify(nestCssSidebarMembers(sidebar, entries, cssSectionLabel), null, 2),
    );
  }

  writeCssIndexBlurb(outSubdir);

  // `@cssdoc/markdown` keeps `@example` as a plain code fence (generic — it can't assume the host loads
  // the component CSS). Our docs do, so `demoMarkdownIt` seams a live preview onto each fence at compile
  // time (see `.vitepress/config.ts`); the generated `.md` here stays a plain source fence.

  assertNoUnknownReferences(css);

  console.log(
    `✓ CSS API: wrote ${entries.length} record page(s) to api/css/` +
      `${sidebarMerged ? " + merged the CSS section into the TypeDoc sidebar" : ""}`,
  );
};

// Run only as a script (not when imported by tests, which exercise the exported helpers directly).
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) build();
