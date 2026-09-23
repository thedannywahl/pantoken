---
"@pantoken/scaffold": patch
---

Fix three standalone-mode layout/theming bugs in the canvas theme editor scaffold's app shell (shown when the scaffolded app is opened directly, outside the docs' embedding iframe):

- the shell header rendered as a left-side column instead of a top header, because it inherited the scaffold-base wrapper layout's app-shell row class
- explicitly picking Light or Dark appearance was silently overridden by the visitor's OS preference (a lightningcss `light-dark()` downlevel quirk), leaving dark-mode text and UI colors on a light background
- the redundant page title and description are now hidden once the shell's own brand mark is showing
