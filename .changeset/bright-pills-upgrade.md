---
"@pantoken/tokens": minor
"@pantoken/components": minor
"@pantoken/core": patch
"@pantoken/pendo": patch
---

Upgrade the vendored Instructure sources to design tokens v1.9.0 and InstUI 11.7.6. The token IR now includes the new pastel and pill contracts, with alert and pill implementations aligned to the upstream spacing, sizing, color, and typography changes. Banner continues to use its hand-authored behavior while consuming the upstream pastel-backed banner tokens. The core icon reader supports the updated InstUI Lucide export format, and removed upstream tokens and icons are recorded through the compatibility ledger.
