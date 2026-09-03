/** Update one locale's guide PO catalog and render translated guide pages. */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import {
  loadConfig,
  listGuideFiles,
  parsePo,
  serializePo,
  runExtractGuides,
  runTranslateGuides,
} from "@pantoken/i18n-engine";
import { AiTranslationAdapter } from "./api-translation.ts";
import { reassemble, segmentMarkdown } from "./segment-markdown.ts";
import { NON_ROOT_LOCALES } from "../.vitepress/i18n.ts";

const repoRoot = new URL("../../", import.meta.url).pathname;
const config = loadConfig(join(repoRoot, "i18n.config.json"));
const docsRoot = join(repoRoot, "docs");
const locales = process.env.DOCS_TRANSLATION_LOCALE
  ? [process.env.DOCS_TRANSLATION_LOCALE]
  : NON_ROOT_LOCALES;

runExtractGuides(config, repoRoot);
const files = listGuideFiles(docsRoot);

for (const locale of locales) {
  await runTranslateGuides(config, repoRoot, locale);
  const poPath = join(repoRoot, "l10n", locale, "docs.guides.po");
  const entries = parsePo(readFileSync(poPath, "utf8"));
  const adapter = new AiTranslationAdapter(locale);

  for (const file of files) {
    const source = readFileSync(join(docsRoot, file), "utf8");
    const entry = entries.find((item) => !item.obsolete && item.msgid === source);
    if (!entry || (entry.msgstr !== "" && !entry.fuzzy)) continue;

    const translated = await adapter.translateMarkdown(source, file);
    const promptBodies = collectPromptBodies(source);
    const promptTranslations = await adapter.translateBatch(
      promptBodies.map((text, index) => ({ id: `prompt:${index}`, text })),
    );
    let promptIndex = 0;
    const localized = reassemble(segmentMarkdown(translated), (text) => {
      const prompt = promptBodies[promptIndex];
      if (prompt !== undefined && text === prompt) {
        const result = promptTranslations[`prompt:${promptIndex}`] ?? text;
        promptIndex++;
        return result;
      }
      return text;
    });
    entry.msgstr = `${localized.trimEnd()}\n`;
    entry.fuzzy = false;
    entry.flags = entry.flags.filter((flag) => flag !== "fuzzy");
    writeFileSync(poPath, serializePo(entries));
    writeFileSync(join(docsRoot, locale, file), entry.msgstr);
    console.log(`${locale}: translated ${file}`);
  }
  console.log(`${locale}: guide PO update complete`);
}

function collectPromptBodies(source: string): string[] {
  return segmentMarkdown(source)
    .filter(
      (segment): segment is Extract<typeof segment, { kind: "prompt" }> =>
        segment.kind === "prompt",
    )
    .map((segment) => segment.body);
}
