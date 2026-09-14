# Docs Hosting Migration Implementation Plan

Date: 2026-09-14
Repo state analyzed: `main` at `6d17a8c60a397b0a51c60b931cac3f4f519c3b5b` (`chore: version packages (#160)`)

## Objective

Move `pantoken.app` docs off Netlify's credit-metered static hosting while keeping the GitHub Actions build gate and release-triggered deploy flow. The target implementation should reduce request/bandwidth billing risk, keep the full multilingual VitePress site deployable, and preserve the existing partial-build cache behavior where it still makes sense.

## Current Findings

The previous production inventory is stale for current `main`. The latest successful docs deploy/cache is for `c823d8025635b4ece7daf485f5d7f0642ec5edbd` (#158), not the current release. GitHub Actions shows the `a1c0d5828` Registry (#159) and `6d17a8c60` Version Packages (#160) docs runs were skipped because `.github/workflows/docs.yml` currently has `released.if: false` at lines 79-80.

The last measured full production output after #156/#158 was:

- `138,143` files
- `3,855,451,025` content bytes
- no file above `25 MiB`
- largest JS around `3.724 MB`
- 44 `metadata.*.js` files between `83 KB` and `90 KB`
- moving `assets/` plus `demos-assets/` out of the primary static host would leave about `42,726` files and `1.867 GB` on the HTML host, with about `95,417` files and `1.989 GB` in the external asset bucket

Current source changes since that inventory matter:

- #159 adds the shadcn registry generator at `docs/scripts/generate-registry.ts`, emitting `docs/public/r/registry.json`, per-item `docs/public/r/*.json`, and `docs/.vitepress/theme/generated/registry.json`.
- #159 changes the localized home experience and adds `RegistryBrowser`, so current production output needs a fresh inventory before any limit-based decision is final.
- `docs/package.json` includes `docs:assets`, which now runs `generate-registry.ts` as part of every deploy build.
- `docs/scripts/build-locales.ts` still builds each locale separately and merges to `docs/.vitepress/dist`.
- `docs/.vitepress/config.ts` still emits locale-scoped client assets via `assetsDir: assets/<locale>` when `DOCS_LOCALE` is set.

Provider constraints checked against current public docs:

- Cloudflare Workers Static Assets: paid plan supports `100,000` static asset files per Worker version and `25 MiB` per file; free is `20,000` files. Static asset requests are free/unlimited. Workers Paid starts at `$5/month`.
- Cloudflare Pages has the same effective file/file-size shape: `20,000` files free, `100,000` paid, `25 MiB` per asset.
- Cloudflare R2 Standard has `10 GB-month` free storage, `1M` Class A ops, `10M` Class B ops, and free internet egress.
- Netlify Free remains `300` credits, with current rates of `20 credits/GB` bandwidth and `2 credits/10k` web requests. At the user's observed burn of ~100 credits in 2 days, this is not sustainable.
- Bunny CDN remains a pragmatic paid fallback: `$1` monthly minimum, no request fees, and region-based bandwidth pricing, with Europe/North America at `$0.01/GB`.

Sources:

- Cloudflare Workers limits: https://developers.cloudflare.com/workers/platform/limits/
- Cloudflare Workers pricing/static asset billing: https://developers.cloudflare.com/workers/platform/pricing/
- Cloudflare Static Assets billing: https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/
- Cloudflare R2 pricing: https://developers.cloudflare.com/r2/pricing/
- Cloudflare Pages limits: https://developers.cloudflare.com/pages/platform/limits/
- Netlify pricing: https://www.netlify.com/pricing/
- Netlify April 2026 credit rates: https://www.netlify.com/changelog/2026-04-14-pricing-updates-april-2026/
- Bunny pricing: https://bunny.net/pricing

## Recommendation

Implement a hybrid Cloudflare deployment:

1. Host HTML, root metadata, registry JSON, sitemap/hashmap, icons, Open Graph images, and other low-churn public files in Cloudflare Workers Static Assets.
2. Host high-file-count VitePress client assets under `assets/` and demo runtime assets under `demos-assets/` in Cloudflare R2 on a dedicated assets hostname such as `assets.pantoken.app`.
3. Keep GitHub Actions as the build gate and deploy trigger. Replace the Netlify CLI deploy step with a split deploy: upload asset prefixes to R2, rewrite/copy the remaining dist tree for Workers Static Assets, then deploy the Worker.

This is the lowest-cost future-looking path because most docs traffic should be static asset traffic with no per-request charge, R2 removes egress billing, and the split keeps the primary Worker under Cloudflare's `100,000` file limit. A single Cloudflare Worker/Pages project should not be the target unless the fresh current-main inventory proves the full output has dropped below `100,000` files with margin.

## Execution Plan

### 1. Start with a fresh production inventory for current `main`

Do this before editing deploy logic. Since current `main` has no successful deploy cache after #159/#160, create a temporary inventory workflow or manually dispatch a disabled-safe inventory branch that:

- checks out `6d17a8c60` or current `origin/main`
- runs the same build commands as docs deploy:
  - `vp run -F "@pantoken/docs..." build`
  - `DOCS_BASE=/ DOCS_HOSTNAME=https://pantoken.app/ DOCS_BUILD_CONCURRENCY=12 NODE_OPTIONS=--max-old-space-size=12288 vp run @pantoken/docs#docs:build:deploy`
- inventories `docs/.vitepress/dist`
- uploads a small artifact containing:
  - total file count and bytes
  - largest 50 files
  - counts/bytes by extension
  - counts/bytes by top-level prefix
  - counts/bytes for `assets/`, `demos-assets/`, `r/`, root files, and HTML
  - any file over `25 MiB`
  - all files with path and bytes as CSV

Use the older inventory result only as a baseline. Do not migrate based on it without the fresh current-main numbers.

Acceptance:

- current-main inventory exists as an artifact
- no file exceeds `25 MiB`, or the plan explicitly handles those files via R2
- the proposed Worker tree is below `100,000` files with at least a small safety margin
- the proposed R2 tree size is inside the R2 free tier or has a clear cost estimate

### 2. Add repo-local deploy split tooling

Add a script under `docs/scripts/`, for example `prepare-cloudflare-deploy.ts`, that reads `docs/.vitepress/dist` and writes:

- `docs/.vitepress/cf-worker-dist/` with everything except the R2 prefixes
- `docs/.vitepress/cf-r2-assets/` with `assets/` and `demos-assets/`
- a JSON manifest with counts, bytes, and largest files for both trees

Keep `r/` in the Worker tree unless the fresh inventory shows it is large enough to matter. The registry JSON is part of the public docs API surface, small, and better served from `pantoken.app/r/...` without another hostname/CORS concern.

Do not rewrite HTML unless needed. VitePress currently emits asset URLs under `/assets/<locale>/...` and docs head links under `/demos-assets/...`. The cleanest migration is to route those path prefixes at Cloudflare to R2 while preserving URLs:

- `pantoken.app/assets/*` -> R2 bucket
- `pantoken.app/demos-assets/*` -> R2 bucket
- everything else -> Worker static asset binding

If same-host R2 routing is too awkward in Workers Static Assets, use `assets.pantoken.app` and rewrite built HTML/JS references in the prepared dist, but treat that as the second choice because it increases cache/CORS and search/OG regression risk.

Acceptance:

- script has unit tests for prefix splitting and manifest totals
- `vp run @pantoken/docs#docs:assets` output still lands in the expected tree
- the split script fails if the Worker tree exceeds `100,000` files or any Worker file exceeds `25 MiB`

### 3. Add Cloudflare config

Add a minimal Worker project for docs deployment, likely under `docs/cloudflare/` or a root `wrangler.docs.toml`.

The Worker should:

- bind static assets from `docs/.vitepress/cf-worker-dist`
- bind the R2 bucket
- serve `/assets/*` and `/demos-assets/*` from R2 with correct content type, ETag/cache headers, and long immutable caching for hashed assets
- fall back to static assets for HTML and root files
- avoid `run_worker_first` for paths that can be served directly by static assets unless R2 routing requires the Worker

Required GitHub secrets/vars will likely be:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_R2_BUCKET`
- optional `CLOUDFLARE_ZONE_ID` if route/domain setup is automated

Acceptance:

- local or CI dry-run can run `wrangler deploy --dry-run` or equivalent
- request paths for `/`, a localized guide page, `/assets/<locale>/chunks/...`, `/demos-assets/...`, `/r/registry.json`, `/sitemap.xml`, and `/hashmap.json` are documented and tested

### 4. Update `.github/workflows/docs.yml`

Replace the disabled gate and Netlify deploy step.

Specific edits:

- remove `if: false # Temporarily disabled` from the `released` job or replace it with an explicit temporary migration toggle that can be enabled by repository variable
- keep the trigger decision logic at lines 87-145 unless the product decision changes
- keep the build and partial-build cache path at lines 206-300
- replace the Netlify shape check at lines 302-321 with a Cloudflare shape check:
  - total Worker files < `100000`
  - no Worker file > `25 MiB`
  - R2 prefix manifest present
  - optionally warn if total current-main files jump by more than a chosen threshold
- replace the Netlify deploy step at lines 327-345 with:
  - run split script
  - upload/sync `cf-r2-assets/` to R2
  - deploy Worker Static Assets with Wrangler
  - output production URL
- keep saving `docs/.vitepress/dist` cache, since partial deploys still need the previous complete dist

Use pinned versions where the repo already pins actions. Wrangler must be new enough for current Static Assets behavior and paid `100,000` file support.

Acceptance:

- manual `workflow_dispatch` full build succeeds on a branch or migration test ref
- skipped release/version-package behavior is intentional and visible
- no Netlify secrets are required for the new deploy path

### 5. Verify routing and cache behavior

After a preview/test deploy:

- request at least one page in root and 3 non-root locales
- check one API page and one CSS API page
- check registry:
  - `/r/registry.json`
  - one generated `/r/<item>.json`
- check assets:
  - a locale chunk under `/assets/<locale>/chunks/`
  - theme CSS/JS loaded by the home page
  - `/demos-assets/focus-outline.css`
- verify clean URL fallback still works
- verify `sitemap.xml`, `hashmap.json`, `robots.txt`, favicon, Open Graph images
- check response headers:
  - hashed chunks: long immutable cache
  - HTML/hashmap/sitemap/registry JSON: shorter or revalidation-friendly cache
- run a browser smoke test against `pantoken.app` or the preview URL if available

### 6. Remove Netlify and Re-Enable Automated Docs Deploy

As the final migration step:

- Re-enable the docs deploy in `.github/workflows/docs.yml` by removing `if: false # Temporarily disabled` from the `released` job so that releases and docs pushes trigger automated deployment.
- Remove or archive Netlify deploy secrets (`NETLIFY_AUTH_TOKEN`, `NETLIFY_SITE_ID`) and outdated Netlify comments in `.github/workflows/docs.yml`.
- Keep the historical note that GitHub Pages cannot host the site because of the 1 GB cap and deploy timeout.
- Document the active Cloudflare Workers Static Assets + R2 hosting architecture in `docs/conventions/build-and-docs.md`.
- Update `SECURITY.md` and `ASSURANCE.md` to reflect the static asset hosting boundary and asset integrity controls.

## Cloudflare Dashboard Setup Instructions

Before running the production deploy workflow, ensure the following are configured in the Cloudflare Dashboard:

1. **Workers Paid Plan**:
   - In Cloudflare Dashboard -> **Workers & Pages** -> **Plans**, ensure **Workers Paid** ($5/mo) is active (required for >20,000 static asset files, supporting up to 100,000 files).
2. **R2 Bucket**:
   - In Cloudflare Dashboard -> **R2** -> **Create bucket** -> Name: `pantoken-docs-assets`.
3. **Cloudflare API Token**:
   - In Cloudflare Dashboard -> **My Profile** -> **API Tokens** -> **Create Custom Token**:
     - Permissions:
       - `Account` | `Workers R2 Storage` | `Edit`
       - `Account` | `Workers Scripts` | `Edit`
       - `Account` | `Account Settings` | `Read`
       - `Zone` | `Workers Routes` | `Edit`
     - Resources: `All accounts`, `All zones` (or scoped to `pantoken.app`).
4. **Worker Custom Domain**:
   - In Cloudflare Dashboard -> **Workers & Pages** -> `pantoken-docs` -> **Settings** -> **Domains & Routes** -> Add Custom Domain `pantoken.app` (and `www.pantoken.app`).
5. **GitHub Repository Secrets & Variables**:
   - In GitHub repository Settings -> Secrets and variables -> Actions:
     - Secret `CLOUDFLARE_API_TOKEN`: API Token created above.
     - Secret/Var `CLOUDFLARE_ACCOUNT_ID`: Cloudflare Account ID.
     - Secret/Var `CLOUDFLARE_R2_BUCKET`: `pantoken-docs-assets`.

## Validation Commands

Use `vp`, not `pnpm`, in this repo:

```bash
vp run -F "@pantoken/docs..." build
DOCS_BASE=/ DOCS_HOSTNAME=https://pantoken.app/ DOCS_BUILD_CONCURRENCY=12 NODE_OPTIONS=--max-old-space-size=12288 vp run @pantoken/docs#docs:build:deploy
vp run @pantoken/docs#docs:check:drift
vp run @pantoken/docs#docs:check:locales
vp run ready
vp run check:publish
```

The full docs deploy build is expensive. For implementation iterations, first test with `DOCS_LOCALES` restricted to a small set, then run the full build/inventory in CI before claiming migration readiness.

## Risks and Open Decisions

- Current `main` has no fresh successful deploy artifact after Registry (#159). The exact file count may now be above the previous 138k baseline.
- A single Cloudflare Worker/Pages site is likely still not enough because the prior full output exceeded `100,000` files.
- R2 same-host routing should be proven early. If it gets messy, use an asset subdomain and rewrite output during `prepare-cloudflare-deploy.ts`.
- Partial builds rely on carrying forward a previous complete dist. The first Cloudflare deploy should be a full build.
- The current `assertScopedLocaleConfig` only checks the per-locale staging `assets` directory before merge. Keep or extend it, but do not rely on it as a full production inventory.
- Netlify's content-addressed deploy behavior hid upload churn. R2 sync must avoid re-uploading every object on each run where possible, or at least keep Class A operations inside the free/cheap range.

## Hand-Off Summary

Build a fresh current-main inventory first. If the split still looks like the prior production shape, implement Cloudflare Workers Static Assets for the non-asset tree and R2 for `assets/` plus `demos-assets/`, preserving public URLs through Worker routing. Update the docs workflow to re-enable deploy gating and replace Netlify with the split Cloudflare deploy. Verify root, localized pages, API pages, registry JSON, hashed chunks, demo assets, sitemap, and hashmap before switching production traffic.
