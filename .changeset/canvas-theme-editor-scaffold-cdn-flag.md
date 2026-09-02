---
"@pantoken/scaffold": minor
---

`canvas-theme-editor`'s `theme.css`/`theme.js` are now built with `@pantoken/canvas-theme-editor`'s
`buildTheme()` at scaffold time instead of shipping a pre-baked jsDelivr/rebrand-light default. A
new `--cdn <provider>` flag (also available programmatically via `scaffoldProject(platform, dir, {
cdn })`) picks the CDN provider (`jsdelivr` [default], `unpkg`, `esmsh`) those two files are built
for, alongside the existing `--theme`/`--theme-mode` flags.

The scaffold's local preview is now a real Vite app (`npm run dev`/`build`/`preview`) instead of a
static-server preview: it bundles TinyMCE as a real dependency (version/config aligned with
instructure/canvas-lms's own RCE), adds a custom "Insert template" toolbar button/dialog and
TinyMCE's stock "Source code" HTML editor, and shows a live preview pane styled with the actual
resolved CDN stylesheet for the chosen provider/theme/mode — plus "Download theme.css"/"Download
theme.js" links to regenerate those files for a different provider/theme without re-running the
CLI.
