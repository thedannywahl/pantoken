# @pantoken/interactions

## 0.6.0

### Minor Changes

- af2a649: Add opt-in native form-field validation through `initFormField` and a production IIFE. Associate
  authored errors after interaction, preserve hints, synchronize invalid state and reset behavior,
  and restore state on cleanup. Keep application-owned validation unchanged unless opted in.
  Update examples and consumer guidance, respect hidden errors, and correct the documented
  tree-browser IIFE import path.
- af2a649: Add opt-in ARIA menu keyboard navigation through `initMenu` and the production menu IIFE.
  Wire native popover focus, wrapping arrows, Home/End, initial-character search, Escape, activation,
  disabled items, and cleanup without taking ownership of application actions or checked state.
  Update authored menu examples, capability discovery, and consumer guidance.
- af2a649: Support custom class prefixes. The auto-init bundles resolve their selectors against `data-prefix` on the script tag (or `window.PANTOKEN_PREFIX`), defaulting to `instui`. `initCloseButton` and `initRemove` accept a `prefix` option, and `withPrefix`/`ns` are exported.
- af2a649: Align tree-browser with InstUI's ARIA-tree keyboard contract through a shared Node-free behavior,
  production IIFE, and web-component lifecycle. Correct examples to use named, focusable treeitems
  and owned groups, preserve native disclosure styling, and synchronize consumer agent guidance.

### Patch Changes

- af2a649: Respect reduced motion automatically throughout component transitions, decorative animations, focus rings, and shared interactions. Keep static loading feedback visible, skip smooth scrolling and fade removal waits, and release progress-circle mount states when the preference changes.
- af2a649: Build workspace dependencies before bundling interactions so docs development doesn't fail when the utils build output is missing.
- af2a649: Make initialized tooltip visibility follow the shared interaction behavior so Escape dismissal and
  delays work for CSS and web components. Preserve the CSS-only hover/focus fallback, keep bubbles
  reachable across their visual gap, and retain visibility while either pointer or focus remains.
  Dismissed tooltips reopen only after both leave and a new interaction begins. Update the tooltip
  guide and localized demo triggers.
- af2a649: Activate CSS modals through native dialog methods so command-driven opening enters the top layer,
  moves focus, and supports Escape dismissal and native focus return. Synchronize initial and
  external open attributes, close dialogs whose open attribute was removed, and keep queued close
  events from clearing a newer open state. Preserve the web-component host protocol.
- af2a649: Treat enhanced tooltip placements as preferences: flip to a side that fits when needed, clamp
  the bubble into view, and wrap text to the viewport width. Keep pointer bridges aligned with the
  effective side, including diagonal pointer travel after clamping. Reposition on resize, scrolling,
  content, and direction changes, and restore authored positioning when the behavior is cleaned up.
- Updated dependencies [af2a649]
- Updated dependencies [af2a649]
- Updated dependencies [af2a649]
  - @pantoken/utils@1.4.2

## 0.5.3

### Patch Changes

- @pantoken/utils@1.4.1

## 0.5.2

### Patch Changes

- 8ef5ec9: Make close buttons dismiss their nearest Alert or Banner using the shared cancelable dismissal and fade-out behavior, without requiring extra targeting attributes. Preserve dialog, popover, and explicit-target handling.
- Updated dependencies [8ef5ec9]
  - @pantoken/utils@1.4.0

## 0.5.1

### Patch Changes

- Updated dependencies [c91395a]
  - @pantoken/utils@1.3.0

## 0.5.0

### Minor Changes

- 962c640: Add a token-backed segmented control with three sizes, native single-selection semantics, and optional bidirectional overflow navigation. The selected segment and scroll buttons use the existing resting elevation until their design shadow values are confirmed.
- 962c640: Add token-backed SkeletonLoader styles with a finite, reduced-motion-aware shimmer and reusable parent-region loading announcements. Document the state-event input boundary.

### Patch Changes

- 962c640: Publish schemas for component capabilities and add schema references to the VS Code custom-data payloads.
- Updated dependencies [962c640]
  - @pantoken/utils@1.2.1

## 0.4.1

### Patch Changes

- 626ffc1: Add an extra-small breakpoint to the custom-components stylesheet, use it for the canvas-theme-editor phone preview, and show the active preview width in an in-place editor that accepts custom pixel values. Add an optional input-type hint to the in-place-edit interaction while leaving value validation to consumers.
- Updated dependencies [626ffc1]
  - @pantoken/utils@1.2.0

## 0.4.0

### Minor Changes

- f475012: Add shared tab selection and keyboard interaction, including the `<instui-tabs>` web component.

### Patch Changes

- f475012: Upgrade the vendored Instructure UI sources to 11.7.7. Add the canonical `ai-spinner` icon and AI Spinner variants, including `variant="ai"` and `variant="ai-on-color"` on the web component. Mark Spinner as requiring icon CSS in the CDN capability manifest.
- Updated dependencies [f475012]
  - @pantoken/utils@1.1.0

## 0.3.9

### Patch Changes

- @pantoken/utils@1.0.3

## 0.3.8

### Patch Changes

- a1c0d58: add exports to the un-prefixed pantoken package.

## 0.3.7

### Patch Changes

- 7d964ee: Regenerate component capabilities manifest to mark `number-input` as requiring icons (`needsIcons: true`).
- Updated dependencies [7d964ee]
  - @pantoken/utils@1.0.2

## 0.3.6

### Patch Changes

- 8aa88bb: Migrate published `dependencies`/`peerDependencies` to `pnpm-workspace.yaml` `catalog:` references. No
  behavior change — the resolved versions are unchanged, but the `package.json` a consumer installs now
  points at the shared catalog entry instead of an inline semver range, so the range is no longer visible
  at a glance without cross-referencing `pnpm-workspace.yaml`.
- Updated dependencies [8aa88bb]
- Updated dependencies [8aa88bb]
  - @pantoken/utils@1.0.1

## 0.3.5

### Patch Changes

- 343c59d: Stop shipping a dedicated `drawer-layout` interaction bundle: the entry point now only applies spacing and uses shared invoker syncing, and `component-capabilities.json` marks `drawer-layout` as `css-only` instead of `both`.

## 0.3.4

### Patch Changes

- Updated dependencies [aaf4751]
- Updated dependencies [aaf4751]
  - @pantoken/utils@1.0.0

## 0.3.3

### Patch Changes

- e6c0d3b: Add a new `drawer-layout` CSS component with `tray`, `handle`, and `content` members in `@pantoken/components`.

  Extract DrawerLayout command and responsive-overlay wiring into a shared `initResponsiveOverlay()` behavior in `@pantoken/interactions` (named for the interaction it provides, not the component), and wire both the interactions entry point and the web component to import it.

  Update interactions capability metadata so `drawer-layout` is marked as `both` (CSS + JS).

- Updated dependencies [e6c0d3b]
- Updated dependencies [e6c0d3b]
  - @pantoken/utils@0.5.0

## 0.3.2

### Patch Changes

- 90ce910: Regenerate `component-capabilities.json` after the `@pantoken/components` per-record directory migration (no behavioral change).
- Updated dependencies [90ce910]
  - @pantoken/utils@0.4.0

## 0.3.1

### Patch Changes

- db834de: `@pantoken/components`: added a `gap` utility (`.instui-gap-<step>`, component-attached like margin/padding) and a fully long, word-spelled spelling for every margin/padding/gap class (`-margin-bottom-small` alongside `-mb-sm`), both component-attached (including `view`). Every component and the `view` utility now document wildcard `@modifier -m*`/`-p*`/`-gap*` families so consumer-side cssdoc lint (`@cssdoc/eslint-plugin`'s `valid-class-usage`) doesn't flag a chained spacing/gap modifier as unknown.

  `@pantoken/utils`: exported the shared spacing scale (`SPACING_STEPS`, `SPACING_AUTO_STEP`) so `@pantoken/components` and `@pantoken/interactions` share one source instead of two hand-maintained copies.

  `@pantoken/interactions`: `resolveSpace`'s keyword table is now built from the shared scale (no behavior change).

- Updated dependencies [db834de]
  - @pantoken/utils@0.3.0

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

- 853659c: Add InstUI-compatible timeout dismissal to Alert. Class-based alerts accept a millisecond
  `--timeout`, emit a cancelable `dismiss` event, and remove themselves through the Alert interaction
  bundle, with fades driven by `@pantoken/plugin-transition`. Per-component IIFEs now retain their
  initialization side effects, and the web component shares the same removal behavior directly.

## 0.2.0

### Minor Changes

- 47f3275: abstract component interactions into shared package
- 47f3275: Extract shared spacing and Invoker Commands helpers from `@pantoken/web-components` into a new `@pantoken/interactions` package.

  `@pantoken/web-components` now consumes these helpers from `@pantoken/interactions` with no behavioral change.

### Patch Changes

- 47f3275: Add prepare script to generate component-capabilities.json before publish
