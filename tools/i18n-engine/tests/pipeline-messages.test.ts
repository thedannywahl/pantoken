import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, test } from "vite-plus/test";
import { parseConfig } from "../src/config.ts";
import {
  resolveMessagesForLocale,
  runExtractMessages,
  runTranslateMessages,
} from "../src/pipeline.ts";

const CONFIG = parseConfig({
  source: "en",
  locales: {
    registry: "@pantoken/i18n#LOCALES",
    exclude: [],
    tiers: { source: ["en"], primary: ["hu"], secondary: ["*"] },
  },
  spaces: { "ui.strings": { kind: "messages", source: "i18n.json" } },
});

let testDir: string;

beforeEach(() => {
  testDir = mkdtempSync(join(tmpdir(), "pantoken-i18n-pipeline-messages-"));
  mkdirSync(testDir, { recursive: true });
  writeFileSync(
    join(testDir, "i18n.json"),
    JSON.stringify({
      back: "Back",
      datePlaceholder: { message: "yyyy-mm-dd", translate: "optional" },
    }),
  );
});

afterEach(() => {
  rmSync(testDir, { recursive: true, force: true });
});

describe("runExtractMessages", () => {
  test("writes a msgctxt-keyed POT with a translate-intent flag for non-always units", () => {
    const result = runExtractMessages(CONFIG, testDir, "ui.strings");
    expect(result.unitCount).toBe(2);
    const pot = readFileSync(result.potPath, "utf8");
    expect(pot).toContain('msgctxt "back"');
    expect(pot).toContain('msgid "Back"');
    expect(pot).toContain('msgctxt "datePlaceholder"');
    expect(pot).toContain('msgid "yyyy-mm-dd"');
    expect(pot).toContain("x-translate-optional");
  });
});

describe("resolveMessagesForLocale", () => {
  test("falls back to the English msgid when no PO exists yet", () => {
    runExtractMessages(CONFIG, testDir, "ui.strings");
    const resolved = resolveMessagesForLocale(CONFIG, testDir, "ui.strings", "hu");
    expect(resolved.strings).toEqual({ back: "Back", datePlaceholder: "yyyy-mm-dd" });
  });

  test("uses a translated msgstr once the PO carries one", async () => {
    runExtractMessages(CONFIG, testDir, "ui.strings");
    await runTranslateMessages(CONFIG, testDir, "ui.strings", "hu");
    const poPath = join(testDir, "l10n", "hu", "ui.strings.po");
    writeFileSync(
      poPath,
      readFileSync(poPath, "utf8").replace(
        'msgid "Back"\nmsgstr ""',
        'msgid "Back"\nmsgstr "Vissza"',
      ),
    );
    const resolved = resolveMessagesForLocale(CONFIG, testDir, "ui.strings", "hu");
    expect(resolved.strings.back).toBe("Vissza");
    expect(resolved.strings.datePlaceholder).toBe("yyyy-mm-dd"); // still untranslated -> fallback
  });
});
