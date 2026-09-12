/** Fill missing docs.demos PO entries with the configured translation provider. */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { AiTranslationAdapter } from "./api-translation.ts";
import {
  loadConfig,
  mergePoWithTemplate,
  parsePo,
  refreshCoverageReports,
  runExtractMessages,
  serializePo,
  writeCatalog,
} from "@pantoken/i18n-engine";
import { NON_ROOT_LOCALES, parseRequestedLocales } from "../.vitepress/i18n.ts";

const repoRoot = new URL("../../", import.meta.url).pathname;
const force = process.env.DOCS_TRANSLATION_FORCE === "1";
const config = loadConfig(join(repoRoot, "i18n.config.json"));
const locales = new Set(
  parseRequestedLocales(process.env.DOCS_TRANSLATION_LOCALE, NON_ROOT_LOCALES),
);
const { potPath } = runExtractMessages(config, repoRoot, "docs.demos");

for (const entry of readdirSync(join(repoRoot, "l10n"), { withFileTypes: true })) {
  if (!entry.isDirectory() || !locales.has(entry.name)) continue;
  const path = join(repoRoot, "l10n", entry.name, "docs.demos.po");
  await mergePoWithTemplate(path, potPath);
  const entries = parsePo(readFileSync(path, "utf8"));
  const missing = entries.filter((item) => !item.obsolete && (force || item.msgstr === ""));
  if (missing.length === 0) continue;

  const adapter = new AiTranslationAdapter(entry.name);
  const translations = await adapter.translateBatch(
    missing.map((item) => ({ id: item.msgctxt ?? item.msgid, text: item.msgid })),
  );
  for (const item of missing) item.msgstr = translations[item.msgctxt ?? item.msgid] ?? "";
  writeCatalog(path, serializePo(entries));
  refreshCoverageReports(join(repoRoot, "i18n.config.json"));
  console.log(`${entry.name}: filled ${missing.length}`);
}
