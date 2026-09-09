import { mkdtempSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, test } from "vite-plus/test";
import {
  escapePoString,
  parsePo,
  serializePo,
  serializePot,
  unescapePoString,
  writeCatalog,
  type PoEntry,
} from "../src/po.ts";

describe("escapePoString / unescapePoString", () => {
  test("round-trips backslash, quote, newline, and tab", () => {
    const original = 'Say "hi"\nthen\ta backslash: \\';
    const escaped = escapePoString(original);
    expect(escaped).not.toContain("\n");
    expect(unescapePoString(escaped)).toBe(original);
  });

  test("plain ASCII is unchanged", () => {
    expect(escapePoString("hello world")).toBe("hello world");
    expect(unescapePoString("hello world")).toBe("hello world");
  });
});

describe("serializePot", () => {
  test("dedups a repeated msgid, merging references", () => {
    const pot = serializePot([
      { msgid: "Get started", reference: "guide/a.md:1" },
      { msgid: "Get started", reference: "guide/b.md:3" },
      { msgid: "Packages", reference: "guide/a.md:9" },
    ]);
    expect(pot).toContain('msgid "Get started"');
    expect(pot).toContain("#: guide/a.md:1");
    expect(pot).toContain("#: guide/b.md:3");
    // Only one msgid "Get started" entry, not two.
    expect(pot.match(/msgid "Get started"/gu)).toHaveLength(1);
  });

  test("stamps every entry with defaultFlags", () => {
    const pot = serializePot([{ msgid: "x", reference: "f.md:1" }], ["no-c-format"]);
    expect(pot).toContain("#, no-c-format");
  });

  test("escapes special characters in the msgid", () => {
    const pot = serializePot([{ msgid: 'Say "hi"\nnow', reference: "f.md:1" }]);
    expect(pot).toContain('msgid "Say \\"hi\\"\\nnow"');
  });

  test("includes the header entry", () => {
    const pot = serializePot([]);
    expect(pot).toContain('msgid ""');
    expect(pot).toContain('"Project-Id-Version: pantoken\\n"');
    expect(pot).toMatch(/"PO-Revision-Date: \d{4}-\d{2}-\d{2} \d{2}:\d{2}\+0000\\n"/u);
    expect(pot).toContain('"MIME-Version: 1.0\\n"');
    expect(pot).toContain('"Content-Transfer-Encoding: 8bit\\n"');
    expect(pot).toContain('"Language: und\\n"');
  });
});

describe("parsePo", () => {
  test("parses msgid/msgstr, references, and flags", () => {
    const po = [
      'msgid ""',
      'msgstr ""',
      '"Content-Type: text/plain; charset=UTF-8\\n"',
      "",
      "#: guide/a.md:1",
      "#, no-c-format",
      'msgid "Get started"',
      'msgstr "Első lépések"',
      "",
    ].join("\n");
    const entries = parsePo(po);
    expect(entries).toHaveLength(1);
    expect(entries[0]).toMatchObject({
      msgid: "Get started",
      msgstr: "Első lépések",
      references: ["guide/a.md:1"],
      flags: ["no-c-format"],
      fuzzy: false,
      obsolete: false,
    });
  });

  test("drops the header entry (empty msgid)", () => {
    const entries = parsePo(serializePot([]));
    expect(entries).toEqual([]);
  });

  test("parses a multi-line quoted string", () => {
    const po = ['msgid ""', 'msgstr ""', "", 'msgid "line one\\n"', '"line two"', 'msgstr ""'].join(
      "\n",
    );
    const entries = parsePo(po);
    expect(entries[0].msgid).toBe("line one\nline two");
  });

  test("recognizes a fuzzy flag", () => {
    const po = ['msgid ""', 'msgstr ""', "", "#, fuzzy", 'msgid "x"', 'msgstr "y"'].join("\n");
    expect(parsePo(po)[0].fuzzy).toBe(true);
  });

  test("parses an obsolete (#~) entry", () => {
    const po = ['msgid ""', 'msgstr ""', "", '#~ msgid "old"', '#~ msgstr "régi"'].join("\n");
    const entries = parsePo(po);
    expect(entries).toHaveLength(1);
    expect(entries[0]).toMatchObject({ msgid: "old", msgstr: "régi", obsolete: true });
  });

  test("parses a multi-line obsolete (#~) entry's continuation lines", () => {
    const po = [
      'msgid ""',
      'msgstr ""',
      "",
      '#~ msgid "old line one\\n"',
      '#~ "old line two"',
      '#~ msgstr "régi egy\\n"',
      '#~ "régi kettő"',
    ].join("\n");
    const entries = parsePo(po);
    expect(entries[0]).toMatchObject({
      msgid: "old line one\nold line two",
      msgstr: "régi egy\nrégi kettő",
      obsolete: true,
    });
  });

  test("skips a plain translator/extracted comment line", () => {
    const po = ['msgid ""', 'msgstr ""', "", "# a translator note", 'msgid "x"', 'msgstr "y"'].join(
      "\n",
    );
    expect(parsePo(po)).toEqual([
      { msgid: "x", msgstr: "y", references: [], flags: [], fuzzy: false, obsolete: false },
    ]);
  });

  test("ignores a stray quoted line before any msgid", () => {
    const po = ['msgid ""', 'msgstr ""', '"stray"', "", 'msgid "x"', 'msgstr "y"'].join("\n");
    expect(parsePo(po)).toHaveLength(1);
  });

  test("parses a msgctxt-keyed entry", () => {
    const po = [
      'msgid ""',
      'msgstr ""',
      "",
      'msgctxt "prevMonth"',
      'msgid "Previous month"',
      'msgstr "El\u0151z\u0151 h\u00f3nap"',
    ].join("\n");
    const entries = parsePo(po);
    expect(entries[0]).toMatchObject({
      msgctxt: "prevMonth",
      msgid: "Previous month",
      msgstr: "El\u0151z\u0151 h\u00f3nap",
    });
  });

  test("two entries with the same msgid but different msgctxt stay distinct", () => {
    const po = [
      'msgid ""',
      'msgstr ""',
      "",
      'msgctxt "keyA"',
      'msgid "Back"',
      'msgstr "A"',
      "",
      'msgctxt "keyB"',
      'msgid "Back"',
      'msgstr "B"',
    ].join("\n");
    const entries = parsePo(po);
    expect(entries).toHaveLength(2);
    expect(entries.map((e) => e.msgstr).sort()).toEqual(["A", "B"]);
  });

  test("round-trips serializePo(parsePo(x)) for a full catalog", () => {
    const entries: PoEntry[] = [
      {
        msgid: "Get started",
        msgstr: "Első lépések",
        references: ["guide/a.md:1"],
        flags: ["no-c-format"],
        fuzzy: false,
        obsolete: false,
      },
      {
        msgid: "old",
        msgstr: "régi",
        references: [],
        flags: [],
        fuzzy: false,
        obsolete: true,
      },
    ];
    const serialized = serializePo(entries);
    expect(parsePo(serialized)).toEqual(entries);
  });
});

describe("serializePot with msgctxt", () => {
  test("two units with the same msgid but different msgctxt each get their own entry", () => {
    const pot = serializePot([
      { msgid: "Back", reference: "a:1", msgctxt: "keyA" },
      { msgid: "Back", reference: "b:1", msgctxt: "keyB" },
    ]);
    expect(pot.match(/msgid "Back"/gu)).toHaveLength(2);
    expect(pot).toContain('msgctxt "keyA"');
    expect(pot).toContain('msgctxt "keyB"');
  });

  test("round-trips a msgctxt entry through serializePo/parsePo", () => {
    const entries: PoEntry[] = [
      {
        msgid: "Previous month",
        msgctxt: "prevMonth",
        msgstr: "El\u0151z\u0151 h\u00f3nap",
        references: [],
        flags: [],
        fuzzy: false,
        obsolete: false,
      },
    ];
    expect(parsePo(serializePo(entries))).toEqual(entries);
  });
});

describe("writeCatalog", () => {
  let testDir: string;
  const path = (): string => join(testDir, "ui.strings.pot");
  const unit = (msgid: string) => ({ msgid, reference: "src/i18n.json" });

  beforeEach(() => {
    testDir = mkdtempSync(join(tmpdir(), "pantoken-i18n-write-catalog-"));
  });

  afterEach(() => {
    rmSync(testDir, { recursive: true, force: true });
  });

  test("writes a catalog that does not exist yet", () => {
    expect(writeCatalog(path(), serializePot([unit("Back")]))).toBe(true);
    expect(readFileSync(path(), "utf8")).toContain('msgid "Back"');
  });

  test("leaves the file untouched when only the revision date would change", () => {
    writeCatalog(path(), serializePot([unit("Back")]));
    const before = readFileSync(path(), "utf8");
    const mtimeBefore = statSync(path()).mtimeMs;

    expect(writeCatalog(path(), serializePot([unit("Back")]))).toBe(false);
    expect(readFileSync(path(), "utf8")).toBe(before);
    expect(statSync(path()).mtimeMs).toBe(mtimeBefore);
  });

  test("writes, and restamps the revision date, when a unit actually changed", () => {
    writeCatalog(path(), serializePot([unit("Back")]));
    const before = readFileSync(path(), "utf8");

    expect(writeCatalog(path(), serializePot([unit("Back"), unit("Cancel")]))).toBe(true);
    const after = readFileSync(path(), "utf8");
    expect(after).toContain('msgid "Cancel"');
    expect(after).not.toBe(before);
  });

  test("writes when the existing file carries no revision date to preserve", () => {
    writeFileSync(path(), 'msgid ""\nmsgstr ""\n"Content-Type: text/plain; charset=UTF-8\\n"\n');
    expect(writeCatalog(path(), serializePot([unit("Back")]))).toBe(true);
    expect(readFileSync(path(), "utf8")).toContain("PO-Revision-Date:");
  });
});
