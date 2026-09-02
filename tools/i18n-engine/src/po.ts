/**
 * A minimal gettext PO/POT reader/writer — Phase 2 of the localization-engine plan
 * (`.claude/plans/localization-engine.md`). Handles exactly the subset this engine emits: a header
 * entry, `msgid`/`msgstr` pairs (single- or multi-line quoted strings), `#:` reference comments,
 * `#,` flag comments (fuzzy + our own `no-c-format`), and `#~` obsolete entries. Real merging
 * (fuzzy-matching a reworded English string against its prior translation) is `msgmerge` itself —
 * this module never re-implements that algorithm.
 *
 * @module
 */

/** One translatable entry. `msgstr` is `""` for an untranslated/obsolete-pending entry. */
export interface PoEntry {
  msgid: string;
  msgstr: string;
  /** Disambiguates a keyed message from a plain (content-addressed) one, e.g. a UI-string key like
   *  `"prevMonth"`. `undefined` for content spaces, which have no stable key of their own. */
  msgctxt?: string;
  /** Repo-relative source locations, e.g. `"docs/guide/getting-started.md:5"`. */
  references: readonly string[];
  /** PO flags, e.g. `["no-c-format", "fuzzy"]`. `fuzzy` is also exposed as {@link PoEntry.fuzzy}. */
  flags: readonly string[];
  /** `msgmerge` marks a reworded-source entry fuzzy so a human/model reviews it before trusting it. */
  fuzzy: boolean;
  /** A `#~` entry: no longer in the source, retained for history (`preserveObsolete`). */
  obsolete: boolean;
}

/** Escape a string for a PO double-quoted literal (backslash, quote, newline, tab). */
export function escapePoString(value: string): string {
  return value
    .replaceAll("\\", "\\\\")
    .replaceAll('"', '\\"')
    .replaceAll("\t", "\\t")
    .replaceAll("\n", "\\n");
}

/** Inverse of {@link escapePoString}. */
export function unescapePoString(value: string): string {
  let out = "";
  for (let i = 0; i < value.length; i += 1) {
    if (value[i] === "\\" && i + 1 < value.length) {
      const next = value[i + 1];
      if (next === "n") {
        out += "\n";
        i += 1;
        continue;
      }
      if (next === "t") {
        out += "\t";
        i += 1;
        continue;
      }
      if (next === '"' || next === "\\") {
        out += next;
        i += 1;
        continue;
      }
    }
    out += value[i];
  }
  return out;
}

/** A quoted-string literal, e.g. `"hello \"world\""` — returns the unescaped content, or `null`. */
function parseQuotedLine(line: string): string | null {
  const match = /^"(.*)"$/su.exec(line.trim());
  return match ? unescapePoString(match[1]) : null;
}

/** Mutable state while scanning one PO entry's lines. */
interface ParseCursor {
  references: string[];
  flags: string[];
  obsolete: boolean;
  field: "none" | "msgctxt" | "msgid" | "msgstr";
  msgctxtParts: string[];
  msgidParts: string[];
  msgstrParts: string[];
}

function freshCursor(): ParseCursor {
  return {
    references: [],
    flags: [],
    obsolete: false,
    field: "none",
    msgctxtParts: [],
    msgidParts: [],
    msgstrParts: [],
  };
}

/** Push `cursor`'s completed entry onto `entries`, skipping the header (empty `msgid`). */
function pushEntry(cursor: ParseCursor, entries: PoEntry[]): void {
  const msgid = cursor.msgidParts.join("");
  if (msgid === "") return;
  entries.push({
    msgid,
    msgstr: cursor.msgstrParts.join(""),
    msgctxt: cursor.msgctxtParts.length > 0 ? cursor.msgctxtParts.join("") : undefined,
    references: cursor.references,
    flags: cursor.flags,
    fuzzy: cursor.flags.includes("fuzzy"),
    obsolete: cursor.obsolete,
  });
}

/** The parts array on `cursor` that a given field's continuation/quoted lines accumulate into. */
function partsFor(cursor: ParseCursor, field: "msgctxt" | "msgid" | "msgstr"): string[] {
  if (field === "msgctxt") return cursor.msgctxtParts;
  if (field === "msgid") return cursor.msgidParts;
  return cursor.msgstrParts;
}

/**
 * Apply one content line (a `#~` obsolete prefix, if any, is already stripped by the caller).
 * Starting a new `msgid` flushes the previous entry into `entries` and returns a fresh cursor,
 * carrying over any pending reference/flag/msgctxt comments and the current obsolete-prefix state.
 */
function applyContentLine(line: string, cursor: ParseCursor, entries: PoEntry[]): ParseCursor {
  for (const field of ["msgctxt", "msgid", "msgstr"] as const) {
    const prefix = `${field} `;
    if (!line.startsWith(prefix)) continue;
    const quoted = parseQuotedLine(line.slice(prefix.length));
    if (field !== "msgid") {
      cursor.field = field;
      if (quoted !== null) partsFor(cursor, field).push(quoted);
      return cursor;
    }
    pushEntry(cursor, entries);
    const next = freshCursor();
    next.references = cursor.references;
    next.flags = cursor.flags;
    next.obsolete = cursor.obsolete;
    next.msgctxtParts = cursor.msgctxtParts;
    next.field = "msgid";
    if (quoted !== null) next.msgidParts.push(quoted);
    return next;
  }
  const quoted = parseQuotedLine(line);
  if (quoted !== null && cursor.field !== "none") partsFor(cursor, cursor.field).push(quoted);
  return cursor;
}

/** Parse PO/POT source text into entries. The header entry (`msgid ""`) is dropped. */
export function parsePo(content: string): PoEntry[] {
  const entries: PoEntry[] = [];
  let cursor = freshCursor();

  for (const rawLine of content.split("\n")) {
    const line = rawLine.trimEnd();
    if (line.trim() === "") {
      pushEntry(cursor, entries);
      cursor = freshCursor();
      continue;
    }
    if (line.startsWith("#:")) {
      cursor.references.push(line.slice(2).trim());
      continue;
    }
    if (line.startsWith("#,")) {
      cursor.flags.push(
        ...line
          .slice(2)
          .split(",")
          .map((f) => f.trim())
          .filter(Boolean),
      );
      continue;
    }
    if (line.startsWith("#~")) {
      cursor.obsolete = true;
      cursor = applyContentLine(line.slice(2).trim(), cursor, entries);
      continue;
    }
    if (line.startsWith("#")) continue; // translator/extracted comment — not modeled
    cursor = applyContentLine(line, cursor, entries);
  }
  pushEntry(cursor, entries);
  return entries;
}

function serializeEntry(entry: PoEntry): string {
  const lines: string[] = [];
  const prefix = entry.obsolete ? "#~ " : "";
  for (const reference of entry.references) lines.push(`#: ${reference}`);
  if (entry.flags.length > 0) lines.push(`#, ${entry.flags.join(", ")}`);
  if (entry.msgctxt !== undefined)
    lines.push(`${prefix}msgctxt "${escapePoString(entry.msgctxt)}"`);
  lines.push(`${prefix}msgid "${escapePoString(entry.msgid)}"`);
  lines.push(`${prefix}msgstr "${escapePoString(entry.msgstr)}"`);
  return lines.join("\n");
}

/** The PO header block every catalog opens with (empty `msgid`, metadata `msgstr`). */
function header(): string {
  return ['msgid ""', 'msgstr ""', '"Content-Type: text/plain; charset=UTF-8\\n"'].join("\n");
}

/**
 * Serialize a POT template: one entry per unique `(msgctxt, msgid)` pair (later `references` for a
 * repeat are merged into the first occurrence), each stamped with `defaultFlags` (e.g.
 * `["no-c-format"]` — never `msgid_plural`, see the plan's "PO flags" section).
 */
export function serializePot(
  units: readonly {
    msgid: string;
    reference: string;
    msgctxt?: string;
    flags?: readonly string[];
  }[],
  defaultFlags: readonly string[] = [],
): string {
  const byKey = new Map<
    string,
    { msgid: string; msgctxt?: string; references: string[]; flags: string[] }
  >();
  for (const unit of units) {
    const key = `${unit.msgctxt ?? ""}\0${unit.msgid}`;
    const existing = byKey.get(key);
    if (existing) existing.references.push(unit.reference);
    else
      byKey.set(key, {
        msgid: unit.msgid,
        msgctxt: unit.msgctxt,
        references: [unit.reference],
        flags: [...(unit.flags ?? [])],
      });
  }
  const entries = [...byKey.values()].map(({ msgid, msgctxt, references, flags }): PoEntry => ({
    msgid,
    msgctxt,
    msgstr: "",
    references,
    flags: [...defaultFlags, ...flags],
    fuzzy: false,
    obsolete: false,
  }));
  return [header(), ...entries.map(serializeEntry)].join("\n\n") + "\n";
}

/** Serialize a full PO (translations + any preserved obsolete entries), non-header entries only. */
export function serializePo(entries: readonly PoEntry[]): string {
  return [header(), ...entries.map(serializeEntry)].join("\n\n") + "\n";
}
