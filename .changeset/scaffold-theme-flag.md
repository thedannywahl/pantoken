---
"@pantoken/scaffold": minor
---

Add a global `--theme <name>`/`--theme-mode <mode>` CLI flag (also available programmatically via
`scaffoldProject(platform, dir, { theme, mode })`) that picks which `@pantoken/css` token sheet
every scaffolded platform imports (`rebrand` [default], `canvas`, `canvasHighContrast`; rebrand
mode `light` [default] or `adaptive`) — not just the `canvas-theme-editor` platform's `rebrand-light`
default. React, Vue, Svelte, and Next templates now import a specific `@pantoken/css` lean
stylesheet (substituted at scaffold time) instead of the theme-fixed `@pantoken/css`/`@pantoken/css/inject`
entry points.
