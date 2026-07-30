# CHANGELOG

## 0.1.4

### Patch Changes

- 8391068: Add `sanitizeSvg` to `@pantoken/utils`: a zero-dependency regex-based helper
  that strips `<script>` elements and `on*` event-handler attributes from SVG
  markup. Applied at decode time in `@pantoken/icons` so every icon in the
  `icons` array and `iconsByName` map has script injection removed before
  exposure to consumers. Defense-in-depth for the vendored IR; does not change
  clean SVG content.
- Updated dependencies [8391068]
- Updated dependencies [8391068]
  - @pantoken/model@0.3.0
  - @pantoken/utils@0.2.5
  - @pantoken/tokens@0.2.2

## 0.1.3

### Patch Changes

- Updated dependencies [424f57a]
  - @pantoken/tokens@0.2.1

## 0.1.2

### Patch Changes

- Updated dependencies [e099a51]
  - @pantoken/tokens@0.2.0
  - @pantoken/model@0.2.0

## 0.1.1

### Patch Changes

- 3d2f6db: # Enrich npm package metadata

  Every published package now carries `homepage`, `bugs`, `repository.directory`, `sideEffects`,
  `engines`, and `publishConfig.provenance`. npmjs.com pages link back to the docs site, the issue
  tracker, and the exact monorepo folder; `sideEffects` lets bundlers tree-shake the pure packages
  while preserving the stylesheets in the CSS-shipping ones.

- Updated dependencies [3d2f6db]
  - @pantoken/model@0.1.1
  - @pantoken/tokens@0.1.1

## 0.1.0

### Added

- Initial release of @pantoken/icons.
