# CHANGELOG

## 0.1.2

### Patch Changes

- 8aa88bb: Migrate published `dependencies`/`peerDependencies` to `pnpm-workspace.yaml` `catalog:` references. No
  behavior change — the resolved versions are unchanged, but the `package.json` a consumer installs now
  points at the shared catalog entry instead of an inline semver range, so the range is no longer visible
  at a glance without cross-referencing `pnpm-workspace.yaml`.

## 0.1.1

### Patch Changes

- 658021f: Initial release. PostCSS plugin that converts `@property` at-rules to plain custom-property declarations, with configurable `injectSelector` and `onMissingInitialValue` options.
