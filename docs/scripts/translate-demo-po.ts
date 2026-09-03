/** Fill missing docs.demos PO entries with the configured translation provider. */
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { AiTranslationAdapter } from "./api-translation.ts";
import { parsePo, serializePo } from "@pantoken/i18n-engine";

const repoRoot = new URL("../../", import.meta.url).pathname;

for (const entry of readdirSync(join(repoRoot, "l10n"), { withFileTypes: true })) {
  if (!entry.isDirectory() || entry.name === "en") continue;
  const path = join(repoRoot, "l10n", entry.name, "docs.demos.po");
  const entries = parsePo(readFileSync(path, "utf8"));
  const missing = entries.filter((item) => !item.obsolete && item.msgstr === "");
  if (missing.length === 0) continue;

  const adapter = new AiTranslationAdapter(entry.name);
  const translations = await adapter.translateBatch(
    missing.map((item) => ({ id: item.msgctxt ?? item.msgid, text: item.msgid })),
  );
  for (const item of missing) item.msgstr = translations[item.msgctxt ?? item.msgid] ?? "";
  writeFileSync(path, serializePo(entries));
  console.log(`${entry.name}: filled ${missing.length}`);
}
