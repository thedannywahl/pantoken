---
"@pantoken/plugin-custom-theme-colors": minor
---

Recolor secondary action and brand button colors with the selected theme color. Upstream flattens
some tokens to literal hex with a baked alpha, so the primitive remap alone never reached them and
secondary buttons — most visibly `-toggle` buttons in their pressed state — stayed navy-blue under
every palette. Those literals are now traced back to the brand primitive they came from and
relinked to the selected scale via `color-mix()`, on both sides of `light-dark()` values.

Elevation shadow colors are excluded for now, pending a design decision on whether shadows should
be brand-tinted.
