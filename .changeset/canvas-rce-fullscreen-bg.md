---
"@pantoken/scaffold": patch
---

Fix the canvas theme editor scaffold's preview pane keeping a white header/footer background in fullscreen while in dark mode — the background color now falls back to the `Canvas` system color, matching every other background in the scaffold's chrome.
