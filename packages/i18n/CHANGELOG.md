# @pantoken/i18n

## 0.1.10

### Patch Changes

- @pantoken/web-components@0.5.3

## 0.1.9

### Patch Changes

- @pantoken/web-components@0.5.2

## 0.1.8

### Patch Changes

- b2566cc: Republish with internal dependencies resolved to real semver instead of the literal `workspace:*`
  protocol string. Every previously published version of this package shipped with that bug (found by
  `scripts/release/audit-workspace-protocol.ts`), because the release pipeline packed with `npm
pack`/`npm publish`, which doesn't understand pnpm's `workspace:` protocol; it now packs with
  `pnpm pack` first, which resolves it. No functional change beyond the dependency ranges themselves.
- Updated dependencies [b2566cc]
  - @pantoken/web-components@0.5.1

## 0.1.7

### Patch Changes

- Updated dependencies [853659c]
- Updated dependencies [853659c]
  - @pantoken/web-components@0.5.0

## 0.1.6

### Patch Changes

- @pantoken/web-components@0.4.2

## 0.1.5

### Patch Changes

- Updated dependencies [47f3275]
- Updated dependencies [47f3275]
  - @pantoken/web-components@0.4.1

## 0.1.4

### Patch Changes

- Updated dependencies [ebe77e5]
  - @pantoken/web-components@0.4.0

## 0.1.3

### Patch Changes

- @pantoken/web-components@0.3.2

## 0.1.2

### Patch Changes

- Updated dependencies [03a9dc1]
  - @pantoken/web-components@0.3.1

## 0.1.1

### Patch Changes

- e1f356b: update package description

## 0.1.0

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

### Patch Changes

- Updated dependencies [40987c4]
  - @pantoken/web-components@0.3.0
