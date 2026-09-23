---
"@pantoken/tinymce": patch
"@pantoken/scaffold": patch
---

Add a dark-mode variant for TinyMCE's editable content in the Next Gen skin — the editor body previously stayed light even when the surrounding chrome went dark. The canvas theme editor scaffold now propagates its scheme onto the editor's own iframe document so the new dark content rules take effect.
