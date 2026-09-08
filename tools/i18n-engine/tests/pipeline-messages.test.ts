import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, test } from "vite-plus/test";
import { parseConfig } from "../src/config.ts";
import {
  runExtractContent,
  runRenderContent,
  runTranslateContent,
  resolveMessagesForLocale,
  runExtractMessages,
  runTranslateMessages,
} from "../src/pipeline.ts";

const CONFIG = parseConfig({
  source: "en",
  locales: {
    registry: "@pantoken/web-components#LOCALES",
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
      back: { message: "Back", translate: "always" },
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
    expect(pot).toContain('msgctxt "ui.strings:back"');
    expect(pot).toContain('msgid "Back"');
    expect(pot).toContain('msgctxt "ui.strings:datePlaceholder"');
    expect(pot).toContain('msgid "yyyy-mm-dd"');
    expect(pot).toContain("x-translate-optional");
  });
});

describe("frontmatter content pipeline", () => {
  const config = parseConfig({
    source: "en",
    locales: {
      registry: "@pantoken/web-components#LOCALES",
      exclude: [],
      tiers: { source: ["en"], primary: ["hu"], secondary: ["*"] },
    },
    spaces: {
      "docs.home": {
        kind: "content",
        include: ["docs/index.md"],
        render: "docs/{locale}/index.md",
        transientRender: false,
        segment: "frontmatter",
      },
    },
  });

  test("extracts, resolves, and renders a translated frontmatter catalog", async () => {
    mkdirSync(join(testDir, "docs"), { recursive: true });
    writeFileSync(
      join(testDir, "docs/index.md"),
      ["---", "hero:", "  text: Hello home", "---", "", "Body stays English."].join("\n"),
    );
    const extracted = runExtractContent(config, testDir, "docs.home");
    expect(extracted.unitCount).toBe(1);
    await runTranslateContent(config, testDir, "docs.home", "hu");
    const poPath = join(testDir, "l10n/hu/docs.home.po");
    writeFileSync(
      poPath,
      readFileSync(poPath, "utf8").replace(
        'msgid "Hello home"\nmsgstr ""',
        'msgid "Hello home"\nmsgstr "Szia otthon"',
      ),
    );
    const rendered = runRenderContent(config, testDir, "docs.home", "hu");
    expect(rendered.filesWritten).toHaveLength(1);
    expect(readFileSync(join(testDir, "docs/hu/index.md"), "utf8")).toContain("text: Szia otthon");
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
