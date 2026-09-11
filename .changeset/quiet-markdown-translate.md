---
"@pantoken/translation-adapters": patch
---

Markdown translation prompts now explicitly forbid model commentary, and the adapter rejects common
reasoning-output and repeated-character corruption before translated Markdown is written.
