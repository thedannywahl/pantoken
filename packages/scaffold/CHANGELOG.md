# @pantoken/scaffold

## 1.3.0

### Minor Changes

- 0bde734: `@pantoken/scaffold` (and `create-pantoken-app`) now asks whether to install AI agent assets
  (AGENTS.md, editor/Copilot rules) after scaffolding, defaulting to yes; pass `--no-ai` to skip it,
  or `--yes` non-interactively still installs them unless `--no-ai` is also given. Dependency
  installation also now runs asynchronously so the progress spinner animates instead of appearing
  frozen while `install` runs.

  `@pantoken/ai`'s `installAgentAssets`/`AGENT_TOOLS`/`AgentTool` now live in `@pantoken/scaffold`
  and are re-exported from `@pantoken/ai` for backward compatibility.

## 1.2.1

### Patch Changes

- 4933eb0: Fix automatic dependency installation when npm is not on PATH, keep failed-install next steps pointed at the generated app directory, print a concrete dev-server command, pre-approve `fsevents` install scripts in scaffolded apps, make Bun/Yarn-created apps use matching README/next-step commands without writing pnpm-only workspace config, keep `create-pantoken-app` scaffold-only so Deno does not resolve the native generator dependency graph, and keep `@pantoken/scaffold`'s published dependency graph free of renderer/preset packages that trip pnpm/Yarn dependency gates.

## 1.2.0

### Minor Changes

- 28e42c9: The `components` (plain HTML) scaffold now puts the app shell markup directly in `index.html`
  instead of injecting it via a `main.ts` `innerHTML` template literal. `src/main.ts` is now just
  imports plus a place to add your own behavior, and a new `src/style.css` holds your own
  app-specific styles.
- 28e42c9: feat: alphabetize the platform picker, detect the invoking package manager's usage text, and cwd into the scaffolded dir

  The interactive platform picker showed raw keys (`components`, `web-components`,
  ...) in `PRESET_LEDGER` order. It now shows alphabetized, properly-cased labels
  (`HTML`, `Web components`, `React`, ...).

  `create-pantoken-app`'s `--help` always showed `npm create pantoken-app --` as
  the usage command, regardless of how it was actually invoked. A new
  `buildCreateUsageCommand()` maps the detected package manager to its own create
  invocation (`pnpm create`, `yarn create`, `bunx create-`, `deno run -A npm:create-`,
  `vpx create-`), matching the same `detectPackageManager()` logic already used for
  install/next-steps.

  After scaffolding and installing, the CLI now `chdir`s into the target directory
  (when it isn't already `"."`) so the printed next step is just the dev command,
  never a separate `cd`.

- 28e42c9: fix: fix broken scaffold styling and wire in `@pantoken/interactions` out of the box

  The `components` (HTML), `web-components`, and `angular` scaffold templates
  imported `@pantoken/components/base.css` and `components.css` but never
  `@pantoken/css`, so no `--instui-*` custom property was ever defined and every
  component rendered unstyled. All three now import the theme stylesheet first
  and depend on `@pantoken/css`.

  Every template's `tsconfig.json` now sets `"types": ["vite/client"]` so
  TypeScript resolves `.css` side-effect imports (previously "Cannot find module
  or type declarations for side-effect import" in every scaffolded project).

  `@pantoken/plugin-layouts/layouts.css` was only ever needed at scaffold-generate
  time (to derive the wrapper markup), never at the scaffolded app's runtime —
  dropped from every template's entry file and dependencies.

  `@pantoken/interactions` (modal, tooltip, alert dismiss, and other component
  behaviors) is now wired into every template out of the box via its full IIFE
  bundle. The Next.js template gained a small client component
  (`PantokenInteractions`) since the bundle touches `document` at import time,
  which the App Router's default server-rendered layout can't do.

- 28e42c9: Scaffold generated projects in the detected (or requested) locale.

  `-l, --lang` now shapes the scaffolded project as well as the CLI interface: entry markup gets a
  matching `lang`/`dir` pair, so `--lang ar` scaffolds `<html lang="ar" dir="rtl">`.

  Detection now keeps region and script subtags pantoken actually supports (`pt_BR.UTF-8` resolves to
  `pt-BR`, `zh-Hant-TW` to `zh-Hant`) and narrows unsupported ones to their base language (`es_MX` to
  `es`) rather than emitting a tag with no bundle behind it. An explicit `--lang` errors on an
  unsupported value, listing the supported tags, instead of silently falling back to English — the
  resolved tag is written into generated files, so it stays constrained to the registry.

- 28e42c9: Localize scaffolded project READMEs.

  Adds a `scaffold.readme` content space covering `packages/scaffold/templates/*/README.md`, so each
  platform's README is translated as one whole-Markdown unit and rendered per locale. The scaffolder
  layers those renderings over the English templates at scaffold time, and only files that actually
  differ from English are inlined — an untranslated locale costs nothing.

### Patch Changes

- 28e42c9: fix: allow pnpm's exotic-subdep gate for scaffolded projects

  `@pantoken/tokens` pulls in a git-resolved upstream dependency several levels
  deep, which pnpm's default `blockExoticSubdeps` policy rejects for non-direct
  consumers — a fresh `pnpm install` in any scaffolded project failed with
  `ERR_PNPM_EXOTIC_SUBDEP`. Every template's `pnpm-workspace.yaml` now also sets
  `blockExoticSubdeps: false`, alongside the existing `core-js`/`ttf2woff2`
  `allowBuilds` entries.

- 28e42c9: Generate localized scaffold README overlays directly from their committed PO catalogs.

  The overlay generator previously read an ignored render tree, so a clean checkout had the catalogs
  but built an empty overlay unless someone first ran a separate render command. Builds now read each
  locale's `scaffold.readme.po` directly and select non-fuzzy translations by their English README
  `msgid`, making release output reproducible from tracked files.

- 28e42c9: docs: shorten scaffold template READMEs and link to the docs guide

  Each scaffold template's README opened with "Scaffolded with
  `pantoken-scaffold X`...", which is trivia the reader already knows. Replaced
  with a one-line description, the same Develop/What's here sections (updated for
  the `plugin-layouts`/`interactions`/`data-slot` changes), and a single "Learn
  more" link to the relevant pantoken.app guide page.

- 28e42c9: Cover `scaffold.readme` in the standard extract and translate scripts.

  Registering the space in `i18n.config.json` was not enough: `extract` and the six `translate*`
  variants each named `cli.scaffold` explicitly, so `vpr i18n:translate:copilot` never reached the
  scaffolded-project READMEs even though `check:drift` already gated them. Each script now covers
  both spaces and renders the result.

- 28e42c9: Remove the redundant README render step from scaffold translation scripts.

  The package generator now reads committed `scaffold.readme` catalogs directly, so each `translate*`
  script no longer launches `vp run render:readme`. This avoids a Vite+ process-spawn failure after a
  successful translation run and leaves the resulting published overlay unchanged.

- Updated dependencies [28e42c9]
  - @pantoken/scaffold-base@0.3.0
  - @pantoken/web-components@0.6.2
  - @pantoken/components@1.1.2
  - @pantoken/angular@0.1.30
  - @pantoken/react@0.1.31
  - @pantoken/svelte@0.1.31
  - @pantoken/vue@0.1.31

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

- db34dec: fix: pre-approve `core-js`/`ttf2woff2` install scripts in scaffold templates

  Every scaffolded project depends on `@pantoken/pantoken`, which transitively pulls in `core-js` and
  `ttf2woff2` as subdependencies with install/postinstall scripts. Newer npm versions block those
  scripts by default (`allowScripts`) and bun's default-secure install does the same
  (`trustedDependencies`), both printing a warning after `npm create pantoken-app`/`create-pantoken-app`
  finishes installing. pnpm's equivalent gate (`allowBuilds`) only lives in `pnpm-workspace.yaml`, not
  `package.json`.

  Each scaffold template now ships pre-approved entries for both packages — `allowScripts` and
  `trustedDependencies` in `package.json`, and a minimal `pnpm-workspace.yaml` — so a fresh install
  under npm, pnpm, or bun completes without install-script warnings.

- Updated dependencies [db34dec]
- Updated dependencies [db34dec]
- Updated dependencies [db34dec]
  - @pantoken/web-components@0.6.1
  - @pantoken/components@1.1.1
  - @pantoken/angular@0.1.29
  - @pantoken/react@0.1.30
  - @pantoken/svelte@0.1.30
  - @pantoken/vue@0.1.30

## 1.0.1

### Patch Changes

- 2b408c4: Add regression coverage for `runScaffoldCli()` invoked with no arguments: the non-TTY path reports the
  missing-platform error, and the TTY path prompts via `select()`/`text()` before scaffolding.

## 1.0.0

### Major Changes

- 7d964ee: feat(scaffold): rebuild CLI on commander, @clack/prompts, and localized strings

  Implements Phases 1-3: rewrites packages/scaffold/src/cli.ts on commander with proper --help, --version, shell completions, and interactive prompts via @clack/prompts. CLI prose is localized.

  New CLI exports (all @alpha):

  - ScaffoldCliError: user-facing errors with exit codes
  - shouldPrompt(): determines whether to interactively prompt (no value, not --yes, TTY)
  - resolveScaffoldTarget(): prompts for platform/directory interactively on TTY, errors non-interactively when missing
  - scaffoldWithSpinner(): wraps scaffoldProject() in clack spinner with localized text
  - detectPackageManager(): detects npm|pnpm|yarn|bun from npm_config_user_agent
  - printNextSteps(): prints "Next steps" block with detected package manager's install command
  - validateScaffoldPlatform(): shared validator for platform argument (used by all three CLIs)
  - createScaffoldCommand(): builds full commander Command with --dir, --yes, --lang options
  - runScaffoldCli(): entry point; parses argv, handles CommanderError and ScaffoldCliError

  New command-line options:

  - --dir/-d: target directory (prompts if omitted on TTY, not with --yes)
  - --yes/-y: force fully non-interactive (errors instead of prompting for missing values)
  - --lang/-l: override auto-detected locale
  - --version/-v: show version
  - --help/-h: show help (auto-generated by commander)
  - completion <shell>: output shell completions script

  Shell completions for bash/zsh/fish/PowerShell (via @bomb.sh/tab).

  All prompt copy, help descriptions, error messages, and "Next steps" output is localized via detectLocale() + createLocaleLookup() from locale.ts. Falls back to English for any untranslated string.

  Post-scaffold "Next steps" now leads with detected package manager (e.g., "Install dependencies: pnpm install") instead of static "vp install".

  Breaking changes:

  - Error messages and exact "Next steps" wording have changed
  - shouldPromptForDir() renamed to shouldPrompt() with different signature
  - Interactive prompts now use clack instead of readline
  - argv error wording now uses commander's standard format

  Bin shim (pantoken-scaffold.mjs) updated to pass version from package.json.

### Minor Changes

- 7d964ee: `canvas-theme-editor` scaffold: replace TinyMCE's stock `code` plugin (a one-shot modal with no
  live preview) with a custom source-view toggle backed by CodeMirror — hand-edit the raw HTML in a
  syntax-highlighted view alongside the WYSIWYG editor, with the preview pane updating live as you
  type in either mode.
- 7d964ee: `canvas-theme-editor` scaffold: extract the authoring page's markup out of `main.ts.tmpl`'s inline
  `innerHTML` template literals into a standalone `src/app.html`, imported via Vite's `?raw`. The
  wrapper container's title/description/actions/content-slot markup is now hand-authored directly in
  `app.html` with the app's real copy and controls baked in, replacing the old two-step pattern of
  rendering the generic `{{wrapperContainer:html:1}}` shell and then overwriting its placeholder
  parts via `querySelector`. `main.ts.tmpl` now only carries interactive wiring (tabs, tray, modal,
  TinyMCE, split-pane) plus a small `render()` helper that substitutes `{{key}}` placeholders in
  `app.html` against a generated `src/strings.ts`.

  The template's ~26 user-facing UI strings are sourced from a new `src/i18n.json`, wired into
  `@pantoken/scaffold`'s existing translate/check-drift pipeline (`collectI18nSource()` now also
  merges any `templates/<platform>/src/i18n.json`), and `generate.ts` synthesizes each such
  template's `src/strings.ts` from its English source at build time.

- 7d964ee: `canvas-theme-editor`'s `theme.css`/`theme.js` are now built with `@pantoken/canvas-theme-editor`'s
  `buildTheme()` at scaffold time instead of shipping a pre-baked jsDelivr/rebrand-light default. A
  new `--cdn <provider>` flag (also available programmatically via `scaffoldProject(platform, dir, {
cdn })`) picks the CDN provider (`jsdelivr` [default], `unpkg`, `esmsh`) those two files are built
  for, alongside the existing `--theme`/`--theme-mode` flags.

  The scaffold's local preview is now a real Vite app (`npm run dev`/`build`/`preview`) instead of a
  static-server preview: it bundles TinyMCE as a real dependency (version/config aligned with
  instructure/canvas-lms's own RCE), adds a custom "Insert template" toolbar button/dialog and
  TinyMCE's stock "Source code" HTML editor, and shows a live preview pane styled with the actual
  resolved CDN stylesheet for the chosen provider/theme/mode — plus "Download theme.css"/"Download
  theme.js" links to regenerate those files for a different provider/theme without re-running the
  CLI.

- 7d964ee: Add a `canvas-theme-editor` scaffold platform (alias `theme-editor`) for Canvas LMS admins: it
  generates upload-ready `theme.css`/`theme.js` for Canvas's Theme Editor — pre-populated with
  pantoken's CDN imports, defaulting to its `rebrand-light` design — plus a local, TinyMCE-based
  preview and a handful of starter Rich Content Editor page templates (hero, callout, two-column,
  rubric note, testimonial) to adapt and paste into Canvas.
- 7d964ee: `canvas-theme-editor` scaffold: rebuild the authoring page on pantoken itself. The page shell now
  uses `@pantoken/plugin-layouts`'s `wrapper` layout; the CDN provider/theme/mode config, and
  editable copies of `theme.css`/`theme.js` (syntax-highlighted via CodeMirror, feeding the live
  preview directly) moved into an `.instui-tray` with Config/CSS/JS tabs opened from a header
  "Edit theme" button; the on-page instructions moved into a help modal opened by a "?" button. The
  editor/preview split can be resized by dragging the divider, stacked vertically instead of side by
  side, reordered by dragging a pane onto the other (or the keyboard-accessible "Swap panes"
  button), and each pane has its own fullscreen toggle. The preview wraps content in
  `.instui-view -background-primary` capped at `59.25rem` — Canvas's own content-area max width.
- 63e06cb: Migrates the scaffold and AI CLI localization surfaces from per-package JSON caches to keyed PO catalogs managed by `@pantoken/i18n-engine`.

  Existing translations are preserved in `l10n/<locale>/cli.scaffold.po` and `l10n/<locale>/cli.ai.po`; generated `MESSAGES` bundles now resolve from those catalogs.

- 7d964ee: Added a force/no-cache option to both translation pipelines, so already-cached content can be
  retranslated (and overwritten) instead of only ever filling cache misses. Set
  `DOCS_TRANSLATION_FORCE=1` for the docs pipeline (`translateUnits`) or `I18N_TRANSLATION_FORCE=1` for
  the shared CLI string pipeline (`runI18nTranslationCli`, used by `@pantoken/scaffold`, `@pantoken/ai`,
  and `@pantoken/web-components`), or use the new convenience scripts: `docs:locales:translate:force`,
  each package's `translate:force`, and the root `i18n:translate:force` umbrella task.
- 7d964ee: Add `vp run scaffold:dev <platform>` — materializes a scaffold into an untracked
  `.dev/<platform>` directory, links its `@pantoken/*` runtime deps to local workspace source, and
  runs a real Vite dev server for live browser HMR. Editing the scaffold's own template/preset source
  re-materializes the files automatically; editing a linked `@pantoken/*` package rebuilds it via
  `@pantoken/vite-workspace-orchestrator` and hot-reloads the preview. `next` isn't supported yet.
- 7d964ee: Add a global `--theme <name>`/`--theme-mode <mode>` CLI flag (also available programmatically via
  `scaffoldProject(platform, dir, { theme, mode })`) that picks which `@pantoken/css` token sheet
  every scaffolded platform imports (`rebrand` [default], `canvas`, `canvasHighContrast`; rebrand
  mode `light` [default] or `adaptive`) — not just the `canvas-theme-editor` platform's `rebrand-light`
  default. React, Vue, Svelte, and Next templates now import a specific `@pantoken/css` lean
  stylesheet (substituted at scaffold time) instead of the theme-fixed `@pantoken/css`/`@pantoken/css/inject`
  entry points.
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

### Patch Changes

- 63e06cb: Renamed each package's build-script-only locale-registry copy to match `@pantoken/i18n`'s renamed
  `LOCALES`/`LocaleInfo` (was `CANVAS_LOCALES`/`LocaleMeta`): `scripts/lib/canvas-locales.ts` →
  `scripts/lib/locales.ts` in each package. The duplication itself is unchanged (still a deliberate
  copy to avoid a new workspace dependency in build scripts) — only the naming is decoupled from Canvas.
- 7d964ee: `theme.js` no longer waits on a `DOMContentLoaded` listener (Canvas loads Theme Editor JS after the
  page is already interactive, so the listener never fired) — it now loads
  `@pantoken/interactions`' IIFE bundle from the CDN, wiring up every component's behavior (modal,
  tooltip, drilldown, etc.) against the page's existing markup.
- 7d964ee: `@pantoken/plugin-layouts` now ships `pageLayouts`: starter page layouts (hero, callout,
  testimonial, two-column, rubric note) that were previously scaffold-only static HTML files under
  `packages/scaffold/templates/canvas-theme-editor/templates/pages/`.

  `@pantoken/tinymce` adds a `createLayoutsPlugin` — a "Layouts" toolbar/menu picker alongside the
  existing Components/Icons/Logos pickers, defaulting to `@pantoken/plugin-layouts`'s bundled
  `pageLayouts`.

  The `canvas-theme-editor` scaffold now imports `createLayoutsPlugin` from `@pantoken/tinymce`
  instead of glob-importing its own local template HTML files with the generic
  `createTemplatesPlugin`.

- 7d964ee: Extract canvas-theme-editor's `theme.css`/`theme.js` into a new, standalone `@pantoken/canvas-theme-editor`
  package (`platforms/canvas-theme-editor`) — publishable on its own, and exporting `THEME_CSS`/`THEME_JS`
  string constants plus direct `./theme.css`/`./theme.js` subpath exports. `@pantoken/scaffold`'s
  `canvas-theme-editor` platform now sources these two files from the new package at generate time instead
  of duplicating them as on-disk templates.
- 7d964ee: Fix the `canvas-theme-editor` scaffold's TinyMCE wiring: the `pantoken_templates` plugin registration
  used a non-constructible arrow function (TinyMCE always instantiates plugins with `new`, throwing
  "Plugin is not a constructor"), and the components/icons/logos picker plugins were registered inside
  an unwaited async IIFE that raced with `tinymce.init()`, causing those plugins to 404 as external
  scripts instead of using the already-registered in-memory ones.
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

- 7d964ee: `runI18nTranslationCli` now detects and guards against a silently-failing AI translator that echoes
  the English source back untranslated instead of raising an error. New/re-checked cache entries whose
  value is a trimmed, case-insensitive match of their source string are no longer written to
  `i18n-cache/*.json`, and any previously-cached entry matching this pattern is reset so it's retried on
  the next translate run — a warning is logged in both cases. Also warns and skips (instead of silently
  dropping) a response value that's missing, non-string, or empty. `@pantoken/scaffold`'s translate
  script now passes a `cachedValue` option so its legacy sha256-hash-keyed cache entries are covered by
  the same audit.
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
- 7d964ee: feat(scaffold): detect deno alongside npm/pnpm/yarn/bun for the "Next steps" install command

  `detectPackageManager()` now recognizes `deno` from `npm_config_user_agent` (set when the CLI is
  invoked via `deno run npm:...`/`deno install`'s npm-compat layer), printing `deno install` in the
  post-scaffold "Next steps" block instead of falling back to `npm install`.

  Also updates the `@pantoken/scaffold`/`@pantoken/ai` READMEs and the `init-pantoken`/
  `scaffold-pantoken` Claude Code skills' package-manager substitution guidance and lockfile-detection
  table to include `deno.lock`/`deno run npm:<pkg>`/`deno add npm:<pkg>` alongside the existing
  npm/pnpm/yarn/bun rows.

  Verified that every scaffold platform template (`components`, `react`, `vue`, `web-components`,
  `angular`, `svelte`, `next`) already emits its own `package.json` — no further template changes were
  needed there. A `pnpm-workspace.yaml` (or similar monorepo-only manifest) is intentionally NOT
  emitted: each scaffold is a standalone single-package project, and adding a workspace file would be
  incorrect regardless of which package manager the user installs with.

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

- 63e06cb: Moves the complete scaffold CLI catalog source into `packages/scaffold/src/i18n.json` and removes the duplicated `l10n/sources` snapshot. All entries, including template-derived strings, now use the `{message, translate}` schema.
- 63e06cb: Removes the redundant inner `scaffold` and `.i18n` segments from scaffold template message keys. Catalog contexts remain qualified by `cli.scaffold`.
- 7d964ee: Keep accepted technical and cognate short labels in locale translation caches.
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
- Updated dependencies [63e06cb]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [63e06cb]
- Updated dependencies [7d964ee]
- Updated dependencies [63e06cb]
  - @pantoken/web-components@0.6.0
  - @pantoken/components@1.1.0
  - @pantoken/canvas-theme-editor@0.2.0
  - @pantoken/scaffold-base@0.2.1
  - @pantoken/angular@0.1.28
  - @pantoken/react@0.1.29
  - @pantoken/svelte@0.1.29
  - @pantoken/vue@0.1.29

## 0.4.1

### Patch Changes

- Updated dependencies [f053604]
  - @pantoken/components@1.0.3
  - @pantoken/angular@0.1.27
  - @pantoken/react@0.1.28
  - @pantoken/svelte@0.1.28
  - @pantoken/vue@0.1.28
  - @pantoken/web-components@0.5.8

## 0.4.0

### Minor Changes

- 14c883b: `pantoken-scaffold` and `create-pantoken-app` now share a single CLI implementation
  (`@pantoken/scaffold/cli`). When `--dir` is omitted and stdin is an interactive TTY, the CLI now
  prompts for a target directory instead of silently scaffolding into the current folder. The
  post-scaffold "next steps" message now recommends `vp install` alongside npm/pnpm/yarn/bun.

## 0.3.0

### Minor Changes

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

### Patch Changes

- 8aa88bb: Export `buildIconResolverChain` from `@pantoken/icons` and use it from `@pantoken/rehype` and `@pantoken/markdown-it`, removing the duplicated resolver-chain logic between the two renderers.

  Refactor the `pantoken-ai` CLI's command dispatch and `@pantoken/scaffold`'s JSONC comment stripping to reduce cognitive complexity; no behavior change.

- 8aa88bb: Fix `@pantoken/pantoken`'s published `model.json` (the cssdoc provider model downstream consumers use)
  to include `@global` utility records (spacing/gap/layout/etc.) — previously `buildCssDocModel()` only
  parsed `generated/components.css`, so consumer projects had no way to resolve `--p-lg`-style global
  modifier classes as documented. Wired `model.json` into `@pantoken/scaffold`'s templated `cssdoc.json`
  as a `providers` entry so scaffolded projects pick this up out of the box.
- 8aa88bb: Document the `cssdoc.json` `providers` prefix-rewrite option (requires `@cssdoc/config` with the new
  per-provider `prefix` field) in the scaffolded `cssdoc.json` template, with commented-out examples for
  a custom prefix and a no-separator spelling. No behavior change — the live `providers` entry is
  unchanged, so a default-prefix consumer sees no difference.
- Updated dependencies [8aa88bb]
- Updated dependencies [8aa88bb]
- Updated dependencies [8aa88bb]
- Updated dependencies [8aa88bb]
- Updated dependencies [8aa88bb]
- Updated dependencies [8aa88bb]
  - @pantoken/components@1.0.2
  - @pantoken/scaffold-base@0.2.0
  - @pantoken/react@0.1.27
  - @pantoken/vue@0.1.27
  - @pantoken/web-components@0.5.7
  - @pantoken/angular@0.1.26
  - @pantoken/svelte@0.1.27

## 0.2.0

### Minor Changes

- efed45f: Initial release: `npx @pantoken/scaffold <platform>` scaffolds a starter project — `web` (plain HTML/CSS via Vite + TS), `react` (Vite + React), or `next` (Next.js App Router) — with pantoken already installed and wired in. Also usable programmatically via `scaffoldProject`/`SCAFFOLD_PLATFORMS`.
- efed45f: Renamed the `web` platform to `html`, and added two new platforms: `angular` (standalone Angular via Vite, no Angular CLI, using `@pantoken/angular`) and `web-components` (plain Vite + `@pantoken/web-components`, no framework). Every platform's entry markup is now generated at build time from `@pantoken/plugin-layouts`'s `wrapper` app-shell layout (`.container`/`.header`/`.content` parts, via `scripts/wrapper-layout.ts`), so template markup stays in sync automatically when that layout changes.

### Patch Changes

- efed45f: Every scaffold platform (`web`, `react`, `next`) now writes `.vscode/settings.json` (`html.customData`/`css.customData` pointing at `@pantoken/pantoken`'s shipped custom-data JSON) and `.vscode/extensions.json` (recommending `cssdoc.cssdoc-vscode`), and adds `@pantoken/pantoken` as a devDependency so those paths resolve after install.
