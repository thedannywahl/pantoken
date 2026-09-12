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
const requestedUnits = process.env.DOCS_TRANSLATION_UNITS
  ? (JSON.parse(process.env.DOCS_TRANSLATION_UNITS) as Array<{ msgctxt?: string; msgid: string }>)
  : undefined;
const unitKeys = requestedUnits?.map((unit) => `${unit.msgctxt ?? ""}\u0000${unit.msgid}`);

runExtractContent(config, repoRoot, "docs.home");
for (const locale of parseRequestedLocales(process.env.DOCS_TRANSLATION_LOCALE, NON_ROOT_LOCALES)) {
  await runTranslateContent(config, repoRoot, "docs.home", locale, { unitKeys });
  runRenderContent(config, repoRoot, "docs.home", locale);
}
