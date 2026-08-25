---
"@pantoken/scaffold": patch
---

Document the `cssdoc.json` `providers` prefix-rewrite option (requires `@cssdoc/config` with the new
per-provider `prefix` field) in the scaffolded `cssdoc.json` template, with commented-out examples for
a custom prefix and a no-separator spelling. No behavior change — the live `providers` entry is
unchanged, so a default-prefix consumer sees no difference.
