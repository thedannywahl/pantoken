---
"@pantoken/scaffold": patch
---

canvas-theme-editor: add a light/dark toggle to the preview header for switching the live
preview's color scheme. "Include dark mode" is now disabled (and unchecked) for the Canvas and
Canvas High Contrast themes, since only the rebrand theme supports dark mode, and the new preview
toggle is disabled unless "Include dark mode" is on. The preview now also forces the chosen scheme
regardless of the visitor's own OS/browser dark-mode preference, working around lightningcss's
`light-dark()` downlevel (which otherwise only follows `prefers-color-scheme`).
