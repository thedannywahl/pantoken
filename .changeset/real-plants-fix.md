---
"@pantoken/plugin-kit": patch
---

Create process-sandbox worker temp directories under an allowed read root when possible, avoiding Node permission-denied noise from system temp paths.
