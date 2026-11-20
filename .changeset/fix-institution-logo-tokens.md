---
"@pantoken/core": patch
"@pantoken/tokens": patch
---

Fix dangling token references in upstream design-tokens v2.6.0

- Extend orphaned token filter to include both typo version (`insitution`) and corrected version (`institution`) of side-nav-bar logo tokens
- Remove corresponding deprecation shim entries that were re-adding filtered tokens back into the IR
- Resolves CSS self-containment test failures caused by dangling `var()` references to non-existent tokens
- Regenerate token IR to exclude institution-logo tokens (5279 tokens → 5277 tokens)
