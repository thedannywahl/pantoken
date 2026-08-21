---
"@pantoken/utils": minor
"@pantoken/tokens": patch
---

Add `syntaxMismatches` to `@pantoken/utils`: validates a resolved token's value against the real CSS grammar for the property its name implies (via `css-tree`'s `mdn-data`-backed lexer), catching upstream data corruption a value-shape sniff alone would miss. `@pantoken/tokens`' generator now fails the build on a mismatch (e.g. a `font-weight` token holding a non-numeric string) and warns on a token name with no modeled CSS property.
