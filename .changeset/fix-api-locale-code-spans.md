---
"@pantoken/docs": patch
---

Fix the localized API docs build: bare-HTML escaping now matches code spans by backtick-run length, like CommonMark, so a translated string with a stray double backtick can't leave a raw `<name>` tag that breaks the Vue compile.

Retranslate the stale Slovenian `getLogoMeta` API entries that described the old PNG-size API.
