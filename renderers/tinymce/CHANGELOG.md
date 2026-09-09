# @pantoken/tinymce

## 0.2.2

### Patch Changes

- @pantoken/components@1.1.2

## 0.2.1

### Patch Changes

- Updated dependencies [db34dec]
  - @pantoken/plugin-simple-icons@0.3.8
  - @pantoken/components@1.1.1
  - @pantoken/plugin-custom-components@0.3.1

## 0.2.0

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

- 7d964ee: New package `@pantoken/tinymce` provides TinyMCE + CodeMirror integration for pantoken design
  system. Exports five capabilities:

  - **Phase 1:** Content-CSS wiring (pantokenContentCssUrls, injectContentStylesheet)
  - **Phase 2:** TinyMCE plugins (templates, source-toggle)
  - **Phase 3:** Three browse+insert pickers (components/icons/logos) with dynamic CSS injection
  - **Phase 4:** CodeMirror HTML linter validating .instui-* tokens
  - **Phase 5:** CodeMirror autocomplete for component/modifier IntelliSense

  Merged model combines @pantoken/components, @pantoken/plugin-custom-components, and
  @pantoken/plugin-simple-icons metadata for unified token validation and discovery.

  Also exports model.json and manifest.json from @pantoken/components and
  @pantoken/plugin-simple-icons respectively for programmatic access to component and icon
  definitions.

### Patch Changes

- 7d964ee: Fix test failures:

  - **web-components**: Resolve i18n.json path relative to check-drift.ts script directory using `import.meta.url`, fixing module import errors in tests.
  - **tinymce**: Defend onChange handlers against missing properties with optional chaining to prevent TypeError in test scenarios.

- 7d964ee: Fix the components/icons/logos picker plugins throwing `TypeError: Plugin is not a constructor` on
  init. TinyMCE always instantiates registered plugins with `new Plugin(editor, url)`; the plugin
  factories returned arrow functions, which aren't constructible. They now return named `function`
  expressions.
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [63e06cb]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
- Updated dependencies [7d964ee]
  - @pantoken/plugin-custom-components@0.3.1
  - @pantoken/components@1.1.0
  - @pantoken/plugin-layouts@0.3.0
  - @pantoken/cdn@0.2.0
  - @pantoken/plugin-logos@0.4.0
  - @pantoken/plugin-simple-icons@0.3.7
