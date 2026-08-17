---
"@pantoken/components": minor
---

`progress-bar` and `progress-circle` now style a `:indeterminate` state (a native `<progress>` missing its `value` attribute, or fed a bad `--value`) so it reads as loading instead of rendering a broken or empty meter. This isn't part of InstUI — it's a pantoken best guess: `progress-bar` animates `.bar` as a sliding segment, `progress-circle` spins its ring at a fixed arc, and both hide `.value`. `<meter>` has no indeterminate state and is unaffected.
