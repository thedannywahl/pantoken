# @pantoken/plugin-custom-icons

## 0.3.6

### Patch Changes

- 8aa88bb: Migrate published `dependencies`/`peerDependencies` to `pnpm-workspace.yaml` `catalog:` references. No
  behavior change — the resolved versions are unchanged, but the `package.json` a consumer installs now
  points at the shared catalog entry instead of an inline semver range, so the range is no longer visible
  at a glance without cross-referencing `pnpm-workspace.yaml`.
- Updated dependencies [8aa88bb]
  - @pantoken/model@0.3.1
  - @pantoken/plugin-kit@0.2.7

## 0.3.5

### Patch Changes

- @pantoken/plugin-kit@0.2.6

## 0.3.4

### Patch Changes

- @pantoken/plugin-kit@0.2.5

## 0.3.3

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

- 81f317e: Add the Conveyor, Responsive, and Vanilla Forums logo marks as the `conveyor`, `responsive`, and
  `vanilla-forums` current-color custom icons.

## 0.2.0

### Minor Changes

- 853659c: New `@pantoken/plugin-custom-icons` plugin: vendored custom icon glyphs (starting with `highspot`)
  as `--instui-icon-<name>` image tokens, reusing the InstUI icon set's `.-icon-<name>` painter class
  with no `custom-` prefix — the built-in InstUI icon wins on a name collision. The CDN picker's Icons
  tab gains a "Custom icons" section, listed below Simple Icons.
