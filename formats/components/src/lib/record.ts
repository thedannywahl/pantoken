/**
 * The single canonical way to author a documented CSS record: structured metadata + a CSS body →
 * a `/** … *\/` cssdoc comment (rendered by {@link renderDocBlock}) prepended to the CSS
 * ({@link record}). Replaces the old hand-written-comment-inside-a-template-literal style, so authors
 * write plain data (no backtick/`${` escaping) and every record's doc block is formatted identically.
 *
 * @module
 */
import type { CssRecordKind } from "@cssdoc/core";

/** A `@modifier` line: a description, OR a deprecation note (rendered `— @deprecated <note>`). */
export interface ModifierMeta {
  /** The modifier class WITH its leading dash, e.g. `-color-secondary`. */
  name: string;
  description?: string;
  deprecated?: string;
}

/** A `@part` line. `name` is the class WITH its leading dot, e.g. `.item`. */
export interface PartMeta {
  name: string;
  description?: string;
}

/** A `@cssproperty` line. */
export interface CssPropertyMeta {
  name: string;
  syntax?: string;
  description?: string;
}

/**
 * The authored content of one record — mirrors `@cssdoc/core`'s `ParsedDoc` so the render → parse
 * round-trip reproduces today's model exactly. Modifier/part order is irrelevant (cssdoc sorts them).
 */
export interface RecordMeta {
  kind: CssRecordKind;
  name: string;
  summary?: string;
  /** Explicit `@class`; omit to let cssdoc infer the base class from the CSS (the common case). */
  className?: string;
  modifiers?: ModifierMeta[];
  parts?: PartMeta[];
  cssProperties?: CssPropertyMeta[];
  /** Each entry → one `@example` block; multi-line HTML, verbatim. */
  examples?: string[];
  /** The indented HTML tree for `@structure`, verbatim. */
  structure?: string;
  demo?: string;
  deprecated?: string;
  see?: string[];
}

const TAG: Record<CssRecordKind, string> = {
  component: "@component",
  utility: "@utility",
  rule: "@rule",
  declaration: "@declaration",
};

/** Render a {@link RecordMeta} as a `/** … *\/` doc comment (the cssdoc grammar, one tag per line). */
export function renderDocBlock(meta: RecordMeta): string {
  const lines: string[] = [`${TAG[meta.kind]} ${meta.name}`];
  if (meta.className) lines.push(`@class ${meta.className}`);
  if (meta.summary) lines.push(`@summary ${meta.summary}`);
  for (const m of meta.modifiers ?? [])
    lines.push(
      `@modifier ${m.name} — ${m.deprecated ? `@deprecated ${m.deprecated}` : m.description}`,
    );
  for (const p of meta.parts ?? [])
    lines.push(`@part ${p.name}${p.description ? ` — ${p.description}` : ""}`);
  for (const c of meta.cssProperties ?? [])
    lines.push(
      `@cssproperty ${c.name}${c.syntax ? ` ${c.syntax}` : ""}${c.description ? ` — ${c.description}` : ""}`,
    );
  for (const ex of meta.examples ?? []) lines.push(`@example\n${ex}`);
  if (meta.structure) lines.push(`@structure\n${meta.structure}`);
  if (meta.deprecated) lines.push(`@deprecated ${meta.deprecated}`);
  if (meta.demo) lines.push(`@demo ${meta.demo}`);
  for (const s of meta.see ?? []) lines.push(`@see ${s}`);

  // Frame every line as ` * …` (blank lines as ` *`). stripCommentFraming removes exactly this, so
  // multi-line @example/@structure content survives verbatim (indentation is measured relative).
  const body = lines
    .join("\n")
    .split("\n")
    .map((l) => (l === "" ? " *" : ` * ${l}`))
    .join("\n");
  return `/**\n${body}\n */`;
}

/** Compose a record's emitted CSS: the doc block, then the trimmed CSS body. */
export function record(meta: RecordMeta, css: string): string {
  return `${renderDocBlock(meta)}\n${css.trim()}\n`;
}
