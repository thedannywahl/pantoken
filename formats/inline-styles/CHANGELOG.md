# @pantoken/inline-styles

## 0.2.0

### Minor Changes

- 8ef5ec9: Add a light-only browser snapshot entry that resolves the computed cascade and materializes supported static glyphs as PNG images. Correct inherited variable remapping and reject unresolved resolved-mode values.
- 8ef5ec9: Resolve variable values before omitting token declarations, reject circular stylesheet token definitions, and expose reference/resolved variable modes in the standalone CLI.
- 8ef5ec9: Inline component rules using :scope roots and optionally leave custom-property declarations in a companion theme stylesheet instead of copying tokens into HTML.

## 0.1.1

### Patch Changes

- b3cb818: Separate generic CSS inlining from email-safe pantoken HTML generation and add the email CLI target.
- b3cb818: Add package documentation for inline HTML styles and scoped theming.
