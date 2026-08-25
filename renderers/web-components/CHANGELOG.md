# CHANGELOG

## 0.5.7

### Patch Changes

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
- Updated dependencies [8aa88bb]
- Updated dependencies [8aa88bb]
- Updated dependencies [8aa88bb]
- Updated dependencies [8aa88bb]
- Updated dependencies [8aa88bb]
- Updated dependencies [8aa88bb]
- Updated dependencies [8aa88bb]
- Updated dependencies [8aa88bb]
  - @pantoken/icons@0.2.0
  - @pantoken/interactions@0.3.6
  - @pantoken/model@0.3.1
  - @pantoken/components@1.0.2
  - @pantoken/scaffold-base@0.2.0

## 0.5.6

### Patch Changes

- Updated dependencies [343c59d]
- Updated dependencies [343c59d]
- Updated dependencies [343c59d]
  - @pantoken/components@1.0.1
  - @pantoken/interactions@0.3.5

## 0.5.5

### Patch Changes

- Updated dependencies [aaf4751]
- Updated dependencies [aaf4751]
  - @pantoken/components@1.0.0
  - @pantoken/icons@0.1.9
  - @pantoken/interactions@0.3.4

## 0.5.4

### Patch Changes

- e6c0d3b: Add a new `drawer-layout` CSS component with `tray`, `handle`, and `content` members in `@pantoken/components`.

  Extract DrawerLayout command and responsive-overlay wiring into a shared `initResponsiveOverlay()` behavior in `@pantoken/interactions` (named for the interaction it provides, not the component), and wire both the interactions entry point and the web component to import it.

  Update interactions capability metadata so `drawer-layout` is marked as `both` (CSS + JS).

- Updated dependencies [e6c0d3b]
- Updated dependencies [e6c0d3b]
- Updated dependencies [e6c0d3b]
- Updated dependencies [e6c0d3b]
  - @pantoken/components@0.7.1
  - @pantoken/interactions@0.3.3
  - @pantoken/icons@0.1.8

## 0.5.3

### Patch Changes

- Updated dependencies [90ce910]
- Updated dependencies [90ce910]
- Updated dependencies [90ce910]
- Updated dependencies [90ce910]
- Updated dependencies [90ce910]
- Updated dependencies [90ce910]
- Updated dependencies [90ce910]
- Updated dependencies [90ce910]
  - @pantoken/components@0.7.0
  - @pantoken/interactions@0.3.2
  - @pantoken/icons@0.1.7

## 0.5.2

### Patch Changes

- Updated dependencies [db834de]
  - @pantoken/components@0.6.0
  - @pantoken/interactions@0.3.1
  - @pantoken/icons@0.1.6

## 0.5.1

### Patch Changes

- b2566cc: Republish with internal dependencies resolved to real semver instead of the literal `workspace:*`
  protocol string. Every previously published version of this package shipped with that bug (found by
  `scripts/release/audit-workspace-protocol.ts`), because the release pipeline packed with `npm
pack`/`npm publish`, which doesn't understand pnpm's `workspace:` protocol; it now packs with
  `pnpm pack` first, which resolves it. No functional change beyond the dependency ranges themselves.
- Updated dependencies [b2566cc]
  - @pantoken/components@0.5.1
  - @pantoken/icons@0.1.5

## 0.5.0

### Minor Changes

- 853659c: Add arbitrary maximum values and InstUI-compatible animation support to ProgressBar and
  ProgressCircle.

  Both components now expose `--min`, `--value`, and `--max`, keep deprecated `--value-now` and
  `--value-max` aliases, and share their InstUI transition rules through the transition plugin.
  ProgressCircle also exposes `--animation-delay`, keeps the deprecated `-should-animate-on-mount` and
  `-shold-animate-on-mount` aliases, and uses the same timeout behavior in plain HTML and web
  components. The ProgressBar web component retains its meter between attribute updates so
  `should-animate` transitions remain functional.

  Their cssdoc records restrict usage to native `progress` and `meter` elements. Both web components
  render `progress` for zero-based ranges and switch to `meter` when `min` is non-zero.

### Patch Changes

- 853659c: Add InstUI-compatible timeout dismissal to Alert. Class-based alerts accept a millisecond
  `--timeout`, emit a cancelable `dismiss` event, and remove themselves through the Alert interaction
  bundle, with fades driven by `@pantoken/plugin-transition`. Per-component IIFEs now retain their
  initialization side effects, and the web component shares the same removal behavior directly.
- Updated dependencies [853659c]
- Updated dependencies [853659c]
- Updated dependencies [853659c]
- Updated dependencies [853659c]
- Updated dependencies [853659c]
- Updated dependencies [853659c]
  - @pantoken/components@0.5.0
  - @pantoken/interactions@0.3.0

## 0.4.2

### Patch Changes

- Updated dependencies [d4ba8fe]
  - @pantoken/components@0.4.1

## 0.4.1

### Patch Changes

- 47f3275: abstract component interactions into shared package
- 47f3275: Extract shared spacing and Invoker Commands helpers from `@pantoken/web-components` into a new `@pantoken/interactions` package.

  `@pantoken/web-components` now consumes these helpers from `@pantoken/interactions` with no behavioral change.

- Updated dependencies [47f3275]
- Updated dependencies [47f3275]
- Updated dependencies [47f3275]
- Updated dependencies [47f3275]
- Updated dependencies [47f3275]
- Updated dependencies [47f3275]
  - @pantoken/interactions@0.2.0
  - @pantoken/components@0.4.0

## 0.4.0

### Minor Changes

- ebe77e5: Export `NESTED_DEPS` (alongside the existing `ELEMENTS`) so consumers building tooling around `register()`'s `only` option no longer need to hardcode a copy of the transitive-dependency map.

  Add a small IIFE build per element (`dist/<name>.iife.js`, e.g. `dist/alert.iife.js`), alongside the existing "everything" `dist/web-components.iife.js`, for a classic `<script src>` consumer who only wants one custom element. Most stay under ~600 KB (down from the ~2.5 MB monolith); the handful that render an inline icon glyph (`icon`, `calendar`, `date-input`, `drilldown`, `rating`) still bundle the icon set, since they genuinely need it. No behavior change for existing consumers — `register()`'s default icon resolution is unchanged.

## 0.3.2

### Patch Changes

- Updated dependencies [7879f6b]
  - @pantoken/components@0.3.0

## 0.3.1

### Patch Changes

- 03a9dc1: escape weekday strings to prevent unsanitized HTML injection

## 0.3.0

### Minor Changes

- 40987c4: Add first-class i18n and RTL support to the web component layer.

  **`@pantoken/web-components`**

  `register()` gains three new options: `locale` (BCP47 tag), `strings` (partial `WebComponentStrings` override), and `dir` (`"ltr" | "rtl"`). All user-visible strings in the behavioral elements are now localizable:

  - `<instui-calendar>` — weekday headers and month label rendered via `Intl.DateTimeFormat`; prev/next `aria-label`s from `strings`; locale-aware first-day-of-week via `Intl.Locale.weekInfo`; RTL swaps chevron icons.
  - `<instui-date-input>` — default label, placeholder, and trigger `aria-label` from `strings`; date `<input>` always carries `dir="ltr"` regardless of page direction (ISO dates are LTR).
  - `<instui-date-time-input>` — time field `aria-label` from `strings`.
  - `<instui-drilldown>` — synthesized Back row text from `strings`; RTL swaps the arrow icon.

  New exports: `WebComponentStrings`, `ENGLISH_STRINGS`, `makeStrings`, `resolveFirstDay`.

  **`@pantoken/i18n`** _(new package)_

  Ships pre-built `LocaleBundle` objects for all 44 Canvas-supported locales (3 RTL: `ar`, `he`, `fa`). Weekday names are derived at runtime via `Intl.DateTimeFormat`; the 7 translatable UI strings are populated from a committed SHA-256-keyed translation memory (`i18n-cache/*.json`). Hungarian (`hu`) ships with full translations; all other non-English locales fall back to English pending `vp run i18n:translate`.

  Key exports: `registerLocalized`, `defineBundle`, `CANVAS_LOCALES`, `getDir`, per-locale bundle objects (`ar`, `hu`, `zh-Hans`, …).

  Translation tooling: `vp run i18n:translate` / `i18n:translate:agy` (AI, local-only), `vp run i18n:check:drift` (CI gate), `vp run i18n:bundles:build` (regenerate TS bundles from cache). New string sources are auto-discovered via `src/i18n.json` convention — no manual registry needed. Supports `agy` via `tools/translation-adapters/agy-wrapper.sh`.

## 0.2.10

### Patch Changes

- Updated dependencies [658021f]
  - @pantoken/components@0.2.9

## 0.2.9

### Patch Changes

- Updated dependencies [f97aeb6]
  - @pantoken/components@0.2.8

## 0.2.8

### Patch Changes

- Updated dependencies [2b814bd]
  - @pantoken/components@0.2.7

## 0.2.7

### Patch Changes

- Updated dependencies [8391068]
- Updated dependencies [8391068]
  - @pantoken/model@0.3.0
  - @pantoken/icons@0.1.4
  - @pantoken/components@0.2.6

## 0.2.6

### Patch Changes

- Updated dependencies [0306bf4]
  - @pantoken/components@0.2.5

## 0.2.5

### Patch Changes

- @pantoken/components@0.2.4

## 0.2.4

### Patch Changes

- 424f57a: Resolve Snyk Code (SAST) findings and two latent web-component bugs.

  - File server: contain resolved paths inside `serveDir` (path-traversal fix).
  - Demo runner and docs theme: target the host origin instead of `"*"`, drop cross-origin messages, and sanitize highlighted code before `innerHTML` (DOM-XSS fix).
  - Web components: scope the `withSpacing` observer to the spacing attributes so it no longer self-triggers, and route Invoker `command`/`commandfor` through a per-target handler map so drilldown and shared-document cases resolve correctly.

- Updated dependencies [424f57a]
  - @pantoken/components@0.2.3
  - @pantoken/icons@0.1.3

## 0.2.3

### Patch Changes

- Updated dependencies [e099a51]
  - @pantoken/model@0.2.0
  - @pantoken/components@0.2.2
  - @pantoken/icons@0.1.2

## 0.2.2

### Patch Changes

- 3d2f6db: # Enrich npm package metadata

  Every published package now carries `homepage`, `bugs`, `repository.directory`, `sideEffects`,
  `engines`, and `publishConfig.provenance`. npmjs.com pages link back to the docs site, the issue
  tracker, and the exact monorepo folder; `sideEffects` lets bundlers tree-shake the pure packages
  while preserving the stylesheets in the CSS-shipping ones.

- Updated dependencies [3d2f6db]
  - @pantoken/components@0.2.1
  - @pantoken/icons@0.1.1
  - @pantoken/model@0.1.1

## 0.2.1

### Patch Changes

- 9ecba6c: # Fix a TypeDoc link warning in the `register()` doc comment

  De-link the internal `NESTED_DEPS` reference and the `ELEMENTS` reference in `register()`'s `@param options` comment, so the API docs (and the Angular re-export that inherits this comment) generate without warnings. Comment-only change — no runtime or type-shape change.

## 0.2.0

### Minor Changes

- c8b956d: # CDN distribution: lean token sheet, component-icons, and web-component drop-ins

  Publish the files the CDN combine URLs (and the docs picker) point at:

  - **`@pantoken/css`** — new `style.lean.css` export: the full sheet minus the
    `--instui-icon-*` glyph set (~22.5 KB gzip vs ~140 KB), the recommended CDN
    foundation. Both sheets now carry the elevation + focus-outline custom
    properties. Adds a runtime dependency on `@pantoken/utils`.
  - **`@pantoken/components`** — new `component-icons.css` export (the ~11 icons the
    component sheets reference), so a per-component CDN load resolves its icons
    against the lean sheet. The elevation + focus-outline custom properties are no
    longer defined in `components.css`/`base.css` — they now ship in the token
    sheet, so load a token sheet alongside the component CSS (already required for
    all other tokens). Adds a runtime dependency on `@pantoken/utils`.
  - **`@pantoken/web-components`** — `register(target, { only })` registers a subset
    of elements (nested dependencies pulled in automatically); new
    `dist/web-components.iife.js` `<script>` drop-in. The `foundationCss` export and
    its auto-injected `<style>` are removed — the required token sheet now carries
    those custom properties.
  - **`@pantoken/utils`** — now owns the elevation + focus-outline declaration
    builders (`elevationDeclarations`, `focusOutlineDeclarations`, `focusOutlineRules`,
    `ELEVATION_NAMES`, `FOCUSABLE_SELECTOR`) so the token sheet can emit them.

### Patch Changes

- Updated dependencies [c8b956d]
  - @pantoken/components@0.2.0

## 0.1.1

### Changed

- Updated internal workspace dependencies:
  - @pantoken/components: 0.1.0 -> 0.1.1

## 0.1.0

### Added

- Initial release of @pantoken/web-components.
