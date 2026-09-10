# CHANGELOG

## 1.2.1

### Patch Changes

- Updated dependencies [4933eb0]
  - @pantoken/scaffold@1.2.1

## 1.2.0

### Minor Changes

- 28e42c9: Scaffold generated projects in the detected (or requested) locale.

  `-l, --lang` now shapes the scaffolded project as well as the CLI interface: entry markup gets a
  matching `lang`/`dir` pair, so `--lang ar` scaffolds `<html lang="ar" dir="rtl">`.

  Detection now keeps region and script subtags pantoken actually supports (`pt_BR.UTF-8` resolves to
  `pt-BR`, `zh-Hant-TW` to `zh-Hant`) and narrows unsupported ones to their base language (`es_MX` to
  `es`) rather than emitting a tag with no bundle behind it. An explicit `--lang` errors on an
  unsupported value, listing the supported tags, instead of silently falling back to English — the
  resolved tag is written into generated files, so it stays constrained to the registry.

### Patch Changes

- Updated dependencies [28e42c9]
- Updated dependencies [28e42c9]
- Updated dependencies [28e42c9]
- Updated dependencies [28e42c9]
- Updated dependencies [28e42c9]
- Updated dependencies [28e42c9]
- Updated dependencies [28e42c9]
- Updated dependencies [28e42c9]
- Updated dependencies [28e42c9]
- Updated dependencies [28e42c9]
  - @pantoken/scaffold@1.2.0

## 1.1.0

### Minor Changes

- db34dec: feat: scaffold CLIs install dependencies automatically

  `pantoken-scaffold`, `create-pantoken-app`, and `pantoken-ai scaffold` now run the detected package
  manager's install command right after writing the project, so the printed "Next steps" collapse to
  the one remaining manual action — starting the dev server (`cd <dir> && <pm> run dev`) — instead of
  also asking the user to `cd` and install by hand.

  Pass `--no-install` to skip the automatic install and keep the previous cd/install/dev-server
  breakdown (e.g. for scripted/offline use).

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

- Updated dependencies [db34dec]
- Updated dependencies [db34dec]
- Updated dependencies [db34dec]
- Updated dependencies [db34dec]
- Updated dependencies [db34dec]
  - @pantoken/scaffold@1.1.0

## 1.0.1

### Patch Changes

- Updated dependencies [2b408c4]
  - @pantoken/scaffold@1.0.1

## 1.0.0

### Major Changes

- 7d964ee: feat(ai): consolidate CLI onto shared commander engine with localization

  Implements Phase 4: creates ai/pantoken-ai/src/cli.ts rebuilding the CLI on commander with subcommands (init, scaffold) that reuse locale detection and scaffold logic from @pantoken/scaffold/cli.

  New exports (all @alpha):

  - createAiCommand(): builds commander Command with init and scaffold subcommands
  - runAiCli(): entry point; parses argv and handles errors

  Subcommands:

  - init [--tool <all|cursor|copilot|windsurf>] [--dir .]
    Writes pantoken's agent assets into a repo. Tool defaults to "all" (AGENTS.md, llms.txt, Cursor, Copilot, Windsurf, Claude skills).

  - scaffold [platform] [--tool <all|cursor|copilot|windsurf>] [--dir .] [--yes]
    Scaffolds a starter project (via @pantoken/scaffold) and installs agent assets into the same directory. Reuses platform selection/directory prompting/spinner/next-steps from scaffold CLI. Tool defaults to "all".

  Global options:

  - --lang/-l: override auto-detected display language
  - --version/-v: show version
  - --help/-h: show help

  Shell completions for bash/zsh/fish/PowerShell (via @bomb.sh/tab).

  Localization:

  - ai/pantoken-ai/src/i18n.json (init/scaffold description, tool descriptions)
  - ai/pantoken-ai/generated/locales bundle (generated from i18n-cache)
  - Reuses detectLocale/createLocaleLookup from @pantoken/scaffold/cli
  - Falls back to English for untranslated strings

  Bin shim (pantoken-ai.mjs) updated to call runAiCli with version from package.json.

  Note: printNextSteps() from @pantoken/scaffold/cli is now shared; post-scaffold output includes detected package manager and "Next steps" block identical to `pantoken-scaffold` and `create-pantoken-app`.

  Breaking changes:

  - CLI argv contract changed from hand-rolled to commander-based
  - Error messages and output formatting match commander standards
  - "Next steps" output is now localized and package-manager-aware

### Minor Changes

- 7d964ee: Add a `canvas-theme-editor` scaffold platform (alias `theme-editor`) for Canvas LMS admins: it
  generates upload-ready `theme.css`/`theme.js` for Canvas's Theme Editor — pre-populated with
  pantoken's CDN imports, defaulting to its `rebrand-light` design — plus a local, TinyMCE-based
  preview and a handful of starter Rich Content Editor page templates (hero, callout, two-column,
  rubric note, testimonial) to adapt and paste into Canvas.
- 63e06cb: Migrates the scaffold and AI CLI localization surfaces from per-package JSON caches to keyed PO catalogs managed by `@pantoken/i18n-engine`.

  Existing translations are preserved in `l10n/<locale>/cli.scaffold.po` and `l10n/<locale>/cli.ai.po`; generated `MESSAGES` bundles now resolve from those catalogs.

- 7d964ee: Added a force/no-cache option to both translation pipelines, so already-cached content can be
  retranslated (and overwritten) instead of only ever filling cache misses. Set
  `DOCS_TRANSLATION_FORCE=1` for the docs pipeline (`translateUnits`) or `I18N_TRANSLATION_FORCE=1` for
  the shared CLI string pipeline (`runI18nTranslationCli`, used by `@pantoken/scaffold`, `@pantoken/ai`,
  and `@pantoken/web-components`), or use the new convenience scripts: `docs:locales:translate:force`,
  each package's `translate:force`, and the root `i18n:translate:force` umbrella task.

### Patch Changes

- 63e06cb: Moves the AI CLI message catalog source into `ai/pantoken-ai/src/i18n.json` and removes the duplicate `l10n/sources/cli.ai.json` snapshot.
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

- 7d964ee: The `create-pantoken-app` skill's "empty directory" step now has the agent elicit the
  platform/package-manager/directory itself before shelling out to `pantoken-ai scaffold`, then
  passes `--dir` and `--yes` explicitly. Read against the CLI's own resolver
  (`packages/scaffold/src/cli.ts`), the old wording — no platform, no `--dir`, no `--yes` — either
  throws (missing platform, non-interactively) or silently scaffolds into `.` (missing `--dir`) when
  an agent (not a human at a real TTY) is the one running it.
- 7d964ee: Finish the `scaffold-pantoken` → `create-pantoken-app` skill rename: the generator, the installed
  `.claude/skills/` path, the eval suite (`evals/create-pantoken-app/`), and the README/description
  now all point at the current skill name and directory.
- 7d964ee: Extract the duplicated "translate CLI" driver (identical in `ai/pantoken-ai/scripts/translate.ts`
  and `packages/scaffold/scripts/translate.ts`) into a shared `runI18nTranslationCli()` in
  `@pantoken/translation-adapters`.
- 7d964ee: Extract the duplicated "generate locale bundles from i18n-cache" codegen (identical in
  `ai/pantoken-ai/scripts/generate.ts` and `packages/scaffold/scripts/generate.ts`) into a shared
  `generateLocaleBundles()` in `@pantoken/translation-adapters`.
- 7d964ee: Expanded the docs site's i18n infrastructure from 2 locales (`root`/`hu`) to all 44 Canvas locales
  (`@pantoken/i18n`'s `CANVAS_LOCALES`). `.vitepress/i18n.ts` now derives `DocsLocale` and route
  structure from `CANVAS_LOCALES` instead of a hardcoded union, and splits translatable UI chrome into
  a content-addressed `<locale>.chrome.json` cache (see the new `docs:chrome:locales*` scripts and
  `translate-chrome.ts`), falling back to English until a locale is translated. `build-api-locales.ts`
  and `check-locale-parity.ts` now loop over every non-root locale instead of only `hu`, and the
  `glossary`/`ai` translation adapters take a target locale instead of hardcoding Hungarian (the
  glossary's structural-term dictionary is still `hu`-only; other locales pass through untranslated
  terms until someone adds their glossary). The nav's language flyout is now a searchable `<select>`
  instead of a flat link list, which scales to 44+ options with built-in browser type-to-search.
  `@pantoken/scaffold` and `@pantoken/ai`'s `translate`/`check-drift` scripts now target every Canvas
  locale (matching `@pantoken/web-components`'s existing pattern) instead of only `hu`.

  Actual AI translation of the 43 new locales' guides/API docs is a follow-up: run
  `vp run docs:locales:translate` (or `:agy`) to fill in real translations; until then, untranslated
  locales render the English source as a passthrough.

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
- 7d964ee: Swept the CLI and docs source strings for the new passthrough guard and marked the non-prose ones
  `verbatim: "allow"` so the next translation pass doesn't strip or warn on them: `@pantoken/ai` and
  `@pantoken/scaffold`'s `wroteFile` (a checkmark + path template, no English words) and
  `@pantoken/scaffold`'s `nextStepsNav` (a literal `cd {{dir}}` shell command); the docs UI chrome's
  404 status code and the CDN picker's `<link>`/`@import` output-format tokens (via
  `translate-chrome.ts`'s `verbatimSources`). Left `getStartedTabs.agentPrompt` alone — despite
  carrying a literal URL, it's documented as real prose that goes through translation normally.
- 63e06cb: Renamed the generated-locale-bundle index export from `LOCALES` to `MESSAGES` (in
  `generateLocaleBundles`'s codegen template, consumed by `@pantoken/scaffold` and `@pantoken/ai`'s
  generated `locales/index.ts`). It maps locale → key → string, i.e. a message catalog, not a locale
  list — the old name collided in meaning with `@pantoken/i18n`'s locale registry. Updated both
  packages' `cli.ts` to import/export `MESSAGES` accordingly.
- 63e06cb: Qualifies message catalog contexts with their localization space, such as `cli.scaffold:promptPlatform`, while preserving the existing runtime message keys.
- 63e06cb: Synchronize localized package surfaces and generated localization output.
- 7d964ee: Remove the unused `@commander-js/extra-typings` dependency (never imported after the commander-based CLI rewrite).
- 7d964ee: feat(scaffold): add CLI string localization infrastructure (en)

  Implements Phase 0.5: CLI string localization for both @pantoken/scaffold and @pantoken/ai.

  For @pantoken/scaffold:

  - src/i18n.json: flat key-value map of all user-facing CLI strings (prompts, help text, errors, next-steps)
  - i18n-cache/en.json: committed English cache (source of truth)
  - src/locale.ts: detectLocale() and createLocaleLookup() for runtime i18n resolution
  - scripts/translate.ts: interactive translation script for adding new locales
  - scripts/check-drift.ts: CI-safe drift detection ensuring caches stay current
  - package.json scripts: translate, translate:agy, check:drift targets

  For @pantoken/ai:

  - Same structure mirrored: src/i18n.json, i18n-cache/en.json, scripts/translate.ts, scripts/check-drift.ts
  - Separate bundle for AI-specific CLI strings (init/scaffold subcommand descriptions)
  - Will reuse detectLocale/createLocaleLookup from @pantoken/scaffold/cli

  Extended vite.config.ts generate task to emit locale bundles: generated/locales/{en,hu}.ts + index.ts

  Hungarian translations deferred to later phase once English strings stabilize.

- 7d964ee: chore: add commander, @clack/prompts, @bomb.sh/tab, and @pantoken/translation-adapters to catalog

  Adds dependencies for the scaffold CLI rebuild (Phase 0):

  - commander@^15.0.0 and @commander-js/extra-typings@^15.0.0 for CLI framework
  - @clack/prompts@^1.7.0 for interactive terminal UI
  - @bomb.sh/tab@^0.0.22 for shell completions
  - @pantoken/translation-adapters as devDependency for i18n script helpers

  Updates package.json files and vite.config.ts to prepare for CLI exports.

- 7d964ee: test: rewrite CLI test suites for the commander-based rewrite (Phase 5)

  Adds/rewrites test coverage for the Phase 1/4 CLI rebuild:

  - `packages/scaffold/tests/cli.test.ts`: fully rewritten for the commander-based
    `cli.ts` (was still testing the old readline-based API). Covers `shouldPrompt`,
    `detectPackageManager`, `validateScaffoldPlatform`, `printNextSteps`,
    `resolveScaffoldTarget` (including clack prompt/cancel paths), `scaffoldWithSpinner`,
    and `createScaffoldCommand`/`runScaffoldCli` end-to-end (help, version, invalid
    flags/platform, `--yes`, successful scaffold, failure reporting).
  - `packages/scaffold/tests/locale.test.ts` (new): covers `detectLocale`
    (--lang flag, LC_ALL/LANG env, Intl fallback, English default) and
    `createLocaleLookup` (fallback chains, `{{param}}` substitution).
  - `ai/pantoken-ai/tests/cli.test.ts` (new): covers `createAiCommand`/`runAiCli`'s
    `init` and `scaffold` subcommands, including a real bug fix (see below).
  - `packages/create-pantoken-app/tests/index.test.ts`: updated the "next steps"
    assertion for the rebuilt CLI's package-manager-aware install line, added
    `--version` and `--yes`-without-platform coverage.

  **Bug fix**: `pantoken-ai scaffold <invalid-platform>` previously failed silently
  (exit 1, no error message) because platform validation was called manually inside
  the action handler instead of registered as the argument's `argParser` — so
  commander's own error-formatting/printing pipeline never saw it. Fixed by
  registering `validateScaffoldPlatform` as the `[platform]` argument's `argParser`,
  matching how `@pantoken/scaffold`'s own CLI already does it.

  Also fixes a `spawnPrompt()` call-signature bug in both packages' `scripts/translate.ts`
  (was passing an options object as the second argument instead of `(command, args,
prompt, context?)`), and an `isolatedDeclarations` build failure in each package's
  generated `locales/index.ts` (needed an explicit `Record<string, Record<string,
string>>` type annotation on the generator template).

- 7d964ee: feat(scaffold): detect `vp`/`vpx` and drive "Next steps" from per-template `scaffold.json`

  `detectPackageManager()` now falls back to `"vp"` when the running Node binary is Vite+-managed
  (`process.execPath` resolves under a `vite-plus` directory) — `vp`/`vpx` set no
  `npm_config_user_agent`, unlike npm/pnpm/yarn/bun/deno, so this is the only available signal.

  The post-scaffold "Next steps" block is now schema-driven: a template directory may carry an
  optional `scaffold.json` (`nextSteps`/`notes`/`caveats`, authored in English with `{{dir}}`,
  `{{pm}}`, `{{install}}`, `{{run}}`, `{{execute}}`, and `{{dev}}` placeholders) that overrides the
  generic cd/install/run-script fallback. `canvas-theme-editor` is the first template to use one, so
  scaffolding it via `vp`/`vpx` now prints `vp install` / `vp run preview` (plus upload/RCE-sanitization
  notes) instead of a generic "start the dev server" line. Every authored `scaffold.json` string flows
  through the same `src/i18n.json` → `i18n-cache/*.json` → `generated/locales/*.ts` translation
  pipeline as the CLI's existing static copy.

  `printNextSteps()` now takes an additional (optional) resolved-platform argument; `@pantoken/ai`'s
  `scaffold` subcommand passes it through so its output benefits from the same template-driven copy.

- 7d964ee: Point agent-facing skill URLs at `https://create.pantoken.app` — a new GitHub Pages site (added as
  the `ai/create-pantoken-app-site` submodule) that serves the `create-pantoken-app` skill directly at
  the domain root, so an agent CLI can fetch it without the `/create-pantoken-app.md` path. Updated
  `getting-started.md`, `GetStartedTabs.vue`, `.well-known/api-catalog`, and the `@pantoken/ai` agent
  assets to the new URL.
- 7d964ee: `create-pantoken-app` SKILL.md now explains pantoken's actual relationship to Instructure (built and
  used internally there, then open-sourced without official Instructure warranty/support, published
  under `thedannywahl`/`@pantoken` rather than the `instructure` org for now) with links an agent can
  verify independently, and rewords the new-project CLI-invocation step away from "resolve every input
  yourself... one non-interactive shot" phrasing that reads like an instruction to skip user
  confirmation. The same provenance note was added to the root README, the scaffolded `AGENTS.md` /
  `llms.txt` assets, and the docs site's "Get started" agent-shell demo prompt.
- 63e06cb: Adds a reusable `i18n.source.schema.json` and attaches it to normalized package and template message sources. All current package-owned i18n entries now use explicit `{message, translate}` objects.
- Updated dependencies [63e06cb]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [63e06cb]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [63e06cb]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [63e06cb]
- Updated dependencies [63e06cb]
- Updated dependencies [63e06cb]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [63e06cb]
- Updated dependencies [63e06cb]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [63e06cb]
  - @pantoken/scaffold@1.0.0

## 0.2.3

### Patch Changes

- @pantoken/scaffold@0.4.1

## 0.2.2

### Patch Changes

- Updated dependencies [14c883b]
  - @pantoken/scaffold@0.4.0

## 0.2.1

### Patch Changes

- 8aa88bb: Export `buildIconResolverChain` from `@pantoken/icons` and use it from `@pantoken/rehype` and `@pantoken/markdown-it`, removing the duplicated resolver-chain logic between the two renderers.

  Refactor the `pantoken-ai` CLI's command dispatch and `@pantoken/scaffold`'s JSONC comment stripping to reduce cognitive complexity; no behavior change.

- 8aa88bb: Reduce CLI complexity and clone-group duplication in the create/app bootstrap commands, and clean up audit/workspace-discovery friction in fallow config.

  Also includes non-breaking internal refactors in supporting CSS and rehype helper paths that remove duplicate-block findings from quality checks.

- 8aa88bb: Update the `scaffold-pantoken` and `init-pantoken` skills for the current Bingo-based scaffold
  CLI: the platform list is now `components` (alias `html`), `react`, `vue`, `svelte`,
  `web-components`, `angular` (the stale `next`/pre-Bingo `html`-only list is gone), the CLI
  invocation is `npx pantoken-ai scaffold <platform>`, and the flat `npx create-pantoken-app
<platform>` alias is documented alongside `npx @pantoken/scaffold <platform>` for scaffolding
  without the agent assets.
- Updated dependencies [8aa88bb]
- Updated dependencies [8aa88bb]
- Updated dependencies [8aa88bb]
- Updated dependencies [8aa88bb]
  - @pantoken/scaffold@0.3.0

## 0.2.0

### Minor Changes

- efed45f: Split the `bootstrap-pantoken` Claude skill in two: `init-pantoken` now covers installing pantoken's agent assets (AGENTS.md, llms.txt, editor/agent rules, skills), while `scaffold-pantoken` covers scaffolding a new project or wiring pantoken into an existing one. Renamed the `bootstrap <platform>` CLI command to `scaffold <platform>` (it now wraps the new `@pantoken/scaffold` package's scaffold plus `init`'s agent-asset install into one command), and added a `scaffoldAndInit` API. `scaffoldProject`/`SCAFFOLD_PLATFORMS`/`ScaffoldPlatform` are now re-exported from the new `@pantoken/scaffold` package instead of being implemented locally.

### Patch Changes

- efed45f: Add a "Full documentation" section to `AGENTS.md` pointing agents at the hosted docs' `/llms.txt`, `/llms-full.txt`, per-page `.md` mirrors, and `/.well-known/api-catalog` for anything the bundled cheatsheet doesn't cover.
- efed45f: `pantoken-ai scaffold` and `scaffoldAndInit` now support the renamed `html` platform (was `web`) plus the new `angular` and `web-components` platforms, re-exported from the updated `@pantoken/scaffold`.
- efed45f: Sync the Cursor rule body with the Copilot instructions body at generate time so the two rule files can't drift out of sync, and refresh both with the current `@pantoken/components` package and full CLI target list.
- Updated dependencies [efed45f]
- Updated dependencies [efed45f]
- Updated dependencies [efed45f]
  - @pantoken/scaffold@0.2.0

## 0.1.4

### Patch Changes

- 47f3275: add interaction package information

## 0.1.3

### Patch Changes

- 582d4f2: Refresh @pantoken/ai guidance and installer behavior.

  - Update consumer agent assets with current pantoken CLI target coverage and usage guidance.
  - Add explicit runtime validation and help output for `pantoken-ai init --tool` handling.
  - Expand package tests for invalid tool rejection.
  - Document @pantoken/ai in the package guide and add contributor/maintainer checklist language to keep AI assets in sync with user-facing refinements.

## 0.1.2

### Patch Changes

- 0306bf4: Add explicit type annotations required by `isolatedDeclarations`; no API changes.

## 0.1.1

### Patch Changes

- 3d2f6db: # Enrich npm package metadata

  Every published package now carries `homepage`, `bugs`, `repository.directory`, `sideEffects`,
  `engines`, and `publishConfig.provenance`. npmjs.com pages link back to the docs site, the issue
  tracker, and the exact monorepo folder; `sideEffects` lets bundlers tree-shake the pure packages
  while preserving the stylesheets in the CSS-shipping ones.

## 0.1.0

### Added

- Initial release of @pantoken/ai.
