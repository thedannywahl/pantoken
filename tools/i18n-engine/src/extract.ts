/**
 * The real `docs.guides` extractor — Phase 2 of the localization-engine plan
 * (`.claude/plans/localization-engine.md`). Promotes the offset-splice technique proven in the
 * Phase 0 spike (`docs/scripts/offset-splice-spike.ts`) into the engine.
 *
 * Scope for this increment: only prose `text` mdast nodes are extracted (paragraphs, headings, list
 * items, table cells, link text). Code fences (`html`/`jsx`/`mermaid`/etc.) stay preserved verbatim —
 * translating prose INSIDE a fence needs the `embedded:html`/`embedded:shell`/`embedded:mermaid`
 * sub-extractors, which are real Phase 4 production work, not this MVP.
 *
 * @module
 */
import { globSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { unified } from "unified";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import { visit } from "unist-util-visit";
import type { CatalogUnit } from "./units.ts";

/** A translatable leaf: an absolute `[start, end)` byte range into the source string. */
export interface ProseRange {
  start: number;
  end: number;
  text: string;
}

/** One extracted unit for a POT template: the source text plus where it came from. */
export interface ExtractedUnit extends CatalogUnit {
  msgid: string;
  /** `"<repo-relative path>:<1-indexed line>"`. */
}

const parser = unified().use(remarkParse).use(remarkGfm);

interface MdastNode {
  type: string;
  position?: { start: { line?: number; offset?: number }; end: { offset?: number } };
}

/** Collect every non-blank prose `text` node's absolute range — never a `code`/`inlineCode` leaf. */
export function collectProseRanges(source: string): ProseRange[] {
  const tree = parser.parse(source);
  const ranges: ProseRange[] = [];
  visit(tree, (rawNode) => {
    const node = rawNode as MdastNode;
    if (node.type !== "text") return;
    const start = node.position?.start.offset;
    const end = node.position?.end.offset;
    if (start === undefined || end === undefined) return;
    const text = source.slice(start, end);
    if (text.trim() === "") return;
    ranges.push({ start, end, text });
  });
  return ranges;
}

/** Extract POT-ready units from one file's already-read `source`. */
export function extractFileUnits(source: string, filePath: string): ExtractedUnit[] {
  return collectProseRanges(source).map((range) => {
    const line = source.slice(0, range.start).split("\n").length;
    return {
      msgid: range.text,
      reference: `${filePath}:${String(line)}`,
      translate: "always",
    };
  });
}

/** Every `docs.guides` file under `docsRoot`'s `guide/` subdirectory, sorted, relative to `docsRoot`. */
export function listGuideFiles(docsRoot: string): string[] {
  return globSync("guide/**/*.md", { cwd: docsRoot }).sort();
}

/** Extract every `docs.guides` file under `docsRoot` (its `guide/` subdirectory, recursively). */
export function extractGuideSpace(docsRoot: string): ExtractedUnit[] {
  return listGuideFiles(docsRoot).flatMap((file) =>
    extractFileUnits(readFileSync(join(docsRoot, file), "utf8"), file),
  );
}

/**
 * Splice `resolve`d prose back into `source` — descends by offset so earlier splices don't shift
 * later ones. `resolve` returning its input verbatim (the identity function) round-trips exactly.
 */
export function renderRanges(
  source: string,
  ranges: readonly ProseRange[],
  resolve: (text: string) => string,
): string {
  const orderedRanges = [...ranges].sort((a, b) => b.start - a.start);
  let out = source;
  for (const range of orderedRanges) {
    out = out.slice(0, range.start) + resolve(range.text) + out.slice(range.end);
  }
  return out;
}

/** Splice resolved prose units back into a source file without reserializing its syntax tree. */
export function renderFile(source: string, resolve: (text: string) => string): string {
  return renderRanges(source, collectProseRanges(source), resolve);
}
