---
"@pantoken/tinymce": patch
---

Fix blank icon glyphs for Instructure UI and custom icons in the icons picker and inserted content — `buildIconTokenCss()` declared the raw `--instui-icon-<name>` token but never the `.-icon-<name> { --pantoken-glyph: ... }` mapping the shared painter actually reads, so only icons whose real per-icon stylesheet happened to already be loaded elsewhere rendered.

Also let every content picker (components, icons, logos) resolve its CSS/asset URLs with a custom `buildAssetUrl` resolver instead of always defaulting to a hardcoded CDN — the icons picker's stylesheet injection ignored the chosen CDN provider entirely.
