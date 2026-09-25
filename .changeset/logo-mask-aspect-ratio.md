---
"@pantoken/plugin-logos": minor
"@pantoken/plugin-custom-components": minor
"@pantoken/tinymce": minor
"@pantoken/scaffold": patch
---

Replace logo PNG rasterization with an aspect-ratio-aware `-logo-<name>` mask glyph, mirroring the
`icon` painter but without squashing non-square logos into a 1:1 box.

- `@pantoken/plugin-custom-components` adds a new `logo` utility (`.instui-logo` + the shared
  `[class*="-logo-"]::before` painter) that reads a per-logo `--pantoken-logo-aspect` custom property
  instead of assuming a 1em square.
- `@pantoken/plugin-logos` no longer rasterizes PNGs or ships a `./*.png` export (dropping the
  `@resvg/resvg-js` build dependency). Its generated `.-icon-<name>` glyph classes are renamed to
  `.-logo-<name>` and now carry `--pantoken-logo-aspect` derived from each logo's own SVG `viewBox`.
  `LogoMeta.width`/`height` now describe that natural `viewBox` size, not a rasterized display size.
- `@pantoken/tinymce`'s logos picker inserts a mask-painted `<span class="instui-logo -logo-<name>"
role="img" aria-label="…">` instead of a CDN-hosted `<img>`, using the same CSS asset-tracking
  (`trackAndInjectAsset`) the icons picker already relies on for Canvas RCE compatibility.
- The Canvas theme editor scaffold template resolves the logo's `.css` export (not `.png`) for its
  local/offline preview mode, and re-syncs `-logo-*` classes found in loaded editor content the same
  way it already does for `-icon-*` classes.
