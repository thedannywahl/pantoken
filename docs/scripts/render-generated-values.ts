import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";
import { parsePo, type PoEntry } from "@pantoken/i18n-engine";
import {
  generatedFileMarkdown,
  restoreGeneratedMarkdown,
} from "../../tools/translation-adapters/src/generated-values.ts";
import { formatGeneratedFile } from "../../scripts/release/format-generated.ts";
import { runAsMain } from "../../scripts/release/cli.ts";
import { GlossaryTranslationAdapter } from "./api-translation.ts";
import { collectUnits, reassemble, segmentMarkdown, type Resolve } from "./segment-markdown.ts";
import { walkFiles } from "./lib/files.ts";
import { NON_ROOT_LOCALES, parseRequestedLocales } from "../.vitepress/i18n.ts";
import { escapeBareHtmlTags } from "./markdown-structure.ts";

/** Keep ordinary lookups unchanged; generated templates require reviewed, active translations. */
export function catalogResolver(entries: readonly PoEntry[]): Resolve {
  const translations = new Map(
    entries
      .filter(
        (entry) =>
          entry.msgstr !== "" &&
          (!entry.msgid.includes("{{ptk_code_") || (!entry.obsolete && !entry.fuzzy)),
      )
      .map((entry) => [`${entry.msgctxt ?? ""}\0${entry.msgid}`, entry.msgstr]),
  );
  return (source, kind) => {
    const translated = translations.get(`docs.api:${kind}\0${source}`);
    if (translated === undefined)
      throw new Error(`Missing reviewed generated-doc translation: ${source.slice(0, 100)}`);
    return translated;
  };
}

/** Refresh current machine values without invoking a translation provider or changing any catalog. */
export async function renderGeneratedValues(
  options: {
    guidesOnly?: boolean;
    check?: boolean;
  } = {},
): Promise<void> {
  const root = join(import.meta.dirname, "../..");
  const docs = join(root, "docs");
  const locales = parseRequestedLocales(process.env.DOCS_TRANSLATION_LOCALE, NON_ROOT_LOCALES);
  const compatibility = generatedFileMarkdown(readFileSync(join(docs, "compatibility.md"), "utf8"));
  const pending: Array<{ path: string; content: string }> = [];
  const stage = (path: string, content: string): void => {
    if (!existsSync(path) || readFileSync(path, "utf8") !== content)
      pending.push({ path, content });
  };

  for (const locale of locales) {
    const guides = parsePo(readFileSync(join(root, "l10n", locale, "docs.guides.po"), "utf8"));
    const guide = guides.find(
      (entry) =>
        !entry.obsolete &&
        !entry.fuzzy &&
        entry.msgid === compatibility.template &&
        entry.msgstr !== "",
    );
    if (!guide) throw new Error(`${locale}: missing reviewed compatibility translation`);
    const guidePath = join(docs, locale, "compatibility.md");
    stage(
      guidePath,
      await formatGeneratedFile(restoreGeneratedMarkdown(guide.msgstr, compatibility), guidePath),
    );
    if (options.guidesOnly) continue;

    const entries = parsePo(readFileSync(join(root, "l10n", locale, "docs.api.po"), "utf8"));
    const resolveProse = catalogResolver(entries);
    const glossary = new GlossaryTranslationAdapter(locale);
    for (const path of walkFiles(join(docs, "api")).filter((file) => file.endsWith(".md"))) {
      const source = readFileSync(path, "utf8");
      const segments = segmentMarkdown(source, { scope: relative(join(docs, "api"), path) });
      const terms = new Map<string, string>();
      for (const unit of collectUnits(segments)) {
        if (unit.kind === "glossary") terms.set(unit.text, await glossary.translateText(unit.text));
      }
      try {
        const content = reassemble(segments, (text, kind) =>
          kind === "glossary"
            ? (terms.get(text) ?? text)
            : escapeBareHtmlTags(resolveProse(text, kind)),
        ).replace(/(\]\(|href=")\/api(?=[/")])/gu, `$1/${locale}/api`);
        stage(join(docs, locale, relative(docs, path)), content);
      } catch (error) {
        throw new Error(`${locale} ${relative(docs, path)}: ${String(error)}`, { cause: error });
      }
    }
  }
  if (options.check && pending.length > 0) {
    throw new Error(
      `Generated values are stale in ${pending.length} locale pages; run docs:values:render`,
    );
  }
  if (!options.check) for (const file of pending) writeFileSync(file.path, file.content);
  console.log(
    `Generated values: ${pending.length} page(s) ${options.check ? "stale" : "updated"}; no provider calls`,
  );
}

runAsMain(import.meta.url, async () => {
  const args = process.argv.slice(2);
  for (const arg of args)
    if (!["--guides-only", "--check"].includes(arg)) throw new Error(`Unknown argument: ${arg}`);
  await renderGeneratedValues({
    guidesOnly: args.includes("--guides-only"),
    check: args.includes("--check"),
  });
});
