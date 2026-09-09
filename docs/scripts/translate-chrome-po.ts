/** Fill missing docs.chrome PO entries with the configured translation provider. */
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

const repoRoot = new URL("../../", import.meta.url).pathname;
const force = process.env.DOCS_TRANSLATION_FORCE === "1";
const config = loadConfig(join(repoRoot, "i18n.config.json"));
const { potPath } = runExtractMessages(config, repoRoot, "docs.chrome");
const protectedSources = new Set([
  "404",
  "CSS",
  "<link>",
  "@import",
  "Canvas",
  "Canvas high contrast",
]);

for (const entry of readdirSync(join(repoRoot, "l10n"), { withFileTypes: true })) {
  if (!entry.isDirectory() || entry.name === "en") continue;
  const path = join(repoRoot, "l10n", entry.name, "docs.chrome.po");
  await mergePoWithTemplate(path, potPath);
  const entries = parsePo(readFileSync(path, "utf8"));
  const missing = entries.filter((item) => !item.obsolete && (force || item.msgstr === ""));
  if (missing.length === 0) continue;

  const adapter = new AiTranslationAdapter(entry.name);
  const translatable = missing.filter((item) => !protectedSources.has(item.msgid));
  const translations = await adapter.translateBatch(
    translatable.map((item) => ({ id: item.msgctxt ?? item.msgid, text: item.msgid })),
  );
  for (const item of missing) {
    item.msgstr = protectedSources.has(item.msgid)
      ? item.msgid
      : (translations[item.msgctxt ?? item.msgid] ?? "");
  }
  writeCatalog(path, serializePo(entries));
  refreshCoverageReports(join(repoRoot, "i18n.config.json"));
  console.log(
    `${entry.name}: filled ${missing.length - translatable.length} protected + ${translatable.length} translated`,
  );
}
