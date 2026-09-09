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

// One locale's failure must not discard the locales already translated: a provider-backed run is
// expensive and every catalog is written incrementally, so re-running retries only what's empty.
const incomplete: string[] = [];
for (const locale of Object.keys(LOCALES)) {
  if (locale === config.source) continue;
  try {
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
    if (untranslated > 0) incomplete.push(locale);
  } catch (error) {
    console.warn(`  ${locale}: failed — ${error instanceof Error ? error.message : String(error)}`);
    incomplete.push(locale);
  }
}

if (incomplete.length > 0) {
  console.log(`\n${String(incomplete.length)} locale(s) incomplete: ${incomplete.join(", ")}`);
  console.log("Re-run to retry only the untranslated entries.");
}
