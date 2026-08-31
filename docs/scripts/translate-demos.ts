/**
 * Translate the self-hosted demo snippets (`docs/demos/*.html` — visible prose text nodes only; tags,
 * attributes, comments, and `<script>`/`<style>`/`<code>` content stay verbatim, see
 * `segment-demo-html.ts`) into every non-root locale, mirroring `translate-guides.ts`/
 * `translate-chrome.ts`. A locale page's `demo:self:<name>` fence resolves to the localized clone at
 * `docs/<locale>/demos/<name>.html` via `demoMarkdownIt`'s `localePrefix` option (see `config.ts`).
 *
 * Run with `DOCS_TRANSLATION_ADAPTER=ai` for real translations; the default `glossary` adapter is a
 * keyless passthrough. Content-addressed by prose text (`kind: "text"`), so only new or edited demo
 * copy reaches the adapter on a re-run.
 */
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { NON_ROOT_LOCALES } from "../.vitepress/i18n.ts";
import { createTranslationAdapter } from "./api-translation.ts";
import { collectDemoUnits, reassembleDemoHtml, segmentDemoHtml } from "./segment-demo-html.ts";
import { TranslationMemory, keyFor, translateUnits } from "./translation-memory.ts";

const docsRoot = join(import.meta.dirname, "..");
const demoDir = join(docsRoot, "demos");

const files = readdirSync(demoDir)
  .filter((name) => name.endsWith(".html"))
  .toSorted();

const parsed = files.map((file) => {
  const html = readFileSync(join(demoDir, file), "utf8");
  const segments = segmentDemoHtml(html);
  return { file, segments, units: collectDemoUnits(segments) };
});

for (const locale of NON_ROOT_LOCALES) {
  const outDir = join(docsRoot, locale, "demos");
  mkdirSync(outDir, { recursive: true });

  const adapter = createTranslationAdapter(locale);
  const memory = TranslationMemory.load(locale, "demos");
  const allUnits = parsed.flatMap(({ units }) =>
    units.map((source) => ({ kind: "text" as const, source })),
  );

  const translations = await translateUnits(adapter, memory, allUnits);

  for (const { file, segments } of parsed) {
    const resolved = reassembleDemoHtml(
      segments,
      (text) => translations.get(keyFor("text", text)) ?? text,
    );
    writeFileSync(join(outDir, file), resolved);
  }

  memory.save();
  console.log(
    `✓ localized ${files.length} demo snippets for '${locale}' via '${adapter.name}' ` +
      `(${memory.misses} translated, ${memory.hits} cached)`,
  );
}
