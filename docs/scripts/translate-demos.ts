/**
 * Translate each self-hosted demo's `i18n.json` into its HTML, CSS, and JavaScript templates under
 * `docs/demos/<component>/`. A locale page's `demo:self:<name>` fence resolves to the localized clone
 * at `docs/<locale>/demos/<name>.html` via `demoMarkdownIt`'s `localePrefix` option (see `config.ts`).
 *
 * Run with `DOCS_TRANSLATION_ADAPTER=ai` for real translations; the default `glossary` adapter is a
 * keyless passthrough. Content-addressed by prose text (`kind: "text"`), so only new or edited demo
 * copy reaches the adapter on a re-run.
 *
 * Logs incremental progress by locale and demo:
 *   📋 Translating demo snippets
 *   🔄 ar: translating...
 *     alert: 9 string(s)
 *       ✓ 4 cached, 5 translated
 *     avatar: 32 string(s)
 *       ✓ all cached
 *   ✓ ar: rendered 65 demo file(s)
 *   ✨ All demo translations complete!
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { resolveVerbatimAction } from "@pantoken/translation-adapters";
import { NON_ROOT_LOCALES } from "../.vitepress/i18n.ts";
import { createTranslationAdapter } from "./api-translation.ts";
import { listDemoNames, loadDemoI18n, renderDemoI18n } from "./demo-i18n.ts";
import { TranslationMemory, keyFor, translateUnits } from "./translation-memory.ts";

const docsRoot = join(import.meta.dirname, "..");
const demoDir = join(docsRoot, "demos");

const names = listDemoNames(demoDir);

const parsed = names.map((name) => ({ name, ...loadDemoI18n(join(demoDir, name)) }));

console.log(`📋 Translating demo snippets\n`);

for (const locale of NON_ROOT_LOCALES) {
  const outDir = join(docsRoot, locale, "demos");
  mkdirSync(outDir, { recursive: true });

  const adapter = createTranslationAdapter(locale);
  const memory = TranslationMemory.load(locale, "demos");
  const requiredVerbatimSources = new Set<string>();
  const verbatimSources = new Set<string>();

  console.log(`🔄 ${locale}: translating...`);

  const allUnits = parsed.flatMap(({ name, strings, verbatim }) =>
    Object.entries(strings).flatMap(([key, source]) => {
      const action = resolveVerbatimAction(verbatim[key], locale);
      if (action === "required") requiredVerbatimSources.add(source);
      if (action === "allow") verbatimSources.add(source);
      return source === ""
        ? []
        : [{ kind: "text" as const, source, filePath: `demos/${name}/i18n.json#${key}` }];
    }),
  );

  const translations = await translateUnits(adapter, memory, allUnits, {
    locale,
    defaultVerbatim: { allow: ["en*"] },
    requiredVerbatimSources,
    verbatimSources,
  });

  let totalDemoCount = 0;

  for (const { name, template, assets, strings } of parsed) {
    const stringEntries = Object.entries(strings);
    const demoStringCount = stringEntries.length;

    if (demoStringCount === 0) continue;

    const localized = Object.fromEntries(
      stringEntries.map(([key, source]) => [
        key,
        translations.get(keyFor("text", source)) ?? source,
      ]),
    );

    const resolved = renderDemoI18n(template, localized);
    writeFileSync(join(outDir, `${name}.html`), resolved);
    for (const [file, source] of Object.entries(assets)) {
      const extension = file.slice(file.lastIndexOf(".") + 1);
      writeFileSync(join(outDir, `${name}.${extension}`), renderDemoI18n(source, localized));
    }

    totalDemoCount++;

    // Log per-demo summary with string count
    console.log(`  ${name}: ${demoStringCount} string(s)`);
  }

  memory.save();
  console.log(
    `✓ ${locale}: rendered ${totalDemoCount} demo file(s) via '${adapter.name}' ` +
      `(${memory.misses} translated, ${memory.hits} cached)\n`,
  );
}

console.log(`✨ All demo translations complete!`);
