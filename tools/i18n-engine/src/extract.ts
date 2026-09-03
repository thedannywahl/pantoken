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

/** Extract visible VitePress home-page frontmatter values while leaving routes and structure alone. */
export function extractFrontmatterUnits(source: string, filePath: string): ExtractedUnit[] {
  const lines = source.split("\n");
  if (lines[0]?.trim() !== "---") return [];
  const end = lines.findIndex((line, index) => index > 0 && line.trim() === "---");
  if (end === -1) return [];
  const units: ExtractedUnit[] = [];
  const keyPattern = /^(\s*(?:-\s+)?)(?:text|tagline|title|details):(\s*)(.*)$/u;
  for (let index = 1; index < end; index += 1) {
    const match = keyPattern.exec(lines[index]);
    const value = match?.[3];
    if (!value) continue;
    units.push({
      msgid: value.replace(/&grave;([^&]*?)&grave;/gu, "`$1`"),
      reference: `${filePath}:${String(index + 1)}`,
      translate: "always",
    });
  }
  return units;
}

/** Render translated home-page frontmatter values without reserializing YAML. */
export function renderFrontmatterFile(
  source: string,
  resolve: (text: string) => string,
  locale?: string,
): string {
  const lines = source.split("\n");
  if (lines[0]?.trim() !== "---") return source;
  const end = lines.findIndex((line, index) => index > 0 && line.trim() === "---");
  if (end === -1) return source;
  const keyPattern = /^(\s*(?:-\s+)?)(text|tagline|title|details):(\s*)(.*)$/u;
  const linkPattern = /^(\s*(?:-\s+)?)link:(\s+)(\/.*)$/u;
  for (let index = 1; index < end; index += 1) {
    const link = linkPattern.exec(lines[index]);
    if (link && locale && !link[3].startsWith(`/${locale}/`)) {
      lines[index] = `${link[1]}link:${link[2]}/${locale}${link[3]}`;
      continue;
    }
    const match = keyPattern.exec(lines[index]);
    if (!match?.[4]) continue;
    const normalized = match[4].replace(/&grave;([^&]*?)&grave;/gu, "`$1`");
    const translated = resolve(normalized).replace(/`([^`]*)`/gu, "&grave;$1&grave;");
    lines[index] = `${match[1]}${match[2]}:${match[3]}${translated}`;
  }
  return lines.join("\n");
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
