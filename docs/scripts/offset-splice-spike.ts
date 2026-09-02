/**
 * Phase 0 item 2 spike (`.claude/plans/localization-engine.md`): proves the offset-splice extraction
 * technique — identify translatable ranges with the mdast AST, substitute by absolute byte offset,
 * never re-stringify — is lossless on the real generated docs corpus.
 *
 * This is deliberately NOT the full Phase 2/4 extractor (no HTML/shell/mermaid sub-extraction, no
 * classification into glossary/prose/table/callout). It collects every leaf text-bearing mdast node
 * (`text`, `inlineCode`, `code`) as an opaque range and proves:
 *
 * 1. `splice(md, collectLeafRanges(md), identity) === md` for every real generated `.md` file
 *    (`docs/api/**`, `docs/guide/**`) — including files containing an `html`-lang fence, the
 *    `embedded:shell` agent-bootstrap prompt, and a `mermaid` diagram (all handled as opaque code
 *    leaves here; only their presence in the round-trip corpus is asserted).
 * 2. One real recursive case — a fenced ` ```md ` block — recurses the same collector into the
 *    fence's inner text and maps child offsets back to absolute document offsets, contributing only
 *    the children's ranges (never the fence node's own), so nothing overlaps.
 * 3. `assertDisjoint` rejects a deliberately broken extractor that contributes both a parent range
 *    and one of its children's ranges.
 *
 * @module
 */
import { unified } from "unified";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import { visit } from "unist-util-visit";

/** One translatable leaf: an absolute `[start, end)` byte range into the ORIGINAL source string. */
export interface LeafRange {
  start: number;
  end: number;
  text: string;
  kind: "text" | "inlineCode" | "code" | "embedded:markdown";
}

const parser = unified().use(remarkParse).use(remarkGfm);

/** A minimal mdast node shape: enough to recurse without pulling in the full `mdast` types package. */
interface MdastNode {
  type: string;
  lang?: string | null;
  value?: string;
  position?: { start: { offset?: number }; end: { offset?: number } };
}

/**
 * Collect every leaf text range in `md`, recursing into ` ```md ` fences (mapping child offsets back
 * to absolute document offsets via `baseOffset`). A fence's own range is NEVER included when it
 * recurses — only its children's — so the result stays disjoint by construction.
 */
export function collectLeafRanges(md: string, baseOffset = 0): LeafRange[] {
  const tree = parser.parse(md);
  const ranges: LeafRange[] = [];
  visit(tree, (rawNode) => {
    const node = rawNode as MdastNode;
    const start = node.position?.start.offset;
    const end = node.position?.end.offset;
    if (start === undefined || end === undefined) return;

    if (node.type === "code" && node.lang === "md") {
      // Recurse into the fence's inner text only — never push this node's own [start, end).
      const inner = md.slice(start, end);
      const fenceMatch = /^```md\n/.exec(inner);
      const innerStart = fenceMatch ? start + fenceMatch[0].length : start;
      const innerText = node.value ?? "";
      ranges.push(...collectLeafRanges(innerText, innerStart));
      return;
    }
    if (node.type === "text" || node.type === "inlineCode" || node.type === "code") {
      ranges.push({
        start: start + baseOffset,
        end: end + baseOffset,
        text: md.slice(start, end),
        kind: node.type,
      });
    }
  });
  return ranges;
}

/**
 * Assert `ranges` are disjoint leaves (sorted ascending by `start`, each range ends at or before the
 * next one starts). Throws loudly on any containment or overlap — an extractor bug, never a
 * plausible-looking output to emit silently.
 */
export function assertDisjoint(ranges: readonly LeafRange[]): void {
  const sorted = [...ranges].sort((a, b) => a.start - b.start);
  for (let i = 0; i < sorted.length - 1; i += 1) {
    const current = sorted[i];
    const next = sorted[i + 1];
    if (current.end > next.start) {
      throw new Error(
        `Overlapping/contained ranges: [${String(current.start)}, ${String(current.end)}) and ` +
          `[${String(next.start)}, ${String(next.end)})`,
      );
    }
  }
}

/**
 * Splice `ranges` back into `source`, resolving each via `resolve`. Descends by offset (reverse of
 * the assert-checked ascending sort) so earlier splices don't shift later offsets.
 */
export function splice(
  source: string,
  ranges: readonly LeafRange[],
  resolve: (text: string, kind: LeafRange["kind"]) => string,
): string {
  assertDisjoint(ranges);
  const descending = [...ranges].sort((a, b) => b.start - a.start);
  let out = source;
  for (const range of descending) {
    out = out.slice(0, range.start) + resolve(range.text, range.kind) + out.slice(range.end);
  }
  return out;
}

/** `splice(source, collectLeafRanges(source), identity) === source` — the round-trip identity. */
export function roundTrips(source: string): boolean {
  return splice(source, collectLeafRanges(source), (text) => text) === source;
}
