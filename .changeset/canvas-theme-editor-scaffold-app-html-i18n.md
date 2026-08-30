---
"@pantoken/scaffold": minor
---

`canvas-theme-editor` scaffold: extract the authoring page's markup out of `main.ts.tmpl`'s inline
`innerHTML` template literals into a standalone `src/app.html`, imported via Vite's `?raw`. The
wrapper container's title/description/actions/content-slot markup is now hand-authored directly in
`app.html` with the app's real copy and controls baked in, replacing the old two-step pattern of
rendering the generic `{{wrapperContainer:html:1}}` shell and then overwriting its placeholder
parts via `querySelector`. `main.ts.tmpl` now only carries interactive wiring (tabs, tray, modal,
TinyMCE, split-pane) plus a small `render()` helper that substitutes `{{key}}` placeholders in
`app.html` against a generated `src/strings.ts`.

The template's ~26 user-facing UI strings are sourced from a new `src/i18n.json`, wired into
`@pantoken/scaffold`'s existing translate/check-drift pipeline (`collectI18nSource()` now also
merges any `templates/<platform>/src/i18n.json`), and `generate.ts` synthesizes each such
template's `src/strings.ts` from its English source at build time.
