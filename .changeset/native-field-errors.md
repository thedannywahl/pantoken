---
"@pantoken/components": patch
"@pantoken/interactions": minor
"@pantoken/scaffold": patch
"@pantoken/ai": patch
---

Add opt-in native form-field validation through `initFormField` and a production IIFE. Associate
authored errors after interaction, preserve hints, synchronize invalid state and reset behavior,
and restore state on cleanup. Keep application-owned validation unchanged unless opted in.
Update examples and consumer guidance, respect hidden errors, and correct the documented
tree-browser IIFE import path.
