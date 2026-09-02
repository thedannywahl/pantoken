---
"@pantoken/i18n-engine": minor
---

Phase 1 of the localization-engine plan: the engine skeleton. New private package
`@pantoken/i18n-engine` with:

- `src/config.ts` — the `i18n.config.json` schema (catalogs, PO options, locales, provider/circuit
  breaker, defaults, spaces) and a defaulting loader (`loadConfig`/`parseConfig`).
- `src/locales.ts` — locale tier resolution (`resolveTier`, pattern matching), lifecycle
  (`moveLocaleToTier`, `excludeLocale`/`includeLocale`), and per-space `only`/`exclude` scoping
  (`localesForSpace`) — one axis (tiers), not a separate lifecycle enum.
- `src/cli.ts` / `bin/i18n.mjs` — the `i18n` CLI. `locale promote/demote/exclude/include` are real
  (read-modify-write `i18n.config.json`); `extract`/`translate`/`render`/`check`/`lint`/`stats` parse
  their full selector surface (space, `--locale`, `--tier`, `--provider`, `--concurrency`, `--force`,
  `--strict`) but report not-yet-implemented — extraction, translation, and rendering are later
  phases.
