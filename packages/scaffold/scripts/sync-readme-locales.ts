/**
 * Keep `scaffold.readme` PO catalogs and the rendered per-locale README tree synchronized.
 *
 * The engine's tier lists only name `en`/`hu` explicitly (the rest are wildcards), so this walks
 * the full supported-locale registry the way `docs/scripts/sync-guide-locales.ts` does.
 */
import {
  loadConfig,
  runExtractContent,
  runRenderContent,
  runTranslateContent,
} from "@pantoken/i18n-engine";
import { resolve } from "node:path";
import { LOCALES } from "./lib/locales.ts";

const SPACE = "scaffold.readme";
const repoRoot = resolve(import.meta.dirname, "../../..");
const config = loadConfig(resolve(repoRoot, "i18n.config.json"));
const provider = process.env.I18N_TRANSLATION_PROFILE;

const { unitCount } = runExtractContent(config, repoRoot, SPACE);
console.log(`✓ extracted ${String(unitCount)} README unit(s)`);

for (const locale of Object.keys(LOCALES)) {
  if (locale === config.source) continue;
  const { translated, untranslated } = await runTranslateContent(
    config,
    repoRoot,
    SPACE,
    locale,
    provider ? { profile: provider } : {},
  );
  runRenderContent(config, repoRoot, SPACE, locale);
  console.log(
    `  ${locale}: ${String(translated)} translated, ${String(untranslated)} untranslated`,
  );
}
