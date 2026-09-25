---
"@pantoken/scaffold": patch
"@pantoken/canvas-theme-editor": patch
---

Split the `canvas-theme-editor` scaffold's Config tab into a **Theme** section (theme buttons, a 13-swatch
color picker, and a dark-mode toggle shown only for the rebrand theme) and a **CDN** section (provider
select), patterned after the docs site's theme selector. All three theme controls refresh the live
preview immediately.

`buildThemeCss()`/`defaultThemeCssAssets()` now always import `@pantoken/plugin-custom-theme-colors`'s
`custom-theme-colors.css`, so the generated `theme.css` supports the same `data-pantoken-color` attribute
remap the color picker toggles — a no-op unless that attribute is set.
