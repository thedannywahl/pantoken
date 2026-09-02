---
"@pantoken/scaffold": minor
---

`canvas-theme-editor` scaffold: rebuild the authoring page on pantoken itself. The page shell now
uses `@pantoken/plugin-layouts`'s `wrapper` layout; the CDN provider/theme/mode config, and
editable copies of `theme.css`/`theme.js` (syntax-highlighted via CodeMirror, feeding the live
preview directly) moved into an `.instui-tray` with Config/CSS/JS tabs opened from a header
"Edit theme" button; the on-page instructions moved into a help modal opened by a "?" button. The
editor/preview split can be resized by dragging the divider, stacked vertically instead of side by
side, reordered by dragging a pane onto the other (or the keyboard-accessible "Swap panes"
button), and each pane has its own fullscreen toggle. The preview wraps content in
`.instui-view -background-primary` capped at `59.25rem` — Canvas's own content-area max width.
