import { describe, expect, test } from "vite-plus/test";
import {
  escapePoString,
  parsePo,
  serializePo,
  serializePot,
  unescapePoString,
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
    expect(pot).toContain("Content-Type");
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
