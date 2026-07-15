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
import { createRequire } from "node:module";
import { readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import { CssDocConfigFile } from "@cssdoc/config";
import { emitCssApi } from "@cssdoc/typedoc";
import { parseCssDocs, type CssDocEntry } from "@cssdoc/core";
import { tokens, type Token } from "@pantoken/tokens";
import { makeResolver, unknownReferences } from "@pantoken/utils";

const require = createRequire(import.meta.url);
const docsRoot = join(import.meta.dirname, "..");

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
 * Infer a CSS `@property` syntax from a resolved token value. Component/semantic tokens carry `syntax:
 * "*"` (they're contextual `var()` aliases or `light-dark()` pairs that can't be a static `@property`
 * type), so the human-meaningful type is derived from what the value ultimately IS.
 */
function inferSyntax(value: string): string | undefined {
  const v = value.trim();
  // A bare url()/data: value (the icon glyphs are url-encoded SVGs) is `<url>`, not the broader `<image>`.
  if (/^url\(|data:/iu.test(v)) return "<url>";
  // Themed values are colours in this system; so are hex / rgb / hsl / oklch / lab / color().
  if (
    /light-dark\s*\(/iu.test(v) ||
    /(#[0-9a-f]{3,8}\b|\b(?:rgb|hsl|hwb|oklch|oklab|lab|lch|color)\()/iu.test(v)
  )
    return "<color>";
  if (/-?\d*\.?\d+(?:px|rem|em|vh|vw|vmin|vmax|svh|svw|ch|ex|cm|mm|in|pt|pc|q|%)\b/iu.test(v))
    return "<length>";
  if (/^-?\d*\.?\d+m?s$/iu.test(v)) return "<time>";
  if (/^-?\d+$/u.test(v)) return "<integer>";
  if (/^-?\d*\.?\d+$/u.test(v)) return "<number>";
  return undefined;
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
 * The human-meaningful syntax of a consumed token: the first concrete `syntax` along its `refersTo`
 * chain, else inferred from the terminal value, else the enumerated keyword set for keyword-valued
 * properties. Returns undefined only when nothing can be derived.
 */
function resolveSyntax(name: string): string | undefined {
  const seen = new Set<string>();
  let token = tokenByName.get(name);
  while (token) {
    if (token.syntax && token.syntax !== "*") return token.syntax;
    if (token.refersTo && !seen.has(token.refersTo)) {
      seen.add(token.refersTo);
      token = tokenByName.get(token.refersTo);
      continue;
    }
    const inferred = token.value ? inferSyntax(token.value) : undefined;
    if (inferred) return inferred;
    break;
  }
  // Composite/keyword property grammar by name (font-family, box-shadow, glyph, …) takes precedence
  // over primitive inference; then fall back to inferring from a sheet-local value.
  const prop = PROPERTY_SYNTAX.find(([re]) => re.test(name))?.[1];
  if (prop) return prop;
  const local = localVars.get(name);
  return local ? inferSyntax(resolveValue(local)) : undefined;
}

/**
 * The `resolveToken` hook `@cssdoc/markdown` calls for each consumed `--instui-*` property: its
 * human-meaningful type ({@link resolveSyntax}) and its concrete value (IR value, else a sheet-local
 * var), resolved down to primitives. Undefined when neither can be derived.
 */
function resolveToken(name: string): { syntax?: string; value?: string } | undefined {
  const syntax = resolveSyntax(name);
  const raw = tokenByName.get(name)?.value ?? localVars.get(name);
  const value = raw ? resolveValue(raw) : undefined;
  return syntax || value ? { syntax, value } : undefined;
}

const cssPath = (subpath: string): string => require.resolve(`@pantoken/components/${subpath}`);
const readCss = (subpath: string): string => readFileSync(cssPath(subpath), "utf8");

/**
 * `classNames` (new in `@cssdoc/markdown` 0.7.2) lets HTML-preserving renderers wrap the deprecation
 * marker — the record-level `> [!WARNING]` banner and every deprecated modifier-table cell — in a
 * `<span class="…">`. We render it as an `instui-pill` in the warning colour (components.css is already
 * loaded on doc pages for the live examples, so the class paints). The extra `pantoken-doc-tag` is a
 * docs-only marker: the shipped pill is a compact fixed-height badge, so `.vitepress/theme/pantoken.css`
 * uses it to relax the pill for the flowing deprecation sentence it wraps — without touching how the
 * real `.instui-pill` renders in a component preview. Release stages aren't authored anywhere in the
 * library yet, so `stage` is left unset (those markers stay plain code spans).
 */
const classNames = { deprecated: "instui-pill -color-warning pantoken-doc-tag" };

// The repo root (this worktree) and its GitHub blob base, for `**Source:**` links.
const repoRoot = join(docsRoot, "..");
const SOURCE_URL_BASE = "https://github.com/thedannywahl/pantoken/blob/main";

/** Map each record name → its authoring source file (repo-relative), by scanning for the record tag. */
function sourceMap(files: string[]): Map<string, string> {
  const RECORD = /@(?:component|utility|rule|declaration)\s+([a-z][\w-]*)/u;
  const map = new Map<string, string>();
  for (const file of files) {
    const m = readFileSync(file, "utf8").match(RECORD);
    if (m && !map.has(m[1])) map.set(m[1], relative(repoRoot, file));
  }
  return map;
}

/** A `resolveSource` hook: link a record to its source file (GitHub blob), labelled with the filename. */
const makeResolveSource =
  (map: Map<string, string>) =>
  (entry: CssDocEntry): { href: string; label?: string } | undefined => {
    const path = map.get(entry.name);
    return path ? { href: `${SOURCE_URL_BASE}/${path}`, label: path.split("/").pop() } : undefined;
  };

/** Every `.ts` under `<componentsRoot>/src/{components,utilities,rules,declarations}` + the color record's generate.ts. */
function componentSources(componentsRoot: string): string[] {
  const files = ["components", "utilities", "rules", "declarations"].flatMap((d) => {
    const dir = join(componentsRoot, "src", d);
    return readdirSync(dir)
      .filter((f) => f.endsWith(".ts"))
      .map((f) => join(dir, f));
  });
  files.push(join(componentsRoot, "scripts", "generate.ts")); // the `color` utility's doc lives here
  return files;
}

const build = (): void => {
  // The component sheet is the primary source; base/utilities/prose carry the non-component records
  // (@rule/@utility/@declaration). All four feed the emitter so every record is picked up in one pass.
  const sheets = ["components.css", "utilities.css", "prose.css", "base.css"];
  const cssPaths = sheets.map(cssPath);
  const css = sheets.map(readCss).join("\n");

  // Index the sheet-local custom properties (elevation shadows in components.css, the focus ring in
  // base.css) so their values resolve like IR tokens — first definition wins.
  for (const m of `${css}\n${readCss("base.css")}`.matchAll(/(--[\w-]+)\s*:\s*([^;{}]+);/gu)) {
    if (!localVars.has(m[1])) localVars.set(m[1], m[2].trim());
  }
  // Rebuild the resolver with the local vars in scope so `var(--pantoken-*)` chains resolve too.
  const localTokens: Token[] = [...localVars].map(([name, value]) => ({
    name,
    value,
    syntax: "*",
    inherits: true,
  }));
  resolveValue = makeResolver([...tokens, ...localTokens]);

  // Load the repo's shared cssdoc.json (root) — the single declarative config that also drives the
  // lint plugins and the per-record test guard, so docs, lint, and tests agree on the record model and
  // section order. `configFile` feeds `emitCssApi` (parse config + `render` section order/heading);
  // `configuration` is its parse view, reused locally for `parseCssDocs`.
  const componentsRoot = join(cssPath("package.json"), "..");
  const configFile = CssDocConfigFile.loadForFolder(repoRoot);
  const configuration = configFile.toConfiguration();

  // `**Source:**` link → each record's authoring `.ts`. `## Usage` import → the sheet the record ships
  // in (a record's own sheet, resolved by parsing each of the four sheets for its record names).
  const resolveSource = makeResolveSource(sourceMap(componentSources(componentsRoot)));
  const recordSheet = new Map<string, string>();
  for (const sheet of sheets)
    for (const e of parseCssDocs(readCss(sheet), { configuration })) recordSheet.set(e.name, sheet);
  const importSnippet = (entry: CssDocEntry): string | undefined => {
    const sheet = recordSheet.get(entry.name);
    return sheet ? `@import "@pantoken/components/${sheet}";` : undefined;
  };

  const outSubdir = "css";
  const { entries, sidebarMerged } = emitCssApi({
    outputDirectory: join(docsRoot, "api"),
    css: cssPaths,
    outSubdir,
    label: "CSS",
    baseHref: "/api/css/",
    configFile,
    classNames,
    resolveToken,
    resolveSource,
    importSnippet,
  });

  // `@cssdoc/markdown` keeps `@example` as a plain code fence (generic — it can't assume the host loads
  // the component CSS). Our docs do, so `demoMarkdownIt` seams a live preview onto each fence at compile
  // time (see `.vitepress/config.ts`); the generated `.md` here stays a plain source fence.

  // Drift guard: every consumed token must exist in the IR (a typo'd var() is a build failure).
  const missing = unknownReferences(css, tokens).filter(
    (r) => !r.startsWith("--instui-elevation-") && !r.startsWith("--instui-focus-outline-"),
  );
  if (missing.length) {
    throw new Error(`CSS API: ${missing.length} unknown token reference(s): ${missing.join(", ")}`);
  }

  console.log(
    `✓ CSS API: wrote ${entries.length} record page(s) to api/css/` +
      `${sidebarMerged ? " + merged the CSS section into the TypeDoc sidebar" : ""}`,
  );

  // ── Web-component shadow CSS ───────────────────────────────────────────────────
  // The web components ship their own hand-authored shadow-DOM styles — a different package, rooted at
  // `:host` with `--drawer-width`-style consumer-set props — so they emit as a SEPARATE sidebar section
  // (its own `outSubdir`, so pages/index/sidebar don't clobber the class-based ones) and sit outside the
  // token-drift guard above (their locals aren't `--instui-*` IR tokens).
  const wcRoot = join(require.resolve("@pantoken/web-components/package.json"), "..");
  const wcCss = [join(wcRoot, "src/elements"), join(wcRoot, "src/lib")].flatMap((dir) =>
    readdirSync(dir)
      .filter((f) => f.endsWith(".css"))
      .sort()
      .map((f) => join(dir, f)),
  );
  // Source links point at each `.css` shadow-style file. No `importSnippet`: web components are used as
  // custom elements (JS import), not by importing a stylesheet, so a CSS `@import` snippet would mislead.
  const wc = emitCssApi({
    outputDirectory: join(docsRoot, "api"),
    css: wcCss,
    outSubdir: "css-web-components",
    label: "Web components CSS",
    baseHref: "/api/css-web-components/",
    configFile,
    classNames,
    resolveToken,
    resolveSource: makeResolveSource(sourceMap(wcCss)),
  });
  console.log(
    `✓ CSS API: wrote ${wc.entries.length} web-component record page(s) to api/css-web-components/` +
      `${wc.sidebarMerged ? " + merged the Web components CSS section into the TypeDoc sidebar" : ""}`,
  );
};

build();
