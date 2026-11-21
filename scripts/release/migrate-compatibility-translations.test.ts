import { expect, test } from "vite-plus/test";
import { parsePo, serializePo, type PoEntry } from "../../tools/i18n-engine/src/po.ts";
import { generatedFileMarkdown } from "../../tools/translation-adapters/src/generated-values.ts";
import {
  compatibilityMarkdown,
  compatibilityUnits,
} from "../../tools/translation-adapters/src/compatibility-markdown.ts";
import { migrateCompatibilityCatalog } from "./migrate-compatibility-translations.ts";

const source = (rows: string): string =>
  `# Compatibility\n\n<!-- pantoken-generated-values -->\n\n| Package | Status |\n| --- | --- |\n${rows}\n`;
const alpha = "| `alpha` | Verified |";
const beta = "| `beta` | Verified |";
const entry = (msgid: string, msgstr: string, fuzzy = false): PoEntry => ({
  msgid,
  msgstr,
  references: ["compatibility.md"],
  flags: fuzzy ? ["fuzzy"] : [],
  fuzzy,
  obsolete: false,
});

test("preserves existing catalog bytes and migrates reviewed rows without provider calls", () => {
  const old = source(alpha);
  const template = generatedFileMarkdown(old).template;
  const catalog = serializePo([entry(template, template.replace("Verified", "Ellenőrizve"))]);
  const result = migrateCompatibilityCatalog(catalog, source(`${alpha}\n${beta}`), {
    source: old,
    catalog,
  });
  expect(result.catalog.startsWith(catalog)).toBe(true);
  expect(result.missing).toBe(0);
  const entries = parsePo(result.catalog);
  for (const key of compatibilityUnits(compatibilityMarkdown(source(`${alpha}\n${beta}`))))
    expect(entries.some((item) => item.msgid === key && !item.fuzzy && item.msgstr)).toBe(true);
  expect(migrateCompatibilityCatalog(result.catalog, source(`${alpha}\n${beta}`)).catalog).toBe(
    result.catalog,
  );
});

test("never approves a fuzzy whole-page translation", () => {
  const text = source(alpha);
  const template = generatedFileMarkdown(text).template;
  const catalog = serializePo([entry(template, template, true)]);
  const result = migrateCompatibilityCatalog(catalog, text);
  expect(result.catalog).toBe(catalog);
  expect(result.missing).toBeGreaterThan(0);
});
