# Agents

Custom agent personas for the pantoken workspace. Start from `CLAUDE.md` for orientation and the
knowledge map. Each persona below pairs with deeper docs:

- Pipeline, IR, emitters → `docs/architecture/overview.md`
- Components → `docs/conventions/authoring.md`
- Web components → `docs/conventions/web-components.md`
- Build, release, docs site → `docs/conventions/build-and-docs.md`
- Known gotchas → `docs/engineering-log.md`

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
  comment is plain-string metadata; only the `css` body stays a template literal — tag it ` css` ``with a`// prettier-ignore` line (oxfmt corrupts interpolated selectors otherwise).
- A deprecated modifier must be a **functional alias**, never a doc-only noop.
- Never name a modifier with a `-icon-` substring unless it's a real glyph — the generic
  `[class*="-icon-"]::before` painter will render a broken square on it.
- Per component, update the record, the drift-checked test, the guide, and a demo; then `vp check
--fix`, tests, `check:publish`, and `lint:markdown`. Browser-verify visual changes.
- Full authoring rules live in `docs/conventions/authoring.md`.

## Web components

Owner of `@pantoken/web-components` — the shadow-DOM custom elements.

### Expertise

- Co-located `src/**/*.css` shadow CSS → `scripts/styles.ts` codegen → `src/generated/` (gitignored);
  the codegen strips `/** … */` doc comments before inlining.
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
- The gate: `pnpm run ready` + `pnpm run check:publish`.

### Instructions

- Package scripts invoke the toolchain via `vp` (`vp run`, `vp exec`), never `pnpm` — CI has no
  `pnpm` on PATH.
- Localizable UI strings go in `i18n.ts`, never inline. Use the `glossary` adapter for the generated
  API tree and the `claude-code` adapter only for hand-written guides.
- The docs orchestrator and CSS-API node spawn `node scripts/x.ts`, not a nested `vp run`.
- Full rules live in `docs/conventions/build-and-docs.md`.
