---
"@pantoken/scaffold": patch
---

Add regression coverage for `runScaffoldCli()` invoked with no arguments: the non-TTY path reports the
missing-platform error, and the TTY path prompts via `select()`/`text()` before scaffolding.
