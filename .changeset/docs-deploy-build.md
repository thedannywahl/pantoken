---
"@pantoken/docs": patch
---

Add `docs:build:deploy`, the full-locale site build the deploy workflow runs. It generates every
locale's API tree with the deterministic `glossary` adapter (committed PO catalogs, no AI and no
network) and skips the `docs:check:locales` parity gate, which is a source-quality check rather than a
deploy gate. `docs:build` stays the fast English-only CI breakage check and `docs:build:all` stays the
local full build with parity checking.
