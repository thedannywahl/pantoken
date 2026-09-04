import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, test } from "vite-plus/test";
import { extractFrontmatterUnits, renderFrontmatterFile } from "../src/extract.ts";
import { parsePo } from "../src/po.ts";

const root = new URL("../../../", import.meta.url).pathname;
const docsRoot = join(root, "docs");

describe("docs.home PO migration", () => {
  test("renders every localized home page byte-for-byte from its PO catalog", () => {
    const source = readFileSync(join(docsRoot, "index.md"), "utf8");
    const units = extractFrontmatterUnits(source, "index.md");
    const locales = readdirSync(join(root, "l10n"), { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .filter((entry) => readdirSync(join(root, "l10n", entry.name)).includes("docs.home.po"))
      .map((entry) => entry.name);

    for (const locale of locales) {
      const entries = parsePo(readFileSync(join(root, "l10n", locale, "docs.home.po"), "utf8"));
      const translations = new Map(
        entries.filter((entry) => entry.msgstr !== "").map((entry) => [entry.msgid, entry.msgstr]),
      );
      const rendered = renderFrontmatterFile(
        source,
        (text) => translations.get(text) ?? text,
        locale === "en" ? undefined : locale,
      );
      const pagePath =
        locale === "en" ? join(docsRoot, "index.md") : join(docsRoot, locale, "index.md");
      expect(rendered).toBe(readFileSync(pagePath, "utf8"));
      expect(entries.filter((entry) => entry.msgstr !== "")).toHaveLength(units.length);
    }
  });
});
