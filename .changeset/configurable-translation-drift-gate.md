---
"@pantoken/web-components": patch
"@pantoken/scaffold": patch
"@pantoken/ai": patch
---

Translation drift is now gated by a configurable per-surface, per-locale policy instead of a
hard-coded exit code in each checker.

Every drift checker reports findings to a shared `DriftReporter`
(`tools/translation-adapters/src/drift-policy.ts`), which resolves a severity — `block`, `warn`, or
`off` — from the new root `i18n-policy.json`. Severity is a `(surface, locale-tier)` matrix, so a hard
gate can be kept on the surfaces and locales that matter while the long tail of locales only warns.
That decouples merge latency from locale count: adding an English string no longer waits on ~90
translations.

Ten surfaces are addressable: `ui.strings`, `cli.scaffold`, `cli.ai`, `docs.guides`, `docs.api`,
`docs.home`, `docs.chrome`, `docs.glossary`, `docs.demos`, and `docs.parity`. The committed default
blocks on English source integrity and structural locale parity, and warns on every actual translation
gap.

`docs.home` is new coverage, not just a new knob: the home page's frontmatter has a translation
pipeline and 43 committed cache files but never had a drift check, so edits to `docs/index.md` went
unnoticed. Its unit derivation now lives in `docs/scripts/home-i18n.ts`, shared by `translate-home.ts`
and the drift check so the two can't disagree about what a cache key should be.

Extracting it also fixed two latent bugs in the home-page pipeline:

- A translatable key was only found on its own indented line, so reordering a feature or action so
  that `title`, `text`, `details`, or `link` became the YAML list item's first key silently dropped it
  from translation — and left its `link` without the locale prefix, producing a 404 under a localized
  route. The key patterns now accept an optional list dash and capture it, so the rebuilt line is
  byte-identical apart from the translated value.
- The rewrite scanned the whole file, not just the frontmatter, so body prose shaped like frontmatter
  (a markdown list such as `- title: Naming things`) would have been rewritten as if it were page
  metadata and cached as a phantom unit. Matching is now scoped to the frontmatter block, and a
  missing or unterminated frontmatter throws instead of writing 43 untranslated copies.

Neither fix changes the unit set derived from the current `docs/index.md` (14 units, same keys), so no
committed translation is invalidated.

Non-blocking drift is still visible: the reporter emits capped GitHub annotations on the PR diff plus
a job-summary table. `I18N_DRIFT_STRICT=1` escalates every warning to blocking, and
`vp run i18n:check:drift:strict` sweeps all surfaces that way for a pre-release audit.
