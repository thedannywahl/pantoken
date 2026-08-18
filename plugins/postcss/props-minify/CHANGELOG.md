# CHANGELOG

## 0.1.2

### Patch Changes

- b2566cc: Republish with internal dependencies resolved to real semver instead of the literal `workspace:*`
  protocol string. Every previously published version of this package shipped with that bug (found by
  `scripts/release/audit-workspace-protocol.ts`), because the release pipeline packed with `npm
pack`/`npm publish`, which doesn't understand pnpm's `workspace:` protocol; it now packs with
  `pnpm pack` first, which resolves it. No functional change beyond the dependency ranges themselves.

## 0.1.1

### Patch Changes

- 658021f: Initial release. Composed custom-property minification utility — re-exports `pruneCustomProps`, `flattenProperty`, and `mangleCustomProps`, defines shared `PropsMinifyOptions`, and exposes `applyMinify(css, opts)` as the single entry point for all pantoken CSS pipelines.
- Updated dependencies [658021f]
- Updated dependencies [658021f]
  - @pantoken/plugin-flatten-property@0.1.1
  - @pantoken/plugin-mangle-custom-props@0.1.1
