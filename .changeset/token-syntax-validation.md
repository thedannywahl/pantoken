---
"@pantoken/utils": minor
"@pantoken/tokens": patch
---

Add `syntaxMismatches` to `@pantoken/utils/token-syntax`: validates a resolved token's value against the real CSS grammar for the property its name implies (via `css-tree`'s `mdn-data`-backed lexer), catching upstream data corruption a value-shape sniff alone would miss. It's a separate entry point (not the main `@pantoken/utils` barrel) because `css-tree` isn't Node-free — bundling it into a browser/SSR graph breaks its runtime JSON require. `@pantoken/tokens`' generator now fails the build on a mismatch (e.g. a `font-weight` token holding a non-numeric string) and warns on a token name with no modeled CSS property.
