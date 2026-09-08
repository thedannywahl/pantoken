/** Fill missing docs.api PO entries for one locale with the configured translation provider. */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { AiTranslationAdapter } from "./api-translation.ts";
import { parsePo, refreshCoverageReports, serializePo } from "@pantoken/i18n-engine";

const repoRoot = new URL("../../", import.meta.url).pathname;
const locale = process.env.DOCS_TRANSLATION_LOCALE ?? "hu";
const path = join(repoRoot, "l10n", locale, "docs.api.po");
const entries = parsePo(readFileSync(path, "utf8"));
const missing = entries.filter((entry) => !entry.obsolete && entry.msgstr === "");

if (missing.length > 0) {
  const adapter = new AiTranslationAdapter(locale);
  const byId = new Map(missing.map((entry) => [`${entry.msgctxt ?? ""}\0${entry.msgid}`, entry]));
  const persistChunk = (translations: Record<string, string>): void => {
    for (const [id, translation] of Object.entries(translations)) {
      const entry = byId.get(id);
      if (entry !== undefined) entry.msgstr = translation;
    }
    writeFileSync(path, serializePo(entries));
    refreshCoverageReports(join(repoRoot, "i18n.config.json"));
  };
  await adapter.translateBatch(
    missing.map((entry) => ({
      id: `${entry.msgctxt ?? ""}\0${entry.msgid}`,
      text: entry.msgid,
    })),
    persistChunk,
  );
}

console.log(
  `${locale}: filled ${missing.length}; remaining ${entries.filter((entry) => !entry.obsolete && entry.msgstr === "").length}`,
);
