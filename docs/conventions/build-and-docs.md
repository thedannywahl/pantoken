# Build, release, and the docs site

## Use the `vp` toolchain, never pnpm directly

- `vp` / `vpr` / `vpx` are **global** bins. Run tasks via `vp run <task>`, execute bins via `vp exec
[-F <glob>] <bin>`.
- **Package scripts must never shell out to `pnpm`.** CI (`.github/workflows/docs.yml`) provides `vp`
  via `voidzero-dev/setup-vp` but **not** `pnpm` on PATH, so a `pnpm run …` inside any script breaks
  the docs deploy with `pnpm: command not found`. Local dev has pnpm, so a top-level `pnpm run X` is
  fine — but scripts it calls must stay pnpm-free internally.
- `.css` formatting: `vp fmt` (oxc) is JS/TS/JSON only and no-ops on `.css`. Stylelint owns `.css` —
  `lint:css` runs `stylelint --fix`, wired into `ready` and the `vite.config.ts` `staged` hook.

## The gate

- `pnpm run ready` — the pass/fail gate. It's a `vp` task DAG (`ready:all`), not a serial chain:
  `build:all` runs once, then `check:all` (`vp check`), `test:all` (`vp run -r test`), `lint:css`,
  `lint:js`, `validate:generated:only`, and `lint:markdown` fan out concurrently. Everything that reads
  generated output depends on `build:all`, so generation happens exactly once (no concurrent codegen
  race). Must pass before you're done.
- `pnpm run check:publish` — the publish gate (`gate:publish`): `gate:repository` (asserts every
  publishable manifest has the `repository.url` npm OIDC provenance needs), `gate:publint`, and
  `gate:attw`. Publint/attw depend on `build:all`; the repository check is a pure manifest read.
- **CI runs the same checks on every PR** (`.github/workflows/ci.yml`): `build` → parallel
  `typecheck`/`test`/`lint`/`publint`/`attw`, plus a `repository` job and a `commitlint` job that lints
  the PR's commit range. Jobs share a persisted vp task cache (`node_modules/.vite/task-cache`), so the
  `build` job warms it and downstream jobs restore it and re-materialize generated dirs from cache.
- **Commit messages are conventional-commit-linted** locally by the `.vite-hooks/commit-msg` hook
  (`vp exec commitlint --edit`) and in CI by the `commitlint` job.
- Release automation uses Changesets and package-tag workflows in
  `.github/workflows/release.yml`. That workflow verifies a clean build/typecheck/test + `gate:repository`,
  then scopes the pack-heavy `publint`/`attw` gates to exactly the publish set (the full `ready` already
  ran on the merge-to-main the tag points at).
- Use `pnpm run release:version` to apply package changelog/version updates, then
  `vp run release:changelog:root` to rebuild the strict chronological root `CHANGELOG.md` before
  creating package tags.
- Generated artifacts are gitignored and reproduced on build: `platforms/tokens/src/generated/`,
  `platforms/css/style.css`, each preprocessor's static file, and web-components `src/generated/`.
  `build:all` produces them before any gate that reads them runs.

See `docs/internal/release-strategy.md` for the runbook, dist-tag mapping, prerelease flow, and npm
organization governance model.

## Linting CSS

Root `stylelint.config.js` runs error-only core rules plus `@cssdoc/stylelint-plugin`'s
`cssdoc/valid-doc-comments`; anchor-positioning props are ignored and `@scope` is allowed. A parallel
`eslint.config.js` runs `@cssdoc/eslint-plugin` (via `@eslint/css`) over the same `.css` (`lint:js`).
`lint:css` targets the web-components `src/**/*.css` sources and the generated components CSS.

## The docs site

`docs/` is a VitePress site (`@pantoken/docs`) with two locales — `root` (English, `/…`) and `hu`
(Magyar, `/hu/…`) — a symmetric prefix swap that VitePress's default routing already handles (don't
set a custom `i18nRouting`).

- **Translation layer is `docs/.vitepress/i18n.ts`.** `LOCALES[locale]` holds every localizable UI
  string (nav/sidebar labels, `editText`, the theme selector, VitePress chrome labels, and local
  search). `config.ts` expands these into per-locale `themeConfig` (search is the exception — it lives
  in the global `themeConfig.search.options.locales`). Add new UI strings here, never inline.
- **Block-level API translation.** `build-api-locales.ts` doesn't translate whole `.md` files — it
  runs `segment-markdown.ts` to split each generated page into blocks: `prose` (descriptions,
  remarks, `@example` captions, cssdoc table Description cells), `glossary` (section headings,
  stability-badge pills, table column labels), and `preserve` (code fences, signatures, breadcrumbs,
  token tables). Only prose carries a content key, so a page's prose survives the scaffolding churn
  (badge flips, token-value changes, signature edits) that used to bust a whole-file key. `glossary`
  blocks always go through the deterministic `GlossaryTranslationAdapter` (keyless, never cached);
  `preserve` blocks are emitted verbatim.
- **The committed cache carries the prose; CI serves it.** The translation memory
  (`docs/i18n-cache/hu.api.json`) is content-addressed and adapter-agnostic, so a claude-authored
  prose entry is served to a `glossary` build as a plain cache hit. The workflow: run
  `pnpm run docs:api:locales:claude` **locally** to author prose (a cold run is bounded to ~30–40
  batched `claude -p` calls, resumable via the memory's autosave), then commit `hu.api.json`. CI's
  `docs:build` runs the `glossary` adapter, which serves that prose from cache and only ever fills
  structural headings/labels. Brand-new prose that isn't cached yet passes through as English — the
  glossary **never** caches its own prose passthrough (that would permanently mask the block from a
  later claude run), so it stays a miss until claude authors it. Never wire `:claude` into CI.
- **Running the cold pass.** Each `claude -p` call cold-starts a full agent, and the dominant cost is
  the per-call bootstrap — loading MCP servers, plugins, and project settings — not the translation
  itself (it dwarfs even a small model's inference). So the `:claude` tasks pass
  `--model claude-haiku-4-5-20251001 --strict-mcp-config --setting-sources user`: a fast model, **no
  MCP**, and user settings only (keeps auth, drops project/local hooks). That cuts each call from
  minutes to a few seconds. Override by editing the task or exporting your own
  `DOCS_TRANSLATION_COMMAND_ARGS` before a direct `node scripts/…` run (`DOCS_TRANSLATION_COMMAND`
  overrides the `claude` binary itself). Either task logs progress (`… N/M labels + prose blocks
translated`) and saves the memory after **each** chunk, so it's resumable — a kill or crash keeps
  completed chunks and a re-run serves them from cache.
- **The cold pass is generation-bound, so it runs chunks concurrently.** Once MCP is stripped, the
  wall-clock cost is the model streaming translations, not startup — so `ClaudeCodeTranslationAdapter`
  runs up to `DOCS_TRANSLATION_CONCURRENCY` (default 5) `claude -p` calls at once. Prose is batched at
  `DOCS_TRANSLATION_BATCH_BUDGET` chars/request (default 4k) — small enough that each JSON response
  stays reliable and progress is fine-grained, with the pool hiding the per-call startup. A chunk that
  errors is logged and skipped (its blocks stay uncached and retry next run), never sinking the whole
  run. Raise concurrency for more speed if you're not rate-limited; lower the budget if a run trips the
  per-item fallback (the model dropping a key from a large response).

## The cssdoc integration

pantoken consumes `@cssdoc/*` from **npm** (catalog entries; consumers use `catalog:`), not a local
workspace link. `docs/scripts/build-css-api.ts` is a thin wrapper: it builds pantoken's `resolveToken`
(syntax + value + local vars) and `resolveDemo` hooks, then calls `@cssdoc/typedoc`'s `emitCssApi`,
and keeps the `unknownReferences` drift guard. All page/index/sidebar rendering lives in
`@cssdoc/markdown`. The live `<div class="css-example">` preview is pantoken's own
`@pantoken/typedoc-plugin-live-example`, kept out of `@cssdoc/markdown` so the upstream stays generic.

**Catalog gotcha:** cssdoc packages reference `catalog:` deps; if cssdoc adds a new one, pantoken's
catalog must carry it too, or install fails with `ERR_PNPM_CATALOG_ENTRY_NOT_FOUND_FOR_SPEC`.

## The nested-`vp`-spawn limitation

Under `vpr docs:dev`, VitePress runs _under_ `vp`. Any `vp run …` / `vp pack` spawned from **inside**
that process dies with `Failed to spawn process: Invalid argument (os error 22)` on a cache miss. A
direct `node scripts/x.ts` is unaffected. So:

- The docs orchestrator's `upstream[].build` uses `["node","scripts/generate.ts"]` (cwd = the package
  dir), not a nested `vp run`.
- The CSS-API node runs `["node","scripts/build-css-api.ts"]` (cwd `docs`).
- `@pantoken/web-components`' `register()` bundle genuinely needs `vp pack` (which also can't nest), so
  it's not in the live orchestrator — rebuild it in a separate top-level shell
  (`vpr @pantoken/web-components#build`); `outputWatchPaths` on its `dist` bridges the change into HMR.

A `vp run X && vp run Y` chain _inside_ a package.json script is fine — that's a top-level
script-runner context, not a spawn from within the running VitePress process.
