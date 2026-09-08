# CHANGELOG

## 1.0.0

### Major Changes

- 63e06cb: Normalizes demo `i18n.json` sources to the shared `{message, translate}` schema with `$schema` links, and removes the obsolete legacy source parser.

### Minor Changes

- 63e06cb: Moves drift policy into the root `i18n.config.json` schema. The shared drift reporter now derives locale tiers, surface severities, and fallback behavior from that single configuration file.
- 7d964ee: Added a global `defaultVerbatim` fallback option to `runI18nTranslationCli`, applied to any source
  key with no per-key `verbatim` policy in its `src/i18n.json` entry (a key's own policy always takes
  precedence). Pairs with the new `localeFamilyGlobs(locales)` helper, which derives one `"<lang>*"`
  glob per unique base language from a locale list (e.g. `CANVAS_LOCALES`'s ~47 codes) — so a
  blanket rule like "English and Portuguese variants may legitimately match the source" can be built
  as `{ allow: localeFamilyGlobs([...]) }` instead of hand-typing every regional variant.
- 7d964ee: `runI18nTranslationCli` now detects and guards against a silently-failing AI translator that echoes
  the English source back untranslated instead of raising an error. New/re-checked cache entries whose
  value is a trimmed, case-insensitive match of their source string are no longer written to
  `i18n-cache/*.json`, and any previously-cached entry matching this pattern is reset so it's retried on
  the next translate run — a warning is logged in both cases. Also warns and skips (instead of silently
  dropping) a response value that's missing, non-string, or empty. `@pantoken/scaffold`'s translate
  script now passes a `cachedValue` option so its legacy sha256-hash-keyed cache entries are covered by
  the same audit.
- 7d964ee: Added a force/no-cache option to both translation pipelines, so already-cached content can be
  retranslated (and overwritten) instead of only ever filling cache misses. Set
  `DOCS_TRANSLATION_FORCE=1` for the docs pipeline (`translateUnits`) or `I18N_TRANSLATION_FORCE=1` for
  the shared CLI string pipeline (`runI18nTranslationCli`, used by `@pantoken/scaffold`, `@pantoken/ai`,
  and `@pantoken/web-components`), or use the new convenience scripts: `docs:locales:translate:force`,
  each package's `translate:force`, and the root `i18n:translate:force` umbrella task.
- 7d964ee: Added a "verbatim" policy to the passthrough guard, for source strings that are legitimately
  identical to their English translation in some or all locales (e.g. `@pantoken/web-components`'s
  `datePlaceholder: "yyyy-mm-dd"`, which most locales keep verbatim). Declare it inline in
  `src/i18n.json` by replacing a plain string entry with `{ "string": "...", "verbatim": ... }`, where
  `verbatim` is `"allow"` (every locale) or `{ allow?, warn?, error? }` — each a list of locale codes
  or `"prefix*"`/`"*"` globs deciding whether an identical response is cached silently, cached with a
  warning, or treated as a likely AI failure (the default for any locale matched by neither list). A
  key's own tiers are checked first; for a locale none of them cover, resolution falls through to the
  caller's `defaultVerbatim` (e.g. a blanket "these locales are close enough to English" rule) instead
  of assuming failure — an explicit `error` tier still wins over a permissive default.
  `@pantoken/translation-adapters` exports `parseI18nSource()` to flatten a `src/i18n.json` into its
  plain strings plus a `verbatim` policy map, and `resolveVerbatimAction()` to resolve one key's policy
  for a given locale; `runI18nTranslationCli`'s `verbatimKeys` option is replaced by `verbatim`.
  `@pantoken/scaffold`'s `collectI18nSource()` now returns `{ source, verbatim }`, merging each
  template's own inline policies the same way it merges template strings.

### Patch Changes

- 7d964ee: Preserve source-identical CSS and technical glossary terms in localized docs, and support required
  verbatim values that bypass translation entirely.
- 7d964ee: Extract the duplicated "translate CLI" driver (identical in `ai/pantoken-ai/scripts/translate.ts`
  and `packages/scaffold/scripts/translate.ts`) into a shared `runI18nTranslationCli()` in
  `@pantoken/translation-adapters`.
- 7d964ee: Extract the duplicated "generate locale bundles from i18n-cache" codegen (identical in
  `ai/pantoken-ai/scripts/generate.ts` and `packages/scaffold/scripts/generate.ts`) into a shared
  `generateLocaleBundles()` in `@pantoken/translation-adapters`.
- 7d964ee: Fixed `generateLocaleBundles()` producing invalid TypeScript for hyphenated locale tags (e.g.
  `en-AU`, `fr-CA`, `zh-Hans`) — the generated `LOCALE_EN-AU` identifier and unquoted `en-AU:` object
  key were syntax errors. Identifiers now replace `-` with `_` (`LOCALE_EN_AU`) and locale keys in the
  `LOCALES` map are quoted.
- 63e06cb: Renamed the generated-locale-bundle index export from `LOCALES` to `MESSAGES` (in
  `generateLocaleBundles`'s codegen template, consumed by `@pantoken/scaffold` and `@pantoken/ai`'s
  generated `locales/index.ts`). It maps locale → key → string, i.e. a message catalog, not a locale
  list — the old name collided in meaning with `@pantoken/i18n`'s locale registry. Updated both
  packages' `cli.ts` to import/export `MESSAGES` accordingly.
- 63e06cb: Changed the default provider-rotation order to `copilot` → `agy` → `claude` (was `claude` → `agy` →
  `copilot`), in both `i18n.config.json`'s default `provider.circuitBreaker.rotation`/`provider.default`
  and the shim's docs.
- 63e06cb: Phase 0 spike (localization-engine plan): added an OpenAI-compatible `POST /v1/chat/completions` shim
  (`src/shim.ts`) over the CLI-agent adapters (`claude -p`/`agy -p`/`copilot -p`), so an off-the-shelf
  tool expecting an OpenAI-shaped API can run on plans already paid for. Includes a per-profile circuit
  breaker (`ProfileBreaker`) that rotates to the next agent after `maxConsecutiveFailures` and
  self-resets after `resetTimeoutMs`, and a `pantoken_provider` response field naming which profile
  produced each result (rotation can mix providers within one batch).

  Also fixes a real defect: `spawnPrompt` had no timeout or kill — a wedged CLI agent hung the caller
  forever. Added an optional `timeoutMs` option that kills the child and rejects once elapsed; existing
  4-argument call sites are unaffected.

  This does not settle whether driving a subscription CLI programmatically for bulk work is within
  provider ToS — the existing translation wrappers already do this today, so the shim is a new
  transport for that behavior, not a new category of it, but the determination itself is a
  product/legal decision outside this change's scope.

- 63e06cb: Bound every AI translation CLI call with a timeout (`DOCS_TRANSLATION_TIMEOUT_MS`, default 120s) so a
  wedged CLI no longer stalls a locale build forever. The child is spawned in its own process group and
  the timeout signals the group, so the CLI a wrapper script started dies with it instead of orphaning
  and holding the pipe open. The `copilot`/`agy` wrappers now run with stdin from `/dev/null` so they
  can't block waiting on interactive input. `DOCS_TRANSLATION_LOCALE` now also
  accepts a comma/space-separated mix of locale tags and `i18n.config.json` tier names (`primary`,
  `secondary`), supports `-` prefixed exclusions (`"-ga"`, `"primary,-hu"`), and rejects a selection
  that matches no docs locale.

## 0.2.0

### Minor Changes

- 40987c4: Add `TranslationMemory` and `sha256` to the shared adapter primitives.

  `TranslationMemory` is a content-addressed translation cache backed by a committed JSON file, parameterised by a `prune` option. Both the docs and i18n pipelines now use it as their shared cache core, wrapping it with pipeline-specific key-construction logic and factory methods.

  `sha256(input)` is a thin helper over `node:crypto` used by both pipeline `keyFor` functions.

## 0.1.0

Initial release.

- `extractJsonObject` — pull the first `{…}` JSON object from a model response, tolerating prose and code fences.
- `spawnPrompt` — spawn an AI CLI tool, pipe the prompt via stdin, resolve with trimmed stdout.
- `sha256` — SHA-256 hex digest helper used by pipeline `keyFor` functions.
- `TranslationMemory` — content-addressed JSON cache with configurable pruning; shared by the docs and i18n translation pipelines.
