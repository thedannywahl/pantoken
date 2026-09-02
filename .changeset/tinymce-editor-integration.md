---
"@pantoken/tinymce": minor
"@pantoken/components": patch
"@pantoken/plugin-simple-icons": patch
---

New package `@pantoken/tinymce` provides TinyMCE + CodeMirror integration for pantoken design
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
