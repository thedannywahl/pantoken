/** Keep docs.home PO catalogs and localized home pages synchronized. */
import {
  loadConfig,
  runExtractContent,
  runRenderContent,
  runTranslateContent,
} from "@pantoken/i18n-engine";
import { NON_ROOT_LOCALES, parseRequestedLocales } from "../.vitepress/i18n.ts";

const repoRoot = new URL("../../", import.meta.url).pathname;
const config = loadConfig(`${repoRoot}/i18n.config.json`);
if (
  process.env.DOCS_TRANSLATION_COMMAND !== undefined ||
  process.env.DOCS_TRANSLATION_COMMAND_ARGS !== undefined
) {
  process.env.I18N_TRANSLATION_COMMAND =
    process.env.DOCS_TRANSLATION_COMMAND ?? process.env.I18N_TRANSLATION_COMMAND ?? "claude";
  process.env.I18N_TRANSLATION_COMMAND_ARGS =
    process.env.DOCS_TRANSLATION_COMMAND_ARGS ?? process.env.I18N_TRANSLATION_COMMAND_ARGS ?? "";
}
const requestedUnits = process.env.DOCS_TRANSLATION_UNITS
  ? (JSON.parse(process.env.DOCS_TRANSLATION_UNITS) as Array<{ msgctxt?: string; msgid: string }>)
  : undefined;
const unitKeys = requestedUnits?.map((unit) => `${unit.msgctxt ?? ""}\u0000${unit.msgid}`);

runExtractContent(config, repoRoot, "docs.home");
for (const locale of parseRequestedLocales(process.env.DOCS_TRANSLATION_LOCALE, NON_ROOT_LOCALES)) {
  const result = await runTranslateContent(config, repoRoot, "docs.home", locale, {
    profile: "claude",
    unitKeys,
    force: process.env.DOCS_TRANSLATION_FORCE === "1",
  });
  console.log(
    `docs.home (${locale}): ${result.translated} translated, ${result.untranslated} untranslated`,
  );
  if (result.untranslated > 0) {
    throw new Error(`docs.home (${locale}): ${result.untranslated} entries remain untranslated.`);
  }
  runRenderContent(config, repoRoot, "docs.home", locale);
}
