---
"@pantoken/canvas-theme-editor": minor
"@pantoken/scaffold": patch
---

Extract canvas-theme-editor's `theme.css`/`theme.js` into a new, standalone `@pantoken/canvas-theme-editor`
package (`platforms/canvas-theme-editor`) — publishable on its own, and exporting `THEME_CSS`/`THEME_JS`
string constants plus direct `./theme.css`/`./theme.js` subpath exports. `@pantoken/scaffold`'s
`canvas-theme-editor` platform now sources these two files from the new package at generate time instead
of duplicating them as on-disk templates.
