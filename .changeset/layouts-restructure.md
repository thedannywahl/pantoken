---
"@pantoken/plugin-layouts": minor
---

Restructure layouts into individual directories with cssdoc metadata and template utilities.

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
