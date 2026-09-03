import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, test } from "vite-plus/test";
import { listGuideFiles } from "../src/extract.ts";
import { parsePo } from "../src/po.ts";
import { normalizeWholeFileMarkdown } from "../src/pipeline.ts";

const root = new URL("../../../", import.meta.url).pathname;

describe("docs.guides PO migration", () => {
  test("renders every localized guide byte-for-byte from its whole-file PO entry", () => {
    const files = listGuideFiles(join(root, "docs"));
    const locales = readdirSync(join(root, "l10n"), { withFileTypes: true })
      .filter((entry) => entry.isDirectory() && entry.name !== "en")
      .filter((entry) => readdirSync(join(root, "l10n", entry.name)).includes("docs.guides.po"))
      .map((entry) => entry.name);

    for (const locale of locales) {
      const entries = parsePo(readFileSync(join(root, "l10n", locale, "docs.guides.po"), "utf8"));
      const translations = new Map(
        entries.filter((entry) => entry.msgstr !== "").map((entry) => [entry.msgid, entry.msgstr]),
      );
      for (const file of files) {
        const source = readFileSync(join(root, "docs", file), "utf8");
        expect(normalizeWholeFileMarkdown(translations.get(source) ?? "") + "\n").toBe(
          readFileSync(join(root, "docs", locale, file), "utf8"),
        );
      }
      expect(translations).toHaveLength(files.length);
    }
  });
});
