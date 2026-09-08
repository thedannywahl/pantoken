---
"@pantoken/docs": patch
---

Documented the lint-stack migration: ESLint is gone. TSDoc enforcement (`tsdoc/syntax` +
`tsdoc-require-2/require`) now runs inside `vp check` through oxlint's ESLint-compatible JS-plugin
bridge instead of a separate `lint:tsdoc` ESLint pass, and the duplicate cssdoc CSS pass (`lint:js`,
via `@cssdoc/eslint-plugin` + `@eslint/css`) was removed after it was shown to report diagnostics
identical to the `@cssdoc/stylelint-plugin` instance that already covered the same globs. Stylelint
stays as the single cssdoc lint instance, because oxlint has no CSS language and its JS plugins can't
host custom parsers.
