/**
 * `extract`/`translate`/`render`/`check` for every localization space.
 *
 * Content spaces are driven entirely by their config: `include` globs pick the sources, `root`
 * anchors catalog references, and `segment` picks the unit shape (`file` translates a whole
 * Markdown document as one unit, `block` splits it into prose leaves, `frontmatter` takes only
 * YAML frontmatter values). No space id is special-cased here.
 *
 * @module
 */
import { globSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative, sep } from "node:path";
import { DriftReporter, type DriftPolicy } from "@pantoken/translation-adapters";
import type { ContentSpaceConfig, I18nConfig, MessagesSpaceConfig } from "./config.ts";
import {
  extractFileUnits,
  extractFrontmatterUnits,
  renderFile,
  renderFrontmatterFile,
} from "./extract.ts";
import { extractMessagesSpace, type MessageUnit } from "./extract-messages.ts";
import { mergePoWithTemplate } from "./gettext.ts";
import { parsePo, readCatalog, serializePot, writeCatalog, type PoEntry } from "./po.ts";
import { refreshCoverageReports } from "./coverage.ts";
import {
  fillUntranslatedEntries,
  fillUntranslatedMarkdownEntries,
  type FillOptions,
} from "./ai-translate.ts";
import { knownLocales, localesForSpace, resolveLocaleStatus } from "./locales.ts";
import { catalogUnitKey } from "./units.ts";

/** Substitute `{space}`/`{locale}` placeholders in a catalog path pattern. */
function resolvePattern(pattern: string, vars: Readonly<Record<string, string>>): string {
  return pattern.replace(/\{(\w+)\}/gu, (match, key: string) => vars[key] ?? match);
}

/** `spaceId`'s POT path, relative to the repository root. */
function potPathForSpace(config: I18nConfig, spaceId: string): string {
  return resolvePattern(config.catalogs.template, { space: spaceId });
}

/** One entry as {@link serializePot} consumes it. */
interface PotUnit {
  msgid: string;
  reference: string;
  msgctxt?: string;
  flags?: readonly string[];
}

/** POT units for a messages space: every source unit, with a non-`always` intent kept as a flag. */
function messagesPotUnits(units: readonly MessageUnit[], space: MessagesSpaceConfig): PotUnit[] {
  return units.map((unit) => ({
    msgid: unit.msgid,
    msgctxt: unit.msgctxt,
    reference: unit.reference || space.source,
    flags:
      typeof unit.translate === "string" && unit.translate !== "always"
        ? [`x-translate-${unit.translate}`]
        : [],
  }));
}

/** Report a finding when the committed POT no longer covers the same units its source extracts to —
 *  the desync that used to surface only indirectly, as permanently "untranslated" new keys.
 *  Compares units rather than bytes: the POT header carries a regenerated timestamp. */
function reportPotStaleness(
  reporter: DriftReporter,
  config: I18nConfig,
  configDir: string,
  spaceId: string,
  freshUnits: readonly PotUnit[],
): void {
  const relativePotPath = potPathForSpace(config, spaceId);
  const potPath = join(configDir, relativePotPath);
  const committed = parsePo(readCatalog(potPath) ?? "");
  const committedKeys = new Set(
    committed.filter((e) => !e.obsolete && e.msgid !== "").map((e) => catalogUnitKey(e)),
  );
  const freshKeys = new Set(freshUnits.map((unit) => catalogUnitKey(unit)));
  const missing = [...freshKeys].filter((key) => !committedKeys.has(key)).length;
  const extra = [...committedKeys].filter((key) => !freshKeys.has(key)).length;
  if (missing === 0 && extra === 0) return;
  reporter.add({
    surface: spaceId,
    locale: config.source,
    file: relativePotPath,
    detail:
      `Stale catalog template: ${relativePotPath} is missing ${String(missing)} and carries ` +
      `${String(extra)} stale unit(s). Re-extract it.`,
  });
}

/** Normalize whole-file Markdown translations to the formatter's stable paragraph indentation. */
export function normalizeWholeFileMarkdown(content: string): string {
  return content.trim().replace(/^ (?=\S)/gmu, "");
}

/** Every known, non-excluded locale across every tier (before a space narrows it further). */
function nonExcludedKnownLocales(config: I18nConfig, configDir: string, tier?: string): string[] {
  return knownLocales(config, configDir).filter((locale) => {
    const status = resolveLocaleStatus(config.locales, locale);
    return !status.excluded && (tier === undefined || status.tier === tier);
  });
}

/** Resolve configured locales that are eligible for a content localization space. */
function contentLocales(
  config: I18nConfig,
  configDir: string,
  spaceId: string,
  tier?: string,
): string[] {
  const space = config.spaces[spaceId];
  const nonExcluded = nonExcludedKnownLocales(config, configDir, tier);
  return [...localesForSpace(nonExcluded, space?.kind === "content" ? space.locales : undefined)];
}

/** The glob-free leading directory of `pattern` — what a matched file's `{path}` is relative to. */
function staticPrefix(pattern: string): string {
  const segments = pattern.split("/");
  const firstGlob = segments.findIndex((segment) => /[*?[{]/u.test(segment));
  return (firstGlob === -1 ? segments.slice(0, -1) : segments.slice(0, firstGlob)).join("/");
}

/** One source file in a content space, with both path forms the pipeline needs. */
interface ContentFile {
  /** Catalog `#:` reference, relative to the space's `root`. */
  reference: string;
  /** `{path}` for the space's `render` pattern, relative to the include glob's static prefix. */
  renderPath: string;
  source: string;
}

/** Every file a content space's `include` globs match, resolved against the repository root. */
function contentSpaceFiles(space: ContentSpaceConfig, configDir: string): ContentFile[] {
  const root = join(configDir, space.root ?? ".");
  const posix = (path: string): string => path.split(sep).join("/");
  return space.include.flatMap((pattern) =>
    globSync(pattern, { cwd: configDir })
      .sort()
      .map((file) => {
        const absolute = join(configDir, file);
        return {
          reference: posix(relative(root, absolute)),
          renderPath: posix(relative(join(configDir, staticPrefix(pattern)), absolute)),
          source: readFileSync(absolute, "utf8"),
        };
      }),
  );
}

function contentSpaceUnits(config: I18nConfig, configDir: string, spaceId: string) {
  const space = config.spaces[spaceId];
  if (!space || space.kind !== "content") throw new Error(`"${spaceId}" is not a content space.`);
  return contentSpaceFiles(space, configDir).flatMap((file) => {
    if (space.segment === "file") {
      return [{ msgid: file.source, reference: file.reference, translate: "always" as const }];
    }
    return space.segment === "frontmatter"
      ? extractFrontmatterUnits(file.source, file.reference)
      : extractFileUnits(file.source, file.reference);
  });
}

/** Result of extracting one localization space into a POT file. */
export interface ExtractResult {
  space: string;
  unitCount: number;
  potPath: string;
}

/** Extract a content space into its POT template. */
export function runExtractContent(
  config: I18nConfig,
  configDir: string,
  spaceId: string,
): ExtractResult {
  const units = contentSpaceUnits(config, configDir, spaceId);
  const potPath = join(configDir, potPathForSpace(config, spaceId));
  mkdirSync(dirname(potPath), { recursive: true });
  writeCatalog(potPath, serializePot(units, config.poOptions.defaultFlags));
  refreshCoverageReports(join(configDir, "i18n.config.json"));
  return { space: spaceId, unitCount: units.length, potPath };
}

/** Result of synchronizing one locale's PO catalog with its POT template. */
export interface TranslateResult {
  space: string;
  locale: string;
  poPath: string;
  translated: number;
  untranslated: number;
}

/** `msgmerge` `poPath` against `potPath`, optionally run `fill` (an AI fill-in step) against the
 *  merged catalog, then count translated/untranslated non-obsolete entries. Shared by
 *  `runTranslateContent` and `runTranslateMessages`. */
async function mergeAndCount(
  potPath: string,
  poPath: string,
  fill?: (poPath: string) => Promise<void>,
): Promise<Pick<TranslateResult, "translated" | "untranslated">> {
  mkdirSync(dirname(poPath), { recursive: true });
  await mergePoWithTemplate(poPath, potPath);
  if (fill) await fill(poPath);
  const entries = parsePo(readFileSync(poPath, "utf8")).filter((e) => !e.obsolete);
  return {
    translated: entries.filter((e) => e.msgstr !== "").length,
    untranslated: entries.filter((e) => e.msgstr === "").length,
  };
}

/** Synchronize one locale's PO catalog for a content space, AI-filling any untranslated entries. */
export async function runTranslateContent(
  config: I18nConfig,
  configDir: string,
  spaceId: string,
  locale: string,
  options: FillOptions = {},
): Promise<TranslateResult> {
  const space = config.spaces[spaceId];
  if (!space || space.kind !== "content") throw new Error(`"${spaceId}" is not a content space.`);
  // Re-extract first: msgmerge can only propagate units the POT already knows about.
  const { potPath } = runExtractContent(config, configDir, spaceId);
  const poPath = join(
    configDir,
    resolvePattern(config.catalogs.target, { space: spaceId, locale }),
  );
  // Whole-file units are documents, not short strings — they need the Markdown-aware prompt.
  const fill = space.segment === "file" ? fillUntranslatedMarkdownEntries : fillUntranslatedEntries;
  const result = await mergeAndCount(potPath, poPath, (path) =>
    fill(path, locale, config.provider, { configDir, ...options }),
  );
  refreshCoverageReports(join(configDir, "i18n.config.json"));
  return { space: spaceId, locale, poPath, ...result };
}

/** Result of rendering one locale's translated content files. */
export interface RenderResult {
  space: string;
  locale: string;
  filesWritten: string[];
}

/** Render a translated content space's locale output with English fallback for empty PO entries. */
export function runRenderContent(
  config: I18nConfig,
  configDir: string,
  spaceId: string,
  locale: string,
): RenderResult {
  const space = config.spaces[spaceId];
  if (!space || space.kind !== "content") throw new Error(`"${spaceId}" is not a content space.`);
  const entries = loadPoEntriesForSpace(config, configDir, spaceId, locale);
  const byMsgid = new Map(
    entries.filter((e) => !e.obsolete && e.msgstr !== "").map((e) => [e.msgid, e.msgstr]),
  );
  const resolve = (text: string): string => byMsgid.get(text) ?? text;

  const filesWritten: string[] = [];
  for (const file of contentSpaceFiles(space, configDir)) {
    const rendered = renderContentFile(space.segment, file.source, resolve, locale);
    const outPath = join(
      configDir,
      resolvePattern(space.render, { locale, path: file.renderPath }),
    );
    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, rendered);
    filesWritten.push(outPath);
  }
  return { space: spaceId, locale, filesWritten };
}

/** Splice `resolve`d translations back into one source file, per the space's segmentation. */
function renderContentFile(
  segment: ContentSpaceConfig["segment"],
  source: string,
  resolve: (text: string) => string,
  locale: string,
): string {
  if (segment === "file") return `${normalizeWholeFileMarkdown(resolve(source))}\n`;
  return segment === "frontmatter"
    ? renderFrontmatterFile(source, resolve, locale)
    : renderFile(source, resolve);
}

/** `config.locales.tiers` + `config.drift` shaped as a `DriftPolicy` for {@link DriftReporter}. */
function buildDriftPolicy(config: I18nConfig): DriftPolicy {
  return {
    tiers: config.locales.tiers,
    surfaces: config.drift.surfaces,
    fallback: config.drift.fallback,
  };
}

function loadPoEntriesForSpace(
  config: I18nConfig,
  configDir: string,
  spaceId: string,
  locale: string,
): PoEntry[] {
  const poPath = join(
    configDir,
    resolvePattern(config.catalogs.target, { space: spaceId, locale }),
  );
  return parsePo(readCatalog(poPath) ?? "");
}

/** Drift reporter and exit code returned by a space check. */
export interface CheckResult {
  reporter: DriftReporter;
  exitCode: number;
}

/** Check translated entries for a content space against every in-scope locale. */
export function runCheckContent(
  config: I18nConfig,
  configDir: string,
  spaceId: string,
): CheckResult {
  const units = contentSpaceUnits(config, configDir, spaceId);
  const reporter = new DriftReporter({
    label: spaceId,
    fixCommand: `i18n extract ${spaceId} && i18n translate ${spaceId} && i18n render ${spaceId}`,
    policy: buildDriftPolicy(config),
  });
  reportPotStaleness(reporter, config, configDir, spaceId, units);
  for (const locale of contentLocales(config, configDir, spaceId)) {
    if (locale === config.source) continue;
    const entries = loadPoEntriesForSpace(config, configDir, spaceId, locale);
    const translated = new Set(entries.filter((e) => e.msgstr !== "").map((e) => e.msgid));
    for (const unit of units) {
      if (translated.has(unit.msgid)) continue;
      const [file, line] = unit.reference.split(":");
      reporter.add({
        surface: spaceId,
        locale,
        file,
        line: line ? Number(line) : undefined,
        detail: `Untranslated: ${unit.msgid.slice(0, 60)}`,
        unit: { msgid: unit.msgid },
      });
    }
  }
  return { reporter, exitCode: reporter.report() };
}

export { contentLocales };

/** Every non-excluded, in-scope locale for a given messages space, per `locales.exclude` + the
 *  space's own scope. */
export function messagesLocales(
  config: I18nConfig,
  configDir: string,
  spaceId: string,
  tier?: string,
): string[] {
  const space = config.spaces[spaceId];
  const nonExcluded = nonExcludedKnownLocales(config, configDir, tier);
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
  const units = extractMessagesSpace(join(configDir, space.source), spaceId);
  const potPath = join(configDir, potPathForSpace(config, spaceId));
  mkdirSync(dirname(potPath), { recursive: true });
  writeCatalog(
    potPath,
    serializePot(messagesPotUnits(units, space), config.poOptions.defaultFlags),
  );
  return { space: spaceId, unitCount: units.length, potPath };
}

/** `i18n translate <space> --locale <x>` for a `"messages"`-kind space: keep `<locale>`'s PO
 *  current against the POT (same `msgmerge` semantics as `docs.guides`). */
export async function runTranslateMessages(
  config: I18nConfig,
  configDir: string,
  spaceId: string,
  locale: string,
  options: FillOptions = {},
): Promise<TranslateResult> {
  // Re-extract first: msgmerge can only propagate units the POT already knows about.
  const { potPath } = runExtractMessages(config, configDir, spaceId);
  const poPath = join(
    configDir,
    resolvePattern(config.catalogs.target, { space: spaceId, locale }),
  );
  const result = await mergeAndCount(potPath, poPath, (path) =>
    fillUntranslatedEntries(path, locale, config.provider, { configDir, ...options }),
  );
  refreshCoverageReports(join(configDir, "i18n.config.json"));
  return { space: spaceId, locale, poPath, ...result };
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
  return parsePo(readCatalog(poPath) ?? "");
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
 *  (e.g. `renderers/web-components/scripts/build-bundles.ts`) that turns this into its own bundle format. */
export function resolveMessagesForLocale(
  config: I18nConfig,
  configDir: string,
  spaceId: string,
  locale: string,
): ResolvedMessages {
  const space = messagesSpaceConfig(config, spaceId);
  const units = extractMessagesSpace(join(configDir, space.source), spaceId);
  const entries = loadMessagesPoEntries(config, configDir, spaceId, locale);
  const byKey = new Map(
    entries.filter((e) => e.msgstr !== "").map((e) => [catalogUnitKey(e), e.msgstr]),
  );
  const strings: Record<string, string> = {};
  for (const unit of units) strings[unit.key] = byKey.get(catalogUnitKey(unit)) ?? unit.msgid;
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
  const sourceUnits = extractMessagesSpace(join(configDir, space.source), spaceId);
  const units: MessageUnit[] = sourceUnits.filter((u) => u.translate !== "never");
  const reporter = new DriftReporter({
    label: spaceId,
    // A messages space has no generic render step — its own package owns codegen.
    fixCommand: `i18n extract ${spaceId} && i18n translate ${spaceId}`,
    policy: buildDriftPolicy(config),
  });

  reportPotStaleness(reporter, config, configDir, spaceId, messagesPotUnits(sourceUnits, space));

  for (const locale of messagesLocales(config, configDir, spaceId)) {
    if (locale === config.source) continue;
    const entries = loadMessagesPoEntries(config, configDir, spaceId, locale);
    const translated = new Set(
      entries.filter((e) => e.msgstr !== "").map((e) => catalogUnitKey(e)),
    );
    for (const unit of units) {
      if (translated.has(catalogUnitKey(unit))) continue;
      reporter.add({
        surface: spaceId,
        locale,
        file: space.source,
        detail: `Untranslated: "${unit.key}" (English: ${unit.msgid.slice(0, 60)})`,
        unit: { msgctxt: unit.msgctxt, msgid: unit.msgid },
      });
    }
  }

  return { reporter, exitCode: reporter.report() };
}
