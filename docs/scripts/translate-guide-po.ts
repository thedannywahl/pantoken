/** Update one locale's guide PO catalog and render translated guide pages. */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import {
  loadConfig,
  listGuideFiles,
  parsePo,
  refreshCoverageReports,
  serializePo,
  runExtractContent,
  runTranslateContent,
  writeCatalog,
} from "@pantoken/i18n-engine";
import { AiTranslationAdapter } from "./api-translation.ts";
import { sanitizeGuideFrontmatter } from "./guide-frontmatter.ts";
import { reassemble, segmentMarkdown } from "./segment-markdown.ts";
import { parseRequestedGuideFiles } from "./translation-scope.ts";
import { NON_ROOT_LOCALES, parseRequestedLocales } from "../.vitepress/i18n.ts";

const repoRoot = new URL("../../", import.meta.url).pathname;
const config = loadConfig(join(repoRoot, "i18n.config.json"));
const docsRoot = join(repoRoot, "docs");
const locales = parseRequestedLocales(process.env.DOCS_TRANSLATION_LOCALE, NON_ROOT_LOCALES);
const force = process.env.DOCS_TRANSLATION_FORCE === "1";

const normalizeRenderedGuide = (content: string): string =>
  content
    .trim()
    .replace(/^ (?=\S)/gmu, "")
    .replace(/[ \t]+$/gmu, "");
if (process.env.DOCS_TRANSLATION_COMMAND) {
  process.env.I18N_TRANSLATION_COMMAND = process.env.DOCS_TRANSLATION_COMMAND;
  process.env.I18N_TRANSLATION_COMMAND_ARGS = process.env.DOCS_TRANSLATION_COMMAND_ARGS ?? "";
}

runExtractContent(config, repoRoot, "docs.guides");
const files = parseRequestedGuideFiles(process.env.DOCS_TRANSLATION_FILE, listGuideFiles(docsRoot));
const compatibilitySource = readFileSync(join(docsRoot, "compatibility.md"), "utf8");

if (process.env.DOCS_TRANSLATION_FILE !== undefined) {
  console.log(`guide file scope: ${files.join(", ")}`);
}

for (const locale of locales) {
  await runTranslateContent(config, repoRoot, "docs.guides", locale);
  const poPath = join(repoRoot, "l10n", locale, "docs.guides.po");
  const entries = parsePo(readFileSync(poPath, "utf8"));
  const compatibilityEntry = entries.find(
    (item) => !item.obsolete && item.msgid === compatibilitySource,
  );
  if (compatibilityEntry?.msgstr) {
    writeFileSync(join(docsRoot, locale, "compatibility.md"), compatibilityEntry.msgstr);
  }
  const adapter = new AiTranslationAdapter(locale);

  for (const file of files) {
    const source = readFileSync(join(docsRoot, file), "utf8");
    const entry = entries.find((item) => !item.obsolete && item.msgid === source);
    if (!entry) continue;
    if (!force && entry.msgstr !== "" && !entry.fuzzy) {
      if (file === "guide/plugins.md") {
        const stable = addStableThemeColorsAnchor(source, entry.msgstr);
        if (stable !== entry.msgstr) {
          entry.msgstr = stable;
          writeCatalog(poPath, serializePo(entries));
          refreshCoverageReports(join(repoRoot, "i18n.config.json"));
        }
        writeFileSync(join(docsRoot, locale, file), `${normalizeRenderedGuide(entry.msgstr)}\n`);
      }
      continue;
    }

    let translated: string;
    let promptTranslations: Record<string, string>;
    const promptBodies = collectPromptBodies(source);
    try {
      translated = await adapter.translateMarkdown(source, file);
      promptTranslations = await adapter.translateBatch(
        promptBodies.map((text, index) => ({ id: `prompt:${index}`, text })),
      );
    } catch (error) {
      console.warn(
        `  ! ${locale} ${file}: ${error instanceof Error ? error.message : String(error)}`,
      );
      continue;
    }
    let promptIndex = 0;
    const localized = sanitizeGuideFrontmatter(
      reassemble(segmentMarkdown(translated), (text) => {
        const prompt = promptBodies[promptIndex];
        if (prompt !== undefined && text === prompt) {
          const result = promptTranslations[`prompt:${promptIndex}`] ?? text;
          promptIndex++;
          return result;
        }
        return text;
      }),
    );
    if (localized.trim().length === 0) {
      console.warn(`  ! ${locale} ${file}: empty translation, not cached`);
      continue;
    }
    entry.msgstr = `${localized.trimEnd()}\n`;
    if (file === "guide/plugins.md")
      entry.msgstr = addStableThemeColorsAnchor(source, entry.msgstr);
    entry.fuzzy = false;
    entry.flags = entry.flags.filter((flag) => flag !== "fuzzy");
    writeCatalog(poPath, serializePo(entries));
    refreshCoverageReports(join(repoRoot, "i18n.config.json"));
    writeFileSync(join(docsRoot, locale, file), `${normalizeRenderedGuide(entry.msgstr)}\n`);
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

function addStableThemeColorsAnchor(source: string, translated: string): string {
  const sourceHeadings = source.split("\n").filter((line) => /^## (?!#)/u.test(line));
  const targetIndex = sourceHeadings.indexOf("## Theme colors");
  const translatedLines = translated.split("\n");
  const translatedHeadingIndexes = translatedLines
    .map((line, index) => (/^## (?!#)/u.test(line) ? index : -1))
    .filter((index) => index >= 0);
  const headingLine = translatedHeadingIndexes[targetIndex];
  if (targetIndex < 0 || headingLine === undefined) {
    throw new Error("Could not locate the translated Theme colors heading");
  }

  translatedLines[headingLine] = translatedLines[headingLine]
    .replace(/\s+\{#[^}]+\}$/u, "")
    .concat(" {#theme-colors}");
  let output = translatedLines.join("\n");
  const previousHeadingLine = translatedHeadingIndexes[targetIndex - 1];
  const sectionStart =
    previousHeadingLine === undefined
      ? 0
      : translatedLines.slice(0, previousHeadingLine + 1).join("\n").length;
  const sectionEnd = translatedLines.slice(0, headingLine).join("\n").length;
  const translatedLinks = [...output.matchAll(/\]\(([^)]+)\)/gu)];
  const translatedLink = translatedLinks
    .filter(
      (match) =>
        match.index !== undefined && match.index > sectionStart && match.index < sectionEnd,
    )
    .at(-1);
  if (translatedLink?.index !== undefined) {
    const destinationStart = translatedLink.index + translatedLink[0].indexOf(translatedLink[1]!);
    output = `${output.slice(0, destinationStart)}#theme-colors${output.slice(destinationStart + translatedLink[1]!.length)}`;
  }
  return output;
}
