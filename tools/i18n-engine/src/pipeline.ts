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
import type { I18nConfig, MessagesSpaceConfig } from "./config.ts";
import { extractGuideSpace, listGuideFiles, renderFile } from "./extract.ts";
import { extractMessagesSpace, type MessageUnit } from "./extract-messages.ts";
import { mergePoWithTemplate } from "./gettext.ts";
import { parsePo, serializePot, type PoEntry } from "./po.ts";
import { localesForSpace, resolveLocaleStatus } from "./locales.ts";

/** Canonical content-space id for the repository's Markdown guides. */
const DOCS_GUIDES = "docs.guides";

/** Substitute `{space}`/`{locale}` placeholders in a catalog path pattern. */
function resolvePattern(pattern: string, vars: Readonly<Record<string, string>>): string {
  return pattern.replace(/\{(\w+)\}/gu, (match, key: string) => vars[key] ?? match);
}

/** Every known, non-excluded locale across every tier (before a space narrows it further). */
function nonExcludedKnownLocales(config: I18nConfig): string[] {
  const allTiered = Object.values(config.locales.tiers).flat();
  const known = [...new Set(allTiered)].filter((locale) => locale !== "*" && !locale.endsWith("*"));
  return known.filter((locale) => !resolveLocaleStatus(config.locales, locale).excluded);
}

/** Every non-excluded, in-scope locale for `docs.guides`, per `locales.exclude` + the space's own scope. */
function guidesLocales(config: I18nConfig): string[] {
  const space = config.spaces[DOCS_GUIDES];
  const nonExcluded = nonExcludedKnownLocales(config);
  return [...localesForSpace(nonExcluded, space?.kind === "content" ? space.locales : undefined)];
}

/** Result of extracting one localization space into a POT file. */
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

/** Result of synchronizing one locale's PO catalog with its POT template. */
export interface TranslateResult {
  space: string;
  locale: string;
  poPath: string;
  translated: number;
  untranslated: number;
}

/** `msgmerge` `poPath` against `potPath`, then count translated/untranslated non-obsolete entries.
 *  Shared by `runTranslateGuides` and `runTranslateMessages`. */
async function mergeAndCount(
  potPath: string,
  poPath: string,
): Promise<Pick<TranslateResult, "translated" | "untranslated">> {
  mkdirSync(dirname(poPath), { recursive: true });
  await mergePoWithTemplate(poPath, potPath);
  const entries = parsePo(readFileSync(poPath, "utf8")).filter((e) => !e.obsolete);
  return {
    translated: entries.filter((e) => e.msgstr !== "").length,
    untranslated: entries.filter((e) => e.msgstr === "").length,
  };
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
  return { space: DOCS_GUIDES, locale, poPath, ...(await mergeAndCount(potPath, poPath)) };
}

/** Result of rendering one locale's translated content files. */
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

/** Drift reporter and exit code returned by a space check. */
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

/** Every non-excluded, in-scope locale for a given messages space, per `locales.exclude` + the
 *  space's own scope. */
export function messagesLocales(config: I18nConfig, spaceId: string): string[] {
  const space = config.spaces[spaceId];
  const nonExcluded = nonExcludedKnownLocales(config);
  return [...localesForSpace(nonExcluded, space?.kind === "messages" ? space.locales : undefined)];
}

function messagesSpaceConfig(config: I18nConfig, spaceId: string): MessagesSpaceConfig {
  const space = config.spaces[spaceId];
  if (!space || space.kind !== "messages") {
    throw new Error(`"${spaceId}" is not a configured messages space.`);
  }
  return space;
}

/** `i18n extract <space>` for a `"messages"`-kind space: write `l10n/{space}.pot` from its
 *  `src/i18n.json`-shaped source. */
export function runExtractMessages(
  config: I18nConfig,
  configDir: string,
  spaceId: string,
): ExtractResult {
  const space = messagesSpaceConfig(config, spaceId);
  const units = extractMessagesSpace(join(configDir, space.source));
  const potPath = join(configDir, resolvePattern(config.catalogs.template, { space: spaceId }));
  mkdirSync(dirname(potPath), { recursive: true });
  const potUnits = units.map((unit) => ({
    msgid: unit.msgid,
    msgctxt: unit.key,
    reference: space.source,
    flags: unit.translate === "always" ? [] : [`x-translate-${unit.translate}`],
  }));
  writeFileSync(potPath, serializePot(potUnits, config.poOptions.defaultFlags));
  return { space: spaceId, unitCount: units.length, potPath };
}

/** `i18n translate <space> --locale <x>` for a `"messages"`-kind space: keep `<locale>`'s PO
 *  current against the POT (same `msgmerge` semantics as `docs.guides`). */
export async function runTranslateMessages(
  config: I18nConfig,
  configDir: string,
  spaceId: string,
  locale: string,
): Promise<TranslateResult> {
  const potPath = join(configDir, resolvePattern(config.catalogs.template, { space: spaceId }));
  const poPath = join(
    configDir,
    resolvePattern(config.catalogs.target, { space: spaceId, locale }),
  );
  return { space: spaceId, locale, poPath, ...(await mergeAndCount(potPath, poPath)) };
}

/** `locale`'s `<space>` PO entries, or `[]` if no PO has been generated for it yet. */
function loadMessagesPoEntries(
  config: I18nConfig,
  configDir: string,
  spaceId: string,
  locale: string,
): PoEntry[] {
  const poPath = join(
    configDir,
    resolvePattern(config.catalogs.target, { space: spaceId, locale }),
  );
  return existsSync(poPath) ? parsePo(readFileSync(poPath, "utf8")) : [];
}

/** Keyed message values resolved for one locale, including English fallbacks. */
export interface ResolvedMessages {
  locale: string;
  /** Key-to-resolved text (translated, or the English `msgid` fallback for an untranslated/`never`
   *  entry). */
  strings: Record<string, string>;
}

/** Resolve `spaceId`'s messages for `locale`: each source unit's `msgid`, overridden by its PO
 *  `msgstr` when translated (and non-empty). Exported for the package-specific codegen step
 *  (e.g. `packages/i18n/scripts/build-bundles.ts`) that turns this into its own bundle format. */
export function resolveMessagesForLocale(
  config: I18nConfig,
  configDir: string,
  spaceId: string,
  locale: string,
): ResolvedMessages {
  const space = messagesSpaceConfig(config, spaceId);
  const units = extractMessagesSpace(join(configDir, space.source));
  const entries = loadMessagesPoEntries(config, configDir, spaceId, locale);
  const byKey = new Map(entries.filter((e) => e.msgstr !== "").map((e) => [e.msgctxt, e.msgstr]));
  const strings: Record<string, string> = {};
  for (const unit of units) strings[unit.key] = byKey.get(unit.key) ?? unit.msgid;
  return { locale, strings };
}

/** `i18n check <space>` for a `"messages"`-kind space: reports untranslated keys per locale via
 *  {@link DriftReporter}. */
export function runCheckMessages(
  config: I18nConfig,
  configDir: string,
  spaceId: string,
): CheckResult {
  const space = messagesSpaceConfig(config, spaceId);
  const units: MessageUnit[] = extractMessagesSpace(join(configDir, space.source)).filter(
    (u) => u.translate !== "never",
  );
  const reporter = new DriftReporter({
    label: spaceId,
    fixCommand: `i18n translate ${spaceId} && i18n render ${spaceId}`,
    policy: buildDriftPolicy(config),
  });

  for (const locale of messagesLocales(config, spaceId)) {
    if (locale === config.source) continue;
    const entries = loadMessagesPoEntries(config, configDir, spaceId, locale);
    const translated = new Set(entries.filter((e) => e.msgstr !== "").map((e) => e.msgctxt));
    for (const unit of units) {
      if (translated.has(unit.key)) continue;
      reporter.add({
        surface: spaceId,
        locale,
        file: space.source,
        detail: `Untranslated: "${unit.key}" (English: ${unit.msgid.slice(0, 60)})`,
      });
    }
  }

  return { reporter, exitCode: reporter.report() };
}
