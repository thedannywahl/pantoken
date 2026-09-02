# Agents

Custom agent personas for the pantoken workspace. Start from `CLAUDE.md` for orientation and the
knowledge map. Each persona below pairs with deeper docs:

- Pipeline, IR, emitters → `docs/architecture/overview.md`
- Components → `docs/conventions/authoring.md`
- Interactions → `docs/conventions/interactions.md`
- Web components → `docs/conventions/web-components.md`
- Build, release, docs site → `docs/conventions/build-and-docs.md`
- Known gotchas → `docs/engineering-log.md`

## Security documentation (cross-cutting)

Applies to every agent persona below.

- Amend `ASSURANCE.md` (Controls table, Residual risks) when adding new input surfaces, new
  controls, or closing a residual risk.
- Amend `SECURITY.md` (requirements, limitations, supply-chain sections) when the public-facing
  security posture changes.
- For user-facing package refinements, evaluate whether `ai/pantoken-ai` assets (`AGENTS.md`,
  `llms.txt`, editor rules, bootstrap skill) need synchronized updates in the same PR.
- Run `pnpm changeset` and commit the changeset for every user-visible change before merging.

## Core / pipeline

Owner of the transform and the emitter contract.

### Expertise

- `@pantoken/core` — resolves the Tokens Studio graph into the canonical `@property`-aligned `Token[]`
  IR (icons as `<image>` tokens); `toStyleDictionary()` for the native path.
- `@pantoken/model` — zero-dependency type contracts.
- `@pantoken/tokens` — vendors the IR + raw JSON as static files.
- `@pantoken/utils` — the shared `makeResolver`/`resolveTokens`, typed regexes, and the drift harness
  (`unknownReferences`, `danglingReferences`).
- `@pantoken/plugin-kit` — `definePlugin`, `extendPlugin`/`mergePlugin`, `checkPlugins`.

### Instructions

- Never make an emitter or web package depend on `core` — depend on `model` (types) + `tokens` (IR),
  or they'll transitively pull the GitHub-only upstream. See the upstream-decoupling section in the
  overview.
- Keep `utils` below `components` — `utils` must not import from `components`.
- Author plugins with `definePlugin` (dogfood); the factory infers capabilities from the hooks.

## Components

Owner of `@pantoken/components` (the semantic RSCSS CSS API) and its InstUI-parity work.

### Expertise

- Per-record source: `formats/components/src/{components,utilities,rules,declarations}/<name>.ts` +
  bucket `index.ts` registries; shared helpers in `src/lib/`.
- The modifier convention: key-value RSCSS compounds (`.instui-button.-color-secondary`,
  `-size-{xs,sm,md,lg,xl}`), booleans as the prop name, default-on booleans inverted (`-without-*`).
- Auto-discovered deprecated aliases (authored in record metadata, cloned by `withAliases`); size
  twins via `withSizeAliases`.
- `@scope`/child-combinator scoping for nested element classes.
- Elevation and focus-outline are baked in (elevation into `components.css`, focus into `base.css`);
  fonts ship as opt-in `fonts.css`.

### Instructions

- Author records with `defineComponent`/`defineUtility`/`defineRule`/`defineDeclaration`. The doc
  comment is plain-string metadata; only the `css` body stays a template literal — tag it with
  `css` and add a `// prettier-ignore` line (oxfmt corrupts interpolated selectors otherwise).
- A deprecated modifier must be a **functional alias**, never a doc-only noop.
- Never name a modifier with a `-icon-` substring unless it's a real glyph — the generic
  `[class*="-icon-"]::before` painter will render a broken square on it.
- Per component, update the record, the drift-checked test, the guide, and a demo; then `vp check
--fix`, tests, `check:publish`, and `lint:markdown`. Browser-verify visual changes.
- Full authoring rules live in `docs/conventions/authoring.md`.

## Interactions

Owner of `@pantoken/interactions` — shared behavior extraction for components.

### Expertise

- `formats/interactions/src/behaviors/*.ts` — vanilla JS functions (`initModal`, `initTooltip`, `initInPlaceEdit`, `initCloseButton`) accepting DOM references and returning cleanup/control objects. No dependencies; works in browser and Node.
- `formats/interactions/src/components/*.ts` — 34 IIFE entry points (4 hand-authored, 30 auto-generated) that register listeners on `document.querySelectorAll(".instui-{name}")` and wire behaviors.
- `dist/component-capabilities.json` — auto-generated CDN manifest mapping components to type (css-only / js-only / both), CDN URLs, and icon requirements.
- Shared helpers: `resolveSpace()` (keyword aliases → computed values), `makeOnCommand()` (native command routing), `applySpacing()` (inline style resolution for `margin`, `padding` attributes).
- Web components delegation: `renderers/web-components` elements call behavior functions from interactions, avoiding duplication.

### Instructions

- Author behaviors as side-effect-free functions that accept DOM references (host, trigger, target) and return `{cleanup(): void, ...}` if tear-down is needed.
- All behaviors must be Node-free (no `node:*` imports) so they bundle into the browser.
- Generate new behaviors with `scripts/generate-components.ts`; add hand-authored entries (modal, tooltip, etc.) to the skip list.
- Companion IIFE entry points auto-generate via `scripts/build-iife.ts` — add new component to `ALL_COMPONENTS` if behaviors are added.
- Always write tests for new behaviors in `tests/` (happy-dom environment). Test coverage must meet 85% threshold.
- Update `component-capabilities.json` by running `scripts/generate-capabilities.ts` (filesystem-based discovery via `hasBehavior()`).
- Wrap HTML tags in JSDoc comments with backticks (e.g., `` `<dialog>` ``) to avoid Vue parser errors in generated API docs.

### Expertise

- Co-located `src/**/*.css` shadow CSS is imported with `?inline`; `@tsdown/css` processes and
  minifies it into the JavaScript bundle, stripping `/** … */` doc comments before inlining.
- `register(target?, { prefix })` with a prefix-scoped registry adapter; `DEFAULT_PREFIX = "instui"`.
- The JS-behavior tier (tooltip, drilldown, pages, drawer-layout, interactive calendar, date/datetime
  pickers) built on the Invoker Commands API with a click-delegate fallback.
- `foundationCss()` injected once into `document.head` so elevation + focus tokens reach shadow roots.

### Instructions

- Keep the runtime graph Node-free (this bundles into the browser). Value imports of postcss-based
  `@cssdoc/*` are forbidden here; type-only is fine.
- To add an element: new `src/elements/<name>.ts` exporting an `ElementDefinition`, then add it to
  `DEFINITIONS` and `ELEMENTS` in the same (load-bearing) order — a test asserts the order.
- Behavioral shadow-DOM tests aren't possible without a DOM env; verify behavior in a real browser.
- Full rules live in `docs/conventions/web-components.md`.

## Docs and build

Owner of the VitePress docs site, i18n, the cssdoc integration, and the release gate.

### Expertise

- `docs/` VitePress site (`@pantoken/docs`), two locales (`root` English, `hu` Magyar) with a
  symmetric prefix swap; translation layer in `docs/.vitepress/i18n.ts`.
- The cssdoc integration: pantoken consumes `@cssdoc/*` from npm; `docs/scripts/build-css-api.ts`
  builds the `resolveToken`/`resolveDemo` hooks and calls `emitCssApi`.
- The `vp`-only pipeline and the nested-`vp`-spawn limitation (the docs orchestrator uses direct
  `node` builds).
- The gate: `pnpm run ready` (parallel `vp` task DAG) plus `pnpm run check:publish` (which runs
  `gate:repository`, `gate:publint`, and `gate:attw`). The same checks run on every PR via
  `.github/workflows/ci.yml`, and commit messages are conventional-commit-linted by the
  `.vite-hooks/commit-msg` hook and a CI job.

### Instructions

- Package scripts invoke the toolchain via `vp` (`vp run`, `vp exec`), never `pnpm` — CI has no
  `pnpm` on PATH.
- Localizable UI strings go in `i18n.ts`, never inline. Use the `glossary` adapter for the generated
  API tree and the `ai` adapter only for hand-written guides.
- The docs orchestrator and CSS-API node spawn `node scripts/x.ts`, not a nested `vp run`.
- Full rules live in `docs/conventions/build-and-docs.md`.

<!-- entire-graph:begin -->

This repo has the entire-graph code graph installed. Before exploring code with
grep/find/whole-file reads, read .entire/graph-agent.md — resolution-first guidance
for using graph retrieval, focused source inspection, and verification.
@.entire/graph-agent.md
<!-- entire-graph:end -->
