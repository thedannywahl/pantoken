---
"@pantoken/tinymce": patch
---

Fix the icons picker dialog: single-click now selects a tile (enabling a new primary Insert button), double-click or Enter inserts it immediately, and the search box/tabs/results grid now render with visible borders and text instead of a washed-out, unstyled appearance caused by TinyMCE's own dialog color reset. Export `PANTOKEN_ICON` for reuse outside the toolbar menu button.
