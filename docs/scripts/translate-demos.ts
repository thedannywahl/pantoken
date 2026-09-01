/**
 * Translate each self-hosted demo's `i18n.json` into its HTML, CSS, and JavaScript templates under
 * `docs/demos/<component>/`. A locale page's `demo:self:<name>` fence resolves to the localized clone
 * at `docs/<locale>/demos/<name>.html` via `demoMarkdownIt`'s `localePrefix` option (see `config.ts`).
 *
 * Run with `DOCS_TRANSLATION_ADAPTER=ai` for real translations; the default `glossary` adapter is a
 * keyless passthrough. Content-addressed by prose text (`kind: "text"`), so only new or edited demo
 * copy reaches the adapter on a re-run.
 *
 * Logs incremental per-demo progress by locale, then prints a single summary for the locale after the
 * batch finishes so it doesn't silently translate thousands of strings before any feedback:
 *   📋 Translating demo snippets
 *   🔄 ar: translating...
 *     demos/alert.html: 9 string(s) (5 cached, 4 translated)
 *     demos/avatar.html: 32 string(s) (32 cached, 0 translated)
 *   📄 Summary: 65 demo file(s) (58 cached, 7 translated)
 *   ✓ ar: rendered in docs/ar/demos (7 translated, 58 cached)
 *   ✨ All demo translations complete!
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";
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
  let totalTranslated = 0;
  let totalCached = 0;

  for (const { name, template, assets, strings } of parsed) {
    const stringEntries = Object.entries(strings);
    const demoStringCount = stringEntries.length;

    if (demoStringCount === 0) continue;

    const beforeMisses = memory.misses;
    const beforeHits = memory.hits;

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

    const fileTranslated = memory.misses - beforeMisses;
    const fileCached = memory.hits - beforeHits;
    totalDemoCount++;
    totalTranslated += fileTranslated;
    totalCached += fileCached;

    console.log(
      `    ${name}.html: ${demoStringCount} string(s) (${fileCached} cached, ${fileTranslated} translated)`,
    );
  }

  memory.save();
  console.log(
    `  📄 Summary: ${totalDemoCount} demo file(s) (${totalCached} cached, ${totalTranslated} translated)`,
  );
  console.log(
    `✓ ${locale}: rendered in ${relative(docsRoot, outDir)} ` +
      `(${totalTranslated} translated, ${totalCached} cached)\n`,
  );
}

console.log(`✨ All demo translations complete!`);
