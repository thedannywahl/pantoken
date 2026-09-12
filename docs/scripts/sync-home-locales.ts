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

runExtractContent(config, repoRoot, "docs.home");
for (const locale of parseRequestedLocales(process.env.DOCS_TRANSLATION_LOCALE, NON_ROOT_LOCALES)) {
  await runTranslateContent(config, repoRoot, "docs.home", locale);
  runRenderContent(config, repoRoot, "docs.home", locale);
}
