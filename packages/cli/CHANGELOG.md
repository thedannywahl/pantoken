# CHANGELOG

## 0.1.21

### Patch Changes

- @pantoken/drupal@0.1.19
- @pantoken/hugo@0.1.19
- @pantoken/jekyll@0.1.19
- @pantoken/pendo@0.3.8
- @pantoken/swatches@0.1.10
- @pantoken/rust@0.1.12
- @pantoken/vanilla@0.1.9
- @pantoken/wordpress@0.1.9
- @pantoken/mintlify@0.1.10
- @pantoken/icon-font@0.1.13
- @pantoken/tokens@0.2.3
- @pantoken/android@0.1.13
- @pantoken/compose@0.1.13
- @pantoken/flutter@0.1.13
- @pantoken/swift@0.1.13

## 0.1.20

### Patch Changes

- @pantoken/swatches@0.1.9
- @pantoken/rust@0.1.11
- @pantoken/vanilla@0.1.8
- @pantoken/wordpress@0.1.8
- @pantoken/mintlify@0.1.9
- @pantoken/pendo@0.3.7
- @pantoken/drupal@0.1.18
- @pantoken/hugo@0.1.18
- @pantoken/jekyll@0.1.18
- @pantoken/icon-font@0.1.12
- @pantoken/tokens@0.2.3
- @pantoken/android@0.1.12
- @pantoken/compose@0.1.12
- @pantoken/flutter@0.1.12
- @pantoken/swift@0.1.12

## 0.1.19

### Patch Changes

- b2566cc: Republish with internal dependencies resolved to real semver instead of the literal `workspace:*`
  protocol string. Every previously published version of this package shipped with that bug (found by
  `scripts/release/audit-workspace-protocol.ts`), because the release pipeline packed with `npm
pack`/`npm publish`, which doesn't understand pnpm's `workspace:` protocol; it now packs with
  `pnpm pack` first, which resolves it. No functional change beyond the dependency ranges themselves.
- Updated dependencies [b2566cc]
  - @pantoken/android@0.1.11
  - @pantoken/compose@0.1.11
  - @pantoken/drupal@0.1.17
  - @pantoken/flutter@0.1.11
  - @pantoken/hugo@0.1.17
  - @pantoken/icon-font@0.1.11
  - @pantoken/jekyll@0.1.17
  - @pantoken/mintlify@0.1.8
  - @pantoken/pendo@0.3.6
  - @pantoken/rust@0.1.10
  - @pantoken/swatches@0.1.8
  - @pantoken/swift@0.1.11
  - @pantoken/tokens@0.2.3
  - @pantoken/vanilla@0.1.7
  - @pantoken/wordpress@0.1.7

## 0.1.18

### Patch Changes

- @pantoken/drupal@0.1.16
- @pantoken/hugo@0.1.16
- @pantoken/jekyll@0.1.16
- @pantoken/pendo@0.3.5

## 0.1.17

### Patch Changes

- d4ba8fe: Increase timeout headroom for heavy integration tests to reduce timeout flakes in parallel and slower CI runs.
  - @pantoken/drupal@0.1.15
  - @pantoken/hugo@0.1.15
  - @pantoken/jekyll@0.1.15
  - @pantoken/pendo@0.3.4

## 0.1.16

### Patch Changes

- @pantoken/drupal@0.1.14
- @pantoken/hugo@0.1.14
- @pantoken/jekyll@0.1.14
- @pantoken/pendo@0.3.3

## 0.1.15

### Patch Changes

- @pantoken/drupal@0.1.13
- @pantoken/hugo@0.1.13
- @pantoken/jekyll@0.1.13
- @pantoken/pendo@0.3.2

## 0.1.14

### Patch Changes

- @pantoken/drupal@0.1.12
- @pantoken/hugo@0.1.12
- @pantoken/jekyll@0.1.12
- @pantoken/pendo@0.3.1

## 0.1.13

### Patch Changes

- Updated dependencies [658021f]
  - @pantoken/pendo@0.3.0
  - @pantoken/drupal@0.1.11
  - @pantoken/hugo@0.1.11
  - @pantoken/jekyll@0.1.11

## 0.1.12

### Patch Changes

- f97aeb6: Ensure this branch has explicit changeset coverage for every touched package.

  No API changes are introduced for these packages in this commit; this records branch-level package touch coverage per release policy.

- Updated dependencies [f97aeb6]
- Updated dependencies [f97aeb6]
  - @pantoken/icon-font@0.1.10
  - @pantoken/pendo@0.2.0
  - @pantoken/tokens@0.2.2
  - @pantoken/android@0.1.10
  - @pantoken/compose@0.1.10
  - @pantoken/flutter@0.1.10
  - @pantoken/rust@0.1.9
  - @pantoken/swift@0.1.10
  - @pantoken/drupal@0.1.10
  - @pantoken/hugo@0.1.10
  - @pantoken/jekyll@0.1.10

## 0.1.11

### Patch Changes

- Updated dependencies [2f21a66]
  - @pantoken/icon-font@0.1.9
  - @pantoken/pendo@0.1.10

## 0.1.10

### Patch Changes

- @pantoken/drupal@0.1.9
- @pantoken/hugo@0.1.9
- @pantoken/jekyll@0.1.9
- @pantoken/pendo@0.1.9
- @pantoken/icon-font@0.1.8
- @pantoken/tokens@0.2.2
- @pantoken/android@0.1.9
- @pantoken/compose@0.1.9
- @pantoken/flutter@0.1.9
- @pantoken/rust@0.1.8
- @pantoken/swift@0.1.9

## 0.1.9

### Patch Changes

- 8391068: Validate all restricted CLI inputs at parse time. `--theme` is checked against
  the `rebrand | canvas | canvasHighContrast` allowlist; `--class` must be a valid
  identifier; `--format` for the `rust` target must be `egui` or `iced`; unknown
  flags are rejected immediately. Passing an invalid value now throws a descriptive
  error instead of silently falling back to a default. Warns when the output path
  escapes the current working directory.
- Updated dependencies [8391068]
  - @pantoken/model@0.3.0
  - @pantoken/swatches@0.1.7
  - @pantoken/icon-font@0.1.7
  - @pantoken/tokens@0.2.2
  - @pantoken/android@0.1.8
  - @pantoken/compose@0.1.8
  - @pantoken/flutter@0.1.8
  - @pantoken/rust@0.1.7
  - @pantoken/swift@0.1.8
  - @pantoken/vanilla@0.1.6
  - @pantoken/wordpress@0.1.6
  - @pantoken/mintlify@0.1.7
  - @pantoken/pendo@0.1.8
  - @pantoken/drupal@0.1.8
  - @pantoken/hugo@0.1.8
  - @pantoken/jekyll@0.1.8

## 0.1.8

### Patch Changes

- Updated dependencies [0306bf4]
  - @pantoken/mintlify@0.1.6
  - @pantoken/swatches@0.1.6
  - @pantoken/drupal@0.1.7
  - @pantoken/hugo@0.1.7
  - @pantoken/jekyll@0.1.7
  - @pantoken/pendo@0.1.7
  - @pantoken/rust@0.1.6
  - @pantoken/vanilla@0.1.5
  - @pantoken/wordpress@0.1.5
  - @pantoken/icon-font@0.1.6
  - @pantoken/tokens@0.2.1
  - @pantoken/android@0.1.7
  - @pantoken/compose@0.1.7
  - @pantoken/flutter@0.1.7
  - @pantoken/swift@0.1.7

## 0.1.7

### Patch Changes

- Updated dependencies [2e5bb88]
  - @pantoken/drupal@0.1.6
  - @pantoken/icon-font@0.1.5
  - @pantoken/tokens@0.2.1
  - @pantoken/android@0.1.6
  - @pantoken/compose@0.1.6
  - @pantoken/flutter@0.1.6
  - @pantoken/rust@0.1.5
  - @pantoken/swift@0.1.6
  - @pantoken/swatches@0.1.5
  - @pantoken/vanilla@0.1.4
  - @pantoken/wordpress@0.1.4
  - @pantoken/mintlify@0.1.5
  - @pantoken/pendo@0.1.6
  - @pantoken/hugo@0.1.6
  - @pantoken/jekyll@0.1.6

## 0.1.6

### Patch Changes

- 424f57a: Normalize SVG arcs (`unarc`) before outlining stroked glyphs, so paths with packed arc flags no longer break the outline step and the icon font builds correctly end to end.
- Updated dependencies [424f57a]
- Updated dependencies [424f57a]
- Updated dependencies [424f57a]
  - @pantoken/icon-font@0.1.4
  - @pantoken/pendo@0.1.5
  - @pantoken/tokens@0.2.1
  - @pantoken/drupal@0.1.5
  - @pantoken/hugo@0.1.5
  - @pantoken/jekyll@0.1.5
  - @pantoken/android@0.1.5
  - @pantoken/compose@0.1.5
  - @pantoken/flutter@0.1.5
  - @pantoken/rust@0.1.4
  - @pantoken/swift@0.1.5
  - @pantoken/swatches@0.1.4
  - @pantoken/vanilla@0.1.3
  - @pantoken/wordpress@0.1.3
  - @pantoken/mintlify@0.1.4

## 0.1.5

### Patch Changes

- Updated dependencies [e099a51]
  - @pantoken/tokens@0.2.0
  - @pantoken/model@0.2.0
  - @pantoken/swatches@0.1.3
  - @pantoken/icon-font@0.1.3
  - @pantoken/android@0.1.4
  - @pantoken/compose@0.1.4
  - @pantoken/flutter@0.1.4
  - @pantoken/rust@0.1.3
  - @pantoken/swift@0.1.4
  - @pantoken/vanilla@0.1.3
  - @pantoken/wordpress@0.1.3
  - @pantoken/mintlify@0.1.3
  - @pantoken/pendo@0.1.4
  - @pantoken/drupal@0.1.4
  - @pantoken/hugo@0.1.4
  - @pantoken/jekyll@0.1.4

## 0.1.4

### Patch Changes

- 3d2f6db: # Enrich npm package metadata

  Every published package now carries `homepage`, `bugs`, `repository.directory`, `sideEffects`,
  `engines`, and `publishConfig.provenance`. npmjs.com pages link back to the docs site, the issue
  tracker, and the exact monorepo folder; `sideEffects` lets bundlers tree-shake the pure packages
  while preserving the stylesheets in the CSS-shipping ones.

- Updated dependencies [3d2f6db]
  - @pantoken/android@0.1.3
  - @pantoken/compose@0.1.3
  - @pantoken/drupal@0.1.3
  - @pantoken/flutter@0.1.3
  - @pantoken/hugo@0.1.3
  - @pantoken/icon-font@0.1.2
  - @pantoken/jekyll@0.1.3
  - @pantoken/mintlify@0.1.2
  - @pantoken/model@0.1.1
  - @pantoken/pendo@0.1.3
  - @pantoken/rust@0.1.2
  - @pantoken/swatches@0.1.2
  - @pantoken/swift@0.1.3
  - @pantoken/tokens@0.1.1
  - @pantoken/vanilla@0.1.2
  - @pantoken/wordpress@0.1.2

## 0.1.3

### Patch Changes

- @pantoken/swatches@0.1.1
- @pantoken/rust@0.1.1
- @pantoken/vanilla@0.1.1
- @pantoken/wordpress@0.1.1
- @pantoken/mintlify@0.1.1
- @pantoken/pendo@0.1.2
- @pantoken/drupal@0.1.2
- @pantoken/hugo@0.1.2
- @pantoken/jekyll@0.1.2
- @pantoken/icon-font@0.1.1
- @pantoken/tokens@0.1.0
- @pantoken/android@0.1.2
- @pantoken/compose@0.1.2
- @pantoken/flutter@0.1.2
- @pantoken/swift@0.1.2

## 0.1.2

### Changed

- Updated internal workspace dependencies:
  - @pantoken/drupal: 0.1.0 -> 0.1.1
  - @pantoken/hugo: 0.1.0 -> 0.1.1
  - @pantoken/jekyll: 0.1.0 -> 0.1.1
  - @pantoken/pendo: 0.1.0 -> 0.1.1

## 0.1.1

### Changed

- Updated internal workspace dependency versions.

## 0.1.0

### Added

- Initial release of @pantoken/cli.
