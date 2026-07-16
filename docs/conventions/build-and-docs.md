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

- `pnpm run ready` — build `-r`, `vp check`, test `-r`, markdown lint. Must pass before you're done.
- `pnpm run check:publish` — `publint`.
- Generated artifacts are gitignored and reproduced on build: `platforms/tokens/src/generated/`,
  `platforms/css/style.css`, each preprocessor's static file, and web-components `src/generated/`.
  `ready` runs `vp run -r build` before `vp check`, so generated files exist in order.

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
- **Adapter split.** Hand-written guides use the `claude-code` adapter; the generated API tree
  (TypeDoc + CSS reference) uses the deterministic `glossary` adapter. Don't run `:claude` over the
  whole API tree — a cold cache means hundreds of sequential `claude -p` calls.

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
  (`vpr @pantoken/web-components#build`); `reloadWatchPaths` on its `dist` bridges the change into HMR.

A `vp run X && vp run Y` chain _inside_ a package.json script is fine — that's a top-level
script-runner context, not a spawn from within the running VitePress process.
