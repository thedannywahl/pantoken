# CHANGELOG

## 1.0.0

### Major Changes

- aaf4751: Global utility modifiers (background/text/border color, border-radius, border-width, box-shadow, font-weight, font-family, line-height, opacity, display, text-align, position, overflow, cursor, stacking, mask, truncate, margin/padding/gap spacing) are now spelled with a **double dash** (`--bg-secondary`, `--mt-xl`, `--display-flex`, ...) instead of a single dash (`-bg-secondary`). This is a breaking rename: the old single-dash global-modifier classes no longer exist.

  Why: a single-dash global modifier could collide in name with — and lose the cascade to — a component's own single-dash modifier, entirely dependent on unpredictable CSS import order (`cssdoc.jsonc`'s `globalPrecedence` only ever affected generated documentation, never real browser cascade). The `--` namespace never collides, and now wins deterministically via the modifier class repeated 3x, giving it (0,3,0) specificity — a guaranteed edge over any 2-class component-modifier compound, regardless of source order.

  This also means every global modifier now works on **any** registered component automatically — core (`@pantoken/components`) or plugin-authored (e.g. `@pantoken/plugin-custom-components`'s `card`/`agent-shell`) — with no per-package enumeration and no author effort, and `spacing` gained the same chainable behavior other utilities already had (previously bare-only, to avoid a real ~3s/940KB generation-time regression from enumerating every core component per rule — the new mechanism has a fixed selector size per rule regardless of component count).

  `@pantoken/utils`'s `colorUtilitiesCss`/`tokenUtilitiesCss` dropped the `chainTargets` option (superseded by the new `globalModifierSelector` mechanism, exported from `@pantoken/utils`). `@pantoken/plugin-primitives`'s font-family/font-weight utility classes (built on `tokenUtilitiesCss`) are renamed the same way; its color (`bg`/`fg`/`border`) classes are unaffected (authored separately, not through the shared helper).

### Minor Changes

- aaf4751: `colorUtilitiesCss` now emits `.--color-<name>` as an alias of `.--text-<name>` (same declaration, either class name works). `@pantoken/components`'s semantic text-color utilities (`--text-danger`, `--text-secondary`, ...) gain the matching `--color-*` class for free.

### Patch Changes

- Updated dependencies [aaf4751]
- Updated dependencies [aaf4751]
  - @pantoken/utils@1.0.0
  - @pantoken/tokens@0.2.4

## 0.7.1

### Patch Changes

- e6c0d3b: Embed each `@memberOf` member's ancestor path in its own `@structure` via `@component <parent> { … }`
  (replacing the older `@scope (.pfx-<parent>) { … }` doc wrapper), and complete parent-side `@structure`
  blocks (`breadcrumb`, `calendar`, `list`, `menu`, `modal`, `pagination`, `side-nav-bar`, `table`, `tabs`)
  so every documented member appears in its parent's structure tree.
- e6c0d3b: Add a new `drawer-layout` CSS component with `tray`, `handle`, and `content` members in `@pantoken/components`.

  Extract DrawerLayout command and responsive-overlay wiring into a shared `initResponsiveOverlay()` behavior in `@pantoken/interactions` (named for the interaction it provides, not the component), and wire both the interactions entry point and the web component to import it.

  Update interactions capability metadata so `drawer-layout` is marked as `both` (CSS + JS).

- e6c0d3b: `known-syntax-issues.json` entries can now declare `supplemental` tokens to add to the IR alongside a patched value, for upstream bugs that squash two properties into one bad string (e.g. `--instui-component-text-content-quote-font-weight: "Medium Italic"` now also emits `--instui-component-text-content-quote-font-style: italic`). `@pantoken/utils`' token syntax validator also gains a real `font-style` property mapping. The component CSS/utilities and `base.css` that hand-authored a `500`/`italic` literal fallback for the broken token now reference it directly.
- e6c0d3b: Fix `tray`'s slide-in transform to mirror automatically under an ancestor `[dir="rtl"]`, so the default (start) and `-placement-end` edges open from the correct physical side in right-to-left layouts without extra markup.
- Updated dependencies [e6c0d3b]
- Updated dependencies [e6c0d3b]
- Updated dependencies [e6c0d3b]
  - @pantoken/tokens@0.2.4
  - @pantoken/utils@0.5.0

## 0.7.0

### Minor Changes

- 90ce910: Add auto-collapse to the breadcrumb based on window size using media queries.
- 90ce910: `responsiveUtilitiesCss`/`responsive`: the breakpoint scale now comes from
  `--instui-component-tray-width-*` instead of a hand-typed `sm`/`md`/`lg`/`xl` @ 30/48/64/80rem
  scale — **breaking**: values shift to `xs`/`sm`/`md`/`lg`/`xl` @ 16/20/30/48/62em (a new `xs` tier,
  and every existing tier's threshold moves down one step). Each scale tier now also emits a
  long-form-spelling alias (`x-small`…`x-large`) and a device-name alias
  (`mobile`/`phablet`/`tablet`/`laptop`/`desktop`) alongside the short name — e.g.
  `.instui-hidden-max-lg`, `.instui-hidden-max-large`, and `.instui-hidden-max-laptop` are equivalent.

  Also adds two new, unscaled breakpoint tiers for the main content area's max-width — `content` and
  `content-full-width` — themed (1100px/1580px in `rebrand`, 59.25em in `canvas`/`canvasHighContrast`).

  Adds `-show-max-<bp>`/`-show-min-<bp>` (and their `-cq-show-*` container-query twins) as the inverse
  of `-hidden-max-*`/`-hidden-min-*`: hidden by default (`display: none`), then `revert`ed back to
  their natural display only inside the matching breakpoint range. Same short/long-form/device-name
  alias scheme as the hide classes.

  Long-form and device-name classes (`-hidden-max-small`, `-hidden-max-phablet`, etc.) are now
  documented as `@deprecated` aliases of the short name (`-hidden-max-sm`), matching the codebase's
  existing `-size-small`/`-size-sm` convention. Every `-hidden-max-*`/`-hidden-min-*` class (and its
  `-cq-` container-query twin) is individually documented, the `@media`/`@container` breakpoint
  thresholds describe the boundary itself (not the hide behavior), and the breakpoint scale is now
  also exposed as inspectable `--pantoken-bp-*` `@property` custom properties (informational only —
  they don't affect the compiled thresholds) whose scale-tier values consume the real
  `--instui-component-tray-width-*` tokens.

  `breadcrumb.link`'s trail-collapse breakpoint now uses the `@pantoken/plugin-theme-custom-media`
  `--breakpoint-large-down` alias instead of a hardcoded `max-width: 48rem` (still 48em/`lg`/`large`
  under the new scale, so this specific component's behavior is unchanged).

- 90ce910: Make `view`'s and `text`'s key-value modifiers (background, border, shadow, display, position,
  overflow, cursor, colour, weight, size) available globally, without requiring the `.instui-view`/
  `.instui-text` base class:

  - Every one of these modifiers now also works as a bare, standalone class (`instui-bg-secondary`) and
    as a component-attached alias on any other component (`.instui-button.-bg-danger`) — the same dual
    pattern `spacing`/`gap` already used, generalized via a new shared `GLOBAL_ALIAS_TARGETS`/
    `globalSelectors()` helper.
  - Reuses existing global class words (`bg`, `text`, `border`, `border-radius`, `border-width`,
    `box-shadow`, `display`, `text-align`, `font-weight`) rather than inventing parallel vocabulary; only
    genuinely new concepts get a new utility (`position`, `overflow`, `cursor`, a new `font-size`
    utility, and a global `mask`/`mask-fullscreen`/`mask-blur` copy of the `mask` component's modifiers).
  - `view` and `mask` moved from `utilities/` to `components/` (still exported as `viewCss`/`maskCss`
    from the package root — their own chained modifiers are unchanged) so they can participate in the
    same component-list the dual selectors chain onto.
  - `@pantoken/utils`'s `colorUtilitiesCss`/`tokenUtilitiesCss` gained an optional `chainTargets` option
    for the dual-selector behavior, and `colorUtilitiesCss` now accepts explicit `[name, value]` pairs
    (not just prefix-relative names) so a component's own token family can feed the same class word.
    Also fixes a doc/code mismatch: the text-colour utility's class is now `.instui-text-<name>` (as its
    own doc comment always claimed), not `.instui-fg-<name>`.
  - `cssdoc.jsonc` pins `globalPrecedence: "base"` explicitly, so a component's own modifier always wins
    over a same-named global-utility copy.
  - `responsive`'s viewport/container show-hide classes stay bare-only (not dual-chained) — their
    breakpoint × infix × alias-name surface is already large enough that adding ~70 more chained
    selectors per rule makes the shared alias post-processors unusably slow.

- 90ce910: `breadcrumb` now renders as a semantic `<nav><ol><li class="link">…</li></ol></nav>` trail instead
  of a flat `<nav><span class="link">…</span></nav>` list, matching the WAI-ARIA breadcrumb pattern.
  **Breaking for existing markup**: the flex layout, gap, and font-size that used to live on
  `.pfx-breadcrumb` now live on `.pfx-breadcrumb > ol`, and each crumb must be an `<li>` instead of a
  `<span>`. `breadcrumb.link` and the `link` component now document how to pair `.pfx-breadcrumb` with
  the `responsive` utility's `-hidden-max-md`/`-hidden-min-md` classes and a `.pfx-link` to reproduce
  InstUI's "Breadcrumb becomes a Link under ~768px" behavior in pure CSS.
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

- 90ce910: Update truncate to apply line clamping on the base class and remove the `-lines` modifier contract.

  The `truncate` component now reads `--lines` directly on `.instui-truncate` / `.pfx-truncate` and no longer exposes a separate `-lines` modifier path.

### Patch Changes

- 90ce910: Adopt cssdoc's `@alias` tag for modifiers that are pure renames (no behavior change), reserving
  `@deprecated` for true deprecations from the color/spacing normalization work. `-toggle`,
  `-show-border`, `-has-shadow-false`, `-size-small`, `-type-new-error`, `-should-animate-on-mount`, the
  `--value-now`/`--value-max` custom properties, and the responsive long-form/device-name breakpoint
  classes are now documented as `@alias` instead of `@deprecated`. Avatar's `-color-accent*`, alert's
  `-variant-*`, and progress(-circle)'s `-meter-color-*` remain `@deprecated`. All aliased modifiers keep
  their functional CSS twin; only the generated docs badge changes (blue "Alias" vs. red "Deprecated").
- Updated dependencies [90ce910]
  - @pantoken/utils@0.4.0
  - @pantoken/tokens@0.2.3

## 0.6.0

### Minor Changes

- db834de: `@pantoken/components`: added a `gap` utility (`.instui-gap-<step>`, component-attached like margin/padding) and a fully long, word-spelled spelling for every margin/padding/gap class (`-margin-bottom-small` alongside `-mb-sm`), both component-attached (including `view`). Every component and the `view` utility now document wildcard `@modifier -m*`/`-p*`/`-gap*` families so consumer-side cssdoc lint (`@cssdoc/eslint-plugin`'s `valid-class-usage`) doesn't flag a chained spacing/gap modifier as unknown.

  `@pantoken/utils`: exported the shared spacing scale (`SPACING_STEPS`, `SPACING_AUTO_STEP`) so `@pantoken/components` and `@pantoken/interactions` share one source instead of two hand-maintained copies.

  `@pantoken/interactions`: `resolveSpace`'s keyword table is now built from the shared scale (no behavior change).

### Patch Changes

- Updated dependencies [db834de]
  - @pantoken/utils@0.3.0
  - @pantoken/plugin-transition@0.3.2

## 0.5.1

### Patch Changes

- b2566cc: Republish with internal dependencies resolved to real semver instead of the literal `workspace:*`
  protocol string. Every previously published version of this package shipped with that bug (found by
  `scripts/release/audit-workspace-protocol.ts`), because the release pipeline packed with `npm
pack`/`npm publish`, which doesn't understand pnpm's `workspace:` protocol; it now packs with
  `pnpm pack` first, which resolves it. No functional change beyond the dependency ranges themselves.
- Updated dependencies [b2566cc]
  - @pantoken/plugin-transition@0.3.1
  - @pantoken/utils@0.2.6

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

- 853659c: Add InstUI-compatible timeout dismissal to Alert. Class-based alerts accept a millisecond
  `--timeout`, emit a cancelable `dismiss` event, and remove themselves through the Alert interaction
  bundle, with fades driven by `@pantoken/plugin-transition`. Per-component IIFEs now retain their
  initialization side effects, and the web component shares the same removal behavior directly.
- 853659c: `progress-bar` and `progress-circle` now style a `:indeterminate` state (a native `<progress>` missing its `value` attribute, or fed a bad `--value`) so it reads as loading instead of rendering a broken or empty meter. This isn't part of InstUI — it's a pantoken best guess: `progress-bar` animates `.bar` as a sliding segment, `progress-circle` spins its ring at a fixed arc, and both hide `.value`. `<meter>` has no indeterminate state and is unaffected.
- 853659c: `progress-bar` and `progress-circle` now expose an explicit `-size-md` modifier (with the auto-generated `-size-medium` long-form alias), matching the medium default instead of only being reachable by omitting a size modifier.
- 853659c: Avatar: default border now matches InstUI's `showBorder` behavior — only avatars without an image
  get the ring by default. Add `-show-border-always` and `-show-border-never` modifiers to force the
  border on or off; `-show-border` is now a deprecated alias of `-show-border-always`.
- 853659c: `progress-bar` now nests `.value` as a sibling of `.bar` inside the root, replacing the flat `.pfx-progress-value` class — matching how `progress-circle` nests its own `.value` part. Add the new `-render-value-inside` modifier to center `.value` over the track instead of beside it, mirroring InstUI's `ProgressBar` `renderValueInside` prop.

### Patch Changes

- Updated dependencies [853659c]
  - @pantoken/plugin-transition@0.3.0

## 0.4.1

### Patch Changes

- d4ba8fe: Increase timeout headroom for heavy integration tests to reduce timeout flakes in parallel and slower CI runs.

## 0.4.0

### Minor Changes

- 47f3275: abstract component interactions into shared package
- 47f3275: Add component-attached spacing helper aliases so utilities like `.instui-mb-sm` can also be used as `-mb-sm` modifiers on any InstUI component class.

  Also add the `none` spacing step alias that maps to the shared `space-none` token (same value as `0`).

### Patch Changes

- 47f3275: Document the wildcard `-icon-*` modifier on the icon utility so cssdoc and IDE checkers can reference it properly.
- 47f3275: add toggle example to checkbox documentation

## 0.3.0

### Minor Changes

- 7879f6b: support exporting individual icons

## 0.2.9

### Patch Changes

- 658021f: Generated stylesheets (`base.css`, `components.css`, `prose.css`, `select.css`) now pass through `applyMinify({ flatten: true })` during the generate step, consistent with the cross-pipeline flattening approach. No behavioral change — component CSS does not contain `@property` blocks.

## 0.2.8

### Patch Changes

- f97aeb6: **`@pantoken/plugin-logos`** — adds a `current-color` color mode. Six new source SVGs (one per brand: canvas, igniteai, instructure ×2, learnplatform, mastery, parchment) use `currentColor` so the logo adapts to the surrounding text color via CSS. The generate script now recognises `current-color` as a valid mode; new tokens follow the `--instui-logo-<product>-<layout>-current-color` naming convention.

  **`@pantoken/pendo`** — CSS architecture cleanup and token aliases:

  - File structure renamed: `manual.css` → `vars.css`, `view.css` → `chrome.css`; `video.css`, `img.css`, and `mask.css` merged into `chrome.css`. The `"icons"` cascade layer is removed; `"vars"` and `"chrome"` replace `"manual"`, `"view"`, `"mask"`, and `"img"` in `LAYER_ORDER`.
  - New `--pendo-*` aliases in `vars.css`: `--pendo-space-0`, `--pendo-alert-indent`, `--pendo-embedded-width`, `--pendo-overlay-width`, `--pendo-input-border-style` (workaround for missing upstream border-style token). All 38 `--instui-component-shared-tokens-spacing-general-space-none` references replaced with `--pendo-space-0`.
  - Focus-outline delegation extended: `select._pendo-multi-choice-poll-select`, `._pendo-open-text-poll-input`, and `input.pendo-radio` added to `FOCUSABLES`; verbose 5-declaration `:focus` outline blocks removed from `select.css`, `textarea.css`, and `radio-group.css`; only component-specific `background`/`border-color` resets and radio sibling suppression remain.
  - Radio-group token overrides resolved: `width`/`height` corrected from `--instui-component-shared-tokens-spacing-general-space-lg` to `--instui-component-radio-input-control-size-sm`; checked-inset `/ 2` compensation removed; `@TODO` comments cleared.
  - `@layer` order declaration moved inside `@scope` (was previously hoisted outside by `addScope`, making it dead code); `addScope` now only hoists `@property` at-rules.

  **`@pantoken/components`** — adds `/* fallow-ignore-next-line css-duplicate-block */` comments to structurally required duplicate declaration blocks: the visually-hidden clip pattern in `alert.css`, `form-field-messages.css`, and `screen-reader-content.css`; vendor pseudo-element pairs in `range-input.css`.

## 0.2.7

### Patch Changes

- 2b814bd: Restore elevation and focus-outline foundation variables in the docs site's custom multi-theme token sheet.

## 0.2.6

### Patch Changes

- Updated dependencies [8391068]
  - @pantoken/utils@0.2.5

## 0.2.5

### Patch Changes

- 0306bf4: Add explicit type annotations required by `isolatedDeclarations`; no API changes.
- Updated dependencies [0306bf4]
  - @pantoken/utils@0.2.4

## 0.2.4

### Patch Changes

- Updated dependencies [2e5bb88]
  - @pantoken/utils@0.2.3

## 0.2.3

### Patch Changes

- 424f57a: Internal code-quality baseline: dead-code removal, behavior-preserving refactors of oversized/complex functions, TSDoc coverage on exported symbols, and expanded test coverage to the new 85% floor. No API or behavior changes.

## 0.2.2

### Patch Changes

- @pantoken/utils@0.2.2

## 0.2.1

### Patch Changes

- 3d2f6db: # Enrich npm package metadata

  Every published package now carries `homepage`, `bugs`, `repository.directory`, `sideEffects`,
  `engines`, and `publishConfig.provenance`. npmjs.com pages link back to the docs site, the issue
  tracker, and the exact monorepo folder; `sideEffects` lets bundlers tree-shake the pure packages
  while preserving the stylesheets in the CSS-shipping ones.

- Updated dependencies [3d2f6db]
  - @pantoken/plugin-colors@0.1.1
  - @pantoken/utils@0.2.1

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
  - @pantoken/utils@0.2.0

## 0.1.1

### Changed

- Updated internal workspace dependency versions.

## 0.1.0

### Added

- Initial release of @pantoken/components.
