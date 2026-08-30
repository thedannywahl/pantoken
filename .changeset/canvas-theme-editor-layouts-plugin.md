---
"@pantoken/plugin-layouts": minor
"@pantoken/tinymce": minor
"@pantoken/scaffold": patch
---

`@pantoken/plugin-layouts` now ships `pageLayouts`: starter page layouts (hero, callout,
testimonial, two-column, rubric note) that were previously scaffold-only static HTML files under
`packages/scaffold/templates/canvas-theme-editor/templates/pages/`.

`@pantoken/tinymce` adds a `createLayoutsPlugin` — a "Layouts" toolbar/menu picker alongside the
existing Components/Icons/Logos pickers, defaulting to `@pantoken/plugin-layouts`'s bundled
`pageLayouts`.

The `canvas-theme-editor` scaffold now imports `createLayoutsPlugin` from `@pantoken/tinymce`
instead of glob-importing its own local template HTML files with the generic
`createTemplatesPlugin`.
