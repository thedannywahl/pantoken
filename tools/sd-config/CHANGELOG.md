# CHANGELOG

## 0.1.5

### Patch Changes

- 14c883b: Publish `@pantoken/sd-config` publicly. It was previously marked private even though
  `@pantoken/flutter`, `@pantoken/android`, `@pantoken/compose`, and `@pantoken/swift` all depend on it
  at runtime, so installing any of them (including via the `@pantoken/pantoken` meta package) failed
  with a 404 resolving `@pantoken/sd-config` from the npm registry.

## 0.1.4

### Patch Changes

- Updated dependencies [8aa88bb]
  - @pantoken/model@0.3.1

## 0.1.3

### Patch Changes

- Updated dependencies [8391068]
  - @pantoken/model@0.3.0

## 0.1.2

### Patch Changes

- Updated dependencies [e099a51]
  - @pantoken/model@0.2.0

## 0.1.1

### Patch Changes

- Updated dependencies [3d2f6db]
  - @pantoken/model@0.1.1

## 0.1.0

### Added

- Initial release of @pantoken/sd-config.
