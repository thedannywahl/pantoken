/** Keep docs.chrome PO catalogs current for the VitePress theme runtime. */
import { loadConfig, runExtractMessages, runTranslateMessages } from "@pantoken/i18n-engine";
import { NON_ROOT_LOCALES } from "../.vitepress/i18n.ts";

const repoRoot = new URL("../../", import.meta.url).pathname;
const config = loadConfig(`${repoRoot}/i18n.config.json`);

runExtractMessages(config, repoRoot, "docs.chrome");
for (const locale of NON_ROOT_LOCALES) {
  await runTranslateMessages(config, repoRoot, "docs.chrome", locale);
}
