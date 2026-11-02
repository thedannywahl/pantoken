import { expect, test } from "vite-plus/test";
import {
  migrateGeneratedCatalog,
  migrateGeneratedCatalogText,
} from "./migrate-generated-values.ts";
import type { PoEntry } from "../../tools/i18n-engine/src/po.ts";

const entry = (msgid: string, msgstr: string): PoEntry => ({
  msgid,
  msgstr,
  msgctxt: "docs.api:prose",
  references: ["example.md"],
  flags: ["no-c-format"],
  fuzzy: false,
  obsolete: false,
});

test("migrates catalogs idempotently without changing metadata or obsolete entries", () => {
  const old = entry("Use `a`.", "Hasznald: `a`.");
  const obsolete = { ...entry("Old `b`.", "Regi `b`."), obsolete: true };
  const migrated = migrateGeneratedCatalog([old, obsolete], "api");
  expect(migrated[0]).toEqual({
    ...old,
    msgid: "Use {{ptk_code_0}}.",
    msgstr: "Hasznald: {{ptk_code_0}}.",
  });
  expect(migrated[1]).toEqual(obsolete);
  expect(migrateGeneratedCatalog(migrated, "api")).toEqual(migrated);
  expect(old.msgid).toBe("Use `a`.");
});

test("rejects ambiguous migration and template collisions without mutating input", () => {
  const repeated = entry("`a` then `a`.", "`a`, majd `a`.");
  expect(() => migrateGeneratedCatalog([repeated], "api")).toThrow("example.md");
  expect(repeated.msgid).toBe("`a` then `a`.");
  expect(() =>
    migrateGeneratedCatalog(
      [entry("Use `a`.", "Elso: `a`."), entry("Use `b`.", "Masodik: `b`.")],
      "api",
    ),
  ).toThrow("Conflicting translations");
});

test("preserves empty and fuzzy entries as incomplete, and validates migrated slots", () => {
  expect(migrateGeneratedCatalog([entry("Use `a`.", "")], "api")[0].msgstr).toBe("");
  const fuzzy = { ...entry("Use `a`.", "Old translation"), fuzzy: true, flags: ["fuzzy"] };
  expect(migrateGeneratedCatalog([fuzzy], "api")[0]).toMatchObject({
    fuzzy: true,
    flags: ["fuzzy"],
    msgstr: "Old translation",
  });
  expect(() =>
    migrateGeneratedCatalog([entry("Use {{ptk_code_0}}.", "Hasznald: {{ptk_code_1}}.")], "api"),
  ).toThrow();
});

test("keeps per-page translations distinct when values collapse to the same template", () => {
  const templates = new Map([
    ["first.md", new Set(["Use {{ptk_code_0}}."])],
    ["second.md", new Set(["Use {{ptk_code_0}}."])],
  ]);
  const source = [
    { ...entry("Use `a`.", "Elso: `a`."), references: ["first.md"] },
    { ...entry("Use `b`.", "Masodik: `b`."), references: ["second.md"] },
  ];
  const migrated = migrateGeneratedCatalog(source, "api", templates);
  expect(migrated).toHaveLength(2);
  expect(migrated[0].msgid).not.toBe(migrated[1].msgid);
  expect(migrated[0].msgstr).toContain("Elso:");
  expect(migrated[1].msgstr).toContain("Masodik:");
  expect(migrateGeneratedCatalog(migrated, "api", templates)).toEqual(migrated);
});

test("splits gettext reference lines containing several page names into scoped entries", () => {
  const templates = new Map([
    ["first.md", new Set(["Use {{ptk_code_0}}."])],
    ["second.md", new Set(["Use {{ptk_code_0}}."])],
  ]);
  const source = [{ ...entry("Use `a`.", "Hasznald: `a`."), references: ["first.md second.md"] }];
  const migrated = migrateGeneratedCatalog(source, "api", templates);
  expect(migrated).toHaveLength(2);
  expect(migrated.map((entry) => entry.references)).toEqual([["first.md"], ["second.md"]]);
  expect(migrated.map((entry) => entry.msgid)).toEqual([
    "<!-- pantoken-value-scope:first.md -->\nUse {{ptk_code_0}}.",
    "<!-- pantoken-value-scope:second.md -->\nUse {{ptk_code_0}}.",
  ]);
});

test("keeps unrelated wrapping, translator comments, headers, and history byte-for-byte", () => {
  const header = 'msgid ""\nmsgstr ""\n"Language: hu\\n"\n\n';
  const untouched =
    '# Translator note\nmsgctxt "docs.api:prose"\nmsgid ""\n"An authored "\n"paragraph."\nmsgstr "Forditas."\n\n';
  const changed =
    '# Keep this note\n#: example.md\nmsgctxt "docs.api:prose"\nmsgid "Use `a`."\nmsgstr "Hasznald: `a`."\n';
  const source = header + untouched + changed;
  const templates = new Map([["example.md", new Set(["Use {{ptk_code_0}}."])]]);
  const result = migrateGeneratedCatalogText(source, "api", templates);
  expect(result.startsWith(header + untouched)).toBe(true);
  expect(result).toContain("# Keep this note");
  expect(result).toContain("{{ptk_code_0}}");
  expect(migrateGeneratedCatalogText(result, "api", templates)).toBe(result);
});

test("reuses reviewed obsolete text only for exact current generated sources, retaining history", () => {
  const history =
    '# Old translator note\n#~ msgctxt "docs.api:prose"\n#~ msgid ""\n#~ "Use "\n#~ "`a`."\n#~ msgstr "Hasznald: `a`."\n';
  const templates = new Map([["example.md", new Set(["Use `a`.", "Use {{ptk_code_0}}."])]]);
  const result = migrateGeneratedCatalogText(history, "api", templates);
  expect(result.startsWith(history)).toBe(true);
  expect(result).toContain("Hasznald: {{ptk_code_0}}.");
  expect(migrateGeneratedCatalogText(result, "api", templates)).toBe(result);
  const changed = new Map([["example.md", new Set(["Use `b`.", "Use {{ptk_code_0}}."])]]);
  expect(migrateGeneratedCatalogText(history, "api", changed)).toBe(history);
  expect(
    migrateGeneratedCatalogText(history.replace("# Old", "#, fuzzy\n# Old"), "api", templates),
  ).not.toContain("Hasznald: {{ptk_code_0}}.");
});
