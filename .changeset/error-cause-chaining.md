---
"@pantoken/cli": patch
"@pantoken/translation-adapters": patch
---

Add Error.cause to error chain for better debugging

- packages/cli/src/index.ts: Preserve original import error as cause in icon-font
  lazy-load failure (runIconFont)
- tools/translation-adapters/src/shim.ts: Preserve individual profile errors as
  cause in exhausted profiles error (runWithBreaker)

Error.cause (ES2022) enables better error chaining and debugging by preserving
the original error context when re-throwing with higher-level messages.
