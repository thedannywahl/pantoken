---
"@pantoken/canvas-theme-editor": minor
---

`buildTheme`/`buildThemeCss` accept a new `theme`/`mode` option (`"rebrand"` [default] |
`"canvas"` | `"canvasHighContrast"`, and `"light"` [default] | `"adaptive"`) selecting which
`@pantoken/css` lean token sheet theme.css imports, instead of always the rebrand/light default.
An explicit `css` override still takes precedence. New `defaultThemeCssAssets(theme, mode)` export
for building the default CSS asset list directly.
