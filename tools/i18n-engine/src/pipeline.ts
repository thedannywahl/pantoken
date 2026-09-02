/**
 * Wires `extract`/`translate`/`render` to the real `docs.guides` space — Phase 2 of the
 * localization-engine plan. Every other space still reports not-yet-implemented (see `cli.ts`).
 *
 * `translate` here is deliberately a no-op beyond keeping the PO catalog current (`msgmerge`): there
 * is no authorized real AI backend wired up yet (driving a subscription CLI programmatically for
 * bulk work is a product/legal decision the plan itself leaves unresolved — see `shim.ts`'s
 * docblock). An untranslated entry's `msgstr` stays empty; `render` falls back to the English source
 * for those, same as the legacy pipeline's translation-memory cache miss behavior.
 *
 * @module
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { DriftReporter, type DriftPolicy } from "@pantoken/translation-adapters";
import type { I18nConfig } from "./config.ts";
import { extractGuideSpace, listGuideFiles, renderFile } from "./extract.ts";
import { mergePoWithTemplate } from "./gettext.ts";
import { parsePo, serializePot, type PoEntry } from "./po.ts";
import { localesForSpace, resolveLocaleStatus } from "./locales.ts";

const DOCS_GUIDES = "docs.guides";

/** Substitute `{space}`/`{locale}` placeholders in a catalog path pattern. */
function resolvePattern(pattern: string, vars: Readonly<Record<string, string>>): string {
  return pattern.replace(/\{(\w+)\}/gu, (match, key: string) => vars[key] ?? match);
}

/** Every non-excluded, in-scope locale for `docs.guides`, per `locales.exclude` + the space's own scope. */
function guidesLocales(config: I18nConfig): string[] {
  const space = config.spaces[DOCS_GUIDES];
  const allTiered = Object.values(config.locales.tiers).flat();
  const known = [...new Set(allTiered)].filter((locale) => locale !== "*" && !locale.endsWith("*"));
  const nonExcluded = known.filter(
    (locale) => !resolveLocaleStatus(config.locales, locale).excluded,
  );
  return [...localesForSpace(nonExcluded, space?.kind === "content" ? space.locales : undefined)];
}

export interface ExtractResult {
  space: string;
  unitCount: number;
  potPath: string;
}

/** `i18n extract docs.guides`: write `l10n/docs.guides.pot` from the real `docs/guide/**` corpus. */
export function runExtractGuides(config: I18nConfig, configDir: string): ExtractResult {
  const docsRoot = join(configDir, "docs");
  const units = extractGuideSpace(docsRoot);
  const potPath = join(configDir, resolvePattern(config.catalogs.template, { space: DOCS_GUIDES }));
  mkdirSync(dirname(potPath), { recursive: true });
  writeFileSync(potPath, serializePot(units, config.poOptions.defaultFlags));
  return { space: DOCS_GUIDES, unitCount: units.length, potPath };
}

export interface TranslateResult {
  space: string;
  locale: string;
  poPath: string;
  translated: number;
  untranslated: number;
}

/** `i18n translate docs.guides --locale <x>`: keep `<locale>`'s PO current against the POT. */
export async function runTranslateGuides(
  config: I18nConfig,
  configDir: string,
  locale: string,
): Promise<TranslateResult> {
  const potPath = join(configDir, resolvePattern(config.catalogs.template, { space: DOCS_GUIDES }));
  const poPath = join(
    configDir,
    resolvePattern(config.catalogs.target, { space: DOCS_GUIDES, locale }),
  );
  mkdirSync(dirname(poPath), { recursive: true });
  await mergePoWithTemplate(poPath, potPath);
  const entries = parsePo(readFileSync(poPath, "utf8")).filter((e) => !e.obsolete);
  return {
    space: DOCS_GUIDES,
    locale,
    poPath,
    translated: entries.filter((e) => e.msgstr !== "").length,
    untranslated: entries.filter((e) => e.msgstr === "").length,
  };
}

export interface RenderResult {
  space: string;
  locale: string;
  filesWritten: string[];
}

/** `i18n render docs.guides [--locale <x>]`: splice each locale's PO back into `docs/{locale}/guide/**`. */
export function runRenderGuides(
  config: I18nConfig,
  configDir: string,
  locale: string,
): RenderResult {
  const docsRoot = join(configDir, "docs");
  const entries = loadPoEntries(config, configDir, locale);
  const byMsgid = new Map(entries.filter((e) => e.msgstr !== "").map((e) => [e.msgid, e.msgstr]));
  const resolve = (text: string): string => byMsgid.get(text) ?? text; // untranslated -> English fallback

  const space = config.spaces[DOCS_GUIDES];
  const renderPattern =
    space?.kind === "content"
      ? (space.render ?? "docs/{locale}/guide/{path}")
      : "docs/{locale}/guide/{path}";
  const filesWritten: string[] = [];
  for (const file of listGuideFiles(docsRoot)) {
    const source = readFileSync(join(docsRoot, file), "utf8");
    const rendered = renderFile(source, resolve);
    const outPath = join(
      configDir,
      resolvePattern(renderPattern, { locale, path: file.replace(/^guide\//u, "") }),
    );
    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, rendered);
    filesWritten.push(outPath);
  }
  return { space: DOCS_GUIDES, locale, filesWritten };
}

/** `config.locales.tiers` + `config.defaults.drift` shaped as a `DriftPolicy` for {@link DriftReporter}. */
function buildDriftPolicy(config: I18nConfig): DriftPolicy {
  return {
    tiers: config.locales.tiers,
    surfaces: {},
    fallback: { ...config.defaults.drift },
  };
}

/** `locale`'s `docs.guides` PO entries, or `[]` if no PO has been generated for it yet. */
function loadPoEntries(config: I18nConfig, configDir: string, locale: string): PoEntry[] {
  const poPath = join(
    configDir,
    resolvePattern(config.catalogs.target, { space: DOCS_GUIDES, locale }),
  );
  return existsSync(poPath) ? parsePo(readFileSync(poPath, "utf8")) : [];
}

export interface CheckResult {
  reporter: DriftReporter;
  exitCode: number;
}

/** `i18n check docs.guides`: reports untranslated units per locale via {@link DriftReporter}. */
export function runCheckGuides(config: I18nConfig, configDir: string): CheckResult {
  const docsRoot = join(configDir, "docs");
  const units = extractGuideSpace(docsRoot);
  const reporter = new DriftReporter({
    label: DOCS_GUIDES,
    fixCommand: "i18n translate docs.guides && i18n render docs.guides",
    policy: buildDriftPolicy(config),
  });

  for (const locale of guidesLocales(config)) {
    if (locale === config.source) continue; // nothing to translate for the source locale itself
    const entries = loadPoEntries(config, configDir, locale);
    const translated = new Set(entries.filter((e) => e.msgstr !== "").map((e) => e.msgid));
    for (const unit of units) {
      if (translated.has(unit.msgid)) continue;
      const [file, line] = unit.reference.split(":");
      reporter.add({
        surface: DOCS_GUIDES,
        locale,
        file,
        line: line ? Number(line) : undefined,
        detail: `Untranslated: ${unit.msgid.slice(0, 60)}`,
      });
    }
  }

  return { reporter, exitCode: reporter.report() };
}

export { DOCS_GUIDES, guidesLocales };
