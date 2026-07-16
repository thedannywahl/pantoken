# Architecture overview

pantoken resolves Instructure UI's design tokens and icons once into a canonical model, then turns
that single model into many small, individually-publishable packages — plain CSS, SCSS/Less/Stylus,
React/Vue/Svelte/Angular, Tailwind/Panda/PostCSS, native Swift/Kotlin/Compose/Flutter, WordPress,
Drupal, Figma, and more. You install the smallest package that fits, or the unified `pantoken` meta
package that re-exports them all.

## The pipeline

`@pantoken/core` (the transformer) resolves the Tokens Studio graph into a canonical,
`@property`-aligned `Token[]` IR — icons rolled in as `<image>` tokens. `@pantoken/tokens` vendors
that IR plus the raw JSON as static files. Every emitter (`css`, `icons`, `astro`, `rehype`,
`swift`, and the rest) consumes the vendored IR. The native path runs `core.toStyleDictionary()`
→ `@pantoken/sd-config` (Style Dictionary v5) → `@pantoken/swift` / `@pantoken/cli`.

## The upstream-decoupling constraint (the load-bearing rule)

`@instructure/instructure-design-tokens` is GitHub-only — no npm publish, no types. `@pantoken/core`
depends on it. So a package that depended on `core` would transitively pull the GitHub-only upstream
into every consumer's install. To prevent that:

- Type contracts live in a zero-dependency **`@pantoken/model`**.
- Web and emitter packages depend on **`model` + `tokens`** (both upstream-free), **never on `core`**.
- `core` carries an ambient `declare module "@instructure/instructure-design-tokens"` shim, since the
  upstream ships no types.

When you add a package, keep it off `core` unless it genuinely runs the transform. Reach for `model`
(types) and `tokens` (the vendored IR) instead.

## Workspace layout — organized by how you consume each package

The axis is consumption, not language. The rule of thumb: **import the output → `formats/`;
generate it into another ecosystem → `platforms/`.**

| Bucket       | What lives here                                                                                                                                                                                                                                                          |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `packages/`  | Core machinery: `model` (types, zero-dep), `core` (transformer), `utils` (shared resolver + drift helpers), `plugin-kit` (the plugin factory), `cli`, and `pantoken` (the auto-generated meta package).                                                                  |
| `formats/`   | Importable npm serializations of the IR — `tokens`, `css`, `icons`, `dtcg`, `scss`, `less`, `stylus`, `icon-font`, and `components`. You `npm i` and import these.                                                                                                       |
| `platforms/` | Foreign-ecosystem source you _generate_ via the CLI and publish to that ecosystem's registry — `swift`, `android`, `compose`, `flutter`, `wordpress`, `vanilla`, `drupal`, `jekyll`, `hugo`, `email`.                                                                    |
| `renderers/` | Integrations that produce UI — `web-components`, `react`/`vue`/`svelte`/`angular` wrappers, `react-markdown`, `rehype`, `astro`, `pendo`, and CSS-var bridges (`shadcn`, `bootstrap`, `docusaurus`, `vitepress`).                                                        |
| `bundlers/`  | Build-pipeline integrations — `vite`, `tailwind`, `postcss`, `next`, `webpack`, `panda`.                                                                                                                                                                                 |
| `design/`    | Design-tool assets — `figma` (Variables payload) and `swatches` (ASE/GPL/sketchpalette).                                                                                                                                                                                 |
| `plugins/`   | Split by kind: `plugins/pantoken/*` are `PantokenPlugin`s (colors, focus/simple-icons/stacking/transition/visual-debug/primitives/logos); `plugins/postcss/*` are PostCSS plugins (prune-custom-props); `plugins/typedoc/*` and `plugins/vite/*` are docs/build tooling. |
| `tools/`     | Internal build tooling — `sd-config` (Style Dictionary, powers the native targets), `aggregate` (builds the meta package).                                                                                                                                               |
| `ai/`        | Consumer-facing agent assets (`@pantoken/ai`, `pantoken-ai`) — NOT for developing pantoken itself. It drops AGENTS.md, llms.txt, and editor rules into a _consumer_ repo.                                                                                                |

## The meta package

`pantoken` is auto-generated by `tools/aggregate`, which scans each package's
`"pantoken": { key, kind }` field. `kind` decides how a package joins the meta:

- `namespace` — eager barrel + subpath.
- `sideEffect` — barrel + an `/inject` subpath.
- `subpath` — subpath only, kept **out** of the eager barrel. Used for heavy React integrations (e.g.
  `react-markdown`, tailwind, panda) so `import "pantoken"` never pulls React or a build config.

`aggregate` only _writes_ the meta. When you remove a package from the meta, delete its orphaned
`packages/pantoken/src/<name>.ts` by hand — aggregate won't.

## Shared helpers

`@pantoken/utils` (deps: `model` + `arkregex`) holds the formerly copy-pasted resolver:
`makeResolver(base, {mode?, overrides?})` (a `var()` + `light-dark()` resolver) and `resolveTokens`,
plus the typed `VAR_RE`/`LIGHT_DARK_RE` regexes, `camelCase`, and `parseHexColor`. It also holds the
drift/validation harness — `unknownReferences(text, ir)` (bridge targets must be real tokens) and
`danglingReferences(css)` (self-containment: every `var()` has a definition in the same output) — plus
the generic token→class engines `colorUtilitiesCss` and `tokenUtilitiesCss`. `utils` must never import
from `components` (it sits below it). `checkPlugins` (the capability guard) lives in `plugin-kit`, not
`utils`.

## The gate

`pnpm run ready` (build `-r` + `vp check` + test `-r` + markdown lint) must pass; `pnpm run
check:publish` runs publint. Generated artifacts (`platforms/tokens/src/generated/`,
`platforms/css/style.css`, each preprocessor's static file, web-components `src/generated/`) are
gitignored and reproduced on build.

## Deliberate boundaries

- **canvas-ios and canvas-android get no dedicated targets** — both already self-generate from InstUI
  through their own Style Dictionary pipelines. pantoken's generic swift/android/compose cover the
  general native case; duplicating their in-repo scripts would drift.
- **Storybook is a renderer, not a design tool** — pantoken themes the Storybook _app_; it doesn't
  author design variables (that's Figma). The test is "theming the app" vs "providing
  design-authoring assets."
- **Go was declined** — no real Go UI consumer worth a target.
