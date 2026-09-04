/**
 * Split generated API markdown into translatable segments.
 *
 * The locale pipeline used to hash and translate whole `.md` files. Generated docs churn on every
 * build (stability-badge flips, resolved token values, signature edits), so a whole-file key thrashed
 * and the page's prose reverted to English. This module cuts the file into blocks so only real prose
 * carries a content key — the scaffolding around it can change without busting the cache.
 *
 * Each segment is one of:
 * - `preserve` — emitted verbatim (non-prompt code fences, signatures, breadcrumbs, type/link-only lines, HTML).
 * - `prompt` — a prompt fence whose body is translated while its fence markers stay intact.
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

/** How a translatable segment is handled: cheap `glossary` substitution or real `prose` translation. */
export type TranslationKind = "glossary" | "prose";

/**
 * The marker `docs/scripts/build-css-api.ts` prepends to its JS Requirement/Enhancement callout
 * (`jsRequirementCallout`) — recognized here so the bold label and note translate instead of the
 * whole block being swallowed by the generic blockquote `preserve` rule below.
 */
export const JS_CALLOUT_MARKER = "<!-- js-requirement -->";

/** One block of split markdown, tagged by how it should be emitted or translated. */
export type Segment =
  | { kind: "preserve"; text: string }
  | { kind: "prompt"; opening: string; body: string; closing: string }
  | { kind: "glossary"; text: string }
  | { kind: "prose"; text: string }
  | {
      kind: "table";
      rows: string[][];
      headerRow: number;
      separatorRow: number;
      /** Column indices whose body cells hold prose (a `Description`/`Summary` column). */
      descCols: number[];
    }
  | {
      /** The `<!-- js-requirement -->` callout: `marker`/`alertLine` are verbatim, `label` (e.g.
       *  "JS Requirement"/"JS Enhancement") is a fixed glossary term, `note` is real prose. */
      kind: "callout";
      marker: string;
      alertLine: string;
      label: string;
      note: string;
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

/**
 * A block that is only `-flag` tokens (e.g. the standalone `-nocard` paragraph
 * `build-css-api.ts` emits before an `@example` fence). Shares the flag grammar with
 * `tools/demo/src/index.ts`'s flag-token regex — matches `hasProseWords` would otherwise wave
 * through, since stripping the leading `-` still leaves Latin letters.
 */
const isFlagOnly = (text: string): boolean =>
  /^(?:-[a-z][a-z0-9-]*)(?:\s+-[a-z][a-z0-9-]*)*$/u.test(text);

/** An em-dash-only or blank table cell carries no prose. */
const isEmptyCell = (cell: string): boolean => cell === "" || cell === "—" || cell === "-";

/** A body cell worth translating: has prose words and isn't an empty placeholder. */
const isTranslatableCell = (cell: string): boolean => !isEmptyCell(cell) && hasProseWords(cell);

/** A cell carrying a stability-badge pill localizes deterministically, not through the prose engine. */
const cellKind = (cell: string): TranslationKind =>
  cell.includes("pantoken-doc-tag") ? "glossary" : "prose";

const FENCE = /^\s*```/;
const PROMPT_FENCE = /^\s*```prompt\s*$/u;

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

const CALLOUT_LINE_RE = /^> \*\*(.+?)\*\* — (.+)$/u;

/**
 * The `<!-- js-requirement -->`-marked callout `build-css-api.ts` emits: `marker` + `> [!TIP]` +
 * `> **{label}** — {note}`. Only classified as `"callout"` when it rebuilds byte-for-byte to the
 * source (mirrors the table round-trip guard); otherwise `undefined`, and the generic blockquote
 * `preserve` rule in {@link classifyBlock} takes over.
 */
const classifyJsCallout = (lines: string[]): Segment | undefined => {
  if (lines.length !== 3 || lines[0] !== JS_CALLOUT_MARKER || lines[1] !== "> [!TIP]")
    return undefined;
  const match = CALLOUT_LINE_RE.exec(lines[2]);
  if (!match) return undefined;
  const [, label, note] = match;
  return { kind: "callout", marker: lines[0], alertLine: lines[1], label, note };
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

  const callout = classifyJsCallout(lines);
  if (callout) return callout;

  // Headings and stability-badge pills → deterministic glossary. The glossary no-ops on identifiers
  // (`### options?`) and on words it doesn't know, so routing every heading here is safe.
  if (/^#{1,6}\s/.test(first)) return { kind: "glossary", text };
  if (first.trimStart().startsWith("<")) {
    return { kind: text.includes("pantoken-doc-tag") ? "glossary" : "preserve", text };
  }

  // Signatures/blockquotes, breadcrumbs, and lines that are only links/code/type expressions.
  if (first.trimStart().startsWith(">")) return { kind: "preserve", text };
  if (isBreadcrumb(first)) return { kind: "preserve", text };
  if (isFlagOnly(text)) return { kind: "preserve", text };
  if (!hasProseWords(text)) return { kind: "preserve", text };

  return { kind: "prose", text };
};

/**
 * A leading closed `---` YAML frontmatter block as a preserve segment plus the index just past it,
 * or `null` when `lines` doesn't open with one. (Generated API pages don't emit it today, but be safe.)
 */
const takeFrontmatter = (lines: string[]): { segment: Segment; nextIndex: number } | null => {
  if (lines[0] !== "---") return null;
  let end = 1;
  while (end < lines.length && lines[end] !== "---") end += 1;
  if (end >= lines.length) return null;
  return {
    segment: { kind: "preserve", text: lines.slice(0, end + 1).join("\n") },
    nextIndex: end + 1,
  };
};

/** Index just past a fenced code block opening at `start` (includes the closing fence). */
const scanFence = (lines: string[], start: number): number => {
  let index = start + 1;
  while (index < lines.length && !FENCE.test(lines[index])) index += 1;
  if (index < lines.length) index += 1; // include the closing fence
  return index;
};

/** Index just past a run of blank lines starting at `start`. */
const scanBlankRun = (lines: string[], start: number): number => {
  let index = start;
  while (index < lines.length && lines[index].trim() === "") index += 1;
  return index;
};

/** Split markdown into ordered, lossless segments. */
export function segmentMarkdown(md: string): Segment[] {
  const lines = md.split("\n");
  const segments: Segment[] = [];
  let index = 0;

  const frontmatter = takeFrontmatter(lines);
  if (frontmatter) {
    segments.push(frontmatter.segment);
    index = frontmatter.nextIndex;
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
      index = scanFence(lines, start);
      if (PROMPT_FENCE.test(line) && index > start + 1) {
        segments.push({
          kind: "prompt",
          opening: lines[start],
          body: lines.slice(start + 1, index - 1).join("\n"),
          closing: lines[index - 1],
        });
      } else {
        segments.push({ kind: "preserve", text: lines.slice(start, index).join("\n") });
      }
      continue;
    }

    if (line.trim() === "") {
      flush();
      const start = index;
      index = scanBlankRun(lines, start);
      segments.push({ kind: "preserve", text: lines.slice(start, index).join("\n") });
      continue;
    }

    block.push(line);
    index += 1;
  }
  flush();

  return segments;
}

/** Translatable header labels + Description-cell units from one table segment, in document order. */
const collectTableUnits = (segment: Extract<Segment, { kind: "table" }>): TranslatableUnit[] => {
  const units: TranslatableUnit[] = [];
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
  return units;
};

/** Every translatable unit across the segments, in document order (callers dedupe by content). */
export function collectUnits(segments: readonly Segment[]): TranslatableUnit[] {
  const units: TranslatableUnit[] = [];
  for (const segment of segments) {
    if (segment.kind === "glossary" || segment.kind === "prose") {
      units.push({ text: segment.text, kind: segment.kind });
      continue;
    }
    if (segment.kind === "prompt") {
      units.push({ text: segment.body, kind: "prose" });
      continue;
    }
    if (segment.kind === "table") {
      units.push(...collectTableUnits(segment));
      continue;
    }
    if (segment.kind === "callout") {
      units.push({ text: segment.label, kind: "glossary" }, { text: segment.note, kind: "prose" });
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
    case "prompt":
      return [segment.opening, resolve(segment.body, "prose"), segment.closing].join("\n");
    case "glossary":
    case "prose":
      return resolve(segment.text, segment.kind);
    case "table":
      return renderTable(segment, resolve);
    case "callout":
      return [
        segment.marker,
        segment.alertLine,
        `> **${resolve(segment.label, "glossary")}** — ${resolve(segment.note, "prose")}`,
      ].join("\n");
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
