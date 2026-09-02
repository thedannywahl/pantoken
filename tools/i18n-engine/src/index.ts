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
export { createI18nCommand, runI18nCli } from "./cli.ts";
