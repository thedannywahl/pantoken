# CHANGELOG

## 1.0.1

### Patch Changes

- @pantoken/plugin-kit@0.2.5

## 1.0.0

### Major Changes

- 90ce910: Move all CSS generation for `transition` and `stacking` fully into `@pantoken/components`' own
  utilities, and port `@pantoken/plugin-visual-debug`'s `-with-visual-debug` outline as a new
  `@pantoken/components` utility.

  - `@pantoken/components`: the `transition` utility now registers local `--duration` (`300ms`) and
    `--timing` (`ease-in-out`) `@property`-backed custom properties (override either to retime every
    transition), matching the unnamespaced-local-property convention other components/utilities already
    use (e.g. `progress`'s `--value`/`--min`/`--max`) and fixing a prior token-drift bug where the
    utility referenced `--instui-transition-*` custom properties without ever defining them. Added a new
    `visual-debug` utility (`-with-visual-debug`), ported from `@pantoken/plugin-visual-debug`. The
    `prose` rule's default `scope` changed from `.pantoken-prose` to `:where(body)`, so importing
    `prose.css` applies automatically — no wrapper class required — the same way `base.css` does;
    pass `options.scope` (unchanged) to target a different content root instead. Also moved the
    `progress`/`progress-circle` mount and value transition CSS out of a shared, hand-duplicated helper
    and into each component's own `.css` source (matching `popover`/`tray`); the generated
    `progressCss`/`progressCircleCss` output is unchanged. Also fixed several bugs surfaced while
    wiring up the new utilities: `transitionCss` was never exported, so its CSS never shipped; the
    `stacking` and `mask` utilities emitted an invalid selector missing its leading `.` (e.g.
    `-stack-topmost` instead of `.-stack-topmost`), now fixed via the same `globalSelectors` helper
    `cursor`/`position`/`truncate` already use; and the 12 utility subpath exports declared in
    `package.json` (`./utilities/*.css`) now actually resolve to built `dist/utilities/*.css` files
    (previously missing).
  - `@pantoken/plugin-transition` (**breaking**): narrowed to a tokens-only plugin. It no longer emits
    the `.instui-transition` base rule or `fade`/`scale`/`slide-*` state classes, and no longer ships a
    standalone `transition.css` (the `./transition.css` export, and the `prefix`/`position` options, are
    removed) — that CSS now lives exclusively in `@pantoken/components`' own `transition` utility. The
    plugin still bakes `--instui-transition-duration`/`--instui-transition-timing` tokens for consumers
    using the lower-level `@pantoken/css`/`@pantoken/tokens` pipeline directly.
  - `@pantoken/plugin-stacking` (**breaking**): narrowed to a tokens-only plugin. It no longer emits
    `.instui-stack-<level>` classes and no longer ships a standalone `stacking.css` (the `./stacking.css`
    export is removed) — those classes now live exclusively in `@pantoken/components`' own `stacking`
    utility. The plugin still bakes the resolved `--instui-stacking-<level>` tokens.

### Patch Changes

- @pantoken/plugin-kit@0.2.4

## 0.3.2

### Patch Changes

- @pantoken/plugin-kit@0.2.3

## 0.3.1

### Patch Changes

- b2566cc: Republish with internal dependencies resolved to real semver instead of the literal `workspace:*`
  protocol string. Every previously published version of this package shipped with that bug (found by
  `scripts/release/audit-workspace-protocol.ts`), because the release pipeline packed with `npm
pack`/`npm publish`, which doesn't understand pnpm's `workspace:` protocol; it now packs with
  `pnpm pack` first, which resolves it. No functional change beyond the dependency ranges themselves.
- Updated dependencies [b2566cc]
  - @pantoken/plugin-kit@0.2.2

## 0.3.0

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

## 0.2.2

### Patch Changes

- d4ba8fe: Add custom components and layouts plugin packages, wire them into docs CSS API generation and watch tasks, and align lint/tooling config for the new cssdoc-style sources.

## 0.2.1

### Patch Changes

- Updated dependencies [2b814bd]
  - @pantoken/plugin-kit@0.2.1

## 0.2.0

### Minor Changes

- 8391068: **Breaking (minor/beta)**: Plugin hook contexts are now data-only to enable Worker thread
  serialisation.

  - `TokenHookContext` drops the `define` helper; plugins import `defineToken` from
    `@pantoken/model` (or `@pantoken/core` for CSS-syntax inference).
  - `IconHookContext` changes from `{ add, resolve }` to `{ icons, theme }` where `icons` is
    a lightweight list of already-registered icon names. The `icons` hook now returns
    `IconEntry[] | void` instead of mutating via `add`.
  - `@pantoken/model` exports a new zero-dependency `defineToken(input): Token` helper.
  - `@pantoken/plugin-kit` exports `SandboxedPluginEntry`, `isSandboxed`, and `runPluginHook`
    for running individual plugin hooks in an isolated Worker thread (`sandbox: 'thread'`)
    or child process with `--permission` flags (`sandbox: 'process'`).
  - All four first-party pantoken plugins migrated to the new context API.
  - `extendPlugin` icons composition now merges returned `IconEntry[]` arrays.

### Patch Changes

- Updated dependencies [8391068]
- Updated dependencies [8391068]
  - @pantoken/model@0.3.0
  - @pantoken/plugin-kit@0.2.0

## 0.1.6

### Patch Changes

- @pantoken/plugin-kit@0.1.5

## 0.1.5

### Patch Changes

- @pantoken/plugin-kit@0.1.4

## 0.1.4

### Patch Changes

- Updated dependencies [e099a51]
  - @pantoken/model@0.2.0
  - @pantoken/plugin-kit@0.1.3

## 0.1.3

### Patch Changes

- 3d2f6db: # Enrich npm package metadata

  Every published package now carries `homepage`, `bugs`, `repository.directory`, `sideEffects`,
  `engines`, and `publishConfig.provenance`. npmjs.com pages link back to the docs site, the issue
  tracker, and the exact monorepo folder; `sideEffects` lets bundlers tree-shake the pure packages
  while preserving the stylesheets in the CSS-shipping ones.

- Updated dependencies [3d2f6db]
  - @pantoken/model@0.1.1
  - @pantoken/plugin-kit@0.1.2

## 0.1.2

### Patch Changes

- @pantoken/plugin-kit@0.1.1

## 0.1.1

### Changed

- Updated internal workspace dependency versions.

## 0.1.0

### Added

- Initial release of @pantoken/plugin-transition.
