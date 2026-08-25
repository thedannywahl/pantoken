---
"@pantoken/pantoken": patch
"@pantoken/scaffold": patch
---

Fix `@pantoken/pantoken`'s published `model.json` (the cssdoc provider model downstream consumers use)
to include `@global` utility records (spacing/gap/layout/etc.) — previously `buildCssDocModel()` only
parsed `generated/components.css`, so consumer projects had no way to resolve `--p-lg`-style global
modifier classes as documented. Wired `model.json` into `@pantoken/scaffold`'s templated `cssdoc.json`
as a `providers` entry so scaffolded projects pick this up out of the box.
