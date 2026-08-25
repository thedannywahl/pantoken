# @pantoken/plugin-layouts

## 0.2.0

### Minor Changes

- 8aa88bb: Publish `./model.json` — a cssdoc `CssDocEntry[]` provider model for the documented `card`/`agent-shell`
  (custom-components) and `wrapper` (layouts) records, built from the unminified generated CSS (the
  published `.css` exports are minified and strip doc comments, so they can't be used as raw-CSS
  providers). Downstream consumers can now wire these packages into their own `cssdoc.json` `providers`
  array, the same way `@pantoken/pantoken/model.json` already works for `@pantoken/components`.

### Patch Changes

- 8aa88bb: Fix cssdoc consumer-side lint incorrectly flagging `@global` utility modifiers (e.g. `--p-lg`,
  `--mt-2xl`, `--mx-none` from the spacing/gap/layout/etc. utilities) as `unknown-modifier` when chained
  onto a component outside `@pantoken/components`' own scope. The utilities are authored in `.ts`, so
  their doc comments only ever existed in the unminified `generated/utilities.css` — which no
  `cssdoc.jsonc` referenced as a `providers` entry. Wired it into the root config and the `layouts`/
  `custom-components` configs alongside the existing `_records.css` entry. Also removed
  `modifierConvention`/`inlineComments` re-declarations in `layouts`/`custom-components` that were
  already inherited from the root config.
- Updated dependencies [8aa88bb]
  - @pantoken/model@0.3.1
  - @pantoken/plugin-kit@0.2.7

## 0.1.6

### Patch Changes

- @pantoken/plugin-kit@0.2.6

## 0.1.5

### Patch Changes

- @pantoken/plugin-kit@0.2.5

## 0.1.4

### Patch Changes

- @pantoken/plugin-kit@0.2.4

## 0.1.3

### Patch Changes

- @pantoken/plugin-kit@0.2.3

## 0.1.2

### Patch Changes

- b2566cc: Republish with internal dependencies resolved to real semver instead of the literal `workspace:*`
  protocol string. Every previously published version of this package shipped with that bug (found by
  `scripts/release/audit-workspace-protocol.ts`), because the release pipeline packed with `npm
pack`/`npm publish`, which doesn't understand pnpm's `workspace:` protocol; it now packs with
  `pnpm pack` first, which resolves it. No functional change beyond the dependency ranges themselves.
- Updated dependencies [b2566cc]
  - @pantoken/plugin-kit@0.2.2

## 0.1.1

### Patch Changes

- d4ba8fe: Add custom components and layouts plugin packages, wire them into docs CSS API generation and watch tasks, and align lint/tooling config for the new cssdoc-style sources.
- d4ba8fe: Add package README files for the custom-components and layouts plugins.
