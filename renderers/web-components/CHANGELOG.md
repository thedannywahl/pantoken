# CHANGELOG

## 0.6.4

### Patch Changes

- Updated dependencies [c22ba83]
  - @pantoken/components@1.1.4

## 0.6.3

### Patch Changes

- Updated dependencies [0bde734]
  - @pantoken/components@1.1.3

## 0.6.2

### Patch Changes

- Updated dependencies [28e42c9]
  - @pantoken/scaffold-base@0.3.0
  - @pantoken/components@1.1.2

## 0.6.1

### Patch Changes

- db34dec: fix: the `:force` translation tasks now actually force, and docs chrome/demo catalogs merge

  `ui:translate:force` and `cli:translate:force` (and their `:agy` / `:copilot` variants) ran commands
  byte-identical to their non-force twins. `docs:locales:translate:force` exported
  `DOCS_TRANSLATION_FORCE=1`, which no script read. Both paths now retranslate for real — the CLI
  tasks through `i18n translate --force`, and the docs scripts through a translation-memory lookup that
  misses on purpose while the environment variable is set.

  `docs:chrome:locales` and `docs:demos:locales` parsed each locale's PO file directly and never merged
  it against a template, so a new key in `docs/.vitepress/i18n.json` or a `demos/*/i18n.json` could not
  reach them. They now extract and `msgmerge` first.

  New `ui:extract`, `cli:extract`, `docs:extract`, and `i18n:extract` tasks refresh a catalog template
  from its source without spending translation credits.

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

- @pantoken/components@1.1.1
  - @pantoken/icons@0.2.2

## 0.6.0

### Minor Changes

- 7d964ee: Added a force/no-cache option to both translation pipelines, so already-cached content can be
  retranslated (and overwritten) instead of only ever filling cache misses. Set
  `DOCS_TRANSLATION_FORCE=1` for the docs pipeline (`translateUnits`) or `I18N_TRANSLATION_FORCE=1` for
  the shared CLI string pipeline (`runI18nTranslationCli`, used by `@pantoken/scaffold`, `@pantoken/ai`,
  and `@pantoken/web-components`), or use the new convenience scripts: `docs:locales:translate:force`,
  each package's `translate:force`, and the root `i18n:translate:force` umbrella task.
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

- 63e06cb: Move the web-components locale bundles and localization helpers into `@pantoken/web-components`.
  English source strings remain in `src/i18n.json`, with translations generated from the repository
  PO/POT catalogs in `/l10n`.

### Patch Changes

- 63e06cb: Renamed each package's build-script-only locale-registry copy to match `@pantoken/i18n`'s renamed
  `LOCALES`/`LocaleInfo` (was `CANVAS_LOCALES`/`LocaleMeta`): `scripts/lib/canvas-locales.ts` →
  `scripts/lib/locales.ts` in each package. The duplication itself is unchanged (still a deliberate
  copy to avoid a new workspace dependency in build scripts) — only the naming is decoupled from Canvas.
- 7d964ee: Translation drift is now gated by a configurable per-surface, per-locale policy instead of a
  hard-coded exit code in each checker.

  Every drift checker reports findings to a shared `DriftReporter`
  (`tools/translation-adapters/src/drift-policy.ts`), which resolves a severity — `block`, `warn`, or
  `off` — from the new root `i18n-policy.json`. Severity is a `(surface, locale-tier)` matrix, so a hard
  gate can be kept on the surfaces and locales that matter while the long tail of locales only warns.
  That decouples merge latency from locale count: adding an English string no longer waits on ~90
  translations.

  Ten surfaces are addressable: `ui.strings`, `cli.scaffold`, `cli.ai`, `docs.guides`, `docs.api`,
  `docs.home`, `docs.chrome`, `docs.glossary`, `docs.demos`, and `docs.parity`. The committed default
  blocks on English source integrity and structural locale parity, and warns on every actual translation
  gap.

  `docs.home` is new coverage, not just a new knob: the home page's frontmatter has a translation
  pipeline and 43 committed cache files but never had a drift check, so edits to `docs/index.md` went
  unnoticed. Its unit derivation now lives in `docs/scripts/home-i18n.ts`, shared by `translate-home.ts`
  and the drift check so the two can't disagree about what a cache key should be.

  Extracting it also fixed two latent bugs in the home-page pipeline:

  - A translatable key was only found on its own indented line, so reordering a feature or action so
    that `title`, `text`, `details`, or `link` became the YAML list item's first key silently dropped it
    from translation — and left its `link` without the locale prefix, producing a 404 under a localized
    route. The key patterns now accept an optional list dash and capture it, so the rebuilt line is
    byte-identical apart from the translated value.
  - The rewrite scanned the whole file, not just the frontmatter, so body prose shaped like frontmatter
    (a markdown list such as `- title: Naming things`) would have been rewritten as if it were page
    metadata and cached as a phantom unit. Matching is now scoped to the frontmatter block, and a
    missing or unterminated frontmatter throws instead of writing 43 untranslated copies.

  Neither fix changes the unit set derived from the current `docs/index.md` (14 units, same keys), so no
  committed translation is invalidated.

  Non-blocking drift is still visible: the reporter emits capped GitHub annotations on the PR diff plus
  a job-summary table. `I18N_DRIFT_STRICT=1` escalates every warning to blocking, and
  `vp run i18n:check:drift:strict` sweeps all surfaces that way for a pre-release audit.

- 7d964ee: Added a GitHub Copilot CLI translation adapter (`tools/translation-adapters/copilot-wrapper.sh`) and
  wired `translate:copilot` / `translate:copilot:force` scripts plus root `i18n:translate:copilot` /
  `i18n:translate:force:copilot` umbrella tasks across the UI, docs, and CLI i18n pipelines, matching
  the existing `agy` adapter wiring. Defaults to `--model gpt-5-mini --effort low`, the cheapest model
  with reasoning-effort support and its minimum effort level — plenty for literal UI-string
  translation and far cheaper than the CLI's `auto` model selection.

  Pinned the same "cheapest capable tier, minimum effort" defaults for the `agy` and `claude`
  adapters: `agy` scripts now default to `--model gemini-3.6-flash-low` (agy bakes reasoning effort
  into the model name), and `claude`/direct-invocation scripts (`translate`, `translate:force`, and
  the docs pipeline's `:claude` scripts) now pin `--model claude-haiku-4-5-20251001 --effort low`
  instead of relying on unset defaults.

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

- 7d964ee: Added a combined `translate:agy:force` script (and root `i18n:translate:force:agy` umbrella task) so
  the agy adapter can be re-run with the translation-memory cache bypassed across all i18n pipelines
  (UI, docs, CLI), matching the existing `docs:locales:translate:agy:force` script.
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
- 7d964ee: This is a no-op changeset to satisfy changeset coverage for packages with transitively modified lock files but no code changes.
- 63e06cb: Synchronize localized package surfaces and generated localization output.
- 63e06cb: Adds a reusable `i18n.source.schema.json` and attaches it to normalized package and template message sources. All current package-owned i18n entries now use explicit `{message, translate}` objects.
- 7d964ee: Fix test failures:

  - **web-components**: Resolve i18n.json path relative to check-drift.ts script directory using `import.meta.url`, fixing module import errors in tests.
  - **tinymce**: Defend onChange handlers against missing properties with optional chaining to prevent TypeError in test scenarios.

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
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
  - @pantoken/components@1.1.0
  - @pantoken/model@0.3.2
  - @pantoken/interactions@0.3.7
  - @pantoken/scaffold-base@0.2.1
  - @pantoken/icons@0.2.1

## 0.5.8

### Patch Changes

- Updated dependencies [f053604]
  - @pantoken/components@1.0.3

## 0.5.7

### Patch Changes

- 8aa88bb: Add preset ledger infrastructure and platform presets for scaffold migration to Bingo.

  **Scaffold-Base Package (`@pantoken/scaffold-base`):**

  - Switch template source to `.jsonc` for comment support
  - Generate static `cssdoc.ts` at build time, template remains as source

  **Scaffold Presets:**

  - Create platform presets in `@pantoken/components`, `@pantoken/react`, `@pantoken/vue`, `@pantoken/web-components`
  - Each platform exports `./scaffold-preset` entry point with Bingo-compatible preset definition
  - Presets extend shared scaffold-base with common options (name, cssdoc block, wrapper context)

  **Scaffold Package (`@pantoken/scaffold`):**

  - Introduce `scan-presets.ts` script that discovers all packages exporting `./scaffold-preset`
  - Generate static `preset-ledger.ts` registry at pre-build time, used by CLI to validate platforms
  - Wire preset scanning into scaffold build/test/check pipeline
  - Update `scaffoldProject` function to async, validates platform is in PRESET_LEDGER
  - Update CLI to handle async scaffolding with proper error handling
  - Update scaffold/generate.ts to read cssdoc template from scaffold-base with JSONC parsing (strips comments for output)

  **Key Features:**

  - Decentralized preset ownership: each platform package maintains its own preset definition
  - Static ledger generation enables type-safe platform discovery at runtime
  - JSONC source templates with comments for documentation
  - Foundation for future Bingo template rendering integration (presets are now validated and available)

- Updated dependencies [8aa88bb]
- Updated dependencies [8aa88bb]
- Updated dependencies [8aa88bb]
- Updated dependencies [8aa88bb]
- Updated dependencies [8aa88bb]
- Updated dependencies [8aa88bb]
- Updated dependencies [8aa88bb]
- Updated dependencies [8aa88bb]
  - @pantoken/icons@0.2.0
  - @pantoken/interactions@0.3.6
  - @pantoken/model@0.3.1
  - @pantoken/components@1.0.2
  - @pantoken/scaffold-base@0.2.0

## 0.5.6

### Patch Changes

- Updated dependencies [343c59d]
- Updated dependencies [343c59d]
- Updated dependencies [343c59d]
  - @pantoken/components@1.0.1
  - @pantoken/interactions@0.3.5

## 0.5.5

### Patch Changes

- Updated dependencies [aaf4751]
- Updated dependencies [aaf4751]
  - @pantoken/components@1.0.0
  - @pantoken/icons@0.1.9
  - @pantoken/interactions@0.3.4

## 0.5.4

### Patch Changes

- e6c0d3b: Add a new `drawer-layout` CSS component with `tray`, `handle`, and `content` members in `@pantoken/components`.

  Extract DrawerLayout command and responsive-overlay wiring into a shared `initResponsiveOverlay()` behavior in `@pantoken/interactions` (named for the interaction it provides, not the component), and wire both the interactions entry point and the web component to import it.

  Update interactions capability metadata so `drawer-layout` is marked as `both` (CSS + JS).

- Updated dependencies [e6c0d3b]
- Updated dependencies [e6c0d3b]
- Updated dependencies [e6c0d3b]
- Updated dependencies [e6c0d3b]
  - @pantoken/components@0.7.1
  - @pantoken/interactions@0.3.3
  - @pantoken/icons@0.1.8

## 0.5.3

### Patch Changes

- Updated dependencies [90ce910]
- Updated dependencies [90ce910]
- Updated dependencies [90ce910]
- Updated dependencies [90ce910]
- Updated dependencies [90ce910]
- Updated dependencies [90ce910]
- Updated dependencies [90ce910]
- Updated dependencies [90ce910]
  - @pantoken/components@0.7.0
  - @pantoken/interactions@0.3.2
  - @pantoken/icons@0.1.7

## 0.5.2

### Patch Changes

- Updated dependencies [db834de]
  - @pantoken/components@0.6.0
  - @pantoken/interactions@0.3.1
  - @pantoken/icons@0.1.6

## 0.5.1

### Patch Changes

- b2566cc: Republish with internal dependencies resolved to real semver instead of the literal `workspace:*`
  protocol string. Every previously published version of this package shipped with that bug (found by
  `scripts/release/audit-workspace-protocol.ts`), because the release pipeline packed with `npm
pack`/`npm publish`, which doesn't understand pnpm's `workspace:` protocol; it now packs with
  `pnpm pack` first, which resolves it. No functional change beyond the dependency ranges themselves.
- Updated dependencies [b2566cc]
  - @pantoken/components@0.5.1
  - @pantoken/icons@0.1.5

## 0.5.0

### Minor Changes

- 853659c: Add arbitrary maximum values and InstUI-compatible animation support to ProgressBar and
  ProgressCircle.

  Both components now expose `--min`, `--value`, and `--max`, keep deprecated `--value-now` and
  `--value-max` aliases, and share their InstUI transition rules through the transition plugin.
  ProgressCircle also exposes `--animation-delay`, keeps the deprecated `-should-animate-on-mount` and
  `-shold-animate-on-mount` aliases, and uses the same timeout behavior in plain HTML and web
  components. The ProgressBar web component retains its meter between attribute updates so
  `should-animate` transitions remain functional.

  Their cssdoc records restrict usage to native `progress` and `meter` elements. Both web components
  render `progress` for zero-based ranges and switch to `meter` when `min` is non-zero.

### Patch Changes

- 853659c: Add InstUI-compatible timeout dismissal to Alert. Class-based alerts accept a millisecond
  `--timeout`, emit a cancelable `dismiss` event, and remove themselves through the Alert interaction
  bundle, with fades driven by `@pantoken/plugin-transition`. Per-component IIFEs now retain their
  initialization side effects, and the web component shares the same removal behavior directly.
- Updated dependencies [853659c]
- Updated dependencies [853659c]
- Updated dependencies [853659c]
- Updated dependencies [853659c]
- Updated dependencies [853659c]
- Updated dependencies [853659c]
  - @pantoken/components@0.5.0
  - @pantoken/interactions@0.3.0

## 0.4.2

### Patch Changes

- Updated dependencies [d4ba8fe]
  - @pantoken/components@0.4.1

## 0.4.1

### Patch Changes

- 47f3275: abstract component interactions into shared package
- 47f3275: Extract shared spacing and Invoker Commands helpers from `@pantoken/web-components` into a new `@pantoken/interactions` package.

  `@pantoken/web-components` now consumes these helpers from `@pantoken/interactions` with no behavioral change.

- Updated dependencies [47f3275]
- Updated dependencies [47f3275]
- Updated dependencies [47f3275]
- Updated dependencies [47f3275]
- Updated dependencies [47f3275]
- Updated dependencies [47f3275]
  - @pantoken/interactions@0.2.0
  - @pantoken/components@0.4.0

## 0.4.0

### Minor Changes

- ebe77e5: Export `NESTED_DEPS` (alongside the existing `ELEMENTS`) so consumers building tooling around `register()`'s `only` option no longer need to hardcode a copy of the transitive-dependency map.

  Add a small IIFE build per element (`dist/<name>.iife.js`, e.g. `dist/alert.iife.js`), alongside the existing "everything" `dist/web-components.iife.js`, for a classic `<script src>` consumer who only wants one custom element. Most stay under ~600 KB (down from the ~2.5 MB monolith); the handful that render an inline icon glyph (`icon`, `calendar`, `date-input`, `drilldown`, `rating`) still bundle the icon set, since they genuinely need it. No behavior change for existing consumers — `register()`'s default icon resolution is unchanged.

## 0.3.2

### Patch Changes

- Updated dependencies [7879f6b]
  - @pantoken/components@0.3.0

## 0.3.1

### Patch Changes

- 03a9dc1: escape weekday strings to prevent unsanitized HTML injection

## 0.3.0

### Minor Changes

- 40987c4: Add first-class i18n and RTL support to the web component layer.

  **`@pantoken/web-components`**

  `register()` gains three new options: `locale` (BCP47 tag), `strings` (partial `WebComponentStrings` override), and `dir` (`"ltr" | "rtl"`). All user-visible strings in the behavioral elements are now localizable:

  - `<instui-calendar>` — weekday headers and month label rendered via `Intl.DateTimeFormat`; prev/next `aria-label`s from `strings`; locale-aware first-day-of-week via `Intl.Locale.weekInfo`; RTL swaps chevron icons.
  - `<instui-date-input>` — default label, placeholder, and trigger `aria-label` from `strings`; date `<input>` always carries `dir="ltr"` regardless of page direction (ISO dates are LTR).
  - `<instui-date-time-input>` — time field `aria-label` from `strings`.
  - `<instui-drilldown>` — synthesized Back row text from `strings`; RTL swaps the arrow icon.

  New exports: `WebComponentStrings`, `ENGLISH_STRINGS`, `makeStrings`, `resolveFirstDay`.

  **`@pantoken/i18n`** _(new package)_

  Ships pre-built `LocaleBundle` objects for all 44 Canvas-supported locales (3 RTL: `ar`, `he`, `fa`). Weekday names are derived at runtime via `Intl.DateTimeFormat`; the 7 translatable UI strings are populated from a committed SHA-256-keyed translation memory (`i18n-cache/*.json`). Hungarian (`hu`) ships with full translations; all other non-English locales fall back to English pending `vp run i18n:translate`.

  Key exports: `registerLocalized`, `defineBundle`, `CANVAS_LOCALES`, `getDir`, per-locale bundle objects (`ar`, `hu`, `zh-Hans`, …).

  Translation tooling: `vp run i18n:translate` / `i18n:translate:agy` (AI, local-only), `vp run i18n:check:drift` (CI gate), `vp run i18n:bundles:build` (regenerate TS bundles from cache). New string sources are auto-discovered via `src/i18n.json` convention — no manual registry needed. Supports `agy` via `tools/translation-adapters/agy-wrapper.sh`.

## 0.2.10

### Patch Changes

- Updated dependencies [658021f]
  - @pantoken/components@0.2.9

## 0.2.9

### Patch Changes

- Updated dependencies [f97aeb6]
  - @pantoken/components@0.2.8

## 0.2.8

### Patch Changes

- Updated dependencies [2b814bd]
  - @pantoken/components@0.2.7

## 0.2.7

### Patch Changes

- Updated dependencies [8391068]
- Updated dependencies [8391068]
  - @pantoken/model@0.3.0
  - @pantoken/icons@0.1.4
  - @pantoken/components@0.2.6

## 0.2.6

### Patch Changes

- Updated dependencies [0306bf4]
  - @pantoken/components@0.2.5

## 0.2.5

### Patch Changes

- @pantoken/components@0.2.4

## 0.2.4

### Patch Changes

- 424f57a: Resolve Snyk Code (SAST) findings and two latent web-component bugs.

  - File server: contain resolved paths inside `serveDir` (path-traversal fix).
  - Demo runner and docs theme: target the host origin instead of `"*"`, drop cross-origin messages, and sanitize highlighted code before `innerHTML` (DOM-XSS fix).
  - Web components: scope the `withSpacing` observer to the spacing attributes so it no longer self-triggers, and route Invoker `command`/`commandfor` through a per-target handler map so drilldown and shared-document cases resolve correctly.

- Updated dependencies [424f57a]
  - @pantoken/components@0.2.3
  - @pantoken/icons@0.1.3

## 0.2.3

### Patch Changes

- Updated dependencies [e099a51]
  - @pantoken/model@0.2.0
  - @pantoken/components@0.2.2
  - @pantoken/icons@0.1.2

## 0.2.2

### Patch Changes

- 3d2f6db: # Enrich npm package metadata

  Every published package now carries `homepage`, `bugs`, `repository.directory`, `sideEffects`,
  `engines`, and `publishConfig.provenance`. npmjs.com pages link back to the docs site, the issue
  tracker, and the exact monorepo folder; `sideEffects` lets bundlers tree-shake the pure packages
  while preserving the stylesheets in the CSS-shipping ones.

- Updated dependencies [3d2f6db]
  - @pantoken/components@0.2.1
  - @pantoken/icons@0.1.1
  - @pantoken/model@0.1.1

## 0.2.1

### Patch Changes

- 9ecba6c: # Fix a TypeDoc link warning in the `register()` doc comment

  De-link the internal `NESTED_DEPS` reference and the `ELEMENTS` reference in `register()`'s `@param options` comment, so the API docs (and the Angular re-export that inherits this comment) generate without warnings. Comment-only change — no runtime or type-shape change.

## 0.2.0

### Minor Changes

- c8b956d: # CDN distribution: lean token sheet, component-icons, and web-component drop-ins

  Publish the files the CDN combine URLs (and the docs picker) point at:

  - **`@pantoken/css`** — new `style.lean.css` export: the full sheet minus the
    `--instui-icon-*` glyph set (~22.5 KB gzip vs ~140 KB), the recommended CDN
    foundation. Both sheets now carry the elevation + focus-outline custom
    properties. Adds a runtime dependency on `@pantoken/utils`.
  - **`@pantoken/components`** — new `component-icons.css` export (the ~11 icons the
    component sheets reference), so a per-component CDN load resolves its icons
    against the lean sheet. The elevation + focus-outline custom properties are no
    longer defined in `components.css`/`base.css` — they now ship in the token
    sheet, so load a token sheet alongside the component CSS (already required for
    all other tokens). Adds a runtime dependency on `@pantoken/utils`.
  - **`@pantoken/web-components`** — `register(target, { only })` registers a subset
    of elements (nested dependencies pulled in automatically); new
    `dist/web-components.iife.js` `<script>` drop-in. The `foundationCss` export and
    its auto-injected `<style>` are removed — the required token sheet now carries
    those custom properties.
  - **`@pantoken/utils`** — now owns the elevation + focus-outline declaration
    builders (`elevationDeclarations`, `focusOutlineDeclarations`, `focusOutlineRules`,
    `ELEVATION_NAMES`, `FOCUSABLE_SELECTOR`) so the token sheet can emit them.

### Patch Changes

- Updated dependencies [c8b956d]
  - @pantoken/components@0.2.0

## 0.1.1

### Changed

- Updated internal workspace dependencies:
  - @pantoken/components: 0.1.0 -> 0.1.1

## 0.1.0

### Added

- Initial release of @pantoken/web-components.
