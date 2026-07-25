# Engineering log

Hard-won fixes and gotchas from pantoken work. Each entry is symptom → root cause → the durable rule,
so future work doesn't re-learn the lesson. Version and PR numbers are deliberately left out; the
lesson is timeless.

## Toolchain

### oxfmt corrupts interpolated CSS-in-TS selectors

**Symptom** — After `vp fmt`/`vp check`, a component's compound selector silently changed meaning:
`${p}foo.-modifier` became `${p}foo .-modifier` (compound → descendant), and single-line rules
reflowed to multi-line.

**Root cause** — oxfmt (Prettier-based) treats `css` and `styled` tagged templates as
embedded CSS and reformats them. `embeddedLanguageFormatting: "off"` does **not** stop it — earlier
"it works" results were `vp` cache artifacts; verify with a clean cache. The tag name doesn't matter.

**Fix / rule** — Put a `// prettier-ignore` line immediately before each tagged template (before the
template for a direct arrow body, before `return` for a block body). oxfmt then leaves the template
verbatim and still formats the rest of the file. Don't use inline `/* prettier-ignore */` — it's
inconsistent for block bodies. When you add a record builder, tag it `css` and add
`// prettier-ignore`
or the next format pass rewrites its selectors.

### Backticks inside a CSS comment terminate the template string

**Symptom** — A record's CSS template literal failed to compile after adding a `/* … */` comment.

**Root cause** — The `css` body is a JS template literal, so a backtick (or `${`) inside a CSS comment
closes the string early.

**Fix / rule** — Keep CSS-comment prose backtick-free and escape `${` inside the body.

### `vp pack` doesn't resolve `?raw`; use `?inline`

**Symptom** — A published build failed with `[UNLOADABLE_DEPENDENCY] Could not load x.css?raw`, though
Vite dev and test worked.

**Root cause** — `vp pack` (rolldown) doesn't resolve Vite's `?raw` query; only the Vite dev/test path
does.

**Fix / rule** — Don't inline CSS via `?raw`. Vite+ now bundles `@tsdown/css`; import CSS with
`?inline` so pack, dev, and test share the same processed string contract.

### A nested `vp` spawn dies under `vpr docs:dev`

**Symptom** — On a cache miss, a task spawned from inside the running VitePress process failed with
`Failed to spawn process: Invalid argument (os error 22)`; cache-hit replays looked fine, so it
seemed intermittent.

**Root cause** — Under `vpr docs:dev`, VitePress runs under `vp`; a `vp run`/`vp pack` spawned from
**within** that process can't spawn.

**Fix / rule** — Spawn `node scripts/x.ts` directly from inside a `vp`-run process, never a nested `vp
run`. See `docs/conventions/build-and-docs.md`.

### `ERR_PNPM_CATALOG_ENTRY_NOT_FOUND_FOR_SPEC` after a cssdoc bump

**Symptom** — Install or the docs dev-server startup failed with a missing catalog entry.

**Root cause** — pantoken consumes `@cssdoc/*`, whose packages reference `catalog:` deps that
pantoken's own catalog must also carry.

**Fix / rule** — When cssdoc adds a catalog dependency, mirror it into pantoken's catalog.

### Moving packages deeper stales the `.bin` shims

**Symptom** — After relocating packages one directory deeper, their `node_modules/.bin` relative shims
pointed at the wrong depth; a plain reinstall reported "up to date" and didn't relink.

**Fix / rule** — `rm -rf <moved>/*/node_modules && pnpm install` to force a relink.

## Browser / bundling

### A postcss-based value import kills the browser client

**Symptom** — On doc pages, all client JS died at app init with `createRequire is not a function`
(both light/dark theme toggles broke).

**Root cause** — `@pantoken/components` and `@pantoken/web-components` ship to the browser. A
**value** import of a postcss-based `@cssdoc/*` package made rolldown inject a `createRequire` /
`node:module` shim into the ESM build, which has no meaning in the browser.

**Fix / rule** — Keep `@cssdoc/*` value imports out of these packages' `src/`. Type-only imports are
fine (erased at build); value imports belong in build scripts and tests. Do doc-comment recovery with
a regex over the source, not a runtime `parseCssDocs` call.

### VitePress runs Markdown through Vue

**Symptom** — A page module failed to compile, or custom elements rendered as unresolved Vue
components.

**Root cause** — VitePress compiles Markdown through Vue's SFC parser. It treats `<instui-x>` as an
unresolved component and tries to import a native `<img src="/local">`'s file.

**Fix / rule** — Set `vue.template.compilerOptions.isCustomElement = (tag) =>
tag.startsWith("instui-")` in `docs/.vitepress/config.ts`. In an `@example`, use an absolute/CDN/data
`src` or a custom-element `src` — avoid a native `<img>` with a local path. Escape raw `<tag>`/`&#123;&#123;` in
prose the emitter renders (an `escProse()` handles this; backticked code spans are exempt).

## CSS API surface

### A `-icon-` modifier hits the glyph painter

**Symptom** — A modifier named `-icon-position-end` rendered a solid square on the element.

**Root cause** — The generic `[class*="-icon-"]::before` mask painter matched the modifier and tried to
paint an undefined glyph.

**Fix / rule** — Never name a modifier with a `-icon-` substring unless it's a real glyph (the fix was
renaming it `-chevron-end`).

### `:scope-*` corruption from `scope()`

**Symptom** — A scoped component emitted a broken `:scope-value` / `:scope-messages` selector.

**Root cause** — `scope()` splits the body on the root token; when the root prefixes a flat sibling
class (`.instui-progress` prefixes `.instui-progress-value`), the split corrupts the sibling.

**Fix / rule** — Keep flat siblings and root-modifier-only rules (especially `-size-*`, which the alias
post-processors append at top level) **outside** the `@scope` block. See `docs/conventions/authoring.md`.

## CI / release

### The Version PR needs a PAT to trigger CI — and an unset secret hard-fails checkout

**Symptom** — The changesets "Version Packages" PR opened, but its CI and release checks sat in
`action_required` and never ran. Wiring a PAT reference into the release workflow to fix that turned
main red instead: `actions/checkout` failed with `Input required and not supplied: token`.

**Root cause** — Two linked traps. (1) GitHub deliberately doesn't trigger workflows on PRs authored by
the built-in `GITHUB_TOKEN` (anti-recursion), so a Version PR opened by the changesets action never
kicks off CI. (2) `actions/checkout`'s `token:` input, given the empty string a not-yet-created
`secrets.*` resolves to, errors out rather than falling back — so referencing a missing secret breaks
the whole workflow, including the publish path.

**Fix / rule** — Author the Version PR with a fine-grained PAT (repo-scoped, Contents + Pull requests:
read/write) on both the checkout `token:` and the changesets action's `GITHUB_TOKEN` env, so the PR
comes from a real user and CI runs automatically. Reference the secret defensively —
`${{ secrets.RELEASE_PAT || github.token }}` — so an absent or expired PAT degrades to the built-in
token instead of hard-failing, and emit a `::warning::` when it's missing. The PAT is git/PR auth only;
npm publishing stays OIDC/token-free (`id-token: write` + trusted publishers). Fine-grained PATs expire
(≤ 1 year); the "RELEASE_PAT missing" warning in the release log is the rotation cue.

## Code quality gates

### The fallow health gap to grade A is diffuse, not a few fixable functions

**Grade bands** — Fallow maps A >= 85, B 70–84, C 55–69 (`docs.fallow.tools/explanations/health`) — not
the academic 90. This repo moved from 67.5 (C) to 82 (B) through dead-code cleanup, dependency
classification, and refactoring the worst functions; the gate floors at 80.

**Why the last ~3 points to A resist targeted refactoring:**

- `hotspots` (~10) is **churn-weighted** — a file's git-commit history times its complexity density.
  Function-extraction changes neither the history nor the file's total complexity, so a hotspot's
  score is fixed: `docs/scripts/build-css-api.ts` stayed at 45.1 after its `build` function was split.
- `unit_size` (~5) is **distributional**, not a handful of oversized functions. Excluding even the two
  largest units (the 229- and 177-line docs Vue SFCs — fallow counts a whole `.vue` file as one
  "unit", a poor fit for declarative markup) moved it only 0.7; a `thresholdOverrides` entry suppressed
  the _findings_ but not the _score_. Only genuine, codebase-wide function-shrinking moves it.
- Plus a small architectural `coupling` penalty. Feeding real coverage (`fallow health --coverage`)
  doesn't help — the penalties are structural (cyclomatic / cognitive / lines), not CRAP/coverage.

**Fix / rule** — Gate at a score floor of 80 in `scripts/quality/fallow-health-gate.ts` (locks in the
67.5 → 82 gain, blocks regression), keep dead-code an error and duplication advisory. Reaching grade A
(85) is possible but needs broad function-shrinking + dedup across the whole tree, not a few edits;
raise the floor to 85 when that lands. Don't try to buy points with config — `unused-*` suppressions
and `thresholdOverrides` change what's _reported_, not the score.

### TSDoc enforcement runs through ESLint, not oxlint; keep it syntax-only

**Symptom** — JS/TS in this repo is linted by vite-plus's built-in oxlint (`vite.config.ts` `lint`),
which can't host a third-party ESLint plugin like `eslint-plugin-tsdoc-require-2`.

**Fix / rule** — TSDoc runs as a separate ESLint pass: the root `eslint.config.js` gained a
`**/*.{ts,tsx}` block (`tsdoc-require-2/require` + `tsdoc/syntax`, both error), run via the `lint:tsdoc`
task and the CI `lint` job. Configure the `@typescript-eslint/parser` **without** `parserOptions.project`
— these rules are comment/syntax-only, so skipping type information keeps the pass fast workspace-wide.
`tsdoc/syntax` honours the custom block tags (`@property`, `@module`) declared in `tsdoc.json`. Invoke
it as `eslint .` (flat-config-driven discovery); passing explicit globs errors when a pattern like
`**/*.mts` matches nothing.

### Codecov uploads tokenless via OIDC on the public repo

**Fix / rule** — `codecov/codecov-action` runs with `use_oidc: true` (no token secret) because the repo
is public; the `coverage` CI job needs `permissions: id-token: write`. Coverage is v8, configured in
`vite.config.ts` `test.coverage` (lcov for Codecov, json also emitted for fallow); `codecov.yml` uses
`target: auto` so the bar ratchets from the ~63% baseline instead of a fixed number.

### Fallow's dead-code false positives are config, not code

**Symptom** — A cold `fallow` run reports ~227 dead-code findings; ~200 are false positives.

**Fix / rule** — Build first (`vp run build:all`) so generated output resolves, then tune `.fallowrc.jsonc`:
seed task-invoked scripts / tool entries / bin shims as `entry`, mark the CSS-codegen sources and
postcss plugins as `dynamicallyLoaded`, and ignore the intentional deps fallow can't observe
(`@pantoken/model` type-only, `vite-plus` toolchain, the "kept harmless" catalog mirrors via
`unused-catalog-entries: off`, config/CLI-loaded dev-deps via `unused-dev-dependencies: off`). That
takes the real actionable set to a handful of genuinely-dead exports.

### Snyk Code (SAST) gates locally, not in CI

**Symptom** — Snyk has no GitHub App wired to this repo, so `snyk code test` (SAST) can't run in
Actions the way the dependency scan and the packaging gates do. Leaving it CI-only would mean no
code-security gate at all.

**Fix / rule** — Gate SAST _locally_, at push time. `scripts/quality/snyk-code-gate.ts` runs
`snyk code test --severity-threshold=high` and is exit-code aware: 0 → pass, 1 → block (findings),
3 → pass (nothing to scan), and 2 (or anything else) → warn-then-skip, because a 2 is almost always
"not authenticated." That fail-closed-on-findings / fail-open-on-auth split means the maintainer's
authenticated push gates while a contributor who never ran `snyk auth` isn't bricked. It's wired into
`.vite-hooks/pre-push` (task `snyk:code`, script `security:code`) and deliberately **not** in
`ready:all` — like the dependency scan, it needs auth + network that CI and fresh clones lack.

**Findings fixed to reach zero** — the demo/docs playground tripped several rules: a path-traversal in
the workspace-orchestrator file server (added a `serveDir` containment check), `postMessage`
targets/listeners that used `"*"` and skipped origin checks (tightened to the host origin, with guards
that still accept the sandboxed result frame's opaque `"null"` origin), and a DOM-XSS where highlighted
code reached `innerHTML` (Shiki already escapes, but the source can arrive from a `src` URL param, so
the markup now also passes through the `DOMPurify` the runner already imports).
