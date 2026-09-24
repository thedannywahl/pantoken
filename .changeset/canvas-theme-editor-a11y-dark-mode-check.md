---
"@pantoken/scaffold": patch
---

The canvas-theme-editor scaffold's accessibility checker now checks contrast against both light and
dark rendering when "Include dark mode" is checked (rebrand theme only), reusing the preview's
scheme-forcing mechanism against the editing iframe.
