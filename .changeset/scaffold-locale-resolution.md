---
"@pantoken/scaffold": minor
"create-pantoken-app": minor
"@pantoken/ai": minor
---

Scaffold generated projects in the detected (or requested) locale.

`-l, --lang` now shapes the scaffolded project as well as the CLI interface: entry markup gets a
matching `lang`/`dir` pair, so `--lang ar` scaffolds `<html lang="ar" dir="rtl">`.

Detection now keeps region and script subtags pantoken actually supports (`pt_BR.UTF-8` resolves to
`pt-BR`, `zh-Hant-TW` to `zh-Hant`) and narrows unsupported ones to their base language (`es_MX` to
`es`) rather than emitting a tag with no bundle behind it. An explicit `--lang` errors on an
unsupported value, listing the supported tags, instead of silently falling back to English — the
resolved tag is written into generated files, so it stays constrained to the registry.
