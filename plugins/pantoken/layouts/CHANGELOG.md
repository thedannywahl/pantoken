# @pantoken/plugin-layouts

## 0.3.0

### Minor Changes

- 7d964ee: `@pantoken/plugin-layouts` now ships `pageLayouts`: starter page layouts (hero, callout,
  testimonial, two-column, rubric note) that were previously scaffold-only static HTML files under
  `packages/scaffold/templates/canvas-theme-editor/templates/pages/`.

  `@pantoken/tinymce` adds a `createLayoutsPlugin` — a "Layouts" toolbar/menu picker alongside the
  existing Components/Icons/Logos pickers, defaulting to `@pantoken/plugin-layouts`'s bundled
  `pageLayouts`.

  The `canvas-theme-editor` scaffold now imports `createLayoutsPlugin` from `@pantoken/tinymce`
  instead of glob-importing its own local template HTML files with the generic
  `createTemplatesPlugin`.

- 7d964ee: Restructure layouts into individual directories with cssdoc metadata and template utilities.

  ## Features
  - **Layout Restructuring**: Migrate all 7 layouts (callout, hero, page-layout, rubric-note, testimonial, two-column, wrapper) from flat structure to `src/layouts/{name}/{name}.css` pattern
  - **cssdoc Metadata**: Add comprehensive `@layout`, `@part`, and `@slot` annotations to all layout CSS files
  - **Template Generation**: New `htmlTemplate()` utility transforms layout CSS to semantic HTML with smart element resolution
  - **i18n Support**:
    - `extractSlotPlaceholders()` parses `:slot()::before` pseudo-element content for i18n extraction
    - `slotLabels()` runtime function accesses translated slot labels by locale
    - Layout-specific i18n keys: `"layout::name::slot"` schema
  - **Element Resolution**: Smart 4-tier resolution system (CSS selector → `@element` tag → `@scope` → span default)
  - **Build Pipeline**: Updated `scripts/generate.ts` to aggregate all 7 layouts into single `generated/layouts.css`
  - **Exports**: All layouts now export both `*Rules()` (CSS) and `*Template()` (HTML) functions
  - **Backward Compatibility**: Legacy `pageLayouts` export maintained

  ## Types Exported
  - `LayoutMetadata`, `LayoutPart`, `LayoutSlot`: Layout structure metadata
  - `SlotPlaceholder`, `SlotLabelsMap`: i18n support types

### Patch Changes

- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
  - @pantoken/model@0.3.2
  - @pantoken/plugin-kit@0.3.0

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
