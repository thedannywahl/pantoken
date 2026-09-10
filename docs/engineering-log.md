# Engineering log

Hard-won fixes and gotchas from pantoken work. Each entry is symptom → root cause → the durable rule,
so future work doesn't re-learn the lesson. Version and PR numbers are deliberately left out; the
lesson is timeless.

## Security

### CLI flags must use allowlist validation — never silent fallback

**Symptom** — A flag like `--format opengl` silently maps to the default (`egui`); `--theme typo`
is cast without validation; `--class 123Bad` is accepted and emits broken generated identifiers.

**Root cause** — Flags were parsed into a plain record with no validation, then cast to typed values
or used directly as runtime inputs.

**Fix / rule** — For every restricted CLI value, declare a `VALID_*` constant set and throw a
descriptive error when the value is absent from it. Reject unknown flags at parse time. Add one
regression test per rejection case. Never silently fall back to a default for caller-supplied values
— fail loudly so the caller knows their invocation was wrong.

### Decoded SVG from the IR must be stripped before consumer injection

**Symptom** — A consumer does `element.innerHTML = icon.svg` and injects active script content from
a data URI that was decoded without sanitization.

**Root cause** — `decodeURIComponent` on a data URI produces raw SVG markup, including any
`<script>` elements or event-handler attributes the upstream source or a plugin may have included.

**Fix / rule** — Apply a zero-dependency `sanitizeSvg` strip (removes `<script>` blocks and `on*=`
attributes) at two layers: at decode time in `@pantoken/icons` (for the vendored IR), and at encode
time in `@pantoken/core` (for plugin-contributed icon SVGs). Both layers are needed; upstream trust
is necessary but not sufficient when plugins can contribute arbitrary SVG. Never use `innerHTML`
with an unsanitized SVG field, even from a trusted source.

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

### `will-change` and `preserve-3d` cost antialiasing in Firefox

**Symptom** — The home page's tilted terminal card (`GetStartedTabs.vue`) had hard staircase edges
and shimmering text in Firefox at 1x device pixel ratio. Chrome and Safari were fine, and so was
Firefox on a HiDPI display, which hid it.

**Root cause** — `will-change: transform` and `transform-style: preserve-3d` make Firefox's
WebRender treat the element as a raster root: it rasterizes the subtree into a texture in the
element's own local space, then the compositor applies the 3D transform to that texture. The
texture's quad edge gets no antialiasing and its text is resampled. Chrome and Safari rasterize
3D-transformed content in screen space instead, so neither symptom shows up there.

Those properties had been added to stop the typewriter animation from tearing the card — but the
tearing came from the animation resizing its own row on every keystroke, which reflowed and
invalidated the whole card. The promotion masked one bug by causing another.

**Fix / rule** — Don't promote a 3D-transformed surface to fight repaint cost; remove the repaint
cost. `CommandCycleRow.vue` now lays every command option out hidden in the same grid cell as the
live text (zero-height, so only the width contributes), pinning the row's width to the longest
command so typing never reflows. With that gone, `will-change` and `preserve-3d` are only applied
while the flip transition is actually running (an `.is-flipping` class cleared on a timer), so the
card rests in a flat context that Firefox rasterizes in screen space. Likewise prefer a pre-blurred
gradient over `filter: blur()` on anything that animates — the filter forces an offscreen surface
that gets re-rendered every frame.

**Follow-up** — The same tearing came back on hover, from two remaining wide invalidations: the copy
button's 120ms `background-color`/`border-color`/`color` transitions (~8 repaint frames each) and the
`--vp-shadow-2`/`--vp-shadow-3` blurs on the two popovers, whose blur radius pushed the dirty rect
past the card's edge. Hover state now flips in a single frame (only `opacity` still transitions) and
both popovers use a tight custom shadow, with `contain` on the button and the popover so their
repaints stay inside their own boxes.

The width-pinning trick has one consequence worth remembering: anything laid out _after_ the shared
grid cell sits at the widest command's right edge, not at the cursor. The copy button therefore lives
inside the live text, immediately after the cursor, and each hidden sizer carries a blank same-width
twin so the pinned track still accounts for it.

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

### A bare compound never matches the `@scope` root

**Symptom** — Every rule in the Pendo renderer's `/* Surveys */` blocks was inert in the published
build: survey radios didn't stack, NPS bound labels stayed italic. The same CSS worked with
`scope: false`, and the tests — which assert on the unscoped strings — stayed green.

**Root cause** — `@pantoken/pendo` wraps its output in
`@scope ([class*="instui"]._pendo-step-container)`. Per spec, a scoped rule's selector matches
elements _in_ the scope, but a bare compound cannot match the scoping root itself — only `:scope`
does. Pendo puts the guide's layout class (`._pendo-guide-walkthrough_`) on that very root, so
`._pendo-guide-walkthrough_ { … }` matched nothing. The banner and alert blocks had always written
`:is(:scope, [class*="instui"])…` and so were unaffected, which masked the bug.

**Fix / rule** — Any rule targeting the guide root must be written
`:is(:scope, [class*="instui"])._pendo-guide-walkthrough_…`. More generally: inside `@scope`, reach
the root through `:scope`, never through a bare class. Because the build also emits an unscoped
variant, string-matching tests cannot catch this — verify root-targeting rules in a browser.

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

### "The runner has received a shutdown signal" is a whole-VM OOM, not a job timeout

**Symptom** — The docs deploy ran 1h45m, printed the chunk-size warning, then went completely silent
for 81 minutes and ended with `The runner has received a shutdown signal.` / `The operation was
canceled.` No V8 heap error, no stack, no failing task named. Raising
`NODE_OPTIONS=--max-old-space-size` from 8192 to 14336 made it worse, not better.

**Root cause** — A GitHub-hosted `ubuntu-latest` runner has 16 GB of RAM. A heap ceiling of 14336 MB
tells V8 it may grow to ~14 GB _before_ collecting seriously, so the process crosses physical memory
and the kernel OOM-killer picks a victim — usually the runner agent itself, not node. Killing the
agent is what produces the shutdown-signal message, which is why it reads like a cancellation.

**Fix / rule** — Never set a heap ceiling near the runner's physical RAM; leave room for non-heap and
the OS. Reduce the actual working set first (here: the VitePress local-search plugin was doing a
second full markdown pass over ~38k pages and holding one MiniSearch index per locale), then cap
concurrency, then add swap as a safety net so an overshoot degrades instead of dying. When a job dies
silently with no application-level error, suspect the VM, not the program.

### A static site can outgrow its host before it outgrows its build

**Symptom** — Every fix aimed at making the docs deploy finish was aimed at the wrong failure. Even a
successful build could not have shipped.

**Root cause** — The full-locale site is ~42k pages / ~92k files / ~1.7 GB. GitHub Pages caps a
published site at 1 GB and times deployments out after 10 minutes. Those limits are documented but
easy to never think about, because they're invisible until the site is large.

**Fix / rule** — Before optimizing a build that produces a very large artifact, measure the artifact
and check it against the host's limits. `du -sh dist` and a file count are two commands. Netlify has
no file-count or size cap but does limit a _single directory_ to 54,000 files — and VitePress emits
one chunk per page into `assets/`, so that ceiling is the one to watch. Assert host limits in CI
(`Check site shape` in `docs.yml`) rather than discovering them as an opaque deploy failure.

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

### TSDoc enforcement runs on oxlint's JS-plugin bridge, not a separate ESLint pass

**Symptom** — oxlint has no native TSDoc rules, so TSDoc enforcement originally ran as a second
linter: a root `eslint.config.js` with `tsdoc-require-2/require` + `tsdoc/syntax`, invoked by a
`lint:tsdoc` task. That meant a whole ESLint install (plus `@typescript-eslint/parser`) for two rules.

**Fix / rule** — oxlint's JS plugins implement ESLint's v9 plugin API, and both TSDoc plugins fit
inside it: `eslint-plugin-tsdoc-require-2` is pure AST + `getCommentsBefore`, and `eslint-plugin-tsdoc`
touches `parserServices.program` only to locate a tsconfig — a path that was already unused because the
parser was configured without `parserOptions.project`. So they're registered as `lint.jsPlugins` in
`vite.config.ts` and `vite.config.base.ts`, with the two rules enabled in a `lint.overrides` entry whose
`files`/`excludeFiles` reproduce the old flat-config block. TSDoc is now part of `vp check`, so it also
runs on pre-commit — and the whole lint pass costs ~2.2s where the ESLint task alone cost ~6.2s.
`tsdoc/syntax` still honours the custom tags in `tsdoc.json`; it resolves that file from
`context.filename`, which oxlint supplies. Watch out: oxlint JS plugins are alpha and not semver-stable,
so re-diff `vp check` against the old behaviour after an oxlint bump.

### The cssdoc CSS gate is Stylelint's, and can't move to oxc

**Symptom** — the same `cssdoc/valid-doc-comments` rule ran twice over identical globs: once through
`@cssdoc/stylelint-plugin` (`lint:css`) and once through `@cssdoc/eslint-plugin` + `@eslint/css`
(`lint:js`). Two linters, one rule, one `@cssdoc/lint-core` engine, one auto-loaded `cssdoc.jsonc`.

**Fix / rule** — deleted the ESLint instance after proving redundancy: both runners linted the same 205
files and reported byte-identical diagnostics, including a seeded `missing-summary` +
`undocumented-modifier` probe, and both honoured the scoped `formats/components/cssdoc.jsonc`
(`name-not-in-css: off`) identically. Stylelint keeps the gate — not by preference, but because oxlint
has no CSS language and its JS plugins explicitly do not support custom parsers or file formats, so
`@eslint/css`-style rules are unreachable there. A future host-agnostic `cssdoc lint` CLI is the only
thing that would let this repo drop Stylelint too.

Upstream follow-ups filed against `thedannywahl/cssdoc`: a shared adapter conformance suite so the
stylelint and eslint adapters can't drift ([#34]), docs stating the oxc constraint ([#35]), the
`@cssdoc/cli` direction ([#36]), and verifying `valid-class-usage` under oxlint ([#37]).

cssdoc 0.15.2 fixed the adapter severity divergence from [#40]. Adopted `@cssdoc/cli` as the single
cssdoc lint instance with `--max-warnings 0`, so documentation violations fail CI as they did under
the Stylelint adapter. Stylelint remains for the 24 core CSS correctness rules the CLI doesn't cover:
`lint:css` handles those, while `lint:cssdoc` handles documentation comments. The staged hook runs
both (Stylelint fixes, then cssdoc gates). The CLI still has no `--fix`, but that is non-blocking here
because Stylelint owns the CSS fix step.

[#34]: https://github.com/thedannywahl/cssdoc/issues/34
[#35]: https://github.com/thedannywahl/cssdoc/issues/35
[#36]: https://github.com/thedannywahl/cssdoc/issues/36
[#37]: https://github.com/thedannywahl/cssdoc/issues/37
[#40]: https://github.com/thedannywahl/cssdoc/issues/40

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

### A content-injecting Vite plugin must run on both VitePress build passes

**Symptom** — Every English page threw `TypeError: Cannot read properties of null (reading
'nodeType')` during hydration on direct load (`/api/`, `/guide/*`). The home page only warned
(`Server rendered element contains fewer child nodes than client vdom`) and every non-root locale was
clean. Vue recovered with a full client mount, so pages still looked right and the bug hid for a long
time.

**Root cause** — `vitepress-plugin-llms` was wrapped with `apply: (config) => !config.build.ssr` to
skip its `transform` on the SSR pass, on the assumption that the plugin only _emits_ files. It does
more than that: `transform` injects a hidden `<div ... data-nosnippet>Are you an LLM? …</div>` hint
into every page. Skipping the SSR pass left that div out of the server HTML while the client vdom
still expected it — one child too few, exactly where hydration walks off the end. Non-root locales
were clean only because the plugin's `ignoreFiles` already excluded `<locale>/**`, so both passes
agreed there.

**Fix / rule** — Never gate a plugin that _changes page content_ to one VitePress pass. `apply` is
safe only for plugins whose effects are confined to emitted assets. When a hydration mismatch needs
diagnosing, build with `define: { __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: "true" }` — the production
Vue build otherwise reports the crash with no component or node context.

### Mermaid's auto-run races VitePress hydration

**Symptom** — `/guide/architecture` (the only page with a diagram) logged a hydration text mismatch:
server rendered empty, client expected the graph source. The diagram itself rendered fine, so the
only cost was a mismatch warning and a client re-render of that subtree.

**Root cause** — Importing `mermaid` arms a `window` `load` listener that renders every element
matching its default `.mermaid` selector. VitePress hydrates _after_ `load` (measured: load at 196 ms,
hydration at 218 ms), so mermaid replaced the element's graph text with an SVG before Vue reached it.
Two fixes that look right both fail: the component's `initialize({ startOnLoad: false })` ran too late
(inside the render function), and hoisting `mermaid.startOnLoad = false` to module scope does nothing
because the listener's guard reads the flag off mermaid's _internal_ object, not the imported binding.

**Fix / rule** — Keep the container out of the selector: the element is `.mermaid-diagram`, and
`renderDiagram` passes it explicitly via `nodes: [el]`. The auto-run then finds nothing regardless of
mermaid's config state. The initial render also moved from a `watch(..., { immediate: true })` — which
fires during setup, i.e. mid-hydration — to `onMounted`. To confirm a `load`-timing race like this,
swallow `load` listeners in a Playwright init script and see whether the mismatch disappears.

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
