/** Keep docs.guides PO catalogs and localized guide pages synchronized. */
import {
  loadConfig,
  runExtractGuides,
  runRenderGuides,
  runTranslateGuides,
} from "@pantoken/i18n-engine";
import { NON_ROOT_LOCALES } from "../.vitepress/i18n.ts";

const repoRoot = new URL("../../", import.meta.url).pathname;
const config = loadConfig(`${repoRoot}/i18n.config.json`);

runExtractGuides(config, repoRoot);
for (const locale of NON_ROOT_LOCALES) {
  await runTranslateGuides(config, repoRoot, locale);
  runRenderGuides(config, repoRoot, locale);
}
