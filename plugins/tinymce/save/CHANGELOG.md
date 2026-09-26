# @pantoken/tinymce-save

## 0.2.0

### Minor Changes

- f475012: Add a reusable TinyMCE toolbar menu for saving, opening, updating, and deleting named browser-local
  presets. Update the Canvas theme editor scaffold to snapshot its theme, color, mode, CDN provider,
  custom CSS and JavaScript, and editor HTML independently from TinyMCE Autosave.
- f475012: Add New, Export, and Import controls to the TinyMCE save plugin, plus a portable JSON export schema published under the pantoken app schema endpoint.

### Patch Changes

- f475012: More canvas theme editor fixes:

  - The standalone shell header's theme color swatches no longer get remapped to the currently
    active chrome color — they show the true navy/blue/etc. colors, matching the theme tray.
  - The "Download package" and "Download HTML" buttons name the file after the currently open/saved
    preset instead of always "canvas-theme.zip"/"index.html". `@pantoken/tinymce-save` now exports
    `slugifyExportName` so hosts can build a matching filename.
  - Removed the copy-to-clipboard confirmation message's now-dead DOM reference (the status span was
    removed from the markup) — copying still works, it just no longer tries to update a status
    message.
  - Fixed `/tools/canvas-rce/` (and `/tools/canvas-rce` with no trailing slash) 404ing in `vitepress
dev` — only the exact `/tools/canvas-rce/index.html` URL used to resolve.
