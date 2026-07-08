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
import { parseCssDocs, type CssDocEntry } from "@cssdoc/core";
import { tokens } from "@pantoken/tokens";
import { unknownReferences } from "@pantoken/utils";

const require = createRequire(import.meta.url);
const docsRoot = join(import.meta.dirname, "..");
const outDir = join(docsRoot, "api", "css");
const demosDir = join(docsRoot, "demos");

const tokenByName = new Map(tokens.map((t) => [t.name, t]));

/** A GFM table-cell-safe rendering of prose (escape pipes; empty falls back to an em dash). */
const cell = (text: string | undefined): string => (text ? text.replace(/\|/gu, "\\|") : "—");

/** The demo spec for a component: the authored `@demo`, else `self:<name>` when a demo file exists. */
function demoSpec(entry: CssDocEntry): string | undefined {
  if (entry.demo) return entry.demo;
  return existsSync(join(demosDir, `${entry.name}.html`)) ? `self:${entry.name}` : undefined;
}

/** One component page. */
function renderPage(entry: CssDocEntry): string {
  const lines: string[] = [`# CSS: ${entry.name}`, ""];
  lines.push(`\`${entry.className}\`${entry.summary ? ` — ${entry.summary}` : ""}`, "");
  if (entry.deprecated) lines.push(`> [!WARNING]`, `> Deprecated — ${entry.deprecated}`, "");

  const spec = demoSpec(entry);
  if (spec) lines.push("```demo", spec, "```", "");

  if (entry.modifiers.length) {
    lines.push("## Modifiers", "", "| Modifier | Description |", "| --- | --- |");
    for (const m of entry.modifiers) {
      const desc = m.deprecated
        ? `_Deprecated_ — use \`.${m.deprecated.canonical}\`.${m.description ? ` ${m.description}` : ""}`
        : cell(m.description);
      lines.push(`| \`.${m.name}\` | ${desc} |`);
    }
    lines.push("");
  }

  if (entry.parts.length) {
    lines.push("## Parts", "", "| Part | Description |", "| --- | --- |");
    for (const p of entry.parts) lines.push(`| \`.${p.name}\` | ${cell(p.description)} |`);
    lines.push("");
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

  if (entry.cssPropertiesConsumed.length) {
    lines.push("## Tokens consumed", "", "| Token | Type | Themed |", "| --- | --- | --- |");
    for (const name of entry.cssPropertiesConsumed) {
      const token = tokenByName.get(name);
      const type = token?.syntax && token.syntax !== "*" ? `\`${token.syntax}\`` : "—";
      const themed = token?.themed ? "yes" : "—";
      lines.push(`| \`${name}\` | ${type} | ${themed} |`);
    }
    lines.push("");
  }

  return `${lines.join("\n")}\n`;
}

/** The index page: every documented component with its summary. */
function renderIndex(entries: CssDocEntry[]): string {
  const lines = [
    "# CSS API reference",
    "",
    "Class-based component styles from `@pantoken/components`, generated from the CSS itself — the",
    "modifiers, parts, and tokens below are extracted from the shipping stylesheet, so they can't drift.",
    "",
    "| Component | Class | Summary |",
    "| --- | --- | --- |",
  ];
  for (const e of entries) {
    lines.push(`| [${e.name}](/api/css/${e.name}.md) | \`${e.className}\` | ${cell(e.summary)} |`);
  }
  return `${lines.join("\n")}\n`;
}

const readCss = (subpath: string): string =>
  readFileSync(require.resolve(`@pantoken/components/${subpath}`), "utf8");

const build = (): void => {
  // The component sheet is the primary source; utilities/prose can carry doc-comments too and are
  // concatenated so their @component records are picked up in the same pass.
  const css = [readCss("components.css"), readCss("utilities.css"), readCss("prose.css")].join(
    "\n",
  );
  const entries = parseCssDocs(css).sort((a, b) => a.name.localeCompare(b.name));

  mkdirSync(outDir, { recursive: true });
  for (const entry of entries) writeFileSync(join(outDir, `${entry.name}.md`), renderPage(entry));
  writeFileSync(join(outDir, "index.md"), renderIndex(entries));

  const sidebar = [
    { text: "Overview", link: "/api/css/" },
    ...entries.map((e) => ({ text: e.name, link: `/api/css/${e.name}.md` })),
  ];
  writeFileSync(join(outDir, "css-sidebar.json"), `${JSON.stringify(sidebar, null, 2)}\n`);

  // Drift guard: every consumed token must exist in the IR (a typo'd var() is a build failure).
  const missing = unknownReferences(css, tokens).filter(
    (r) => !r.startsWith("--instui-elevation-") && !r.startsWith("--instui-focus-outline-"),
  );
  if (missing.length) {
    throw new Error(`CSS API: ${missing.length} unknown token reference(s): ${missing.join(", ")}`);
  }

  console.log(`✓ CSS API: wrote ${entries.length} component page(s) + index + sidebar to api/css/`);
};

build();
