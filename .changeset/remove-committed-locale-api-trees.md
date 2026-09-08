---
"@pantoken/docs": patch
---

Removed 34,440 accidentally-committed generated API-doc translations (`docs/{locale}/api/**` for all
42 non-English, non-`hu` locales — `docs/hu/api/` was already gitignored). `docs/*/api/` is now
gitignored like `docs/api/` and `docs/hu/api/` already were. These files were never used by the
deployed site: CI's actual deploy build (`docs:build`) sets `DOCS_ROOT_LOCALE_ONLY=1`, which excludes
every non-root locale's `api/**` from the VitePress build via `srcExclude`, and CI never runs
`docs:check:locales` (the parity check that requires them). They remain regenerable locally via
`docs:api:locales` for anyone using the full `docs:build:all`/`docs:build:claude` pipeline. Verified
the deploy path on a clean, cache-disabled build (`vp run --no-cache docs:build`) with these files
physically removed before this change: build succeeds, `dist/<locale>/` correctly has no `api/`
subfolder, and `docs` package tests (212) pass unchanged.
