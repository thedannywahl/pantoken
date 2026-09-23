---
"@pantoken/scaffold": patch
---

Fix the canvas theme editor scaffold's "include dark mode" checkbox flipping on its own when the host page's own light/dark mode changes — it now only reflects the author's own choice of whether dark CSS ships with the exported theme.
