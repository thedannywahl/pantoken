---
"@pantoken/plugin-theme-custom-media": minor
---

Add breakpoint `@custom-media` aliases: `--breakpoint-{xs,sm,md,lg,xl}-{up,down}` (sourced from
`@pantoken/tokens`' `--instui-component-tray-width-*` scale, each also aliased to a long-form
spelling — `x-small`…`x-large` — and a device name — `mobile`/`phablet`/`tablet`/`laptop`/`desktop`),
plus the unscaled, theme-dependent `--breakpoint-content-{up,down}` and
`--breakpoint-content-full-width-{up,down}` (the main content area's max-width: 1100px/1580px in
`rebrand`, 59.25em in `canvas`/`canvasHighContrast`). Adds a new runtime dependency on
`@pantoken/tokens`.
