# CHANGELOG

## 0.4.0

### Minor Changes

- 7d964ee: Translated the self-hosted demo snippet prose (`docs/demos/*.html`, the live examples the `/play`
  runner loads by iframe) into every Canvas locale — previously the last untranslated surface, invisible
  to the markdown-based translation pipeline. `demoMarkdownIt` gains a `localePrefix` option so a
  `demo:self:<name>` fence on a locale page resolves to its translated clone instead of the English
  source.
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

- 63e06cb: Moves structural glossary translations into the `docs.api` translation-memory namespace and removes the standalone glossary surface and translation driver. Existing term translations are preserved in the API cache.
- 7d964ee: Added a force/no-cache option to both translation pipelines, so already-cached content can be
  retranslated (and overwritten) instead of only ever filling cache misses. Set
  `DOCS_TRANSLATION_FORCE=1` for the docs pipeline (`translateUnits`) or `I18N_TRANSLATION_FORCE=1` for
  the shared CLI string pipeline (`runI18nTranslationCli`, used by `@pantoken/scaffold`, `@pantoken/ai`,
  and `@pantoken/web-components`), or use the new convenience scripts: `docs:locales:translate:force`,
  each package's `translate:force`, and the root `i18n:translate:force` umbrella task.

### Patch Changes

- 7d964ee: The "Get started" widget's agent-shell prompt (`"Fetch create.pantoken.app/SKILL.md and follow
it…"`) is now a translatable UI string (`GetStartedTabsStrings.agentPrompt` in `get-started.ts` /
  `i18n.ts`) instead of a hardcoded English constant in `GetStartedTabs.vue`, so it goes through the
  same `translate-chrome.ts` pipeline as the rest of the widget's chrome.
- 7d964ee: Fix the agent view's line wrapping: it used `display: flex; flex-wrap: wrap`, which wraps whole
  flex items (icon/launcher/suffix/cursor) rather than the text itself — visible once the prompt grew
  past a single line, breaking right after the tool name and stranding the cursor on its own
  near-empty line. Switched to plain inline flow (`display: inline-block`), so it wraps at word
  boundaries within the text and keeps the cursor glued to wherever the text currently ends.
- 7d964ee: "Get started" widget: fix the agent view's tool-selector popover being clipped by the terminal
  chrome (ancestors no longer `overflow: hidden`; the chrome's own rounded corners are preserved by
  clipping only the decorative gradient layer). Add a small pause/play toggle to the terminal chrome
  that stops or restarts the typing animation on both tabs. Opening the page with a `#ai` URL hash now
  starts the widget on the agent tab. The Amazon Q Developer CLI option now uses its own `amazon-q`
  icon instead of a bare "q" glyph.
- 7d964ee: The "Get started" widget's agent view now offers a fetch-based one-liner
  (`<launcher> "Fetch https://pantoken.app/create-pantoken-app.md and follow it…"`) for six
  agent CLIs — Claude Code, Gemini CLI, Cursor CLI, OpenAI Codex CLI, GitHub Copilot CLI, and Amazon Q
  Developer CLI — instead of the old `claude`-only `/scaffold-pantoken` slash command (a skill name
  that no longer exists, and unquoted text that only worked because it happened to have no spaces).
  `docs/guide/getting-started.md` gets the same one-liner. Also drops `GetStartedTabsStrings.aiCommand`
  (`get-started.ts` / `i18n.ts`, both locales) — dead since the widget's rewrite stopped reading it.
- 63e06cb: Align API drift detection with the PO-backed prose catalog and ignore deterministic glossary units.
- 63e06cb: Persist API PO translations incrementally as provider batches complete.
- 7d964ee: Preserve source-identical CSS and technical glossary terms in localized docs, and support required
  verbatim values that bypass translation entirely.
- 63e06cb: Upgraded the `@cssdoc/*` toolchain to 0.15.2 and adopted `@cssdoc/cli` as the repository's single
  cssdoc lint instance. Stylelint remains for its 24 core CSS correctness rules, which the CLI does not
  cover. The CLI is invoked with `--max-warnings 0` so cssdoc violations remain CI failures.
- 63e06cb: Replaced the literal NUL byte embedded in `translation-memory.ts`'s `keyFor` cache-key separator with
  an escaped `\0` sequence. The raw byte made the file appear binary to `grep`/`rg`/GitHub code search,
  so this load-bearing separator was invisible to normal text search. The escaped form produces an
  identical runtime string (and identical cache-key hashes), so no cache entries change.
- 7d964ee: Import `CDN_PICKER_DEFAULTS` into the `en` locale's `cdnPicker` block instead of re-typing it (they
  were required to stay identical anyway), and split `useCommandCycle`'s `scheduleNext` into one small
  handler per phase, each covered by a new test suite.
- 63e06cb: Normalizes demo `i18n.json` sources to the shared `{message, translate}` schema with `$schema` links, and removes the obsolete legacy source parser.
- 63e06cb: Complete the Hungarian translations for the `docs.api` catalog.
- 63e06cb: Migrate generated API and glossary localization from JSON translation memory to unified PO catalogs.
- 63e06cb: Migrate documentation chrome localization from JSON translation memory to the unified PO catalogs.
- 63e06cb: Complete the translated documentation chrome catalogs for all supported locales.
- 63e06cb: Complete translations for the `docs.demos` catalogs across all supported locales.
- 63e06cb: Complete the Hungarian translations for the `docs.demos` catalog.
- 63e06cb: Migrate self-hosted demo localization from JSON translation memory to unified PO catalogs.
- 7d964ee: Fixed `AiTranslationAdapter` prompting "translate from English to English" for the `en-AU`/`en-CA`/
  `en-GB` locales (the locale-label lookup stripped every locale's parenthetical display name, collapsing
  all three English regional variants to the bare word "English"). They now translate for real, using
  British/Australian/Canadian spelling and phrasing.
- 7d964ee: Fixed corrupted TypeDoc generic-type signatures (e.g. `` `Readonly`\<`Record`\<`string`, `string`\>\> ``) across the `ar`/`ca`/`da`/`hy`/`nl` locale API reference — repeated `vp check --fix` passes had
  duplicated bare `>` characters in front of the escaped closing brackets. oxfmt no longer formats
  `docs/*/api` (generated, never hand-edited), so this shouldn't recur.
- 7d964ee: Extracted the hardcoded, Hungarian-only structural-term glossary (headings, badges, table labels in
  generated API docs) out of `GlossaryTranslationAdapter` into `docs/scripts/glossary.ts` as plain data,
  matched against a per-locale `<locale>.glossary.json` translation-memory cache instead of a static
  regex table. A new `translate-glossary.ts` script (`docs:glossary:locales`/`:claude`/`:agy`) fills that
  cache for every Canvas locale, the same way `translate-chrome.ts` already does for UI chrome strings.
- 63e06cb: Migrate hand-written guide localization from JSON translation memory to unified PO catalogs.

- 63e06cb: Complete English and regional-English homepage catalogs and verify homepage coverage for every supported locale.
- 63e06cb: Untangled two colliding names in `docs/.vitepress/i18n.ts`: its own `LOCALES` (the per-locale
  VitePress theme-config proxy) is renamed `LOCALE_THEMES`, and its own `LocaleMeta` type (route
  structure plus translated UI chrome) is renamed `LocaleTheme` — both previously shadowed
  `@pantoken/i18n`'s exports of the same names. Updated the `@pantoken/i18n` import (`CANVAS_LOCALES` →
  `LOCALES`) and all `config.ts` usages accordingly.
- 7d964ee: Fixed a real translation-corruption bug: TypeDoc renders a generic type as several separately
  backtick-wrapped tokens joined by bare escaped angle brackets (e.g. `` `Readonly`\<`Record`\<`string`,
`string`\>\> ``). That glue sat outside any masked code span and reached the AI adapter unprotected,
  which sometimes duplicated/mangled the brackets. `AiTranslationAdapter` now masks every `\<`/`\>`
  sequence globally before any prompt is sent, in `translateMarkdown`, `translateText`, and the batch
  path.
- 63e06cb: Localized the docs site's page metadata and social card: the `og:description`/`twitter:description`
  meta tags and the `WebSite` JSON-LD (`description`, `url`, `inLanguage`) now use each locale's
  translated copy instead of always showing the English site description — previously visiting `/hu/`
  still reported the English description in its structured data. The OG/Twitter card image
  (`og.png`) is now generated per Latin-script locale from that locale's own home page `hero.text`/
  `hero.tagline` (e.g. `og-hu.png`), so a shared `/hu/` link unfurls with a Hungarian-language card;
  locales whose script the bundled card font doesn't cover fall back to the English card, matching the
  existing non-Latin wordmark-logo fallback.
- 7d964ee: `translateUnits` (the shared prose translation driver used by the docs API/guide/demo/glossary
  pipelines) now detects the same passthrough-failure pattern as the CLI i18n pipeline: a markdown,
  text, or batched translation whose result is a trimmed, case-insensitive match of its English source
  is treated as a failed translation — not cached, logged with a warning, and retried on the next run —
  instead of silently freezing the untranslated source into the committed translation memory. A
  previously-cached hit that matches its source is likewise re-translated instead of served as-is.
- 7d964ee: Fix visual tearing on the homepage get-started flip card in Firefox: the tilted flip faces
  (`rotateY(-15deg)`/`rotateY(165deg)`) re-rasterized on every interior repaint — typewriter
  keystrokes, the copy button's hover transition, and the command dropdown popover — producing 1px
  seams at the card edges that let the page background bleed through. Added
  `will-change: transform` to the flipper, its faces, and the terminal card itself so Firefox keeps
  the tilted bitmap on a stable compositor layer instead of re-rasterizing it on every interior
  repaint.
- 7d964ee: Add openai logo to custom icons pack.
- 7d964ee: Marked "Canvas"/"Canvas high contrast" (InstUI's declared theme names, in the CDN picker and theme
  selector chrome strings) `verbatim` in `translate-chrome.ts` so they stay untranslated in every
  locale, alongside the earlier 404 code and `<link>`/`@import` tokens.
- 7d964ee: Fix TSDoc and translation issues:

  - **TSDoc**: Fix inline tag syntax by wrapping @part, @slot, @selector in braces per TSDoc specification, and escape template variable syntax in JSDoc with backticks.
  - **tsdoc.json**: Add custom tag definitions for @part, @slot, @selector to enable layouts package documentation validation.
  - **i18n**: Update Hungarian translation cache for CSS API docs to resolve translation drift after TSDoc modifications.

- 7d964ee: Swept the CLI and docs source strings for the new passthrough guard and marked the non-prose ones
  `verbatim: "allow"` so the next translation pass doesn't strip or warn on them: `@pantoken/ai` and
  `@pantoken/scaffold`'s `wroteFile` (a checkmark + path template, no English words) and
  `@pantoken/scaffold`'s `nextStepsNav` (a literal `cd {{dir}}` shell command); the docs UI chrome's
  404 status code and the CDN picker's `<link>`/`@import` output-format tokens (via
  `translate-chrome.ts`'s `verbatimSources`). Left `getStartedTabs.agentPrompt` alone — despite
  carrying a literal URL, it's documented as real prose that goes through translation normally.
- 7d964ee: Fix the home page's tilted terminal rendering without antialiasing and tearing in Firefox. The
  typewriter row now reserves the width of the longest command so typing can't reflow the card, and
  `will-change` / `transform-style: preserve-3d` are applied only while the flip transition runs —
  at rest Firefox rasterizes the card in screen space, which restores its antialiased edges and
  unresampled text. The drop shadow is a pre-blurred gradient instead of an animated `filter: blur()`.
- 63e06cb: Phase 0 spike (localization-engine plan): proved the offset-splice extraction technique — identify
  translatable ranges via the mdast AST, substitute by absolute byte offset, never re-stringify — is
  lossless on the real generated docs corpus. `docs/scripts/offset-splice-spike.ts` collects leaf text
  ranges (`text`/`inlineCode`/`code`), recurses into ` ```md ` fences (contributing only children's
  offsets, never the fence's own), and asserts the resulting ranges are disjoint before splicing.

  Verified: round-trip identity holds for all 812 generated API pages and all guide pages (including
  files containing an `html`-lang fence, the `embedded:shell` agent-bootstrap prompt, and a `mermaid`
  diagram); a fixture with an `html` fence nested inside an `md` fence round-trips correctly; and
  `assertDisjoint`/`splice` reject a deliberately broken extractor that includes both a parent fence's
  own range and one of its recursed children's ranges.

  Adds `unified` and `remark-parse` as new catalog entries (joining the already-cataloged `remark-gfm`
  and `unist-util-visit`).

- 63e06cb: Every docs locale now gets its own social card. `gen-og.ts` renders a card for all 44 locales instead
  of only the Latin-script ones: the wordmark comes from `@pantoken/plugin-logos`' vendored asset set
  (so non-Latin scripts get their purpose-drawn mark), RTL locales (`ar`, `fa`, `he`) mirror the whole
  card with the ring field in the bottom-left corner and the text anchored right, and non-Latin text
  renders in a Noto script face fetched from a pinned `google/fonts` commit, SHA-256 verified, and
  cached under the git-ignored `docs/assets/fonts/noto/`. `og:image` consequently points at
  `og-<locale>.png` for every non-root locale.

  The localized nav wordmarks (`docs/public/logo-{light,dark}-<script>.svg`) are now staged from the
  same plugin assets by `docs:assets` rather than being hand-placed in a git-ignored directory, so a
  fresh clone and CI render them too.

- 63e06cb: Documented the lint-stack migration: ESLint is gone. TSDoc enforcement (`tsdoc/syntax` +
  `tsdoc-require-2/require`) now runs inside `vp check` through oxlint's ESLint-compatible JS-plugin
  bridge instead of a separate `lint:tsdoc` ESLint pass, and the duplicate cssdoc CSS pass (`lint:js`,
  via `@cssdoc/eslint-plugin` + `@eslint/css`) was removed after it was shown to report diagnostics
  identical to the `@cssdoc/stylelint-plugin` instance that already covered the same globs. Stylelint
  stays as the single cssdoc lint instance, because oxlint has no CSS language and its JS plugins can't
  host custom parsers.
- 63e06cb: Register the `prompt` Markdown fence as a `txt` syntax-highlighting alias in VitePress.
- 7d964ee: Publish the `create-pantoken-app` skill at `/create-pantoken-app.md` (staged from
  `ai/pantoken-ai/skills/create-pantoken-app/SKILL.md` into `public/`, served verbatim like
  `robots.txt`), so any agent CLI's own fetch tool can read it directly — no `npx @pantoken/ai init`
  required for a one-shot try.
- 63e06cb: Refresh the generated API localization catalog from the segmented API documentation source.
- 63e06cb: Removed 34,440 accidentally-committed generated API-doc translations (`docs/{locale}/api/**` for all
  42 non-English, non-`hu` locales — `docs/hu/api/` was already gitignored). `docs/*/api/` is now
  gitignored like `docs/api/` and `docs/hu/api/` already were. These files were never used by the
  deployed site: CI's actual deploy build (`docs:build`) sets `DOCS_ROOT_LOCALE_ONLY=1`, which excludes
  every non-root locale's `api/**` from the VitePress build via `srcExclude`, and CI never runs
  `docs:check:locales` (the parity check that requires them). They remain regenerable locally via
  `docs:api:locales` for anyone using the full `docs:build:all`/`docs:build:claude` pipeline. Verified
  the deploy path on a clean, cache-disabled build (`vp run --no-cache docs:build`) with these files
  physically removed before this change: build succeeds, `dist/<locale>/` correctly has no `api/`
  subfolder, and `docs` package tests (212) pass unchanged.
- 63e06cb: Fixed a translation-drift bug in the generated-API markdown segmenter: a standalone `-flag` paragraph
  (e.g. the `-nocard` marker `build-css-api.ts` emits before an `@example` fence) was classified as
  `prose` and sent to the translator, because stripping its leading `-` still left Latin letters for
  `hasProseWords` to match. `classifyBlock` now recognizes flag-only blocks and preserves them verbatim,
  so a mistranslated marker can no longer break card rendering on translated pages.
- 7d964ee: `create-pantoken-app` SKILL.md now explains pantoken's actual relationship to Instructure (built and
  used internally there, then open-sourced without official Instructure warranty/support, published
  under `thedannywahl`/`@pantoken` rather than the `instructure` org for now) with links an agent can
  verify independently, and rewords the new-project CLI-invocation step away from "resolve every input
  yourself... one non-interactive shot" phrasing that reads like an instruction to skip user
  confirmation. The same provenance note was added to the root README, the scaffolded `AGENTS.md` /
  `llms.txt` assets, and the docs site's "Get started" agent-shell demo prompt.
- 7d964ee: Carry text direction into isolated demo iframes. `buildExampleSrcdoc()` gains a `dir` option (defaults
  to `ltr`) so the docs' isolated `.css-example` srcdoc previews render `rtl` on Arabic/Persian/Hebrew
  locale pages instead of always defaulting to `ltr` — a `srcdoc` document never inherits `dir` from its
  embedder. The `/play` runner (same-origin with its embedding page) now also mirrors the embedding
  page's `dir` onto its own chrome and its nested result iframe, the same way it already mirrors
  light/dark mode.
- 7d964ee: Ran a real AI translation pass over the locale demo pages (`docs/<locale>/demos/*.html`), which had
  been silently left as English passthrough by an earlier run of the default (keyless) glossary
  adapter. `ar`, `ca`, `da`, `en-AU`, `en-CA`, `hy`, and `nl` are now genuinely translated; the
  translation-memory cache for every other locale was cleared of the stale English passthrough
  entries so the next `docs:demos:locales:claude`/`:agy` run retranslates them for real instead of
  serving fake cache hits (a third-party AI provider quota limit stopped this run partway through).
  `hu`'s pre-existing curated translations were left untouched.
- 63e06cb: Bound every AI translation CLI call with a timeout (`DOCS_TRANSLATION_TIMEOUT_MS`, default 120s) so a
  wedged CLI no longer stalls a locale build forever. The child is spawned in its own process group and
  the timeout signals the group, so the CLI a wrapper script started dies with it instead of orphaning
  and holding the pipe open. The `copilot`/`agy` wrappers now run with stdin from `/dev/null` so they
  can't block waiting on interactive input. `DOCS_TRANSLATION_LOCALE` now also
  accepts a comma/space-separated mix of locale tags and `i18n.config.json` tier names (`primary`,
  `secondary`), supports `-` prefixed exclusions (`"-ga"`, `"primary,-hu"`), and rejects a selection
  that matches no docs locale.
- 63e06cb: Stop re-translating cognates. A translation that is byte-identical to its English source is now
  cached (and flagged `pantoken-verbatim` in the PO catalog) when other units in the same batch were
  translated, so genuine cognates like "Interfaces" in French no longer warn and retranslate on every
  run. The passthrough guard still rejects a wholly-echoed batch and every glossary-adapter
  passthrough.
- 7d964ee: List `/create-pantoken-app.md` in the `/.well-known/api-catalog` linkset, so agents that discover
  the site via the well-known manifest also find the scaffold skill.

## 0.3.2

### Patch Changes

- f053604: Publish a stable, aggregated `icon-manifest.json` to `docs/public/` (mirroring
  `component-capabilities.json`), tagging every InstUI/Simple Icons/custom-icon/logo
  entry with its source and exact per-item CDN CSS URL — so external tools have a
  single fetchable index instead of scraping picker JSON. Also refresh the
  `component-capabilities.json` public copy from its authoritative source
  (`@pantoken/interactions`), which nothing was previously keeping in sync.

## 0.3.1

### Patch Changes

- 8aa88bb: Update the homepage's Get Started tabs to use the `npx create-pantoken-app <platform>` flat-name
  alias instead of `npx @pantoken/scaffold <platform>`, matching the docs guide's quickstart.

## 0.3.0

### Minor Changes

- 853659c: New `@pantoken/plugin-custom-icons` plugin: vendored custom icon glyphs (starting with `highspot`)
  as `--instui-icon-<name>` image tokens, reusing the InstUI icon set's `.-icon-<name>` painter class
  with no `custom-` prefix — the built-in InstUI icon wins on a name collision. The CDN picker's Icons
  tab gains a "Custom icons" section, listed below Simple Icons.

### Patch Changes

- 853659c: Align CDN-picker runtime Shiki output with VitePress dual-theme markup so code blocks follow the active light/dark theme for both background and token colors.
- 853659c: CSS API docs now render the `@stable` release-stage marker as an `instui-pill -color-success` badge, matching how `@deprecated` already renders.

## 0.2.3

### Patch Changes

- d4ba8fe: Add custom components and layouts plugin packages, wire them into docs CSS API generation and watch tasks, and align lint/tooling config for the new cssdoc-style sources.

## 0.2.2

### Patch Changes

- 4674d3d: Partition API sidebars by package route to reduce duplicated prerendered HTML and Pages artifact size.

## 0.2.1

### Patch Changes

- 55a22e3: Fix reactive CDN picker code output across components, icons, and web components.

## 0.2.0

### Minor Changes

- 47f3275: Unify CSS and JS component pickers into a single ComponentsPicker with:

  - Component metadata scan determining CSS-only, JS-only, or both capabilities
  - Dual output tabs: CSS link/import followed by JS ESM/`<script>`/IIFE formats
  - Dependency enforcement for JS components (date-input requires calendar, etc.)
  - Component type indicators (CSS/JS badges) on every component
  - Smart CSS building with automatic component-icons inclusion for icon-using components

- 47f3275: Add IIFE bootstrap format to the Interactions picker for single-tag CDN usage, similar to web-components. The IIFE loads the token stylesheet and exposes PantokenInteractions globally for use in the page.

### Patch Changes

- 47f3275: abstract component interactions into shared package

## 0.1.6

### Patch Changes

- ebe77e5: Align the CDN picker docs page with InstUI patterns: real tabs, an elevated primary card, and a merged icon list with a labeled divider instead of fake tab buttons. Also fixes the Simple Icons dark-mode invert (was keyed off the OS `prefers-color-scheme` instead of the site's own theme toggle) and broken InstUI icon glyphs (most icons rendered as a bare circle/rect/triangle because the manifest generator kept only the first `<path>` in a multi-shape icon).

  Also simplifies the components tab: drops the now-redundant token-sheet toggle (icons live on their own tab), folds base/utilities into the component list as checked-by-default entries, turns "All components" into a tri-state checkbox that selects/clears the list (collapsing the output to `components.css` only when everything is checked), and replaces the output format radios with secondary tabs.

  And simplifies the icons tab to match: merges the InstUI and Simple Icons grids into one continuous list with the section headers as in-list rows, turns "All icons" into a tri-state checkbox over both sources, and replaces the output format radios with secondary tabs (`<link>`/`@import`/ESM snippet). Also fixes the Simple Icons image sizing/spacing to match the InstUI glyphs.

  Adds a few more refinements on top:

  - Base/Utilities are now labeled just "Base"/"Utilities", each with an info button that opens a short popover explaining what it includes, and both moved to the front of their list alongside "All components". "All components" is now a true master over {every component, Base, Utilities} — checked/unchecked together in both directions, indeterminate whenever the three disagree.
  - The tri-state "all" checkbox logic and the format-tabs-plus-output-panel UI are pulled into a shared composable and component (`useIndeterminateCheckbox`, `PickerOutput.vue`) instead of being duplicated across pickers.
  - Adds a third "Web components" tab listing every `<instui-*>` custom element, with the same search/select-all/output pattern. The ES module format supports selecting individual elements (`register(customElements, { only: [...] })`, or a plain `import` when everything is selected); the classic-script-tag format is a self-contained bootstrapper that points at the specific selected elements' own small `dist/<name>.iife.js` files (combined via jsDelivr, falling back to the "everything" bundle only when nothing or everything is selected) — see the `@pantoken/web-components` changeset for the per-element build that enables this. Both formats now use the lean token sheet, combined with `component-icons.css` only when the selection actually needs an icon glyph, instead of always loading the full 1.4 MB sheet.
  - The active tab and every picker's selections, format, and search text now sync to the URL hash, so a specific configuration can be bookmarked or shared and reloads back into the same state.
  - The output snippet now reuses VitePress's own code-fence markup and global copy-button handler instead of a bespoke `<pre>`/copy-button pair, so it gets the same styling and click behavior as any other code block in the docs (no syntax highlighting, since that's a Shiki build-time step that doesn't apply to this runtime-generated content).

  Also, sitewide: the rebrand theme's `--instui-color-institutional-brand-primary` (tab underlines, badges, menu active states, the calendar's "today") shipped as navy by default, a different blue than `--vp-c-brand-1` resolves to through the `@pantoken/vitepress` bridge. Points it at the same navigation-primary blue so InstUI's own brand-colored component chrome and VitePress's brand-driven UI read as one color; canvas and canvas-high-contrast keep their own values.

  Two more picker bugs:

  - The Components tab's combine URL loaded `utilities.css` before the component sheets. Utility classes are override utilities (same specificity as a component class), so they only actually win the cascade when they load _after_ what they're overriding — moved to the end of the URL, and updated the CDN guide's stated load order to match.
  - The Icons tab's "All icons" checkbox correctly collapsed the InstUI side to the bundled `icons.css`, but always enumerated every selected Simple Icon individually, even when every Simple Icon was selected too. Mirrors the InstUI collapse: uses `@pantoken/plugin-simple-icons/simple-icons.css` when the whole Simple Icons set is checked.

## 0.1.5

### Patch Changes

- 7879f6b: support exporting individual icons

## 0.1.4

### Patch Changes

- 40987c4: Refactor translation tooling internals; no user-visible change.

  - Rename `ClaudeCodeTranslationAdapter` → `AiTranslationAdapter`; `DOCS_TRANSLATION_ADAPTER=claude-code` → `DOCS_TRANSLATION_ADAPTER=ai` across scripts and package.json. The `glossary` adapter is unchanged.
  - `TranslationMemory` in `docs/scripts/translation-memory.ts` is now a thin facade over the shared `@pantoken/translation-adapters` core; public API (`load`, `get`, `set`, `save`, `hits`, `misses`) is unchanged.
  - `spawnPrompt` and `extractJsonObject` moved to `@pantoken/translation-adapters`; local duplicates removed.
  - `agy-wrapper.sh` consolidated into `@pantoken/translation-adapters`; local copies in `docs/scripts/` and `packages/i18n/scripts/` removed. `:agy` script variants added to both pipeline `package.json` files referencing the canonical location.

## 0.1.3

### Patch Changes

- f97aeb6: Ensure this branch has explicit changeset coverage for every touched package.

  No API changes are introduced for these packages in this commit; this records branch-level package touch coverage per release policy.

## 0.1.2

### Patch Changes

- 2b814bd: Restore elevation and focus-outline foundation variables in the docs site's custom multi-theme token sheet.

## 0.1.1

### Patch Changes

- 2e5bb88: Final refactor of syntaxFromChain to eliminate high-complexity threshold by extracting token processing logic into processTokenInChain helper function.
- 2e5bb88: Further refactor build-css-api by extracting micro-functions for syntax inference and token chain traversal to reduce cyclomatic complexity of remaining functions.
- 2e5bb88: Refactor build-css-api functions (inferSyntax, syntaxFromChain, resolveSyntax, resolveToken, makeImportSnippet) to reduce cyclomatic complexity by extracting helper functions and simplifying conditional logic.

## 0.1.0

### Added

- Initial release of @pantoken/docs.
