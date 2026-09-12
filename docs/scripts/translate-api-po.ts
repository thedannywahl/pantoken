/** Fill missing docs.api PO entries for one locale with the configured translation provider. */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { AiTranslationAdapter } from "./api-translation.ts";
import { refreshApiPot } from "./refresh-api-pot.ts";
import {
  mergePoWithTemplate,
  parsePo,
  refreshCoverageReports,
  serializePo,
  writeCatalog,
} from "@pantoken/i18n-engine";

const repoRoot = new URL("../../", import.meta.url).pathname;
const locale = process.env.DOCS_TRANSLATION_LOCALE ?? "hu";
const potPath = join(repoRoot, "l10n", "docs.api.pot");
// The drift-fix flow diffs docs/api against the on-disk POT without regenerating it first, so a POT
// that predates new/changed API content would never gain entries for those units — merge would have
// nothing to fill, leaving the drift permanently unfixable. Rebuild it here so it always matches
// the current EN API tree.
refreshApiPot();
const path = join(repoRoot, "l10n", locale, "docs.api.po");
await mergePoWithTemplate(path, potPath);
const entries = parsePo(readFileSync(path, "utf8"));
const requestedUnits = process.env.DOCS_TRANSLATION_UNITS
  ? (JSON.parse(process.env.DOCS_TRANSLATION_UNITS) as Array<{ msgctxt?: string; msgid: string }>)
  : undefined;
const selected = requestedUnits
  ? new Set(requestedUnits.map((unit) => `${unit.msgctxt ?? ""}\u0000${unit.msgid}`))
  : undefined;
const missing = entries.filter(
  (entry) =>
    !entry.obsolete &&
    (selected === undefined || selected.has(`${entry.msgctxt ?? ""}\u0000${entry.msgid}`)) &&
    entry.msgstr === "",
);

if (missing.length > 0) {
  const adapter = new AiTranslationAdapter(locale);
  const byId = new Map(missing.map((entry) => [`${entry.msgctxt ?? ""}\0${entry.msgid}`, entry]));
  const persistChunk = (translations: Record<string, string>): void => {
    for (const [id, translation] of Object.entries(translations)) {
      const entry = byId.get(id);
      if (entry !== undefined) entry.msgstr = translation;
    }
    writeCatalog(path, serializePo(entries));
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
