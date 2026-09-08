import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, test } from "vite-plus/test";
import { checkPoFile, isGettextAvailable, mergePoWithTemplate } from "../src/gettext.ts";
import { parsePo, serializePot } from "../src/po.ts";

let testDir: string;

// `describe.runIf` evaluates its condition synchronously while the file is collected, BEFORE any
// `beforeAll` hook runs — so this must be a top-level await, not a beforeAll assignment.
const gettextAvailable = await isGettextAvailable();
if (!gettextAvailable) {
  // Per the localization-engine plan's settled Phase 0 decision: never assume gettext is
  // preinstalled. Skip these real-binary tests rather than fail an environment without it.
  console.warn("msgmerge/msgfmt not found on PATH — skipping gettext.test.ts");
}

beforeEach(() => {
  testDir = mkdtempSync(join(tmpdir(), "pantoken-i18n-gettext-"));
});

afterEach(() => {
  rmSync(testDir, { recursive: true, force: true });
});

describe.runIf(gettextAvailable)("mergePoWithTemplate (real msgmerge)", () => {
  test("bootstraps a new PO from the template when none exists yet", async () => {
    const potPath = join(testDir, "docs.guides.pot");
    const poPath = join(testDir, "hu.po");
    writeFileSync(
      potPath,
      serializePot([{ msgid: "Get started", reference: "a.md:1" }], ["no-c-format"]),
    );

    await mergePoWithTemplate(poPath, potPath);

    const entries = parsePo(readFileSync(poPath, "utf8"));
    expect(entries).toHaveLength(1);
    expect(entries[0].msgid).toBe("Get started");
    expect(entries[0].msgstr).toBe("");
  });

  test("preserves an existing translation on re-merge", async () => {
    const potPath = join(testDir, "docs.guides.pot");
    const poPath = join(testDir, "hu.po");
    writeFileSync(potPath, serializePot([{ msgid: "Get started", reference: "a.md:1" }]));
    await mergePoWithTemplate(poPath, potPath);

    // Hand-translate, simulating a completed translation pass.
    const translated = readFileSync(poPath, "utf8").replace(
      'msgid "Get started"\nmsgstr ""',
      'msgid "Get started"\nmsgstr "Első lépések"',
    );
    writeFileSync(poPath, translated);

    // Re-merge against the same template (English unchanged) — the translation must survive.
    await mergePoWithTemplate(poPath, potPath);
    const entries = parsePo(readFileSync(poPath, "utf8"));
    expect(entries.find((e) => e.msgid === "Get started")?.msgstr).toBe("Első lépések");
  });

  test("marks a reworded source string fuzzy instead of losing the prior translation", async () => {
    const potPath = join(testDir, "docs.guides.pot");
    const poPath = join(testDir, "hu.po");
    writeFileSync(
      potPath,
      serializePot([{ msgid: "Get started with pantoken", reference: "a.md:1" }]),
    );
    await mergePoWithTemplate(poPath, potPath);
    writeFileSync(
      poPath,
      readFileSync(poPath, "utf8").replace(
        'msgid "Get started with pantoken"\nmsgstr ""',
        'msgid "Get started with pantoken"\nmsgstr "Első lépések a pantoken-nel"',
      ),
    );

    // Reword the English source slightly and re-merge — msgmerge should fuzzy-match it.
    writeFileSync(
      potPath,
      serializePot([{ msgid: "Get started with pantoken today", reference: "a.md:1" }]),
    );
    await mergePoWithTemplate(poPath, potPath);

    const entries = parsePo(readFileSync(poPath, "utf8"));
    const reworded = entries.find((e) => e.msgid === "Get started with pantoken today");
    expect(reworded?.fuzzy).toBe(true);
    expect(reworded?.msgstr).toBe("Első lépések a pantoken-nel"); // the prior translation, not lost
  });

  test("retains a translated-then-removed source string as an obsolete (#~) entry", async () => {
    const potPath = join(testDir, "docs.guides.pot");
    const poPath = join(testDir, "hu.po");
    writeFileSync(potPath, serializePot([{ msgid: "Removed later", reference: "a.md:1" }]));
    await mergePoWithTemplate(poPath, potPath);
    // Only a translated entry survives as obsolete — msgmerge discards an untranslated one outright
    // (nothing worth preserving), so translate it before removing it from the source.
    writeFileSync(
      poPath,
      readFileSync(poPath, "utf8").replace(
        'msgid "Removed later"\nmsgstr ""',
        'msgid "Removed later"\nmsgstr "Törölve később"',
      ),
    );

    writeFileSync(potPath, serializePot([])); // the string is gone from the source now
    await mergePoWithTemplate(poPath, potPath);

    const entries = parsePo(readFileSync(poPath, "utf8"));
    expect(entries.find((e) => e.msgid === "Removed later")).toMatchObject({
      msgstr: "Törölve később",
      obsolete: true,
    });
  });
});

describe.runIf(gettextAvailable)("checkPoFile (real msgfmt --statistics)", () => {
  test("reports translated/fuzzy/untranslated counts", async () => {
    const poPath = join(testDir, "hu.po");
    writeFileSync(
      poPath,
      [
        'msgid ""',
        'msgstr ""',
        '"Content-Type: text/plain; charset=UTF-8\\n"',
        "",
        'msgid "a"',
        'msgstr "A"',
        "",
        "#, fuzzy",
        'msgid "b"',
        'msgstr "B?"',
        "",
        'msgid "c"',
        'msgstr ""',
      ].join("\n"),
    );
    const stats = await checkPoFile(poPath);
    expect(stats).toEqual({ translated: 1, fuzzy: 1, untranslated: 1 });
  });

  test("throws (rather than returning bogus stats) for an invalid PO file", async () => {
    const poPath = join(testDir, "bad.po");
    writeFileSync(
      poPath,
      [
        'msgid ""',
        'msgstr ""',
        "",
        'msgid "dup"',
        'msgstr "one"',
        "",
        'msgid "dup"',
        'msgstr "two"',
      ].join("\n"),
    );
    await expect(checkPoFile(poPath)).rejects.toThrow(/msgfmt exited/u);
  });
});
