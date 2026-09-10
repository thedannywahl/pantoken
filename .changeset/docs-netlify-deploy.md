---
"@pantoken/docs": minor
---

Move the docs site from GitHub Pages to Netlify, and cut the deploy build's peak memory.

The full-locale site is ~42k pages / ~92k files / ~1.7 GB. GitHub caps a published Pages site at 1 GB
with a 10-minute deploy timeout, so the site had outgrown the host — the deploy could not have
succeeded regardless of runner tuning. `docs.yml` now builds and deploys in one job via the Netlify
CLI (`NETLIFY_AUTH_TOKEN` + `NETLIFY_SITE_ID` secrets), and a `Check site shape` step guards
Netlify's one structural limit, 54,000 files per directory. `docs/public/_headers` sets the immutable
cache policy for content-hashed `/assets/*`.

The build itself was OOM-killing the runner VM during the SSR bundle, which surfaces only as "the
runner has received a shutdown signal". Three changes bring it back inside 16 GB: the local-search
index now skips `<locale>/api/**` (it was running a second full markdown pass over ~38k
machine-translated pages and retaining ~77 MB of MiniSearch indexes, to build per-locale indexes too
large to be worth downloading), `buildConcurrency` drops from 64 to 12, and the workflow enlarges the
runner's swapfile to 24 GB so an overshoot degrades instead of dying.
