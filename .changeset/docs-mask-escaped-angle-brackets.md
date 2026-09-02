---
"@pantoken/docs": patch
---

Fixed a real translation-corruption bug: TypeDoc renders a generic type as several separately
backtick-wrapped tokens joined by bare escaped angle brackets (e.g. `` `Readonly`\<`Record`\<`string`,
`string`\>\> ``). That glue sat outside any masked code span and reached the AI adapter unprotected,
which sometimes duplicated/mangled the brackets. `AiTranslationAdapter` now masks every `\<`/`\>`
sequence globally before any prompt is sent, in `translateMarkdown`, `translateText`, and the batch
path.
