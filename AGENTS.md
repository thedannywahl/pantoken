# Agents

Custom agent personas for the pantoken workspace. Start from `CLAUDE.md` for orientation and the
knowledge map. Each persona below pairs with deeper docs:

- Pipeline, IR, emitters → `docs/architecture/overview.md`
- Components → `docs/conventions/authoring.md`
- Interactions → `docs/conventions/interactions.md`
- Web components → `docs/conventions/web-components.md`
- Multiple themes/color schemes in one document → `docs/conventions/scoping.md`
- Build, release, docs site → `docs/conventions/build-and-docs.md`
- Known gotchas → `docs/engineering-log.md`

## Security documentation (cross-cutting)

Applies to every agent persona below.

- Amend `ASSURANCE.md` (Controls table, Residual risks) when adding new input surfaces, new
  controls, or closing a residual risk.
- Amend `SECURITY.md` (requirements, limitations, supply-chain sections) when the public-facing
  security posture changes.
- If a change alters public component names, props or modifiers, install or usage instructions, or
  published AI-facing guidance, update `ai/pantoken-ai` assets (`AGENTS.md`, `llms.txt`, editor
  rules, bootstrap skill) in the same PR. If none of these apply, state in the PR description that
  the assets were checked and need no update.
- Run `vp exec changeset` and commit the changeset for every change that alters published package
  output, public API, CSS class names, emitted tokens, or documented behavior before merging. Do not
  add a changeset for test-only, internal-only, or docs-only changes, unless the docs-only change
  documents a behavior change made in the same PR; that behavior change requires a changeset.

## Figma MCP integration

Apply this section to Figma-driven work. pantoken adapts upstream contracts into multiple outputs;
MCP-generated code is design evidence, not the implementation format.

### Sources of truth

- [InstUI source](https://github.com/instructure/instructure-ui) defines upstream component exports,
  props, states, behavior, and accessibility contracts. Inspect the version used by the workspace,
  not floating `main`; resolve versions from `pnpm-workspace.yaml` and the lockfile.
- [Instructure design tokens](https://github.com/instructure/instructure-design-tokens) defines the
  upstream token graph. Its release tag and resolved commit identify the version, not its embedded
  package version. `@pantoken/core` transforms it into the vendored `@pantoken/tokens` IR; downstream
  code uses actual IR names and aliases, not guessed Figma-name-to-CSS conversions.
- The [InstUI Figma library](https://www.figma.com/design/5WFqF3HVlNdfcJooCaiFoh/InstUI-Component-Library)
  supplies visual anatomy, variants, layout, and variable evidence. It's expected to use the same
  upstream token library as pantoken, but that doesn't prove synchronized versions, modes, or values.

If these sources disagree, report the exact node, upstream version, token binding, and affected
contract. Ask for a decision before changing public contracts; don't conceal drift with hardcoded
values, replacement tokens, dependency upgrades, or silent substitutions. A token family alone
doesn't establish that InstUI exports a component.

### Library navigation

Use the library's page groups to bound discovery:

| Page group                   | Use                                                                                                                                                                                                          |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `● COMPONENTS`               | The actual component inventory.                                                                                                                                                                              |
| `● INTERNALS`                | Mixed utilities and components; classify each target as a component only if `@instructure/ui` exports it under that name in the workspace's released version, otherwise treat it as a utility and report it. |
| `● GUIDES`                   | Developer guidance, not component inventory.                                                                                                                                                                 |
| `● NATIVE MOBILE COMPONENTS` | Ignore for this workflow.                                                                                                                                                                                    |
| `Native resources`           | Ignore for this workflow.                                                                                                                                                                                    |
| `● ICONS`                    | Ignore; Lucide-only. Use pantoken's existing icon pipeline.                                                                                                                                                  |
| `● OTHERS`                   | Ignore for this workflow.                                                                                                                                                                                    |
| `Draft`                      | Ignore for this workflow.                                                                                                                                                                                    |

These are default discovery boundaries, not instructions to remove corresponding repo outputs.
Only inspect an excluded group when the user explicitly targets it.

### Component status and ownership

Figma's `Completed` and `Ready for dev` labels describe design status, not upstream availability.
`Ready for dev` covers both refreshed existing components and new components; never use it alone
to identify a new component.

- Check whether the component is exported by the workspace's released version of `@instructure/ui`.
  Verify exports by inspecting the installed `@instructure/ui` package in `node_modules` at the
  version locked in the lockfile, checking its public entry points. If `node_modules` does not
  contain that version, report the missing evidence and stop until the user confirms how to proceed.
  Do not rely on memory or the GitHub `main` branch.
  If it is, it belongs in `formats/components`, including when Figma marks a refresh `Ready for dev`.
- If it's `Ready for dev` and isn't exported by that version of `@instructure/ui`, it belongs in
  `plugins/pantoken/custom-components`.
- Once released upstream and adopted by the workspace, move the implementation into
  `formats/components` and retain a functional deprecated alias in custom-components for the
  existing specified compatibility period. Follow the
  [promotion and alias-retirement policy](docs/conventions/build-and-docs.md#upstream-component-follow-up);
  don't invent a new retirement window.
- An unavailable export lookup isn't proof of absence. Report missing evidence; don't infer
  ownership from `Completed`, token presence, or Figma status alone.
  If the export lookup cannot be completed, report the missing evidence with the node ID and stop
  until the user confirms which output layer to use before implementing.
- If a component is not exported by the workspace's released `@instructure/ui` and is not marked
  `Ready for dev`, stop, report the node ID and the export evidence, and ask the user which output
  layer to use before implementing.

### Required flow

1. Run `get_design_context` for the exact node and variant. If the response is truncated, use
   `get_metadata` to narrow the node map, then fetch only the required nodes again. If
   `get_design_context` fails or the Figma MCP server is unavailable, report the error and node ID;
   do not infer the design from memory or other sources, and stop until the user confirms how to
   proceed.
   2a. Run `get_screenshot` for the matching variant before visual implementation or asset downloads.
   If `get_screenshot` fails or returns an error, report the error and the node ID, do not infer
   the visual from the design context alone, and stop until the user confirms how to proceed.
   2b. If no screenshot exists for the requested variant, stop, report the missing variant with its
   node ID, and ask the user which variant to use before implementing.
   2c. Read each `● GUIDES` page whose title names the target component. List the pages read in the
   PR description. If no page matches, report that and stop until the user confirms how to proceed.
   2d. Run `get_variable_defs` for every variable used by the target node before comparing tokens in
   step 3, and record the returned binding for each one. If it fails or returns no binding for
   a used variable, report the error and the node ID, do not infer the token value from the design
   context or screenshot, and stop until the user confirms how to proceed.
2. Compare the target's semantic aliases, theme/mode, and values with the version-matched upstream
   tokens and current IR. Surface missing evidence and version or binding drift instead of guessing.
3. Verify component ownership against `@instructure/ui` as described above, then choose the existing
   output layer below. Reuse its components, tokens, utilities, and helpers;
   don't copy generated JSX, Tailwind classes, or absolute positioning as a mandated architecture.
   5a. Compare theme, mode, size, variant, and state against the screenshot.
   5b. Test keyboard and focus behavior.
   5c. Test with the integrated automa11y tool using Guidepup as a virtual screen reader, and record
   the report. If the tool cannot be run, record the check as not tested and state that in the PR
   description.
   5d. Confirm user preferences (reduced motion, color scheme, font size) are respected.
   5e. Record a pass/fail result for each WCAG 2.2 success criterion listed for the component in `docs/conventions/authoring.md`, plus 2.1.1 Keyboard, 2.4.7 Focus Visible, 1.4.3 Contrast (Minimum), and 1.4.11 Non-text Contrast for any interactive element. Mark a criterion as not applicable only with a stated reason.

### Downstream implementation

- **Tokens and serializers:** change authored transforms/generators, not generated output. Preserve
  the shared IR; emitters depend on `model` + `tokens`, not `core`. See the
  [architecture overview](docs/architecture/overview.md).
- **Semantic CSS:** use token-backed RSCSS records, modifiers, functional aliases, and co-located
  CSS/cssdoc under `formats/components`. Follow the
  [authoring conventions and per-component checklist](docs/conventions/authoring.md), including
  tests, guides, demos, and browser verification. Use the component-status and ownership rules above
  for unreleased components and promotion; neither tokens nor `Ready for dev` alone establish
  canonical ownership.
- **Behavior and renderers:** reuse [interactions](docs/conventions/interactions.md) and respect
  [web-component shadow boundaries](docs/conventions/web-components.md). Keep browser runtime graphs
  Node-free and framework wrappers consistent with their existing APIs. Don't add upstream React
  dependencies to wrappers merely because MCP returned React code.
- **Other targets:** retain each target's existing conventions and tests. A Figma change doesn't
  require implementing every output. The [Figma Variables exporter](design/figma/README.md) is an
  IR-to-Figma output, not a reverse-import pipeline.

### Assets and write boundaries

- Use an existing pantoken glyph or icon API when one matches the Figma icon. Download an asset
  only when it is a raster or illustrative image with no glyph equivalent. If neither applies,
  report the unmatched icon instead of copying the Figma SVG or adding a new icon dependency.
- Retrieve needed assets through MCP's provided endpoint after fetching context and screenshots.
  Use supplied localhost URLs for retrieval/preview, not permanent production references. Don't
  substitute placeholders; persist required assets through the target's normal asset workflow and
  retain attribution required by the asset's license or the Figma file's terms: copy the license
  name and source URL into the asset's directory README or the docs credits page. Report unavailable
  assets explicitly.
- The Figma URL isn't a filesystem destination. Write implementation files into the owning repo
  package. Editing or syncing the upstream Figma file requires an explicit user request.

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
- Dependency direction: `utils` must not import (directly or transitively, including type-only
  imports) from `components`.
- Author plugins with `definePlugin` (dogfood); the factory infers capabilities from the hooks.

## Components

Owner of `@pantoken/components` (the semantic RSCSS CSS API) and its InstUI-parity work.

### Expertise

- Per-record source: co-located `index.ts` + `<name>.css` under
  `formats/components/src/{components,utilities,declarations}/<name>/` or `src/rules/{base,prose}/`;
  bucket `index.ts` registries and shared helpers in `src/lib/`.
- The modifier convention: key-value RSCSS compounds (`.instui-button.-color-secondary`,
  `-size-{xs,sm,md,lg,xl}`), booleans as the prop name, default-on booleans inverted (`-without-*`).
- Auto-discovered deprecated aliases (authored in record metadata, cloned by `withAliases`); size
  twins via `withSizeAliases`.
- `@scope`/child-combinator scoping for nested element classes.
- Elevation and focus-outline are baked in (elevation into `components.css`, focus into `base.css`);
  fonts ship as opt-in `fonts.css`.

### Instructions

- Author records with `defineComponent`/`defineUtility`/`defineRule`/`defineDeclaration`; keep CSS
  and cssdoc metadata in the co-located `.css` file. When runtime interpolation needs a CSS template
  literal, tag it with `css` and add a `// prettier-ignore` line (oxfmt corrupts interpolated selectors
  otherwise). Don't edit generated component styles.
- A deprecated modifier must be a **functional alias**, never a doc-only noop.
- Never name a modifier with a `-icon-` substring unless it's a real glyph — the generic
  `[class*="-icon-"]::before` painter will render a broken square on it.
- Per component, update the record, the drift-checked test, the guide, and a demo; then `vp check
  --fix`, tests, `check:publish`, and `lint:markdown`. Browser-verify visual changes in Chromium at
  1280px and 375px widths, in light and dark themes, and state the results in the PR description.
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

- Author behaviors as functions that accept DOM references (host, trigger, target) and have no
  import-time side effects. When called, they may attach listeners or modify the DOM; return
  `{cleanup(): void, ...}` to remove those listeners and undo changes that require tear-down.
- All behaviors must be Node-free (no `node:*` imports) so they bundle into the browser.
- Generate new behaviors with `scripts/generate-components.ts`; add hand-authored entries (modal, tooltip, etc.) to the skip list.
- Companion IIFE entry points auto-generate via `scripts/build-iife.ts` — add new component to `ALL_COMPONENTS` if behaviors are added.
- Always write tests for new behaviors in `tests/` (happy-dom environment) to cover the behavior
  logic. Test coverage must meet the 85% line and branch threshold configured in the interactions
  package's test runner config, measured per package.
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
- Happy-dom tests don't exercise behavioral shadow-DOM integration; verify that behavior in a real
  browser as well.
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
- The gate: `vp run ready` (parallel `vp` task DAG) plus `vp run check:publish` (which runs
  `gate:repository`, `gate:publint`, and `gate:attw`). The same checks run on every PR via
  `.github/workflows/ci.yml`, and commit messages are conventional-commit-linted by the
  `.vite-hooks/commit-msg` hook and a CI job.

### Instructions

- Package scripts invoke the toolchain via `vp` (`vp run`, `vp exec`), never `pnpm` — CI has no
  `pnpm` on PATH.
- Localizable UI strings go in `docs/.vitepress/i18n.ts`, never inline. Add every new string to
  both the `root` (English) and `hu` (Magyar) locales in the same change, using the symmetric prefix
  swap. Use the `glossary` adapter for the generated API tree and the `ai` adapter only for
  hand-written guides.
- The docs orchestrator and CSS-API node spawn `node scripts/x.ts`, not a nested `vp run`.
- Full rules live in `docs/conventions/build-and-docs.md`.

<!-- entire-graph:begin -->

This repo has the entire-graph code graph installed. Before exploring code with
grep/find/whole-file reads, read .entire/graph-agent.md — resolution-first guidance
for using graph retrieval, focused source inspection, and verification.
@.entire/graph-agent.md
<!-- entire-graph:end -->
