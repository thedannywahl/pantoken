/**
 * `@pantoken/i18n-engine` — the pantoken localization engine skeleton (Phase 1 of
 * `.claude/plans/localization-engine.md`).
 *
 * @module
 */
export {
  CONFIG_DEFAULTS,
  InvalidConfigError,
  loadConfig,
  parseConfig,
  type CatalogsConfig,
  type CircuitBreakerConfig,
  type ContentSpaceConfig,
  type DefaultsConfig,
  type DriftDefaults,
  type DriftConfig,
  type DriftSeverity,
  type I18nConfig,
  type LocalesConfig,
  type MessagesSpaceConfig,
  type OnIdenticalPolicy,
  type PoOptionsConfig,
  type ProviderConfig,
  type ProviderProfileConfig,
  type SpaceConfig,
  type SpaceLocaleScope,
  type StructuralSpaceConfig,
  type TranslateIntent,
  type TranslatePolicy,
} from "./config.ts";
export {
  excludeLocale,
  includeLocale,
  localeMatchesPattern,
  localesForSpace,
  moveLocaleToTier,
  resolveLocaleStatus,
  resolveTier,
  type LocaleStatus,
} from "./locales.ts";
export {
  escapePoString,
  parsePo,
  serializePo,
  serializePot,
  unescapePoString,
  type PoEntry,
} from "./po.ts";
export {
  checkPoFile,
  isGettextAvailable,
  mergePoWithTemplate,
  type PoStatistics,
} from "./gettext.ts";
export {
  collectProseRanges,
  extractFrontmatterUnits,
  extractFileUnits,
  extractGuideSpace,
  listGuideFiles,
  renderRanges,
  renderFile,
  renderFrontmatterFile,
  type ExtractedUnit,
  type ProseRange,
} from "./extract.ts";
export {
  parseMessageSource,
  extractMessagesSpace,
  type MessageSource,
  type MessageSourceEntry,
  type MessageUnit,
} from "./extract-messages.ts";
export {
  DOCS_GUIDES,
  DOCS_HOME,
  contentLocales,
  guidesLocales,
  messagesLocales,
  runCheckGuides,
  runCheckContent,
  runCheckMessages,
  runExtractGuides,
  runExtractContent,
  runExtractMessages,
  runRenderGuides,
  runRenderContent,
  runTranslateMessages,
  runTranslateGuides,
  runTranslateContent,
  resolveMessagesForLocale,
  type CheckResult,
  type ExtractResult,
  type RenderResult,
  type TranslateResult,
  type ResolvedMessages,
} from "./pipeline.ts";
export { missingPluralCategories, validateMf2, type Mf2ValidationResult } from "./mf2.ts";
export { createI18nCommand, runI18nCli } from "./cli.ts";
export { generateMessageBundles } from "./bundles.ts";
export { runLint, type LintResult } from "./lint.ts";
export {
  formatCoverageReport,
  writeCoverageReport,
  type CoverageOptions,
  type CoverageReport,
  type CoverageRow,
} from "./coverage.ts";
export { catalogUnitKey, resolveCatalogUnits, type CatalogUnit } from "./units.ts";
