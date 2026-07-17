/**
 * Split generated API markdown into translatable segments.
 *
 * The locale pipeline used to hash and translate whole `.md` files. Generated docs churn on every
 * build (stability-badge flips, resolved token values, signature edits), so a whole-file key thrashed
 * and the page's prose reverted to English. This module cuts the file into blocks so only real prose
 * carries a content key — the scaffolding around it can change without busting the cache.
 *
 * Each segment is one of:
 * - `preserve` — emitted verbatim (code fences, signatures, breadcrumbs, type/link-only lines, HTML).
 * - `glossary` — deterministic term substitution (section headings, stability-badge pills, table
 *   column labels). Cheap, keyless, never cached.
 * - `prose`    — real translation (descriptions, remarks, `@example` captions, table Description cells).
 * - `table`    — a GFM table parsed into a grid so header labels + Description cells translate while
 *   code columns and structure stay verbatim. Only emitted when the grid rebuilds byte-for-byte to the
 *   source (see the round-trip self-check); otherwise the table falls back to `preserve`.
 *
 * `reassemble(segmentMarkdown(md), (t) => t)` is the identity — the split is lossless.
 *
 * @module
 */

export type TranslationKind = "glossary" | "prose";

export type Segment =
  | { kind: "preserve"; text: string }
  | { kind: "glossary"; text: string }
  | { kind: "prose"; text: string }
  | {
      kind: "table";
      rows: string[][];
      headerRow: number;
      separatorRow: number;
      /** Column indices whose body cells hold prose (a `Description`/`Summary` column). */
      descCols: number[];
    };

/** A translatable unit: source text plus how it should be translated. */
export interface TranslatableUnit {
  text: string;
  kind: TranslationKind;
}

/** How to resolve a translatable unit to its target text. Identity round-trips the source. */
export type Resolve = (text: string, kind: TranslationKind) => string;

/** Strip inline code, markdown links, and HTML tags, then keep only Latin letters. */
const stripNonProse = (input: string): string =>
  input
    .replace(/`[^`]*`/g, " ")
    .replace(/\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[^A-Za-z]+/g, " ")
    .trim();

const hasProseWords = (input: string): boolean => stripNonProse(input).length > 0;

/** A breadcrumb line: starts with a link and chains crumbs with ` / ` (the trailing crumb is plain). */
const isBreadcrumb = (line: string): boolean =>
  /^\[[^\]]+\]\([^)]+\)/.test(line) && line.includes(" / ");

/** An em-dash-only or blank table cell carries no prose. */
const isEmptyCell = (cell: string): boolean => cell === "" || cell === "—" || cell === "-";

/** A body cell worth translating: has prose words and isn't an empty placeholder. */
const isTranslatableCell = (cell: string): boolean => !isEmptyCell(cell) && hasProseWords(cell);

/** A cell carrying a stability-badge pill localizes deterministically, not through the prose engine. */
const cellKind = (cell: string): TranslationKind =>
  cell.includes("pantoken-doc-tag") ? "glossary" : "prose";

const FENCE = /^\s*```/;

/** Split a table row into trimmed cells, honoring `\|`-escaped pipes inside cells. */
const parseRow = (line: string): string[] => {
  let inner = line.trim();
  if (inner.startsWith("|")) inner = inner.slice(1);
  if (inner.endsWith("|")) inner = inner.slice(0, -1);
  return inner.split(/(?<!\\)\|/).map((cell) => cell.trim());
};

const rebuildRow = (cells: string[]): string => `| ${cells.join(" | ")} |`;

/** A GFM separator row: every cell is `---`, `:--`, `--:`, or `:-:`. */
const isSeparatorRow = (line: string): boolean => {
  const cells = parseRow(line);
  return cells.length > 0 && cells.every((cell) => /^:?-+:?$/.test(cell));
};

/** Classify a run of consecutive non-blank, non-fenced lines. */
const classifyBlock = (lines: string[]): Segment => {
  const text = lines.join("\n");
  const first = lines[0];

  // Table: header row + separator. Only translate cells when the grid rebuilds exactly to the source,
  // so anything with unexpected spacing/escaping is preserved whole rather than silently reformatted.
  if (lines.length >= 2 && first.trimStart().startsWith("|") && isSeparatorRow(lines[1])) {
    const rows = lines.map(parseRow);
    if (rows.map(rebuildRow).join("\n") === text) {
      const descCols = rows[0]
        .map((header, index) => (/^(description|summary)$/i.test(header) ? index : -1))
        .filter((index) => index >= 0);
      return { kind: "table", rows, headerRow: 0, separatorRow: 1, descCols };
    }
    return { kind: "preserve", text };
  }

  // Headings and stability-badge pills → deterministic glossary. The glossary no-ops on identifiers
  // (`### options?`) and on words it doesn't know, so routing every heading here is safe.
  if (/^#{1,6}\s/.test(first)) return { kind: "glossary", text };
  if (first.trimStart().startsWith("<")) {
    return { kind: text.includes("pantoken-doc-tag") ? "glossary" : "preserve", text };
  }

  // Signatures/blockquotes, breadcrumbs, and lines that are only links/code/type expressions.
  if (first.trimStart().startsWith(">")) return { kind: "preserve", text };
  if (isBreadcrumb(first)) return { kind: "preserve", text };
  if (!hasProseWords(text)) return { kind: "preserve", text };

  return { kind: "prose", text };
};

/** Split markdown into ordered, lossless segments. */
export function segmentMarkdown(md: string): Segment[] {
  const lines = md.split("\n");
  const segments: Segment[] = [];
  let index = 0;

  // Optional YAML frontmatter (generated API pages don't emit it today, but be safe).
  if (lines[0] === "---") {
    let end = 1;
    while (end < lines.length && lines[end] !== "---") end += 1;
    if (end < lines.length) {
      segments.push({ kind: "preserve", text: lines.slice(0, end + 1).join("\n") });
      index = end + 1;
    }
  }

  let block: string[] = [];
  const flush = (): void => {
    if (block.length > 0) {
      segments.push(classifyBlock(block));
      block = [];
    }
  };

  while (index < lines.length) {
    const line = lines[index];

    if (FENCE.test(line)) {
      flush();
      const start = index;
      index += 1;
      while (index < lines.length && !FENCE.test(lines[index])) index += 1;
      if (index < lines.length) index += 1; // include the closing fence
      segments.push({ kind: "preserve", text: lines.slice(start, index).join("\n") });
      continue;
    }

    if (line.trim() === "") {
      flush();
      const start = index;
      while (index < lines.length && lines[index].trim() === "") index += 1;
      segments.push({ kind: "preserve", text: lines.slice(start, index).join("\n") });
      continue;
    }

    block.push(line);
    index += 1;
  }
  flush();

  return segments;
}

/** Every translatable unit across the segments, in document order (callers dedupe by content). */
export function collectUnits(segments: readonly Segment[]): TranslatableUnit[] {
  const units: TranslatableUnit[] = [];
  for (const segment of segments) {
    if (segment.kind === "glossary" || segment.kind === "prose") {
      units.push({ text: segment.text, kind: segment.kind });
      continue;
    }
    if (segment.kind === "table") {
      for (const header of segment.rows[segment.headerRow]) {
        if (header !== "") units.push({ text: header, kind: "glossary" });
      }
      for (let row = 0; row < segment.rows.length; row += 1) {
        if (row === segment.headerRow || row === segment.separatorRow) continue;
        for (const col of segment.descCols) {
          const cell = segment.rows[row][col];
          if (cell !== undefined && isTranslatableCell(cell)) {
            units.push({ text: cell, kind: cellKind(cell) });
          }
        }
      }
    }
  }
  return units;
}

/** Rebuild markdown from segments, resolving each translatable unit through `resolve`. */
export function reassemble(segments: readonly Segment[], resolve: Resolve): string {
  return segments.map((segment) => renderSegment(segment, resolve)).join("\n");
}

const renderSegment = (segment: Segment, resolve: Resolve): string => {
  switch (segment.kind) {
    case "preserve":
      return segment.text;
    case "glossary":
    case "prose":
      return resolve(segment.text, segment.kind);
    case "table":
      return renderTable(segment, resolve);
  }
};

const renderTable = (segment: Extract<Segment, { kind: "table" }>, resolve: Resolve): string =>
  segment.rows
    .map((cells, row) => {
      const rendered = cells.map((cell, col) => {
        if (row === segment.separatorRow) return cell;
        if (row === segment.headerRow) return cell === "" ? cell : resolve(cell, "glossary");
        if (segment.descCols.includes(col) && isTranslatableCell(cell)) {
          return resolve(cell, cellKind(cell));
        }
        return cell;
      });
      return rebuildRow(rendered);
    })
    .join("\n");
