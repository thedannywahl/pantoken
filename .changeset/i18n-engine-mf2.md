---
"@pantoken/i18n-engine": minor
---

Phase 3 building block (localization-engine plan): MF2 (MessageFormat 2) validation, wrapping
`messageformat` (the reference implementation) rather than re-implementing parsing. `validateMf2`
parses and validates a message, collecting syntax and data-model errors (`missing-fallback`,
`duplicate-declaration`, `duplicate-variant`, …) instead of throwing. `missingPluralCategories`
reports which of a target locale's CLDR plural categories (via `Intl.PluralRules`) a `.match` select
message doesn't cover — a catch-all (`*`) variant only ever satisfies `"other"`, since that's its
conventional meaning in a single-parameter plural message; every other category needs its own
literal variant or that plural form silently renders the catch-all's text instead of a
linguistically correct one.
