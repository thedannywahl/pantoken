---
"@pantoken/scaffold": patch
---

canvas-theme-editor scaffold: the "Edit theme" tray's CSS/JS tabs now start blank instead of
pre-populated with the generated `theme.css`/`theme.js`. Anything you add is appended to the
generated preset in both the live preview and the downloaded files, so custom overrides survive
Config select changes instead of needing a "Regenerate from config" step.
