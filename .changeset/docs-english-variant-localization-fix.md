---
"@pantoken/docs": patch
---

Fixed `AiTranslationAdapter` prompting "translate from English to English" for the `en-AU`/`en-CA`/
`en-GB` locales (the locale-label lookup stripped every locale's parenthetical display name, collapsing
all three English regional variants to the bare word "English"). They now translate for real, using
British/Australian/Canadian spelling and phrasing.
