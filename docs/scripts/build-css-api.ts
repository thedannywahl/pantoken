/**
 * Generate the CSS API reference pages from the shipped component/utility stylesheets.
 *
 * This is the pantoken-specific emitter that sits on top of the generic `@cssdoc/core` (which
 * parses the CSS doc-comment grammar + the AST into a model). Here we cross-reference the `--instui-*`
 * token IR (type + light/dark) and write VitePress markdown into `docs/api/css/**` — one page per
 * documented component, an index, and a sidebar JSON in the same shape TypeDoc emits — so the pages
 * theme identically and each embeds its live `self:<name>` demo.
 *
 * Runs after `docs:api:en` (TypeDoc cleans `docs/api`, so this must come after) and before
 * `docs:api:locales`/vitepress.
 */
import { createRequire } from "node:module";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import {
  parseCssDocs,
  toMermaid,
  type CssDocEntry,
  type CssRecordKind,
  type StructureNode,
} from "@cssdoc/core";
import { tokens, type Token } from "@pantoken/tokens";
import { makeResolver, unknownReferences } from "@pantoken/utils";

// Sidebar/index groups, in display order. Only kinds with records show up.
const KIND_GROUPS: { kind: CssRecordKind; label: string }[] = [
  { kind: "component", label: "Components" },
  { kind: "utility", label: "Utilities" },
  { kind: "rule", label: "Rules" },
  { kind: "declaration", label: "Declarations" },
];

const require = createRequire(import.meta.url);
const docsRoot = join(import.meta.dirname, "..");
const outDir = join(docsRoot, "api", "css");
const demosDir = join(docsRoot, "demos");

const tokenByName = new Map(tokens.map((t) => [t.name, t]));

// Resolve a token value to its concrete form: expand every `var(...)` down to primitives, keeping a
// `light-dark(a, b)` pair intact (no `mode`), so a themed value shows both its light and dark result.
// Rebuilt in build() once the sheet-local custom properties are indexed, so `var(--pantoken-*)`
// references (e.g. the toggle geometry `calc()`s) resolve too.
let resolveValue = makeResolver(tokens);

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
 * Custom properties defined in the sheets themselves (not the token IR) — the `--instui-elevation-*`
 * shadows and `--instui-focus-outline-*` ring — so their values can be resolved too. Populated by
 * {@link build} before rendering.
 */
const localVars = new Map<string, string>();

/**
 * Escape prose for VitePress markdown, which compiles through Vue's SFC parser: a raw `<tag>` reads as
 * an (unclosed) HTML element and a `{{ }}` as interpolation. Backticked code spans are exempt (Vue
 * skips them), so only free prose from doc comments needs this.
 */
const escProse = (text: string): string =>
  // Split out backtick code spans (VitePress renders them `v-pre`, so `<`/`{{` are already inert there)
  // and escape only the free-prose segments — otherwise a `\`-icon-<name>\`` span leaks literal entities.
  text
    .split(/(`[^`]*`)/gu)
    .map((seg, i) =>
      i % 2 === 1
        ? seg
        : seg.replace(/</gu, "&lt;").replace(/>/gu, "&gt;").replace(/\{\{/gu, "&#123;&#123;"),
    )
    .join("");

/** A GFM table-cell-safe rendering of prose (escape pipes + Vue-unsafe chars; empty → em dash). */
const cell = (text: string | undefined): string =>
  text ? escProse(text).replace(/\|/gu, "\\|") : "—";

/** The demo spec for a component: the authored `@demo`, else `self:<name>` when a demo file exists. */
function demoSpec(entry: CssDocEntry): string | undefined {
  if (entry.demo) return entry.demo;
  return existsSync(join(demosDir, `${entry.name}.html`)) ? `self:${entry.name}` : undefined;
}

/** Flatten a `@structure` tree into indented text lines (two spaces per depth level). */
function renderTree(nodes: StructureNode[], depth = 0): string[] {
  const out: string[] = [];
  for (const n of nodes) {
    out.push(`${"  ".repeat(depth)}${n.selector}`);
    out.push(...renderTree(n.children, depth + 1));
  }
  return out;
}

/** One record page. */
function renderPage(entry: CssDocEntry): string {
  const lines: string[] = [`# CSS: ${entry.name}`, ""];
  lines.push(`\`${entry.className}\`${entry.summary ? ` — ${escProse(entry.summary)}` : ""}`, "");
  if (entry.deprecated)
    lines.push(`> [!WARNING]`, `> Deprecated — ${escProse(entry.deprecated)}`, "");

  const spec = demoSpec(entry);
  if (spec) lines.push("```demo", spec, "```", "");

  // The static markup (authored `@example`). Fenced code is exempt from Vue parsing, so raw HTML is fine.
  if (entry.examples.length) {
    lines.push("## Example", "");
    for (const ex of entry.examples) lines.push("```html", ex, "```", "");
  }

  if (entry.modifiers.length) {
    lines.push("## Modifiers", "", "| Modifier | Description |", "| --- | --- |");
    for (const m of entry.modifiers) {
      let desc: string;
      if (m.deprecated) {
        // A canonical alias renders as "use `.-x`"; an authored note carries its own guidance verbatim.
        const via = m.deprecated.canonical
          ? `use \`.${m.deprecated.canonical}\`.`
          : (m.deprecated.note ?? "");
        const tail = m.description ? ` ${m.description}` : "";
        desc = `_Deprecated_ — ${escProse(via + tail)}`.replace(/\|/gu, "\\|");
      } else {
        desc = cell(m.description);
      }
      lines.push(`| \`.${m.name}\` | ${desc} |`);
    }
    lines.push("");
  }

  if (entry.parts.length) {
    lines.push("## Parts", "", "| Part | Description |", "| --- | --- |");
    for (const p of entry.parts) lines.push(`| \`.${p.name}\` | ${cell(p.description)} |`);
    lines.push("");
  }

  // The HTML shape (authored `@structure`): an indented tree plus a Mermaid diagram of the same tree,
  // so the Parts above read in context. Both fenced, so no Vue-escaping needed.
  if (entry.structure?.length) {
    lines.push("## Structure", "", "```text", ...renderTree(entry.structure), "```", "");
    const mermaid = toMermaid(entry.structure);
    if (mermaid) lines.push("```mermaid", mermaid, "```", "");
  }

  if (entry.cssPropertiesDeclared.length) {
    lines.push(
      "## Custom properties",
      "",
      "| Property | Type | Description |",
      "| --- | --- | --- |",
    );
    for (const p of entry.cssPropertiesDeclared) {
      lines.push(
        `| \`${p.name}\` | ${p.syntax ? `\`${p.syntax}\`` : "—"} | ${cell(p.description)} |`,
      );
    }
    lines.push("");
  }

  // A `@cssproperty`-declared custom property is the component's own settable knob — it belongs in
  // "Custom properties," not also in "Tokens consumed," so the two tables stay non-overlapping.
  const declaredNames = new Set(entry.cssPropertiesDeclared.map((p) => p.name));
  const consumed = entry.cssPropertiesConsumed.filter((name) => !declaredNames.has(name));
  if (consumed.length) {
    lines.push("## Tokens consumed", "", "| Token | Type | Value |", "| --- | --- | --- |");
    for (const name of consumed) {
      const syntax = resolveSyntax(name);
      // A `|` (a keyword enumeration, or a resolved value) must be escaped even inside a code span in a
      // GFM table cell.
      const escCode = (s: string): string => `\`${s.replace(/\|/gu, "\\|")}\``;
      const type = syntax ? escCode(syntax) : "—";
      // IR tokens carry a value; the locally-defined ones (elevation shadows, the focus ring) come from
      // the sheets. Resolve either to concrete form — a `light-dark(a, b)` result shows it's themed, so
      // no separate Themed column is needed.
      const raw = tokenByName.get(name)?.value ?? localVars.get(name);
      const resolved = raw ? resolveValue(raw) : "";
      const value = resolved ? escCode(resolved) : "—";
      lines.push(`| \`${name}\` | ${type} | ${value} |`);
    }
    lines.push("");
  }

  return `${lines.join("\n")}\n`;
}

/** The index page: records grouped by kind, each a table with its summary. */
function renderIndex(entries: CssDocEntry[]): string {
  const lines = [
    "# CSS API reference",
    "",
    "Class-based styles from `@pantoken/components`, generated from the CSS itself — the modifiers,",
    "parts, and tokens below are extracted from the shipping stylesheet, so they can't drift.",
    "",
  ];
  for (const g of KIND_GROUPS) {
    const group = entries.filter((e) => e.kind === g.kind);
    if (!group.length) continue;
    lines.push(`## ${g.label}`, "", "| Name | Class | Summary |", "| --- | --- | --- |");
    for (const e of group) {
      lines.push(
        `| [${e.name}](/api/css/${e.name}.md) | \`${e.className}\` | ${cell(e.summary)} |`,
      );
    }
    lines.push("");
  }
  return `${lines.join("\n")}\n`;
}

const readCss = (subpath: string): string =>
  readFileSync(require.resolve(`@pantoken/components/${subpath}`), "utf8");

const build = (): void => {
  // The component sheet is the primary source; base/utilities/prose carry the non-component records
  // (@rule/@utility/@declaration) and are concatenated so every record is picked up in one pass.
  const css = [
    readCss("components.css"),
    readCss("utilities.css"),
    readCss("prose.css"),
    readCss("base.css"),
  ].join("\n");
  const entries = parseCssDocs(css).sort((a, b) => a.name.localeCompare(b.name));

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

  mkdirSync(outDir, { recursive: true });
  for (const entry of entries) writeFileSync(join(outDir, `${entry.name}.md`), renderPage(entry));
  writeFileSync(join(outDir, "index.md"), renderIndex(entries));

  const sidebar: Record<string, unknown>[] = [{ text: "Overview", link: "/api/css/" }];
  for (const g of KIND_GROUPS) {
    const items = entries
      .filter((e) => e.kind === g.kind)
      .map((e) => ({ text: e.name, link: `/api/css/${e.name}.md` }));
    if (items.length) sidebar.push({ text: g.label, collapsed: false, items });
  }
  writeFileSync(join(outDir, "css-sidebar.json"), `${JSON.stringify(sidebar, null, 2)}\n`);

  // Drift guard: every consumed token must exist in the IR (a typo'd var() is a build failure).
  const missing = unknownReferences(css, tokens).filter(
    (r) => !r.startsWith("--instui-elevation-") && !r.startsWith("--instui-focus-outline-"),
  );
  if (missing.length) {
    throw new Error(`CSS API: ${missing.length} unknown token reference(s): ${missing.join(", ")}`);
  }

  console.log(`✓ CSS API: wrote ${entries.length} record page(s) + index + sidebar to api/css/`);
};

build();
