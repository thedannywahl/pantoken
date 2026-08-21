# @pantoken/plugin-custom-components

## 0.2.3

### Patch Changes

- @pantoken/plugin-kit@0.2.4

## 0.2.2

### Patch Changes

- @pantoken/plugin-kit@0.2.3

## 0.2.1

### Patch Changes

- b2566cc: Republish with internal dependencies resolved to real semver instead of the literal `workspace:*`
  protocol string. Every previously published version of this package shipped with that bug (found by
  `scripts/release/audit-workspace-protocol.ts`), because the release pipeline packed with `npm
pack`/`npm publish`, which doesn't understand pnpm's `workspace:` protocol; it now packs with
  `pnpm pack` first, which resolves it. No functional change beyond the dependency ranges themselves.
- Updated dependencies [b2566cc]
  - @pantoken/plugin-kit@0.2.2

## 0.2.0

### Minor Changes

- 853659c: Expose per-item CSS as individual package exports. `@pantoken/plugin-logos` now ships a `<product>.css` sheet per product (canvas, igniteai, instructure, learnplatform, mastery, parchment) and a `<name>.css` sheet per individual logo variant, alongside the existing combined `logos.css`. `@pantoken/plugin-custom-components` now exposes its existing per-component sheets (`card.css`, `agent-shell.css`) as real package exports via a `./*.css` wildcard, matching `@pantoken/components`' pattern.

## 0.1.1

### Patch Changes

- d4ba8fe: Add custom components and layouts plugin packages, wire them into docs CSS API generation and watch tasks, and align lint/tooling config for the new cssdoc-style sources.
- d4ba8fe: Add package README files for the custom-components and layouts plugins.
