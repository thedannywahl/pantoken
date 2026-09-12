# @pantoken/i18n-engine

## 0.3.1

### Patch Changes

- Updated dependencies [0bde734]
  - @pantoken/translation-adapters@1.0.2

## 0.3.0

### Minor Changes

- 28e42c9: Resolve the locale universe from committed catalogs so wildcard tiers actually enumerate.

  `locales.tiers` patterns classify a locale; they can't enumerate one. Reading the set of known
  locales out of the tier lists meant a `secondary: ["*"]` catch-all contributed nothing, so
  `translate`, `render`, and `check` silently covered only the handful of tags spelled out
  explicitly — two locales in this repository, while `lint` and `stats` (which read the `l10n/` tree)
  reported all 44.

  The new `knownLocales(config, configDir)` is the single source of truth: one locale per committed
  catalog directory, unioned with any exact tag named in a tier. `contentLocales` and
  `messagesLocales` now take `configDir` as their second argument.

  Expect previously hidden drift to surface the first time a space is checked after this change: the
  untranslated entries were always there, just outside the locale set the checker looked at.

- 28e42c9: Translate whole-file content units as Markdown documents.

  A content space with `segment: "file"` now fills its catalog one document per request, with fenced
  and inline code, package names, escaped angle brackets, and `{{template}}` tokens masked out before
  the model sees them — the batched JSON prompt used for short keyed strings would have flattened the
  document's structure. The masking and prompt helpers moved into `@pantoken/translation-adapters`
  (`preserveMarkdown`, `restoreMarkdown`, `buildMarkdownTranslationPrompt`, `stripMarkdownEnvelope`)
  so the docs pipeline and the engine share one implementation.

- 28e42c9: Drive content localization spaces from their configuration instead of hard-coded `docs/` paths.

  `include` globs now select a content space's sources, the new `root` field anchors catalog
  references, and `segment` gained a `file` value for whole-Markdown units (what `docs.guides` always
  used in practice). Content spaces can also be AI-translated like message spaces, via a `FillOptions`
  argument on `runTranslateContent`.

  The `docs.guides`/`docs.home` special cases are gone, along with the `runExtractGuides`,
  `runTranslateGuides`, `runRenderGuides`, `runCheckGuides`, `guidesLocales`, `DOCS_GUIDES`, and
  `DOCS_HOME` exports. Call the `runExtractContent`/`runTranslateContent`/`runRenderContent`/
  `runCheckContent` equivalents with an explicit space id instead. Existing catalogs and rendered
  output are unchanged.

## 0.2.0

### Minor Changes

- db34dec: feat: implement the four declared-but-dead `i18n translate` options

  `--locale` was the only option the `translate` action ever read. The rest were parsed and discarded:

  - `--force` retranslates entries that already have a `msgstr`.
  - `--tier <tier>` narrows the run to one `locales.tiers` entry, and rejects an unknown tier name
    rather than silently translating nothing.
  - `--provider <profile>` selects a `provider.profiles` entry for the command, model, and effort.
    Profiles gained a `command` field (a path with a separator resolves against the config directory),
    so the per-package `I18N_TRANSLATION_COMMAND` plumbing is no longer needed —
    `--provider copilot` is enough. `I18N_TRANSLATION_COMMAND` and `I18N_TRANSLATION_COMMAND_ARGS`
    still override a resolved profile when set.
  - `--concurrency <n>` bounds how many provider calls run at once. Batches were previously awaited
    strictly one at a time, so the `concurrency` already declared on every provider profile did
    nothing.

### Patch Changes

- db34dec: fix: read catalogs directly instead of checking existence first

  `writeCatalog` and the PO loaders asked `existsSync` before reading, a check-then-use pattern
  (CWE-367) that leaves a window in which the file can be created or removed between the two calls.
  They now read through a shared `readCatalog`, which returns `undefined` on `ENOENT` and rethrows
  anything else, so the missing-file case is handled by the read itself rather than by a prior probe.

- db34dec: fix: don't restamp a catalog's revision date when nothing changed

  Every `serializePot`/`serializePo` call stamps a fresh `PO-Revision-Date`, and every writer wrote
  its result unconditionally. Because `translate` now re-extracts a template on each run, an
  otherwise no-op run still rewrote every `l10n/*.pot` with a new timestamp — showing up as a dirty
  working tree, a spurious diff in review, and a busted build cache for any task keyed on those files.

  Catalog writes now go through `writeCatalog`, which leaves the file completely untouched (mtime
  included) when the new content differs from what is on disk only by that timestamp. A real unit
  change still writes, and still restamps the date.

- db34dec: fix: `i18n translate` re-extracts the POT, so new source strings actually get translated

  `runTranslateMessages` and `runTranslateContent` only ran `msgmerge` against the committed
  `l10n/<space>.pot`. Nothing in the repository ever ran `i18n extract`, so a key added to a space's
  source (`src/i18n.json`, a guide, a demo) never reached the POT — and therefore never reached the PO
  catalogs the AI fill step reads. `i18n check` re-extracted from source, so it reported those keys as
  permanently "untranslated" and blocked CI no matter how many times `translate` was run. Every
  messages-space POT in the repository had silently drifted.

  Both translate paths now re-extract before merging, and `i18n check` reports a stale POT as its own
  drift finding instead of leaving it to surface as phantom untranslated units. The drift fix hint no
  longer recommends `i18n render`, which is a no-op for messages spaces — their locale bundles are
  rebuilt by the owning package's `generate` script.

  A single-file messages source now leaves each unit's `reference` empty so the POT records the
  space's source path, rather than emitting a bare message key as the file reference.

## 0.1.1

### Patch Changes

- cc319ee: Harden documentation and localization tooling against unsafe filesystem paths, diagnostic leakage, and expensive input parsing.
- Updated dependencies [cc319ee]
  - @pantoken/translation-adapters@1.0.1

## 0.1.0

### Minor Changes

- 63e06cb: Moves drift policy into the root `i18n.config.json` schema. The shared drift reporter now derives locale tiers, surface severities, and fallback behavior from that single configuration file.
- 63e06cb: `i18n check` is now real for `docs.guides`, reusing the existing `DriftReporter` (from
  `@pantoken/translation-adapters`, unchanged) rather than a new implementation. Untranslated units are
  reported as drift findings per locale, severity resolved from `config.locales.tiers` +
  `config.defaults.drift` (a `source`-tier unit blocks by default, everything else warns). `--strict`
  escalates every warn to blocking, matching the legacy `I18N_DRIFT_STRICT` convention. `lint`/`stats`
  remain not-yet-implemented.
- 63e06cb: Phase 2 of the localization-engine plan: real `extract`/`translate`/`render` for the `docs.guides`
  space.

  - `src/extract.ts` — promotes the offset-splice technique proven in the Phase 0 spike into a real
    extractor: `collectProseRanges`/`extractFileUnits`/`extractGuideSpace` collect only prose `text`
    mdast nodes (code fences stay preserved verbatim — translating prose inside `html`/`jsx`/`mermaid`
    fences needs the embedded sub-extractors, which are real Phase 4 work). `renderFile` splices
    resolved translations back by absolute offset.
  - `src/pipeline.ts` — `runExtractGuides` writes a real POT from `docs/guide/**`; `runTranslateGuides`
    keeps each locale's PO current via `msgmerge` (a deliberate no-op beyond that: there's no
    authorized real AI backend wired up, so untranslated entries stay untranslated rather than faking
    a translation); `runRenderGuides` splices each locale's PO back into `docs/{locale}/guide/**`,
    falling back to the English source for anything untranslated.
  - `i18n extract`/`translate`/`render` are now real for `docs.guides` (and the default when no space
    is given); every other space still reports not-yet-implemented.

  Verified end-to-end via the built CLI binary against a real `docs/guide` fixture, and via the actual
  `docs/guide` corpus in tests (extracts 20+ real units; the shell-fenced agent-bootstrap prompt is
  correctly NOT extracted).

- 63e06cb: Adds `msgctxt` (keyed) support to the PO/POT reader-writer and a real extract/translate/check
  pipeline for `"messages"`-kind spaces (e.g. `ui.strings`), generalizing the CLI beyond
  `docs.guides`.

  - `src/po.ts` — `PoEntry.msgctxt` is a real field now: `parsePo`/`serializePo`/`serializePot` read
    and write `msgctxt "..."` lines. Two units with the same `msgid` but different `msgctxt` stay
    distinct PO entries (previously deduped by `msgid` alone). `serializePot` units may also carry
    per-unit extra `flags`.
  - `src/extract-messages.ts` (new) — `parseMessageSource`/`extractMessagesSpace` read a
    `src/i18n.json`-shaped source (bare string, or `{message, translate}`) into keyed `MessageUnit`s.
  - `src/pipeline.ts` — `runExtractMessages`/`runTranslateMessages`/`runCheckMessages`/
    `resolveMessagesForLocale`/`messagesLocales` mirror the `docs.guides` functions for any
    `kind: "messages"` space. `resolveMessagesForLocale` is the hook a package's own codegen (e.g.
    `packages/i18n/scripts/build-bundles.ts`) uses to read resolved strings back out.
  - `src/cli.ts` — `extract`/`translate`/`check` now dispatch to the messages pipeline for any space
    configured with `kind: "messages"` in `i18n.config.json`, not just `docs.guides`. `render` for a
    messages space is a documented no-op (a messages space's codegen reads PO catalogs directly).

- 63e06cb: Phase 3 building block (localization-engine plan): MF2 (MessageFormat 2) validation, wrapping
  `messageformat` (the reference implementation) rather than re-implementing parsing. `validateMf2`
  parses and validates a message, collecting syntax and data-model errors (`missing-fallback`,
  `duplicate-declaration`, `duplicate-variant`, …) instead of throwing. `missingPluralCategories`
  reports which of a target locale's CLDR plural categories (via `Intl.PluralRules`) a `.match` select
  message doesn't cover — a catch-all (`*`) variant only ever satisfies `"other"`, since that's its
  conventional meaning in a single-parameter plural message; every other category needs its own
  literal variant or that plural form silently renders the catch-all's text instead of a
  linguistically correct one.
- 63e06cb: Phase 2 building block (localization-engine plan): the PO transport layer.

  - `src/po.ts` — a minimal gettext PO/POT reader/writer: `parsePo`/`serializePo`/`serializePot`,
    handling `msgid`/`msgstr` (single- and multi-line quoted strings), `#:` reference comments, `#,`
    flag comments (including `fuzzy`), and `#~` obsolete entries. Never re-implements `msgmerge`'s
    fuzzy-matching.
  - `src/gettext.ts` — shells out to the real `msgmerge`/`msgfmt` binaries: `mergePoWithTemplate`
    (update-in-place, seeding a new PO from the template), `checkPoFile` (`msgfmt --statistics -c`),
    and `isGettextAvailable`. Verified against real binaries: a reworded source string is fuzzy-matched
    (prior translation preserved, not lost); a removed-but-translated string survives as `#~` obsolete;
    an untranslated removed string is correctly discarded (nothing to preserve); an invalid PO
    (duplicate `msgid`) throws instead of returning bogus statistics.

- 63e06cb: Phase 1 of the localization-engine plan: the engine skeleton. New private package
  `@pantoken/i18n-engine` with:

  - `src/config.ts` — the `i18n.config.json` schema (catalogs, PO options, locales, provider/circuit
    breaker, defaults, spaces) and a defaulting loader (`loadConfig`/`parseConfig`).
  - `src/locales.ts` — locale tier resolution (`resolveTier`, pattern matching), lifecycle
    (`moveLocaleToTier`, `excludeLocale`/`includeLocale`), and per-space `only`/`exclude` scoping
    (`localesForSpace`) — one axis (tiers), not a separate lifecycle enum.
  - `src/cli.ts` / `bin/i18n.mjs` — the `i18n` CLI. `locale promote/demote/exclude/include` are real
    (read-modify-write `i18n.config.json`); `extract`/`translate`/`render`/`check`/`lint`/`stats` parse
    their full selector surface (space, `--locale`, `--tier`, `--provider`, `--concurrency`, `--force`,
    `--strict`) but report not-yet-implemented — extraction, translation, and rendering are later
    phases.

- 63e06cb: Normalizes content and keyed-message extraction around a shared catalog-unit identity and offset-safe renderer.
- 63e06cb: Phase 3 (localization-engine plan): runtime helpers for MF2 messages and locale-aware formatting.

  - `formatMessage(locale, source, params?)` — formats an MF2 message via `messageformat` (the
    reference implementation). MF2 placeholders are already bidi-isolated by `messageformat`'s own
    default; `isolate()` is for interpolation done outside MF2 formatting.
  - `isolate(value)` — wraps a value in Unicode FSI/PDI bidi isolates.
  - `formatNumber`/`formatDate`/`formatList`/`formatRelativeTime` — thin locale-bound wrappers over
    `Intl.NumberFormat`/`DateTimeFormat`/`ListFormat`/`RelativeTimeFormat`, so callers never hand-format.

  Adds `messageformat` as a new dependency; verified the built bundle stays Node-free (no `node:*`
  imports leak in transitively), matching this package's existing browser-shipping constraint.

- 63e06cb: Replaces `@pantoken/web-components`'s legacy `ui.strings` translation pipeline with the
  `@pantoken/i18n-engine`-based one, preserving every existing translation.

  - `renderers/web-components/src/i18n.json` now uses the `{message, translate}` schema
    (`translate: "optional"` replaces the old `verbatim: "allow"`) instead of `{string, verbatim}`.
  - The 44-locale `i18n-cache/*.json` translation memory is migrated, verbatim, into
    `l10n/{locale}/ui.strings.po` (`msgctxt`-keyed by the source's own key, `msgid` the English
    source text) — every translated string was diffed against its source cache and confirmed
    byte-identical before the old cache was deleted.
  - `renderers/web-components/scripts/translate.ts` and `check-drift.ts` are deleted. `pnpm
translate`/`pnpm check:drift` now run the real `i18n` CLI (`i18n translate/check ui.strings`)
    against the root `i18n.config.json`.
  - `packages/i18n/scripts/build-bundles.ts` now reads resolved strings via
    `resolveMessagesForLocale()` from `@pantoken/i18n-engine` instead of the deleted cache directory.
    The regenerated `src/locales/*.ts` bundles are byte-identical to what they replace — no content
    regression.
  - Adds the root `i18n.config.json`, defining the `docs.guides` (content) and `ui.strings`
    (messages) spaces the engine now drives.

### Patch Changes

- 63e06cb: Add a Vite task that starts the live HTML coverage report watcher.
- 63e06cb: Add a real `i18n lint` gate that validates required localization spaces, source schemas, PO catalogs, and catalog identities.
- 63e06cb: Adds `i18n.config.schema.json` and links the root `i18n.config.json` to it with `$schema`, documenting catalogs, locales, providers, drift policy, and localization spaces for editor tooling.
- 63e06cb: Use the real `instui-progress` component for the coverage bar in `i18n stats --html`, replacing the bespoke `bar-track`/`bar-fill` markup.
- 63e06cb: Rebuild the `i18n stats --html` report on real `@pantoken/components` markup (`table`, `pill`, `text-input`, `simple-select`) and `@pantoken/css` tokens, linked as stylesheets relative to the report's output path, instead of bespoke inline CSS.
- 63e06cb: Add `i18n stats --html` for a sortable, filterable HTML coverage report (filterable by space, locale, tier, and policy) generated from the same rows as the JSON report.
- 63e06cb: Add a policy-filterable, git-ignored language coverage report through `i18n stats`.
- 63e06cb: Fix `i18n stats` reporting coverage over 100% for locales whose PO catalog has stale entries (translated units removed from the source since the last `msgmerge`, but not pruned as `#~` obsolete). Only PO entries that still exist in the current POT count toward `translated`.
- 63e06cb: Add the root `i18n:coverage` Vite+ task for generating local language coverage reports.
- 63e06cb: Wired real AI translation into the `i18n translate` command for "messages"-kind spaces
  (`ui.strings`, `cli.scaffold`, `cli.ai`). Previously `i18n translate` only ran `msgmerge` and always
  reported `(no AI provider authorized yet)`, even when translation had already happened out of band —
  the pipeline never actually called an AI provider for these spaces.

  `runTranslateMessages` now fills empty `msgstr` entries via `I18N_TRANSLATION_COMMAND` /
  `I18N_TRANSLATION_COMMAND_ARGS` (same convention as the legacy pipelines), batching untranslated
  strings by `provider.batchBudget` and rotating through whichever CLI agent (`claude`/`agy`/
  `copilot`) the command points at. It no-ops, leaving every entry untranslated, when the env var is
  unset — unchanged behavior for CI and any script that doesn't configure a provider.

  `docs.guides` is intentionally not wired through this path — it keeps its own dedicated,
  markdown-aware AI pipeline (`docs/scripts/translate-guide-po.ts`).

  Added differentiated `translate`/`translate:agy`/`translate:copilot` scripts to
  `@pantoken/web-components`, `@pantoken/scaffold`, and `@pantoken/ai` (previously every adapter
  variant silently ran the exact same plain script), and updated the root `ui:translate:*`/
  `cli:translate:*` umbrella tasks to route to them.

- 63e06cb: Expose the localization configuration and source JSON Schemas as package assets.
- 63e06cb: Add standard gettext metadata to generated PO and POT catalog headers.
- 63e06cb: Adds package documentation covering locale registration, selective bundle imports, typed locale sets, and runtime localization helpers.
- 63e06cb: Add live coverage reports, per-locale all-space rollups, and automatic report refreshes after catalog writes.
- 63e06cb: Renamed the internal locale registry: `CANVAS_LOCALES` → `LOCALES`, the `LocaleMeta` interface →
  `LocaleInfo`, and `src/lib/canvas-locales.ts` → `src/lib/locales.ts`. This decouples the registry's
  name from Canvas — the data is still seeded from Canvas LMS's supported-language list, but pantoken
  no longer frames the registry as "the set of locales Canvas supports." `CANVAS_LOCALES` and
  `LocaleMeta` are no longer exported; consumers should import `LOCALES` and `LocaleInfo` instead.
- 63e06cb: Qualifies message catalog contexts with their localization space, such as `cli.scaffold:promptPlatform`, while preserving the existing runtime message keys.
- 7d964ee: This is a no-op changeset to satisfy changeset coverage for packages with transitively modified lock files but no code changes.
- 63e06cb: Registers all remaining documentation surfaces in `i18n.config.json`, including explicit source ownership for API, home, chrome, glossary, demos, and parity checks.
- 63e06cb: Require complete translations for every supported locale in all localization spaces except the still-in-progress API docs.
- 63e06cb: Changed the default provider-rotation order to `copilot` → `agy` → `claude` (was `claude` → `agy` →
  `copilot`), in both `i18n.config.json`'s default `provider.circuitBreaker.rotation`/`provider.default`
  and the shim's docs.
- 63e06cb: Adds a reusable `i18n.source.schema.json` and attaches it to normalized package and template message sources. All current package-owned i18n entries now use explicit `{message, translate}` objects.
- 7d964ee: Unify `@pantoken/web-components`'s locale-string translation pipeline with the generic
  `src/i18n.json` + `i18n-cache/*.json` + `translate`/`check:drift` convention already used by
  `@pantoken/scaffold` and `@pantoken/ai`, retiring `@pantoken/i18n`'s bespoke
  `sha256("wc\0"+key+"\0"+value)`-hashed translation memory (`scripts/build-bundles.ts`,
  `scripts/translate-bundles.ts`, `scripts/check-bundle-drift.ts`, and their `scripts/lib/*` helpers).

  `@pantoken/web-components` now owns its own `i18n-cache/*.json` (plain-key, migrated from the old
  hashed cache with no translation loss) plus `scripts/translate.ts` / `scripts/translate:agy` /
  `scripts/check-drift.ts`. `@pantoken/i18n`'s `scripts/build-bundles.ts` reads that cache directly to
  build its `LocaleBundle`s — it no longer runs its own translation step; `LocaleBundle`,
  `defineBundle`, and `registerLocalized` are unchanged and stay in `@pantoken/i18n`, since they're a
  consumption-shape concern (mapping translated strings into `register()`-compatible shapes), not a
  translation-pipeline concern.

  Root task aliases `ui:translate`/`ui:translate:agy` now point at
  `@pantoken/web-components#translate`/`translate:agy`, and `i18n:check:drift` now runs
  `@pantoken/web-components#check:drift` instead of `@pantoken/i18n#check:drift`. No change to any
  public `@pantoken/i18n` export or generated `LocaleBundle` output (verified byte-identical after
  migration).

- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [63e06cb]
- Updated dependencies [63e06cb]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [63e06cb]
- Updated dependencies [63e06cb]
- Updated dependencies [63e06cb]
- Updated dependencies [63e06cb]
  - @pantoken/translation-adapters@1.0.0
