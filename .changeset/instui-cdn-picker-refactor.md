---
"@pantoken/docs": patch
---

Align the CDN picker docs page with InstUI patterns: real tabs, an elevated primary card, and a merged icon list with a labeled divider instead of fake tab buttons. Also fixes the Simple Icons dark-mode invert (was keyed off the OS `prefers-color-scheme` instead of the site's own theme toggle) and broken InstUI icon glyphs (most icons rendered as a bare circle/rect/triangle because the manifest generator kept only the first `<path>` in a multi-shape icon).

Also simplifies the components tab: drops the now-redundant token-sheet toggle (icons live on their own tab), folds base/utilities into the component list as checked-by-default entries, turns "All components" into a tri-state checkbox that selects/clears the list (collapsing the output to `components.css` only when everything is checked), and replaces the output format radios with secondary tabs.
