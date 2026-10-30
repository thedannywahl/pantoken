---
"@pantoken/utils": patch
"@pantoken/components": patch
---

Keep keyboard focus distinct in forced colors. Remove the resting outline's line style,
which Chromium otherwise paints despite its transparent color, and restore the outline
for visible keyboard focus and opt-in focus-within rings. Preserve normal color modes,
theme tokens, custom selectors, and system color adjustment.
