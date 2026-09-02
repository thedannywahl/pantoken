/**
 * `i18n.config.json` schema + loader — Phase 1 of the localization-engine plan
 * (`.claude/plans/localization-engine.md`). One root config containing localization policy,
 * both env-var namespaces, and the 26 root + 55 package translation scripts.
 *
 * This module owns parsing and defaulting only. Locale tier/status resolution lives in
 * `locales.ts`; the CLI lives in `cli.ts`. Extraction, translation, and rendering are later phases.
 *
 * @module
 */
import { readFileSync } from "node:fs";

/** How severely a drift finding blocks CI. Mirrors `DriftSeverity` in `tools/translation-adapters`. */
export type DriftSeverity = "block" | "warn" | "off";

/** Intent: whether a message/unit is ever sent to a translator. */
export type TranslateIntent = "always" | "optional" | "never";

/** `translate` as either one intent for every locale, or a locale-pattern map (`"*"` catch-all). */
export type TranslatePolicy = TranslateIntent | Readonly<Record<string, TranslateIntent>>;

/** What to do when a translation is byte-identical to the source. */
export type OnIdenticalPolicy = "accept" | "warn" | "reject";

/** File-name patterns for the generated POT template and locale PO catalogs. */
export interface CatalogsConfig {
  /** POT template path pattern, e.g. `"l10n/{space}.pot"`. */
  template: string;
  /** Per-locale PO path pattern, e.g. `"l10n/{locale}/{space}.po"`. */
  target: string;
}

/** Options controlling generated PO entry flags and obsolete-entry retention. */
export interface PoOptionsConfig {
  /** PO flags stamped on every generated entry (e.g. `["no-c-format"]` — never `msgid_plural`). */
  defaultFlags: readonly string[];
  /** Keep obsolete (`#~`) entries on `msgmerge` instead of pruning translation history. */
  preserveObsolete: boolean;
}

/** Supported-locale registry, exclusions, and ordered locale tiers. */
export interface LocalesConfig {
  /** Where the supported-locale registry comes from, e.g. `"@pantoken/i18n#LOCALES"`. */
  registry: string;
  /** Locales dropped from the pipeline entirely — not translated, rendered, or checked. */
  exclude: readonly string[];
  /** Named locale-pattern tiers, matched in declaration order (a trailing `"*"` tier is the catch-all). */
  tiers: Readonly<Record<string, readonly string[]>>;
}

/** Provider rotation and failure-recovery settings for translation requests. */
export interface CircuitBreakerConfig {
  maxConsecutiveFailures: number;
  /** Ordered profile-name rotation, e.g. `["copilot", "agy", "claude"]`. */
  rotation: readonly string[];
  onExhausted: "fail";
  resetTimeoutMs: number;
}

/** Command/model settings for one translation provider profile. */
export interface ProviderProfileConfig {
  model: string;
  effort?: string;
  concurrency: number;
}

/** Translation provider endpoint, profiles, budget, and circuit-breaker settings. */
export interface ProviderConfig {
  default: string;
  endpoint: string;
  batchBudget: number;
  timeoutMs: number;
  circuitBreaker: CircuitBreakerConfig;
  profiles: Readonly<Record<string, ProviderProfileConfig>>;
}

/** Drift severity defaults for source, primary, and secondary locale tiers. */
export interface DriftDefaults {
  source: DriftSeverity;
  primary: DriftSeverity;
  secondary: DriftSeverity;
}

/** Surface-specific drift severities; locale tiers are defined once in {@link LocalesConfig}. */
export interface DriftConfig {
  surfaces: Readonly<Record<string, DriftSeverity | Readonly<Record<string, DriftSeverity>>>>;
  fallback: DriftSeverity | Readonly<Record<string, DriftSeverity>>;
}

/** Default translation intent and drift policy for spaces. */
export interface DefaultsConfig {
  translate: TranslateIntent;
}

/** Per-space locale scoping: `only` restricts to a list, `exclude` removes from the full set. */
export type SpaceLocaleScope = { only: readonly string[] } | { exclude: readonly string[] };

/** Configuration for a prose/content translation space. */
export interface ContentSpaceConfig {
  kind: "content";
  include: readonly string[];
  render: string;
  transientRender: boolean;
  segment: "block" | "frontmatter";
  rules?: string;
  locales?: SpaceLocaleScope;
}

/** Configuration for a keyed message translation space. */
export interface MessagesSpaceConfig {
  kind: "messages";
  source: string;
  sourceMerge?: readonly string[];
  render?: string;
  emit?: string;
  locales?: SpaceLocaleScope;
}

/** Configuration for a structural drift-only space. */
export interface StructuralSpaceConfig {
  kind: "structural";
  drift: "block";
  locales?: SpaceLocaleScope;
}

/** Union of supported localization-space configurations. */
export type SpaceConfig = ContentSpaceConfig | MessagesSpaceConfig | StructuralSpaceConfig;

/** The full `i18n.config.json` shape. Every field beyond `source` and `spaces` has a sane default. */
export interface I18nConfig {
  source: string;
  catalogs: CatalogsConfig;
  poOptions: PoOptionsConfig;
  locales: LocalesConfig;
  provider: ProviderConfig;
  defaults: DefaultsConfig;
  drift: DriftConfig;
  spaces: Readonly<Record<string, SpaceConfig>>;
}

/** Defaults for every field an `i18n.config.json` is allowed to omit. */
export const CONFIG_DEFAULTS: Omit<I18nConfig, "source" | "spaces"> = {
  catalogs: { template: "l10n/{space}.pot", target: "l10n/{locale}/{space}.po" },
  poOptions: { defaultFlags: ["no-c-format"], preserveObsolete: true },
  locales: {
    registry: "@pantoken/i18n#LOCALES",
    exclude: [],
    tiers: { source: ["en"], secondary: ["*"] },
  },
  provider: {
    default: "copilot",
    endpoint: "http://127.0.0.1:8787/v1",
    batchBudget: 4000,
    timeoutMs: 120_000,
    circuitBreaker: {
      maxConsecutiveFailures: 3,
      rotation: ["copilot", "agy", "claude"],
      onExhausted: "fail",
      resetTimeoutMs: 300_000,
    },
    profiles: {
      copilot: { model: "gpt-5-mini", effort: "low", concurrency: 4 },
      agy: { model: "gemini-3.6-flash-low", concurrency: 4 },
      claude: { model: "claude-haiku-4-5-20251001", effort: "low", concurrency: 8 },
    },
  },
  defaults: { translate: "always" },
  drift: {
    surfaces: {},
    fallback: { source: "block", secondary: "warn" },
  },
};

/** Thrown for a structurally invalid config — never a partial/best-effort parse. */
export class InvalidConfigError extends Error {
  constructor(message: string) {
    super(`Invalid i18n.config.json: ${message}`);
    this.name = "InvalidConfigError";
  }
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** Deep-merge `override` over `base`, one level of plain-object nesting at a time (arrays replace). */
function mergeDefaults<T>(base: T, override: unknown): T {
  if (!isPlainObject(override)) return base;
  if (!isPlainObject(base)) return override as T;
  const merged: Record<string, unknown> = { ...(base as Record<string, unknown>) };
  for (const [key, value] of Object.entries(override)) {
    merged[key] = isPlainObject(value) ? mergeDefaults(merged[key], value) : value;
  }
  return merged as T;
}

/** Parse and default-fill a config object already read from JSON (exported for in-memory testing). */
export function parseConfig(raw: unknown): I18nConfig {
  if (!isPlainObject(raw)) throw new InvalidConfigError("root must be an object");
  if (typeof raw.source !== "string" || raw.source.length === 0) {
    throw new InvalidConfigError('"source" must be a non-empty string');
  }
  if (!isPlainObject(raw.spaces)) throw new InvalidConfigError('"spaces" must be an object');

  const merged = mergeDefaults(CONFIG_DEFAULTS, raw) as I18nConfig;
  merged.source = raw.source;
  merged.spaces = raw.spaces as Record<string, SpaceConfig>;
  // `tiers`' key order IS its precedence order, so a provided map replaces the default wholesale
  // rather than deep-merging (which would silently interleave it with the default tier names).
  if (isPlainObject(raw.locales) && raw.locales.tiers !== undefined) {
    merged.locales.tiers = raw.locales.tiers as LocalesConfig["tiers"];
  }

  for (const [name, space] of Object.entries(merged.spaces)) {
    if (!isPlainObject(space) || typeof (space as { kind?: unknown }).kind !== "string") {
      throw new InvalidConfigError(`space "${name}" must have a "kind"`);
    }
  }
  return merged;
}

/** Load and parse `path` (defaults to `i18n.config.json` in the current working directory). */
export function loadConfig(path = "i18n.config.json"): I18nConfig {
  const raw: unknown = JSON.parse(readFileSync(path, "utf8"));
  return parseConfig(raw);
}
